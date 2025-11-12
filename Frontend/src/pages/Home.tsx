import { Link } from 'react-router-dom';
import { ArrowRight, Zap, Brain, MessageCircle, Leaf, ShieldCheck, Clock } from 'lucide-react';

export function Home() {
  return (
    <div className="min-h-screen bg-dark-950">
      <section className="py-20 md:py-32">
        <div className="section-container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 animate-fade-in">
              <h1 className="text-5xl md:text-6xl font-bold leading-tight">
                <span className="gradient-text">Detect Plant Diseases</span>
                <br />
                <span className="text-dark-50">with AI Intelligence</span>
              </h1>
              <p className="text-xl text-dark-300 leading-relaxed">
                Upload a photo of your plant and let our advanced AI model instantly identify diseases and recommend personalized treatment strategies.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link to="/detect" className="btn-primary flex items-center justify-center gap-2">
                  Start Detection
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link to="/about" className="btn-secondary flex items-center justify-center gap-2">
                  Learn More
                </Link>
              </div>
            </div>

            <div className="relative h-96 bg-gradient-to-br from-leaf-500/20 to-accent-500/20 rounded-2xl border border-leaf-500/30 flex items-center justify-center">
              <Leaf className="w-40 h-40 text-leaf-500 opacity-30 animate-pulse-slow" />
              <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-transparent rounded-2xl" />
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-dark-900/50 border-y border-dark-800">
        <div className="section-container">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-xl text-dark-300">Simple steps to diagnose and cure your plants</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="card-hover group">
              <div className="w-12 h-12 bg-leaf-500/20 rounded-lg flex items-center justify-center mb-4 group-hover:bg-leaf-500/30 transition-colors">
                <Zap className="w-6 h-6 text-leaf-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Upload Image</h3>
              <p className="text-dark-300">
                Take a clear photo of your plant's affected area and upload it to our platform.
              </p>
            </div>

            <div className="card-hover group">
              <div className="w-12 h-12 bg-leaf-500/20 rounded-lg flex items-center justify-center mb-4 group-hover:bg-leaf-500/30 transition-colors">
                <Brain className="w-6 h-6 text-leaf-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">AI Analysis</h3>
              <p className="text-dark-300">
                Our advanced AI model analyzes the image and identifies the disease instantly.
              </p>
            </div>

            <div className="card-hover group">
              <div className="w-12 h-12 bg-leaf-500/20 rounded-lg flex items-center justify-center mb-4 group-hover:bg-leaf-500/30 transition-colors">
                <MessageCircle className="w-6 h-6 text-leaf-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Get Solutions</h3>
              <p className="text-dark-300">
                Receive detailed treatment recommendations and chat with our AI for personalized advice.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="section-container">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Why Choose LeafLens?</h2>
            <p className="text-xl text-dark-300">The most advanced plant disease detection platform</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="card group">
              <div className="flex items-start gap-3">
                <ShieldCheck className="w-6 h-6 text-leaf-500 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold mb-2">High Accuracy</h3>
                  <p className="text-dark-400 text-sm">
                    State-of-the-art AI models trained on thousands of plant disease images.
                  </p>
                </div>
              </div>
            </div>

            <div className="card group">
              <div className="flex items-start gap-3">
                <Clock className="w-6 h-6 text-leaf-500 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold mb-2">Instant Results</h3>
                  <p className="text-dark-400 text-sm">
                    Get disease identification and treatment recommendations in seconds.
                  </p>
                </div>
              </div>
            </div>

            <div className="card group">
              <div className="flex items-start gap-3">
                <Brain className="w-6 h-6 text-leaf-500 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold mb-2">AI Chatbot</h3>
                  <p className="text-dark-400 text-sm">
                    Ask follow-up questions and get personalized treatment guidance.
                  </p>
                </div>
              </div>
            </div>

            <div className="card group">
              <div className="flex items-start gap-3">
                <Leaf className="w-6 h-6 text-leaf-500 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold mb-2">Prevention Tips</h3>
                  <p className="text-dark-400 text-sm">
                    Learn how to prevent future diseases and maintain plant health.
                  </p>
                </div>
              </div>
            </div>

            <div className="card group">
              <div className="flex items-start gap-3">
                <MessageCircle className="w-6 h-6 text-leaf-500 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold mb-2">Expert Support</h3>
                  <p className="text-dark-400 text-sm">
                    24/7 AI-powered chatbot support for all your plant health questions.
                  </p>
                </div>
              </div>
            </div>

            <div className="card group">
              <div className="flex items-start gap-3">
                <Zap className="w-6 h-6 text-leaf-500 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold mb-2">Fast Processing</h3>
                  <p className="text-dark-400 text-sm">
                    Optimized for speed without compromising accuracy or reliability.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-r from-leaf-500/10 to-accent-500/10 border-y border-dark-800">
        <div className="section-container text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Diagnose Your Plants?</h2>
          <p className="text-xl text-dark-300 mb-8 max-w-2xl mx-auto">
            Join thousands of plant enthusiasts and professionals who trust LeafLens for accurate disease detection and treatment recommendations.
          </p>
          <Link to="/detect" className="btn-primary inline-flex items-center gap-2">
            Start Your Free Analysis
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
