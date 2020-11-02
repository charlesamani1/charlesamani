$(".portfolios .video-link").magnificPopup({
  type: "iframe"
});
$(".portfolios .image-link").magnificPopup({
  type: "image"
});


const config = {};
config.container = document.querySelector('.canvas-wrap');
config.height = window.innerHeight-70;
config.width = window.innerWidth-370;
config.halfX = config.width / 2;
config.halfY = config.height / 2;
config.aspectRatio = config.height / config.width;
config.near = 1;
config.far = 3000;
config.fieldOfView = 75;
config.cameraZ = config.far / 3;
config.particleNum = 1000;
config.mouseX = 0;
config.mouseY = 0;

const obj = {};
obj.camera = new THREE.PerspectiveCamera(config.fieldOfView, config.aspectRatio, config.near, config.far);
obj.camera.position.z = config.cameraZ;

obj.scene = new THREE.Scene();
obj.geometry = new THREE.Geometry();
obj.material = new THREE.PointsMaterial({ size: 4 });

for (let i = 0; i < config.particleNum; i++) {
  let vertex = new THREE.Vector3();
  vertex.x = Math.random() * 2000 - 1000;
  vertex.y = Math.random() * 2000 - 1000;
  vertex.z = Math.random() * 2000 - 1000;

  obj.geometry.vertices.push(vertex);
}

obj.particles = new THREE.Points(obj.geometry, obj.material);
obj.scene.add(obj.particles);

obj.renderer = new THREE.WebGLRenderer();
obj.renderer.setPixelRatio(window.devicePixelRatio);
obj.renderer.setSize(config.width, config.height);
config.container.appendChild(obj.renderer.domElement);


function render() {
  let time = Date.now() * 0.00005;

  obj.camera.position.x += (config.mouseX - obj.camera.position.x) * 0.05;
  obj.camera.position.y += (config.mouseY - obj.camera.position.y) * 0.05;
  obj.camera.lookAt(obj.scene.position);

  let h = 360 * time % 360 / 360;
  obj.material.color.setHSL(h, 0.75, 0.75);
  obj.particles.rotation.y += 0.005;

  obj.renderer.render(obj.scene, obj.camera);
}

function animate() {
  requestAnimationFrame(animate);
  render();
}

function onMouseMove(e) {
  config.mouseX = e.clientX - config.halfX;
  config.mouseY = e.clientY - config.halfY;
}

function onResize() {
  config.halfX = window.innerWidth / 2 ;
  config.halfY = window.innerHeight / 2;

  obj.camera.aspect = window.innerWidth / window.innerHeight;
  obj.camera.updateProjectionMatrix();
  obj.renderer.setSize(window.innerWidth, window.innerHeight);
}

document.addEventListener('mousemove', onMouseMove);
window.addEventListener('resize', onResize);

animate();

/* -----------------------------------
  		Google Map
----------------------------------- */
jQuery(function ($) {
	function init_map1() {
		var myLocation = new google.maps.LatLng(-3.601678, 39.882598);
		var mapOptions = {
			center: myLocation,
			zoom: 16
		};
		var marker = new google.maps.Marker({
			position: myLocation,
			title: "I'm Here!"
		});
		var map = new google.maps.Map(document.getElementById("map1"),
			mapOptions);
		marker.setMap(map);
	}
	init_map1();

});


// new Clipboard('.js-copy');

