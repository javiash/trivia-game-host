import { useState } from 'react';
import { useGame } from '../../context/GameContext';

export function HostLogin() {
  const { setIsHostAuthenticated, setMode } = useGame();
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === 'Marco') {
      setIsHostAuthenticated(true);
      setError(false);
    } else {
      setError(true);
      setPassword('');
      setTimeout(() => setError(false), 3000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full">
        <div className="text-center mb-6">
          <div className="text-6xl mb-4">🔐</div>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            Acceso de Anfitrión
          </h2>
          <p className="text-gray-600">Ingresa la contraseña para continuar</p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm text-center">
            Contraseña incorrecta
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Contraseña"
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl mb-4 focus:border-purple-500 focus:outline-none text-lg"
            autoFocus
          />

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-xl font-semibold text-lg hover:shadow-lg transition-all"
          >
            Entrar
          </button>
        </form>

        <button
          onClick={() => {
            setMode('choose');
            setIsHostAuthenticated(false);
          }}
          className="w-full mt-3 px-4 py-2 bg-gray-200 rounded-lg text-gray-700 hover:bg-gray-300"
        >
          Volver
        </button>
      </div>
    </div>
  );
}

