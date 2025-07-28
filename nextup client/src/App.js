import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CustomerPage from './pages/Customer';
import BarberPage from './pages/Barber';
import HomePage from './pages/Home';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/customer" element={<CustomerPage />} />
        <Route path="/barber" element={<BarberPage />} />
        <Route path="/" element={<HomePage/>} />
      </Routes>
    </Router>
  );
}

export default App;
