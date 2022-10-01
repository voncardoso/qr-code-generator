import { useEffect, useRef, useState } from "react";
import { QrReader } from "react-qr-reader";

export function QRcode1() {
  const [data, setData] = useState("No result");

  return (
    <div>
      <h1>teste</h1>
      <QrReader
        onResult={(result, error) => {
          if (!!result) {
            setData(result?.text);
            console.log("dados", data);
          }

          if (!!error) {
            console.info(error);
          }
        }}
        style={{ width: "100%" }}
      />
      <p>{data}</p>
    </div>
  );
}
