class Block{
	constructor(id,x,z){
		this.x = x;
		this.z = z;
		this.id = id;

		if(id%2==0){
			this.axis = "x";
		}else{
			this.axis = "z";
		}

		let offset = this.id;
		let r = Math.sin(0.3 * offset) * 55 + 200;
		let g = Math.sin(0.3 * offset + 2) * 55 + 200;
		let b = Math.sin(0.3 * offset + 4) * 55 + 200;
		this.color = new THREE.Color( r / 255, g / 255, b / 255 );

		this.geom = new THREE.BoxGeometry(x,1,z);
		this.mat = new THREE.MeshToonMaterial({color:this.color, flatShading: true})
		var cube = new THREE.Mesh(this.geom, this.mat);
		this.cube = cube

		if(this.axis == "x"){
			this.cube.position.set(-8,1,prevBlock.keepMesh.position.z)
		}else{
			this.cube.position.set(prevBlock.keepMesh.position.x,1,-8)
		}
		
		scene.add(this.cube);

		var startPos = { pos : -8};
		var currentPos = { pos : -8};
		var endPos = { pos : 8};

		let speed = 500 + 2500 * Math.pow(0.98,id);

		this.tween = new TWEEN.Tween(currentPos).to(endPos, speed)
		.easing(TWEEN.Easing.Sinusoidal.InOut)

		this.tweenBack = new TWEEN.Tween(currentPos).to(startPos, speed)
		.easing(TWEEN.Easing.Sinusoidal.InOut)


		if(this.axis == "x"){
			this.tween.onUpdate(function(){cube.position.x = currentPos.pos;})
			this.tweenBack.onUpdate(function(){cube.position.x = currentPos.pos;})
		}else{
			this.tween.onUpdate(function(){cube.position.z = currentPos.pos;})
			this.tweenBack.onUpdate(function(){cube.position.z = currentPos.pos;})
		}

		this.tween.chain(this.tweenBack);
		this.tweenBack.chain(this.tween);
		this.tween.start();
	}

	stop(){
		this.tween.stop();
		this.cube.position.y = -stoppedBlocks.position.y+1
		this.cube.position.z = Math.round(this.cube.position.z*4)/4
		this.cube.position.x = Math.round(this.cube.position.x*4)/4

		if(this.axis == "x"){
			let remove = prevBlock.cube.position.x - this.cube.position.x
			let keep = prevBlock.x - Math.abs(remove)

			if(keep > 0){
				let geom = new THREE.BoxGeometry(keep,1,this.z);
				let mat = new THREE.MeshToonMaterial({color:this.color, flatShading: true})
				this.keepMesh = new THREE.Mesh(geom, mat);
				this.keepMesh.position.y = this.cube.position.y
				this.keepMesh.position.z = prevBlock.keepMesh.position.z
				this.keepMesh.position.x = prevBlock.keepMesh.position.x - remove/2

				scene.remove(this.cube)
				stoppedBlocks.add(this.keepMesh);
				this.x = keep;
				prevBlock = this
			}else{
				this.endGame()
			}
			
		}else{
			let remove = prevBlock.cube.position.z - this.cube.position.z
			let keep = prevBlock.z - Math.abs(remove)

			if(keep > 0){
				let geom = new THREE.BoxGeometry(this.x,1,keep);
				let mat = new THREE.MeshToonMaterial({color:this.color, flatShading: true})
				this.keepMesh = new THREE.Mesh(geom, mat);
				this.keepMesh.position.y = this.cube.position.y
				this.keepMesh.position.z = prevBlock.keepMesh.position.z - remove/2
				this.keepMesh.position.x = prevBlock.keepMesh.position.x
				scene.remove(this.cube)
				stoppedBlocks.add(this.keepMesh);
				this.z = keep;
				prevBlock = this
			}else{
				this.endGame()
			}

		}
	}

	endGame(){
		gamerunning = false;
		scene.remove(this.cube)

		let prevHighScore = document.getElementById("HighScore").innerHTML.split(" ")
		prevHighScore = parseInt(prevHighScore[prevHighScore.length-1])

		let newScore = parseInt(document.getElementById("score").innerHTML)

		if(newScore > prevHighScore){
			localStorage.setItem("highScore",newScore.toString())
			document.getElementById("HighScore").innerHTML = "High Score: " + newScore.toString()
		}
	}
}

