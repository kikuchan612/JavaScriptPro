//-----------------Tools-----------------//
(function() {
    var Tools = {
        getRandom: function(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min
        }
    }

    window.Tools = Tools
})();
//-----------------Food-----------------//
(function() {
    var position = 'absolute'
    var elements = []
        //创建食物实例
    function Food(options) {
        options = options || {}
        this.x = options.x || 0
        this.y = options.y || 0
        this.width = options.width || 20
        this.height = options.height || 20
        this.backgroundColor = options.backgroundColor || 'green'
    }
    //添加食物渲染方法
    Food.prototype.render = function(map) {
            //删除食物
            remove()
                //随机生成x,y
            this.x = Tools.getRandom(0, (map.offsetWidth / this.width - 1)) * this.width
            this.y = Tools.getRandom(0, (map.offsetHeight / this.height - 1)) * this.height
                //动态添加食物
            var div = document.createElement('div')
            map.appendChild(div)
            elements.push(div)
                //设置食物样式
            div.style.position = position
            div.style.left = this.x + 'px'
            div.style.top = this.y + 'px'
            div.style.width = this.width + 'px'
            div.style.height = this.height + 'px'
            div.style.backgroundColor = this.backgroundColor
        }
        //删除食物
    function remove() {
        for (var i = elements.length - 1; i >= 0; i--) {
            //删除div
            elements[i].parentNode.removeChild(elements[i])
                //删除数组元素
            elements.splice(i, 1)
        }
    }

    window.Food = Food
})();
//-----------------Snake-----------------//
(function() {
    var position = 'absolute'
    var elements = []
        //创建蛇实例
    function Snake(options) {
        options = options || {}
        this.width = options.width || 20
        this.height = options.height || 20

        this.direction = options.direction || 'right'

        this.body = [{
                x: 3,
                y: 2,
                color: 'red'
            },
            {
                x: 2,
                y: 2,
                color: 'blue'
            },
            {
                x: 1,
                y: 2,
                color: 'blue'
            }
        ]
    }
    //添加蛇渲染方法
    Snake.prototype.render = function(map) {
            remove()
                //渲染所有蛇身
            for (var i = 0, len = this.body.length; i < len; i++) {
                var object = this.body[i]

                var div = document.createElement('div')
                map.appendChild(div)
                elements.push(div)
                div.style.position = position
                div.style.width = this.width + 'px'
                div.style.height = this.height + 'px'
                div.style.left = object.x * this.width + 'px'
                div.style.top = object.y * this.height + 'px'
                div.style.backgroundColor = object.color
            }
        }
        //添加蛇移动方法
    Snake.prototype.move = function(food, map) {

            //蛇身移动
            for (var i = this.body.length - 1; i > 0; i--) {
                this.body[i].x = this.body[i - 1].x
                this.body[i].y = this.body[i - 1].y
            }
            //蛇头移动
            var head = this.body[0]
            switch (this.direction) {
                case 'right':
                    head.x += 1
                    break
                case 'left':
                    head.x -= 1
                    break
                case 'up':
                    head.y -= 1
                    break
                case 'down':
                    head.y += 1
            }
            //蛇是否与食物重合
            var headX = head.x * this.width
            var headY = head.y * this.height
            if (headX === food.x && headY === food.y) {
                var last = this.body[this.body.length - 1]
                this.body.push({
                    x: last.x,
                    y: last.y,
                    color: last.color
                })
                food.render(map)
            }

        }
        //移除蛇节
    function remove() {
        for (var i = elements.length - 1; i >= 0; i--) {
            //删除div
            elements[i].parentNode.removeChild(elements[i])
                //删除数组元素
            elements.splice(i, 1)
        }
    }

    window.Snake = Snake
})();
//-----------------Game-----------------//
(function() {
    var _this

    function Game(map) {
        this.food = new Food()
        this.snake = new Snake()
        this.map = map
        _this = this

    }
    //游戏开始
    Game.prototype.start = function() {
            //渲染食物和蛇
            this.food.render(this.map)
            this.snake.render(this.map)
                //蛇移动逻辑
                //1.蛇移动
            run()
                //2.键盘控制
            keyboard()
                //3.蛇遇到食物
                //4.蛇遇到边界
        }
        //蛇移动
    function run() {
        var timer = setInterval(function() {
            this.snake.move(this.food, this.map)
            this.snake.render(this.map)

            var maxX = this.map.offsetWidth / this.snake.width
            var maxY = this.map.offsetHeight / this.snake.height
            var headX = this.snake.body[0].x
            var headY = this.snake.body[0].y
            if (headX < 0 || headX >= maxX) {
                alert('Game Over!')
                clearInterval(timer)
            }
            if (headY < 0 || headY >= maxY) {
                alert('Game Over!')
                clearInterval(timer)
            }
        }.bind(_this), 150)
    }
    //键盘监听
    function keyboard() {
        document.addEventListener('keydown', function(e) {
            //37-左 38-上 39-右 40-下
            switch (e.keyCode) {
                case 37:
                    this.snake.direction = 'left'
                    break
                case 38:
                    this.snake.direction = 'up'
                    break
                case 39:
                    this.snake.direction = 'right'
                    break
                case 40:
                    this.snake.direction = 'down'
                    break
            }
        }.bind(_this), false)
    }

    window.Game = Game
})();
//-----------------Index-----------------//
(function() {
    var map = document.getElementById('map')
    var game = new Game(map)
    game.start()
})();