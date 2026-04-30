import React, { useEffect } from "react";
import * as THREE from "three";
import gsap from "gsap";
import { useLocation } from "react-router-dom";
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
import moontex from "../assets/moon.jpg";

function ThreeScene() {
  const location = useLocation();
  const hashRef = React.useRef(location.hash);

  useEffect(() => {
    hashRef.current = location.hash;
  }, [location.hash]);

  useEffect(() => {
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );

    const renderer = new THREE.WebGLRenderer();
    const container = document.getElementById("three-container");
    container.appendChild(renderer.domElement);

    renderer.setPixelRatio(window.devicePixelRatio);

    let widthSize = window.innerWidth;
    let heightSize = window.innerHeight;

    renderer.setSize(widthSize, heightSize);
    
    const handleResize = () => {
      widthSize = window.innerWidth;
      heightSize = window.innerHeight;

      renderer.setSize(widthSize, heightSize);
      camera.aspect = widthSize / heightSize;
      camera.updateProjectionMatrix();
    };
    window.addEventListener("resize", handleResize);

    camera.position.setY(200);
    camera.rotation.x = -Math.PI / 2;

    const ambientLight = new THREE.AmbientLight(0x888888); // Softer ambient light for dark mode
    scene.add(ambientLight); // Removed gridHelper to reduce visual noise

    const milkyway = new THREE.TextureLoader().load(milkywaytex);
    scene.background = milkyway;

    // STARFIELD (Warp Effect)
    const starGeo = new THREE.BufferGeometry();
    const starCount = 6000;
    const posArray = new Float32Array(starCount * 3);
    for(let i=0; i<starCount*3; i++) {
      posArray[i] = (Math.random() - 0.5) * 2000;
    }
    starGeo.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    const starMat = new THREE.PointsMaterial({
      color: 0x00f3ff, // Cyan stars
      size: 1.5,
      transparent: true,
      opacity: 0.8,
      sizeAttenuation: true
    });
    const starMesh = new THREE.Points(starGeo, starMat);
    scene.add(starMesh);
    
    const warpState = { speed: 0.2 }; // Normal idle speed

    const sunTexture = new THREE.TextureLoader().load(suntex);
    const sunGeo = new THREE.SphereGeometry(15, 64, 64);
    const sunMat = new THREE.MeshStandardMaterial({
      map: sunTexture,
      emissive: new THREE.Color(0xff8c00),
      emissiveMap: sunTexture,
      emissiveIntensity: 0.8, // Reduced brightness
      roughness: 1,
    });
    const sun = new THREE.Mesh(sunGeo, sunMat);
    scene.add(sun);

    const sunLight = new THREE.PointLight(0xffffff, 50000, 10000); // Reduced light intensity
    sunLight.position.set(0, 0, 0);
    scene.add(sunLight);

    const sunGlow = new THREE.PointLight(0xffffaa, 2, 500); // Softer yellow glow
    sunGlow.position.set(0, 0, 0);
    scene.add(sunGlow);

    const textureFlare = new THREE.TextureLoader().load(lensflaretex);
    const lensflare = new Lensflare();
    lensflare.addElement(new LensflareElement(textureFlare, 700, 0)); // Smaller flare
    sunLight.add(lensflare);

    //MERCURY
    const mercuryTexture = new THREE.TextureLoader().load(mercurytex);
    const mercuryGeo = new THREE.SphereGeometry(3, 64, 32);
    const mercuryMat = new THREE.MeshStandardMaterial({
      map: mercuryTexture,
      roughness: 0.8,
      metalness: 0.2,
    });
    const mercury = new THREE.Mesh(mercuryGeo, mercuryMat);
    mercury.position.set(-50, 0, 0);
    const mercuryPivot = new THREE.Object3D();
    scene.add(mercuryPivot);
    mercuryPivot.add(mercury);

    //VENUS
    const venusTexture = new THREE.TextureLoader().load(venustex);
    const venusGeo = new THREE.SphereGeometry(4, 64, 32);
    const venusMat = new THREE.MeshStandardMaterial({
      map: venusTexture,
      roughness: 0.6,
      metalness: 0.1,
    });
    const venus = new THREE.Mesh(venusGeo, venusMat);
    venus.position.set(-70, 0, 0);
    const venusPivot = new THREE.Object3D();
    scene.add(venusPivot);
    venusPivot.add(venus);

    //EARTH
    const earthTexture = new THREE.TextureLoader().load(earthtex);
    const earths = new THREE.TextureLoader().load(earthstex);
    const moonTexture = new THREE.TextureLoader().load(moontex);
    const earthGeo = new THREE.SphereGeometry(5, 64, 32);
    const earthMat = new THREE.MeshStandardMaterial({
      map: earthTexture,
      normalMap: earths,
      roughness: 0.5,
      metalness: 0.3,
    });
    const earth = new THREE.Mesh(earthGeo, earthMat);
    earth.position.set(-100, 0, 0);
    
    // EARTH MOON
    const moonGeo = new THREE.SphereGeometry(1.2, 32, 16);
    const moonMat = new THREE.MeshStandardMaterial({ map: moonTexture, roughness: 0.9 });
    const earthMoon = new THREE.Mesh(moonGeo, moonMat);
    earthMoon.position.set(8, 0, 0); // Offset from Earth
    const moonPivot = new THREE.Object3D(); // Rotates around Earth
    earth.add(moonPivot);
    moonPivot.add(earthMoon);

    const earthPivot = new THREE.Object3D();
    scene.add(earthPivot);
    earthPivot.add(earth);

    //MARS
    const marsTexture = new THREE.TextureLoader().load(marstex);
    const marsGeo = new THREE.SphereGeometry(3.5, 64, 32);
    const marsMat = new THREE.MeshStandardMaterial({
      map: marsTexture,
      roughness: 0.7,
      metalness: 0.1,
    });
    const mars = new THREE.Mesh(marsGeo, marsMat);
    mars.position.set(-125, 0, 0);

    // MARS MOONS (Phobos & Deimos)
    const phobosGeo = new THREE.SphereGeometry(0.5, 16, 8);
    const phobos = new THREE.Mesh(phobosGeo, moonMat);
    phobos.position.set(5, 0, 0);
    const deimos = new THREE.Mesh(new THREE.SphereGeometry(0.3, 16, 8), moonMat);
    deimos.position.set(-7, 2, 0);
    const marsMoonPivot = new THREE.Object3D();
    mars.add(marsMoonPivot);
    marsMoonPivot.add(phobos);
    marsMoonPivot.add(deimos);

    const marsPivot = new THREE.Object3D();
    scene.add(marsPivot);
    marsPivot.add(mars);

    //JUPITER
    const jupiterTexture = new THREE.TextureLoader().load(jupitertex);
    const jupiterGeo = new THREE.SphereGeometry(7, 64, 32);
    const jupiterMat = new THREE.MeshStandardMaterial({
      map: jupiterTexture,
      roughness: 0.4, // Gas giant
      metalness: 0.0,
    });
    const jupiter = new THREE.Mesh(jupiterGeo, jupiterMat);
    jupiter.position.set(-150, 0, 0);

    // JUPITER MOON (Europa)
    const europa = new THREE.Mesh(new THREE.SphereGeometry(1.5, 32, 16), moonMat);
    europa.position.set(12, 0, 0);
    const jupiterMoonPivot = new THREE.Object3D();
    jupiter.add(jupiterMoonPivot);
    jupiterMoonPivot.add(europa);

    const jupiterPivot = new THREE.Object3D();
    scene.add(jupiterPivot);
    jupiterPivot.add(jupiter);

    //SATURN
    const saturnTexture = new THREE.TextureLoader().load(saturntex);
    const saturnGeo = new THREE.SphereGeometry(6, 64, 32);
    const satrunMat = new THREE.MeshStandardMaterial({
      map: saturnTexture,
      roughness: 0.5,
      metalness: 0.1,
    });
    const saturn = new THREE.Mesh(saturnGeo, satrunMat);
    saturn.position.set(-180, 0, 0);

    //SATURN RING
    const saturnringTexture = new THREE.TextureLoader().load(saturn_ringtex);
    const saturnringGeo = new THREE.RingGeometry(8, 14, 64);
    saturnringGeo.rotateX(Math.PI / 2);
    
    const pos = saturnringGeo.attributes.position;
    const v3 = new THREE.Vector3();
    for (let i = 0; i < pos.count; i++){
        v3.fromBufferAttribute(pos, i);
        saturnringGeo.attributes.uv.setXY(i, v3.length() < 11 ? 0 : 1, 1);
    }
    
    const saturnringMat = new THREE.MeshStandardMaterial({
      map: saturnringTexture,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.9,
      roughness: 0.6,
    });
    const saturn_ring = new THREE.Mesh(saturnringGeo, saturnringMat);
    saturn_ring.position.set(-180, 0, 0);
    const saturnPivot = new THREE.Object3D();
    scene.add(saturnPivot);
    saturnPivot.add(saturn);
    saturnPivot.add(saturn_ring);

    //URANUS
    const uranusTexture = new THREE.TextureLoader().load(uranustex);
    const uranusGeo = new THREE.SphereGeometry(5.5, 64, 32);
    const uranusMat = new THREE.MeshStandardMaterial({
      map: uranusTexture,
      roughness: 0.6,
      metalness: 0.1,
    });
    const uranus = new THREE.Mesh(uranusGeo, uranusMat);
    uranus.position.set(-210, 0, 0);
    const uranusPivot = new THREE.Object3D();
    scene.add(uranusPivot);
    uranusPivot.add(uranus);

    //NEPTUNE
    const neptuneTexture = new THREE.TextureLoader().load(neptunetex);
    const neptuneGeo = new THREE.SphereGeometry(5, 64, 32);
    const neptuneMat = new THREE.MeshStandardMaterial({
      map: neptuneTexture,
      roughness: 0.5,
      metalness: 0.1,
    });
    const neptune = new THREE.Mesh(neptuneGeo, neptuneMat);
    neptune.position.set(-230, 0, 0);
    const neptunePivot = new THREE.Object3D();
    scene.add(neptunePivot);
    neptunePivot.add(neptune);

    const planetMap = {
      "": sun,
      "#Home": sun,
      "#About": mercury,
      "#Skill": venus,
      "#Experience": earth,
      "#Project": mars,
      "#PokeApp": saturn,
      "#Battle": neptune,
    };

    const objectToHash = new Map();
    objectToHash.set(sun, "#Home");
    objectToHash.set(mercury, "#About");
    objectToHash.set(venus, "#Skill");
    objectToHash.set(earth, "#Experience");
    objectToHash.set(mars, "#Project");
    objectToHash.set(saturn, "#PokeApp");
    objectToHash.set(neptune, "#Battle");

    // RAYCASTER FOR PLANET CLICKS
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const onPointerDown = (event) => {
      // Only process clicks directly on the canvas (avoiding HUD clicks)
      if (event.target.tagName !== 'CANVAS') return;

      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);

      const clickableObjects = [sun, mercury, venus, earth, mars, jupiter, saturn, uranus, neptune, saturn_ring];
      const intersects = raycaster.intersectObjects(clickableObjects, false);

      if (intersects.length > 0) {
        let clickedObject = intersects[0].object;
        // If clicking ring, map it to saturn
        if (clickedObject === saturn_ring) clickedObject = saturn;
        
        if (objectToHash.has(clickedObject)) {
           window.location.hash = objectToHash.get(clickedObject);
        }
      }
    };
    window.addEventListener('click', onPointerDown);

    const orbitControl = new OrbitControls(camera, renderer.domElement);
    const flyControl = new FlyControls(camera, renderer.domElement);

    const controls = flyControl;
    controls.movementSpeed = 100;
    controls.domElement = renderer.domElement;
    controls.rollSpeed = Math.PI / 12;
    controls.autoForward = false;
    controls.dragToLook = false;

    let previousHash = null;
    const cameraTarget = new THREE.Vector3(0, 0, 0);
    const sweepProgress = { value: 1 };
    const startCameraPos = new THREE.Vector3();
    const startTargetPos = new THREE.Vector3();

    function animate() {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);

      let currentHash = hashRef.current;
      let followedPlanet = planetMap[currentHash] || sun;

      if (previousHash !== currentHash) {
        previousHash = currentHash;
        
        // Capture starting positions for the sweep
        startCameraPos.copy(camera.position);
        startTargetPos.copy(cameraTarget);
        
        sweepProgress.value = 0;
        
        // GSAP Cinematic Drone Sweep (animating progress 0 -> 1)
        gsap.to(sweepProgress, {
          value: 1,
          duration: 3,
          ease: "power3.inOut"
        });

        // Warp Speed Effect
        warpState.speed = 30; // Blast off
        gsap.to(warpState, { 
          speed: 0.2, 
          duration: 3, 
          ease: "power3.out" 
        });
      }

      // Dynamically calculate the target planet's current position (since it's orbiting)
      const currentPlanetPos = new THREE.Vector3();
      followedPlanet.getWorldPosition(currentPlanetPos);
      
      let cameraOffset;
      if (followedPlanet === sun) {
         cameraOffset = new THREE.Vector3(0, 30, 80);
      } else {
         cameraOffset = new THREE.Vector3(0, 10, 20);
      }
      const desiredCameraPos = currentPlanetPos.clone().add(cameraOffset);

      if (sweepProgress.value < 1) {
        // We are currently swooping: interpolate between start and current dynamic target
        camera.position.lerpVectors(startCameraPos, desiredCameraPos, sweepProgress.value);
        cameraTarget.lerpVectors(startTargetPos, currentPlanetPos, sweepProgress.value);
      } else {
        // Sweep finished: lock directly onto the planet as it orbits
        camera.position.copy(desiredCameraPos);
        cameraTarget.copy(currentPlanetPos);
      }

      // Constantly look at the animated target
      camera.lookAt(cameraTarget);

      // Animate Starfield Warp
      const positions = starGeo.attributes.position.array;
      // Get camera's forward direction to move stars towards camera
      const direction = new THREE.Vector3();
      camera.getWorldDirection(direction);
      
      for(let i=0; i<starCount; i++) {
        // Move stars opposite to camera's look direction
        positions[i*3] -= direction.x * warpState.speed;
        positions[i*3+1] -= direction.y * warpState.speed;
        positions[i*3+2] -= direction.z * warpState.speed;

        // Reset if they go too far from camera
        const dx = positions[i*3] - camera.position.x;
        const dy = positions[i*3+1] - camera.position.y;
        const dz = positions[i*3+2] - camera.position.z;
        const distSq = dx*dx + dy*dy + dz*dz;

        if (distSq > 1000000) { // 1000^2
           positions[i*3] = camera.position.x + (Math.random() - 0.5) * 2000;
           positions[i*3+1] = camera.position.y + (Math.random() - 0.5) * 2000;
           positions[i*3+2] = camera.position.z + (Math.random() - 0.5) * 2000;
        }
      }
      starGeo.attributes.position.needsUpdate = true;

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

      // Animate Moons (orbits around planet)
      if (typeof moonPivot !== 'undefined') moonPivot.rotation.y += 0.02;
      if (typeof marsMoonPivot !== 'undefined') marsMoonPivot.rotation.y += 0.03;
      if (typeof jupiterMoonPivot !== 'undefined') jupiterMoonPivot.rotation.y += 0.015;

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
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("click", onPointerDown);
    };
  }, []);

  return <div id="three-container" className="three"></div>;
}

export default ThreeScene;
