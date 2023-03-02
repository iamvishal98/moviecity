import React from 'react';
import './home.scss';
import Herobanner from '../../components/banner/Herobanner';


const Home = () => {
  return (
    <div className='home_conatiner'>
      <Herobanner />
      <div style={{height:'150vh'}}></div>
    </div>
  )
}

export default Home