import styled from "styled-components";

export const StyledFilterModal = styled.div`
  .outer-modal {
    position: fixed;
    top: 0;
    height: 100%;
    width: 100vw;
    background-color: #3737379f;
    z-index: 999;
    opacity: 0;
    pointer-events: none;
    transition: all 0.3s ease-in-out;
  }
  .outer-modal.open {
    opacity: 1;
    pointer-events: all;
  }
  .inner-modal {
    position: relative;
    display: flex;
    flex-direction: column;
    top: 0;
    height: 100%;
    width: 30%;
    @media screen and (max-width: 1000px) {
      width: 50%;
    }
    @media screen and (max-width: 650px) {
      width: 80%;
    }
    transform: translateX(-100%);
    transition: all 0.3s ease-in-out;
    background-color: #f3f3f3;
    .main-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      z-index: 99;
      * {
        margin: 1vw 1vw;
      }
      button {
        cursor: pointer;
        margin-right: 1vw;
      }
      .filter-count {
        flex: 1 0 auto;
        margin-left: 0;
        font-size: var(--medium-text);
        color: #808080;
      }
      .clear-button {
        background-color: transparent;
        color: #222222;
        font-size: var(--small-text);
        text-decoration: underline;
      }
      border-bottom: 2px solid #c3c3c3;
    }
    .body-container {
      overflow: scroll;
      margin-top: 20px;
      margin-bottom: 100px;
    }

    .filter-section {
      .property-container {
        overflow: hidden;
        height: 0;
        transition: all 0.3s ease-in-out;
        margin: 10px 3vw;
        width: 90%;
        .filter-slide {
          transform: translateY(-100%);
          transition: all 0.3s ease-in-out;
        }
        .property {
          display: block;
          position: relative;
          padding-left: 24px;
          margin-bottom: 12px;
          font-size: 16px;
          line-height: 24px;
          input {
            position: absolute;
            top: 0;
            left: 0;
            height: 18px;
            width: 18px;
            opacity: 1;
            cursor: pointer;
          }
          .checkmark {
            position: absolute;
            top: 0;
            left: 0;
            height: 18px;
            width: 18px;
            border: 1px solid #ccc;
            background-color: #fff;
            pointer-events: none;
          }
          :hover input ~ .checkmark {
            background-color: #f0f0f0;
          }
          :hover input ~ .checkmark.disabled {
            background-color: #fff;
          }
          input:checked ~ .checkmark {
            background-color: #5b5b5b;
            border-color: #262626;
          }
          .checkmark:after {
            content: "";
            position: absolute;
            display: none;
          }
          input:checked ~ .checkmark:after {
            display: block;
          }
          .checkmark:after {
            left: 5px;
            top: 1px;
            width: 5px;
            height: 10px;
            border: solid white;
            border-width: 0 2px 2px 0;
            transform: rotate(45deg);
          }
          label {
            display: inline;
            font-size: var(--small-text);
            padding: 10px;
            cursor: pointer;
          }
          .disable {
            color: #bababa;
          }
        }
      }
      .property-container.open {
        height: fit-content;
        transform: translateY(0);
        .filter-slide {
          transform: translateY(0%);
        }
      }
    }
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      cursor: pointer;
      h2 {
        font-size: var(--large-text);
      }
      .triangle {
        font-family: monospace;
      }
      * {
        margin: 1vw 2.5vw;
        transition: all 0.1s ease-in-out;
      }
      button {
        cursor: pointer;
        margin-right: 1vw;
      }
      .triangle.open {
        transform: rotate(-180deg);
      }
    }
    .button-section {
      position: absolute;
      bottom: 0;
      flex: 0 1 auto;
      width: 100%;
      margin: 0 auto;
      padding-block: 25px;
      box-shadow: -18px 0px 20px #c5c5c5;
      text-align: center;
      .submit-result {
        width: 80%;
        cursor: pointer;
      }
    }
  }

  .inner-modal.open {
    transform: translateX(0);
  }
`;
