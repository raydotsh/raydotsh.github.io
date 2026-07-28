import React, { useRef, useEffect, useState, useCallback } from "react";
import "../styles/RobotGame.css";

const SCALE    = 2;
const PX_W     = 16;
const PX_H     = 18;
const BLOB_W   = PX_W * SCALE;
const BLOB_H   = PX_H * SCALE;

const GRAVITY        = 0.22;
const JUMP_FORCE     = -7;
const MAX_SPEED      = 1.8;
const FRICTION       = 0.82;
const BLOCK_H        = 8;
const SPAWN_INTERVAL = 22;
const CELL_COUNT     = 5;

function drawBlob(ctx, x, y, frame, onGround, isIdle) {
  const B  = "#ccd6f6";
  const D  = "#8892b0";
  const EY = "#0a192f";
  const SH = "#38bdf8";
  const CK = "#38bdf8";

  ctx.save();
  ctx.translate(Math.round(x), Math.round(y));
  ctx.scale(SCALE, SCALE);

  const wf  = !isIdle && onGround ? Math.floor(frame / 10) % 2 : 0;
  const bob = isIdle ? (Math.sin(frame * 0.06) > 0.3 ? 1 : 0) : 0;

  ctx.fillStyle = B;
  ctx.fillRect(4,  0 + bob,  8, 2);
  ctx.fillRect(2,  2 + bob, 12, 2);
  ctx.fillRect(1,  4 + bob, 14, 7);
  ctx.fillRect(0,  6 + bob,  1, 3);
  ctx.fillRect(15, 6 + bob,  1, 3);
  ctx.fillRect(2, 11 + bob, 12, 2);
  ctx.fillRect(4, 13 + bob,  8, 1);

  ctx.fillStyle = D;
  ctx.fillRect(3, 12 + bob, 10, 1);

  ctx.fillStyle = B;
  const lA = wf, lB = 1 - wf;
  ctx.fillRect(3,  14, 3, 2 + lA);
  ctx.fillRect(10, 14, 3, 2 + lB);
  ctx.fillRect(2,  15 + lA, 5, 2);
  ctx.fillRect(9,  15 + lB, 5, 2);

  ctx.fillStyle = EY;
  ctx.fillRect(2,  4 + bob, 4, 4);
  ctx.fillRect(10, 4 + bob, 4, 4);

  ctx.fillStyle = SH;
  ctx.fillRect(2,  4 + bob, 2, 2);
  ctx.fillRect(10, 4 + bob, 2, 2);

  ctx.fillStyle = CK;
  ctx.globalAlpha = 0.18;
  ctx.fillRect(1,  8 + bob, 2, 1);
  ctx.fillRect(13, 8 + bob, 2, 1);
  ctx.globalAlpha = 1;

  ctx.fillStyle = EY;
  ctx.fillRect(5,  9 + bob, 1, 1);
  ctx.fillRect(6, 10 + bob, 4, 1);
  ctx.fillRect(10, 9 + bob, 1, 1);

  ctx.restore();
}

function drawBlock(ctx, bx, by, bw, alpha = 1) {
  if (alpha <= 0) return;
  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.fillStyle = "rgba(0,0,0,0.18)";
  ctx.fillRect(bx + 2, by + BLOCK_H, bw - 2, 3);
  ctx.fillStyle = "#112240";
  ctx.fillRect(bx, by, bw, BLOCK_H);
  ctx.fillStyle = "rgba(100,255,218,0.6)";
  ctx.fillRect(bx, by, bw, 2);
  ctx.fillStyle = "rgba(100,255,218,0.09)";
  for (let px = bx + 6; px < bx + bw - 3; px += 10)
    ctx.fillRect(px, by + 3, 2, 2);
  ctx.fillStyle = "rgba(0,0,0,0.22)";
  ctx.fillRect(bx, by + BLOCK_H - 1, bw, 1);
  ctx.restore();
}

function drawBrainCell(ctx, ex, ey, scrollY, idx) {
  const sy = ey - scrollY;
  if (sy < -24 || sy > ctx.canvas.height + 24) return;

  const t   = Date.now() * 0.002 + idx * 1.4;
  const bob = Math.sin(t) * 2;
  const cx  = Math.round(ex + 6);
  const cy  = Math.round(sy + bob + 7);

  ctx.save()

  ctx.globalAlpha = 0.12 + 0.06 * Math.sin(t * 1.6);
  ctx.fillStyle = "#9060c0";
  ctx.beginPath();
  ctx.ellipse(cx, cy, 14, 17, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.globalAlpha = 0.88;
  ctx.fillStyle = "#bf9fd4";
  const DN = [
    [0,    -8.5, 2,   3.5],
    [-5.5, -6,   2.5, 2  ],
    [5.5,  -6,   2.5, 2  ],
    [-8,    0,   3,   2  ],
    [8,     0,   3,   2  ],
    [-4.5,  7,   2.5, 3  ],
    [4.5,   7,   2.5, 3  ],
  ];
  DN.forEach(([dx, dy, rx, ry]) => {
    ctx.beginPath();
    ctx.ellipse(cx + dx, cy + dy, rx, ry, 0, 0, Math.PI * 2);
    ctx.fill();
  });

  ctx.fillStyle = "#bf9fd4";
  ctx.beginPath();
  ctx.ellipse(cx, cy, 5.5, 6.5, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = "#edddf8";
  ctx.beginPath();
  ctx.ellipse(cx - 1.5, cy - 2, 2, 2.5, -0.3, 0, Math.PI * 2);
  ctx.fill();

  ctx.restore();
}

function generateCellLayout(nb, vw, avoidZones = []) {
  const clearZone = (docY) => {
    let y = docY;
    for (let pass = 0; pass < 8; pass++) {
      const hit = avoidZones.find((z) => y - 20 < z.bot && y + BLOCK_H + 4 > z.top);
      if (!hit) break;
      y = hit.bot + 10;
    }
    return y;
  };

  const cLeft  = Math.max(0, (vw - 1000) / 2);
  const cRight = Math.min(vw - 40, cLeft + 1000);

  const yZones = [
    [nb + 400,  nb + 620 ],
    [nb + 1000, nb + 1280],
    [nb + 1780, nb + 2100],
    [nb + 2700, nb + 3060],
    [nb + 3640, nb + 4160],
  ];

  const xTiers = [
    50,
    Math.round(cLeft + 90),
    Math.round(vw / 2 - 20),
    Math.round(cRight - 180),
    Math.min(Math.round(vw * 0.88), vw - 100),
  ];
  const shuffled = [...xTiers];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  const cells       = [];
  const extraLedges = [];
  const mk = (x, docY, w) => ({
    x, docY, w, isSpawn: false, isGoal: false, alpha: 0, revealed: false,
  });

  yZones.forEach(([yMin, yMax], i) => {
    const ledgeDocY = clearZone(yMin + Math.random() * (yMax - yMin));
    const cellX     = shuffled[i];
    const approachY = ledgeDocY + 80;

    cells.push({ x: cellX, docY: ledgeDocY - 16, collected: false });
    extraLedges.push(mk(cellX - 8, ledgeDocY, 72));

    if (cellX <= 230) return;

    let x     = 230;
    let count = 0;
    const maxChain = cellX > cRight - 20 ? 14 : 8;
    while (x + 80 < cellX && count < maxChain) {
      extraLedges.push(mk(x, approachY, 68));
      x    += 90;
      count += 1;
    }
  });

  return { cells, extraLedges };
}

const PLATFORM_SELECTORS = [
  ".section-title", ".intro-title", ".intro-desc",
  ".intro-contact", ".joblist-job-title", ".joblist-job-company",
  ".card-title", ".ending-credits",
  "h3", "p", "li",
];

function getNavbarBottom() {
  const nb = document.querySelector(".navbar");
  return nb ? nb.getBoundingClientRect().bottom : 60;
}

const RobotGame = ({ active }) => {
  const canvasRef    = useRef(null);
  const animRef      = useRef(null);
  const blobRef      = useRef(null);
  const blocksRef    = useRef([]);
  const cellsRef     = useRef([]);
  const keysRef      = useRef(new Set());
  const jumpLatchRef = useRef(false);
  const frameRef     = useRef(0);

  const [gameStatus,      setGameStatus]      = useState("playing");
  const [restartKey,      setRestartKey]      = useState(0);
  const [cellsCollected,  setCellsCollected]  = useState(0);

  const restart = useCallback(() => setRestartKey((k) => k + 1), []);

  const getPlatforms = useCallback(() => {
    const scrollY   = window.scrollY;
    const platforms = blocksRef.current
      .filter((b) => b.alpha > 0.5)
      .map((b) => ({ x: b.x, y: b.docY, w: b.w }));
    PLATFORM_SELECTORS.forEach((sel) => {
      document.querySelectorAll(sel).forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.width < 60 || r.height > 100) return;
        const docTop = r.top + scrollY;
        if (docTop > scrollY + window.innerHeight + 200 || docTop + r.height < scrollY - 200) return;
        platforms.push({ x: r.left, y: docTop, w: r.width });
      });
    });
    return platforms;
  }, []);

  useEffect(() => {
    if (!active) { cancelAnimationFrame(animRef.current); return; }

    window.scrollTo(0, 0);

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx     = canvas.getContext("2d");
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;

    const nb = getNavbarBottom();
    frameRef.current = 0;
    setCellsCollected(0);

    const allDomZones  = [];
    const textZones    = [];
    PLATFORM_SELECTORS.forEach((sel) => {
      document.querySelectorAll(sel).forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.width < 60 || r.height < 4) return;
        allDomZones.push({ top: r.top - 4, bot: r.bottom + 4 });
        if (r.height <= 55) textZones.push({ top: r.top - 4, bot: r.bottom + 4 });
      });
    });
    const adjustForText = (docY) => {
      let y = docY;
      for (let i = 0; i < 4; i++) {
        const hit = textZones.find((z) => y < z.bot && y + BLOCK_H > z.top);
        if (!hit) break;
        y = hit.bot + 5;
      }
      return y;
    };

    const { cells, extraLedges } = generateCellLayout(nb, canvas.width, allDomZones);
    cellsRef.current = cells;

    const mkS = (b) => ({ ...b, isSpawn: false, isGoal: false, alpha: 0, revealed: false });

    const rawScatter = [
      { x: 20,  docY: nb + 320  }, { x: 120, docY: nb + 355  },
      { x: 200, docY: nb + 570  }, { x: 110, docY: nb + 605  }, { x: 20,  docY: nb + 640  },
      { x: 20,  docY: nb + 850  }, { x: 120, docY: nb + 885  },
      { x: 210, docY: nb + 1100 }, { x: 110, docY: nb + 1135 }, { x: 20,  docY: nb + 1170 },
      { x: 20,  docY: nb + 1380 }, { x: 130, docY: nb + 1415 },
      { x: 200, docY: nb + 1640 }, { x: 110, docY: nb + 1675 }, { x: 20,  docY: nb + 1710 },
      { x: 20,  docY: nb + 1920 }, { x: 120, docY: nb + 1955 },
      { x: 210, docY: nb + 2180 }, { x: 110, docY: nb + 2215 }, { x: 20,  docY: nb + 2250 },
      { x: 20,  docY: nb + 2460 }, { x: 130, docY: nb + 2495 },
      { x: 200, docY: nb + 2720 }, { x: 110, docY: nb + 2755 }, { x: 20,  docY: nb + 2790 },
      { x: 20,  docY: nb + 3000 }, { x: 120, docY: nb + 3035 },
      { x: 210, docY: nb + 3260 }, { x: 110, docY: nb + 3295 }, { x: 20,  docY: nb + 3330 },
      { x: 20,  docY: nb + 3540 }, { x: 130, docY: nb + 3575 },
      { x: 200, docY: nb + 3800 }, { x: 110, docY: nb + 3835 }, { x: 20,  docY: nb + 3870 },
      { x: 20,  docY: nb + 4080 }, { x: 120, docY: nb + 4115 },
      { x: 210, docY: nb + 4340 }, { x: 110, docY: nb + 4375 }, { x: 20,  docY: nb + 4410 },
      { x: 20,  docY: nb + 4620 }, { x: 130, docY: nb + 4655 },
      { x: 200, docY: nb + 4880 }, { x: 110, docY: nb + 4915 }, { x: 20,  docY: nb + 4950 },
    ].map((b) => ({ ...b, w: 72 }));

    blocksRef.current = [
      { x: 30,  docY: nb + 200, w: 80, isSpawn: true, spawnIdx: 0, isGoal: false, alpha: 0, revealed: false },
      { x: 170, docY: nb + 155, w: 76, isSpawn: true, spawnIdx: 1, isGoal: false, alpha: 0, revealed: false },
      { x: 315, docY: nb + 235, w: 76, isSpawn: true, spawnIdx: 2, isGoal: false, alpha: 0, revealed: false },
      { x: 450, docY: nb + 175, w: 76, isSpawn: true, spawnIdx: 3, isGoal: false, alpha: 0, revealed: false },
      ...[...rawScatter]
        .map((b) => ({ ...b, docY: adjustForText(b.docY) }))
        .map(mkS),
      ...extraLedges,
    ];

    const b0 = blocksRef.current[0];
    blobRef.current = {
      x:        Math.round(b0.x + b0.w / 2 - BLOB_W / 2),
      docY:     b0.docY - BLOB_H - 280,
      vx:       0,
      vy:       0,
      onGround: false,
      frame:    0,
      status:   "playing",
      spawning: true,
      bounces:  0,
    };

    setGameStatus("playing");

    const onKeyDown = (e) => {
      if (e.code === "Space" && blobRef.current?.status === "dead") {
        restart();
        return;
      }
      keysRef.current.add(e.code);
      if (["Space","ArrowUp","ArrowLeft","ArrowRight","ArrowDown"].includes(e.code))
        e.preventDefault();
    };
    const onKeyUp = (e) => keysRef.current.delete(e.code);
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup",   onKeyUp);

    const loop = () => {
      const a = blobRef.current;
      if (!a || a.status !== "playing") return;

      if (canvas.width  !== window.innerWidth)  canvas.width  = window.innerWidth;
      if (canvas.height !== window.innerHeight) canvas.height = window.innerHeight;

      const scrollY = window.scrollY;
      frameRef.current++;

      blocksRef.current.forEach((b) => {
        if (!b.revealed) {
          if (b.isSpawn) {
            if (frameRef.current >= b.spawnIdx * SPAWN_INTERVAL) b.revealed = true;
          } else {
            if (b.docY - scrollY < canvas.height + 80) b.revealed = true;
          }
        }
        if (b.revealed && b.alpha < 0.62) b.alpha = Math.min(b.alpha + 0.05, 0.62);
      });

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      blocksRef.current.forEach((b) => {
        if (b.alpha <= 0) return;
        const sy = b.docY - scrollY;
        if (sy > -BLOCK_H - 4 && sy < canvas.height + 4)
          drawBlock(ctx, b.x, sy, b.w, b.alpha);
      });

      cellsRef.current.forEach((cell, idx) => {
        if (!cell.collected) drawBrainCell(ctx, cell.x, cell.docY, scrollY, idx);
      });

      if (a.spawning) {
        a.vy = Math.min(a.vy + GRAVITY, 8);
        a.docY += a.vy;
        a.frame++;

        const b = blocksRef.current[0];
        if (b.alpha > 0.5) {
          const rBot = a.docY + BLOB_H, prev = rBot - a.vy;
          if (a.x + BLOB_W > b.x && a.x < b.x + b.w &&
              prev <= b.docY + 4 && rBot >= b.docY && a.vy > 0) {
            a.docY = b.docY - BLOB_H;
            a.bounces++;
            if      (a.bounces === 1) { a.vy = -4.5; }
            else if (a.bounces === 2) { a.vy = -1.8; }
            else    { a.vy = 0; a.onGround = true; a.spawning = false; }
          }
        }

        const sy = a.docY - scrollY;
        if (sy > -BLOB_H && sy < canvas.height)
          drawBlob(ctx, a.x, sy, a.frame, a.onGround, false);
        animRef.current = requestAnimationFrame(loop);
        return;
      }

      const keys  = keysRef.current;
      const left  = keys.has("ArrowLeft")  || keys.has("KeyA");
      const right = keys.has("ArrowRight") || keys.has("KeyD");
      const jump  = keys.has("Space") || keys.has("ArrowUp") || keys.has("KeyW");

      if (left)       a.vx = Math.max(a.vx - 0.32, -MAX_SPEED);
      else if (right) a.vx = Math.min(a.vx + 0.32,  MAX_SPEED);
      else            a.vx *= FRICTION;

      if (jump && a.onGround && !jumpLatchRef.current) {
        a.vy = JUMP_FORCE; a.onGround = false; jumpLatchRef.current = true;
      }
      if (!jump) jumpLatchRef.current = false;

      a.vy = Math.min(a.vy + GRAVITY, 8);
      a.x += a.vx;
      a.docY += a.vy;
      a.frame++;

      if (a.x < 0)                      { a.x = 0;                      a.vx = 0; }
      if (a.x + BLOB_W > canvas.width)  { a.x = canvas.width - BLOB_W;  a.vx = 0; }

      const platforms = getPlatforms();
      a.onGround = false;
      for (const p of platforms) {
        const rBot = a.docY + BLOB_H, prev = rBot - a.vy;
        if (a.x + BLOB_W > p.x + 2 && a.x < p.x + p.w - 2 &&
            prev <= p.y + 5 && rBot >= p.y - 1 && a.vy >= 0) {
          a.docY = p.y - BLOB_H; a.vy = 0; a.onGround = true; break;
        }
      }

      if (a.docY - scrollY > canvas.height + 100) {
        a.status = "dead"; setGameStatus("dead"); return;
      }

      const aCx = a.x + BLOB_W / 2;
      const aCy = a.docY + BLOB_H / 2;
      cellsRef.current.forEach((cell) => {
        if (cell.collected) return;
        const cCx = cell.x + 6;
        const cCy = cell.docY + 8;
        if (Math.abs(aCx - cCx) < 24 && Math.abs(aCy - cCy) < 26) {
          cell.collected = true;
          setCellsCollected((c) => c + 1);
        }
      });

      if (cellsRef.current.length > 0 && cellsRef.current.every((c) => c.collected)) {
        a.status = "won"; setGameStatus("won"); return;
      }

      const sy     = a.docY - scrollY;
      const isIdle = a.onGround && Math.abs(a.vx) < 0.25;
      if (sy > -BLOB_H && sy < canvas.height + 40)
        drawBlob(ctx, a.x, sy, a.frame, a.onGround, isIdle);

      animRef.current = requestAnimationFrame(loop);
    };

    animRef.current = requestAnimationFrame(loop);

    const onResize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup",   onKeyUp);
      window.removeEventListener("resize",  onResize);
      keysRef.current.clear();
      jumpLatchRef.current = false;
    };
  }, [active, restartKey, getPlatforms, restart]);

  if (!active) return null;

  return (
    <>
      <canvas ref={canvasRef} className="robot-game-canvas" />

      {gameStatus === "playing" && (
        <div className="cell-counter">
          <span className="cell-counter-pip" />
          <span className="cell-counter-text">{cellsCollected} / {CELL_COUNT}</span>
        </div>
      )}

      {gameStatus === "dead" && (
        <div className="robot-game-status robot-game-status--dead">
          <div className="robot-game-status-title">you fell</div>
          <div className="robot-game-status-sub">brain cells scatter further</div>
          <button className="robot-game-status-btn" onClick={restart}>try again</button>
          <div className="robot-game-status-hint">or press space</div>
        </div>
      )}

      {gameStatus === "won" && (
        <div className="robot-game-status robot-game-status--won">
          <div className="robot-game-status-title">neurons restored</div>
          <div className="robot-game-status-sub">all {CELL_COUNT} brain cells recovered</div>
          <button className="robot-game-status-btn" onClick={restart}>play again</button>
        </div>
      )}
    </>
  );
};

export default RobotGame;
