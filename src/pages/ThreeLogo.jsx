import * as THREE from "three";
import React from "react";
import { OrbitControls } from "three/examples/jsm/Addons.js";

import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js";
import { TextGeometry } from "three/examples/jsm/Addons.js";
import { GLTFLoader } from "three/examples/jsm/Addons.js";

import TeslaS from "../assets/tesla_model_s.glb";

function ThreeLogo() {
  React.useEffect(() => {
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );

    const renderer = new THREE.WebGLRenderer({ alpha: true });
    const container = document.getElementById("logo-container");
    container.appendChild(renderer.domElement);

    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(200, 100);

    camera.position.x = 30;
    camera.position.z = 250;
    camera.lookAt(-35, 0, 0);

    const loader = new FontLoader();
    loader.load(
      "https://threejs.org/examples/fonts/helvetiker_regular.typeface.json",
      function (font) {
        const textGeo = new TextGeometry("Leo Candra", {
          font: font,
          size: 80,
          height: 10,
          curveSegments: 12,
          bevelEnabled: true,
          bevelThickness: 2,
          bevelSize: 1.5,
          bevelSegments: 5,
        });

        const textMat = new THREE.MeshStandardMaterial({
          color: 0xff3498db, // Set text color
          roughness: 0.5,
          metalness: 0.5,
        });
        const textMesh = new THREE.Mesh(textGeo, textMat);
        textGeo.center();
        scene.add(textMesh);
      }
    );

    const pointLight = new THREE.PointLight(0xffffff, 1000000, 100000);
    pointLight.position.set(100, 150, 150);
    scene.add(pointLight);

    const ambientLight = new THREE.AmbientLight(0x404040, 2);
    scene.add(ambientLight);

    const lightHelper = new THREE.PointLightHelper(pointLight, 10);
    scene.add(lightHelper);

    const light = new THREE.Object3D();
    scene.add(light);
    light.add(pointLight);

    const clock = new THREE.Clock();

    let elapsedTime = clock.getElapsedTime();
    let speed = 1;
    let distance = 500;

    const loader1 = new GLTFLoader();

    loader1.load(
      TeslaS,
      function (gltf) {
        gltf.scene.position.set(-350, -40, 70);
        gltf.scene.rotation.y = 6;
        scene.add(gltf.scene);
      },
      undefined,
      function (error) {
        console.error(error);
      }
    );

    scene.background = null;

    const orbitControl = new OrbitControls(camera, renderer.domElement);

    function animate() {
      requestAnimationFrame(animate);
      let elapsedTime = clock.getElapsedTime();
      light.position.x = Math.sin(elapsedTime * speed) * distance;
      renderer.render(scene, camera);
    }
    animate();

    return () => {
      container.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <>
      <div id="logo-container" className="logo1"></div>
    </>
  );
}

export default ThreeLogo;
