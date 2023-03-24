import styled from "styled-components";

export const StyledHeader = styled.div`
  text-align: center;
  padding-top: 40px;
  width: 100%;
  margin: 0px auto 0px auto;
  border-bottom: 2px solid #292929;
  .top-section {
    position: relative;
    margin-bottom: 50px;
  }
  .user {
    position: absolute;
    right: 13vw;
    top: 0;
    cursor: pointer;
  }
  .shopping-bag {
    position: absolute;
    right: 5vw;
    top: 0;
    cursor: pointer;
  }
  .cart-length {
    position: absolute;
    height: 20px;
    width: 20px;
    top: 0;
    right: 0;
    background-color: #181818;
    padding: 8px;
    font-size: 10px;
    border-radius: 50%;
    p {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
  .logo-section {
    text-decoration: none;
    h4 {
      padding-top: 7px;
      letter-spacing: 4px;
      color: var(--dark-gold);
      font-size: max(7px, 0.7vw);
    }
    a {
      text-decoration: none;
      color: lightgrey;
      font-size: max(14px, 1.2vw);
    }
  }
  .nav-bar {
    padding-bottom: 15px;
    @media screen and (max-width: 1000px) {
      display: none;
    }
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 60%;
    margin: 0 auto;
    a {
      text-decoration: none;
      color: lightgrey;
      font-size: max(11px, 1vw);
    }

    .header-tag {
      display: inline-block;
      position: relative;
      z-index: 20;
      &::after {
        content: "";
        position: absolute;
        width: 100%;
        transform: scaleX(0);
        height: 2px;
        bottom: 0;
        left: 0;
        background-color: lightgrey;
        transform-origin: bottom right;
        transition: transform 0.25s ease-out;
      }
      &:hover::after {
        transform: scaleX(1);
        transform-origin: bottom left;
      }
    }
    .product-tag {
      position: relative;
      &:hover .drop-down-menu {
        transition: all 0.25s ease-in-out;
        transform: translateY(0);
      }
      &:hover .menu-container {
        height: fit-content;
      }
    }
    .menu-container {
      height: 0;
      position: absolute;
      left: max(-11px, -1vw);
      overflow: hidden;
      .drop-down-menu {
        list-style: none;
        text-align: left;
        width: max(100px, 13vw);
        padding: max(10px, 1vw);
        transition: all 0.25s ease-in-out;
        transform: translateY(-100%);
        position: relative;
        z-index: 10;
        background-color: var(--background-grey);
        li {
          position: relative;
          a {
            display: block;
            width: 100%;
            font-size: max(13px, 1.15vw);
          }
          padding: 8px 0;
          &::after {
            content: "";
            position: absolute;
            width: 100%;
            transform: scaleX(0);
            height: 2px;
            bottom: 8px;
            left: 0;
            background-color: lightgrey;
            transform-origin: bottom right;
            transition: transform 0.25s ease-out;
          }
          &:hover::after {
            transform: scaleX(1);
            transform-origin: bottom left;
          }
        }
      }
    }
  }
`;
export const StyledCart = styled.div`
  height: 100%;
  width: 100%;
  background-color: #0000007a;
  position: fixed;
  top: 0;
  right: 0;
  z-index: 999;
  .inner-modal {
    display: flex;
    flex-direction: column;
    position: absolute;
    overflow: scroll;
    top: 0;
    right: 0;
    width: 35%;
    height: 100%;
    background-color: #262626;
    color: lightgrey;
    text-align: left;
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .close {
        width: 10%;
        height: 70%;
        font-size: 15px;
        padding: 10px;
        cursor: pointer;
      }
      margin: 10px 10px;
    }
    h1 {
      padding: 20px 30px;
      font-size: var(--large-text);
    }
    .items {
      flex: 1;
      overflow: scroll;
      padding: 30px 0px;
    }
    .single-item {
      height: 180px;
      display: flex;
      width: 90%;
      margin: 0 auto;
      gap: 20px;
      line-height: 1.8rem;
      .photo {
        position: relative;
        width: 35%;
        height: 80%;
        img {
          object-fit: cover;
        }
      }
      p {
        font-size: var(--small-text);
      }
      .quantity,
      .price {
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
          Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
        font-weight: 300;
        font-size: var(--tiny-text);
        color: #949494;
        line-height: 1rem;
      }
    }
    .bottom {
      display: flex;
      align-items: center;
      padding: 20px 30px;
      width: 100%;
      button {
        cursor: pointer;
      }
      * {
        flex: 1;
      }
      span {
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
          Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
        font-weight: 300;
        padding: 0px 20px;
      }
    }
  }
`;
