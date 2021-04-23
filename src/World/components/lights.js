import { 
    AmbientLight,
    DirectionalLight,
    HemisphereLight,
  } from '../../../node_modules/three/src/Three.js';

function createLights()
{
    const ambientLight = new HemisphereLight(
        'white', // bright sky color
        'darkslategrey', // dim ground color
        5, // intensity
      );
      

    const mainLight = new DirectionalLight('white', 5);
    mainLight.position.set(10, 10, 10);

    return { ambientLight, mainLight };
}

export {createLights};


