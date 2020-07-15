var canvas = document.getElementById("dotLine");
        
		function Starry() {
			this.cxt = canvas.getContext("2d");
			this.num = 15;
			this.data = [];
		}
		Starry.prototype = {
			init: function () {
				// canvas.width = 800;
				// canvas.height = 500;
                // 设置画布大小
				canvas.width = parseInt(window.innerWidth*0.3);
                canvas.height = parseInt(window.innerHeight*0.6);
				var cS = canvas.width;
				var cH = canvas.height;

				for(var i = 0; i < this.num; i++) {
					this.data[i] = {
						//位置
						x: Math.random() * cS,
						y: Math.random() * cH,
						//速度
						sX: Math.random() * 0.6 - 0.3,
						sY: Math.random() * 0.6 - 0.3
						//鼠标坐标

					};
				}
			},
			drawCircle: function(x, y) {
				var cxt = this.cxt;
				cxt.save();
				// cxt.fillStyle = '#263054';
				cxt.fillStyle = 'rgba(255,255,255,0.5)';
				cxt.beginPath();
				cxt.arc(x, y, 5, 0, Math.PI * 2, false);
				cxt.closePath();
				cxt.fill();
				cxt.restore();
			},
			drawLine: function(x1, y1, x2, y2) {
				var cxt = this.cxt;
				cxt.save();
				var line = cxt.createLinearGradient(x1, y1, x2, y2);
				line.addColorStop(0, "#369");
				line.addColorStop(1, "#369");
				cxt.strokeStyle = line;
				cxt.beginPath();
				cxt.moveTo(x1, y1);
				cxt.lineTo(x2, y2);
				cxt.stroke();
				cxt.restore();
			},
			drawMouseLine: function(x1, y1, x2, y2) {
				var cxt = this.cxt;
				cxt.save();
				var line = cxt.createLinearGradient(x1, y1, x2, y2);
				line.addColorStop(0, "#369");
				line.addColorStop(1, "red");
				cxt.strokeStyle = line;
				cxt.beginPath();
				cxt.moveTo(x1, y1);
				cxt.lineTo(x2, y2);
				cxt.stroke();
				cxt.restore();
			},
			moveCircle: function() {
				this.cxt.clearRect(0, 0, canvas.width, canvas.height);
				for(var i = 0; i < this.num; i++) {

					this.data[i].x += this.data[i].sX;
					this.data[i].y += this.data[i].sY;
					if(this.data[i].x < 0 || this.data[i].x > canvas.width) {
						this.data[i].sX = -this.data[i].sX;
					}
					if(this.data[i].y < 0 || this.data[i].y > canvas.height) {
						this.data[i].sY = -this.data[i].sY;
					}
					this.drawCircle(this.data[i].x, this.data[i].y);
					//勾股定理
                    for (var j = i + 1; j < this.num; j++) {
                        // 控制连线长度
						if(Math.pow(this.data[i].x - this.data[j].x, 2) + Math.pow(this.data[i].y - this.data[j].y, 2) < 100 * 100) {							
							this.drawLine(this.data[i].x, this.data[i].y, this.data[j].x, this.data[j].y);
							//							console.log("aa");
							/*this.drawMouseLine(this.data[i].x, this.data[i].y, event.clientX, event.clientY);*/
						}
					}
				}
			},
			/*getMouse: function() {
				var e = event || window.event;
				canvas.addEventListener("mousemove",onmousemove);
				var x = event.clientX - canvas.getBoundingClientRect().left;
				var y = event.clientY - canvas.getBoundingClientRect().top;
				return {
					x,
					y
				}
			}*/

}
onresize = function () {
	canvas.width = parseInt(window.innerWidth * 0.3)
	canvas.height = parseInt(window.innerHeight * 0.6)
		}
var starry = new Starry();
		starry.init();
		setInterval(function() {
			starry.moveCircle();
		}, 13);