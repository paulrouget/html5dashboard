function chain( func ) { return function() { return func.apply( this, arguments )||this; } }
CanvasRenderingContext2D.prototype.set = function( what, to ) { this[what] = to; }
for( chainThat in {set:1,clearRect:1,save:1,translate:1,rotate:1,drawImage:1,scale:1,restore:1,fillRect:1,moveTo:1,lineTo:1,beginPath:1,closePath:1,stroke:1,fill:1,arc:1} ) { CanvasRenderingContext2D.prototype[chainThat] = chain( CanvasRenderingContext2D.prototype[chainThat] ); }
onmousemove = function( event ) { window.mouse = [ (window.event||event).screenX, (window.event||event).screenY ]; }

window.addEventListener("load", function() {
    var canvas = document.getElementById('canvas2d');
    var interval;

    for (var i = 0; i < 60; i++) {tick()};

    canvas.addEventListener("mouseout", function() { if (interval) clearInterval(interval); }, true);
    canvas.addEventListener("mouseover", function() { interval = setInterval(tick, 50 );} , true);

    function tick() {
        //By http://www.p01.org/news/
        //From http://www.p01.org/releases/20_lines_twinkle/

        var now     = new Date().getTime()+(window.mouse||[0,0])[0]*2-200;

        var canvas = document.getElementById('canvas2d');
        var ctx = canvas.getContext('2d');

        ctx.globalCompositeOperation = 'copy';
        ctx.drawImage(canvas, 12+Math.cos(now/806+(window.mouse||[0,0])[0]/128),8+Math.sin(now/551+(window.mouse||[0,0])[1]/128),240-24,160-16,0,0,240,160);
        ctx.globalCompositeOperation = 'source-over';

        ctx.beginPath();
        ctx.fillStyle = "black";
        ctx.arc(120,80,12,0,Math.PI * 2, .628,0);
        ctx.closePath();
        ctx.fill();

        var colors = ["#28C2DA", "white", "black", "#2EC4DD"];

        for( var j=0; j<10; j++ ) {
            var a = j/1.59+((Math.cos(now/1337)+now/4096)%1.2566);
            ctx.beginPath();
            ctx.moveTo(120-Math.sin(now/618),80+Math.cos(now/523));
            ctx.arc(120,80,12,a,a+.628,0);
            ctx.closePath();
            ctx.fillStyle = colors[Math.round(Math.random() * colors.length)];//'#'+('00'+(Math.random()*0xfff&(j&1?0x17f:0xf31)).toString(16)).slice(-3);
            ctx.fill();
        }
    }
}, true);
