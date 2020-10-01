//Scene Setup
var scene = new THREE.Scene();
scene.background = new THREE.Color( 0xf6ffe8 );

//Camera Setup
let aspect = window.innerWidth / window.innerHeight;
let d=20
var camera = new THREE.OrthographicCamera( - d * aspect, d * aspect, d, - d, -100, 1000);
camera.position.set( 2, 2, 2 );
camera.lookAt(new THREE.Vector3(0,0,0))

//Renderer Setup
var renderer = new THREE.WebGLRenderer({antialias: true,alpha: false});
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

//Lighting
scene.add( new THREE.AmbientLight( 0xffffff, 0.5 ) );
var light = new THREE.PointLight( 0xffffff, 0.5 );
light.position.set( 0, 499, 0 );
scene.add( light );

var stoppedBlocks = new THREE.Group();

var geom = new THREE.BoxGeometry(5,1,5);
var mat = new THREE.MeshToonMaterial({color:0x222736, flatShading: true})
var cube = new THREE.Mesh(geom, mat);
stoppedBlocks.add(cube);
scene.add(stoppedBlocks);

var currentBlock = null;
var prevBlock = {cube:cube,x:5,z:5,keepMesh:cube};
var id = 1;
var gamerunning = false;

document.onkeydown = function(e){
	if(e.code == "Space"){
		onactive()
	}
}

document.onmousedown = function(e){
	if(e.which == 1){// LEFT CLICK
		onactive()
	}
}

document.ontouchstart = function(e){
	onactive()
}

function onactive(){
	if(currentBlock != null){

		currentBlock.stop()

		let stoppedBlocksPos = {y:stoppedBlocks.position.y};
		let stoppedBlocksEndPos = {y:stoppedBlocks.position.y-1};
		let stoppedBlocksTween = new TWEEN.Tween(stoppedBlocksPos)
		.to(stoppedBlocksEndPos, 200)
		.onUpdate(function(){stoppedBlocks.position.y = stoppedBlocksPos.y;})
		.easing(TWEEN.Easing.Quadratic.Out);
		stoppedBlocksTween.start();
	}else{
		
	}
	let block = new Block(id,prevBlock.x,prevBlock.z);
	currentBlock = block
	document.getElementById("title").innerHTML = id-1
	id++;
}




function animate(){
	requestAnimationFrame(animate);
	renderer.render(scene, camera);
	TWEEN.update();
}
animate();