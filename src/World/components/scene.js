import { Color, Scene } from '../../../node_modules/three/src/Three.js';

function createScene() {
  const scene = new Scene();

  scene.background = new Color('black');
  
  return scene;
}

export { createScene };
