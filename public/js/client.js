(function(){

	// socket connection
	var socket = window.io ? io('/device') : null;


	var flag = 0;

	document.getElementById('permissionButton').addEventListener('click', askPermission);

	function askPermission() {
		console.log('asking for permission');
		// document.getElementById('startButton').classList.remove('hidden');
		document.getElementById('permissionButton').classList.add('hidden');			
		if(typeof DeviceMotionEvent.requestPermission === 'function') {
			DeviceMotionEvent.requestPermission()
			.then(permissionState => {
				if(permissionState === 'granted') {
					flag = 1;
					console.log('permissiongranted');
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
			document.getElementById('wholeProgressBar').classList.remove('hidden');
			document.getElementById('statusVal').classList.remove('hidden');
			// document.getElementById('actionList').classList.remove('hidden');
			// document.getElementById('directions').classList.remove('hidden');
		}
		var x_pre, y_pre, z_pre = 0;
		var x_post, y_post, z_post = 0;

		moveMeWidth = 0;

		// check for device motion support on mobile
		if('ondevicemotion' in window && 'ontouchstart' in window) {
			// document.getElementById('dm-info').classList.remove('hidden');
			console.log('device motion supported');
			window.addEventListener('devicemotion', function(event) {
				x_pre = event.acceleration.x;
				y_pre = event.acceleration.y;
				z_pre = event.acceleration.z;
				// document.getElementById('acceleration-x').innerHTML = Math.round(event.acceleration.x);
				// document.getElementById('acceleration-y').innerHTML = Math.round(event.acceleration.y);
				// document.getElementById('acceleration-z').innerHTML = Math.round(event.acceleration.z);
			});

			var target = 30; //threshold for movement
			setInterval(function() {
				var diff = Math.abs(x_pre - x_post + y_pre - y_post + z_pre - z_post);
				if(diff > target) {
					// alert("lots of movement!");
					if(moveMeWidth < 100) {
						moveMeWidth++;
						document.getElementById('myBar').style.width = moveMeWidth + "%";
						document.getElementById('statusVal').innerHTML = moveMeWidth + "%";
						socket.emit('increase', moveMeWidth);
					}
					else {
						console.log('Status bar filled 100 percent! You did it!');
					}
				}
				x_post = x_pre;
				y_post = y_pre;
				z_post = z_pre;
			}, 150);
		}
		else {
			console.log('device motion not supported, view only');
			document.getElementById('dm-unsupported').classList.remove('hidden');
		} 
	}


// var button = document.getElementById('startButton');
// button.addEventListener('click', function() {
// 	moveMeWidth++;
// 	document.getElementById('myBar').style.width = moveMeWidth + '%';
// 	document.getElementById('statusVal').innerHTML =  moveMeWidth + '%';
// 	socket.emit('increase', moveMeWidth);
// });



})();