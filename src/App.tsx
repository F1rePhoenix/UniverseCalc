import React from 'react';
import { LanguageProvider } from './contexts/LanguageContext';
import Header from './components/Header/Header';
import Calculator from './components/Calculator';
import './index.css'; 


const AppContent: React.FC = () => {
  return (
    <div className="app">
      <Header />
      <main className="main-content">
        <Calculator />
      </main>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
};

export default App;