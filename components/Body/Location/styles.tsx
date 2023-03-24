import styled from "styled-components";

export const StyledLocation = styled.div`
  background-color: var(--background-grey);
  margin: 0 auto;
  width: 100%;
  padding-top: 20px;
  padding-left: 5%;
  font-size: 12px;
  .route {
    color: #6c6c6c;
    display: flex;
    gap: 10px;
  }
  .link {
    text-decoration: none;
    color: lightgrey;
  }
  .slash {
    color: #575757;
  }
`;
export const StyledLightLocation = styled.div`
  background-color: white;
  width: 100%;
  margin: 0 auto;
  padding-top: 10px;
  padding-left: 5%;
  font-size: 12px;
  .route {
    color: #c1c1c1;
    display: flex;
    gap: 10px;
  }
  .link {
    text-decoration: none;
    color: #686868;
  }
  .slash {
    color: #ddd9d9;
  }
`;
