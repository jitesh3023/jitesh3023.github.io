import { motion } from "framer-motion";
import droneVideo from "./assets/projects/Drone/1.mp4";

const experiences = [
  {
    role: "Robotics Software Engineer",
    company: "forREAL, Inc.",
    duration: "Apr 2025 - Dec 2025",
    location: "Danvers, MA",
    badge: "2 Patents",
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

export default function Experience() {
  return (
    <section
      id="experience"
      className="relative w-full py-20 px-6 text-white"
      style={{ backgroundColor: "rgb(23, 27, 35)" }}
    >
      {/* Local-only CSS to hide mute/volume controls (Chrome/Edge) */}
      <style>{`
        .uav-video::-webkit-media-controls-mute-button,
        .uav-video::-webkit-media-controls-volume-slider,
        .uav-video::-webkit-media-controls-volume-control-container,
        .uav-video::-webkit-media-controls-volume-control-container.closed,
        .uav-video::-webkit-media-controls-volume-control-container.open {
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
              {exp.video ? (
                // WITH VIDEO: text left, video right
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                  {/* LEFT: Description */}
                  <ul className="list-disc pl-5 space-y-2 text-gray-200 leading-relaxed">
                    {exp.highlights.map((pt) => (
                      <li key={pt}>{pt}</li>
                    ))}
                  </ul>

                  {/* RIGHT: Video (scrubbable, forced-muted, hide volume UI) */}
                  <div className="rounded-xl overflow-hidden border border-white/10 bg-black">
                    <video
                      src={exp.video.src}
                      controls
                      muted
                      playsInline
                      preload="metadata"
                      className="uav-video w-full h-[260px] md:h-[320px] object-cover"
                      onVolumeChange={(e) => {
                        e.currentTarget.muted = true;
                        e.currentTarget.volume = 0;
                      }}
                      onPlay={(e) => {
                        e.currentTarget.muted = true;
                        e.currentTarget.volume = 0;
                      }}
                    />
                    {exp.video.caption && (
                      <div className="text-xs text-gray-300 px-3 py-2 bg-black/60">
                        {exp.video.caption}
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                // NO VIDEO: full-width text
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
    </section>
  );
}
