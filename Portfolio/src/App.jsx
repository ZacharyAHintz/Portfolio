import "./App.css";
import { useState } from "react";
import LandingPage from "./components/LandingPage";
import Projects from "./components/Projects";

function App() {
  const [rotation, setRotation] = useState(0);

  return (
    <>
      <LandingPage rotation={rotation} setRotation={setRotation} />
      <Projects rotation={rotation} />
    </>
  );
}

export default App;
