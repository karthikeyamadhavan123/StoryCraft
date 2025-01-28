import React from 'react';
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-4">
      <div className="max-w-6xl mx-auhref px-4 py-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Company Name</h3>
            <p className="mb-4">Making the world a better place through innovative solutions.</p>
            <div className="flex items-center space-x-4">
              <Facebook className="w-5 h-5 hover:text-blue-400 cursor-pointer" />
              <Twitter className="w-5 h-5 hover:text-blue-400 cursor-pointer" />
              <Instagram className="w-5 h-5 hover:text-pink-400 cursor-pointer" />
              <Youtube className="w-5 h-5 hover:text-red-500 cursor-pointer" />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-white">Home</a></li>
              <li><a href="#" className="hover:text-white">About Us</a></li>
              <li><a href="#" className="hover:text-white">Services</a></li>
              <li><a href="#" className="hover:text-white">Blog</a></li>
              <li><a href="#" className="hover:text-white">Contact</a></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Services</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-white">Web Design</a></li>
              <li><a href="#" className="hover:text-white">Development</a></li>
              <li><a href="#" className="hover:text-white">Marketing</a></li>
              <li><a href="#" className="hover:text-white">Consulting</a></li>
              <li><a href="#" className="hover:text-white">Analytics</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Contact Us</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5" />
                <span>123 Business St, Suite 100<br />New York, NY 10001</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5" />
                <span>(555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5" />
                <span>contact@company.com</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bothrefm Bar */}
        <div className="border-t border-gray-700 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p>© 2025 Company Name. All rights reserved.</p>
            <div className="mt-4 md:mt-0">
              <a href="#" className="hover:text-white mr-4">Privacy Policy</a>
              <a href="#" className="hover:text-white mr-4">Terms of Service</a>
              <a href="#" className="hover:text-white">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
export default Footer
