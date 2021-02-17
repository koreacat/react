import React, { useEffect } from 'react';
import './FeedingCats.scss';

let canvas: any = null;
let c: any = null;
let projectTiles: any = null;
let player: any = null;
let speed: number = 100;

class Player {
    x: number;
    y: number;
    radius: number;
    color: string;

    constructor(x: number, y: number, radius: number, color: string) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
    }

    draw() {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.fillStyle = this.color;
        c.fill();
    }
}

class Projectile {
    x: number;
    y: number;
    radius: number;
    color: string;
    velocity: any;

    constructor(x: number, y: number, radius: number, color: string, velocity: any) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.velocity = velocity;
    }

    draw() {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.fillStyle = this.color;
        c.fill();
    }

    update() {
        this.draw();
        this.x = this.x + this.velocity.x * speed;
        this.y = this.y + this.velocity.y * speed;
    }
}

function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, canvas.width, canvas.height);
    player.draw();

    projectTiles.forEach((projectTile: any) => {
        projectTile.update();
    });
}

const event = () => {
	let intervalId: any;
    window.addEventListener('mousedown', (e) => {
        const angle = Math.atan2(
            e.clientY - canvas.height / 2,
            e.clientX - canvas.width / 2
        );

        const velocity = {
            x: Math.cos(angle),
            y: Math.sin(angle)
        };

		intervalId = setInterval(() => {
			projectTiles.push(new Projectile(
				canvas.width / 2,
				canvas.height / 2,
				5,
				'#fff',
				velocity
			))
		}, 200);
    })

	window.addEventListener('mouseup', (e) => {
		clearInterval(intervalId);
	})
};

const FeedingCats = () => {

    useEffect(() => {
        canvas = document.getElementById('feedingCatsCanvas');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        c = canvas.getContext('2d');

        const x = canvas.width / 2;
        const y = canvas.height / 2;
        player = new Player(x, y, 30, 'green');
        player.draw();
        projectTiles = [];


        event();
        animate();
    });

    return (
        <div className={'feedingCats'}>
			<div className={'feedingCatsWrap'}>
                <canvas id={'feedingCatsCanvas'}></canvas>
            </div>
        </div>
    )
};

export default FeedingCats;
