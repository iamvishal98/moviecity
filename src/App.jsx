import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useFetch from './utils/useFetch';
import { BrowserRouter,Route,Routes} from 'react-router-dom';
import Home from './pages/home/Home';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import Details from './pages/details/Details';
import Explore from './pages/explore/Explore';
import Search from './pages/search/Search';
import Error from './pages/error/Error';
import { getApiConfigurations } from './store/slicer/HomeSlice';


function App() {
  const {data} = useFetch('/configuration');
  const dispatch = useDispatch();

  useEffect(() => {
    const url = {
      backdrop: data?.images.secure_base_url + "original",
      poster: data?.images.secure_base_url + "original",
      profile: data?.images.secure_base_url + "original",
    };
    dispatch(getApiConfigurations(url));

  },[data]);
  

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/:mediatype/:id' element={<Details />} />
          <Route path='/explore/:mediattype' element={<Explore />} />
          <Route path='/search/:query' element={<Search />} />
          <Route path='*' element={<Error />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
