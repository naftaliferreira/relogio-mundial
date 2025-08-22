import { useState, useEffect } from 'react';
import './App.css';

function App() {
  // Estado para a hora atual
  const [localTime, setLocalTime] = useState(new Date());

  // Atualiza a hora a cada segundo
  useEffect(() => {
    const timerId = setInterval(() => {
      setLocalTime(new Date());
    }, 1000);

    // A função de limpeza do useEffect é crucial para evitar memory leaks
    return () => clearInterval(timerId);
  }, []); // Array vazio para rodar o efeito apenas uma vez na montagem

  return (
    <div className="container">
      <h1>Relógio Mundial</h1>
      <div className="clocks-list">
        <div className="clock-card">
          <h2>Hora Local</h2>
          <p className="time">{localTime.toLocaleTimeString()}</p>
          <p className="date">{localTime.toLocaleDateString()}</p>
        </div>
      </div>
    </div>
  );
}

export default App;