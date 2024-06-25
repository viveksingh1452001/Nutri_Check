import React from 'react'
import './myth.css'

import data from '../data.json'
// import HeartSVG from '../components/HeartSVG'

function Myth() {
  return (
    <ul className='mythCard'>
        {data && data.map((item)=>(
            <li key={item.id}>
              <h3>{item.name}   </h3>
              <p>{item.description}   </p>
              
          </li>
        ))}
        
    </ul>
    
  )
}

export default Myth