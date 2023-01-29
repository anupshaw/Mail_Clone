import React from 'react'
import './CSS/sidebaroptions.css'

function Sidebaroptions(props) {
    const {ICON,title,number,isactive}=props;
  return (
    <div className={`sidebaroptions ${isactive && 'sidebaroptions--active'}`} onClick={()=>props.onClick()}>
      <ICON className='inbox_icon' />
      <h4>{title}</h4>
      <p>{number}</p>
    </div>
  )
}

export default Sidebaroptions
