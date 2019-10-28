var flag = 0;

function askPermission() {
	if(typeof DeviceMotionEvent.requestPermission === 'function') {
		DeviceMotionEvent.requestPermission()
		.then(permissionState => {
			if(permissionState === 'granted') {
				flag = 1;
				start();
			}
		})
		.catch(console.error);
	}
	else {
		flag = 1;
		start();
	}
}

function start() {
	if(flag == 1) {
		document.getElementById('permissionButton').addEventListener('click', function() {
			alert('ask for permission');
			document.getElementById('wholeProgressBar').classList.remove('hidden');
			document.getElementById('statusVal').classList.remove('hidden');
			document.getElementById('actionList').classList.remove('hidden');
			document.getElementById('permissionButton').classList.add('hidden');			
		});

		var x_pre, y_pre, z_pre = 0;
		var x_post, y_post, z_post = 0;

		moveMeWidth = 0;

		if (!('ondevicemotion' in window)) {
			document.getElementById('dm-unsupported').classList.remove('hidden');
		} 
		else {
			document.getElementById('dm-info').classList.remove('hidden');
			window.addEventListener('devicemotion', function(e) {
				x_pre = event.acceleration.x;
				y_pre = event.acceleration.y;
				z_pre = event.acceleration.z;
				document.getElementById('acceleration-x').innerHTML = Math.round(event.acceleration.x);
				document.getElementById('acceleration-y').innerHTML = Math.round(event.acceleration.y);
				document.getElementById('acceleration-z').innerHTML = Math.round(event.acceleration.z);
			});

			var target = 20; //threshold for movement
			setInterval(function() {
				var diff = Math.abs(x_pre - x_post + y_pre - y_post + z_pre - z_post);
				if(diff > target) {
					// alert("lots of movement!");
					if(moveMeWidth <= 100) {
						moveMeWidth = moveMeWidth + 1;
						document.getElementById('myBar').style.width = moveMeWidth + 1 + "%";
						document.getElementById('statusVal').innerHTML = moveMeWidth + 1 + "%";
					}
					else {
						alert('status bar filled 100 percent! u did it!');
					}
				}
				x_post = x_pre;
				y_post = y_pre;
				z_post = z_pre;
			}, 150);
		}
	} 
	else {
		alert('motion/orientation not supported');
	}
}


