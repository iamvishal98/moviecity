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
import { getApiConfigurations,getGenres } from './store/slicer/HomeSlice';
import { fetchDataFromApi, fetchGenre } from './utils/api';


function App() {
  //const {data} = useFetch('/configuration');
  const dispatch = useDispatch();


  useEffect(() => {
    fetchDataFromApi('/configuration').then((data) => {
    const url = {
      backdrop: data?.images.secure_base_url + "original",
      poster: data?.images.secure_base_url + "original",
      profile: data?.images.secure_base_url + "original",
    };
    dispatch(getApiConfigurations(url));
    }
    ).catch((err) => {console.log(err)});


    fetchGenre().then((response) => {
      dispatch(getGenres(response))
    }).catch((err) => {console.log(err)});

  },[]);
  

  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/:mediaType/:id' element={<Details />} />
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
