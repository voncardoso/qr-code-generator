import { useEffect, useState } from "react";
import { Container } from "./style";

export function LoadingAnimacao() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    function updateStep() {
      setStep((step) => {
        if (step < 2) {
          return step + 1;
        } else {
          return 0;
        }
      });
    }

    const interval = setInterval(updateStep, 200);
    return () => {
      clearInterval(interval);
    };
  }, []);

  function displayStep(i) {
    return {
      display: step === i ? "block" : "none",
    };
  }
  return (
    <Container>
      <div style={displayStep(2)}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="192"
          height="192"
          fill="#003DA7"
          viewBox="0 0 256 256"
        >
          <rect width="256" height="256" fill="none"></rect>
          <line
            x1="96"
            y1="56"
            x2="96"
            y2="200"
            fill="none"
            stroke="#003DA7"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="16"
          ></line>
          <path
            d="M24,167.2a7.9,7.9,0,0,1,6.4-7.8,32.1,32.1,0,0,0,0-62.8A7.9,7.9,0,0,1,24,88.8V64a8,8,0,0,1,8-8H224a8,8,0,0,1,8,8V88.8a7.9,7.9,0,0,1-6.4,7.8,32.1,32.1,0,0,0,0,62.8,7.9,7.9,0,0,1,6.4,7.8V192a8,8,0,0,1-8,8H32a8,8,0,0,1-8-8Z"
            fill="none"
            stroke="#003DA7"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="16"
          ></path>
        </svg>
      </div>
    </Container>
  );
}
