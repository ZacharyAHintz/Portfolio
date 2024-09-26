import { useState, useEffect } from "react";
import cog from "../assets/file.png";
import styles from "../styles/LandingPage.module.css";
import scroll from "../assets/scroll.png";

export default function LandingPage() {
  const [rotation, setRotation] = useState(0);
  const [canRotate, setCanRotate] = useState(true);
  const [isSlidOut, setIsSlidOut] = useState(false);

  useEffect(() => {
    const handleWheel = (event) => {
      if (canRotate) {
        if (event.deltaY < 0) {
          setRotation((prevRotation) => prevRotation + 72);
        } else {
          setRotation((prevRotation) => prevRotation - 72);
        }

        setCanRotate(false);
        setTimeout(() => {
          setCanRotate(true);
        }, 800);
      }
    };

    window.addEventListener("wheel", handleWheel);

    return () => {
      window.removeEventListener("wheel", handleWheel);
    };
  }, [canRotate]);

  useEffect(() => {
    const handleButtonClick = () => {
      setIsSlidOut(!isSlidOut);
    };

    window.addEventListener("click", handleButtonClick);

    return () => {
      window.removeEventListener("click", handleButtonClick);
    };
  }, [isSlidOut]);

  return (
    <div className={styles.landingPage}>
      <div
        className={`${styles.container} ${isSlidOut ? styles.slideOut : ""}`}
      >
        <img
          className={`${styles.cog} ${isSlidOut ? styles.slideOut : ""}`}
          src={cog}
          alt="cog"
          style={{ transform: `translateY(-50%) rotate(${rotation}deg)` }}
        />
      </div>
      <img
        className={`${styles.scroll} ${isSlidOut ? styles.slideOut : ""}`}
        src={scroll}
        alt="scroll"
      />
    </div>
  );
}
