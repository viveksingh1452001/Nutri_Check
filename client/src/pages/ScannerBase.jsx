import React from 'react'
import './ScannerBase.css'

function ScannerBase({data}) {
  return (
    <>
    <div className="card">
  <div className="card__border" />
  <div className="card_title__container">
    <span className="card_title">Nutrient Table</span>
    <p className="card_paragraph">
      this is the overall score:
    </p>
  </div>
  <hr/>
  {data && (
      <ul>
      <li>{data.product}</li>
    </ul>
  )}
  
  
  <button className="button">Book a Call</button>
</div>

    </>
  )
}

export default ScannerBase