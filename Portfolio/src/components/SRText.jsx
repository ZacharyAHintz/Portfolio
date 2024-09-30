import { useState, useEffect } from "react";
import styles from "../styles/SRText.module.css";

export default function SRText() {
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    const handleCloseSR = () => {
      setIsClosing(true);
    };

    window.addEventListener("closeSR", handleCloseSR);

    return () => {
      window.removeEventListener("closeSR", handleCloseSR);
    };
  }, []);

  return (
    <div className={`${styles.container} ${isClosing ? styles.slideOut : ""}`}>
      <h1 className={styles.title}>Shadowrun NPC Generator</h1>
      <h2 className={styles.link}>
        <a
          href="https://zacharyahintz.github.io/SR5-Npc-Creator/"
          target="_blank"
          rel="noopener noreferrer"
        >
          https://zacharyahintz.github.io/SR5-Npc-Creator/
        </a>
      </h2>
      <h3 className={styles.subtitle}>
        A tool to generate unique NPC characters.
      </h3>
      <h3 className={styles.subtitle}>
        By far the most complex thing I've built, and the most helpful in terms
        of learning. The intricate interactions between numerous components
        reinforced the importance of maintaining organized code in a way that
        nothing else ive built has.
      </h3>
    </div>
  );
}
