/* =========================================================================
   bola.js: camada de fundo com bolas de padel em WebGL.

   Porque não uma fotografia: uma imagem plana rodada lê-se como um
   autocolante a girar. Aqui a esfera é traçada por raio no fragment shader,
   por isso a textura de feltro e a costura estão mesmo coladas à superfície
   e rodam de forma correta. As bolas aproximam-se da câmara ao longo do
   scroll e, a cada mudança de secção, levam um impulso que lhes muda a
   trajetória e acelera a rotação.
   ========================================================================= */
window.Bola = (function(){
  "use strict";

  var N = 3;                       // bolas em cena
  var cv, gl, prog, u = {}, bolas = [], raf = 0;
  var scrollAnt = 0, empurro = 0, activo = false, RM = false;
  var qual = 0.9, amostras = 0, somaDt = 0, nivel = 0;   // auto-regulação
  var FELT_ESCURO = [0.94,1.00,0.28];
  var FELT_CLARO  = [0.70,0.78,0.13];   // mais fundo, para ler sobre o papel
  var tema = { felt:FELT_ESCURO, seam:[0.99,1.00,0.97], opac:0.72 };

  var VS = [
    "attribute vec2 p;",
    "void main(){ gl_Position = vec4(p, 0.0, 1.0); }"
  ].join("\n");

  var FS = [
    "precision highp float;",
    "uniform vec2  uRes;",
    "uniform vec3  uPos[3];",
    "uniform float uRad[3];",
    "uniform float uFade[3];",
    "uniform mat3  uRot0; uniform mat3 uRot1; uniform mat3 uRot2;",
    "uniform vec3  uFelt;",
    "uniform vec3  uSeam;",
    "uniform float uOpac;",

    "float hash(vec3 p){ return fract(sin(dot(p, vec3(127.1,311.7,74.7)))*43758.5453123); }",
    "float ruido(vec3 p){",
    "  vec3 i=floor(p), f=fract(p); f=f*f*(3.0-2.0*f);",
    "  float a=mix(mix(hash(i),hash(i+vec3(1,0,0)),f.x), mix(hash(i+vec3(0,1,0)),hash(i+vec3(1,1,0)),f.x), f.y);",
    "  float b=mix(mix(hash(i+vec3(0,0,1)),hash(i+vec3(1,0,1)),f.x), mix(hash(i+vec3(0,1,1)),hash(i+vec3(1,1,1)),f.x), f.y);",
    "  return mix(a,b,f.z);",
    "}",
    "float fbm(vec3 p){ return 0.56*ruido(p)+0.28*ruido(p*2.13)+0.16*ruido(p*4.31); }",

    /* Curva da costura de uma bola de ténis sobre a esfera unitária:
       x=(3cos t+cos3t)/4, y=(3sin t-sin3t)/4, z=(raiz(3)/2)sin2t  */
    "vec3 costura(float t){",
    "  return vec3((3.0*cos(t)+cos(3.0*t))*0.25, (3.0*sin(t)-sin(3.0*t))*0.25, 0.8660254*sin(2.0*t));",
    "}",
    /* distância angular à costura: varrimento grosso e depois afinação local */
    "float distCostura(vec3 n){",
    "  float melhor=-2.0, tm=0.0;",
    "  for(int k=0;k<24;k++){",
    "    float t=float(k)*0.2617993;",
    "    float d=dot(n, costura(t));",
    "    if(d>melhor){ melhor=d; tm=t; }",
    "  }",
    "  for(int k=0;k<8;k++){",
    "    float t=tm+(float(k)-3.5)*0.0654498;",
    "    float d=dot(n, costura(t));",
    "    melhor=max(melhor,d);",
    "  }",
    "  return acos(clamp(melhor,-1.0,1.0));",
    "}",

    "void main(){",
    "  vec2 uv=(gl_FragCoord.xy-0.5*uRes)/uRes.y;",
    "  vec3 rd=normalize(vec3(uv*0.414,-1.0));",
    "  vec4 acum=vec4(0.0);",

    "  for(int i=0;i<3;i++){",
    "    vec3 C=uPos[i]; float R=uRad[i]; float fade=uFade[i];",
    "    if(fade<=0.002) continue;",
    "    float b=dot(rd,C); float c=dot(C,C)-R*R;",
    "    float disc=b*b-c;",
    "    if(disc<0.0) continue;",
    "    float t=b-sqrt(disc);",
    "    if(t<=0.0) continue;",
    "    vec3 pos=rd*t;",
    "    vec3 n=normalize(pos-C);",

    "    mat3 Rm = i==0 ? uRot0 : (i==1 ? uRot1 : uRot2);",
    "    vec3 no = Rm*n;",                       /* direção em espaço do objeto */

    "    float f=fbm(no*11.0);",
    "    vec3 base=mix(uFelt*0.80, uFelt*1.14, f);",
    "    vec3 nb=normalize(n+(fbm(no*34.0)-0.5)*0.075);",

    "    float ang=distCostura(no);",
    "    float w=0.088;",
    "    float sm=1.0-smoothstep(w*0.72,w,ang);",
    "    float sulco=(1.0-smoothstep(w,w*2.0,ang))*(1.0-sm);",
    "    vec3 col=mix(base,uSeam,sm*0.93);",
    "    col*=1.0-0.28*sulco;",

    "    vec3 V=-rd;",
    "    vec3 L1=normalize(vec3(-0.52,0.64,0.56));",
    "    vec3 L2=normalize(vec3(0.72,-0.18,0.30));",
    "    float dif=max(dot(nb,L1),0.0);",
    "    float fil=max(dot(nb,L2),0.0);",
    "    float esp=pow(max(dot(nb,normalize(L1+V)),0.0),26.0);",
    "    float rim=pow(1.0-max(dot(nb,V),0.0),3.2);",
    "    vec3 lit=col*(0.34+0.92*dif+0.26*fil)+vec3(1.0)*esp*0.45+uFelt*rim*0.60;",

    /* silhueta difusa: o feltro não corta a direito */
    "    float borda=1.0-abs(dot(n,V));",
    "    float a=1.0-smoothstep(0.83,1.0,borda-(fbm(no*58.0)-0.5)*0.13);",
    "    a*=fade;",
    "    acum.rgb=mix(acum.rgb,lit,a*(1.0-acum.a));",
    "    acum.a=acum.a+a*(1.0-acum.a);",
    "  }",
    "  gl_FragColor=vec4(acum.rgb, acum.a*uOpac);",
    "}"
  ].join("\n");

  function compilar(tipo, src){
    var s = gl.createShader(tipo);
    gl.shaderSource(s, src); gl.compileShader(s);
    if(!gl.getShaderParameter(s, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(s));
    return s;
  }

  function novaBola(z){
    var sinal = Math.random() < 0.5 ? -1 : 1;
    return {
      x: sinal*(1.25 + Math.random()*2.6),
      y: (Math.random()*2-1)*2.3,
      z: z,
      vx: sinal*(0.05 + Math.random()*0.13),
      vy: (Math.random()*2-1)*0.07,
      vz: 0.42 + Math.random()*0.34,
      r:  0.30 + Math.random()*0.16,
      /* eixo e velocidade de rotação */
      ax: normaliza([Math.random()*2-1, Math.random()*2-1, Math.random()*2-1]),
      ang: Math.random()*6.28,
      vang: 0.5 + Math.random()*0.8
    };
  }
  function normaliza(v){
    var m = Math.hypot(v[0],v[1],v[2]) || 1;
    return [v[0]/m, v[1]/m, v[2]/m];
  }
  /* matriz de rotação em torno de um eixo, transposta (mundo -> objeto) */
  function matriz(ax, a){
    var c=Math.cos(a), s=Math.sin(a), t=1-c, x=ax[0], y=ax[1], z=ax[2];
    return new Float32Array([
      t*x*x+c,   t*x*y+s*z, t*x*z-s*y,
      t*x*y-s*z, t*y*y+c,   t*y*z+s*x,
      t*x*z+s*y, t*y*z-s*x, t*z*z+c
    ]);
  }

  function medir(){
    if(!cv) return;
    var dpr = Math.min(1.5, window.devicePixelRatio||1) * qual;
    cv.width  = Math.max(1, Math.round(innerWidth*dpr));
    cv.height = Math.max(1, Math.round(innerHeight*dpr));
    cv.style.width = innerWidth+"px"; cv.style.height = innerHeight+"px";
    gl.viewport(0,0,cv.width,cv.height);
  }

  function lerTema(){
    var cs = getComputedStyle(document.documentElement);
    var escuro = (cs.getPropertyValue("--ground").trim().toLowerCase().indexOf("#1") === 0);
    tema.felt = escuro ? FELT_ESCURO : FELT_CLARO;
    tema.opac = escuro ? 0.72 : 0.86;
  }

  function passo(dt){
    for(var i=0;i<N;i++){
      var b = bolas[i];
      var av = 1 + empurro*2.2;
      b.z += b.vz*dt*av;
      b.x += b.vx*dt*av;
      b.y += b.vy*dt*av;
      b.ang += b.vang*dt*(1 + empurro*3.0);
      if(b.z > -1.1){                       // passou pela câmara: volta ao fundo
        var novo = novaBola(-22 - Math.random()*6);
        for(var k in novo) b[k] = novo[k];
      }
    }
    empurro *= Math.pow(0.12, dt);          // o impulso esvai-se
  }

  function desenhar(){
    gl.clearColor(0,0,0,0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.useProgram(prog);
    gl.uniform2f(u.uRes, cv.width, cv.height);
    gl.uniform3fv(u.uFelt, tema.felt);
    gl.uniform3fv(u.uSeam, tema.seam);
    gl.uniform1f(u.uOpac, tema.opac);
    for(var i=0;i<N;i++){
      var b = bolas[i];
      gl.uniform3f(u.pos[i], b.x, b.y, b.z);
      gl.uniform1f(u.rad[i], b.r);
      /* Aparece ao longe e dissolve-se à medida que se aproxima, como um
         primeiro plano fora de foco. Também evita que uma bola grande
         tape o texto. */
      var fade = Math.min(1, Math.max(0, (-b.z-1.2)/5.5)) * Math.min(1, Math.max(0, (26+b.z)/6));
      gl.uniform1f(u.fade[i], fade);
      gl.uniformMatrix3fv(u.rot[i], false, matriz(b.ax, b.ang));
    }
    gl.drawArrays(gl.TRIANGLES, 0, 6);
  }

  /* Se a máquina não aguentar o shader, baixa a resolução; se mesmo assim
     não aguentar, desliga a camada. Mais vale não ter bolas do que ter uma
     página aos solavancos. */
  function regular(dt){
    amostras++; somaDt += dt;
    if(amostras < 90) return;
    var medio = somaDt/amostras;
    amostras = 0; somaDt = 0;
    if(medio <= 0.040 || nivel > 1) return;
    nivel++;
    if(nivel === 1){ qual = 0.55; medir(); }
    else { activo = false; cancelAnimationFrame(raf); cv.style.display = "none"; }
  }

  var tAnt = 0;
  function laco(t){
    if(!activo) return;
    var dt = Math.min(0.05, (t - tAnt)/1000 || 0.016); tAnt = t;
    regular(dt);
    if(!activo) return;
    passo(dt); desenhar();
    raf = requestAnimationFrame(laco);
  }

  return {
    init: function(){
      RM = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      cv = document.getElementById("bolas");
      if(!cv) return false;
      try {
        gl = cv.getContext("webgl", { alpha:true, premultipliedAlpha:false, antialias:false })
          || cv.getContext("experimental-webgl", { alpha:true, premultipliedAlpha:false });
      } catch(e){ gl = null; }
      if(!gl){ cv.style.display = "none"; return false; }

      try {
        prog = gl.createProgram();
        gl.attachShader(prog, compilar(gl.VERTEX_SHADER, VS));
        gl.attachShader(prog, compilar(gl.FRAGMENT_SHADER, FS));
        gl.linkProgram(prog);
        if(!gl.getProgramParameter(prog, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(prog));
      } catch(e){ cv.style.display = "none"; return false; }

      var buf = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, buf);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 3,-1, -1,3]), gl.STATIC_DRAW);
      var loc = gl.getAttribLocation(prog, "p");
      gl.enableVertexAttribArray(loc);
      gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

      u.uRes=gl.getUniformLocation(prog,"uRes");
      u.uFelt=gl.getUniformLocation(prog,"uFelt");
      u.uSeam=gl.getUniformLocation(prog,"uSeam");
      u.uOpac=gl.getUniformLocation(prog,"uOpac");
      u.pos=[]; u.rad=[]; u.fade=[]; u.rot=[];
      for(var i=0;i<N;i++){
        u.pos.push(gl.getUniformLocation(prog,"uPos["+i+"]"));
        u.rad.push(gl.getUniformLocation(prog,"uRad["+i+"]"));
        u.fade.push(gl.getUniformLocation(prog,"uFade["+i+"]"));
        u.rot.push(gl.getUniformLocation(prog,"uRot"+i));
      }

      gl.enable(gl.BLEND);
      gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

      bolas = [];
      for(var j=0;j<N;j++) bolas.push(novaBola(-4 - j*7 - Math.random()*3));

      lerTema(); medir();
      addEventListener("resize", function(){ medir(); if(RM) desenhar(); });
      window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", function(){
        setTimeout(function(){ lerTema(); if(RM) desenhar(); }, 60);
      });
      document.addEventListener("visibilitychange", function(){
        if(document.hidden){ activo=false; cancelAnimationFrame(raf); }
        else if(!RM){ activo=true; tAnt=performance.now(); raf=requestAnimationFrame(laco); }
      });

      if(RM){ desenhar(); return true; }      // um fotograma parado, sem laço
      activo = true; tAnt = performance.now();
      raf = requestAnimationFrame(laco);
      return true;
    },

    /* impulso na mudança de secção: muda a trajetória e acelera a rotação */
    kick: function(){
      if(RM || !activo) return;
      empurro = 1;
      for(var i=0;i<N;i++){
        var b = bolas[i];
        var fora = b.x >= 0 ? 1 : -1;
        b.vx += fora*Math.random()*0.42 + (Math.random()*2-1)*0.18;
        b.vy += (Math.random()*2-1)*0.46;
        b.vx = Math.max(-0.9, Math.min(0.9, b.vx));
        b.vy = Math.max(-0.6, Math.min(0.6, b.vy));
        b.vang = 0.6 + Math.random()*1.9;
        b.ax = normaliza([Math.random()*2-1, Math.random()*2-1, Math.random()*2-1]);
      }
    },

    /* o scroll empurra as bolas em direção ao utilizador */
    scroll: function(y){
      var d = Math.abs(y - scrollAnt); scrollAnt = y;
      empurro = Math.min(1.4, empurro + Math.min(0.35, d/900));
    }
  };
})();
