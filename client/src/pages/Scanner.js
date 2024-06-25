import React, { useState, useEffect } from "react";
import Quagga from "quagga";

 import "./Scanner.css";
import FileUpload from "../components/FileUpload";

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
        setData(null);
        if (!barcode) return; // Return if scannedBarcode is null or undefined
        setLoading(true);
        const response = await fetch(
          `https://world.openfoodfacts.org/api/v3/product/${barcode}.json`
        );

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
    <>
    <section>
      <div>
        
      </div>
    </section>
     <div className="containers">
        <section className="contain1">
        <h1 >Barcode</h1>
        <FileUpload/>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="input1"
          id="file"
        />
        <p
            onClick={() => {
              setData(null);
              setImageSrc(null);
              setBarcode(null);
            }}
            className="btn-del"
          ><i className="fa-regular fa-trash-can"></i></p>
      </section>
      <div className="contain2">
      {imageSrc && (
        <div className="">
          <h2>Selected Image</h2>
          <img
            src={imageSrc}
            alt="Selected barcode"
            style={{ width: "50%", height: "50%", position:"relative",  }}
          />
        </div>
      )}
      {loading && "Loading..."}
      {barcode && <p>Barcode Number: {barcode}</p>}
      {error && <p>Error: {error}</p>}

      {/* {data && <ScannerBase handleData={data} />} */}
      {data && (
        <div>
          <h2>Product Details:</h2>
          <p>Name: {data.product?.product_name}</p>
          <p>Brand: {data.product?.brands}</p>
          <p>Categories: {data.product.categories}</p>
          <p>Country: {data.product.countries}</p>
          <p>ecoscore: {data.product.ecoscore_grade}</p>
          <p>ingredient: {data.product.ingredients_text}</p>
          <p>total: {data.product.ingredients_n}</p>
          <p>quantity: {data.product.quantity}</p>
          <p>packaging: {data.product.packaging}</p>
          <p>labels: {data.product.labels}</p>
          <p>serving size: {data.product.serving_size}</p>
          <p>nova group: {data.product.nova_group}</p>
          <p>nutri score: {data.product.nutriscore_grade}</p>
          {/* <p>nova group tag: {data.product.nova_groups_tag}</p> */}
          <p>website: <a href={data.product.link} target="_blank" rel="noreferrer" style={{color:"white"}}>{data.product.link}</a></p>

          
          
          <p>common name: {data.product.generic_name_en}</p>
          {/* <p>quantity: {data.product?.nutriscore[0].grade}</p> */}
          {/* <p>vegetarian: {data.product.ingredients[0].vegetarian}</p> */}
          
        </div>
      )}
    </div>
      </div>
     
    </>



   
  );
};

export default Scanner;
