import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

const CUBE_MATERIAL = new THREE.MeshPhongMaterial({ color: 0x61ffe2, flatShading: true, shininess: 2 });

function main() {
  const canvas = document.querySelector('#c');
  const renderer = new THREE.WebGLRenderer({canvas, alpha: true});
  renderer.setSize(window.innerWidth, window.innerHeight)


  const camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.01, 1000 );
  const scene = new THREE.Scene();

  const controls = new OrbitControls(camera, renderer.domElement);

  // camera.position.z = 6;
  camera.position.set( 8, 8, -8 );
  controls.update();

  {
    const color = 0xFFFFFF;
    const intensity = 0.8;
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(8, -4, -6);
    scene.add(light);
    // const light2 = new THREE.DirectionalLight(color, intensity);
    // light2.position.set(3, -3, 3);
    // scene.add(light2);
  }

  menger(scene, -1.5, -1.5, -1.5, 3, 3);
  // renderer.setSize( window.innerWidth, window.innerHeight );
  // document.body.appendChild( renderer.domElement );

  function animate() {

    requestAnimationFrame( animate );

    // required if controls.enableDamping or controls.autoRotate are set to true
    controls.update();

    renderer.render( scene, camera );

  }

  animate();
}

/**
 * Creates a cube with THREE
 * @param {number} x 
 * @param {number} y 
 * @param {number} z 
 * @param {number} s Size of the cube
 */
const createCube = (x, y, z, s) => {
    const geometry = new THREE.BoxGeometry(s, s, s);
    const mesh = new THREE.Mesh(geometry, CUBE_MATERIAL);

    mesh.position.set(x, y, z);
    mesh.receiveShadow = true;
    mesh.shouldBeDeletedOnStateChange = true;

    return mesh;
};

/**
 * Menger sponge algorithm implementation
 * @param {THREE.Scene} scene 
 * @param {number} x 
 * @param {number} y 
 * @param {number} z 
 * @param {number} s Size of the cube
 * @param {number} it Number of iterations
 * @param {number} lvl Current level
 */
const menger = (scene, x, y, z, s, it, lvl = 0) => {
    if (it === lvl) {
        scene.add(createCube(x, y, z, s));
    }
    else {
        const ns = s / 3;
        
        for(let i = 0; i < 3; i++) {
            for(let j = 0; j < 3; j++) {
                for(let k = 0; k < 3; k++) {
                    if((i !== 1 && j !== 1) || (k !== 1 && j !== 1) || (i !== 1 && k !== 1)) { 
                        menger(scene, x + i * ns, y + j * ns, z + k * ns, ns, it, lvl + 1);
                    }
                }
            } 
        }
    }
};

// export default class MengerState extends State
// {
//     init() {
//         // Use Menger's algorithm to generate the sponge in the scene
//         menger(this.sceneWrapper.scene, -1.5, -1.5, -1.5, 3, 3);


//         // lights
//         const spotLight = new THREE.SpotLight(0xffffff, 0.2);
//         spotLight.position.set(0, 100, 50);
//         spotLight.castShadow = true;
//         spotLight.shouldBeDeletedOnStateChange = true;
//         this.sceneWrapper.scene.add(spotLight);


//         this.sceneWrapper.createAxesHelper();
//         this.sceneWrapper.camera.position.set(-5, 4, 5);
//     }
// }

// window.onload = function() {
//   // Use Menger's algorithm to generate the sponge in the scene
//   menger(scene, -1.5, -1.5, -1.5, 3, 3);


//   // lights
//   const spotLight = new THREE.SpotLight(0xffffff, 0.2);
//   spotLight.position.set(0, 100, 50);
//   spotLight.castShadow = true;
//   spotLight.shouldBeDeletedOnStateChange = true;
//   scene.add(spotLight);


//   // this.sceneWrapper.createAxesHelper();
//   // this.sceneWrapper.camera.position.set(-5, 4, 5);
// };

main();
