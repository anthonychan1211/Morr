import { useContext } from "react";
import styled from "styled-components";
import { Context } from "../lib/context";
const StyledLoading = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  pointer-events: none;
  background-color: #1e1e1e3d;
  z-index: 9999;
  display: grid;
  align-items: center;
  justify-content: center;
  .spinner {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    border: 10px solid rgba(255, 255, 255, 0.2);
    border-top-color: #fff;
    animation: spin 0.8s linear infinite;
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;
const Loading: React.FC = () => {
  const { loading } = useContext(Context);

  if (loading) {
    return (
      <StyledLoading>
        <div className="spinner"></div>
      </StyledLoading>
    );
  }

  return null;
};

export default Loading;
