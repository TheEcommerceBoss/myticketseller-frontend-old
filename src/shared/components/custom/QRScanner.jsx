import { useEffect, useState, useRef } from "react";
import { Html5Qrcode } from "html5-qrcode";
import PropTypes from "prop-types";

const QRScanner = ({ setValue, value, handleScan }) => {
  const [result, setResult] = useState("No result");
  const [error, setError] = useState("");
  const [isScanning, setIsScanning] = useState(false);
  const scannerRef = useRef(null);

  useEffect(() => {
    const scanner = new Html5Qrcode("qr-reader");
    scannerRef.current = scanner;

    const startScanner = async () => {
      try {
        // Get available cameras
        const devices = await Html5Qrcode.getCameras();
        if (devices && devices.length) {
          const config = { fps: 10, qrbox: { width: 250, height: 250 } };
          // Start scanner with back camera
          await scanner.start(
            { facingMode: "environment" },
            config,
            (decodedText) => {
              setValue ? setValue(decodedText) : setResult(decodedText);
              handleScan && handleScan(decodedText);
              setError("");
              // Optionally stop scanning after successful scan
              scanner.stop();
              setIsScanning(false);
            },
            (err) => {
              // Suppress repetitive "No QR code detected" errors
              if (err.message.includes("No barcode or QR code detected")) {
                setError("No QR code detected. Please align the QR code.");
              }
            }
          );
          setIsScanning(true);
        } else {
          setError("No cameras found on this device.");
        }
      } catch (err) {
        setError(`Failed to start scanner: ${err.message}`);
        console.error("Scanner error:", err);
      }
    };

    startScanner();

    // Cleanup on unmount
    return () => {
      if (scannerRef.current) {
        scannerRef.current
          .stop()
          .catch((err) => console.error("Stop failed:", err));
      }
    };
  }, []);

  return (
    <div style={{ textAlign: "center" }}>
      <h2>QR Code Scanner</h2>
      <div
        id="qr-reader"
        style={{
          width: "300px",
          height: "300px",
          margin: "0 auto",
          border: isScanning ? "2px solid green" : "2px solid red",
        }}
      ></div>
      <p style={{ color: error ? "red" : "black" }}>
        {error || `Scanned Result: ${value || result}`}
      </p>
      {!isScanning && error && (
        <button
          onClick={() => window.location.reload()}
          style={{ padding: "10px", marginTop: "10px" }}
        >
          Retry
        </button>
      )}
    </div>
  );
};
QRScanner.propTypes = {
  setValue: PropTypes.func || undefined,
  value: PropTypes.string || undefined,
  handleScan: PropTypes.func || undefined,
};

export default QRScanner;
