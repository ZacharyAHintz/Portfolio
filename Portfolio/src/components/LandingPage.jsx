import { useState, useEffect } from "react";
import cog from "../assets/file.png";
import styles from "../styles/LandingPage.module.css";
import scroll from "../assets/scroll.png";
import CalendarText from "./CalendarText";
import CalcText from "./CalcText";
import SRText from "./SRText";
import SWText from "./SWText";
import TDText from "./TDText";

export default function LandingPage() {
  const [rotation, setRotation] = useState(0);
  const [canRotate, setCanRotate] = useState(true);
  const [isSlidOut, setIsSlidOut] = useState(false);
  const [project, setProject] = useState("");

  function handleClose() {
    setTimeout(() => {
      setProject("");
    }, 1000);
  }

  // Effect to handle wheel events
  useEffect(() => {
    const handleWheel = (event) => {
      // Prevent scrolling if a project is open
      if (project) {
        event.preventDefault();
        return;
      }

      if (canRotate && !isSlidOut) {
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

    if (!isSlidOut) {
      window.addEventListener("wheel", handleWheel, { passive: false });

      return () => {
        window.removeEventListener("wheel", handleWheel);
      };
    }
  }, [canRotate, project, isSlidOut]);

  useEffect(() => {
    const handleButtonClick = () => {
      setIsSlidOut(!isSlidOut);
    };

    const handleOpenCalendar = () => {
      setProject("Calendar");
      handleButtonClick();
    };

    const handleOpenCalc = () => {
      setProject("Calc");
      handleButtonClick();
    };

    const handleOpenSR = () => {
      setProject("SR");
      handleButtonClick();
    };

    const handleOpenSW = () => {
      setProject("SW");
      handleButtonClick();
    };

    const handleOpenTD = () => {
      setProject("TD");
      handleButtonClick();
    };

    const handleCloseComponent = () => {
      handleClose();
      handleButtonClick();
    };

    window.addEventListener("calendarExpanded", handleOpenCalendar);
    window.addEventListener("openCalc", handleOpenCalc);
    window.addEventListener("openSR", handleOpenSR);
    window.addEventListener("openSW", handleOpenSW);
    window.addEventListener("openTD", handleOpenTD);

    window.addEventListener("closeCalc", handleCloseComponent);
    window.addEventListener("closeTD", handleCloseComponent);
    window.addEventListener("closeSR", handleCloseComponent);
    window.addEventListener("closeSW", handleCloseComponent);
    window.addEventListener("closeCalendar", handleCloseComponent);

    if (project) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      window.removeEventListener("calendarExpanded", handleOpenCalendar);
      window.removeEventListener("openCalc", handleOpenCalc);
      window.removeEventListener("openSR", handleOpenSR);
      window.removeEventListener("openSW", handleOpenSW);
      window.removeEventListener("openTD", handleOpenTD);

      window.removeEventListener("closeCalc", handleCloseComponent);
      window.removeEventListener("closeTD", handleCloseComponent);
      window.removeEventListener("closeSR", handleCloseComponent);
      window.removeEventListener("closeSW", handleCloseComponent);
      window.removeEventListener("closeCalendar", handleCloseComponent);
    };
  }, [isSlidOut, project]);

  const renderComponent = () => {
    switch (project) {
      case "Calendar":
        return <CalendarText />;
      case "Calc":
        return <CalcText />;
      case "SR":
        return <SRText />;
      case "SW":
        return <SWText />;
      case "TD":
        return <TDText />;
      default:
        return null;
    }
  };

  return (
    <div className={styles.landingPage}>
      <div className={`${styles.title} ${isSlidOut ? styles.fadeOut : ""}`}>
        Zachary A Hintz
      </div>

      <div
        className={`${styles.mptextblock} ${isSlidOut ? styles.fadeOut : ""}`}
      >
        This project represents my first significant exploration into CSS,
        distinguishing it from my earlier projects where styling was kept to a
        minimum. It has been a rewarding learning experience, and experimenting
        with various techniques has been a lot of fun. I hope you enjoy the
        outcome!
      </div>
      <div className={styles.textblock}>{renderComponent()}</div>
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
