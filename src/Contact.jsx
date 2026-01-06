import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Instagram } from "lucide-react";

const contacts = [
  {
    name: "LinkedIn",
    icon: <Linkedin size={32} className="text-blue-500" />,
    link: "https://www.linkedin.com/in/jitesh-sonkusare-11b118198/",
  },
  {
    name: "GitHub",
    icon: <Github size={32} className="text-gray-400" />,
    link: "https://github.com/jitesh3023",
  },
  {
    name: "Email",
    icon: <Mail size={32} className="text-red-400" />,
    link: "mailto:jitesh3023@gmail.com",
  },
];

export default function Contact() {
  return (
    <section
      id="contact"
      className="relative w-full py-20 px-6 bg-[rgb(23,27,35)] text-white"
    >

      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <h2 className="text-5xl md:text-6xl font-extrabold tracking-tight">
          <span className="bg-gradient-to-r from-white via-sky-200 to-teal-200 bg-clip-text text-transparent">
            Contact Me
          </span>
        </h2>
      </motion.div>

      
    <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 place-items-center">
      {contacts.map((contact, idx) => (
          <motion.a
            key={idx}
            href={contact.link}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, delay: idx * 0.1 }}
            className="flex flex-col items-center justify-center w-56 h-28 bg-white/10 border border-white/10 rounded-2xl shadow-xl p-6 hover:scale-105 transition-transform duration-300"
          >
            {contact.icon}
            <span className="mt-3 text-lg font-semibold text-teal-200">
              {contact.name}
            </span>
          </motion.a>
        ))}
      </div>
    </section>
  );
}
