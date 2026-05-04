import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import { Lookup } from './pages/Lookup';
import { Deals } from './pages/Deals';
import { PageView } from './types';

function App() {
  const [currentView, setCurrentView] = useState<PageView>(PageView.HOME);

  // Handle hash changes for "routing" without external libs
  useEffect(() => {
    const handleHashChange = () => {
        const hash = window.location.hash.replace('#', '');
        switch (hash) {
            case 'about': setCurrentView(PageView.ABOUT); break;
            case 'contact': setCurrentView(PageView.CONTACT); break;
            case 'lookup': setCurrentView(PageView.LOOKUP); break;
            case 'deals': setCurrentView(PageView.DEALS); break;
            default: setCurrentView(PageView.HOME);
        }
    };

    window.addEventListener('hashchange', handleHashChange);
    // Initial check
    handleHashChange();

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigate = (view: PageView) => {
    setCurrentView(view);
    // Sync hash
    const hash = view === PageView.HOME ? '' : view.toLowerCase();
    window.location.hash = hash;
    window.scrollTo(0,0);
  };

  const renderView = () => {
    switch (currentView) {
      case PageView.HOME:
        return <Home onNavigate={navigate} />;
      case PageView.ABOUT:
        return <About />;
      case PageView.CONTACT:
        return <Contact />;
      case PageView.LOOKUP:
        return <Lookup />;
      case PageView.DEALS:
        return <Deals />;
      default:
        return <Home onNavigate={navigate} />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-brand-darker text-white font-sans">
      <Navbar currentView={currentView} onNavigate={navigate} />
      
      <main className="flex-grow">
        {renderView()}
      </main>

      <Footer onNavigate={navigate} />
    </div>
  );
}

export default App;