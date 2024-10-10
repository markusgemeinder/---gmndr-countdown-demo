'use client';

import { useState, useEffect } from 'react';
import styled from 'styled-components';

// Styled Components

const Container = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
`;

const Circle = styled.div`
  width: 500px; // 200px * 2.5 = 500px
  height: 500px;
  border-radius: 50%;
  background-color: ${(props) => (props.isGreen ? '#2e7d32' : '#f5f5f5')}; // Hellerer grauer Farbton
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CountdownText = styled.h1`
  font-size: ${(props) => (props.isInside ? '2rem' : '5rem')};
  color: ${(props) => (props.isInside ? '#66bb6a' : 'black')}; // Helleres Grün für den Countdown im Kreis
`;

// React Component

export default function Home() {
  const [countdown, setCountdown] = useState(3); // Externer Countdown startet bei 3
  const [showCircle, setShowCircle] = useState(false); // Zeigt den Kreis nach dem ersten Countdown
  const [milliseconds, setMilliseconds] = useState(1500); // Countdown im Kreis in Millisekunden auf 1,5 Sekunden
  const [isGreenCircle, setIsGreenCircle] = useState(true); // Zustandswechsel von grün zu grau

  useEffect(() => {
    // Countdown-Logik für den äußeren Countdown
    if (countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (countdown === 0) {
      setShowCircle(true); // Zeigt den grünen Kreis nach 3 Sekunden
    }
  }, [countdown]);

  useEffect(() => {
    // Countdown-Logik für den inneren Countdown mit Millisekunden
    if (showCircle && milliseconds > 0) {
      const interval = setInterval(() => {
        setMilliseconds((prev) => prev - 10); // Countdown in 10ms-Schritten
      }, 10);
      return () => clearInterval(interval);
    } else if (milliseconds <= 0) {
      setIsGreenCircle(false); // Wechselt den Kreis von grün zu grau
      setMilliseconds(0); // Sicherstellen, dass es bei 0 bleibt
    }
  }, [showCircle, milliseconds]);

  // Formatiert den Countdown im Kreis mit Sekunden und Millisekunden
  const formattedTime = () => {
    const totalMilliseconds = Math.max(milliseconds, 0); // Verhindert negative Werte
    const seconds = Math.floor(totalMilliseconds / 1000); // Verbleibende Sekunden
    const millisecondsDisplay = String(totalMilliseconds % 1000).padStart(3, '0'); // Verbleibende Millisekunden

    return `${seconds}:${String(millisecondsDisplay).padStart(3, '0')}`;
  };

  return (
    <Container>
      {showCircle ? (
        <Circle isGreen={isGreenCircle}>
          {isGreenCircle ? <CountdownText isInside>{formattedTime()}</CountdownText> : null}
        </Circle>
      ) : (
        <CountdownText>{countdown}</CountdownText>
      )}
    </Container>
  );
}
