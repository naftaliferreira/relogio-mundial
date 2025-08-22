import { useState, useEffect } from 'react';
import './App.css';

// A tipagem para o objeto de relógio (opcional, mas boa prática)
interface Clock {
  id: number;
  name: string;
  timeZone: string;
}

// Lista inicial de cidades para exibir
const initialClocks: Clock[] = [
  { id: 1, name: 'Hora Local', timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone },
  { id: 2, name: 'Nova York', timeZone: 'America/New_York' },
  { id: 3, name: 'Londres', timeZone: 'Europe/London' },
  { id: 4, name: 'Tóquio', timeZone: 'Asia/Tokyo' },
];

function App() {
  // Estado para a hora atual, atualizada a cada segundo
  const [currentTime, setCurrentTime] = useState(new Date());

  // Estado para a lista de relógios selecionados
  const [selectedClocks, setSelectedClocks] = useState<Clock[]>(initialClocks);

  // Estado para o input de nova cidade
  const [newCity, setNewCity] = useState('');

  // Atualiza a hora a cada segundo para todos os relógios
  useEffect(() => {
    const timerId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timerId);
  }, []);

  // Função para adicionar um novo relógio
  const handleAddClock = () => {
    // Lista de fusos horários suportados pela API Intl (exemplo)
    const supportedTimeZones = [
      'America/Sao_Paulo', 'America/New_York', 'Europe/London',
      'Asia/Tokyo', 'Australia/Sydney', 'Africa/Cairo'
      // Adicione mais fusos horários aqui...
    ];

    const trimmedCity = newCity.trim();

    if (trimmedCity && supportedTimeZones.includes(trimmedCity)) {
      const newId = Math.max(...selectedClocks.map(c => c.id)) + 1;
      const newClock: Clock = {
        id: newId,
        name: trimmedCity,
        timeZone: trimmedCity
      };
      setSelectedClocks([...selectedClocks, newClock]);
      setNewCity('');
    } else {
      alert('Por favor, digite um fuso horário válido, como "Europe/London".');
    }
  };

  // Função para remover um relógio
  const handleRemoveClock = (id: number) => {
    setSelectedClocks(selectedClocks.filter(clock => clock.id !== id));
  };

  // Função para formatar a hora de acordo com o fuso horário
  const formatTime = (timeZone: string) => {
    return currentTime.toLocaleTimeString('pt-BR', { timeZone });
  };

  // Função para formatar a data de acordo com o fuso horário
  const formatDate = (timeZone: string) => {
    return currentTime.toLocaleDateString('pt-BR', { timeZone });
  };

  return (
    <div className="container">
      <h1>Relógio Mundial</h1>

      <div className="add-clock-container">
        <input
          type="text"
          value={newCity}
          onChange={(e) => setNewCity(e.target.value)}
          placeholder="Ex: Europe/London"
        />
        <button onClick={handleAddClock}>Adicionar Relógio</button>
      </div>

      <div className="clocks-list">
        {selectedClocks.map((clock) => (
          <div key={clock.id} className="clock-card">
            <div className="clock-header">
              <h2>{clock.name}</h2>
              <button onClick={() => handleRemoveClock(clock.id)} className="remove-button">x</button>
            </div>
            <p className="time">{formatTime(clock.timeZone)}</p>
            <p className="date">{formatDate(clock.timeZone)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;