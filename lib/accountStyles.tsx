import styled from "styled-components";

export const StyledLogInPage = styled.div`
  background-color: white;
  flex: 1;

  h3 {
    font-size: max(15px, 1.9vw);
    margin: 20px 0 30px 0;
  }

  .content {
    margin: 30px auto;
    display: flex;
    @media screen and (max-width: 600px) {
      flex-direction: column;
    }
    justify-content: center;
    gap: 10vw;
    width: 70%;
    * {
      flex: 1;
    }
    .log-in {
      label {
        margin-top: 10px;
      }
      .warning {
        color: red;
        font-size: var(--tiny-text);
      }
      button {
        margin: 10px 0;
      }
      .forget-password {
        background-color: white;
        padding: 0;
        text-decoration: underline;
        color: var(--background-grey);
      }
    }
  }
  .link {
    display: block;
    cursor: pointer;
    margin-top: 20px;
    color: lightgrey;
    text-decoration: none;
    background-color: var(--background-grey);
    text-align: center;
    padding: 15px;
    font-size: var(--small-text);
  }
`;

export const StyledRegisterForm = styled.div`
  background-color: white;
  height: 100%;
  display: grid;
  justify-content: center;
  form {
    width: 60vw;
    @media screen and (max-width: 700px) {
      width: 90vw;
    }
    .name-section {
      display: flex;
      * {
        width: 98%;
      }
    }
    h1 {
      margin-top: 50px;
      margin-bottom: 30px;
    }
    label {
      margin-top: 25px;
    }
    button {
      margin-block: 30px;
      cursor: pointer;
    }
    .warning {
      color: red;
    }
    .notMatchWarning {
      display: none;
    }
    .notMatchWarning.open {
      display: block;
      color: red;
    }
    .default-address {
      display: flex;
      align-items: center;
      margin: 10px 0px;
      gap: 10px;
      .checkbox-label {
        margin: 0;
      }
    }
  }
`;

export const StyledAccountPage = styled.div`
  background-color: white;
  height: 100%;
  padding: 0px 20%;
  @media screen and (max-width: 1000px) {
    padding: 0px 5%;
  }
  .welcome-section {
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .welcome {
    font-size: var(--large-text);
    text-align: center;
  }
  .info {
    margin: 0 auto;
    margin-top: 3vw;
  }
  .inputs {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
    margin-top: 3vw;
    @media screen and (max-width: 500px) {
      grid-template-columns: 1fr;
    }
  }
  .span2 {
    grid-column-start: 1;
    grid-column-end: -1;
  }
  .default-address {
    display: flex;
    padding: 10px 0px 20px 0px;
    gap: 5px;
  }
  .cancel {
    background-color: white;
    color: var(--background-grey);
  }
  .security {
    padding: 20px 0;

    h3 {
      margin: 10px 0;
    }
    button {
      margin: 20px 0;
    }
  }
  .warning {
    color: red;
    font-size: var(--small-text);
  }
  .notMatchWarning {
    display: none;
  }
  .notMatchWarning.open {
    display: block;
    color: red;
    font-size: var(--tiny-text);
  }
`;
