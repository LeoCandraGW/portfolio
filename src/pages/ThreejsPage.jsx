import React, { useEffect } from "react";
import * as THREE from "three";
import "../styles/three.css";

import { OrbitControls } from "three/examples/jsm/Addons.js";
import { FlyControls } from "three/examples/jsm/Addons.js";
import {
  Lensflare,
  LensflareElement,
} from "three/examples/jsm/objects/Lensflare.js";

import milkywaytex from "../assets/milkyway.jpg";
import suntex from "../assets/sun.jpg";
import mercurytex from "../assets/mercury.jpg";
import venustex from "../assets/venus.jpg";
import earthtex from "../assets/earth1.jpg";
import earthstex from "../assets/earthn.png";
import marstex from "../assets/mars.jpg";
import jupitertex from "../assets/jupiter.jpg";
import saturntex from "../assets/saturn.jpg";
import saturn_ringtex from "../assets/saturn_ring.png";
import uranustex from "../assets/uranus.jpg";
import neptunetex from "../assets/neptune.jpg";
import lensflaretex from "../assets/lensflare0.png";

function ThreeScene() {
  useEffect(() => {
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    const container = document.getElementById("three-container");
    container.appendChild(renderer.domElement);

    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);

    camera.position.setY(200);
    camera.rotation.x = -Math.PI / 2;

    const gridHelper = new THREE.GridHelper(500, 50);

    const ambientLight = new THREE.AmbientLight(0xffffff);
    scene.add(ambientLight, gridHelper);

    const milkyway = new THREE.TextureLoader().load(milkywaytex);
    scene.background = milkyway;

    //SUN
    const sunTexture = new THREE.TextureLoader().load(suntex);
    const sunGeo = new THREE.SphereGeometry(15, 128, 32);
    const sunMat = new THREE.MeshStandardMaterial({
      map: sunTexture,
      wireframe: true,
    });
    const sun = new THREE.Mesh(sunGeo, sunMat);
    scene.add(sun);

    const sunLight = new THREE.PointLight(0xffffff, 100000, 100000);
    sunLight.position.set(0, 0, 0);
    scene.add(sunLight);

    const sunGlow = new THREE.PointLight(0xffff00, 5, 500);
    sunGlow.position.set(0, 0, 0);
    scene.add(sunGlow);

    const textureFlare = new THREE.TextureLoader().load(lensflaretex);
    const lensflare = new Lensflare();
    lensflare.addElement(new LensflareElement(textureFlare, 1000, 0));
    sunLight.add(lensflare);

    //MERCURY
    const mercuryTexture = new THREE.TextureLoader().load(mercurytex);
    const mercuryGeo = new THREE.SphereGeometry(3, 32, 16);
    const mercuryMat = new THREE.MeshStandardMaterial({
      map: mercuryTexture,
    });
    const mercury = new THREE.Mesh(mercuryGeo, mercuryMat);
    mercury.position.set(-50, 0, 0);
    const mercuryPivot = new THREE.Object3D();
    scene.add(mercuryPivot);
    mercuryPivot.add(mercury);

    //VENUS
    const venusTexture = new THREE.TextureLoader().load(venustex);
    const venusGeo = new THREE.SphereGeometry(4, 32, 16);
    const venusMat = new THREE.MeshStandardMaterial({
      map: venusTexture,
    });
    const venus = new THREE.Mesh(venusGeo, venusMat);
    venus.position.set(-70, 0, 0);
    const venusPivot = new THREE.Object3D();
    scene.add(venusPivot);
    venusPivot.add(venus);

    //EARTH
    const earthTexture = new THREE.TextureLoader().load(earthtex);
    const earths = new THREE.TextureLoader().load(earthstex);
    const earthGeo = new THREE.SphereGeometry(5, 32, 16);
    const earthMat = new THREE.MeshStandardMaterial({
      map: earthTexture,
      normalMap: earths,
    });
    const earth = new THREE.Mesh(earthGeo, earthMat);
    earth.position.set(-100, 0, 0);
    const earthPivot = new THREE.Object3D();
    scene.add(earthPivot);
    earthPivot.add(earth);

    //MARS
    const marsTexture = new THREE.TextureLoader().load(marstex);
    const marsGeo = new THREE.SphereGeometry(3.5, 32, 16);
    const marsMat = new THREE.MeshStandardMaterial({
      map: marsTexture,
    });
    const mars = new THREE.Mesh(marsGeo, marsMat);
    mars.position.set(-125, 0, 0);
    const marsPivot = new THREE.Object3D();
    scene.add(marsPivot);
    marsPivot.add(mars);

    //JUPITER
    const jupiterTexture = new THREE.TextureLoader().load(jupitertex);
    const jupiterGeo = new THREE.SphereGeometry(7, 32, 16);
    const jupiterMat = new THREE.MeshStandardMaterial({
      map: jupiterTexture,
    });
    const jupiter = new THREE.Mesh(jupiterGeo, jupiterMat);
    jupiter.position.set(-150, 0, 0);
    const jupiterPivot = new THREE.Object3D();
    scene.add(jupiterPivot);
    jupiterPivot.add(jupiter);

    //SATURN
    const saturnTexture = new THREE.TextureLoader().load(saturntex);
    const saturnGeo = new THREE.SphereGeometry(6, 32, 16);
    const satrunMat = new THREE.MeshStandardMaterial({
      map: saturnTexture,
    });
    const saturn = new THREE.Mesh(saturnGeo, satrunMat);
    saturn.position.set(-180, 0, 0);

    //SATURN RING
    const saturnringTexture = new THREE.TextureLoader().load(saturn_ringtex);
    const saturnringGeo = new THREE.TorusGeometry(10, 1, 10, 30);
    saturnringGeo.rotateX(Math.PI / 2);
    const saturnringMat = new THREE.MeshStandardMaterial({
      map: saturnringTexture,
      side: THREE.DoubleSide,
    });
    const saturn_ring = new THREE.Mesh(saturnringGeo, saturnringMat);
    saturn_ring.position.set(-180, 0, 0);
    const saturnPivot = new THREE.Object3D();
    scene.add(saturnPivot);
    saturnPivot.add(saturn);
    saturnPivot.add(saturn_ring);

    //URANUS
    const uranusTexture = new THREE.TextureLoader().load(uranustex);
    const uranusGeo = new THREE.SphereGeometry(5.5, 32, 16);
    const uranusMat = new THREE.MeshStandardMaterial({
      map: uranusTexture,
    });
    const uranus = new THREE.Mesh(uranusGeo, uranusMat);
    uranus.position.set(-210, 0, 0);
    const uranusPivot = new THREE.Object3D();
    scene.add(uranusPivot);
    uranusPivot.add(uranus);

    //NEPTUNE
    const neptuneTexture = new THREE.TextureLoader().load(neptunetex);
    const neptuneGeo = new THREE.SphereGeometry(5, 32, 16);
    const neptuneMat = new THREE.MeshStandardMaterial({
      map: neptuneTexture,
    });
    const neptune = new THREE.Mesh(neptuneGeo, neptuneMat);
    neptune.position.set(-230, 0, 0);
    const neptunePivot = new THREE.Object3D();
    scene.add(neptunePivot);
    neptunePivot.add(neptune);

    let followedPlanet = earth;

    const planetMap = {
      1: mercury,
      2: venus,
      3: earth,
      4: mars,
      5: jupiter,
      6: saturn,
      7: uranus,
      8: neptune,
    };

    window.addEventListener("keydown", (event) => {
      const planetNumber = parseInt(event.key);
      if (planetMap[planetNumber]) {
        const selectedPlanet = planetMap[planetNumber];

        if (followedPlanet === selectedPlanet) {
          followedPlanet = null;
        } else {
          followedPlanet = selectedPlanet;
        }
      }
    });

    const orbitControl = new OrbitControls(camera, renderer.domElement);

    const flyControl = new FlyControls(camera, renderer.domElement);

    const controls = flyControl;
    controls.movementSpeed = 100;
    controls.domElement = renderer.domElement;
    controls.rollSpeed = Math.PI / 12;
    controls.autoForward = false;
    controls.dragToLook = false;

    function animate() {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);

      if (followedPlanet) {
        const targetPosition = new THREE.Vector3();
        followedPlanet.getWorldPosition(targetPosition);
        const cameraOffset = new THREE.Vector3(0, 10, 20);
        const desiredPosition = targetPosition.clone().add(cameraOffset);
        camera.position.lerp(desiredPosition, 0.1);
        camera.lookAt(targetPosition);
      }

      sun.rotation.x += 0.01;
      sun.rotation.y += 0.01;
      mercury.rotation.x += 0.01;
      mercury.rotation.y += 0.01;
      venus.rotation.x += 0.01;
      venus.rotation.y += 0.01;
      earth.rotation.x += 0.01;
      earth.rotation.y += 0.01;
      mars.rotation.x += 0.01;
      mars.rotation.y += 0.01;
      jupiter.rotation.x += 0.01;
      jupiter.rotation.y += 0.01;
      saturn.rotation.x += 0.01;
      saturn.rotation.y += 0.01;
      uranus.rotation.x += 0.01;
      uranus.rotation.y += 0.01;
      neptune.rotation.x += 0.01;
      neptune.rotation.y += 0.01;

      mercuryPivot.rotation.y += 0.01;
      venusPivot.rotation.y += 0.008;
      earthPivot.rotation.y += 0.007;
      marsPivot.rotation.y += 0.006;
      jupiterPivot.rotation.y += 0.005;
      saturnPivot.rotation.y += 0.004;
      uranusPivot.rotation.y += 0.003;
      neptunePivot.rotation.y += 0.002;

      const delta = clock.getDelta();
      controls.update(delta);
    }

    const clock = new THREE.Clock();

    animate();

    return () => {
      container.removeChild(renderer.domElement);
    };
  }, []);

  return <div id="three-container" className="three"></div>;
}

export default ThreeScene;
