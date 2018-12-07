(function(){
		//collision case
		var AABBIntersect = function(ax, ay, aw, ah, bx, by, bw, bh) {
			return ax < bx+bw && ay < by+bh && bx < ax+aw && by < ay+ah;
			};
		// constants defined here
		var
			WIDTH = 900,
			HEIGHT = 500,
			spaceBar = 32,
			flappyBird = document.getElementById('flappy-bird'),
			bg = document.getElementById('bg'),
			pipe1 = document.getElementById('pipe1'),
			gameOverText = document.getElementById('game-over'),
			gap = 120,
			gameStopped = 0,
			speed = 0.3,
			score = 0,
			scoreText = document.getElementById('score-text'),
			highScore = 0,
			highScoreText = document.getElementById('high-score-text'),
			myStorage = localStorage,
			oldHighScore = localStorage.getItem('myHighScore'),
	
			//canvas
			canvas,
			ctx,
			animationLoop,

			//get random with min and max as parameters
			getRandom = function (min, max) {
				var random = Math.floor(Math.random()*(max-min+1)+min);
				if (random === 0) {
			  	return getRandom(min, max);
				}

				return random;
			}, 

			//player
			Player = function(){
				this.x = 0;
				this.y = 0;
				this.width = 60;
				this.height = 60;

				this.update = function(){
					speed *= 1.08;
					this.y += 2 + speed;
					this.y = Math.max(Math.min(this.y, HEIGHT - this.height), 0);
				};

				this.draw = function(){
					ctx.drawImage(flappyBird, this.x, this.y, this.width, this.height);
				};
			},

			pipes = function(){
				this.x = 0;
				this.y = 0;
				this.width = 100;
				this.height = getRandom(100, 300);
				this.index = 0;


				this.update = function(){
					this.x -= 5;
				}

				this.draw = function(){
					ctx.drawImage(pipe1, this.x, this.y, this.width, this.height);
				}
			};
		
		// localStorage.setItem('myHighScore', 1);
		highScoreText.innerHTML = 'Highscore: ' + oldHighScore;

		// main game function defined here
		function mainGame(){
			//initiate canvas
			canvas = document.createElement('canvas');
			canvas.width = WIDTH;
			canvas.height = HEIGHT;
			ctx = canvas.getContext('2d');
			document.body.appendChild(canvas);

			init();
			function init(){
				that = this;
				this.player = new Player();
				this.player.x = 50;
				this.player.y = 50;
				pipeAnimation();
				function pipeAnimation(){
					this.pipeArray = [];
					for(var i = 0; i < 200; i+=2){
						var newPipe1 = new pipes();
						var newPipe2 = new pipes();
						newPipe1.index = i;
						newPipe2.index = i+1;
						newPipe1.x = WIDTH + 200*i;
						newPipe2.x = WIDTH + 200*i;
						newPipe1.y = 0;
						newPipe2.y = newPipe1.height + gap;
						newPipe2.height = HEIGHT - newPipe1.height - gap;
						this.pipeArray.push(newPipe1, newPipe2);
						// pipes();
					}
				}
				
				var loop = function(){
					update();
					draw();
					checkScore();
					checkGameOver();
					if (gameStopped == 0) {
					animationLoop = window.requestAnimationFrame(loop, canvas);
					}
				}
				animationLoop = window.requestAnimationFrame(loop, canvas);
			}
		}

		//on spacebar pressed
		document.addEventListener('keydown', function (evt) {
			if (evt.keyCode === 32){
				if(gameStopped === 0){
					that.player.y -= 50;
					speed = 0.3;
				}
			}
		});

		// update all game objects
		function update(){
			this.player.update();
			for (var i = 0; i < 200; i++){
				that.pipeArray[i].update();
			}

		}

		// draw all game objects
		function draw(){
			ctx.drawImage(bg, 0, 0, WIDTH, HEIGHT);
			this.player.draw();
			for (var i = 0; i < 200; i++){
				that.pipeArray[i].draw();
			}
		}
		function checkScore(){
			// console.log('checkScore being called', this.player.x);
			for (var i = 0; i < 200; i+=2){
				if (that.pipeArray[i].x + that.pipeArray[i].width === this.player.x){
					console.log('checkScore being called', this.player.x);
					score++;
					scoreText.innerHTML = 'Score: ' + score;
					oldHighScore = localStorage.getItem('myHighScore'),
					console.log('gameover', highScore);
					highScore = Math.max(score, oldHighScore);
					highScoreText.innerHTML = 'Highscore: ' + highScore;
				}
			}
		}
		function checkGameOver(){
			for (var i = 0; i < 200; i++){
				if (AABBIntersect(this.player.x, this.player.y, this.player.width-10, this.player.height-10, that.pipeArray[i].x, that.pipeArray[i].y, that.pipeArray[i].width-10, that.pipeArray[i].height-10)) {
					gameStopped = 1;
					gameOverText.style.display = 'block';
					console.log('gameover', highScore);
					localStorage.setItem('myHighScore', highScore);
					window.cancelAnimationFrame(animationLoop);
					break;
				}
			}
			document.addEventListener('keydown', function (evt) {
				if (evt.keyCode === 32){
					if (gameStopped === 1){
					gameStopped = 0;
					gameOverText.style.display = 'none';
					score = 0;
					speed = 0.3;
					scoreText.innerHTML = 'Score: ' + score;
					mainGame();
					}
				}
			});
		}

		mainGame();

	})();
