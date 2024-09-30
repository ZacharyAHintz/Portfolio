import { useState, useEffect } from "react";
import styles from "../styles/CalcText.module.css";

export default function CalcText() {
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    const handleCloseCalc = () => {
      setIsClosing(true);
    };

    window.addEventListener("closeCalc", handleCloseCalc);

    return () => {
      window.removeEventListener("closeCalc", handleCloseCalc);
    };
  }, []);

  return (
    <div className={`${styles.container} ${isClosing ? styles.slideOut : ""}`}>
      <h1 className={styles.title}>Calculator</h1>
      <h2 className={styles.link}>
        <a
          href="https://zacharyahintz.github.io/Calculator/"
          target="_blank"
          rel="noopener noreferrer"
        >
          https://zacharyahintz.github.io/Calculator/
        </a>
      </h2>
      <h3 className={styles.subtitle}>
        A simple and efficient tool for performing calculations.
      </h3>
      <h3 className={styles.subtitle}>
        This project is a straightforward tool for doing calculations. It really
        helped me get a better grasp of React and how to build apps with
        components. Overall, it was a great way to strengthen my skills and
        learn more about React architecture.
      </h3>
    </div>
  );
}
