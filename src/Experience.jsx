import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";

// forREAL
import forrealVid1 from "./assets/projects/3d/1.webm"
import forrealVid2 from "./assets/projects/3d/2.webm"
import forrealVid3 from "./assets/projects/3d/3.mp4"
import forrealImg1 from "./assets/projects/3d/1.png"
import forrealImg2 from "./assets/projects/3d/2.png"
import forrealImg3 from "./assets/projects/3d/3.png"
import forrealVid4 from "./assets/projects/3d/4.mp4"
import forrealImg4 from "./assets/projects/3d/4.png"

// Drone
import droneVideo from "./assets/projects/Drone/1.mp4";

const experiences = [
  {
    role: "Robotics Software Engineer",
    company: "forREAL, Inc.",
    duration: "Apr 2025 - Dec 2025",
    location: "Danvers, MA",
    badge: "2 Patents",
    media: [
      { type: "video", src: forrealVid1, caption: "Sparse point cloud generation using Structure from motion" },
      { type: "video", src: forrealVid2, caption: "3D reconstruction demo" },
      { type: "video", src: forrealVid3, caption: "Graph Slam in action" },
      { type: "image", src: forrealImg1, caption: "SLAM 3d occupancy grid visualization in RViz" },
      { type: "image", src: forrealImg2, caption: "3d object Segmentation components" },
      { type: "image", src: forrealImg3, caption: "Spatial anchor after 3d segmentation" },
      { type: "video", src: forrealVid4, caption: "RRT* path planning demo" },
      { type: "image", src: forrealImg4, caption: "RRT* 2d occupancy grid" },
      
    ],
    highlights: [
      "Built an unified 3D reconstruction pipeline centered around a graph-based multi-sensor SLAM system that provides consistent, globally optimized state estimation and online mesh reconstruction from a guided mobile scan. The SLAM backbone fuses RGB cameras (1× and 0.5×), LiDAR, and IMU data, while Gaussian Splatting is generated in parallel for photorealistic virtual tours, and RoomPlan consumes the same spatial state to extract structured 3D layouts and 2D floor plans.",
      
      "Added a spatial anchoring layer to do 3d Semantic segmentation. Instead of relying on ARKit depth, 2D detections are lifted into 3D using multi-view segmentation, masking, and sparse point cloud back-projection across frames, making object localization more stable under real-world lighting and geometry variations.",
      
      "Used the continuous 3D reconstruction for motion planning and viewpoint generation. Implemented graph- and sampling-based planners (RRT*) that reason directly over reconstructed geometry to produce smooth, collision-free trajectories for autonomous camera motion, guided walkthroughs, and spatial navigation.",
      
      "Built LLM and VLM-powered agents on top of the 3D scene to reason about layout, objects, and viewpoints for task automation and content generation. The models were optimized with quantization and efficient inference pipelines, enabling unit-level understanding and presentation that goes beyond what static image–based platforms like Zillow or Apartments.com provide.",
    ],
  },  

  {
    role: "Graduate Robotics Researcher (UAV)",
    company: "Field Robotics Lab — Institute for Experimental Robotics",
    duration: "Jan 2025 - Apr 2025",
    location: "Boston, MA",
    video: {
      src: droneVideo,
    },
    highlights: [
      "Designed and developed a UAV for high-speed autonomous flight (targeting up to ~75 mph), focusing on real-time obstacle avoidance, dynamic trajectory planning, and robust closed-loop control.",
      "Assembled the platform end-to-end, integrating an ARKv6X flight controller, ESCs, ArkFlow, GPS, telemetry radio, Nomad transmitter–receiver, power distribution board, secondary Wi-Fi radio, and a Jetson Orin Nano (Boson-22 carrier).",
      "Validated perception, planning, and control pipelines in Isaac Sim prior to real-world flight testing, enabling safe sim-to-real transfer of autonomy behaviors.",
      "Implemented Manual, Position Hold, Altitude Hold, and early autonomous flight modes with ~100 m object detection and real-time trajectory replanning using a ROS 2–based onboard stack.",
    ],
  },

  {
    role: "Robotics Software & Controls Co-op (Research and Innovation)",
    company: "Noah Medical",
    duration: "Jan 2024 - Aug 2024",
    location: "Pleasanton, CA",
    badge: "1 Patent",
    highlights: [
      "Worked across multiple perception, sensing, and tooling projects for robotic bronchoscopy systems, spanning IMU-based shape session, Computer vision, Controls, Augmented Reality, and manufacturing software used directly on the production and inspection line.",
    
      "Developed a sequential orientation–based shape sensing system for a flexible bronchoscope using distributed IMUs. Reconstructed the 3D shape of the scope in real time and visualized it using cubic B-spline curve fitting, focusing on stability and smoothness under motion. As part of the same effort, designed custom PCBs in ExpressPCB to support sensor integration and signal routing.",
    
      "Built a real-time camera orientation correction pipeline that keeps gravity aligned downward in the image frame. Used roll angle data streamed over a DDS topic to continuously compensate camera orientation, improving operator usability and downstream vision reliability.",
    
      "Implemented multiple approaches for bronchoscope tip pose estimation using camera data. Combined classical color-based segmentation and spline fitting with YOLOv5-based detection to estimate tip position and orientation. Applied Computer Vision preprocessing steps such as skeletonization, erosion, and dilation, followed by connectivity analysis and RMS error filtering to reject unstable detections.",
    
      "Proposed and iterated on a compact, user-friendly borescope design, focusing on mechanical layout, component integration, and operator ergonomics. Emphasized design decisions that simplified assembly and improved usability in clinical and testing environments.",
    
      "Developed a GUI-based software tool to automate Optical Quality Control (OQC) testing on the manufacturing line. The application guided operators through inspection steps, logged results, and integrated automated QR code generation and decoding using a camera to streamline traceability and reduce manual errors.",
    
      "Designed and built a custom OptiTrack-based motion tracking setup, including a calibration wand, to analyze tracking accuracy. Created a GUI application to compare OptiTrack measurements against commanded positions, with an OpenCV video view to visualize the scope tip’s real-world motion and quantify system error.",
    
      "Worked on augmented reality tooling that allowed operators to place virtual markers in a fixed world frame and visualize them in the live camera feed. Implemented 3D-to-2D projection for marker rendering, and added directional cues when markers moved outside the camera’s field of view to guide camera motion intuitively."
    ]
  },

  {
    role: "Electrical Engineer Intern",
    company: "B.G. Shirke Construction Technology Pvt. Ltd.",
    duration: "May 2021 - Aug 2021",
    location: "Mumbai, Maharashtra, India",
    highlights: [
      "Designed a power distribution network for a mass housing society (Plot 1 & Plot 2, Sec-36, Taloja, Navi Mumbai) in compliance with MSEDCL/MERC guidelines and Development Control (DC) rules.",
      "Performed end-to-end load estimation from layout plans (BUA → carpet area, connected load norms, diversity factor) and computed demand in kW/kVA using power-factor and 85% loading assumptions.",
      "Sized 11 kV / 630 kVA transformer capacity (Plot 1: 8 units, Plot 2: 7 units) and selected LV cable sizes by validating ampacity (with derating), short-circuit withstand, and voltage-drop constraints using manufacturer catalogue parameters.",
    ],
  },

  {
    role: "Programming and Circuit Designing Intern",
    company: "Control and Decision Research Centre",
    duration: "May 2021 - Jul 2021",
    location: "Mumbai, Maharashtra, India",
    highlights: [
      "Simulated an electric vehicle charging station using Typhoon HIL 602+ and MATLAB/Simulink for control and system validation workflows.",
      "Built supporting circuit and system models using Proteus to validate behavior prior to implementation.",
    ],
  },
];

function SectionTitle({ title, subtitle }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7 }}
      className="text-center mb-12"
    >
      <h2 className="text-5xl md:text-6xl font-extrabold tracking-tight">
        <span className="bg-gradient-to-r from-white via-sky-200 to-teal-200 bg-clip-text text-transparent">
          {title}
        </span>
      </h2>
      {subtitle && (
        <p className="mt-4 text-gray-200/90 max-w-3xl mx-auto">{subtitle}</p>
      )}
    </motion.div>
  );
}

function Card({ children, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.7, delay }}
      className="bg-white/10 border border-white/10 rounded-2xl shadow-xl p-6 hover:bg-white/15 transition-colors"
    >
      {children}
    </motion.div>
  );
}

function VideoModal({ open, onClose, src, title }) {
  const videoRef = useRef(null);

  // Close on ESC
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  // When modal opens, play + allow interaction
  useEffect(() => {
    if (!open) return;
    const v = videoRef.current;
    if (!v) return;
  
    v.muted = true;
    v.volume = 0;
  
    const p = v.play();
    if (p && typeof p.catch === "function") p.catch(() => {});
  }, [open]);
  

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          aria-modal="true"
          role="dialog"
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal panel */}
          <motion.div
            className="relative w-full max-w-5xl rounded-2xl overflow-hidden border border-white/10 bg-black shadow-2xl"
            initial={{ scale: 0.96, y: 12, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.98, y: 8, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-black/60 border-b border-white/10">
              <div className="text-sm text-gray-200 truncate">
                {title || "Video"}
              </div>
              <button
                onClick={onClose}
                className="text-gray-200/90 hover:text-white text-sm px-3 py-1 rounded-lg bg-white/10 border border-white/10"
              >
                Close
              </button>
            </div>

            {/* Video */}
            <div className="bg-black">
            <video
              ref={videoRef}
              src={src}
              controls
              muted
              playsInline
              preload="metadata"
              className="w-full h-[55vh] md:h-[70vh] object-contain bg-black"
              onVolumeChange={(e) => {
                e.currentTarget.muted = true;
                e.currentTarget.volume = 0;
              }}
              onPlay={(e) => {
                e.currentTarget.muted = true;
                e.currentTarget.volume = 0;
              }}
            />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function ImageModal({ open, onClose, src, title }) {
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          aria-modal="true"
          role="dialog"
        >
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={onClose}
          />

          <motion.div
            className="relative w-full max-w-5xl rounded-2xl overflow-hidden border border-white/10 bg-black shadow-2xl"
            initial={{ scale: 0.96, y: 12, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.98, y: 8, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex items-center justify-between px-4 py-3 bg-black/60 border-b border-white/10">
              <div className="text-sm text-gray-200 truncate">
                {title || "Image"}
              </div>
              <button
                onClick={onClose}
                className="text-gray-200/90 hover:text-white text-sm px-3 py-1 rounded-lg bg-white/10 border border-white/10"
              >
                Close
              </button>
            </div>

            <div className="bg-black">
              <img
                src={src}
                alt={title || "Expanded image"}
                className="w-full h-[55vh] md:h-[70vh] object-contain bg-black"
                draggable={false}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}



export default function Experience() {
  const [activeVideo, setActiveVideo] = useState(null);
  const [activeImage, setActiveImage] = useState(null);


  return (
    <section
      id="experience"
      className="relative w-full py-20 px-6 text-white"
      style={{ backgroundColor: "rgb(23, 27, 35)" }}
    >
      {/* If you still want your "hide volume controls" CSS for the preview only, keep it.
          But we will NOT hide volume controls in the modal (so it’s fully interactive). */}
      <style>{`
        .uav-preview::-webkit-media-controls {
          display: none !important;
        }
      `}</style>

      <div className="max-w-6xl mx-auto">
        <SectionTitle
          title="Experience"
          subtitle="Roles where I built and shipped robotics systems across perception, SLAM, planning, and real-world deployment."
        />

        <div className="flex flex-col gap-8">
          {experiences.map((exp, idx) => (
            <Card key={idx} delay={idx * 0.08}>
              {/* Header */}
              <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2 mb-4">
                <div>
                  <div className="flex items-center gap-3 flex-wrap">
                    <h3 className="text-xl md:text-2xl font-semibold text-teal-200">
                      {exp.role}
                    </h3>
                    {exp.badge && (
                      <span className="text-xs md:text-sm px-3 py-1 rounded-full bg-white/10 border border-white/10 text-gray-100">
                        {exp.badge}
                      </span>
                    )}
                  </div>
                  <div className="text-gray-300 mt-1">{exp.company}</div>
                  <div className="text-gray-400">{exp.location}</div>
                </div>

                <span className="text-gray-300 md:text-right">
                  {exp.duration}
                </span>
              </div>

              {/* ✅ CONDITIONAL LAYOUT */}
              {exp.media ? (
                // ✅ forREAL: MEDIA GALLERY
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                  {/* LEFT: Description */}
                  <ul className="list-disc pl-5 space-y-2 text-gray-200 leading-relaxed">
                    {exp.highlights.map((pt) => (
                      <li key={pt}>{pt}</li>
                    ))}
                  </ul>

                  {/* RIGHT: Media grid */}
                  <div className="grid grid-cols-2 gap-3">
                    {exp.media.map((m, i) => (
                      <button
                        key={`${m.type}-${i}`}
                        type="button"
                        className="group relative rounded-xl overflow-hidden border border-white/10 bg-black text-left"
                        onClick={() => {
                          if (m.type === "video") {
                            setActiveVideo({
                              src: m.src,
                              title: m.caption || `${exp.role} — ${exp.company}`,
                            });
                          } else {
                            setActiveImage({
                              src: m.src,
                              title: m.caption || `${exp.role} — ${exp.company}`,
                            });
                          }
                        }}
                        aria-label="Open media"
                      >
                        {m.type === "video" ? (
                          <video
                            src={m.src}
                            autoPlay
                            loop
                            muted
                            playsInline
                            preload="metadata"
                            className="w-full h-[140px] md:h-[160px] object-cover"
                            onVolumeChange={(e) => {
                              e.currentTarget.muted = true;
                              e.currentTarget.volume = 0;
                            }}
                            onPlay={(e) => {
                              e.currentTarget.muted = true;
                              e.currentTarget.volume = 0;
                            }}
                          />
                        ) : (
                          <img
                            src={m.src}
                            alt={m.caption || "Media"}
                            className="w-full h-[140px] md:h-[160px] object-cover"
                            draggable={false}
                          />
                        )}

                        <div className="absolute inset-0 bg-black/10 group-hover:bg-black/35 transition-colors" />
                        <div className="absolute bottom-2 left-2">
                          <span className="text-[11px] px-2 py-1 rounded-full bg-black/60 border border-white/10 text-gray-100">
                            Click to expand
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              ) : exp.video ? (
                // ✅ UAV: SINGLE VIDEO (your existing code)
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                  <ul className="list-disc pl-5 space-y-2 text-gray-200 leading-relaxed">
                    {exp.highlights.map((pt) => (
                      <li key={pt}>{pt}</li>
                    ))}
                  </ul>

                  <button
                    type="button"
                    className="group relative rounded-xl overflow-hidden border border-white/10 bg-black text-left"
                    onClick={() =>
                      setActiveVideo({
                        src: exp.video.src,
                        title: `${exp.role} — ${exp.company}`,
                      })
                    }
                    aria-label="Open video"
                  >
                    <video
                      src={exp.video.src}
                      autoPlay
                      loop
                      muted
                      playsInline
                      preload="metadata"
                      className="uav-preview w-full h-[260px] md:h-[320px] object-cover"
                    />

                    <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition-colors" />
                    <div className="absolute bottom-3 left-3 flex items-center gap-2">
                      <span className="text-xs px-2 py-1 rounded-full bg-black/60 border border-white/10 text-gray-100">
                        Click to expand
                      </span>
                    </div>

                    {exp.video.caption && (
                      <div className="text-xs text-gray-300 px-3 py-2 bg-black/60 border-t border-white/10">
                        {exp.video.caption}
                      </div>
                    )}
                  </button>
                </div>
              ) : (
                // ✅ TEXT ONLY
                <ul className="list-disc pl-5 space-y-2 text-gray-200 leading-relaxed">
                  {exp.highlights.map((pt) => (
                    <li key={pt}>{pt}</li>
                  ))}
                </ul>
              )}
            </Card>
          ))}
        </div>
      </div>

      {/* Modal */}
      <VideoModal
        open={!!activeVideo}
        onClose={() => setActiveVideo(null)}
        src={activeVideo?.src}
        title={activeVideo?.title}
      />

      <ImageModal
        open={!!activeImage}
        onClose={() => setActiveImage(null)}
        src={activeImage?.src}
        title={activeImage?.title}
      />

    </section>
  );
}