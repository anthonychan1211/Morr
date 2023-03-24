import React from "react";
import styled from "styled-components";
const StyledFooter = styled.p`
  color: lightgray;
  text-align: center;
  font-size: 12px;
  padding: 10px 0 20px 0;
`;
const Footer = () => {
  return <StyledFooter>&#169; Copyright owned by Anthony Chan</StyledFooter>;
};

export default Footer;
