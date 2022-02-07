// setup canvas

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;

// implementing score counter

const scoreCounter = document.querySelector('p');
let ballCount = 0;

// function to generate random number

function random(min, max) {
  const num = Math.floor(Math.random() * (max - min + 1)) + min;
  return num;
}

// define Ball constructor

function Shape(x, y, velX, velY, exists) {
  this.x = x;
  this.y = y;
  this.velX = velX;
  this.velY = velY;
  this.exists = exists;
}


function Ball(x, y, velX, velY, exists, color, size) {
  Shape.call(this, x, y, velX, velY, exists);
  this.color = color;
  this.size = size;
}

// define prototype for Ball

Ball.prototype = Object.create(Shape.prototype);

Object.defineProperty(Ball.prototype, 'constructor', {
  value: Ball,
  enumerable: false,
  writable: true
});
// Ball.prototype.constructor = Ball;

// define ball draw method

Ball.prototype.draw = function () {
  ctx.beginPath();
  ctx.fillStyle = this.color;
  ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
  ctx.fill();
}

// define ball update method

Ball.prototype.update = function () {
  if ((this.x + this.size) >= width) {
    this.velX = -(this.velX);
  }

  if ((this.x - this.size) <= 0) {
    this.velX = -(this.velX);
  }

  if ((this.y + this.size) >= height) {
    this.velY = -(this.velY);
  }

  if ((this.y - this.size) <= 0) {
    this.velY = -(this.velY);
  }

  this.x += this.velX;
  this.y += this.velY;
}

// define ball collision detection

Ball.prototype.collisionDetect = function () {
  for (let i = 0; i < balls.length; i += 1) {
    if (!(this === balls[ i ])) {
      const dx = this.x - balls[ i ].x;
      const dy = this.y - balls[ i ].y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (balls[ i ].exists && distance < this.size + balls[ i ].size) {
        balls[ i ].color = this.color = 'rgb(' + random(0, 255) + ',' + random(0, 255) + ',' + random(0, 255) + ')';
      }
    }
  }
}


// define array to store balls and populate it

let balls = [];

while (balls.length < 25) {
  const size = random(10, 20);
  let ball = new Ball(
    // ball position always drawn at least one ball width
    // away from the adge of the canvas, to avoid drawing errors
    random(0 + size, width - size),
    random(0 + size, height - size),
    random(-7, 7),
    random(-7, 7),
    true,
    'rgb(' + random(0, 255) + ',' + random(0, 255) + ',' + random(0, 255) + ')',
    size
  );
  balls.push(ball);
  ballCount += 1;
  scoreCounter.textContent = `Score: ${ ballCount }`;

}



// defining evil circle

function EvilCircle(x, y, exists) {
  Shape.call(this, x, y, 20, 20, exists);
  this.color = 'white';
  this.size = 10;
}

EvilCircle.prototype = Object.create(Shape.prototype);

Object.defineProperty(EvilCircle.prototype, 'constructor', {
  value: EvilCircle,
  enumerable: false,
  writable: true
});
// EvilCircle.prototype.constructor = EvilCircle;

// defining evil circle methods

EvilCircle.prototype.draw = function () {
  ctx.beginPath();
  ctx.lineWidth = 3;
  ctx.strokeStyle = this.color;
  ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
  ctx.stroke();
}

EvilCircle.prototype.checkBounds = function () {
  if ((this.x + this.size) >= width) {
    this.x -= this.size;
  }

  if ((this.x - this.size) <= 0) {
    this.x += this.size;
  }

  if ((this.y + this.size) >= height) {
    this.y -= this.size;
  }

  if ((this.y - this.size) <= 0) {
    this.y += this.size;
  }
}

// EvilCircle.prototype.setControls = function () {
//   let _this = this;
//   window.onkeydown = function (e) {
//     if (e.key === 'a') {
//       _this.x -= _this.velX;
//     } else if (e.key === 'd') {
//       _this.x += _this.velX;
//     } else if (e.key === 'w') {
//       _this.y -= _this.velY;
//     } else if (e.key === 's') {
//       _this.y += _this.velY;
//     }
//   }
// }


// challenge de arrow functions y this ////////////////////

EvilCircle.prototype.setControls = function () {
  // let _this = this;
  window.onkeydown = e => {
    if (e.key === 'a') {
      this.x -= this.velX;
    } else if (e.key === 'd') {
      this.x += this.velX;
    } else if (e.key === 'w') {
      this.y -= this.velY;
    } else if (e.key === 's') {
      this.y += this.velY;
    }
  }
}


////////////////////////////////////////////////////////

EvilCircle.prototype.collisionDetect = function () {
  for (let i = 0; i < balls.length; i += 1) {
    if (balls[ i ].exists) {
      const dx = this.x - balls[ i ].x;
      const dy = this.y - balls[ i ].y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < this.size + balls[ i ].size) {
        balls[ i ].exists = false;
        ballCount -= 1;
        if (ballCount === 0) {
          alert('Game Over!')
        }
      }
      scoreCounter.textContent = `Score: ${ ballCount }`;
    }
  }
}

// define loop that keeps drawing the scene constantly
const evilCircle = new EvilCircle(
  width / 2,
  height / 2,
  true
);

evilCircle.setControls();


function loop() {
  ctx.fillStyle = 'rgba(0,0,0,0.25)';
  ctx.fillRect(0, 0, width, height);

  for (let i = 0; i < balls.length; i += 1) {

    if (balls[ i ].exists) {
      balls[ i ].draw();
      balls[ i ].update();
      balls[ i ].collisionDetect();
    }
  }
  evilCircle.draw();
  evilCircle.checkBounds();
  evilCircle.collisionDetect();

  requestAnimationFrame(loop);
}

loop();




