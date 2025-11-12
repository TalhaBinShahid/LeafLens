import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Leaf, Menu, X } from 'lucide-react';

export function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <header className="bg-dark-900 border-b border-dark-800 sticky top-0 z-50">
      <div className="section-container">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="relative">
              <Leaf className="w-8 h-8 text-leaf-500 group-hover:text-leaf-400 transition-colors" />
              <div className="absolute inset-0 bg-leaf-500/20 rounded-full blur group-hover:blur-md transition-all" />
            </div>
            <span className="text-2xl font-bold gradient-text">LeafLens</span>
          </Link>

          <button
            onClick={toggleMenu}
            className="md:hidden p-2 hover:bg-dark-800 rounded-lg transition-colors"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          <nav className="hidden md:flex items-center gap-8">
            <Link
              to="/"
              className="text-dark-200 hover:text-leaf-400 transition-colors font-medium"
            >
              Home
            </Link>
            <Link
              to="/detect"
              className="text-dark-200 hover:text-leaf-400 transition-colors font-medium"
            >
              Detect
            </Link>
            <Link
              to="/about"
              className="text-dark-200 hover:text-leaf-400 transition-colors font-medium"
            >
              About
            </Link>
            <a
              href="#contact"
              className="btn-primary text-sm"
            >
              Contact
            </a>
          </nav>
        </div>

        {isOpen && (
          <nav className="md:hidden pb-4 space-y-3 border-t border-dark-800 pt-4">
            <Link
              to="/"
              className="block text-dark-200 hover:text-leaf-400 transition-colors font-medium py-2"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/detect"
              className="block text-dark-200 hover:text-leaf-400 transition-colors font-medium py-2"
              onClick={() => setIsOpen(false)}
            >
              Detect
            </Link>
            <Link
              to="/about"
              className="block text-dark-200 hover:text-leaf-400 transition-colors font-medium py-2"
              onClick={() => setIsOpen(false)}
            >
              About
            </Link>
            <a
              href="#contact"
              className="block btn-primary text-sm text-center"
              onClick={() => setIsOpen(false)}
            >
              Contact
            </a>
          </nav>
        )}
      </div>
    </header>
  );
}
