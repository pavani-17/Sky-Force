import { createCamera } from './components/camera.js';
import { createCube } from './components/cube.js';
import { createScene } from './components/scene.js';
import { createLights } from './components/lights.js';
import { createObstacle } from './components/obstacle.js';
import { loadPlane } from './components/plane.js';

import { createRenderer } from './systems/renderer.js';
import { Resizer } from './systems/Resizer.js';
import {Loop} from './systems/Loop.js';

let scene;
let camera;
let renderer;
let loop;
let missiles;
// const plane;
// const enemy;

class World
{
    constructor(container)
    {
        camera = createCamera();
        scene = createScene();
        renderer = createRenderer();

        missiles = []
        
        loop = new Loop(camera, scene, renderer);

        container.append(renderer.domElement);

        const cube = createCube();
        const { ambientLight, mainLight } = createLights();

        // loop.updatables.push(cube);

        scene.add(ambientLight, mainLight);

        const resizer = new Resizer(container, camera, renderer);
        
    }

    async init()
    {
        const {plane,enemy} = await loadPlane();
        plane.position.set(-2.5,0,0)
        scene.add(plane,enemy);
        console.log("Added plane")
        window.addEventListener("keydown", async(e) =>
        {
            console.log(e.code);
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
                this.make_bullet(plane.position.x, plane.position.y,plane.position.z).then((temp) => {
                    console.log(temp);
                    scene.add(temp);
                    missiles.push(temp);
                    loop.updatables.push(temp)
                })
            }
        });
    }

    async make_bullet(x,y,z)
    {
        const temp = await createObstacle(x,y,z);
        console.log(temp);
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