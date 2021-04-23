import { GLTFLoader } from '../../../node_modules/three/examples/jsm/loaders/GLTFLoader.js';

import { setupModel } from './setupModel.js';
import { MathUtils } from '../../../node_modules/three/src/Three.js';


async function loadPlane() {
    const loader = new GLTFLoader();
  
    const [planeData] = await Promise.all([
      loader.loadAsync('../../../plane1.glb'),
    ]);

    const [enemyData] = await Promise.all([
      loader.loadAsync('../../../Enemy.glb'),
    ]);
  
    console.log('Squaaawk!', planeData);
  
    const plane = setupModel(planeData);
    
    plane.scale.set(0.05,0.05,0.05)
    plane.rotation.set(0, MathUtils.degToRad(90),MathUtils.degToRad(90));
    plane.position.set(-1.0, 0, 2.5);

    const enemy = setupModel(enemyData);
    
    enemy.scale.set(0.08,0.08,0.08)
    enemy.position.set(0, 0, 2.5);    
    enemy.rotation.set(0, MathUtils.degToRad(90),MathUtils.degToRad(90));
  
    return {
      plane, enemy
    };
  }
  
  export { loadPlane };
  