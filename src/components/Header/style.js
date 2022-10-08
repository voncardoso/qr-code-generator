import styled from "styled-components";

export const Container = styled.header`
  height: 220px;
  display: flex;
  flex-direction: column;
  width: 100%;

  nav {
    width: 100%;
    display: flex;
    background: var(--blue-400);
    margin: 0 auto;
    padding: 20px 30px;
    justify-content: space-between;

    div {
      display: flex;
      align-items: center;
      padding: 5px 0px;
      a {
        color: var(--white);
        margin-left: 60px;
        font-size: 1rem;
        text-decoration: none;
        svg {
          position: relative;
          top: 2px;
          height: 100%;
        }
      }
      a.isActive::after {
        content: "";
        display: block;
        margin-top: 2px;
        width: 100%;
        height: 2px;
        background: var(--white);
      }

      a:hover::after {
        content: "";
        display: block;
        margin-top: 2px;
        width: 100%;
        height: 2px;
        background: var(--white);
      }

      button {
        display: flex;
        align-items: center;
        border: none;
        margin-left: 60px;
        font-size: 1rem;
        background: none;
        color: var(--white);
        p {
          margin-right: 5px;
        }
      }
    }

    .button-menu-mobile {
      display: none;
    }
  }

  .menu-mobile {
    display: none;

    nav {
      display: none;
    }
  }

  .activeAdm {
  }

  @media (max-width: 823px) {
    padding: 0px 0px;
    height: 170px;

    nav {
      padding: 20px 10px;
      padding-bottom: 10px;
      background: none;
      div {
        flex-direction: column;
        align-items: center;
        a {
          margin-left: 30px;
          font-size: 0.875rem;
          display: none;
        }

        button {
          margin-left: 30px;
          font-size: 0.875rem;
          display: none;
        }

        a:hover::after {
          content: none;
        }
      }

      .button-menu-mobile {
        display: block;
        color: var(--white);
        background: none;
        border: none;
        z-index: 2000;
        position: fixed;
      }
    }

    .menu-mobile {
      position: relative;
      z-index: 1;

      div {
        position: fixed;
        top: 0px;
        width: 100%;
        height: 100vh;

        background: rgb(0, 61, 167, 40%);
        z-index: 2;
        nav {
          z-index: 20000;
          width: 150px;
          display: flex;
          flex-direction: column;
          position: fixed;
          top: 0px;
          background: var(--blue-400);
          height: 100vh;

          ul {
            margin-top: 80px;
            li {
              padding: 20px 10px;
              a {
                color: var(--white);
                text-decoration: none;
              }

              button {
                display: flex;
                background: none;
                color: var(--white);
                border: none;

                align-items: center;

                p {
                  margin-right: 5px;
                  font-size: 1rem;
                }
              }
            }

            .isActive {
              width: 100px;

              border-bottom: 1px solid var(--white);
            }
          }
        }
      }
    }
  }
`;
