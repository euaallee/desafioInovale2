import React, { useRef, useEffect } from 'react';
import * as C from './style';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

export default function Canvas() {
  const canvasRef = useRef(null);
  const rampaRef = useRef(null);
  const isDraggingRef = useRef(false);

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(100, window.innerWidth / window.innerHeight, 1, 15000);

    const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current, alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);

    const ambientLight = new THREE.AmbientLight(0xffffff, 1);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(30, 30, 30);
    scene.add(directionalLight);

    camera.position.x = 0;
    camera.position.y = 5000;
    camera.position.z = 5000;

    const loader = new GLTFLoader();
    loader.load('/src/assets/rampa.glb', (gltf) => {
      const rampa = gltf.scene;
      rampa.scale.set(5, 5, 5);
      rampaRef.current = rampa;
      scene.add(rampa);
    }, undefined, (error) => {
      console.error('An error occurred while loading the GLTF model:', error);
    });

    const controls = new OrbitControls(camera, renderer.domElement);

    controls.addEventListener('start', () => {
      isDraggingRef.current = true;
    });

    controls.addEventListener('end', () => {
      isDraggingRef.current = false;
    });

    const animate = () => {
      requestAnimationFrame(animate);
      if (rampaRef.current && !isDraggingRef.current) {
        rampaRef.current.rotation.y -= 0.002;
      }
      controls.update();
      renderer.render(scene, camera);
    };

    animate();

    window.addEventListener('resize', () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });

  }, []);

  return (
    <C.Container>
      <canvas ref={canvasRef} />
    </C.Container>
  );
}
