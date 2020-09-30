var scene = new THREE.Scene();
scene.background = new THREE.Color( 0xf6ffe8 );

let aspect = window.innerWidth / window.innerHeight;
let d=20
var camera = new THREE.OrthographicCamera( - d * aspect, d * aspect, d, - d, -100, 1000);

var renderer = new THREE.WebGLRenderer({
			antialias: true,
			alpha: false
		});
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );


// ambient
scene.add( new THREE.AmbientLight( 0xffffff, 0.5 ) );

// light
var light = new THREE.PointLight( 0xffffff, 0.5 );
light.position.set( 0, 499, 0 );
scene.add( light );


var geom = new THREE.BoxGeometry(5,1,5);
var mat = new THREE.MeshToonMaterial({color:0x222736, shading: THREE.FlatShading})
var cube = new THREE.Mesh(geom, mat);
scene.add(cube);


var geom = new THREE.BoxGeometry(5,1,5);
var mat = new THREE.MeshToonMaterial({color:0x8f41b0, shading: THREE.FlatShading})
var cube = new THREE.Mesh(geom, mat);
cube.position.set(0,1,0)
scene.add(cube);


var position = { x : -8};
var target = { x : 8};
var tween = new TWEEN.Tween(position).to(target, 2000).onUpdate(function(){cube.position.x = position.x;}).easing(TWEEN.Easing.Sinusoidal.InOut)
var tweenBack = new TWEEN.Tween(position).to({x: -8}, 2000).onUpdate(function(){cube.position.x = position.x;}).easing(TWEEN.Easing.Sinusoidal.InOut)
tween.chain(tweenBack);
tweenBack.chain(tween);
tween.start();

camera.position.set( 2, 2, 2 );
camera.lookAt(new THREE.Vector3(0,0,0))

function animate(){
	requestAnimationFrame(animate);
	renderer.render(scene, camera);
	TWEEN.update();
}
animate();