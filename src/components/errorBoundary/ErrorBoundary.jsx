import React from "react";
import { Link } from "react-router-dom";

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  reset() {
    this.setState({hasError:false})
  }


  render() {
    if (this.state.hasError) {
      return (
      <div style={{height: '100vh',color:'white',display:'flex',alignItems:'center',justifyContent:'center',flexDirection:'column'}}>
      <h1>Something went wrong</h1>
      <Link to="/" onClick={() => this.reset()} style={{color:'inherit',marginTop:'20px'}}>Back to Home</Link>
      </div>
      )
    }

    return this.props.children; 
  }
}