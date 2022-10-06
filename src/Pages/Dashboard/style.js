import styled from "styled-components";

export const Container = styled.section`
  margin: 0 auto;
  width: 100%;
  padding: 0px 80px;
  header {
    ul {
      position: relative;
      top: -70px;
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      gap: 30px;
      padding: 10px 10px;
      overflow-x: auto;
      li {
        max-width: 400px;
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
          font-size: 2rem;
        }
      }
    }
  }
  span {
    display: flex;
    justify-content: space-between;
    input {
      padding: 5px;
      border-radius: 5px;
      font-size: 1rem;
      margin-bottom: 20px;
    }

    a {
      padding: 10px 15px;
      background: var(--blue-400);
      height: 100%;
      border-radius: 5px;
      color: white;
      text-decoration: none;
      cursor: pointer;
    }

    a:hover {
      background: rgb(0, 61, 167, 40%);
    }
  }

  table {
    margin: 0 auto;
    width: 100%;
    text-align: left;
    border-collapse: collapse;
    border-radius: 10px;
    overflow: auto;
    margin-bottom: 10px;
    thead,
    th {
      color: var(--text);
      text-align: center;
      font-weight: bold;
      color: #9baebf;
      padding: 10px 8px;
      font-size: 1.125rem;
      text-align: left;
      padding: 10px 30px;
    }

    th:last-child {
      width: 60px;
      text-align: center;
    }

    tbody {
      border-radius: 10px;
      tr {
        margin-bottom: 40px;

        td {
          padding: 10px 10px;
          font-size: 1.125rem;
          background: var(--white);
          max-width: 200px;
          width: 25%;
          padding: 10px 20px;
          border-bottom: 5px solid var(--background);
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
          text-align: center;
        }

        td:first-child {
          border-bottom-left-radius: 10px;
          border-top-left-radius: 10px;
        }
      }
    }
  }

  div {
    background: var(--white);
    border-radius: 10px;
    color: #9baebf;
    display: none;
    ul {
      display: grid;
      grid-template-columns: 1fr;
      gap: 10px;
      padding: 20px;
      li {
        color: var();
        display: flex;
        padding: 10px 0px;
        P {
          margin-left: 10px;
          color: var(--text);
        }

        button {
          width: 100%;
          padding: 10px;
          border: none;
          border-radius: 10px;
          background: var(--blue-400);
          color: var(--white);
        }

        .verificado {
          width: 100%;
          padding: 10px;
          border: none;
          border-radius: 10px;
          background: transparent;
          color: green;
        }
      }

      li:last-child {
        grid-column: 1 / 4;
      }

      .valor {
        grid-column: 1 / 2;
      }

      .area {
        width: 110px;
        position: relative;
        left: 10px;
      }
    }
  }

  @media (max-width: 823px) {
    padding: 0px 40px;
    header {
      ul {
        li {
          min-width: 200px;
        }
      }
    }
  }

  @media (max-width: 556px) {
    padding: 0px 40px;
    table {
      th {
        font-size: 1rem;
      }

      tbody {
        td {
          font-size: 0.875rem;

          button {
            font-size: 0.875rem;
            font-weight: 400;
            padding: 10px 10px;
          }
        }
      }
    }
  }

  @media (max-width: 517px) {
    div {
      display: block;
    }
    table {
      display: none;
    }
  }
`;
