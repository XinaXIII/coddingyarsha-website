import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import PCs from './pages/PCs';
import Booking from './pages/Booking';
import Requests from './pages/Requests';
import Contacts from './pages/Contacts';
import Admin from './pages/Admin';
import Login from './pages/Login';

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pcs" element={<PCs />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/requests" element={<Requests />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;