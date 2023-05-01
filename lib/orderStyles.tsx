import styled from "styled-components";

export const StyledOrderPage = styled.div`
  flex: 1;
  color: lightgrey;

  .current-order,
  .previous-order {
    width: 65%;
    @media screen and (max-width: 800px) {
      width: 80%;
    }
    @media screen and (max-width: 600px) {
      width: 95%;
    }
    margin: 50px auto;
  }
  .no-orders {
    margin: 20px 0;
  }
  .single-order {
    margin: 30px 0;
    padding: 30px 6vw;
    box-shadow: 0 0 20px #171717;
    position: relative;
  }
  .order-info {
    display: flex;
    justify-content: space-between;
    font-size: 12px;
    cursor: default;
    @media screen and (max-width: 500px) {
      flex-direction: column;
      gap: 8px;
      .cell {
        display: flex;
        gap: 10px;
        .delivery-address {
          bottom: 120px;
        }
      }
    }
  }

  .photos {
    display: grid;
    grid-template-columns: repeat(4, 105px);
    width: 73%;
    @media screen and (max-width: 1068px) {
      grid-template-columns: repeat(3, 105px);
      width: 70%;
    }
  }
  .photos-detail {
    display: block;
    width: 100%;
    margin: 40px 0;
    .single-item {
      display: grid;
      grid-template-columns: 105px auto;
      gap: 10px;

      .info {
        margin: 20px 0;
        display: flex;
        justify-content: space-between;
      }
      .item-price {
        font-size: var(--small-text);
      }
      .quantity {
        font-size: var(--tiny-text);
        margin: 8px 0;
      }
    }
  }
  .thumbnail {
    position: relative;
    width: 100px;
    height: 100px;
    margin: 20px 0px;
    img {
      position: absolute;
      object-fit: cover;
    }
  }
  .delivery-address {
    opacity: 0;
    transform: translateY(-100%);
    overflow: hidden;
    position: absolute;
    background-color: #171717;
    padding: 1vw;
    right: 0;
    bottom: 100px;
    transition: all 0.2s;
    pointer-events: none;
  }
  .delivery-section:hover {
    .delivery-address {
      opacity: 1;
      transform: translateX(0%);
      pointer-events: all;
    }
  }
  .arrow {
    display: inline-block;
    margin-left: 15px;
    opacity: 0;
    transition: all 0.2s;
  }
  .arrow.show {
    opacity: 1;
  }
  .arrow.upside-down {
    opacity: 1;
    transform: rotate(180deg);
  }
  .more-detail {
    font-size: 12px;
    display: flex;
    justify-content: space-between;
    align-items: end;
    .tracking-number {
      margin-top: 10px;
    }
    p {
      margin-top: 10px;
    }
    button {
      padding: 0;
      margin: 0;
      font-size: 12px;
      :hover {
        text-decoration: underline;
      }
    }
  }
  .update-section {
    width: 50%;
    select,
    input {
      padding: 10px;
      margin-bottom: 5px;
    }
    h4 {
      margin: 40px 0 20px 0;
    }
    margin: 30px 0;
    button {
      margin-top: 20px;
      background-color: #171717;
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
