import { BoxBufferGeometry, Mesh, MeshStandardMaterial, MathUtils } from '../../../node_modules/three/src/Three.js';
import { GLTFLoader } from '../../../node_modules/three/examples/jsm/loaders/GLTFLoader.js';

import { setupModel } from './setupModel.js';

const radiansPerSecond = MathUtils.degToRad(30);

async function createMissile(x, y, z, direction) {
  const loader = new GLTFLoader();

  const [starData] = await Promise.all([
    loader.loadAsync('../../../missile.glb'),
  ]);


  const missile = setupModel(starData);
  
  missile.visible = true;
  
  missile.rotation.x = MathUtils.degToRad(90)

  missile.scale.set(0.05,0.05,0.05)
  // star.rotation.set(0, MathUtils.degToRad(90),MathUtils.degToRad(90));
  missile.position.set(x,y,z);

  if(direction < 0)
  {
    missile.rotation.y = MathUtils.degToRad(-180)
  }

  missile.tick = (delta) => {
    missile.position.x += 0.01*direction;
  }
  return missile;
}

export { createMissile };
