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



`;
