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

class Shape {
  constructor(x, y, velX, velY, exists) {
    this.x = x;
    this.y = y;
    this.velX = velX;
    this.velY = velY;
    this.exists = exists;
  }
}


class Ball extends Shape {
  constructor(x, y, velX, velY, exists, color, size) {
    super(x, y, velX, velY, exists);
    this.color = color;
    this.size = size;

  }

  draw() {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.fill();
  }

  // define ball update method

  update() {
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

  collisionDetect() {
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
}



// define ball draw method



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

class EvilCircle extends Ball {
  constructor(x, y, velX, velY, exists, color, size) {
    super(x, y, exists);
    this.velX = 20;
    this.velY = 20;
    this.color = 'white';
    this.size = 10;
  }
  // defining evil circle methods

  draw() {
    ctx.beginPath();
    ctx.lineWidth = 3;
    ctx.strokeStyle = this.color;
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.stroke();
  };

  checkBounds() {
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
  };

  setControls() {
    let _this = this;
    window.onkeydown = function (e) {
      if (e.key === 'a') {
        _this.x -= _this.velX;
      } else if (e.key === 'd') {
        _this.x += _this.velX;
      } else if (e.key === 'w') {
        _this.y -= _this.velY;
      } else if (e.key === 's') {
        _this.y += _this.velY;
      }
    }
  };

  collisionDetect() {
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
  };

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




