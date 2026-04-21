import { useState } from 'react';
import { NotificationBadge } from './components/NotificationBadge';
import { NotificationList } from './components/NotificationList';

function App() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <div className="min-h-screen min-w-screen bg-gray-100 font-sans">
      <nav className="bg-white shadow-sm px-6 py-4 flex justify-between items-center relative">
        <h1 className="text-xl font-bold text-gray-800">GiftedIQ App</h1>

        <div className="relative">
          <NotificationBadge onClick={() => setIsDropdownOpen(!isDropdownOpen)} />

          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl border border-gray-100 overflow-hidden z-50">
              <div className="bg-gray-50 px-4 py-3 border-b border-gray-100 flex justify-between items-center">
                <h3 className="font-semibold text-gray-700">Notificaciones</h3>
              </div>
              <NotificationList />
            </div>
          )}
        </div>
      </nav>

      <main className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-sm">
        <h2 className="text-2xl font-semibold mb-4">Bienvenido a tu panel</h2>
        <p className="text-gray-600">
          Abre la consola (Swagger) y envía un POST a la API para ver cómo la campana se actualiza y la notificación aparece mágicamente aquí en tiempo real, sin recargar la página.
        </p>
      </main>
    </div>
  );
}

export default App;