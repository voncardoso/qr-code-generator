import styled from "styled-components";

export const Container = styled.div`
  z-index: 6000;
  height: 100vh;
  width: 100vw;
  position: fixed;
  background: rgba(0, 0, 0, 0.15);
  display: flex;
  justify-content: center;
  align-items: center;
  div {
    // background: #ffffff;
    padding: 20px;
    border-radius: 50%;
  }
  svg {
    width: 100px;
    height: 100px;
  }
`;
