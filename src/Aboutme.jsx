import { motion } from "framer-motion";
import { GraduationCap, BookOpen, Github, Linkedin } from "lucide-react";

export default function AboutMe({
  name = "Jitesh Sonkusare",
  title = "Robotics Software Engineer",
  githubUrl = "https://github.com/jitesh3023",
  githubUsername = "jitesh3023",
  linkedinUrl = "https://www.linkedin.com/in/jitesh-sonkusare-11b118198/", 
  theme = "tokyonight",
}) {
  return (
    <section
      id="about"
      className="relative w-full min-h-screen overflow-hidden text-white"
      // style={{ backgroundColor: "rgb(30, 40, 60)" }}
      style={{ backgroundColor: "rgb(23, 27, 35)" }}
      
    >
      <div className="relative z-10 flex min-h-screen items-center justify-center px-6 py-20">
        <div className="max-w-6xl w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl md:text-6xl font-extrabold tracking-tight">
              <span className="bg-gradient-to-r from-white via-sky-200 to-teal-200 bg-clip-text text-transparent">
                About Me
              </span>
            </h2>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* LEFT COLUMN */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              {/* INTRO */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="backdrop-blur-sm bg-white/5 rounded-3xl p-8 border border-white/10 shadow-2xl"
              >
                <p className="text-lg leading-relaxed text-gray-200">
                  Hi, I’m{" "}
                  <span className="font-semibold bg-gradient-to-r from-sky-200 to-teal-200 bg-clip-text text-transparent">
                    {name}
                  </span>{" "}
                  — a <span className="text-sky-300">{title}</span> working on{" "}
                  <span className="text-white font-medium">
                    autonomous robotic systems, SLAM, and motion planning
                  </span>
                  . I design and deploy end-to-end robotics software that enables robots to{" "}
                  <span className="text-white font-medium">
                    perceive, localize, map, and navigate
                  </span>{" "}
                  complex real-world environments.
                  <br />
                  <br />
                  I’ve built autonomy stacks across{" "}
                  <span className="text-white font-medium">
                    wheeled mobile robots, legged robots, UAVs, and surgical robots
                  </span>
                  , fusing{" "}
                  <span className="text-white font-medium">
                    camera, LiDAR, IMU, and GPS
                  </span>{" "}
                  data into reliable mapping, state estimation, and navigation pipelines.
                  <br />
                  <br />
                  My experience spans{" "}
                  <span className="text-white font-medium">
                    simulation-to-real deployment
                  </span>{" "}
                  using Isaac Sim, Gazebo, V-REP, and RViz, and running real-time autonomy on{" "}
                  <span className="text-white font-medium">
                    Jetson-based platforms
                  </span>{" "}
                  with production-grade{" "}
                  <span className="text-white font-medium">C++ and Python</span>. I enjoy working at the{" "}
                  <span className="text-white font-medium">intersection of software and hardware</span>
                  — writing code and seeing it{" "}
                  <span className="text-white font-medium">
                    physically move robots in the real world
                  </span>
                  . I’m also a{" "}
                  <span className="text-white font-medium">
                    co-inventor on three robotics patents
                  </span>
                  .
                </p>



              </motion.div>

              {/* EDUCATION */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="backdrop-blur-sm bg-white/5 rounded-3xl p-8 border border-white/10 shadow-2xl hover:bg-white/10 transition-all duration-300"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-sky-400/20 rounded-xl">
                    <GraduationCap size={24} className="text-sky-300" />
                  </div>
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-sky-200 to-white bg-clip-text text-transparent">
                    Education
                  </h3>
                </div>
                <div className="space-y-6">
                  {/* GRADUATE */}
                    <div>
                      <p className="text-gray-200 text-lg leading-relaxed">
                        <span className="font-semibold text-white">
                          M.S. in Robotics
                        </span>
                        <br />
                        <span className="text-sky-200">
                          Northeastern University
                        </span>
                        <br />
                        <span className="text-gray-300 text-base">
                          Boston, MA • 2024 • (4.0 / 4.0)
                        </span>
                      </p>

                      {/* Graduate Coursework */}
                      <div className="mt-3 flex flex-wrap gap-2">
                        {[
                          "Autonomous Field Robotics",
                          "Mobile Robotics",
                          "Legged Robotics",
                          "Robot Sensing and Navigation",
                          "Robot Mechanics and Control",
                          "Advanced Computer Vision",
                          "Foundations Of Artificial Intelligence",
                          "Reinforcement Learning",
                        ].map((course) => (
                          <span
                            key={course}
                            className="px-3 py-1 text-sm rounded-full bg-sky-400/10 text-sky-200 border border-sky-400/20"
                          >
                            {course}
                          </span>
                        ))}
                      </div>
                    </div>


                  {/* UNDERGRADUATE */}
                    <div className="pt-4 border-t border-white/10">
                      <p className="text-gray-200 text-lg leading-relaxed">
                        <span className="font-semibold text-white">
                          B.Tech in Electrical Engineering
                        </span>
                        <br />
                        <span className="text-sky-200">
                          Veermata Jijabai Technological Institute
                        </span>
                        <br />
                        <span className="text-gray-300 text-base">
                          Mumbai, India • 2022 • (9.12 / 10.0)
                        </span>
                      </p>

                      {/* Undergraduate Coursework */}
                      <div className="mt-3 flex flex-wrap gap-2">
                        {[
                          "Computer Programming",
                          "Applied Linear Algebra",
                          "Industrial Automation-4.0",
                          "Microprocessor and Microcontroller",
                          "Control System",
                          "Electronic Devices and Circuits",
                          "Analog and Digital Circuits",
                          "Signals and Systems",
                          "Sensor and Transducers"                          
                        ].map((course) => (
                          <span
                            key={course}
                            className="px-3 py-1 text-sm rounded-full bg-teal-400/10 text-teal-200 border border-teal-400/20"
                          >
                            {course}
                          </span>
                        ))}
                      </div>
                    </div>


                  {/* HIGHLIGHTS
                  <div className="text-gray-200 text-base leading-relaxed">
                    <span className="text-white font-medium">Highlights:</span>{" "}
                    Robotics software, sensor fusion, perception, SLAM, real-time systems, and
                    hands-on hardware–software integration.
                  </div> */}
                </div>
              </motion.div>

              {/* FOCUS AREAS
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="backdrop-blur-sm bg-white/5 rounded-3xl p-8 border border-white/10 shadow-2xl hover:bg-white/10 transition-all duration-300"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-teal-400/20 rounded-xl">
                    <BookOpen size={24} className="text-teal-300" />
                  </div>
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-teal-200 to-white bg-clip-text text-transparent">
                    Focus Areas
                  </h3>
                </div>

                <div className="grid gap-3">
                  {[
                    "Perception: camera + LiDAR pipelines, 3D understanding",
                    "SLAM / Mapping: RTAB-Map, pose graphs, 3D reconstruction",
                    "Sensor Fusion: EKF (GPS/RTK-GPS/IMU), state estimation",
                    "Robotics Software: C++/Python, ROS/ROS2, real-time debugging",
                    "Planning & Navigation: geometry-aware trajectories in 3D scenes",
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-teal-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-200">{item}</span>
                    </div>
                  ))}
                </div>
              </motion.div> */}
            </motion.div>

            {/* RIGHT COLUMN */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-8"
            >
            
            {/* GITHUB OVERVIEW */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="backdrop-blur-sm bg-white/5 rounded-3xl p-6 border border-white/10 shadow-2xl hover:bg-white/10 transition-all duration-300 cursor-pointer"
              onClick={() => githubUrl && window.open(githubUrl, "_blank")}            >
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-purple-400/20 rounded-xl">
                  <Github size={24} className="text-purple-300" />
                </div>
                <h3 className="text-xl font-bold bg-gradient-to-r from-purple-200 to-white bg-clip-text text-transparent">
                  GitHub
                </h3>
              </div>

              <p className="text-gray-200 leading-relaxed mb-4">
                Open-source robotics software, perception pipelines, SLAM systems,
                and experimental autonomy projects in C++ and Python.
              </p>

              {/* <div className="rounded-2xl overflow-hidden border border-white/10 bg-black/20">
                <img
                  loading="lazy"
                  className="w-full"
                  alt={`GitHub stats for ${githubUsername}`}
                  src={`${statCardBase}?username=${githubUsername}&show_icons=true&include_all_commits=true&count_private=true&rank_icon=percentile&hide_border=true&theme=${theme}`}
                />
              </div> */}
              <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-gray-200">
                <span className="text-sm">Open GitHub profile</span>
              </div>
            </motion.div>


              {/* LINKEDIN CARD */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="backdrop-blur-sm bg-white/5 rounded-3xl p-6 border border-white/10 shadow-2xl hover:bg-white/10 transition-all duration-300 cursor-pointer"
                onClick={() => linkedinUrl && window.open(linkedinUrl, "_blank")}
              >
                <div className="flex items-center gap-4 mb-3">
                  <div className="p-3 bg-sky-400/20 rounded-xl">
                    <Linkedin size={24} className="text-sky-300" />
                  </div>
                  <h3 className="text-xl font-bold bg-gradient-to-r from-sky-200 to-white bg-clip-text text-transparent">
                    LinkedIn
                  </h3>
                </div>

                <p className="text-gray-200 leading-relaxed">
                  See my latest work in robotics software, perception, SLAM, and
                  3D reconstruction — projects, experience, and updates.
                </p>

                <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-gray-200">
                  <span className="text-sm">
                    {linkedinUrl ? "Open Linkedin profile" : "Add your LinkedIn URL"}
                  </span>
                </div>
              </motion.div>
              
              {/* ROBOTS EXPERIENCE */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="backdrop-blur-sm bg-white/5 rounded-3xl p-6 border border-white/10 shadow-2xl hover:bg-white/10 transition-all duration-300"
              >
                <h3 className="text-xl font-bold mb-4 bg-gradient-to-r from-sky-200 to-teal-200 bg-clip-text text-transparent">
                  Robots I’ve Worked On
                </h3>

                <div className="grid grid-cols-1 gap-3">
                  {[
                    {
                      title: "Mobile Wheeled Robots",
                      desc: "SLAM-based navigation, obstacle avoidance, and motion planning on real-world platforms.",
                    },
                    {
                      title: "Legged Robots",
                      desc: "Kinematics, gait planning, simulation-to-real transfer, and state estimation.",
                    },
                    {
                      title: "Drones / UAVs",
                      desc: "Perception-driven autonomy, obstacle avoidance, and real-world flight validation.",
                    },
                    {
                      title: "Surgical Robots",
                      desc: "High-precision perception, sensor fusion, and safety-critical control software.",
                    },
                  ].map((robot) => (
                    <div
                      key={robot.title}
                      className="rounded-xl bg-white/5 border border-white/10 p-3 hover:bg-white/10 transition-all"
                    >
                      <p className="text-white font-medium text-lg mb-1">
                        {robot.title}
                      </p>
                      <p className="text-gray-300 text-sm leading-relaxed">
                        {robot.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.div>




            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
