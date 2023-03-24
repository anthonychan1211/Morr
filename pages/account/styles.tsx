import styled from "styled-components";

export const StyledLogInPage = styled.div`
  background-color: white;
  height: 100%;
  h3 {
    font-size: max(15px, 1.9vw);
    margin: 20px 0 30px 0;
  }
  .content {
    margin: 30px auto;
    display: flex;
    justify-content: center;
    gap: 10vw;
    width: 100%;
    form {
      width: 20%;
    }
    label {
      margin-top: 10px;
    }
  }

  button {
    display: block;
    cursor: pointer;
    margin-top: 20px;
  }
`;

export const StyledRegisterForm = styled.div`
  background-color: white;
  height: 100%;
  display: grid;
  justify-content: center;
  form {
    width: 100%;
    h1 {
      margin-top: 50px;
      margin-bottom: 30px;
    }
    input {
      display: block;
      width: max(30vw, 250px);
    }
    label {
      margin-top: 25px;
    }
    button {
      margin-top: 30px;
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
  }
`;

export const StyledAccountPage = styled.div`
  background-color: white;
  height: 100%;
  p {
    font-size: 33px;
  }
`;
