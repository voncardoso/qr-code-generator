import styled from "styled-components";

export const Container = styled.section`
  width: 100vw;
  height: 100vh;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.25);
  div {
    width: 100vw;
    padding: 0px;

    video {
      height: 400px;
    }
  }

  .confirm {
    width: 300px;
    background: #fff;
    padding: 20px;
    border-radius: 5px;
    text-align: center;
    h3 {
      margin-top: 5px;
      color: var(--green-300);
    }
    svg {
      margin: 0 auto;
      color: var(--green-300);
    }
    button {
      margin-top: 20px;
      padding: 10px;
      border: none;
      border-radius: 5px;
      font-size: 1rem;
      width: 100%;
      font-weight: bold;
      color: var(--white);
      background: var(--green-300);
    }
  }
`;
