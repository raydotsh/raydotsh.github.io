import React, { useEffect, useRef } from "react";
import * as THREE from "three";

const ContactCanvas = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const section = canvas.parentElement;
    if (!section) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      55,
      section.clientWidth / section.clientHeight,
      0.1,
      100
    );
    camera.position.z = 8;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(section.clientWidth, section.clientHeight);

    const material = new THREE.MeshBasicMaterial({
      color: 0x191816,
      wireframe: true,
      transparent: true,
      opacity: 0.12,
    });
    const knot = new THREE.Mesh(
      new THREE.TorusKnotGeometry(2.3, 0.55, 150, 16),
      material
    );
    knot.scale.set(1.6, 1.6, 1.6);
    scene.add(knot);

    let reqId;
    const animate = () => {
      if (!reduceMotion) {
        knot.rotation.x += 0.0015;
        knot.rotation.y += 0.0023;
      }
      renderer.render(scene, camera);
      reqId = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      if (!section) return;
      camera.aspect = section.clientWidth / section.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(section.clientWidth, section.clientHeight);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(reqId);
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
    };
  }, []);

  return <canvas ref={canvasRef} id="contact-canvas" aria-hidden="true" />;
};

export default ContactCanvas;
