$( document ).ready(function(){
  console.log('Hi there!\nLooks like you are curious enough to look under the hood. Sounds like we may have something in common. I am a geek capable enough to prototype and make things, but not quite good yet for production ready code. Still I designed and coded this website myself, so... getting somewhere. Get in touch! \n+G \n\np.s.\nYou are probably wondering about this cute background animation. No, it\'s not a gif. It is a D3 animation rendered on an HTML canvas, that is stretched to the full width of the background. The algorythm is forked from the wonderful creations of Mike Bostock, the creator of D3. Make sure to check out more here: http://bl.ocks.org/mbostock.');
});

var isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor); // our wonderful logo animation works correctly only in chrome ;(

var startIt = function() {
  if(window.innerWidth > 760) { //simple hacky solution to not overload mobile devices FIXME
    $('#gs-bg-canvas').attr('width', window.innerWidth);
    $('#gs-bg-canvas').attr('height', window.innerHeight);
    startBgAnimation();
    if(isChrome) {
      $('#fallback-logo').hide();
      $('#svg-logo-container').show();
      storkAnimation.stop();
      setTimeout(function(){
        storkAnimation.once(); //FIXME re-enable when ready
      },6000); //delay the first run to add surprise
    }
  }
};

var startBgAnimation = function() {
  var si = 64;
  var maxx = 10;
  var speedd = 3;
  var freqq = 6000; //every 7 sec

	var canvas = document.querySelector("#gs-bg-canvas"),
			context = canvas.getContext("2d"),
			width = canvas.width,
			height = canvas.height;

	var isocontext = isometric(context);

	isocontext.scale3d(si, si, si);

	d3.timer(function(elapsed) {
		context.save();
		context.clearRect(0, 0, width, height);
		context.fillStyle = "#fff";
		context.translate(width / 2, height * 0.6);
		for (var x = maxx, d, t = (elapsed / freqq) % 1; x >= -maxx; --x) {
			for (var y = maxx; y >= -maxx; --y) {
				if ((d = distanceManhattan(x, y)) > 10) continue;
				var te = d3_ease.easeCubic(Math.max(0, Math.min(1, t * speedd - distanceCartesian(x, y) / 4)));
				drawCube((d & 1 ? -1 : +1) * (Math.PI / 4 - te * Math.PI / 2), x * 2, y * 2, 2 * te);
			}
		}
		context.restore();
	});

	function distanceCartesian(x, y) {
		return Math.sqrt(x * x + y * y);
	}

	function distanceManhattan(x, y) {
		return Math.abs(x) + Math.abs(y);
	}

	function drawCube(angle, x, y, z) {
		if ((angle %= Math.PI / 2) < 0) angle += Math.PI / 2;
		isocontext.save();
		isocontext.translate3d(x, y, z);
		isocontext.rotateZ(angle - Math.PI / 4);

		context.beginPath();
		isocontext.moveTo(+0.5, -0.5, +0.5);
		isocontext.lineTo(+0.5, +0.5, +0.5);
		isocontext.lineTo(-0.5, +0.5, +0.5);
		isocontext.lineTo(-0.5, +0.5, -0.5);
		isocontext.lineTo(-0.5, -0.5, -0.5);
		isocontext.lineTo(+0.5, -0.5, -0.5);
		isocontext.closePath();
		context.fill();
		context.lineWidth = 1.5;
		context.stroke();

		context.beginPath();
		isocontext.moveTo(-0.5, -0.5, +0.5);
		isocontext.lineTo(+0.5, -0.5, +0.5);
		isocontext.moveTo(-0.5, -0.5, +0.5);
		isocontext.lineTo(-0.5, +0.5, +0.5);
		isocontext.moveTo(-0.5, -0.5, +0.5);
		isocontext.lineTo(-0.5, -0.5, -0.5);
		context.lineWidth = 0.75;
		context.stroke();

		isocontext.restore();
	}
};
