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
  }
  .section-header {
    display: flex;
    width: 85%;
    margin: 0 auto;
    justify-content: space-between;
    align-items: baseline;
    margin-block: 20px;
  }
  h1 {
    font-size: var(--large-text);
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
  .gallery {
    gap: 10px;

    display: grid;
    grid-template-columns: 1fr 1fr;
    .cover-container {
      grid-column-start: 1;
      grid-column-end: span 2;
      position: relative;
      height: 400px;
    }
    .photo {
      position: relative;
      height: 300px;
      display: block;
    }
    img {
      object-fit: cover;
      object-position: right;
    }
  }
  .text {
    color: lightgray;
    padding: 0px 20px 0 40px;
    position: sticky;
    top: 20px;
    height: fit-content;
    .price {
      padding-top: 10px;
    }
  }
  .add-to-cart {
    width: 100%;
    margin-top: 50px;
    background-color: #515151;
    cursor: pointer;
    :hover {
      background-color: #5d5d5d;
    }
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
    font-size: 20px;
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
`;