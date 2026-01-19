import React from 'react';
import { FaTwitter, FaLinkedin, FaGithub, FaHeart } from 'react-icons/fa'; // Install react-icons

const Footer = () => {
  return (
    <footer className="bg-[#050505] text-gray-400 py-12 px-6 border-t border-gray-800">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-4 text-white">
              <div className="bg-purple-600 p-1.5 rounded-lg shadow-[0_0_15px_rgba(147,51,234,0.5)]">
                {/* Book Icon Placeholder */}
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
                  <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
                </svg>
              </div>
              <span className="font-bold text-xl tracking-tight">eBook Creator</span>
            </div>
            <p className="text-sm leading-relaxed mb-6 max-w-xs">
              Create, design, and publish stunning ebooks with the power of AI.
            </p>
            {/* Social Icons */}
            <div className="flex gap-3">
              <a href="#" className="p-2 bg-gray-900 border border-gray-800 rounded-lg hover:text-white transition-colors">
                <FaTwitter size={18} />
              </a>
              <a href="#" className="p-2 bg-gray-900 border border-gray-800 rounded-lg hover:text-white transition-colors">
                <FaLinkedin size={18} />
              </a>
              <a href="#" className="p-2 bg-gray-900 border border-gray-800 rounded-lg hover:text-white transition-colors">
                <FaGithub size={18} />
              </a>
            </div>
          </div>

          {/* Links Sections */}
          <div>
            <h4 className="text-white font-semibold mb-6">Product</h4>
            <ul className="space-y-4 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Templates</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-6">Company</h4>
            <ul className="space-y-4 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">About</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-6">Legal</h4>
            <ul className="space-y-4 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Terms</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-900 flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
          <p>© 2025 eBook Creator. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Made with <FaHeart className="text-purple-500" /> for creators
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;