import { Clock, Box3 } from '../../../node_modules/three/src/Three.js';

const clock = new Clock();

class Loop
{
    constructor(camera, scene, renderer, world)
    {
        this.camera = camera;
        this.scene = scene;
        this.renderer = renderer;
        this.updatables = [];
        this.world = world;
        this.tick_var = 0;
        this.enemy = [];
        this.missiles = [];
        this.stars = [];
        this.score = 0;
        this.health = 100;
        this.enemy_missiles = [];
    }

    start()
    {
        this.renderer.setAnimationLoop(() => {
            // tell every animated object to tick forward one frame
            this.tick();

            // render a frame
            this.renderer.render(this.scene, this.camera);
        })
    }

    stop()
    {
        this.renderer.setAnimationLoop(null);
    }

    tick()
    {
        const delta = clock.getDelta();
        this.tick_var++;
        for (const object of this.updatables)
        {
            object.tick(delta);
        }
        
        this.updatables = this.updatables.filter((object) => {
            if(object.position.x < -3.5 || object.position.x > 3.5 || object.visible == false)
            {
                this.scene.remove(object);
                object.visible = false;
                return false;
            }
            else
            {
                return true;
            }
        })
        for (const object of this.enemy)
        {
            if(object.position.y > 1.5 || object.position.y < -1.5)
            {
                object.speed_y = -object.speed_y;
            }
        }
        if(this.tick_var%100 == 0)
        {
            this.world.make_enemy().then((temp) => {
                this.scene.add(temp)
                this.updatables.push(temp);
                this.enemy.push(temp);
            });
        }
    
        if(this.tick_var % 50 == 0)
        {
            this.world.make_star().then((temp) => {
                console.log("Making star");
                this.scene.add(temp)
                this.updatables.push(temp);
                this.stars.push(temp);
            });
        }
        var planeBox = new Box3().setFromObject(this.plane);
        for (const object of this.enemy)
        {
            var enemyBox = new Box3().setFromObject(object);
            if(enemyBox.intersectsBox(planeBox))
            {
                this.health -= 30;
                object.visible= false;
            }
            for (const obj1 of this.missiles)
            {
                var missileBox = new Box3().setFromObject(obj1);   
                if(enemyBox.intersectsBox(missileBox) && obj1.visible && object.visible)
                {
                    object.visible = false;
                    obj1.visible = false;
                    this.score += 5;
                    break;
                }
            }
        }
        for (const star of this.stars)
        {
            var starBox = new Box3().setFromObject(star);
            if(starBox.intersectsBox(planeBox))
            {
                this.score+=10;
                console.log(this.score);
                star.visible = false;
            }
        }

        for (const missile of this.enemy_missiles)

        {
            var missileBox = new Box3().setFromObject(missile);
            if(planeBox.intersectsBox(missileBox) && missile.visible)
            {
                missile.visible = false;
                this.health -= 10;
            }

        }
        if(this.tick_var % 500 == 0)
        {
            for (const enemy of this.enemy)
            {
                if(Math.random() < 0.5 || enemy.state == "Dynamic")
                {
                    this.world.make_bullet(enemy.position.x, enemy.position.y, enemy.position.z, -2).then((temp) => {
                        console.log(temp);
                        this.scene.add(temp);
                        this.updatables.push(temp);
                        this.enemy_missiles.push(temp);
                    })
                }
            }
        }
        this.enemy = this.enemy.filter((enemy) => {
            if(enemy.visible)
            {
                return true;
            }
            else
            {
                return false;
            }
        });
        this.missiles = this.missiles.filter((missile) => {
            if(missile.visible)
            {
                return true;
            }
            else
            {
                return false;
            }
        });

        this.stars = this.stars.filter((star) => {
            if(star.visible)
            {
                return true;
            }
            else
            {
                return false;
            }
        })

        this.enemy_missiles = this.enemy_missiles.filter((missile) => {
            if(missile.visible)
            {
                return true;
            }
            else
            {
                return false;
            }
        });

        if(this.health <= 0)
        {
            this.stop();
        }

        document.getElementById("score").innerHTML = "Score : " + this.score;
        document.getElementById("health").innerHTML = "Health : " + this.health;

    }
}

export {Loop};
