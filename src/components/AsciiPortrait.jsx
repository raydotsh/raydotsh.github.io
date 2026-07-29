import React, { useRef, useEffect, useState } from "react";

const memoryCache = {};

const calculateSize = (width) => {
  if (width <= 480) {
    return Math.min(300, width - 20);
  } else if (width <= 768) {
    return Math.min(420, width - 40);
  } else if (width <= 1200) {
    return 480;
  } else {
    return 540;
  }
};

const AsciiPortrait = () => {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: -1000, y: -1000, active: false });
  const mouseTargetRef = useRef({ x: -1000, y: -1000 });
  const particlesRef = useRef([]);
  const startTimeRef = useRef(null);
  const [size, setSize] = useState(() => calculateSize(window.innerWidth));
  const [dataReady, setDataReady] = useState(false);

  const chars = " .:-=+*#%@".split("");

  useEffect(() => {
    const updateSize = () => {
      setSize(calculateSize(window.innerWidth));
    };

    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  const createParticlesFromRaw = (rawParticles, isMobileSize) => {
    const fontSize = isMobileSize ? 5 : 7;
    return rawParticles.map((p) => ({
      x: p.x + (Math.random() - 0.5) * 300,
      y: p.y + (Math.random() - 0.5) * 300,
      targetX: p.x,
      targetY: p.y,
      vx: 0,
      vy: 0,
      char: p.char,
      fontSize: fontSize,
      baseAlpha: p.alpha,
      currentAlpha: 0,
      delay: Math.random() * 0.3,
      shimmer: Math.random() * Math.PI * 2,
    }));
  };

  const processImage = (img, targetSize) => {
    const canvasWidth = targetSize;
    const canvasHeight = targetSize;
    const offscreen = document.createElement("canvas");
    const offCtx = offscreen.getContext("2d");
    offscreen.width = canvasWidth;
    offscreen.height = canvasHeight;

    const scale = 0.85;
    const imgAspect = img.width / img.height;

    let drawHeight = canvasHeight * scale;
    let drawWidth = drawHeight * imgAspect;

    if (drawWidth > canvasWidth * scale) {
      drawWidth = canvasWidth * scale;
      drawHeight = drawWidth / imgAspect;
    }

    const offsetX = (canvasWidth - drawWidth) / 2;
    const offsetY = (canvasHeight - drawHeight) / 2;

    offCtx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
    const imageData = offCtx.getImageData(0, 0, canvasWidth, canvasHeight);
    const pixels = imageData.data;

    const rawParticles = [];
    const isMobileSize = targetSize <= 300;
    const fontSize = isMobileSize ? 5 : 7;
    const colGap = fontSize * 0.7;
    const rowGap = fontSize * 1.1;

    for (let y = 0; y < canvasHeight; y += rowGap) {
      for (let x = 0; x < canvasWidth; x += colGap) {
        const i = (Math.floor(y) * canvasWidth + Math.floor(x)) * 4;
        const a = pixels[i + 3];

        if (a > 128) {
          const r = pixels[i];
          const g = pixels[i + 1];
          const b = pixels[i + 2];
          const brightness = (r + g + b) / (3 * 255);
          const charIndex = Math.floor(brightness * (chars.length - 1));

          rawParticles.push({
            x: Number(x.toFixed(1)),
            y: Number(y.toFixed(1)),
            char: chars[charIndex],
            alpha: Number((0.4 + brightness * 0.6).toFixed(2)),
          });
        }
      }
    }
    return rawParticles;
  };

  useEffect(() => {
    const isMobileSize = size <= 300;
    let isSubscribed = true;

    if (memoryCache[size]) {
      particlesRef.current = createParticlesFromRaw(memoryCache[size], isMobileSize);
      queueMicrotask(() => {
        if (isSubscribed) setDataReady(true);
      });
      startTimeRef.current = performance.now();
      return;
    }

    const loadFromImage = () => {
      const img = new Image();
      img.crossOrigin = "Anonymous";
      img.src = "/profile.png";
      img.onload = () => {
        if (!isSubscribed) return;
        const raw = processImage(img, size);
        memoryCache[size] = raw;
        particlesRef.current = createParticlesFromRaw(raw, isMobileSize);
        setDataReady(true);
        startTimeRef.current = performance.now();
      };
    };

    fetch("/asciiData.json")
      .then((res) => {
        if (!res.ok) throw new Error("JSON not found");
        return res.json();
      })
      .then((data) => {
        if (!isSubscribed) return;
        if (data && data[size]) {
          memoryCache[size] = data[size];
          particlesRef.current = createParticlesFromRaw(data[size], isMobileSize);
          setDataReady(true);
          startTimeRef.current = performance.now();
        } else {
          loadFromImage();
        }
      })
      .catch(() => {
        if (isSubscribed) {
          loadFromImage();
        }
      });

    return () => {
      isSubscribed = false;
    };
  }, [size]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    const dpr = window.devicePixelRatio || 1;

    canvas.width = size * dpr;
    canvas.height = size * dpr;
    ctx.scale(dpr, dpr);

    let animationId;

    const draw = () => {
      animationId = requestAnimationFrame(draw);

      ctx.clearRect(0, 0, size, size);

      if (!dataReady || !particlesRef.current.length) return;

      const particles = particlesRef.current;
      const mouse = mouseRef.current;
      const mouseTarget = mouseTargetRef.current;
      const elapsed = (performance.now() - startTimeRef.current) / 1000;

      // Ultra-smooth mouse tracking
      mouse.x += (mouseTarget.x - mouse.x) * 0.08;
      mouse.y += (mouseTarget.y - mouse.y) * 0.08;

      const isMobileSize = size <= 300;
      const fontSize = isMobileSize ? 5 : 7;
      ctx.font = `${fontSize}px monospace`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      particles.forEach((p) => {
        const particleTime = elapsed - p.delay;
        if (particleTime < 0) return;

        const fadeProgress = Math.min(particleTime / 1.2, 1);
        const easedFade = 1 - Math.pow(1 - fadeProgress, 2);

        const isActive = mouse.active || particleTime < 2.5;
        const shimmerVal = isActive ? Math.sin(elapsed * 2.5 + p.shimmer) * 0.08 : 0;
        p.currentAlpha = Math.max(0, p.baseAlpha * easedFade + shimmerVal);

        const moveProgress = Math.min(particleTime / 2.0, 1);
        const easedMove = 1 - Math.pow(1 - moveProgress, 3);

        if (mouse.active) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const maxDist = size * 0.22;

          if (dist < maxDist && dist > 0) {
            const force = (1 - dist / maxDist) * 3.5;
            p.vx += (dx / dist) * force;
            p.vy += (dy / dist) * force;
          }
        }

        const dx = p.targetX - p.x;
        const dy = p.targetY - p.y;

        const pullStrength = 0.015 + easedMove * 0.06;
        p.vx += dx * pullStrength;
        p.vy += dy * pullStrength;

        if (isActive) {
          const breathX = Math.sin(elapsed * 0.6 + p.targetY * 0.08) * 0.12;
          const breathY = Math.cos(elapsed * 0.6 + p.targetX * 0.08) * 0.12;
          p.vx += breathX;
          p.vy += breathY;
          p.vx *= 0.93;
          p.vy *= 0.93;
        } else {
          p.vx *= 0.88;
          p.vy *= 0.88;

          if (particleTime > 3.5 && Math.abs(dx) < 0.01 && Math.abs(dy) < 0.01) {
            p.x = p.targetX;
            p.y = p.targetY;
            p.vx = 0;
            p.vy = 0;
          }
        }

        p.x += p.vx;
        p.y += p.vy;

        const jitterX = (Math.random() - 0.5) * 0.9;
        const jitterY = (Math.random() - 0.5) * 0.9;

        const isLight = document.documentElement.getAttribute("data-theme") === "light";

        if (isLight) {
          const darkness = Math.max(0, Math.min(1, (0.92 - p.baseAlpha) / 0.45));

          if (darkness > 0.4) {
            ctx.fillStyle = `rgba(15, 23, 42, ${Math.max(0.95, easedFade)})`;
            const hairChar = darkness > 0.7 ? "@" : (darkness > 0.5 ? "%" : "#");
            ctx.fillText(hairChar, p.x + jitterX, p.y + jitterY);
          } else {
            ctx.fillStyle = `rgba(2, 132, 199, ${Math.max(0.7, (1 - darkness) * easedFade)})`;
            const accentChar = p.char === "@" || p.char === "%" || p.char === "#" ? "#" : p.char;
            ctx.fillText(accentChar, p.x + jitterX, p.y + jitterY);
          }
        } else {
          ctx.fillStyle = `rgba(56, 189, 248, ${p.currentAlpha})`;
          ctx.fillText(p.char, p.x + jitterX, p.y + jitterY);
        }
      });
    };

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouseTargetRef.current.x = e.clientX - rect.left;
      mouseTargetRef.current.y = e.clientY - rect.top;
      mouseRef.current.active = true;
    };

    const handleTouchMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      const touch = e.touches[0];
      mouseTargetRef.current.x = touch.clientX - rect.left;
      mouseTargetRef.current.y = touch.clientY - rect.top;
      mouseRef.current.active = true;
      if (e.cancelable) e.preventDefault();
    };

    const handleLeave = () => {
      mouseRef.current.active = false;
      mouseTargetRef.current.x = -1000;
      mouseTargetRef.current.y = -1000;
    };

    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleLeave);
    canvas.addEventListener("touchmove", handleTouchMove, { passive: false });
    canvas.addEventListener("touchend", handleLeave);

    draw();

    return () => {
      cancelAnimationFrame(animationId);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleLeave);
      canvas.removeEventListener("touchmove", handleTouchMove);
      canvas.removeEventListener("touchend", handleLeave);
    };
  }, [size, dataReady]);

  return (
    <canvas
      ref={canvasRef}
      className="simulation-container"
      style={{
        width: `${size}px`,
        height: `${size}px`,
        cursor: "crosshair",
        touchAction: "none",
      }}
    />
  );
};

export default AsciiPortrait;
