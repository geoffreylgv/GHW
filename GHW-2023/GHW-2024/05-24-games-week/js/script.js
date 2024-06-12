window.onload = function() {

    //Variables

    var canvasWidth = 900;
    var canvasHeight = 600;
    var blockSize = 30;
    var ctx;
    var delay = 300;
    var snakee;
    var applee;
    var widthInBlocks = canvasWidth / blockSize;
    var heightInBlocks = canvasHeight / blockSize;
    var score;
    var timeOut;
    //Main code

    init();

    //Functions

    //fonction d'initialisation
    function init() {
        var canvas = document.createElement("canvas");
        canvas.width = canvasWidth;
        canvas.height = canvasHeight;
        canvas.style.border = "30px dashed gray";
        canvas.style.margin = "50px auto";
        canvas.style.display = "block";
        canvas.style.backgroundColor = "#ddd";
        document.body.appendChild(canvas);
        ctx = canvas.getContext('2d');
        snakee = new Snake([
            [6, 4],
            [5, 4],
            [4, 4]
        ], 'right');
        applee = new Apple([10, 10]);
        score = 0;
        refreshCanvas();
    }

    //rafraichir le cadre canvas
    function refreshCanvas() {
        snakee.advance();
        if (!snakee.checkCollision()) {
            if (snakee.isEatingApple(applee)) {
                //mange la pomme
                score++;
                snakee.ateApple = true;
                do {
                    applee.setNewPosition();
                } while (applee.isOnSnake(snakee))
            }
            ctx.clearRect(0, 0, canvasWidth, canvasHeight);
            drawScore();
            snakee.draw();
            applee.draw();
            timeOut = setTimeout(refreshCanvas, delay);
        } else {
            //End gome over
            gameOver();
        }

    }

    //function Game over
    function gameOver() {
        ctx.save();
        ctx.font = "bold 30px sans-serif";
        ctx.fillStyle = "#000";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.strokeStyle = "white";
        ctx.lineWidth = 5;
        var centreX = canvasWidth / 2;
        var centreY = canvasHeight / 2;
        ctx.strokeText("Fin ! Game Over", centreX, centreY - 180);
        ctx.fillText("Fin ! Game Over", centreX, centreY - 180);
        ctx.fillText("Appuyer sur la touche espace pour rejouer", centreX, centreY - 120);
        ctx.restore();
    };

    //function restart 
    function restart() {
        snakee = new Snake([
            [6, 4],
            [5, 4],
            [4, 4]
        ], 'down');
        applee = new Apple([10, 10]);
        score = 0;
        clearTimeout(timeOut);
        refreshCanvas();
    }
    //function draw score
    function drawScore() {
        ctx.save();
        ctx.font = "bold 200px sans-serif";
        ctx.fillStyle = "gray";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        var centreX = canvasWidth / 2;
        var centreY = canvasHeight / 2;
        ctx.fillText(score.toString(), centreX, centreY);
        ctx.restore();
    }
    //fonction drawBlock 
    function drawBlock(ctx, position) {
        var x = position[0] * blockSize;
        var y = position[1] * blockSize;
        ctx.fillRect(x, y, blockSize, blockSize);
    }
    //fonction du Snake
    function Snake(body, direction) {
        this.body = body;
        this.ateApple = false;
        this.direction = direction;
        this.draw = function() {
            ctx.save();
            ctx.fillStyle = "#ff0000";
            for (i = 0; i < this.body.length; i++) {
                drawBlock(ctx, body[i]);
            }
            ctx.restore();
        };
        this.advance = function() {
            var nextPosition = this.body[0].slice();
            switch (this.direction) {
                case 'left':
                    nextPosition[0] -= 1;
                    break;
                case 'right':
                    nextPosition[0] += 1;
                    break;
                case 'down':
                    nextPosition[1] += 1;
                    break;
                case 'up':
                    nextPosition[1] -= 1;
                    break;
                default:
                    throw ("Invalid Position");
            }
            this.body.unshift(nextPosition);
            if (!this.ateApple) {
                this.body.pop();
            } else {
                this.ateApple = false;
            }
        };
        this.setDirection = function(newDirection) {
            var allowDirections;
            switch (this.direction) {
                case 'left':
                case 'right':
                    allowDirections = ['up', 'down'];
                    break;
                case 'down':
                case 'up':
                    allowDirections = ['left', 'right']
                    break;
                default:
                    throw ('Invalid direction');
            }
            if (allowDirections.indexOf(newDirection) > -1) {
                this.direction = newDirection;
            }
        };

        this.checkCollision = function() {
            var wallCollision = false;
            var snakeCollision = false;
            var head = this.body[0];
            var rest = this.body.slice(1);
            var snakeX = head[0];
            var snakeY = head[1];
            var minX = 0;
            var minY = 0;
            var maxX = widthInBlocks - 1;
            var maxY = heightInBlocks - 1;
            var isNotBetweenHorizontalWalls = snakeX < minX || snakeX > maxX;
            var isNotBetweenVerticalWalls = snakeY < minY || snakeY > maxY;

            if (isNotBetweenHorizontalWalls || isNotBetweenVerticalWalls)
                wallCollision = true;

            for (var i = 0; i < rest.length; i++) {
                if (snakeX === rest[i][0] && snakeY === rest[i][1])
                    snakeCollision = true;
            }

            return wallCollision || snakeCollision;
        };
        this.isEatingApple = function(appleToEat) {
            var head = this.body[0];
            if (head[0] == appleToEat.position[0] && head[1] == appleToEat.position[1])
                return true;
            else
                return false;
        }
    }

    //La pomme
    function Apple(position) {
        this.position = position;
        this.draw = function() {
            ctx.save();
            ctx.fillStyle = '#33cc33';
            ctx.beginPath();
            var radius = blockSize / 2;
            var x = this.position[0] * blockSize + radius;
            var y = this.position[1] * blockSize + radius;
            ctx.arc(x, y, radius, 0, Math.PI * 2, true);
            ctx.fill();
            ctx.restore();
        };
        this.setNewPosition = function() {
            var newX = Math.round(Math.random() * (widthInBlocks - 1));
            var newY = Math.round(Math.random() * (heightInBlocks - 1));

            this.position = [newX, newY];
        };
        this.isOnSnake = function(snakeToCheck) {
            //tocheck
            var isOnSnake = false;
            for (var i = 0; i < snakeToCheck.body.lehgth; i++) {
                if (this.position[0] == snakeToCheck.body[i][0] && this.position[1] == snakeToCheck.body[i][1]) {
                    isOnSnake = true;
                }
                return isOnSnake;
            }
        };
    };
    //Event functions and handle
    document.onkeydown = function handleKeyDown(event) {
        var key = event.keyCode;
        var newDirection;
        switch (key) {
            case 37:
                newDirection = 'left';
                break;
            case 38:
                newDirection = 'up';
                break;
            case 39:
                newDirection = 'right';
                break;
            case 40:
                newDirection = 'down';
                break;
            case 32:
                restart();
                return;
            default:
                return;
        }
        snakee.setDirection(newDirection);
    };

}
