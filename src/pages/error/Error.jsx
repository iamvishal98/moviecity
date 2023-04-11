import React from 'react'
import ContentWrapper from '../../components/contentwrapper/ContentWrapper'
import { Link } from 'react-router-dom'

const Error = () => {
  return (
    <div style={{color:'white',minHeight:'70vh',display:'flex',alignItems:'center',justifyContent:'center',flexDirection:'column'}}>
      <h1>Not a Valid page</h1>
      <h2 style={{marginTop:'20px'}}>
        <Link to='/'>
        Return to Home
        </Link>
        </h2>
    </div>
  )
}

export default Error