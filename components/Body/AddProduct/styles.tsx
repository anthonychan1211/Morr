import styled from "styled-components";

export const StyledAddProduct = styled.div`
  position: fixed;
  z-index: 99;
  top: 0;
  width: 100vw;
  height: 100vh;
  background-color: #0000008c;
  .inner-modal {
    background-color: white;
    width: 80%;
    height: 100%;
    margin: 0 auto;
    overflow: scroll;
  }
  form {
    padding: 30px;
    h1 {
      padding-bottom: 20px;
    }
    textarea {
      width: 80%;
      border: 1px solid lightgrey;
      padding: 15px;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
        Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif, Courier,
        monospace;
      font-size: 16px;
    }
    input {
      width: 80%;
    }
    .submit-section {
      display: flex;
      gap: 10px;
      margin-top: 30px;
      button {
        cursor: pointer;
      }
    }
  }
`;
