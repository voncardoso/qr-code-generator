import styled from "styled-components";

export const Container = styled.header`
  height: 220px;
  background: var(--blue-400);

  nav {
    display: flex;
    width: 90vw;
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
  }
`;
