import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Home, User, Code, FolderGit2, Briefcase, Mail } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { name: "Home", icon: Home },
    { name: "About", icon: User },
    { name: "Skills", icon: Code },
    { name: "Experience", icon: Briefcase },
    { name: "Projects", icon: FolderGit2 },
    { name: "Contact", icon: Mail },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-black/40 backdrop-blur-md text-white">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
       
        <h1 className="text-2xl font-bold">Jitesh Sonkusare</h1>

        
        <div className="hidden md:flex space-x-8">
          {links.map(({ name, icon: Icon }, i) => (
            <a
              key={i}
              href={`#${name.toLowerCase()}`}
              className="flex items-center gap-2 hover:text-blue-400 transition"
            >
              <Icon size={18} /> {name}
            </a>
          ))}
        </div>

        
        <button
          className="md:hidden"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-black/90 backdrop-blur-lg"
          >
            <div className="flex flex-col items-center space-y-6 py-6">
              {links.map(({ name, icon: Icon }, i) => (
                <a
                  key={i}
                  href={`#${name.toLowerCase()}`}
                  className="flex items-center gap-3 hover:text-blue-400 transition"
                  onClick={() => setIsOpen(false)}
                >
                  <Icon size={20} /> {name}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
