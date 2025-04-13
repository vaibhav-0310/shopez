import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import components
import Electronic from './pages/clothing/collect/electronic';
import Men from './pages/clothing/collect/men';
import ShowElectric from './pages/clothing/show/showelectric';
import ShowMen from './pages/clothing/show/showmen';

import Dashboard from './pages/user/dashboard';
import Login from './pages/user/login';
import Signup from './pages/user/signup';

import Cart from './pages/utils/cart';
import Home from './pages/utils/index'; // Assuming this is your homepage

function App() {
  return (
    <Router>
      <Routes>
        {/* Home */}
        <Route path="/" element={<Home />} />

        {/* Clothing -> Collect */}
        <Route path="/clothing/collect/electronic" element={<Electronic />} />
        <Route path="/clothing/collect/men" element={<Men />} />

        {/* Clothing -> Show */}
        <Route path="/clothing/show/showelectric" element={<ShowElectric />} />
        <Route path="/clothing/show/showmen" element={<ShowMen />} />

        {/* User */}
        <Route path="/user/dashboard" element={<Dashboard />} />
        <Route path="/user/login" element={<Login />} />
        <Route path="/user/signup" element={<Signup />} />

        {/* Cart */}
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </Router>
  );
}

export default App;
