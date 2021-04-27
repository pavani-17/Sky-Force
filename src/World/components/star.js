import { BoxBufferGeometry, Mesh, MeshStandardMaterial, MathUtils } from '../../../node_modules/three/src/Three.js';
import { GLTFLoader } from '../../../node_modules/three/examples/jsm/loaders/GLTFLoader.js';

import { setupModel } from './setupModel.js';

const radiansPerSecond = MathUtils.degToRad(30);

async function createStar(x, y, z) {
  const loader = new GLTFLoader();

  const [starData] = await Promise.all([
    loader.loadAsync('../../../star.glb'),
  ]);


  const star = setupModel(starData);
  
  star.visible = true;
  
  star.scale.set(0.05,0.05,0.05)
  // star.rotation.set(0, MathUtils.degToRad(90),MathUtils.degToRad(90));
  star.position.set(x,y,z);

  star.tick = (delta) => {
    star.position.x -= 0.015;
    star.rotation.x += MathUtils.degToRad(1);
    star.rotation.y += MathUtils.degToRad(1);
    star.rotation.z += MathUtils.degToRad(1);
  }
  return star;
}

export { createStar };
