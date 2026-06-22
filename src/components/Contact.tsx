"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { LinkedInIcon, GitHubIcon } from "./Icons";

const contactInfo = [
  { icon: Mail, label: "Email", value: "mo.ho3.azd@gamil.com", href: "mailto:mo.ho3.azd@gamil.com" },
  { icon: Phone, label: "Phone", value: "+98 910 321 7295", href: "tel:+989103217295" },
  { icon: MapPin, label: "Location", value: "Karaj, Iran", href: "#" },
];

const socialLinks = [
  { icon: GitHubIcon, label: "GitHub", href: "https://github.com/llazdll" },
  { icon: LinkedInIcon, label: "LinkedIn", href: "https://linkedin.com/in/mohammad-hosein-azadi-963308231" },
];

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    service: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setFormState({ name: "", email: "", service: "", message: "" });
  };

  return (
    <section id="contact" className="py-24 sm:py-32 relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-[#1e1e2e] to-transparent" />

      <div className="max-w-7xl mx-auto px-6" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-[#6c63ff] text-sm font-semibold tracking-widest uppercase">
            Contact
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mt-3 mb-5">
            Let&apos;s Work Together
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-[#6c63ff] to-[#00d4aa] mx-auto rounded-full" />
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-12">
          {/* Left — Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <h3 className="text-2xl font-bold mb-4">Get In Touch</h3>
            <p className="text-[#8888a0] leading-relaxed mb-8">
              Have a project in mind or want to collaborate? Feel free to reach out.
              I&apos;m always open to discussing new opportunities and ideas.
            </p>

            <div className="space-y-5 mb-10">
              {contactInfo.map((item, i) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
                  whileHover={{ x: 4 }}
                  className="flex items-center gap-4 group"
                >
                  <div className="w-11 h-11 rounded-xl bg-[#12121a] border border-[#1e1e2e] flex items-center justify-center group-hover:border-[#6c63ff]/30 transition-colors">
                    <item.icon size={18} className="text-[#6c63ff]" />
                  </div>
                  <div>
                    <p className="text-xs text-[#8888a0]">{item.label}</p>
                    <p className="text-sm font-medium group-hover:text-[#6c63ff] transition-colors">
                      {item.value}
                    </p>
                  </div>
                </motion.a>
              ))}
            </div>

            {/* Social links */}
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-3 rounded-xl bg-[#12121a] border border-[#1e1e2e] text-[#8888a0] hover:text-[#6c63ff] hover:border-[#6c63ff]/30 transition-colors"
                  aria-label={social.label}
                >
                  <social.icon size={18} />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Right — Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:col-span-3"
          >
            <form onSubmit={handleSubmit} className="p-8 rounded-2xl bg-[#12121a] border border-[#1e1e2e]">
              <div className="grid sm:grid-cols-2 gap-5 mb-5">
                <div>
                  <label className="block text-sm font-medium mb-2">Name</label>
                  <input
                    type="text"
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    placeholder="Your name"
                    required
                    className="w-full px-4 py-3 rounded-xl bg-[#0a0a0f] border border-[#1e1e2e] text-white placeholder-[#8888a0]/50 focus:outline-none focus:border-[#6c63ff]/50 transition-colors text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <input
                    type="email"
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    placeholder="your@email.com"
                    required
                    className="w-full px-4 py-3 rounded-xl bg-[#0a0a0f] border border-[#1e1e2e] text-white placeholder-[#8888a0]/50 focus:outline-none focus:border-[#6c63ff]/50 transition-colors text-sm"
                  />
                </div>
              </div>

              <div className="mb-5">
                <label className="block text-sm font-medium mb-2">Service</label>
                <select
                  value={formState.service}
                  onChange={(e) => setFormState({ ...formState, service: e.target.value })}
                  required
                  className="w-full px-4 py-3 rounded-xl bg-[#0a0a0f] border border-[#1e1e2e] text-white focus:outline-none focus:border-[#6c63ff]/50 transition-colors text-sm appearance-none"
                >
                  <option value="" className="bg-[#0a0a0f]">Select a service</option>
                  <option value="web" className="bg-[#0a0a0f]">Web Development</option>
                  <option value="data" className="bg-[#0a0a0f]">Data Science</option>
                  <option value="video" className="bg-[#0a0a0f]">Video Editing</option>
                  <option value="photo" className="bg-[#0a0a0f]">Photo Editing</option>
                  <option value="seo" className="bg-[#0a0a0f]">SEO Optimization</option>
                  <option value="other" className="bg-[#0a0a0f]">Other</option>
                </select>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">Message</label>
                <textarea
                  value={formState.message}
                  onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                  placeholder="Tell me about your project..."
                  required
                  rows={5}
                  className="w-full px-4 py-3 rounded-xl bg-[#0a0a0f] border border-[#1e1e2e] text-white placeholder-[#8888a0]/50 focus:outline-none focus:border-[#6c63ff]/50 transition-colors text-sm resize-none"
                />
              </div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-3.5 bg-[#6c63ff] hover:bg-[#5a52e0] text-white font-semibold rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-[#6c63ff]/25 flex items-center justify-center gap-2"
              >
                {submitted ? (
                  "Message Sent!"
                ) : (
                  <>
                    <Send size={18} />
                    Send Message
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
