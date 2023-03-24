import styled from "styled-components";

export const StyledSearchBar = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px 0px 0px 0px;
  color: #8f8f8f;
  width: 90%;
  margin: 0 auto;
  font-size: var(--small-text);
  position: relative;
  .filter {
    border: 2px solid white;
    font-size: var(--small-text);
    padding: 10px 25px;
    margin: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 5px;
  }
  .right-side {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .select {
    border: 2px solid lightgrey;
    position: relative;
    overflow: hidden;
    select {
      cursor: pointer;
      appearance: none;
      outline: 0;
      box-shadow: 0;
      border: 0;
      background-color: var(--background-grey);
      color: lightgrey;
      &::-ms-expand {
        display: none;
      }
    }
    option {
      text-align: center;
    }
  }

  .sort-selection {
    border: 2px solid white;
    font-size: 13px;
    padding: 10px 25px;

    display: flex;
    align-items: center;
    justify-content: center;
  }
  .search-input {
    background-color: transparent;
    border: 0;
    padding: 0px;
    margin-inline: 30px;
    height: auto;
    border-bottom: solid #858585;
    color: #d0d0d0;
    font-size: var(--small-text);
    width: 20vw;
    @media screen and (max-width: 1000px) {
      width: 0;
    }
    &:active,
    &:focus {
      outline: none;
    }
  }
  button {
    color: lightgrey;
    background-color: transparent;
    border: none;
    cursor: pointer;
    margin-inline: 5px;
    font-size: var(--small-text);
    padding: 0;
  }
  .material-container {
    width: 70%;
    label {
      display: inline;
      font-size: 16px;
      padding-left: 5px;
      color: #d0d0d0;
    }
    display: grid;
    padding: 30px;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 1vw;
    background-color: #313131;
    position: absolute;
    z-index: 40;
    .control-button {
      grid-column: 1 / -1;
      button {
        font-size: 14px;
        border: 1px solid #858585;
        padding: 10px;
      }
    }
  }
`;
