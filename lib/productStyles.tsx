import styled from "styled-components";

export const StyledProductPage = styled.div`
  .add-product {
    color: white;
    border: 5px solid white;
    cursor: pointer;
  }
`;
export const StyledProductContainer = styled.div`
  display: grid;
  width: 90%;
  margin: 20px auto;
  grid-template-columns: 1fr 1fr 1fr;
  @media screen and (max-width: 1000px) {
    grid-template-columns: 1fr 1fr;
  }
  @media screen and (max-width: 700px) {
    grid-template-columns: 1fr;
    width: 70%;
  }
  gap: 20px;
`;
export const StyledProductCard = styled.div`
  min-width: 200px;
  cursor: pointer;
  .image-container {
    box-shadow: 0 10px 15px #494949;
    position: relative;
    height: 300px;
    overflow: hidden;
    @media screen and (max-width: 1000px) {
      height: 250px;
    }
  }
  .product-info {
    margin: 20px 8px 10px 8px;
    line-height: 1.5rem;
    font-size: 14px;
    color: #f7f0e6;
    .product-material {
      font-size: 12px;
      color: #9a9a9a;
    }
  }
  .edit-product {
    border: 2px solid white;
    cursor: pointer;
  }
  img {
    object-fit: cover;
    :hover {
      transform: scale(1.04);
      transition: all 0.3s;
    }
  }
`;

export const StyledProductLandingPage = styled.div`
  color: var(--dark-gold);
  width: 100%;
  margin: 0 auto;
  animation: fadeIn 0.3s ease-in-out;
  background: linear-gradient(var(--background-grey), #8d8d8c);
  @keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
  .section {
    padding: 80px 0px 100px 0px;
    padding-bottom: 100px;
    @media screen and (max-width: 1000px) {
      padding: 5vw 0px;
    }
  }
  .section-header {
    display: flex;
    width: 80%;
    margin: 0 auto;
    justify-content: space-between;
    align-items: baseline;
    margin-block: 20px;
  }
  h1 {
    font-size: var(--medium-text);
    color: #928f83;
  }
  a {
    font-size: 12px;
    cursor: pointer;
    border-bottom: 2px solid var(--dark-gold);
    text-decoration: none;
    color: var(--dark-gold);
  }
`;

export const StyledProductDetail = styled.div`
  padding: 40px;
  display: grid;
  position: relative;
  grid-template-columns: 1fr 1fr;
  @media screen and (max-width: 800px) {
    grid-template-columns: 1fr;
  }
  .gallery {
    gap: 10px;
    display: grid;
    position: relative;
    grid-template-columns: 1fr 1fr;
    .cover_photo {
      grid-column-start: 1;
      grid-column-end: span 2;
      img {
        object-fit: cover;
      }
    }
    .photo {
      position: relative;
      height: 300px;
      display: block;
    }
    img {
      object-position: right;
      object-fit: cover;
    }
    @media screen and (max-width: 1100px) {
      display: flex;
      flex-direction: column;
      .cover-container {
        width: 100%;
        height: fit-content;
      }
      .photo {
        height: 38vw;
      }
    }
  }
  .text {
    color: lightgray;
    padding: 0px 20px 0 40px;
    position: sticky;
    top: 20px;
    height: fit-content;
    @media screen and (max-width: 800px) {
      position: static;
      margin-top: 20px;
    }
    .name {
      font-size: var(--large-text);
    }
    .price {
      padding-top: 10px;
    }
  }
  .add-to-cart {
    width: 100%;
    margin-top: 50px;
    background-color: #515151;
    cursor: pointer;
    :disabled {
      background-color: #515151;
      cursor: auto;
      color: #787878;
    }
  }
  .add-to-cart:hover:not(:disabled) {
    background-color: #6d6d6d;
    outline: lightgrey solid 2px;
  }

  .detail-section {
    width: 100%;
    text-align: left;
    cursor: pointer;
    margin-top: 50px;
  }
  .detail-header {
    display: flex;
    align-items: center;
  }
  .detail {
    cursor: pointer;
    font-size: var(--medium-text);
  }
  .triangle {
    font-size: 20px;
    margin: 0 15px 0 0;
    transition: all 0.2s;
  }
  .detail-section.open .triangle {
    transform: rotate(90deg);
    transition: all 0.2s;
  }
  .description-container {
    overflow: hidden;
    height: 0;
    transition: all 0.5s;
  }
  .detail-section.open .description-container {
    height: fit-content;
    transition: all 0.5s;
  }
  .description {
    white-space: pre-line;
    background-color: #51515151;
    padding: 20px;
    transform: translateY(-100%);
    transition: all 0.5s;
    line-height: 2.3rem;
  }
  .detail-section.open .description {
    transform: translateY(0%);
  }
  .policy {
    background-color: #474747;
    padding: 20px;
    margin: 6vw 0;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
      Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
    font-weight: 300;
    font-size: var(--small-text);
  }
`;
