import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { useRef } from "react";


// localization 
import loc1 from "./assets/projects/localization/1.png";
import loc2 from "./assets/projects/localization/2.png";
import loc3 from "./assets/projects/localization/3.png";
import loc4 from "./assets/projects/localization/4.png";
import loc5 from "./assets/projects/localization/5.png";

// disaster management
import dm1 from "./assets/projects/disaster/1.mp4";
import dm2 from "./assets/projects/disaster/2.mp4";
import dmi1 from "./assets/projects/disaster/1.png";
import dmi2 from "./assets/projects/disaster/2.png";
import dmi3 from "./assets/projects/disaster/3.png";

// shopping cart
import sc1 from "./assets/projects/shopping_cart/1.mp4";

// RAFT
import raft1 from "./assets/projects/RAFT/1.mp4";
import raft2 from "./assets/projects/RAFT/2.mp4";

// Quadruped
import quad1 from "./assets/projects/Quadruped/1.mp4";

// sfm
import sfm1 from "./assets/projects/sfm/1.png";
import sfm2 from "./assets/projects/sfm/2.png";

// warehouse
import whVideo from "./assets/projects/warehouse/1.mp4";
import whImg from "./assets/projects/warehouse/1.png";

// Maze
import sb1 from "./assets/projects/Maze/1.png";

// biped
import biped1 from "./assets/projects/biped/1.mp4";

// ADAS
import carla1 from "./assets/projects/carla_collision_avoidance/1.mp4";
import carla2 from "./assets/projects/carla_collision_avoidance/2.mp4";
import carla3 from "./assets/projects/carla_collision_avoidance/3.mp4";



// Media item format: { type: "image" | "video", src: string }
function MediaPreview({ items, intervalMs = 3500, onOpen, videoPreviewSeconds = 7, videoMode = "fixed" }) {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    if (!items?.length) return;
  
    const current = items[idx];
  
    // 🖼 images keep rotating on timer
    if (current?.type === "image") {
      const id = setTimeout(() => setIdx((p) => (p + 1) % items.length), intervalMs);
      return () => clearTimeout(id);
    }
  
    // 🎥 video behavior
    if (current?.type === "video") {
      // If mode is "full", advance onEnded (no timer here)
      if (videoMode === "full") return;
  
      // Otherwise fixed preview duration (your old behavior)
      const id = setTimeout(
        () => setIdx((p) => (p + 1) % items.length),
        (videoPreviewSeconds ?? 7) * 1000
      );
      return () => clearTimeout(id);
    }
  }, [items, idx, intervalMs, videoPreviewSeconds, videoMode]);
  
  

  if (!items?.length) return null;

  const item = items[idx];

  return (
    <button
      type="button"
      // ✅ Always open lightbox at FIRST media item
      onClick={() => onOpen?.(0)}
      className="relative w-full aspect-[16/9] rounded-xl overflow-hidden border border-white/10 bg-white/5 text-left group"
      aria-label="Open project gallery"
    >
      <AnimatePresence mode="wait">
        {item.type === "image" ? (
          <motion.img
            key={item.src}
            src={item.src}
            alt="Project visual"
            className="absolute inset-0 w-full h-full object-cover"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45, ease: "easeInOut" }}
            draggable={false}
          />
        ) : (
          <motion.video
            key={item.src}
            src={item.src}
            className="absolute inset-0 w-full h-full object-cover"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45, ease: "easeInOut" }}
            muted
            autoPlay
            playsInline
            // loop only when using fixed-time previews
            loop={videoMode !== "full"}
            // advance on end only for "full" mode
            onEnded={
              videoMode === "full"
                ? () => setIdx((p) => (p + 1) % items.length)
                : undefined
            }
          />

        )}
      </AnimatePresence>

      {/* subtle overlay */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />

      {/* hint */}
      <div className="pointer-events-none absolute bottom-3 left-3 flex items-center gap-2">
        <span className="text-xs px-2 py-1 rounded-full bg-black/40 border border-white/10 text-white/90">
          Click to expand
        </span>
      </div>

      {/* hover ring */}
      <div className="pointer-events-none absolute inset-0 ring-1 ring-transparent group-hover:ring-white/20 transition" />
    </button>
  );
}

function Lightbox({ open, items, startIndex = 0, title, onClose }) {
  const [idx, setIdx] = useState(startIndex);

  useEffect(() => {
    if (open) setIdx(startIndex);
  }, [open, startIndex]);

  const hasItems = !!items?.length;

  const prev = () => {
    if (!hasItems) return;
    setIdx((p) => (p - 1 + items.length) % items.length);
  };
  const next = () => {
    if (!hasItems) return;
    setIdx((p) => (p + 1) % items.length);
  };

  const videoRef = useRef(null);

  const forceMuted = () => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = true;
    v.volume = 0;
  };


  // Esc + arrow keys
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e) => {
      if (e.key === "Escape") onClose?.();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, items]);

  // lock scroll while open
  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [open]);

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-[999] flex items-center justify-center px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          aria-modal="true"
          role="dialog"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) onClose?.();
          }}
        >
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

          <motion.div
            className="relative z-10 w-full max-w-5xl rounded-2xl border border-white/10 bg-[#0b1220] shadow-2xl overflow-hidden"
            initial={{ scale: 0.98, y: 10, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.98, y: 10, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            <div className="flex items-center justify-between px-4 sm:px-6 py-3 border-b border-white/10">
              <div className="min-w-0">
                <p className="text-sm text-white/90 font-medium truncate">{title}</p>
                <p className="text-xs text-white/50">
                  {hasItems ? `${idx + 1} / ${items.length}` : ""}
                </p>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="text-white/70 hover:text-white px-3 py-1 rounded-lg border border-white/10 hover:border-white/20 transition"
              >
                Close
              </button>
            </div>

            <div className="relative bg-black">
              {hasItems ? (
                <div className="relative w-full aspect-[16/9] sm:aspect-[21/9]">
                  <AnimatePresence mode="wait">
                    {items[idx].type === "image" ? (
                      <motion.img
                        key={items[idx].src}
                        src={items[idx].src}
                        alt="Project visual enlarged"
                        className="absolute inset-0 w-full h-full object-contain bg-black"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        draggable={false}
                      />
                    ) : (
                      <motion.video
                      ref={videoRef}
                      key={items[idx].src}
                      src={items[idx].src}
                      className="absolute inset-0 w-full h-full object-contain bg-black"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                      controls
                      autoPlay
                      playsInline
                      muted
                      // If user tries to unmute / change volume, instantly force it back
                      onVolumeChange={forceMuted}
                      onPlay={forceMuted}
                      onLoadedMetadata={forceMuted}
                    />
                    )}
                  </AnimatePresence>
                </div>
              ) : null}

              {hasItems && items.length > 1 ? (
                <>
                  <button
                    type="button"
                    onClick={prev}
                    className="absolute left-3 top-1/2 -translate-y-1/2 px-3 py-2 rounded-xl bg-black/40 border border-white/10 text-white/90 hover:bg-black/55 hover:border-white/20 transition"
                    aria-label="Previous"
                  >
                    Prev
                  </button>
                  <button
                    type="button"
                    onClick={next}
                    className="absolute right-3 top-1/2 -translate-y-1/2 px-3 py-2 rounded-xl bg-black/40 border border-white/10 text-white/90 hover:bg-black/55 hover:border-white/20 transition"
                    aria-label="Next"
                  >
                    Next
                  </button>
                </>
              ) : null}
            </div>

            <div className="px-4 sm:px-6 py-3 border-t border-white/10 text-xs text-white/50">
              Tip: Use <span className="text-white/70">←</span>/<span className="text-white/70">→</span> to navigate,{" "}
              <span className="text-white/70">Esc</span> to close.
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}


const projects = [
  {
    title: "Sensor Fusion–Based Vehicle Localization System",
    desc: "A unified vehicle localization system built by combining multiple sensor-fusion explorations—ranging from raw IMU dead-reckoning and GPS-only tracking to EKF-based GPS-IMU fusion—focused on maintaining stable pose estimates under noise, bias, and GPS dropouts. The work evolved through extensive analysis of IMU characteristics, bias drift, interpolation across mismatched sensor rates, and long-duration data collection, culminating in a robust EKF pipeline that adapts between GPS-available and GPS-denied conditions.",
    media: [
      { type: "image", src: loc1 },
      { type: "image", src: loc2 },
      { type: "image", src: loc3 },
      { type: "image", src: loc4 },
      { type: "image", src: loc5 },
    ],
  },
  {
    title: "Autonomous Mobile Robot for Disaster Management",
    desc: "An autonomous mobile robot designed to explore unknown environments and assist in disaster-response scenarios. The system performed frontier-based exploration while building consistent maps in real time using LiDAR-based SLAM within a ROS 2 framework. The robot integrated SLAM, navigation, and camera-based AprilTag detection for victim localization, transforming detections from the camera frame into the global map frame for live visualization in RViz. Extensive system tuning was carried out to improve mapping accuracy, localization stability, and safe navigation in cluttered environments.",
    media: [
      { type: "video", src: dm1 },
      { type: "video", src: dm2 },
      { type: "image", src: dmi1 },
      { type: "image", src: dmi2 },
      { type: "image", src: dmi3 },
    ],
  },
  {
    title: "AI-Powered Autonomous Shopping Cart",
    desc: "A self-service autonomous shopping cart concept that navigates a grocery store, reaches target items, and avoids obstacles—built in a custom Gym-based supermarket environment. I designed the grid-world simulator, shaped the reward function to discourage loops/inefficiency, and implemented A* as a shortest-path baseline to compare against learning-based navigation. I trained and evaluated PPO and DQN agents for item-reaching behavior, analyzing learning stability via loss/reward trends and tuning hyperparameters for reliable convergence. The final system demonstrates end-to-end autonomy from goal selection to navigation, and highlights the tradeoffs between classical planning and RL in structured retail layouts.",
    media: [
      { type: "video", src: sc1 },
    ],
  },
  {
    title: "Dynamic Object Removal for Visual SLAM",
    desc: "Developed a dynamic object removal pipeline to improve visual SLAM and 3D scene reconstruction from real-world video sequences containing moving people and vehicles. The system detects and filters dynamic regions to produce cleaner inputs for downstream reconstruction. The pipeline combines segmentation and optical flow with camera motion estimation using SIFT, RANSAC, and bundle adjustment to separate object motion from camera motion. Cleaned video sequences were evaluated using NeRF and Gaussian Splatting, demonstrating significantly improved reconstruction quality and robustness, particularly with Gaussian Splatting in the presence of residual noise.",
    media: [
      { type: "video", src: raft1 },
      { type: "video", src: raft2 },
    ],
    previewVideoMode: "full",
  },
  
  {
    title: "Quadruped Robot",
    desc: "Led a 3-member team to design and build an autonomous quadrupedal robot using Python and ROS on Jetson Nano and Raspberry Pi. Implemented creep and trot gait controllers along with 3-DOF leg kinematics for locomotion and odometry, and validated the system in V-REP and Gazebo before replicating it on hardware. The hardware stack included Dynamixel servo motors driven via a servo motor controller, enabling precise joint control under load. Comparative experiments between open-loop and closed-loop odometry showed a ~50% improvement in locomotion accuracy when deployed on the physical robot.",
    media: [
      { type: "video", src: quad1 },
    ],
  },
  {
    title: "Structure from Motion (3D Reconstruction from scratch)",
    desc: "Implemented a full Structure-from-Motion pipeline from scratch to reconstruct 3D scenes from monocular image sequences. The system uses SIFT feature detection with FLANN matching, followed by RANSAC-based epipolar geometry to estimate the fundamental and essential matrices for relative pose recovery. 3D landmarks are initialized via triangulation with cheirality checks, and camera poses are incrementally chained as new frames are added. The reconstruction is refined using factor-graph–based bundle adjustment in GTSAM, optimized with Levenberg–Marquardt to jointly refine camera poses and 3D structure.",
    media: [
      { type: "image", src: sfm1 },
      { type: "image", src: sfm2 },
    ],
  },
  {
    title: "Warehouse Robot Automation with Reinforcement Learning",
    desc: "Developed a reinforcement-learning–based navigation system for a mobile robot in a simulated warehouse environment, where the robot collects items from designated locations and delivers them to goal zones while minimizing travel time and distance. Implemented a custom OpenAI Gym environment modeling obstacles, pickup points, and goals. Classical planners (BFS, A) were used as baselines and compared against RL approaches including Monte Carlo, Q-Learning, and Deep Q-Learning, with evaluation based on path efficiency, convergence behavior, and policy stability to analyze tradeoffs between planning and learning-based navigation.",
    media: [   
      { type: "video", src: whVideo }, 
      { type: "image", src: whImg },
    ],
  },
  
  {
    title: "Autonomous Maze Solving and Self Balancing Robot",
    desc: "Co-designed an autonomous, self-balancing two-wheeled robot capable of solving maze environments. The robot maintains dynamic balance using a PID controller while simultaneously performing navigation using A* path planning algorithm. The system integrated an ESP32, MPU-6050 with IR and ultrasonic sensors for real-time obstacle detection and state feedback.",
    media: [
      { type: "image", src: sb1 },
    ],
  },

  {
    title: "Three-Link Bipedal Robot Gait Design",
    desc: "Modeled and designed walking gaits for a three-link planar bipedal robot using full kinematic and dynamic analysis. The system dynamics were derived using the Lagrange method, explicitly formulating the inertia (D), Coriolis (C), and gravity (G) matrices to capture the robot’s motion during stance and swing phases. Zero dynamics were derived by partitioning the full dynamics, enabling gait optimization for energetically efficient and stable walking. A nonlinear feedback controller was designed to enforce the desired gait, and phase-portrait analysis was used to study stability and closed-loop behavior across walking cycles.",
    media: [
      { type: "video", src: biped1 },
    ],
  },

  {
    title: "Autonomous Navigation + Collision Avoidance in CARLA with ROS 2",
    desc: "Built an end-to-end autonomous driving pipeline in the CARLA simulator using ROS 2. The vehicle follows waypoint-based routes while continuously monitoring frontal collision risk using RGB, depth, and semantic segmentation sensors. Implemented a vision-based collision monitoring module that detects vehicles/pedestrians in a dynamically scaled danger zone (based on speed) and overrides control with automatic emergency braking (AEB) when stopping distance indicates an imminent collision. Validated the behavior by introducing dynamic obstacles and manually controlled vehicles to test safe slowdown and full-stop responses.",
    media: [
      { type: "video", src: carla1 },
      { type: "video", src: carla2 },
      { type: "video", src: carla3 },
    ],
    previewVideoMode: "full",
  },

];

export default function Projects() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxItems, setLightboxItems] = useState([]);
  const [lightboxTitle, setLightboxTitle] = useState("");
  const [lightboxStartIndex, setLightboxStartIndex] = useState(0);

  const openLightbox = (project, startIdx = 0) => {
    setLightboxItems(project.media ?? []);
    setLightboxTitle(project.title ?? "");
    setLightboxStartIndex(startIdx);
    setLightboxOpen(true);
  };
  

  const delays = useMemo(() => projects.map((_, i) => i * 0.04), []);

  return (
    <section
      id="projects"
      className="relative w-full py-20 px-6 text-white"
      style={{ backgroundColor: "rgb(23, 27, 35)" }}
    >
      {/* SECTION HEADER */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <h2 className="text-5xl md:text-6xl font-extrabold tracking-tight">
          <span className="bg-gradient-to-r from-white via-sky-200 to-teal-200 bg-clip-text text-transparent">
            Projects
          </span>
        </h2>
        <p className="mt-4 text-gray-200/90 max-w-3xl mx-auto">
          Robotics, perception, and systems projects I’ve built across academia and industry.
        </p>
      </motion.div>

      {/* PROJECT GRID */}
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project, i) => (
          <motion.div
            key={project.title}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.7, delay: delays[i] }}
            className="bg-white/10 border border-white/10 rounded-2xl shadow-xl p-6 hover:translate-y-[-6px] hover:bg-white/15 transition-all duration-300 flex flex-col gap-4"
          >
            {/* Title */}
            <h4 className="text-xl font-semibold text-teal-200">
              {project.title}
            </h4>

            {/* Slideshow BELOW title */}
            {project.media?.length ? (
              <MediaPreview
                items={project.media}
                onOpen={() => openLightbox(project, 0)}
                intervalMs={2500}
                videoPreviewSeconds={7}
                videoMode={project.previewVideoMode === "full" ? "full" : "fixed"}
              />
            ) : null}



            {/* Description */}
            <p className="text-gray-200 leading-relaxed">{project.desc}</p>
          </motion.div>
        ))}
      </div>

      {/* Lightbox */}
      <Lightbox
        open={lightboxOpen}
        items={lightboxItems}
        startIndex={lightboxStartIndex}
        title={lightboxTitle}
        onClose={() => setLightboxOpen(false)}
      />
    </section>
  );
}
