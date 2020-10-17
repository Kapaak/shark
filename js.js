function app(){
	const gameLayout = document.querySelector(".game-layout");
	const shark = document.querySelector(".shark");
	const retry = document.querySelector(".retry");
	const score = document.querySelector(".score");
	let gameStatus = true;
	let playerScore = 0;
	
	moveShark();
	obstacle();

	retry.addEventListener("click",()=>{
		gameStatus = true;
		document.querySelector(".game-over").style.display = "none";
		obstacle();
		
	});

	///CREATING OBSTACLES
	function obstacle(){
		//create new obstacle
		let div = document.createElement("div");
		div.className = "obstacle";
		gameLayout.appendChild(div);
		let move = 0;
		let position;

		function moveObstacle(){
			div.style.right = move + "px";
			if(move <= gameLayout.offsetWidth){
				move += 4;
				position = gameLayout.offsetWidth - move;
				playerScore += 1;
				score.textContent = playerScore;
			}else{
					clearInterval(timerID);
					div.remove();
			};
			
		};	

		function hitObstacle(){
			if(position < 170 && position > 90 && shark.getBoundingClientRect().bottom > div.getBoundingClientRect().top){
				clearInterval(timerID);
				console.log("game over");
				gameStatus = false;
			}
		}

		//moving obstacles in intervals
		const timerID = setInterval(function(){
			hitObstacle();
			moveObstacle();
		},11);

		if(gameStatus) timeoutID = setTimeout(obstacle,2000)
		else {
			//remove all obstacles, that are on board
			document.querySelectorAll(".obstacle").forEach(obstacle =>{
				gameLayout.removeChild(obstacle);
			});
			document.querySelector(".game-over").style.display = "flex";
			playerScore = 0;
		}
	}

	///MOVE SHARK
	function moveShark(){
		let jump = 4;
		let maxJump = 21;
		let falling = false;
		document.addEventListener("keydown",function jumping(){
			
			function jumpUp(){
				if(jump <= maxJump && falling == false){
					jump += .75;
					shark.style.bottom = jump + "rem";
					document.removeEventListener("keydown",jumping);
				}
				if(jump >= maxJump) falling = true;		
				if(falling == true){
					jump -= .75;
					shark.style.bottom = jump + "rem";
				}
				if(jump <= 4){
					clearInterval(timerID);
					falling = false;
					document.addEventListener("keydown",jumping);
				}
			}
			
			const timerID = setInterval(jumpUp,20);
			
		});
	};

	}

	app();