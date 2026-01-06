import { motion } from "framer-motion";

const skills = [
  {
    title: "Languages",
    items: ["C++", "Python", "C", "XML", "URDF", "Swift"],
  },
  {
    title: "Developer Tools",
    items: [
      "ROS",
      "ROS 2",
      "RViz",
      "Docker",
      "Isaac Sim",
      "Gazebo",
      "V-REP / CoppeliaSim",
      "MATLAB",
      "Simulink",
      "Git",
    ],
  },
  {
    title: "Algorithms",
    items: [
      "SLAM (V-SLAM, LiDAR SLAM, RGB-D SLAM)",
      "Sensor Fusion (EKF)",
      "Motion Planning",
      "Trajectory Optimization",
      "Reinforcement Learning Algorithms",
    ],
  },
  {
    title: "Hardware Skills",
    items: [
      "IMU",
      "GPS / RTK-GPS",
      "LiDAR",
      "RGB / RGB-D Cameras",
      "Jetson Nano",
      "Jetson Orin Nano",
      "Raspberry Pi",
      "Arduino",
      "ESP32",
    ],
  },
];

// Card anim: reveal + stagger children
const containerVariants = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: "easeOut",
      staggerChildren: 0.045,
      delayChildren: 0.12,
    },
  },
};

// Pill anim: pop in
const pillVariants = {
  hidden: { opacity: 0, y: 10, scale: 0.97 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.35, ease: "easeOut" },
  },
};

function SkillPill({ label }) {
  return (
    <div className="px-4 py-2 rounded-2xl bg-white/10 border border-white/10 backdrop-blur-md text-gray-100 hover:bg-white/15 hover:scale-[1.02] transition-all">
      <span className="text-sm md:text-base">{label}</span>
    </div>
  );
}

function SkillCategory({ title, items, delay = 0 }) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.25 }}
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 260, damping: 22, delay }}
      className="relative rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md shadow-2xl p-6 md:p-8 overflow-hidden"
    >
      {/* subtle scanner sweep (once on view) */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-60"
        initial={{ x: "-120%" }}
        whileInView={{ x: "120%" }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 1.15, ease: "easeInOut", delay: 0.15 + delay }}
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(125, 211, 252, 0.10), transparent)",
        }}
      />

      <h3 className="relative z-10 text-xl md:text-2xl font-bold bg-gradient-to-r from-sky-200 to-teal-200 bg-clip-text text-transparent">
        {title}
      </h3>

      <div className="relative z-10 mt-5 flex flex-wrap gap-3">
        {items.map((label) => (
          <motion.div key={label} variants={pillVariants}>
            <SkillPill label={label} />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

export default function Skills() {
  return (
    <section
      id="skills"
      className="relative w-full min-h-screen overflow-hidden text-white"
      style={{ backgroundColor: "rgb(23, 27, 35)" }}
    >
      <div className="relative z-10 mx-auto max-w-6xl px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <h2 className="text-5xl md:text-6xl font-extrabold tracking-tight">
            <span className="bg-gradient-to-r from-white via-sky-200 to-teal-200 bg-clip-text text-transparent">
              Technical Skills
            </span>
          </h2>
          <p className="mt-4 text-gray-200/90 max-w-3xl mx-auto">
          A concise overview of the languages, tools, algorithms, and hardware I’ve gained hands-on experience with while building robotic systems.          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {skills.map((cat, idx) => (
            <SkillCategory
              key={cat.title}
              title={cat.title}
              items={cat.items}
              delay={0.05 * idx}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
