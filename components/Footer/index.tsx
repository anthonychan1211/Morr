import React from "react";
import styled from "styled-components";
const StyledFooter = styled.p`
  color: lightgray;
  text-align: center;
  font-size: 10px;
  padding: 10px 0 20px 0;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  font-weight: 100;
`;
const Footer = () => {
  return <StyledFooter>&#169; Copyright owned by Anthony Chan</StyledFooter>;
};

export default Footer;
