import { useContext, useEffect, useRef, useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../Config/config";
import { QrReader } from "react-qr-reader";
import { UserContext } from "../../Context/useContext";
import { Container } from "./style";

export function QRcode1() {
  const { data } = useContext(UserContext);
  const [dataQrcode, setDataQrcode] = useState("No result");
  const [isActiveQrCode, setIsActiveQrCode] = useState("block");
  const [confirmQrCode, setConfirmQrCode] = useState("none");

  useEffect(() => {
    if (dataQrcode === "No result") {
      setIsActiveQrCode("block");
      setConfirmQrCode("none");
    }

    data.map((item) => {
      if (item.count == dataQrcode && item.active === false) {
        verifyQrCode(item.active, item.id);
      } else {
        console.log("igresso ja foi confirmado");
      }
    });
  }, [dataQrcode]);

  async function verifyQrCode(id) {
    console.log("foi-------------------");
    const washingtonRef = doc(db, "tickets", id);
    try {
      await updateDoc(washingtonRef, {
        active: true,
      });
      setIsActiveQrCode("none");
      setConfirmQrCode("block");
    } catch {
      console.log("erro");
    }
  }

  return (
    <Container>
      <div style={{ display: isActiveQrCode }}>
        <QrReader
          constraints={{ facingMode: "none" }}
          onResult={(result, error) => {
            if (!!result) {
              setDataQrcode(result?.text);
            }

            if (!!error) {
            }
          }}
          style={{ width: "100%" }}
        />
        <p>{dataQrcode}</p>
      </div>

      <div style={{ display: confirmQrCode }}>Ingresso Confirmado</div>
    </Container>
  );
}
