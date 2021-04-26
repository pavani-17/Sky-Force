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
      

    const mainLight = new DirectionalLight('white', 8);
    mainLight.position.set(0, 10, 10);
    

    return { ambientLight, mainLight };
}

export {createLights};


