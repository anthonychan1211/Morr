import styled from "styled-components";

export const StyledBagPage = styled.div`
  color: lightgrey;
  display: flex;
  position: relative;
  @media (width < 1000px) {
    flex-direction: column-reverse;
  }
  .product-section {
    border-right: 2px solid #3d3d3d;
    flex: 1;
  }
  .page-title {
    margin: 50px;
    @media (width < 1000px) {
      margin: 20px;
      font-size: var(--large-text);
    }
  }
  .single-item {
    display: flex;
    gap: 30px;
    margin: 20px 50px;
    border: 1px solid #505050;
    padding: 25px;
    box-shadow: 2px 5px 30px #212121;
    @media (width < 1000px) {
      flex-direction: column;
      height: 600px;
      padding: 40px;
      padding-bottom: 20px;
      margin: 20px;
    }
    @media (width < 600px) {
      flex-direction: column;
      height: 400px;
      padding: 20px;
      margin: 20px;
    }
  }
  .photo {
    position: relative;
    width: 100%;
    height: 20vw;
    @media (width < 1000px) {
      min-height: 400px;
    }
    @media (width < 600px) {
      min-height: 250px;
    }
    grid-area: photo;
    flex: 1;
    img {
      object-fit: cover;
    }
  }
  .detail {
    flex: 1;
    position: relative;
  }
  .number {
    padding-inline: 10px;
    font-size: 14px;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
      Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
    font-weight: 200;
  }
  .quantity {
    display: flex;
    align-items: center;
    position: absolute;
    top: 30%;
  }
  .amount {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
      Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
    font-weight: 200;
  }
  .title {
    display: flex;
  }
  .name {
    flex: 1;
    font-size: var(--medium-text);
    text-decoration: none;
    color: lightgrey;
  }
  .quantity-control {
  }
  .tag {
    width: min(25vw, 100px);
  }
  .control-button {
    border: 1px solid #777777;
    padding: 0;
    font-size: 14px;
    width: 20px;
    height: 20px;
    cursor: pointer;
  }
  .control-button[disabled] {
    border: 1px solid #3f3f3f;
    color: #3f3f3f;
    pointer-events: none;
  }
  .check-out {
    position: sticky;
    top: 220px;
    @media (width < 1000px) {
      position: static;
      padding-top: 20px;
    }
    right: 0px;
    width: 100%;
    height: fit-content;
    flex: 0;
    min-width: 30vw;
  }
  .remove {
    position: absolute;
    bottom: 0px;
    cursor: pointer;
    right: 0px;
    padding: 0;
    border-bottom: 1px solid lightgrey;
    @media (width < 1000px) {
      bottom: 30px;
    }
  }
  .link {
    text-decoration: none;
    color: lightgrey;
    background-color: #202020;
    padding: 10px;
    display: grid;
    text-align: center;
    width: 80%;
    margin: 30px auto;
    :hover {
      outline: solid 1px lightgrey;
    }
  }
  .total {
    text-align: center;
    display: block;
    span {
      margin: 0 30px;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
        Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
      font-weight: 200;
    }
  }
  .policy {
    background-color: #474747;
    padding: 20px;
    margin: 6vw 2vw;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
      Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
    font-weight: 300;
    font-size: var(--small-text);
  }
`;
