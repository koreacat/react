import React, { useEffect } from 'react';
import './FeedingCats.scss';
import gsap from 'gsap';

let x = 0; 
let y = 0;

let canvas: any = null;
let c: any = null;

let feedingCatsScoreEl: any = null;
let startGameBtn: any = null;

let player: any = null;
let projectTiles: any = null;
let enemies: any = null;
let particles: any = null;
let score: number = 0;

let bulletSpeed: number = 8;
let enemySpeed: number = 2;

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
        this.x = this.x + this.velocity.x * bulletSpeed;
        this.y = this.y + this.velocity.y * bulletSpeed;
    }
}

class Enemy {
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
        this.x = this.x + this.velocity.x * enemySpeed;
        this.y = this.y + this.velocity.y * enemySpeed;
    }
}

const friction = 0.99;
class Particle {
    x: number;
    y: number;
    radius: number;
    color: string;
    velocity: any;
    alpha: number;

    constructor(x: number, y: number, radius: number, color: string, velocity: any) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.velocity = velocity;
        this.alpha = 1;
    }

    draw() {
        c.save();
        c.globalAlpha = 0.1;
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.fillStyle = this.color;
        c.fill();
        c.restore();
    }

    update() {
        this.draw();
        this.velocity.x *= friction;
        this.velocity.y *= friction;
        this.x = this.x + this.velocity.x * enemySpeed;
        this.y = this.y + this.velocity.y * enemySpeed;
        this.alpha -= 0.01
    }
}

let animationId: any = null;
function animate() {
    animationId = requestAnimationFrame(animate);
    c.fillStyle = 'rgba(0, 0, 0, 0.1)'
    c.fillRect(0, 0, canvas.width, canvas.height);
    player.draw();

    particles.forEach((particle: any, index: number) => {
        if (particle.alpha <= 0) {
            particles.splice(index, 1)
        } else {
            particle.update();
        }
    });

    projectTiles.forEach((projectTile: any, index: number) => {
        projectTile.update();

        //remove from edges of screen
        if(
            projectTile.x - projectTile.radius < 0 || 
            projectTile.x - projectTile.radius > canvas.width ||
            projectTile.y + projectTile.radius < 0 ||
            projectTile.y - projectTile.raius > canvas.height
        ){
            setTimeout(() => {
                projectTiles.splice(index, 1)
            }, 0)
        }
    });

    enemies.forEach((enemy: any, index: number) => {
        enemy.update();

        const dist = Math.hypot(player.x - enemy.x, player.y - enemy.y);

        //end game
        if(dist - enemy.radius - player.radius < 1) {
            cancelAnimationFrame(animationId);
            startGameBtn.style.display = 'block';
        }

        projectTiles.forEach((projectile: any, projectileIndex: number) => {
            const dist = Math.hypot(projectile.x - enemy.x, projectile.y - enemy.y);

            //touch enemy
            if(dist - enemy.radius - projectile.radius < 1) {
                
                for(let i = 0; i < enemy.radius * 2; i++) {
                    particles.push(
                        new Particle(
                            projectile.x, 
                            projectile.y,
                            Math.random() * 2,
                            enemy.color, 
                            {
                                x: (Math.random() - 0.5) * (Math.random() * 6),
                                y: (Math.random() - 0.5) * (Math.random() * 6)
                            }
                        )
                    )
                }

                if(enemy.radius - 10 > 5) {
                    score += 100;
                    feedingCatsScoreEl.innerHTML = score;

                    gsap.to(enemy, {
                        radius: enemy.radius - 10
                    })
                    setTimeout(() => {
                        projectTiles.splice(projectileIndex, 1)
                    }, 0)
                } else {
                    setTimeout(() => {
                        score += 250;
                        feedingCatsScoreEl.innerHTML = score;

                        enemies.splice(index, 1)
                        projectTiles.splice(projectileIndex, 1)
                    }, 0)
                }
            } 
        });
    });
}

let spawnEnemiesIntervalId: any = null;
function spawnEnemies() {
    spawnEnemiesIntervalId = setInterval(() => {
        const radius = Math.random() * (30 - 4) + 4;
        let x;
        let y;

        if (Math.random() < 0.5) {
            x = Math.random() < 0.5 ? 0 - radius : canvas.width + radius;
            y = Math.random() * canvas.height;
        } else {
            x = Math.random() * canvas.width;
            y = Math.random() < 0.5 ? 0 - radius : canvas.height + radius;
        }
        

        const color = `hsl(${Math.random() * 360}, 50%, 50%)`

        const angle = Math.atan2(canvas.height / 2 - y, canvas.width / 2 - x)

        const velocity = {
            x: Math.cos(angle),
            y: Math.sin(angle)
        }

        enemies.push(new Enemy(x, y, radius, color, velocity));
    }, 1000);
}

function init() {
    clearInterval(spawnEnemiesIntervalId);
    player = new Player(x, y, 10, 'white');
    projectTiles = [];
    enemies = [];
    particles = [];
    score = 0;
    feedingCatsScoreEl.innerHTML = score;
    startGameBtn.style.display = 'none';
}

const event = () => {
    window.addEventListener('click', (e) => {
        const angle = Math.atan2(
            e.clientY - canvas.height / 2,
            e.clientX - canvas.width / 2
        );

        const velocity = {
            x: Math.cos(angle),
            y: Math.sin(angle)
        };

		projectTiles.push(new Projectile(
			canvas.width / 2,
			canvas.height / 2,
			5,
			'#fff',
			velocity
		))
    })

    startGameBtn.addEventListener('click', () => {
        init();
        animate();
        spawnEnemies();
    });

	// let intervalId: any;
    // window.addEventListener('mousedown', (e) => {
    //     const angle = Math.atan2(
    //         e.clientY - canvas.height / 2,
    //         e.clientX - canvas.width / 2
    //     );

    //     const velocity = {
    //         x: Math.cos(angle),
    //         y: Math.sin(angle)
    //     };

	// 	intervalId = setInterval(() => {
	// 		projectTiles.push(new Projectile(
	// 			canvas.width / 2,
	// 			canvas.height / 2,
	// 			5,
	// 			'#fff',
	// 			velocity
	// 		))
	// 	}, 200);
    // })

	// window.addEventListener('mouseup', (e) => {
	// 	clearInterval(intervalId);
	// })
};

const FeedingCats = () => {

    useEffect(() => {
        canvas = document.getElementById('feedingCatsCanvas');
        feedingCatsScoreEl = document.getElementById('feedingCatsScoreEl');
        startGameBtn = document.getElementById('startGameBtn');

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        c = canvas.getContext('2d');

        x = canvas.width / 2;
        y = canvas.height / 2;
        player = new Player(x, y, 10, 'white');
        player.draw();
        projectTiles = [];
        enemies = [];
        particles = [];

        event();
        animate();
        spawnEnemies();
    });

    return (
        <div className={'feedingCats'}>
			<div className={'feedingCatsWrap'}>
                <div className={'feedingCatsScore'}>
                    <span>Score: </span>
                    <span id={'feedingCatsScoreEl'}>0</span>
                    <button id={'startGameBtn'} style={{display: 'none'}}>restart</button>
                </div>
                <canvas id={'feedingCatsCanvas'}></canvas>
            </div>
        </div>
    )
};

export default FeedingCats;
