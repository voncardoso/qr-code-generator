import styled from "styled-components";

export const Container = styled.section`
  margin: 0 auto;
  width: 100%;
  padding: 0px 80px;

  .inputHerader {
    width: 100%;
    display: flex;
    justify-content: space-between;
    input {
      padding: 5px;
      border-radius: 5px;
      font-size: 1rem;
      margin-bottom: 20px;
    }

    .buttonAdd {
      position: relative;
      margin-bottom: 20px;
      padding: 8px 20px;
      border-radius: 5px;
      background-color: var(--blue-400);
      border: none;
      color: var(--white);
    }

    .buttonAdd:hover {
      background-color: rgba(19, 94, 159, 90%);
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
          font-size: 1.125rem;
          background: var(--white);
          max-width: 200px;
          width: 25%;
          padding: 10px 30px;
          border-bottom: 5px solid var(--background);
          height: 60px;
          button {
            background: var(--blue-400);
            padding: 10px 20px;
            color: var(--white);
            font-weight: 600;
            border: none;
            border-radius: 5px;
          }

          ul {
            display: flex;
            justify-content: space-between;
            li {
              cursor: pointer;
            }
          }
        }
        td:last-child {
          border-bottom-right-radius: 10px;
          border-top-right-radius: 10px;
          text-align: center;

          ul {
            display: flex;
            justify-content: space-between;
            gap: 10px;
          }
        }

        td:first-child {
          border-bottom-left-radius: 10px;
          border-top-left-radius: 10px;
        }
      }
    }

    .paginacao {
      background: transparent;
      width: 100%;
      margin-bottom: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      span {
        margin: 0 auto;
        display: flex;
        gap: 10px;

        button {
          display: flex;
          align-items: center;
          align-self: center;
          width: 100%;
          height: 100%;
          background: #fff;
          border: none;
          border-radius: 50%;
          position: relative;
          margin: 0 auto;
          padding: 4px 8px;
          box-shadow: 2px 2px 10px 0px rgba(0, 0, 0, 25%);
          color: var(--blue-400);
        }
        button:hover {
          background: var(--blue-400);
          color: #fff;
        }

        button:last-child {
          background: transparent;
        }

        .Anterior {
          padding: 0px;
          align-self: center;
          cursor: pointer;
          font-size: 0.875rem;
          background: transparent;
          box-shadow: none;
        }
        .Anterior:hover {
          background: transparent;
          background: transparent;
          color: var(--blue-400);
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

    @media (max-width: 1184px) {
      header {
        ul {
          gap: 30px;
          li {
            strong {
              font-size: 1.5rem;
            }
          }
        }
      }
    }

    @media (max-width: 823px) {
      padding: 0px 40px;
      header {
        ul {
          gap: 30px;
          li {
            width: 250px;
          }
        }
      }
    }

    @media (max-width: 823px) {
      header {
        ul {
          li {
            min-width: 200px;
          }
        }
      }
    }

    @media (max-width: 728px) {
      padding: 0px 20px;
      table {
        width: 80vw;
      }
    }

    @media (max-width: 600px) {
      table {
        display: none;
      }
    }

    @media (max-width: 556px) {
      padding: 0px 0px;
      header {
        padding: 0px 0px;
      }
      .inputHerader {
        padding: 0 0px;
      }
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

    @media (max-width: 540px) {
      padding: 0px 20px;
      table {
        display: none;
      }
    }

    @media (max-width: 490px) {
      div {
        display: block;
      }
      table {
        display: none;
      }
    }

    @media (max-width: 425px) {
      .inputHerader {
        input {
          max-width: 200px;
          width: 100%;
          margin-right: 40px;
        }
      }
    }
  }
`;
