import React, { useEffect, useState } from "react";
import Quagga from "quagga";

const Scanner = ({ onScan }) => {
  const [scanning, setScanning] = useState(true);

  useEffect(() => {
    const initScanner = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: false,
        });

        Quagga.init(
          {
            inputStream: {
              name: "Live",
              type: "LiveStream",
              target: document.querySelector("#scanner-container"),
              constraints: {
                facingMode: "environment", // Use rear camera for mobile devices
              },
            },
            decoder: {
              readers: ["ean_reader"], // Enable EAN-13 code reader
            },
          },
          function (err) {
            if (err) {
              console.error("Error initializing Quagga:", err);
              return;
            }
            console.log("Quagga initialized successfully");

            Quagga.start();
          }
        );

        Quagga.onDetected((data) => {
          if (data.codeResult && scanning) {
            console.log("Barcode detected and processed", data.codeResult.code);
            setScanning(false); // Stop scanning further
            onScan(data.codeResult.code); // Pass scanned code to parent component
            Quagga.stop();
          }
        });

        return () => {
          Quagga.stop();
          stream.getTracks().forEach((track) => track.stop());
        };
      } catch (error) {
        console.error("Error accessing camera:", error);
      }
    };

    initScanner();
  }, [onScan, scanning]);

  return <div id="scanner-container" style={{ width: "10px", height: "10px",  }}></div>;
};

export default Scanner;
