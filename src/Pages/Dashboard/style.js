import styled from "styled-components";

export const Container = styled.section`
  header {
    width: 90vw;
    margin: 0 auto;
    padding: 0px 30px;
    ul {
      position: relative;
      top: -70px;
      display: flex;
      justify-content: space-between;
      gap: 30px;
      li {
        max-width: 600px;
        width: 100%;
        border-radius: 10px;
        padding: 20px 30px;
        background: var(--white);
        box-shadow: 2px 2px 10px 2px rgba(0, 0, 0, 25%);
        div {
          margin-bottom: 10px;
          display: flex;
          justify-content: space-between;

          svg {
            height: 100%;
          }
        }

        strong {
          font-size: 3rem;
        }
      }
    }
  }
`;
