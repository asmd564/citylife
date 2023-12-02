import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/authContext';
import './App.css';
import { Header } from './components/header/header';
import { HomePagge } from './pages/mainPage/homePagge';
import { Footer } from './components/footer/footer';
import Map from './components/blocks/map/map';
import { ProductDetails } from './components/productDetails/prpductDetails';
import { Admin } from './admin/admin';
import { AdminHeader } from './components/header/adminHeader/adminHeader';
import { About } from './pages/about/about';
import { Reviews } from './components/reviews/reviews';
import { ForBuyers } from './pages/forBuyers/forBuyers';
import { ForSellers } from './pages/forSellers/forSellers';
import { Objects } from './pages/objects/objects';
import { Test } from './components/test';
import { Favorite } from './pages/favorite/favorite';


function App() {
  return (
    <BrowserRouter>
       <AuthProvider>
          <div className="App">
            <ConditionalHeader />
              <Routes>
                <Route path="/" element={<HomePagge /> }/>
                <Route path="/for-buyers" element={<ForBuyers /> }/>
                <Route path="/for-sellers" element={<ForSellers /> }/>
                <Route path="contact" element={<Map />} />
                <Route path="reviews" element={<Reviews />} />
                <Route path="objects" element={<Objects />} />
                <Route path="about" element={<About />} />
                <Route path="/products/:id" element={<ProductDetails />} />
                <Route path="/admin/*" element={<Admin />}/>
                <Route path="/favorite" element={<Favorite />}/>

              </Routes>
            <ConditionalFooter />
          </div>
        </AuthProvider>
    </BrowserRouter>
  );
}

function ConditionalHeader() {
  const location = useLocation();

  if (location.pathname.startsWith('/admin')) {
    return;
  } else {
    return <Header />;
  }
}

function ConditionalFooter() {
  const location = useLocation();
  if (location.pathname.startsWith('/admin')) {
    return null;
  } else {
    return <Footer />;
  }
}

export default App;
