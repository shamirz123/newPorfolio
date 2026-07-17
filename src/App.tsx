import { useEffect, useState } from 'react'
import Navigation from './components/Navigation';
import FadeIn from './components/FadeIn';
import Main from './components/Main';
import Expertise from './components/Expertise';
import Timeline from './components/Timeline';
import Project from './components/Project';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
    const [mode, setMode] = useState<string>('dark');

    const handleModeChange = () => {
        if (mode === 'dark') {
            setMode('light');
        } else {
            setMode('dark');
        }
    }

    useEffect(() => {
        window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
      }, []);

  return (
    <>
     <div className={`main-container ${mode === 'dark' ? 'dark-mode' : 'light-mode'}`}>
        <Navigation parentToChild={{mode}} modeChange={handleModeChange}/>
        <FadeIn transitionDuration={700}>
            <Main/>
            <Expertise/>
            <Timeline/>
            <Project/>
            <Contact/>
        </FadeIn>
        <Footer />
    </div>
    </>
  )
}

export default App
