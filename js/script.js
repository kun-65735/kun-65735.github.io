// Customize these...
var n = 300,
    speed = 5,//閫熷害瀹氫箟
    startSize = rand(100,300);//澶у皬瀹氫箟

// ...not these
var c = document.getElementById("c"),
    ctx = c.getContext("2d"),
    cw = (c.width = window.innerWidth),
    ch = (c.height = window.innerHeight),
    mousePos = {x:"", y:""},
    img = new Image(),
    particles = [],
    particleNumber = 0,
    Particle = function(index) {
      this.index = index;
      this.dur = (100-rand(9, 90))/speed;
      this.draw = function() {
        ctx.translate( this.x, this.y );
        ctx.globalAlpha = this.alpha;
        ctx.globalCompositeOperation = 'lighter';
        // if (index%1.5==0) ctx.globalCompositeOperation = 'overlay';
        if (index%2==0) ctx.globalCompositeOperation = 'xor';
        ctx.drawImage(img, -this.size/2, -this.size/2, this.size, this.size);
        ctx.translate( -this.x, -this.y );
      }
    };

function setParticle(p, firstRun) {
  var _x = cw*rand(0,1), _y = ch*rand(0,1), _s = startSize;
  if (rand(0,1)>0.3 && mousePos.x!=""){ //console.log(mousePos)
    _x = mousePos.x;
    _y = mousePos.y;
    _s = _s/10;
  }
  var _tl = new TimelineMax()
            .fromTo(p, p.dur, {
                x:_x,
                y:_y,
                size:_s,
                alpha:0
            },{
                size:'+='+String(rand(200,400)),
                bezier:[{alpha:rand(0.15,0.65)},{alpha:0}],
                ease:Power1.easeOut,//ease:Power0.easeNone,
                onComplete:function(){ setParticle(p); }
            });

  if (firstRun) _tl.seek(p.dur*rand()); //fast-forward on first run
}


TweenMax.ticker.addEventListener("tick", function(){
  ctx.clearRect(0, 0, cw, ch);
  for (var i=0; i<n; i++) particles[i].draw();
});


window.addEventListener('resize', doResize)
function doResize() {
  particleNumber = 0;  
  cw = (c.width = window.innerWidth);
  ch = (c.height = window.innerHeight);
  for (var i=0; i<n; i++) {
    TweenMax.killTweensOf(particles[i]);
    setParticle(particles[i], true);
  }
  TweenMax.fromTo(c, 0.3, {alpha:0},{alpha:1, ease:Power3.easeInOut});
}

// First run
for (var i=0; i<n; i++) particles.push(new Particle(i));
doResize();


function rand(min, max) {
  (min) ? min=min : min=0;
  (max) ? max=max : max=1;
  return min + (max-min)*Math.random();
}

img.src="data:image/png;base64,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"


