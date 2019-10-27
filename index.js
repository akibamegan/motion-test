var x_preTotal, y_preTotal, z_preTotal = 0;
var x_postTotal, y_postTotal, z_postTotal = 0;

var moveMeWidth = 0;

function captureMotion() {
	var target = 20;
	if (!('ondevicemotion' in window)) {
		document.getElementById('dm-unsupported').classList.remove('hidden');
	} 
	else {
		window.addEventListener('devicemotion', function(event) {
			x_preTotal = event.acceleration.x;
			y_preTotal = event.acceleration.y;
			z_preTotal = event.acceleration.z;
		});
		setInterval(function(){
			var diff = Math.abs(x_preTotal - x_postTotal + y_preTotal - y_postTotal + z_preTotal - z_postTotal);
			if(diff > target) {
				moveMe(moveMeWidth);
			}
			moveMeWidth = moveMeWidth + 10;
			x_postTotal = x_preTotal;
			y_postTotal = y_preTotal;
			z_postTotal = z_preTotal;
		}, 150);
	}
}

function askPermission() {
	if(typeof DeviceMotionEvent.requestPermission === 'function') {
		DeviceMotionEvent.requestPermission()
		.then(permissionState => {
			if(permissionState === 'granted') {
				window.addEventListener('devicemotion', () => {
					// do something

					captureMotion();
				});
			}
		})
		.catch(console.error);
	}
	else {
		// regular non ios 13 devices
		captureMotion();
	}
}

function moveMe(currentWidth) {
	var elem = document.getElementById('myBar');
	var width = currentWidth;
	var widthIncrement = 10;
	var id = setInterval(go, 25);
	var totalWidthVal = width + widthIncrement;

	function go(){
		if(width >= totalWidthVal || width >= 100) {
			clearInterval(id);
		}
		else{
      		width++;
      		elem.style.width = width + '%';
      		elem.innerHTML = width * 1 + '%';
    	}
  	}
}
