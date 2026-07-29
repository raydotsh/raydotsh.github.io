import React, { useEffect, useRef } from "react";
import * as THREE from "three";

const HeroCanvas = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const section = canvas.parentElement;
    if (!section) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      42,
      section.clientWidth / section.clientHeight,
      0.1,
      100
    );
    camera.position.z = 9;

    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: true,
        failIfMajorPerformanceCaveat: false,
      });
      renderer.setClearColor(0x000000, 0);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(section.clientWidth, section.clientHeight);
    } catch (err) {
      console.warn("HeroCanvas WebGL renderer unavailable:", err);
      return;
    }

    const isMobile = window.innerWidth < 800;
    const group = new THREE.Group();
    group.position.x = isMobile ? 0 : 3.25;
    group.position.y = isMobile ? -0.8 : 0;
    if (isMobile) {
      group.scale.set(0.65, 0.65, 0.65);
    }
    scene.add(group);

    const makeIconTexture = (symbol, color) => {
      const iconCanvas = document.createElement("canvas");
      iconCanvas.width = 256;
      iconCanvas.height = 256;
      const context = iconCanvas.getContext("2d");
      context.clearRect(0, 0, 256, 256);
      context.fillStyle = color;
      context.beginPath();
      context.arc(128, 128, 116, 0, Math.PI * 2);
      context.fill();
      context.fillStyle = "#191816";
      context.font = "700 74px Arial";
      context.textAlign = "center";
      context.textBaseline = "middle";
      context.fillText(symbol, 128, 131);
      return new THREE.CanvasTexture(iconCanvas);
    };

    const symbols = [
      ["♥", "#ff6f55", 1.35, 1.8, 0],
      ["↗", "#d8ff45", -0.7, 2.4, -0.6],
      ["#", "#b6a6ff", 1.7, -1.15, -0.8],
      ["●", "#f4f0e8", -1.1, -1.9, 0.2],
      ["✦", "#ffc94a", 0.35, 0.1, 0.8],
    ];

    symbols.forEach(([symbol, color, x, y, z], index) => {
      const material = new THREE.SpriteMaterial({
        map: makeIconTexture(symbol, color),
        transparent: true,
      });
      const sprite = new THREE.Sprite(material);
      sprite.position.set(x, y, z);
      const scale = index === 4 ? 1.8 : 1.35;
      sprite.scale.set(scale, scale, scale);
      sprite.userData.offset = index * 1.3;
      group.add(sprite);
    });

    const ring = new THREE.Mesh(
      new THREE.TorusGeometry(2.7, 0.018, 8, 100),
      new THREE.MeshBasicMaterial({
        color: 0x191816,
        transparent: true,
        opacity: 0.22,
      })
    );
    ring.rotation.set(1.1, 0.5, 0.2);
    group.add(ring);

    let targetX = 0;
    let targetY = 0;

    const handlePointerMove = (event) => {
      targetX = (event.clientX / window.innerWidth - 0.5) * 0.4;
      targetY = (event.clientY / window.innerHeight - 0.5) * 0.3;
    };

    window.addEventListener("pointermove", handlePointerMove);

    const clock = new THREE.Clock();
    let reqId;

    const animate = () => {
      const time = clock.getElapsedTime();
      group.rotation.y += (targetX - group.rotation.y) * 0.03;
      group.rotation.x += (targetY - group.rotation.x) * 0.03;

      const isDark = document.documentElement.getAttribute("data-theme") === "dark";
      ring.material.color.setHex(isDark ? 0xffffff : 0x191816);
      ring.material.opacity = isDark ? 0.45 : 0.22;

      group.children.forEach((child) => {
        if (child.userData.offset !== undefined && !reduceMotion) {
          child.position.y += Math.sin(time * 0.8 + child.userData.offset) * 0.0018;
        }
      });
      if (!reduceMotion) {
        ring.rotation.z = time * 0.08;
      }

      if (renderer && scene && camera) {
        renderer.render(scene, camera);
      }
      reqId = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      if (!section || !renderer || !camera) return;
      camera.aspect = section.clientWidth / section.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(section.clientWidth, section.clientHeight);
      const mobile = window.innerWidth < 800;
      group.position.x = mobile ? 0 : 3.25;
      group.position.y = mobile ? -0.8 : 0;
      if (mobile) {
        group.scale.set(0.65, 0.65, 0.65);
      } else {
        group.scale.set(1, 1, 1);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(reqId);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("resize", handleResize);
      if (renderer) {
        try {
          renderer.dispose();
        } catch (e) {}
      }
    };
  }, []);

  return <canvas ref={canvasRef} id="hero-canvas" aria-hidden="true" />;
};

export default HeroCanvas;
