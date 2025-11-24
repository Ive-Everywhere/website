import React, { useEffect } from 'react';
import Hero from './components/Hero';
import BioSection from './components/BioSection';
import ExperienceTree from './components/ExperienceTree';
import WorkflowDiagram from './components/WorkflowDiagram';
import TechStack from './components/TechStack';
import ProjectCaseStudy from './components/ProjectCaseStudy';
import Testimonials from './components/Testimonials';
import BugScanner from './components/BugScanner';
import DetailScanner from './components/DetailScanner';
import Contracting from './components/Contracting';
import Footer from './components/Footer';

const App = () => {
  return (
    <div className="bg-black min-h-screen font-['JetBrains_Mono'] selection:bg-green-500 selection:text-black">

      {/* Fixed Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/5 px-6 py-4 font-mono text-xs tracking-widest">
        <div className="max-w-7xl mx-auto flex justify-between items-center text-white">
          <div className="font-bold text-lg flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500"></div>
            IVE
          </div>

          <div className="hidden md:flex items-center gap-8 text-neutral-400">
            <a href="#" className="hover:text-white transition-colors">[FEATURES]</a>
            <a href="#" className="hover:text-white transition-colors">[PRIVACY]</a>
            <a href="#" className="hover:text-white transition-colors">[DOWNLOAD]</a>
            <a href="#" className="text-green-400 hover:text-green-300 transition-colors border border-green-900 bg-green-900/20 px-4 py-2">
              GET_APP
            </a>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main>
        <Hero />
        <BioSection />
        <ExperienceTree />
        <WorkflowDiagram />
        <TechStack />
        <ProjectCaseStudy />
        <Testimonials />
        <BugScanner />
        <DetailScanner />
        <Contracting />
      </main>

      <Footer />
    </div>
  );
};

export default App;
