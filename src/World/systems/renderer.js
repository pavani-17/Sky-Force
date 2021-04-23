import {WebGLRenderer} from '../../../node_modules/three/src/Three.js';

function createRenderer()
{
    const renderer = new WebGLRenderer({antialias:true});

    renderer.physicallyCorrectLights = true;

    return renderer;
}

export {createRenderer};