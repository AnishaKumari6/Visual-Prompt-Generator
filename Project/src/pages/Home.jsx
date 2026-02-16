import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#09090b] text-white relative overflow-hidden">

      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        <video 
          autoPlay 
          loop 
          muted 
          playsInline
          className="w-full h-full object-cover opacity-60"
        >
          {/* PLACEHOLDER VIDEO: Replace this URL with your custom workflow video */}
          <source src="https://cdn.coverr.co/videos/coverr-typing-on-a-programmers-keyboard-5377/1080p.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        {/* Dark Overlay for Readability - Deep Enterprise Dark */}
        <div className="absolute inset-0 bg-black/80 z-10" />
        <div className="absolute inset-0 bg-gradient-to-tr from-purple-900/20 to-blue-900/10 z-10 mix-blend-overlay" />
      </div>

      {/* Background Gradients */}
      <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[120px] z-10 pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px] z-10 pointer-events-none" />





      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-6 pt-40 pb-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-20">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-left"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-8 rounded-full bg-white/5 border border-white/10 text-blue-300 text-xs font-semibold tracking-wider uppercase backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
            V2.0 is Live
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold leading-tight tracking-tight mb-6">
            Visual Intelligence for <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-teal-400">Enterprise Scale</span>.
          </h1>

          <p className="text-gray-400 text-lg md:text-xl max-w-xl leading-relaxed mb-8">
            Deploy secure, high-fidelity AI image generation pipelines directly into your workflow. 
            Built for performance, precision, and scale.
          </p>

          {/* Feature Bullets */}
          <div className="flex flex-col gap-3 mb-10">
            {['Enterprise-grade security & compliance', 'High-fidelity 8K image generation', 'Seamless API integration with < 100ms latency'].map((feature, i) => (
              <div key={i} className="flex items-center gap-3 text-gray-300">
                <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center text-green-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                </div>
                <span className="text-sm font-medium">{feature}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-4">
            <Link
              to="/explore"
              className="px-8 py-4 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold shadow-lg shadow-blue-500/20 transition-all transform hover:-translate-y-1"
            >
              Start Building
            </Link>

            <Link
              to="/about"
              className="px-8 py-4 rounded-lg bg-transparent border border-white/20 hover:bg-white/5 text-white font-medium backdrop-blur-sm transition-all flex items-center gap-2 group"
            >
              Documentation
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative lg:h-[600px] flex items-center justify-center pointer-events-none"
        >
           {/* Abstract Technical Visual */}
           <div className="relative w-full max-w-md aspect-[4/5] bg-gradient-to-b from-white/5 to-transparent rounded-2xl border border-white/10 backdrop-blur-sm p-1">
             <div className="absolute inset-0 bg-blue-500/5 rounded-2xl" />
             
             {/* Inner Content */}
             <div className="h-full w-full rounded-xl bg-[#0a0a0a] overflow-hidden relative">
               {/* Grid Lines */}
               <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px]" />
               
               {/* Center Glowing Orb/Object */}
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-blue-500/20 rounded-full blur-[60px] animate-pulse" />
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-purple-500/20 rounded-full blur-[40px]" />

               {/* Mock UI Elements */}
               <div className="absolute top-8 left-8 right-8 h-2 bg-gray-800 rounded-full overflow-hidden">
                 <div className="h-full w-2/3 bg-gradient-to-r from-blue-500 to-purple-500" />
               </div>
               
               <div className="absolute top-16 left-8 space-y-3">
                  <div className="flex gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500 mt-1.5" />
                    <div className="w-32 h-3 bg-gray-800 rounded" />
                  </div>
                  <div className="flex gap-2">
                    <div className="w-2 h-2 rounded-full bg-blue-500 mt-1.5" />
                    <div className="w-24 h-3 bg-gray-800 rounded" />
                  </div>
                  <div className="flex gap-2">
                    <div className="w-2 h-2 rounded-full bg-purple-500 mt-1.5" />
                    <div className="w-40 h-3 bg-gray-800 rounded" />
                  </div>
               </div>

               {/* Bottom Card */}
               <div className="absolute bottom-6 left-6 right-6 p-4 bg-gray-900/80 border border-white/10 rounded-xl backdrop-blur-md">
                 <div className="flex justify-between items-center mb-2">
                   <span className="text-xs text-gray-400 font-mono">GENERATION STATUS</span>
                   <span className="text-xs text-green-400 font-mono">COMPLETE</span>
                 </div>
                 <div className="h-24 bg-gray-800 rounded-lg overflow-hidden relative">
                    <img src="https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=400&auto=format&fit=crop" alt="AI Gen" className="w-full h-full object-cover opacity-60 hover:opacity-100 transition-opacity duration-500" />
                 </div>
               </div>
             </div>
           </div>
        </motion.div>
      </div>

      {/* Floating Stats Section */}
      <div className="relative z-10 border-t border-white/5 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto px-6 py-12 flex flex-wrap justify-center md:justify-between gap-8 text-center md:text-left">
          <div className="space-y-1">
            <h3 className="text-4xl font-bold text-white">50+</h3>
            <p className="text-gray-500 uppercase text-xs tracking-wider">Unique Styles</p>
          </div>
          <div className="space-y-1">
            <h3 className="text-4xl font-bold text-white">100%</h3>
            <p className="text-gray-500 uppercase text-xs tracking-wider">Free to Use</p>
          </div>
          <div className="space-y-1">
            <h3 className="text-4xl font-bold text-white">Instant</h3>
            <p className="text-gray-500 uppercase text-xs tracking-wider">Generation</p>
          </div>
          <div className="space-y-1">
            <h3 className="text-4xl font-bold text-white">24/7</h3>
            <p className="text-gray-500 uppercase text-xs tracking-wider">Availability</p>
          </div>
        </div>
      </div>

    </div>
  );
}
