import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import "../styles/home.scss";

const text = "Welcome to Moodify. An intelligent space where mood meets melody. Let your feelings shape the music you hear.";

const Home = () => {
  const [displayText, setDisplayText] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    let index = 0;

    const interval = setInterval(() => {
      setDisplayText(text.slice(0, index + 1));
      index++;

      if (index === text.length) {
        clearInterval(interval);
      }
    }, 60); 

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="home">
      <div className="home-content">
        <h1 className="typing-text">
          {displayText}
          <span className="cursor">|</span>
        </h1>

        <button
          className="detect-btn"
          onClick={() => navigate("/login")}
        >
          Login to Detect Your Mood
        </button>
      </div>
    </div>
  );
};

export default Home;