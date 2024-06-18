import React, { useState, useEffect } from "react";
import Quagga from "quagga";
import ScannerBase from "./ScannerBase";
import Loader from "../components/Loader";
import './Scanner.css'

const Scanner = ({ onBarcodeScan }) => {
  const [barcode, setBarcode] = useState(null);
  const [imageSrc, setImageSrc] = useState(null);

  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (event) => {
    //onBarcodeScan(null);
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
       
        setImageSrc(e.target.result);
        decodeBarcode(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const decodeBarcode = (src) => {
    Quagga.decodeSingle(
      {
        decoder: {
          readers: ["ean_reader", "code_128_reader"], // List of active readers
        },
        locate: true, // try to locate the barcode in the image
        src: src,
      },
      function (result) {
        console.log(result);
        if (result && result.codeResult) {
          console.log("result", result.codeResult.code);
          setBarcode(result.codeResult.code);
         // onBarcodeScan(result.codeResult.code); // Callback to parent component
        } else {
          console.log("not detected");
          setBarcode("Not detected");
          //onBarcodeScan("Not detected"); // Callback to parent component
        }
      }
    );
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        //setLoading(true);
        setData(null)
        if (!barcode) return; // Return if scannedBarcode is null or undefined
        setLoading(true);
        const response = await fetch(`https://world.openfoodfacts.org/api/v3/product/${barcode}.json`);
        
        if (!response.ok) {
          throw new Error("Product not found/ code not scanned");
        }

        const jsonData = await response.json();
        console.log("API Response:", jsonData);
        setData(jsonData);
        setError(null);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, [barcode]);

  

  return (
    <div>
            <h1>Barcode Scanner</h1>
      {loading && <Loader/>}
      {/* <input type="file" accept="image/*" onChange={handleFileChange} /> */}

      

{!data && (
  <div class="input-div">
  <input class="input" name="file" accept="image/*" type="file" onChange={handleFileChange}/>
<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" stroke-linejoin="round" stroke-linecap="round" viewBox="0 0 24 24" stroke-width="2" fill="none" stroke="currentColor" class="icon"><polyline points="16 16 12 12 8 16"></polyline><line y2="21" x2="12" y1="12" x1="12"></line><path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"></path><polyline points="16 16 12 12 8 16"></polyline></svg>
</div>
)}





      {imageSrc && (
        <div>
          <h2>Selected Image</h2>
          <img
            src={imageSrc}
            alt="Selected barcode"
            style={{ width: "50%", height: "auto",position:"relative",  }}
          />
        </div>
      )}
      {barcode && <p>Barcode Number: {barcode}</p>}
      {error && <p>Error: {error}</p>}
       
        {data && <ScannerBase handleData={data}/>}
      {data &&  (
        <div>
          <h2>Product Details:</h2>
          <p>Name: {data.product?.product_name}</p>
          <p>Brand: {data.product?.brands}</p>
          <p>Categories: {data.product.categories}</p>
          <p>Country: {data.product.countries}</p>
          <p>ecoscore: {data.product.ecoscore_grade}</p>
          {/* <p>vegetarian: {data.product.ingredients[0].vegetarian}</p> */}
          <button onClick={()=>{
            setData(null)
            setImageSrc(null);
            setBarcode(null)
            }}/>
        </div>
        
      )}
      
    </div>
  );
};

export default Scanner;
