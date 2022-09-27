import styled from "styled-components";

export const Container = styled.section`
  width: 90vw;
  margin: 0 auto;
  padding: 0px 30px;
  header {
    ul {
      overflow-x: auto;
      position: relative;
      top: -70px;
      display: flex;
      justify-content: space-between;
      gap: 30px;
      padding: 10px 10px;
      li {
        max-width: 600px;
        width: 100%;
        border-radius: 10px;
        padding: 20px 30px;
        background: var(--white);
        box-shadow: 4px 4px 5px 2px rgba(0, 0, 0, 25%);
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

  table {
    margin: 0 auto;
    width: 100%;
    text-align: center;
    border-collapse: collapse;
    border-radius: 10px;

    thead,
    th {
      color: var(--text);
      text-align: center;
      font-weight: bold;
      color: #9baebf;
      padding: 10px 10px;
      font-size: 1.125rem;
    }

    tbody {
      border-radius: 10px;
      td {
        padding: 10px 10px;
        font-size: 1.125rem;
        background: var(--white);
        max-width: 200px;
        width: 25%;
        button {
          background: var(--blue-400);
          padding: 10px 20px;
          color: var(--white);
          font-weight: 600;
          border: none;
          border-radius: 5px;
        }
      }
      td:last-child {
        border-bottom-right-radius: 10px;
        border-top-right-radius: 10px;
      }

      td:first-child {
        border-bottom-left-radius: 10px;
        border-top-left-radius: 10px;
      }
    }
  }
`;
