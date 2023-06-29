import   { useState } from 'react';
import './App.css';

function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    // Simulação de login com email e senha fixos
    if (email === 'admin@example.com' && password === 'password') {
      setLoggedIn(true);
    } else {
      alert('Credenciais inválidas!');
    }
  };

  const handleLogout = () => {
    setLoggedIn(false);
    setEmail('');
    setPassword('');
  };

  if (loggedIn) {
    return (
      <div className="container">
        <h1>Bem-vindo! Você está logado.</h1>
        <button onClick={handleLogout}>Sair</button>
      </div>
    );
  }

  return (
    <div className="container">
      <h1>Entre com suas credenciais</h1>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Entrar</button>
      </form>
    </div>
  );
}

export default App;
