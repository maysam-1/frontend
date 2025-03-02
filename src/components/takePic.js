import React, { useState, useRef } from 'react';

function TakePic({ onCapture }) {
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null); // State for captured image

  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const handleTakePhoto = async () => {
    console.log('handleTakePhoto called'); // Add this line
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      console.log('getUserMedia successful:', stream);
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsCameraActive(true); // Set camera to active here
        console.log('isCameraActive set to true'); // Confirm state change
      }else{            console.log('videoRef.current is null'); // Check ref
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
    }
  };

  const captureSnapshot = () => {
    if (videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current;
      const video = videoRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
      const dataURL = canvas.toDataURL('image/png');
      onCapture(dataURL);
      setCapturedImage(dataURL)
      if (videoRef.current.srcObject) {
        videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
      }
    }
  };
  console.log(videoRef);
    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <button type="button" onClick={handleTakePhoto}>
            Take Photo
          </button>
    
          <div style={{ display:"flex",flexDirection:"column", position:"fixed",top:"100px",left:"200px"}}>
            <video
              ref={videoRef}
              autoPlay
              playsInline
              style={{
                maxWidth: '330px',
                maxHeight: '230px',
                borderRadius: '8px',
            
              }}
            />
             
            {isCameraActive && (
              <div
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                }}
              >
                <canvas ref={canvasRef} style={{ display: 'none' }} />
               
                {capturedImage && (
            <img
              src={capturedImage}
              alt="Captured"
              style={{
                maxWidth: '330px',
                maxHeight: '230px',
                borderRadius: '8px',
                border: '2px solid #ccc',
                marginTop: '520px',
              }}
            />

          )}
              </div>
              
            )}{isCameraActive&&<button style={{position:"fixed",top:"300px",left:"550px"}} type="button" onClick={captureSnapshot}>
            Capture
          </button>}
           
          </div>
          
 
        </div>
      );
}

export default TakePic;