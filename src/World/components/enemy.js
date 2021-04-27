import { GLTFLoader } from '../../../node_modules/three/examples/jsm/loaders/GLTFLoader.js';

import { setupModel } from './setupModel.js';
import { MathUtils } from '../../../node_modules/three/src/Three.js';


async function loadEnemy(x,y,z,speed_x,speed_y,type) {
    const loader = new GLTFLoader();

    var file_name = "../../../Enemy_Blue.glb";
    if(Math.random() < 0.5)
    {
      file_name = "../../../Enemy.glb"
    }
    const [enemyData] = await Promise.all([
        loader.loadAsync(file_name),
    ]);
  
    const enemy = setupModel(enemyData);
    
    enemy.scale.set(0.05,0.05,0.05)
    enemy.position.set(x, y, z);    
    enemy.rotation.set(0, MathUtils.degToRad(90),MathUtils.degToRad(90));

    enemy.visible = true;

    enemy.type = type;
    enemy.speed_x = speed_x;
    enemy.speed_y = speed_y;

    enemy.tick = (delta) => {
        enemy.position.x += enemy.speed_x;
        enemy.position.y += enemy.speed_y;
    }
  
    return enemy;
  }
  
  export { loadEnemy };