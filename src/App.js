import { useState } from 'react';
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
import { Contacts } from './components/blocks/contacts/contacts';
import { Close } from './icons/close';


function App() {
  const [contact, setContact] = useState(false);
  
  const handleOpen = () => {
    setContact(true);
  }

  const handleClose = () => {
    setContact(false);
  }
  return (
    <BrowserRouter>
       <AuthProvider>
          <div className="App">
            <ConditionalHeader callback={handleOpen}/>
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
              {contact && (
                <div className='contacts__fixed'>
                  <div className='contacts__wrapper__fixed'>
                    <button className='contacts__close' onClick={handleClose}><Close /></button>
                    <Contacts />
                  </div>
                  
                </div>
                
              )}

            <ConditionalFooter />
          </div>
        </AuthProvider>
    </BrowserRouter>
  );
}

function ConditionalHeader({callback}) {
  const location = useLocation();

  if (location.pathname.startsWith('/admin')) {
    return;
  } else {
    return <Header callback={callback}/>;
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
