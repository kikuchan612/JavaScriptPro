(function () { var a = { getRandom: function (c, b) { return Math.floor(Math.random() * (b - c + 1)) + c } }; window.Tools = a })(); (function () { var b = "absolute"; var d = []; function c(e) { e = e || {}; this.x = e.x || 0; this.y = e.y || 0; this.width = e.width || 20; this.height = e.height || 20; this.backgroundColor = e.backgroundColor || "green" } c.prototype.render = function (e) { a(); this.x = Tools.getRandom(0, (e.offsetWidth / this.width - 1)) * this.width; this.y = Tools.getRandom(0, (e.offsetHeight / this.height - 1)) * this.height; var f = document.createElement("div"); e.appendChild(f); d.push(f); f.style.position = b; f.style.left = this.x + "px"; f.style.top = this.y + "px"; f.style.width = this.width + "px"; f.style.height = this.height + "px"; f.style.backgroundColor = this.backgroundColor }; function a() { for (var e = d.length - 1; e >= 0; e--) { d[e].parentNode.removeChild(d[e]); d.splice(e, 1) } } window.Food = c })(); (function () { var b = "absolute"; var d = []; function c(e) { e = e || {}; this.width = e.width || 20; this.height = e.height || 20; this.direction = e.direction || "right"; this.body = [{ x: 3, y: 2, color: "red" }, { x: 2, y: 2, color: "blue" }, { x: 1, y: 2, color: "blue" }] } c.prototype.render = function (h) { a(); for (var g = 0, e = this.body.length; g < e; g++) { var f = this.body[g]; var j = document.createElement("div"); h.appendChild(j); d.push(j); j.style.position = b; j.style.width = this.width + "px"; j.style.height = this.height + "px"; j.style.left = f.x * this.width + "px"; j.style.top = f.y * this.height + "px"; j.style.backgroundColor = f.color } }; c.prototype.move = function (k, j) { for (var g = this.body.length - 1; g > 0; g--) { this.body[g].x = this.body[g - 1].x; this.body[g].y = this.body[g - 1].y } var f = this.body[0]; switch (this.direction) { case "right": f.x += 1; break; case "left": f.x -= 1; break; case "up": f.y -= 1; break; case "down": f.y += 1 }var e = f.x * this.width; var l = f.y * this.height; if (e === k.x && l === k.y) { var h = this.body[this.body.length - 1]; this.body.push({ x: h.x, y: h.y, color: h.color }); k.render(j) } }; function a() { for (var e = d.length - 1; e >= 0; e--) { d[e].parentNode.removeChild(d[e]); d.splice(e, 1) } } window.Snake = c })(); (function () { var d; function c(e) { this.food = new Food(); this.snake = new Snake(); this.map = e; d = this } c.prototype.start = function () { this.food.render(this.map); this.snake.render(this.map); b(); a() }; function b() { var e = setInterval(function () { this.snake.move(this.food, this.map); this.snake.render(this.map); var h = this.map.offsetWidth / this.snake.width; var g = this.map.offsetHeight / this.snake.height; var f = this.snake.body[0].x; var i = this.snake.body[0].y; if (f < 0 || f >= h) { alert("Game Over!"); clearInterval(e) } if (i < 0 || i >= g) { alert("Game Over!"); clearInterval(e) } }.bind(d), 150) } function a() { document.addEventListener("keydown", function (f) { switch (f.keyCode) { case 37: this.snake.direction = "left"; break; case 38: this.snake.direction = "up"; break; case 39: this.snake.direction = "right"; break; case 40: this.snake.direction = "down"; break } }.bind(d), false) } window.Game = c })(); (function () { var b = document.getElementById("map"); var a = new Game(b); a.start() })();