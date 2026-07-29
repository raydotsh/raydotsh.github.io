import React, { useEffect, useRef } from "react";
import * as THREE from "three";

const ThreeRingCanvas = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 690;
    const height = container.clientHeight || 690;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0, 10);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // 2. Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 1.5);
    dirLight.position.set(5, 10, 7);
    scene.add(dirLight);

    // 3. 3D Ring Mesh locked at exact 1 o'clock & 7 o'clock angle (+60 deg)
    const ringGroup = new THREE.Group();
    const baseAngleZ = THREE.MathUtils.degToRad(60);
    ringGroup.rotation.z = baseAngleZ; // Locked permanently!
    scene.add(ringGroup);

    // Create 3D Elliptical Ring (-10% size)
    const rx = 4.2;
    const ry = 2.1;
    const ellipseCurve = new THREE.EllipseCurve(0, 0, rx, ry, 0, 2 * Math.PI, false, 0);
    const points = ellipseCurve.getPoints(128);
    const ringGeometry = new THREE.BufferGeometry().setFromPoints(
      points.map(p => new THREE.Vector3(p.x, p.y, 0))
    );
    const ringMaterial = new THREE.LineBasicMaterial({
      color: 0x94a3b8,
      linewidth: 2.5,
      transparent: true,
      opacity: 0.6
    });
    const ringLine = new THREE.LineLoop(ringGeometry, ringMaterial);
    ringGroup.add(ringLine);

    // 4. Mouse 3D Interior Swivel (Top at 1 o'clock & Bottom at 7 o'clock remain 100% locked!)
    let targetRotX = 0;

    const handleMouseMove = (e) => {
      const parentRect = container.getBoundingClientRect();
      const normY = (e.clientY - parentRect.top - parentRect.height / 2) / (parentRect.height / 2);
      const normX = (e.clientX - parentRect.left - parentRect.width / 2) / (parentRect.width / 2);
      
      // Swivel open/flat inside the locked 1-7 o'clock axis
      targetRotX = (normY + normX * 0.5) * 1.15;
    };

    window.addEventListener("mousemove", handleMouseMove);

    // 5. Animation Loop
    let reqId;
    let currRotX = 0;

    const animate = () => {
      reqId = requestAnimationFrame(animate);

      // Smooth lerp swivel along local X-axis while 1-7 o'clock tips stay locked
      currRotX += (targetRotX - currRotX) * 0.08;
      ringLine.rotation.x = currRotX;

      renderer.render(scene, camera);
    };

    animate();

    // 6. Resize Handler
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(reqId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return <div className="three-ring-canvas" ref={mountRef} />;
};

export default ThreeRingCanvas;
