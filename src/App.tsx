import { FAQ } from "./components/FAQ";
import { Footer } from "./components/Footer";
import { Hero } from "./components/Hero";
import { InstallSection } from "./components/InstallSection";
import { Nav } from "./components/Nav";
import { Projects } from "./components/Projects";
import { PythonPip } from "./components/PythonPip";
import { ScriptsTools } from "./components/ScriptsTools";
import { ToolchainStrip } from "./components/ToolchainStrip";

export default function App() {
  return (
    <>
      <a href="#main-content" className="skip-link">
        跳到主要内容
      </a>
      <Nav />
      <main id="main-content" tabIndex={-1}>
        <Hero />
        <ToolchainStrip />
        <Projects />
        <ScriptsTools />
        <PythonPip />
        <InstallSection />
        <FAQ />
      </main>
      <Footer />
    </>
  );
}
