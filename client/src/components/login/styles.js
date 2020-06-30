import styled from "styled-components";
import Background from "../../asset/background.jpg";

export const DivBg = styled.div`
  background-image: url(${Background});
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  position: relative;
  background-size: cover;
  &:before {
    content: "";
    width: 100%;
    height: 100%;
    display: flex;
    background-color: rgba(0, 0, 0, 0.5);
    position: absolute;
    z-index: 1;
    top: 0px;
  }
`;
export const DivForm = styled.div`
  width: 500px;
  height: 100%;
  min-height: 100%;
  overflow-y: auto;
  z-index: 1;
  display: flex;
  flex-direction: column;
  position: relative;
  background-color: white;
  padding: 56px 40px;
  @media (max-width: 575px) {
    width: 100%;
  }
`;
