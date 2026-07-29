import React, { useEffect, useRef } from "react";
import * as THREE from "three";

const ThreeOrbitalRing = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 580;
    const height = container.clientHeight || 580;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0, 11);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // 2. Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 1.5);
    dirLight.position.set(5, 10, 8);
    scene.add(dirLight);

    // 3. Parent 3D Group for Mouse Tilt
    const orbitalGroup = new THREE.Group();
    // Base ring tilt (-30 deg around Z, slight X tilt for perspective)
    orbitalGroup.rotation.z = -THREE.MathUtils.degToRad(30);
    orbitalGroup.rotation.x = THREE.MathUtils.degToRad(20);
    scene.add(orbitalGroup);

    // 4. 3D Ring Mesh
    const rx = 3.8;
    const ry = 1.9;
    
    // Create custom 3D Ring path
    const ringCurve = new THREE.EllipseCurve(
      0, 0,
      rx, ry,
      0, 2 * Math.PI,
      false,
      0
    );
    const ringPoints = ringCurve.getPoints(128);
    const ringGeometry = new THREE.BufferGeometry().setFromPoints(
      ringPoints.map(p => new THREE.Vector3(p.x, p.y, 0))
    );
    const ringMaterial = new THREE.LineBasicMaterial({
      color: 0x94a3b8,
      linewidth: 2,
      transparent: true,
      opacity: 0.55
    });
    const ringLine = new THREE.LineLoop(ringGeometry, ringMaterial);
    orbitalGroup.add(ringLine);

    // Helper to create 2D canvas text sprites for symbols
    const createSymbolSprite = (symbol) => {
      const canvas = document.createElement("canvas");
      canvas.width = 128;
      canvas.height = 128;
      const ctx = canvas.getContext("2d");
      ctx.fillStyle = "#2b2b2b";
      ctx.font = "bold 64px sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(symbol, 64, 64);

      const texture = new THREE.CanvasTexture(canvas);
      const spriteMaterial = new THREE.SpriteMaterial({ map: texture, transparent: true });
      const sprite = new THREE.Sprite(spriteMaterial);
      sprite.scale.set(1.1, 1.1, 1);
      return sprite;
    };

    // 5. Pastel Planet Data
    const planetConfigs = [
      { color: 0xfde082, radius: 0.95, speed: 0.45, offset: 0, symbol: "✦" },     // Yellow
      { color: 0xffaa94, radius: 0.72, speed: 0.55, offset: 1.25, symbol: "♥" },  // Coral
      { color: 0xe2f583, radius: 0.68, speed: 0.42, offset: 2.5, symbol: "↗" },   // Lime
      { color: 0xfaf8f5, radius: 0.70, speed: 0.48, offset: 3.75, symbol: "•" },  // White
      { color: 0xdcd0ff, radius: 0.68, speed: 0.38, offset: 5.0, symbol: "#" }   // Lavender
    ];

    const planetMeshes = planetConfigs.map((cfg) => {
      const geom = new THREE.SphereGeometry(cfg.radius, 32, 32);
      const mat = new THREE.MeshStandardMaterial({
        color: cfg.color,
        roughness: 0.3,
        metalness: 0.1
      });
      const mesh = new THREE.Mesh(geom, mat);
      
      // Add symbol sprite centered on planet
      const sprite = createSymbolSprite(cfg.symbol);
      sprite.position.set(0, 0, cfg.radius + 0.05);
      mesh.add(sprite);

      orbitalGroup.add(mesh);
      return { mesh, ...cfg };
    });

    // 6. Mouse Cursor Tracking
    let targetRotX = 0;
    let targetRotY = 0;

    const handleMouseMove = (e) => {
      const parentRect = container.getBoundingClientRect();
      const normX = (e.clientX - parentRect.left - parentRect.width / 2) / (parentRect.width / 2);
      const normY = (e.clientY - parentRect.top - parentRect.height / 2) / (parentRect.height / 2);
      targetRotY = normX * 0.45;
      targetRotX = -normY * 0.45;
    };

    window.addEventListener("mousemove", handleMouseMove);

    // 7. Animation Loop
    let reqId;
    const clock = new THREE.Clock();

    const animate = () => {
      reqId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth lerp 3D mouse rotation pointing toward cursor
      orbitalGroup.rotation.y += (targetRotY - orbitalGroup.rotation.y) * 0.06;
      orbitalGroup.rotation.x += (THREE.MathUtils.degToRad(20) + targetRotX - orbitalGroup.rotation.x) * 0.06;

      // Orbit planets along 3D ellipse
      planetMeshes.forEach((p) => {
        const angle = elapsedTime * p.speed + p.offset;
        const x = rx * Math.cos(angle);
        const y = ry * Math.sin(angle);
        p.mesh.position.set(x, y, 0);
      });

      renderer.render(scene, camera);
    };

    animate();

    // 8. Resize Handler
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

  return <div className="three-orbital-canvas-container" ref={mountRef} />;
};

export default ThreeOrbitalRing;
