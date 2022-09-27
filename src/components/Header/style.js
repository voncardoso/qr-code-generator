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
      a {
        color: var(--white);
        margin-left: 60px;
        font-size: 1rem;
        text-decoration: none;
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
    }
  }
`;
