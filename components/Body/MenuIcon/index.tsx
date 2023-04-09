import styled from "styled-components";
import { SetStateBoolean, StateBoolean } from "../../../lib/types";

const StyledMenuIcon = styled.div`
  @media screen and (min-width: 1000px) {
    display: none;
  }
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  width: 20px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  left: 7vw;
  top: 60px;
  @media screen and (max-width: 700px) {
    top: 35px;
  }
  .menu {
    width: 100%;
    height: 100%;

    background: transparent;
    border-radius: 5px;
    cursor: pointer;
    .stroke-container {
      position: relative;
      width: 100%;
      height: 100%;

      span {
        position: absolute;
        background: lightgrey;
        width: 100%;
        height: 2px;
        border-radius: 2px;
        display: block;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        transition: all 0.5;
        z-index: 10;
      }
      .line-1 {
        transform: translate(-50%, -300%);
      }
      .line-3 {
        transform: translate(-50%, 200%);
      }

      .open-line-1 {
        transform: translate(-50%, -50%) rotate(-45deg);
      }
      .open-line-3 {
        transform: translate(-50%, -50%) rotate(45deg);
      }
      .open-line-2 {
        width: 0;
      }
    }
  }
`;
const MenuIcon = ({
  showMenu,
  setShowMenu,
}: {
  showMenu: StateBoolean;
  setShowMenu: SetStateBoolean;
}) => {
  return (
    <StyledMenuIcon onClick={() => setShowMenu(!showMenu)}>
      <div className="menu">
        <div className="stroke-container">
          <span className={showMenu ? "open-line-1" : "line-1"}></span>
          <span className={showMenu ? "open-line-2" : "line-2"}></span>
          <span className={showMenu ? "open-line-3" : "line-3"}></span>
        </div>
      </div>
    </StyledMenuIcon>
  );
};

export default MenuIcon;
