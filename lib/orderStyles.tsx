import styled from "styled-components";

export const StyledOrderPage = styled.div`
  background-color: white;
  flex: 1;
  padding-top: 50px;
  .current-order,
  .previous-order {
    width: 70%;
    margin: 20px auto;
    box-shadow: 0 0 20px #dddddd;
    padding: 30px 40px;
  }
  .single-order {
    margin: 30px 0;
  }
  .photos {
    display: flex;
    gap: 4px;
  }
  .thumbnail {
    position: relative;
    width: 100px;
    height: 100px;
    img {
      position: absolute;
      object-fit: cover;
    }
  }
`;
export const StyledToLogInPage = styled.div`
  background-color: white;
  flex: 1;
  .container {
    width: 60%;
    margin: 50px auto;
    padding: 50px 50px;
    box-shadow: 0 0 20px #dddddd;
    h1 {
      margin-bottom: 30px;
    }
    a {
      display: block;
      width: fit-content;
      padding: 14px;
      margin-top: 50px;
      background-color: var(--background-grey);
      color: white;
      text-decoration: none;
    }
  }
`;
