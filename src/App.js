import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { Header } from './components/header/header';
import { HomePagge } from './pages/mainPage/homePagge';
import { Footer } from './components/footer/footer';
import Map from './components/blocks/map/map';
import { ProductDetails } from './components/productDetails/prpductDetails';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<HomePagge />}/>
          <Route path="contact" element={<Map />} />
          <Route path="/products/:id" element={<ProductDetails />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
