import { useState, useEffect } from "react";
import "./App.css";

const URL = "https://api.adviceslip.com/advice";

export const App = () => {
  const [messages, setMessages] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [slipId, setSlipId] = useState(1);

  const handleRandomMessage = () => {
    const randomId = Math.floor(Math.random() * 100 + 1);
    setSlipId(randomId);
  };

  useEffect(() => {
    const fetchAdvice = async () => {
      setIsLoading(true);

      try {
        const response = await fetch(`${URL}/${slipId}`);
        const { slip } = await response.json();
        setMessages(slip);
      } catch (error) {
        console.warn(error);
      }

      setIsLoading(false);
    };
    fetchAdvice();
  }, [slipId]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <main>
      <article className="flow">
        <span>advice #{slipId}</span>
        <p>{messages?.advice}</p>
        <img src="/pattern-divider-desktop.svg" alt="pattern divider" />
        <button onClick={handleRandomMessage}>
          <img src="/public/icon-dice.svg" alt="dice icon" />
        </button>
      </article>
    </main>
  );
};
