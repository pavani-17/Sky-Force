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
                return false;
            }
            else
            {
                return true;
            }
        })
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
                this.stop();
            }
            for (const obj1 of this.missiles)
            {
                var missileBox = new Box3().setFromObject(obj1);   
                if(enemyBox.intersectsBox(missileBox) && obj1.visible && object.visible)
                {
                    object.visible = false;
                    obj1.visible = false;
                    break;
                }
            }
        }
        for (const star of this.stars)
        {
            var starBox = new Box3().setFromObject(star);
            if(starBox.intersectsBox(planeBox))
            {
                this.score++;
                console.log(this.score);
                star.visible = false;
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
        
    }
}

export {Loop};
