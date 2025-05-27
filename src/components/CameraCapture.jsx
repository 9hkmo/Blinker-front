// CameraCapture.jsx
import { useEffect, useRef } from "react";
import { usePostStore } from "../store/usePostStore";

const CameraCapture = ({ allow, setAllow, quizStart, setCameraStatus }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const imageBlobsRef = useRef([]);
  const setImages = usePostStore((state) => state.setImages);

  useEffect(() => {
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          setAllow(true);
          setCameraStatus("granted"); // ✅ 권한 허용됨
        }
      } catch (err) {
        console.error("카메라 접근 실패", err);
        setCameraStatus("denied"); // ❌ 거부됨
      }
    };
    startCamera();
  }, []);

  useEffect(() => {
    if (allow && quizStart) {
      startCapturing();
    }
  }, [allow, quizStart]);

  const startCapturing = () => {
    let count = 0;
    const totalFrames = 300;
    const interval = 100;

    const intervalId = setInterval(() => {
      if (!canvasRef.current || !videoRef.current) return;

      const ctx = canvasRef.current.getContext("2d");
      const video = videoRef.current;
      const canvas = canvasRef.current;

      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      ctx.drawImage(video, 0, 0, canvas.width*0.5, canvas.height*0.5);

      canvas.toBlob((blob) => {
        if (blob) {
          const file = new File([blob], `capture_${count}.jpg`, {
            type: "image/jpeg",
          });
          imageBlobsRef.current.push(file);
        }
      }, "image/jpeg", 0.5);

      count += 1;
      if (count >= totalFrames) {
        clearInterval(intervalId);
        setImages(imageBlobsRef.current);
        console.log("✅ 300장 캡처 완료");
      }
    }, interval);
  };

  return (
    <>
      <video ref={videoRef} autoPlay playsInline style={{ display: "none" }} />
      <canvas ref={canvasRef} style={{ display: "none" }} />
    </>
  );
};

export default CameraCapture;
