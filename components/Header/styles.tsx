import styled from "styled-components";

export const StyledHeader = styled.div`
  text-align: center;
  width: 100%;
  margin: 0px auto;
  border-bottom: 2px solid #292929;
  position: sticky;
  inset: 0;
  z-index: 999;
  background-color: var(--background-grey);
  .banner {
    width: 100%;
    background-color: #8e8c7d;
    color: #e4e4e4;
    font-size: var(--small-text);
    text-align: center;
    height: auto;
    margin: 0;
    padding: 5px;
    overflow: hidden;
    .cross {
      position: absolute;
      right: 1vw;
      cursor: pointer;
    }
    transition: all 0.5s;
    z-index: 99;
  }
  .banner.close {
    height: 0;
    padding: 0px;
    .cross {
      display: none;
    }
  }
  .top-section {
    position: relative;
    padding-top: 2.5vw;
    margin-bottom: 10px;
    height: 120px;
    @media screen and (max-width: 700px) {
      height: 60px;
    }
  }
  .user {
    position: absolute;

    right: 15vw;
    top: 3vw;
    cursor: pointer;
  }
  .shopping-bag {
    position: absolute;
    right: 5vw;
    top: 3vw;
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
    width: 18vw;
    color: lightgrey;
    font-size: max(14px, 1.2vw);
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    .logo {
      display: block;
      position: relative;
      height: max(1.8vw, 40px);
      width: max(8vw, 70px);
      img {
        object-fit: contain;
      }
    }
    h4 {
      padding-top: 7px;
      letter-spacing: 4px;
      color: var(--dark-gold);
      font-size: max(6px, 0.7vw);
    }
  }
  .nav-bar {
    padding-bottom: 15px;
    @media screen and (max-width: 1000px) {
      padding-bottom: 0px;
      opacity: 0;
      pointer-events: none;
      transition: all 0.2s;
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
      @media screen and (max-width: 1000px) {
        padding: 10px;
        background-color: #181818;
        width: 100%;
      }
    }

    @media screen and (max-width: 1000px) {
      flex-direction: column;
      border: 1px solid white;
      position: absolute;
      top: 100px;
      margin: 0;
      z-index: 98;
    }
  }
  .nav-bar.show {
    opacity: 1;
    pointer-events: all;
    transition: all 0.2s;
  }
  .bag {
    opacity: 0;
    transition: all 0.3s;
    pointer-events: none;
    .inner-modal {
      transform: translateX(100%);
      transition: all 0.3s;
    }
  }
  .bag.open {
    opacity: 1;
    pointer-events: all;
    .inner-modal {
      transform: translateX(0%);
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
    right: 0%;
    width: 35%;
    @media screen and (max-width: 1250px) {
      width: 40%;
    }
    @media screen and (max-width: 1000px) {
      width: 50%;
    }
    @media screen and (max-width: 800px) {
      width: 60%;
    }
    @media screen and (max-width: 680px) {
      width: 100%;
    }
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
      position: relative;
      height: 180px;
      display: flex;
      width: 90%;
      margin: 0 auto;
      gap: 20px;
      line-height: 1.8rem;
      pointer-events: none;
      .link {
        position: absolute;
        width: 100%;
        height: 100%;
        pointer-events: all;
      }
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
        width: 100%;
        font-size: var(--tiny-text);
      }
      * {
        flex: 1;
      }
      p {
        font-size: var(--small-text);
      }
      span {
        padding: 0px 2vw;
        font-size: var(--small-text);
      }
      a {
        text-decoration: none;
        color: lightgrey;
        width: 100%;
        height: 100%;
        flex: 1;
      }
    }
  }
`;
