import React, { useState } from 'react';
import './switchbutton.scss';

const SwitchButton = ({data,handleSwitch}) => {

  const [selection,SetSelection] = useState(0);
  const [left,setLeft]=useState(0);

  const activeItem = (item,index) => {
    setLeft(index*100);
    SetSelection(index)
    handleSwitch(item,index);
  }

  return (
    <div className='switchButton'>
      <div className="switchItems">
        {data.map((item,index) => (
          <span key={index} 
            className={`switchItem ${selection === index ? "active" : ""}`} 
            onClick={() => activeItem(item,index)}
          >  
            {item}
          </span>
        ))}
        <span className="switchingBg" style={{left}}/>
      </div>
    </div>
  )
}

export default SwitchButton