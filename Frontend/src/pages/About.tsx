import { Github, Linkedin, Mail, Leaf } from 'lucide-react';

export function About() {
  const team = [
    {
      name: 'Talha Bin Shahid',
      role: 'Lead AI Developer',
      image: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?w=400&h=400&fit=crop',
      bio: 'Expert in machine learning and deep learning models with 2+ years of experience in model development.',
      social: {
        github: '#',
        linkedin: '#',
        email: 'talhabinshahid2004@outlook.com',
      },
    },
    {
      name: 'Noor ul Huda',
      role: 'Video editor',
      image: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?w=400&h=400&fit=crop',
      bio: 'Full-stack developer specializing in React and FastAPI with a passion for building scalable applications.',
      social: {
        github: '#',
        linkedin: '#',
        email: 'david@leaflens.com',
      },
    },
    {
      name: 'Janeeta Ishtiaq',
      role: 'Front-end Developer',
      image: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?w=400&h=400&fit=crop',
      bio: 'Botanist with extensive knowledge of plant diseases and agricultural practices.',
      social: {
        github: '#',
        linkedin: '#',
        email: 'emily@leaflens.com',
      },
    },
  ];

  return (
    <div className="min-h-screen bg-dark-950">
      <div className="section-container py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          <div className="space-y-6 animate-fade-in">
            <h1 className="text-5xl font-bold leading-tight">
              <span className="gradient-text">About LeafLens</span>
            </h1>
            <p className="text-xl text-dark-300">
              LeafLens is dedicated to revolutionizing plant disease detection through cutting-edge artificial intelligence and machine learning technology.
            </p>
            <p className="text-lg text-dark-400 leading-relaxed">
              Our mission is to empower gardeners, farmers, and plant enthusiasts with the tools they need to protect their plants and ensure healthy growth. By combining advanced AI models with expert botanical knowledge, we've created a platform that makes disease identification accessible to everyone.
            </p>
            <p className="text-lg text-dark-400 leading-relaxed">
              Whether you're a professional farmer, a casual gardener, or just starting your plant journey, LeafLens provides instant, accurate diagnoses and actionable treatment recommendations.
            </p>
          </div>

          <div className="relative h-96 bg-gradient-to-br from-leaf-500/20 to-accent-500/20 rounded-2xl border border-leaf-500/30 flex items-center justify-center overflow-hidden">
            <Leaf className="w-40 h-40 text-leaf-500 opacity-30 animate-pulse-slow" />
            <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-transparent rounded-2xl" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-leaf-500/10 to-accent-500/10 border-y border-dark-800 py-12 mb-20">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-leaf-400 mb-2">99%</div>
              <p className="text-dark-300">Detection Accuracy</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-leaf-400 mb-2">50K+</div>
              <p className="text-dark-300">Plants Analyzed</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-leaf-400 mb-2">100+</div>
              <p className="text-dark-300">Disease Types Detected</p>
            </div>
          </div>
        </div>

        <div className="mb-20">
          <h2 className="text-4xl font-bold mb-4">Our Vision</h2>
          <p className="text-xl text-dark-300 max-w-3xl">
            We envision a world where plant diseases are detected early and treated effectively, reducing crop losses and promoting sustainable agriculture. Through continuous innovation and refinement of our AI models, we're committed to making advanced plant diagnostics accessible to everyone, from small-scale gardeners to large agricultural operations.
          </p>
        </div>

        <div className="mb-20">
          <h2 className="text-4xl font-bold mb-12">Meet the Team</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, index) => (
              <div
                key={index}
                className="card-hover group"
              >
                <div className="relative mb-4 overflow-hidden rounded-lg h-56 bg-dark-800">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-transparent" />
                </div>

                <h3 className="text-lg font-semibold text-dark-50 mb-1">{member.name}</h3>
                <p className="text-leaf-400 text-sm font-medium mb-3">{member.role}</p>
                <p className="text-dark-400 text-sm mb-4">{member.bio}</p>

                <div className="flex gap-3">
                  {member.social.github !== '#' && (
                    <a
                      href={member.social.github}
                      className="w-8 h-8 bg-dark-800 hover:bg-leaf-500 rounded-lg flex items-center justify-center transition-colors"
                      title="GitHub"
                    >
                      <Github className="w-4 h-4" />
                    </a>
                  )}
                  {member.social.linkedin !== '#' && (
                    <a
                      href={member.social.linkedin}
                      className="w-8 h-8 bg-dark-800 hover:bg-leaf-500 rounded-lg flex items-center justify-center transition-colors"
                      title="LinkedIn"
                    >
                      <Linkedin className="w-4 h-4" />
                    </a>
                  )}
                  <a
                    href={`mailto:${member.social.email}`}
                    className="w-8 h-8 bg-dark-800 hover:bg-leaf-500 rounded-lg flex items-center justify-center transition-colors"
                    title="Email"
                  >
                    <Mail className="w-4 h-4" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="card">
            <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
              <span className="w-8 h-8 bg-leaf-500 rounded-full flex items-center justify-center text-dark-950 font-bold">
                1
              </span>
              Our Technology
            </h3>
            <p className="text-dark-400">
              Built on state-of-the-art deep learning models trained on thousands of plant disease images from around the world.
            </p>
          </div>

          <div className="card">
            <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
              <span className="w-8 h-8 bg-leaf-500 rounded-full flex items-center justify-center text-dark-950 font-bold">
                2
              </span>
              Our Expertise
            </h3>
            <p className="text-dark-400">
              Our team combines expertise in machine learning, full-stack development, and plant pathology to deliver accurate results.
            </p>
          </div>

          <div className="card">
            <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
              <span className="w-8 h-8 bg-leaf-500 rounded-full flex items-center justify-center text-dark-950 font-bold">
                3
              </span>
              Our Commitment
            </h3>
            <p className="text-dark-400">
              We're committed to continuous improvement and supporting the global community of plant lovers and agricultural professionals.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
