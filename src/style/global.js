import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
      :root{
        --background: #E6EDF2;
        --white: #FFFFFF;
        
        --text: #39332E;

        --blue-100: #249AFF;
        --blue-200: #1188EE;
        --blue-300: #0470CC;
        --blue-400: #003DA7;

        --gray-100: #E6EDF2;
        --gray-200: #C3CFD9;
        --gray-300: #9BAEBF;

        --gray-input: #E5E5E3

        --black-100: #63717D;
        --black-200: #45525E;
        --black-300: #151F29;

        --red-100: #FF4926;
        --red-200: #EE3411;
        --red-300: #D92604;

        --green-300: #2DDFBF;
        
    }

  * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    body{
        background:  var(--background);
        --webkit-font-font-smooth: antialiased; // deixar a finte mais nitida
    }

    body, input, textarea, button {
        font-family: 'Roboto', sans-serif;
        font-weight: 400;
    }

    ul{
        list-style: none;
    }

    button {
        cursor: pointer;
    }

    img { 
        max-width: 100%;
    }


    .div-global{
        width: 100%;
    }

    .react-modal-overlay {
      animation: animeLeft 30s forwards;
    position: fixed ;
    background: rgba(0,0,0, 0.25);
    position: 0;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;

    display: flex;
    align-items: center;
    justify-content: center;
  }

  .react-modal-content{
    width: 100%;
    max-width: 400px;
    background: var(--white);
    padding: 3rem;
    border-radius: 1rem;
    color: var(--text);
   
    h3{
        padding-bottom: 20px;
        
    }
    input {
      margin-top: 5px;
      width: 100%;
      padding: 10px 10px;
      border-radius: 5px;
      background: #ddd;
      border: none;
      margin-bottom: 20px;
    }
    input:focus,
    select:focus {
      outline: transparent;
      box-shadow: 0 0 0 2px var(--gold-300);
    }
    select {
      margin-top: 5px;
      margin-bottom: 20px;
      width: 100%;
      padding: 10px 10px;
      border-radius: 5px;
      background: #ddd;
      border: none;
      font-size: 0.875rem;
      line-height: 20px;
      cursor: pointer;
    }
    
    button {
      width: 100%;
      font-size: 1rem;
      font-weight: bold;
      letter-spacing: 1px;
      color: var(--white);
      padding: 10px 30px;
      border: none;
      border-radius: 5px;
      background: var(--blue-400);
      margin-top: 10px;
    }

  button:hover {
    background-color: rgba(19, 94, 159, 90%);
  }

  .closeButtonModal:hover{
      background: none;
  }

 div{
  width: 100%;
  a{
    display:inline-block;
    padding: 10px;
    width: 300px;
    text-align: center;
    background: var(--blue-400);
    color: var(--white);
    text-decoration: none;
    border-radius: 5px;
    
  }
  a:hover{
    background-color: rgba(19, 94, 159, 90%); 
  }
 }

}

`;
