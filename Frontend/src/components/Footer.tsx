import { Leaf, Github, Mail, Heart } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-dark-900 border-t border-dark-800 mt-20">
      <div className="section-container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 py-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Leaf className="w-6 h-6 text-leaf-500" />
              <span className="text-xl font-bold gradient-text">LeafLens</span>
            </div>
            <p className="text-dark-400 text-sm">
              AI-powered plant disease detection and treatment recommendations at your fingertips.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-dark-50 mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="/" className="text-dark-400 hover:text-leaf-400 transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="/detect" className="text-dark-400 hover:text-leaf-400 transition-colors">
                  Detect Disease
                </a>
              </li>
              <li>
                <a href="/about" className="text-dark-400 hover:text-leaf-400 transition-colors">
                  About Us
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-dark-50 mb-4">Features</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-dark-400 hover:text-leaf-400 transition-colors">
                  AI Detection
                </a>
              </li>
              <li>
                <a href="#" className="text-dark-400 hover:text-leaf-400 transition-colors">
                  Treatment Guide
                </a>
              </li>
              <li>
                <a href="#" className="text-dark-400 hover:text-leaf-400 transition-colors">
                  Chatbot Support
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-dark-50 mb-4">Connect</h3>
            <div className="flex gap-4">
              <a
                href="#"
                className="w-10 h-10 bg-dark-800 hover:bg-leaf-500 rounded-lg flex items-center justify-center transition-colors"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="mailto:contact@leaflens.com"
                className="w-10 h-10 bg-dark-800 hover:bg-leaf-500 rounded-lg flex items-center justify-center transition-colors"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-dark-800 py-6 flex flex-col sm:flex-row justify-between items-center text-dark-400 text-sm">
          <p>© 2025 LeafLens. All rights reserved.</p>
          <p className="flex items-center gap-1 mt-4 sm:mt-0">
            Made with <Heart className="w-4 h-4 text-leaf-500 fill-leaf-500" /> for plant lovers
          </p>
        </div>
      </div>
    </footer>
  );
}
