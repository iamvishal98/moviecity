import React from 'react';
import { useSelector } from 'react-redux';
import useFetch from './utils/useFetch';
import { BrowserRouter,Route,Routes} from 'react-router-dom';
import Home from './pages/home/Home';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import Details from './pages/details/Details';
import Explore from './pages/explore/Explore';
import Search from './pages/search/Search';
import Error from './pages/error/Error';


function App() {
  useFetch("/movie/popular");
  const data = useSelector(state => state.home.url);
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/:mediatype/:id' element={<Details />} />
          <Route path='/explore/:mediattype' element={<Explore />} />
          <Route path='/search/:query' element={<Search />} />
          <Route path='*' element={<Error />} />

        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  )
}

export default App
