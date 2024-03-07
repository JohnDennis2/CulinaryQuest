import './App.css';
import { Outlet } from 'react-router-dom';

import Header from './pages/Header';
import Footer from './pages/Footer';

function App() {
  return (
    <div className="container" >
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}

export default App;