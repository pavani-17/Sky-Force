import { GLTFLoader } from '../../../node_modules/three/examples/jsm/loaders/GLTFLoader.js';

import { setupModel } from './setupModel.js';
import { MathUtils } from '../../../node_modules/three/src/Three.js';


async function loadEnemy(x,y,z,speed_x,speed_y) {
    const loader = new GLTFLoader();
  
    const [enemyData] = await Promise.all([
      loader.loadAsync('../../../Enemy.glb'),
    ]);
  
    const enemy = setupModel(enemyData);
    
    enemy.scale.set(0.05,0.05,0.05)
    enemy.position.set(x, y, z);    
    enemy.rotation.set(0, MathUtils.degToRad(90),MathUtils.degToRad(90));

    enemy.visible = true;

    enemy.tick = (delta) => {
        enemy.position.x += speed_x;
        enemy.position.y += speed_y;
    }
  
    return enemy;
  }
  
  export { loadEnemy };