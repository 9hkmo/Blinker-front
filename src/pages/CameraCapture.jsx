import React, { useEffect, useRef, useState } from 'react';
import { usePostStore } from '../store/usePostStore'; // 경로는 프로젝트에 따라 조정

const CameraCapture = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const imageBlobsRef = useRef([]);
  const [capturing, setCapturing] = useState(false);

  // ✅ Zustand 전역 상태 업데이트 함수 가져오기
  const setImages = usePostStore((state) => state.setImages);

  useEffect(() => {
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error('카메라 접근 실패', err);
      }
    };
    startCamera();
  }, []);

  const startCapturing = () => {
    setCapturing(true);
    let count = 0;
    const totalFrames = 300; // 몇장
    const interval = 100; // 0.1초마다 찍음

    const intervalId = setInterval(() => {
      if (!canvasRef.current || !videoRef.current) return;

      const ctx = canvasRef.current.getContext('2d');
      const video = videoRef.current;
      const canvas = canvasRef.current;

      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

      canvas.toBlob((blob) => {
        if (blob) {
          const file = new File([blob], `capture_${count}.jpg`, {
            type: 'image/jpeg',
          });
          imageBlobsRef.current.push(file);
        }
      }, 'image/jpeg');

      count += 1;
      if (count >= totalFrames) {
        clearInterval(intervalId);
        setCapturing(false);

        // ✅ Zustand에 이미지 배열 저장
        setImages(imageBlobsRef.current);
        console.log('300장 저장 완료 ✅');
      }
    }, interval);
  };

  useEffect(() => {
    console.log(imageBlobsRef.current);
  }, [imageBlobsRef]);

  return (
    <div>
      <h2>카메라 캡처 (300장)</h2>
      <video ref={videoRef} autoPlay playsInline style={{ width: '300px' }} />
      <canvas ref={canvasRef} style={{ display: 'none' }} />
      <button onClick={startCapturing} disabled={capturing}>
        {capturing ? '촬영 중...' : '30초 촬영 시작'}
      </button>
    </div>
  );
};

export default CameraCapture;
