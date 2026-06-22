"use client";

import { motion } from "framer-motion";
import { Heart, Send } from "lucide-react";
import { LinkedInIcon, GitHubIcon } from "./Icons";

const socialLinks = [
  { icon: GitHubIcon, href: "https://github.com/llazdll", label: "GitHub" },
  { icon: LinkedInIcon, href: "https://linkedin.com/in/mohammad-hosein-azadi-963308231", label: "LinkedIn" },
  { icon: Send, href: "https://t.me/lllAzdlll", label: "Telegram" },
];

export default function Footer() {
  return (
    <footer className="relative py-10 border-t border-[#1e1e2e]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <motion.a
            href="#home"
            className="text-xl font-bold text-gradient"
            whileHover={{ scale: 1.05 }}
          >
            {"<MHA />"}
          </motion.a>

          {/* Copyright */}
          <p className="text-sm text-[#8888a0] flex items-center gap-1.5">
            Built with <Heart size={14} className="text-[#ff6b6b]" /> by
            <span className="text-white font-medium">Mohammad Hossein Azadi</span>
            &copy; {new Date().getFullYear()}
          </p>

          {/* Social */}
          <div className="flex items-center gap-3">
            {socialLinks.map((social) => (
              <motion.a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, y: -2 }}
                className="p-2.5 rounded-lg bg-[#12121a] border border-[#1e1e2e] text-[#8888a0] hover:text-[#6c63ff] hover:border-[#6c63ff]/30 transition-colors"
                aria-label={social.label}
              >
                <social.icon size={16} />
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
