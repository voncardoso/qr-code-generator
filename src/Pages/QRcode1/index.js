import { useContext, useEffect, useRef, useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../Config/config";
import { QrReader } from "react-qr-reader";
import { UserContext } from "../../Context/useContext";
import { Container } from "./style";
import { CheckCircle } from "phosphor-react";

export function QRcode1() {
  const { data } = useContext(UserContext);
  const [dataQrcode, setDataQrcode] = useState("No result");
  const [isActiveQrCode, setIsActiveQrCode] = useState("block");
  const [confirmQrCode, setConfirmQrCode] = useState("none");
  const [error, setError] = useState("none");

  useEffect(() => {
    function teste() {
      if (dataQrcode === "No result") {
        setIsActiveQrCode("block");
        setConfirmQrCode("none");
      }

      data.map((item) => {
        if (item.count == dataQrcode && item.active === false) {
          verifyQrCode(item.id);
        }
        if (item.count === dataQrcode && item.active === true) {
          ticketsExistes();
        }
      });
    }

    let tete4 = data.filter((item) => item.count.includes(dataQrcode));

    if (tete4.length === 0) {
      setError("ingresso não existe");
      setIsActiveQrCode("none");
      setConfirmQrCode("block");
    }

    teste();
  }, [dataQrcode]);

  async function verifyQrCode(id) {
    console.log("foi-------------------");
    const washingtonRef = doc(db, "tickets", id);
    try {
      await updateDoc(washingtonRef, {
        active: true,
      });
      setError("confirmado");
      setIsActiveQrCode("none");
      setConfirmQrCode("block");
    } catch {
      console.log("erro");
    }
  }

  function ticketsExistes() {
    setIsActiveQrCode("none");
    setConfirmQrCode("block");
    return setError("igresso ja foi confirmado");
  }

  //  constraints={{ facingMode: "environment" }}

  return (
    <Container>
      <div style={{ display: isActiveQrCode }}>
        <QrReader
          constraints={{ facingMode: "environment" }}
          onResult={(result, error) => {
            if (!!result) {
              setDataQrcode(result?.text);
            }

            if (!!error) {
            }
          }}
          style={{ width: "100%" }}
        />
      </div>

      <div className="confirm" style={{ display: confirmQrCode }}>
        <CheckCircle size={80} />
        <h3>Nº {dataQrcode}</h3>
        <h3>{error}</h3>
        <button
          onClick={() => {
            window.location.reload();
          }}
        >
          Continuar
        </button>
      </div>
    </Container>
  );
}
