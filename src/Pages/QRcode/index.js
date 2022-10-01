import { useEffect, useRef } from "react";
import QRCode from "qrcode";

export function QRcode({ count }) {
  const canvas = useRef();

  useEffect(() => {
    QRCode.toCanvas(canvas.current, count);
  }, [count]);
  return (
    <div>
      <canvas ref={canvas} id="canvas"></canvas>
    </div>
  );
}
