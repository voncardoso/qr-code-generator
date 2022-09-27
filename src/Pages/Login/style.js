import styled from "styled-components";



export const Container = styled.section`
  display: grid;
  grid-template-columns: 1fr 1fr;
  height: 100vh;
  align-items: center;
  justify-items: center;
  max-width: 100%;
  margin: 0 auto;

  form {
    display: flex;
    flex-direction: column;
    max-width: 515px;
    width: 100%;
    gap: 30px;
    padding: 0 30px;

    h1 {
      margin-bottom: 40px;
      font-size: 30px;
    }

    div {
      display: flex;
      flex-direction: column;
      width: 100%;

      input {
        margin-top: 10px;
        height: 30px;
        border-radius: 10px;
        border: transparent;
        box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
        padding: 20px 5px;

      }

    }

      button {
        background: var(--blue-300);
        border-radius: 10px;
       padding: 10px 0;
       color: white;
       font-size: 20px;
      }


  }

  .containerImg {
    width: 100%;
    overflow: hidden;
    height: 100vh;

    img {
      width: 100%;
      height: 100vh;
      object-fit: cover;
    }
  }

  @media (max-width: 890px) {
    
    grid-template-columns: 1fr;

    .containerImg {
    display: none;
    }

  }

`;


