import React from 'react';
import './home.scss';
import Herobanner from '../../components/banner/Herobanner';
import Trending from './trending/Trending';
import Popular from './popular/Popular';
import TopRated from './toprated/TopRated';


const Home = () => {
  return (
    <div className='home_conatiner'>
      <Herobanner />
      <Trending />
      <Popular />
      <TopRated />
    </div>
  )
}

export default Home