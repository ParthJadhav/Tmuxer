import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { initialiseApp } from './utils/utils';

import Search from './routes/Search';
import Dashboard from './routes/Dashboard';

function App() {
  useEffect(() => {
    (async () => { await initialiseApp(); })();
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Search />} />
      <Route path="/dashboard/*" element={<Dashboard />} />
    </Routes>
  );
}

export default App;
