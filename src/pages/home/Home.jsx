import React from 'react';
import './home.scss';
import Herobanner from '../../components/banner/Herobanner';
import Trending from './trending/Trending';


const Home = () => {
  return (
    <div className='home_conatiner'>
      <Herobanner />
      <Trending />
      <div style={{height:'150vh'}}></div>
    </div>
  )
}

export default Home