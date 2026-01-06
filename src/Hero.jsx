import { useEffect, useRef } from "react";
import p5 from "p5";
import { motion } from "framer-motion";
import { ChevronDown, Github, Linkedin, FileText } from "lucide-react";
import profileImg from "./assets/profile.png"; 

export default function Hero({
  name = "Jitesh Sonkusare",
  greeting = "HI, I’m",
  tagline = "Robotics Software Engineer • Motion Planning • SLAM • Perception • ROS2 C++/Python",
  resumePath = "/Jitesh_Sonkusare_Resume.pdf",
  githubUrl = "https://github.com/jitesh3023",
  linkedinUrl = "https://www.linkedin.com/in/jitesh-sonkusare-11b118198/",
}) {
  const sketchParentRef = useRef(null);
  const p5Ref = useRef(null);

  useEffect(() => {
    if (p5Ref.current) return;

    const sketch = (s) => {
      let w = 0;
      let h = 0;

      // --- Motion planning world ---
      let obstacles = [];
      let start = { x: 0, y: 0 };
      let goal = { x: 0, y: 0 };

      // A “no-draw” rectangle around the text so obstacles/path don't cut through it
      let textZone = { x: 0, y: 0, rw: 0, rh: 0 };

      // Path + robot animation
      let path = []; // array of points {x,y}
      let robotT = 0; // 0..1 along the path
      let robotSpeed = 0.0001; // adjusted by screen size in setup/resized
      let lastReplanAt = 0;

      const clamp = (v, a, b) => Math.max(a, Math.min(b, v));

      const distPointToSegment = (px, py, ax, ay, bx, by) => {
        const abx = bx - ax;
        const aby = by - ay;
        const apx = px - ax;
        const apy = py - ay;
        const ab2 = abx * abx + aby * aby;
        const t = ab2 === 0 ? 0 : clamp((apx * abx + apy * aby) / ab2, 0, 1);
        const cx = ax + t * abx;
        const cy = ay + t * aby;
        return Math.hypot(px - cx, py - cy);
      };

      const rectContains = (rx, ry, rw, rh, x, y) =>
        x >= rx && x <= rx + rw && y >= ry && y <= ry + rh;

      const circleIntersectsRect = (cx, cy, r, rx, ry, rw, rh) => {
        // closest point on rect to circle center
        const x = clamp(cx, rx, rx + rw);
        const y = clamp(cy, ry, ry + rh);
        return Math.hypot(cx - x, cy - y) <= r;
      };

      const buildTextZone = () => {
        // Place a “safe box” around the center text area.
        // Tune these if you change typography.
        const centerX = w / 2;
        const centerY = h / 2;
        textZone = {
          x: centerX - w * 0.28,
          y: centerY - h * 0.18,
          rw: w * 0.56,
          rh: h * 0.36,
        };
      };

      const makePlanningWorld = () => {
        buildTextZone();

        start = { x: w * 0.16, y: h * 0.70 };
        goal = { x: w * 0.86, y: h * 0.10 };

        obstacles = [];
        const n = Math.max(10, Math.floor((w * h) / 140000));

        let tries = 0;
        while (obstacles.length < n && tries < n * 30) {
          tries++;
          const r = s.random(26, 60);
          const ox = s.random(r + 30, w - r - 30);
          const oy = s.random(r + 70, h - r - 30);

          // keep obstacles away from start/goal
          const ds = Math.hypot(ox - start.x, oy - start.y);
          const dg = Math.hypot(ox - goal.x, oy - goal.y);
          if (ds < 140 || dg < 140) continue;

          // keep obstacles away from text zone so they don't cut the name
          if (circleIntersectsRect(ox, oy, r + 35, textZone.x, textZone.y, textZone.rw, textZone.rh)) {
            continue;
          }

          obstacles.push({ x: ox, y: oy, r });
        }

        // Create initial path and reset robot animation
        path = computeSmoothPath(start, goal);
        robotT = 0;
        lastReplanAt = s.millis();
      };

      const computeSmoothPath = (sPt, gPt) => {
        // Start with a direct polyline (maybe with a text-zone bypass)
        let control = [{ ...sPt }];
      
        // If line crosses text zone, add a waypoint above/below it
        const crossesText =
          distPointToSegment(
            textZone.x + textZone.rw / 2,
            textZone.y + textZone.rh / 2,
            sPt.x,
            sPt.y,
            gPt.x,
            gPt.y
          ) < Math.max(textZone.rw, textZone.rh) * 0.25;
      
        if (crossesText) {
          const goAbove = sPt.y > textZone.y + textZone.rh / 2;
          const wy = goAbove ? textZone.y - 70 : textZone.y + textZone.rh + 70;
          control.push({ x: w / 2, y: clamp(wy, 90, h - 90) });
        }
      
        control.push({ ...gPt });
      
        // Iteratively fix collisions by inserting detour waypoints
        const MAX_FIX_ITERS = 6;
        for (let iter = 0; iter < MAX_FIX_ITERS; iter++) {
          // check the *unsmoothed* control polyline first
          const blocker = findFirstBlockingObstacle(control, 45);
          if (!blocker) break;
      
          // Choose a detour point around the blocker, perpendicular to local segment
          // Find the segment that hit
          let hitSeg = null;
          for (let i = 0; i < control.length - 1; i++) {
            const a = control[i], b = control[i + 1];
            const hit = blocker._text
              ? rectContains(textZone.x, textZone.y, textZone.rw, textZone.rh, (a.x+b.x)/2, (a.y+b.y)/2)
              : segmentIntersectsCircle(a.x, a.y, b.x, b.y, blocker.x, blocker.y, blocker.r + 35);
            if (hit) { hitSeg = { i, a, b }; break; }
          }
          if (!hitSeg) break;
      
          const { i, a, b } = hitSeg;
          const vx = b.x - a.x;
          const vy = b.y - a.y;
          const len = Math.hypot(vx, vy) || 1;
          const nx = -vy / len;
          const ny = vx / len;
      
          const cx = blocker._text ? (textZone.x + textZone.rw / 2) : blocker.x;
          const cy = blocker._text ? (textZone.y + textZone.rh / 2) : blocker.y;
          const rad = blocker._text ? Math.max(textZone.rw, textZone.rh) * 0.35 : (blocker.r + 85);
      
          let cand1 = { x: cx + nx * rad, y: cy + ny * rad };
          let cand2 = { x: cx - nx * rad, y: cy - ny * rad };
      
          // pick the candidate that is farther from text zone center (safer for name area)
          const tzx = textZone.x + textZone.rw / 2;
          const tzy = textZone.y + textZone.rh / 2;
          const d1 = Math.hypot(cand1.x - tzx, cand1.y - tzy);
          const d2 = Math.hypot(cand2.x - tzx, cand2.y - tzy);
          let wp = d1 > d2 ? cand1 : cand2;
      
          wp.x = clamp(wp.x, 70, w - 70);
          wp.y = clamp(wp.y, 90, h - 70);
      
          // Insert waypoint right after the hit segment start
          control.splice(i + 1, 0, wp);
        }
      
        // Now smooth the collision-fixed polyline.
        // IMPORTANT: less smoothing reduces "bowing into obstacles"
        const smoothed = smoothPolyline(control, 10);
      
        // Extra safety: if smoothing introduces collision, fall back to less smoothing
        if (findFirstBlockingObstacle(smoothed, 28)) {
          return smoothPolyline(control, 10);
        }
      
        return smoothed;
      };
      

      const segmentIntersectsCircle = (ax, ay, bx, by, cx, cy, r) => {
        // distance from circle center to segment
        const abx = bx - ax;
        const aby = by - ay;
        const apx = cx - ax;
        const apy = cy - ay;
        const ab2 = abx * abx + aby * aby;
        const t = ab2 === 0 ? 0 : clamp((apx * abx + apy * aby) / ab2, 0, 1);
        const px = ax + t * abx;
        const py = ay + t * aby;
        return Math.hypot(px - cx, py - cy) <= r;
      };
      
      const findFirstBlockingObstacle = (polyPts, inflate = 28) => {
        for (let i = 0; i < polyPts.length - 1; i++) {
          const a = polyPts[i], b = polyPts[i + 1];
          for (const o of obstacles) {
            if (segmentIntersectsCircle(a.x, a.y, b.x, b.y, o.x, o.y, o.r + inflate)) {
              return o;
            }
          }
          // also avoid the text zone
          // If segment passes through textZone, treat it as blocking
          const midx = (a.x + b.x) * 0.5;
          const midy = (a.y + b.y) * 0.5;
          if (rectContains(textZone.x, textZone.y, textZone.rw, textZone.rh, midx, midy)) {
            return { x: w/2, y: h/2, r: Math.max(textZone.rw, textZone.rh) * 0.25, _text: true };
          }
        }
        return null;
      };
      

      const smoothPolyline = (controlPoints, samplesPerSeg) => {
        // Basic smooth curve through points using quadratic blends
        if (controlPoints.length <= 2) return controlPoints;

        const out = [];
        for (let i = 0; i < controlPoints.length - 1; i++) {
          const p0 = controlPoints[Math.max(0, i - 1)];
          const p1 = controlPoints[i];
          const p2 = controlPoints[i + 1];
          const p3 = controlPoints[Math.min(controlPoints.length - 1, i + 2)];

          for (let j = 0; j < samplesPerSeg; j++) {
            const t = j / samplesPerSeg;
            // Catmull-Rom
            const t2 = t * t;
            const t3 = t2 * t;

            const x =
              0.5 *
              ((2 * p1.x) +
                (-p0.x + p2.x) * t +
                (2 * p0.x - 5 * p1.x + 4 * p2.x - p3.x) * t2 +
                (-p0.x + 3 * p1.x - 3 * p2.x + p3.x) * t3);

            const y =
              0.5 *
              ((2 * p1.y) +
                (-p0.y + p2.y) * t +
                (2 * p0.y - 5 * p1.y + 4 * p2.y - p3.y) * t2 +
                (-p0.y + 3 * p1.y - 3 * p2.y + p3.y) * t3);

            out.push({ x, y });
          }
        }
        out.push(controlPoints[controlPoints.length - 1]);
        return out;
      };

      const pointOnPath = (t) => {
        if (path.length === 0) return { ...start };
        const idx = Math.floor(t * (path.length - 1));
        const i0 = clamp(idx, 0, path.length - 2);
        const i1 = i0 + 1;
        const localT = (t * (path.length - 1)) - i0;
        const a = path[i0];
        const b = path[i1];
        return { x: a.x + (b.x - a.x) * localT, y: a.y + (b.y - a.y) * localT };
      };

      s.setup = () => {
        w = s.windowWidth;
        h = s.windowHeight;
        const canvas = s.createCanvas(w, h);
        canvas.parent(sketchParentRef.current);

        // speed scaled with screen size so it feels consistent
        robotSpeed = 0.0008 + (w * h) / 800000000;
        s.textFont("Inter");
        makePlanningWorld();
      };

      s.windowResized = () => {
        w = s.windowWidth;
        h = s.windowHeight;
        s.resizeCanvas(w, h);
        robotSpeed = 0.0008 + (w * h) / 800000000;
        makePlanningWorld();
      };

      s.draw = () => {
        // Dark base
        s.background(23, 27, 35);

        // Replan occasionally to feel "alive"
        const now = s.millis();
        if (now - lastReplanAt > 3500) {
          path = computeSmoothPath(start, goal);
          lastReplanAt = now;
        }

        // Obstacles (soft, inflated)
        s.noStroke();
        for (const o of obstacles) {
          s.fill(255, 255, 255, 10);
          s.circle(o.x, o.y, (o.r + 20) * 2);

          s.fill(255, 255, 255, 18);
          s.circle(o.x, o.y, o.r * 2);
        }

        // Optional: visualize text safe-zone very subtly (debug)
        // s.noFill(); s.stroke(255,255,255,18); s.rect(textZone.x, textZone.y, textZone.rw, textZone.rh, 16);

        // Draw planned path
        if (path.length > 1) {
          s.noFill();
          s.stroke(255, 255, 255, 70);
          s.strokeWeight(2);

          s.beginShape();
          for (const p of path) s.vertex(p.x, p.y);
          s.endShape();

          // Glow pass (subtle)
          s.stroke(120, 220, 255, 30);
          s.strokeWeight(6);
          s.beginShape();
          for (const p of path) s.vertex(p.x, p.y);
          s.endShape();
        }

        // Start
        s.noStroke();
        s.fill(46, 204, 113, 230);
        s.circle(start.x, start.y, 10);
        s.fill(255, 255, 255, 160);
        s.textSize(12);
        s.text("START", start.x + 12, start.y + 4);

        // Goal
        s.noStroke();
        s.fill(231, 76, 60, 230);
        s.circle(goal.x, goal.y, 10);
        s.fill(255, 255, 255, 160);
        s.text("GOAL", goal.x + 12, goal.y + 4);

        // Robot animation along the path
        robotT += robotSpeed;
        if (robotT >= 1) robotT = 0;

        const rPos = pointOnPath(robotT);

        // Robot glow + body
        s.noStroke();
        s.fill(120, 220, 255, 40);
        s.circle(rPos.x, rPos.y, 28);

        s.fill(120, 220, 255, 200);
        s.circle(rPos.x, rPos.y, 10);

        // Heading indicator (look ahead on path)
        const look = pointOnPath(clamp(robotT + 0.015, 0, 1));
        s.stroke(255, 255, 255, 120);
        s.strokeWeight(2);
        s.line(rPos.x, rPos.y, look.x, look.y);

        // little “sensor ring”
        s.noFill();
        s.stroke(255, 255, 255, 35);
        s.strokeWeight(1);
        s.circle(rPos.x, rPos.y, 44);
      };
    };

    p5Ref.current = new p5(sketch);

    return () => {
      if (p5Ref.current) {
        p5Ref.current.remove();
        p5Ref.current = null;
      }
    };
  }, []);

  const scrollToAbout = () => {
    const el = document.getElementById("about");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen w-full overflow-hidden bg-transparent text-white"
    >
      <div
        ref={sketchParentRef}
        className="pointer-events-none absolute inset-0 z-0"
        aria-hidden
      />
      {/* Top-left profile photo (no link) */}
      <div className="absolute left-30 top-40 z-20 hidden sm:block">
        <div className="inline-flex items-center gap-3">
          {/* glow ring */}
          <div className="relative">
            <div className="absolute -inset-3 rounded-full bg-gradient-to-r from-sky-300/20 to-teal-300/20 blur-xl opacity-70 transition-opacity" />
            <div className="relative rounded-full p-[2px] bg-gradient-to-r from-sky-200/70 to-teal-200/70">
            <img
              src={profileImg}
              alt={`${name} profile`}
              className="h-70 w-70 rounded-full object-cover bg-black/20"
              loading="lazy"
              draggable={false}
            />
            </div>
          </div>
        </div>
      </div>


      <div className="relative z-10 flex min-h-screen items-center justify-center px-6">
        <div className="mx-auto max-w-4xl text-center">
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 0.9, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-3 text-base md:text-lg tracking-wide uppercase opacity-80"
          >
            {greeting}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight"
          >
            <span className="bg-gradient-to-r from-white via-sky-200 to-teal-200 bg-clip-text text-transparent">
              {name}
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="mx-auto mt-4 max-w-2xl text-sm sm:text-base md:text-lg opacity-90"
          >
            {tagline}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="mt-8 flex flex-wrap justify-center gap-3 relative z-20"
          >
            <motion.a
              href={resumePath}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative z-20 inline-flex items-center gap-2 px-7 py-4 rounded-2xl border border-white/20 backdrop-blur-lg bg-white/10 text-white font-semibold shadow-lg hover:bg-white/20 hover:shadow-xl transition-all duration-300"
            >
              <FileText size={18} />
              Resume
            </motion.a>

            <motion.a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative z-20 inline-flex items-center gap-2 px-7 py-4 rounded-2xl border border-white/20 backdrop-blur-lg bg-white/10 text-white font-semibold shadow-lg hover:bg-white/20 hover:shadow-xl transition-all duration-300"
            >
              <Github size={18} />
              GitHub
            </motion.a>

            <motion.a
              href={linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative z-20 inline-flex items-center gap-2 px-7 py-4 rounded-2xl border border-white/20 backdrop-blur-lg bg-white/10 text-white font-semibold shadow-lg hover:bg-white/20 hover:shadow-xl transition-all duration-300"
            >
              <Linkedin size={18} />
              LinkedIn
            </motion.a>
          </motion.div>
        </div>

        <motion.button
          type="button"
          aria-label="Scroll to About section"
          onClick={scrollToAbout}
          className="absolute bottom-6 flex justify-center w-full"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ChevronDown size={32} className="text-gray-300" />
        </motion.button>
      </div>
    </section>
  );
}
