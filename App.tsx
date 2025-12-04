import React from 'react';
import { AsociadosList } from './components/AsociadosList';

function App() {
  return (
    <div className="min-h-screen bg-gray-50/50">
      <main>
        <AsociadosList />
      </main>
      
      <footer className="w-full py-6 text-center">
        <p className="text-xs text-gray-300 font-medium tracking-wide uppercase">Coavancol Technical Test</p>
      </footer>
    </div>
  );
}

export default App;