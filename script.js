let canvas = document.querySelector('canvas');

canvas.width = innerWidth;
canvas.height = innerHeight;

let c = canvas.getContext('2d');


let gravity = 1;
let friction = 0.8;

let position = {
	x: undefined,
	y: undefined
}

window.addEventListener('click', (e) => {
	position.x = e.x;
	position.y = e.y;

	console.log('I am clicked')
})

class Circles {
	constructor(x, y, dy, ra, red, green, blue) {
		this.x = x,
			this.y = y,
			this.dy = dy,
			this.ra = ra,
			this.red = red,
			this.green = green,
			this.blue = blue
	}

	draw() {
		c.beginPath();

		c.fillStyle = `rgb(${this.red}, ${this.green}, ${this.blue})`;
		c.strokeStyle = 'rgb(0,0,0,0)';

		c.arc(this.x, this.y, this.ra, Math.PI * 2, false);
		c.fill();
		c.stroke();

		//console.log(`I am Circle. My rad is ${this.ra}`);
	}
	update() {
		if (this.y + this.ra >= innerHeight) {
			this.dy = -this.dy * friction;

		} else {
			this.dy += gravity;
		}

		this.y += this.dy;



		if (position.x - this.x < this.ra && position.x - this.x > -this.ra && position.y - this.y < this.ra && position.y - this.y > -this.ra) {
			this.y -= 10;
		}

	}

}

let balls = [];

for (let i = 0; i < 100; i++) {
	let x = Math.random() * innerWidth;
	let y = Math.random() * innerHeight;
	let ra = 30;
	let dy = Math.random() * 8;
	let red = Math.random() * 255;
	let green = Math.random() * 255;
	let blue = Math.random() * 255;

	let circle = new Circles(x, y, dy, ra, red, green, blue);

	balls.push(circle);
}


const anim = () => {
	requestAnimationFrame(anim);
	c.clearRect(0, 0, innerWidth, innerHeight);

	for (let i = 0; i < balls.length; i++) {
		balls[i].draw();
		balls[i].update();
	}

	console.log('hemal')
}

anim()