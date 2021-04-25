import { createCamera } from './components/camera.js';
import { createCube } from './components/cube.js';
import { createScene } from './components/scene.js';
import { createLights } from './components/lights.js';
import { createMissile } from './components/missile.js';
import { loadPlane } from './components/plane.js';
import { loadEnemy } from './components/enemy.js';
import {createStar} from './components/star.js';

import { createRenderer } from './systems/renderer.js';
import { Resizer } from './systems/Resizer.js';
import {Loop} from './systems/Loop.js';
import { MathUtils, Box3 } from '../../../node_modules/three/src/Three.js';


let scene;
let camera;
let renderer;
let loop;

class World
{
    constructor(container)
    {
        camera = createCamera();
        scene = createScene();
        renderer = createRenderer();

        
        loop = new Loop(camera, scene, renderer, this);

        container.append(renderer.domElement);

        const cube = createCube();
        const { ambientLight, mainLight } = createLights();

        scene.add(ambientLight, mainLight);

        const resizer = new Resizer(container, camera, renderer);
        
    }

    async init()
    {
        const {plane} = await loadPlane();
        loop.plane = plane;
        
        plane.position.set(-2.5,0,0)
        scene.add(plane);
        window.addEventListener("keydown", async (e) =>
        {
            if(e.code == "ArrowRight")
            {
                plane.position.x += 0.1;
            }
            else if(e.code == "ArrowLeft")
            {
                plane.position.x -= 0.1;
            }
            else if(e.code == "ArrowUp")
            {
                plane.position.y += 0.1;
            }
            else if(e.code == "ArrowDown")
            {
                plane.position.y -= 0.1;
            }
            else if(e.code == "Space")
            {
                const temp = await this.make_bullet(plane.position.x, plane.position.y,plane.position.z)
                scene.add(temp);
                loop.missiles.push(temp);
                loop.updatables.push(temp)
            }
        });
    }

    async make_bullet(x,y,z)
    {
        const temp = await createMissile(x,y,z);
        return temp;
    }

    async make_enemy()
    {
        const temp = await loadEnemy(3.5, Math.random()*3-1.5, 0, -0.01,0);
        return temp;
    }

    async make_star()
    {
        const temp = await createStar(3.5, Math.random()*3-1.5, 0, -0.01,0);
        return temp;
    }

    render()
    {
        renderer.render(scene, camera);
    }

    start()
    {
        loop.start();
    }

    stop()
    {
        loop.stop();
    }
}

export {World};