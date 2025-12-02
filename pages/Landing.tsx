import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Zap, Shield, Sparkles } from 'lucide-react';
import { Button } from '../components/UIComponents';

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="w-full border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <span className="text-2xl font-bold tracking-tight text-slate-900">MuseMatch</span>
          <div className="flex gap-4">
            <Button variant="ghost" onClick={() => navigate('/onboarding')}>Sign In</Button>
            <Button onClick={() => navigate('/onboarding')}>Get Started</Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-20 pb-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-50 border border-slate-200 text-sm font-medium text-slate-800 mb-8 animate-fade-in-up">
          <Sparkles className="w-4 h-4 text-amber-500" />
          <span>Now with AI-Powered Matching</span>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-slate-900 mb-6 max-w-4xl mx-auto leading-tight">
          Where Micro-Influencers <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">Meet Iconic Brands</span>
        </h1>
        
        <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed">
          The curated marketplace for authentic collaborations. 
          Connect, collaborate, and grow with transparent metrics and seamless messaging.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button size="lg" className="w-full sm:w-auto px-8" onClick={() => navigate('/onboarding')}>
            I'm a Brand
          </Button>
          <Button size="lg" variant="secondary" className="w-full sm:w-auto px-8" onClick={() => navigate('/onboarding')}>
            I'm a Creator
          </Button>
        </div>

        {/* Hero Image / Abstract Representation */}
        <div className="mt-20 relative rounded-2xl overflow-hidden shadow-2xl border border-slate-200 bg-slate-50 aspect-[16/9] max-w-5xl mx-auto">
             <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))]"></div>
             <div className="relative h-full w-full flex items-center justify-center">
                <img 
                    src="https://i.ibb.co/pvYrs6Yc/Image-fx-19.jpg" 
                    alt="Platform Preview" 
                    className="opacity-90 object-cover w-full h-full"
                />
                <div className="absolute inset-0 bg-slate-900/5"></div>
             </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="bg-slate-50 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
                <h2 className="text-3xl font-bold text-slate-900 mb-4">Everything you need to collaborate</h2>
                <p className="text-slate-600 max-w-xl mx-auto">Streamlined tools designed to make partnership management effortless for both sides.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
                {[
                    { icon: Zap, title: "Smart Matching", desc: "Our AI analyzes niche, engagement, and aesthetic to pair the perfect creators with brands." },
                    { icon: CheckCircle2, title: "Verified Metrics", desc: "Real-time API integration verifies follower counts and engagement rates instantly." },
                    { icon: Shield, title: "Secure Payments", desc: "Funds are held in escrow and released only when deliverables are approved." }
                ].map((feature, i) => (
                    <div key={i} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                        <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center mb-6">
                            <feature.icon className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
                        <p className="text-slate-600 leading-relaxed">{feature.desc}</p>
                    </div>
                ))}
            </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-100 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex flex-col items-center md:items-start">
                <span className="text-xl font-bold tracking-tight text-slate-900">MuseMatch</span>
                <p className="text-sm text-slate-500 mt-2">Connecting micro-influencers with iconic brands.</p>
            </div>
            <div className="flex gap-8 text-sm text-slate-600 font-medium">
                <a href="#" className="hover:text-indigo-600 transition-colors">About</a>
                <a href="#" className="hover:text-indigo-600 transition-colors">Blog</a>
                <a href="#" className="hover:text-indigo-600 transition-colors">Careers</a>
                <a href="#" className="hover:text-indigo-600 transition-colors">Contact</a>
            </div>
            <div className="text-sm text-slate-400">
                &copy; {new Date().getFullYear()} MuseMatch Inc.
            </div>
        </div>
      </footer>
    </div>
  );
};