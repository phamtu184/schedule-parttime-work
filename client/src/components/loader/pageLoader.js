import React from "react";
import styled, { keyframes } from "styled-components";

const circleKeyframes = keyframes`
0%{
  top:60px;
  height:5px;
  border-radius: 50px 50px 25px 25px;
  transform: scaleX(1.7);
}
40%{
  height:20px;
  border-radius: 50%;
  transform: scaleX(1);
}
100%{
  top:0%;
}
`;
const shadowKeyframes = keyframes`
0%{
  transform: scaleX(1.5);
}
40%{
  transform: scaleX(1);
  opacity: .7;
}
100%{
  transform: scaleX(.2);
  opacity: .4;
}
`;
const Wrapper = styled.div`
  width: 200px;
  height: 60px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  span {
    position: absolute;
    top: 75px;
    font-family: "Lato";
    font-size: 20px;
    letter-spacing: 12px;
    color: #1e88e5;
    left: 15%;
  }
`;
const Circle = styled.div`
  width: 20px;
  height: 20px;
  position: absolute;
  border-radius: 50%;
  background-color: #1e88e5;
  left: 15%;
  transform-origin: 50%;
  animation: ${circleKeyframes} 0.5s alternate infinite ease;
  &:nth-child(2) {
    left: 45%;
    animation-delay: 0.2s;
  }
  &:nth-child(3) {
    left: auto;
    right: 15%;
    animation-delay: 0.3s;
  }
`;
const Shadow = styled.div`
  width: 20px;
  height: 4px;
  border-radius: 50%;
  background-color: rgba(0, 0, 0, 0.5);
  position: absolute;
  top: 62px;
  transform-origin: 50%;
  z-index: -1;
  left: 15%;
  filter: blur(1px);
  animation: ${shadowKeyframes} 0.5s alternate infinite ease;
  &:nth-child(4) {
    left: 45%;
    animation-delay: 0.2s;
  }
  &:nth-child(5) {
    left: auto;
    right: 15%;
    animation-delay: 0.3s;
  }
`;
export default function PageLoader() {
  return (
    <div style={{ width: "100%", height: "100vh" }}>
      <div
        className="fadeIn animated"
        style={{
          position: "relative",
          height: "100%",
          backgroundColor: "#fff",
        }}
      >
        <Wrapper>
          <Circle></Circle>
          <Circle></Circle>
          <Circle></Circle>
          <Shadow></Shadow>
          <Shadow></Shadow>
          <Shadow></Shadow>
          <span>Loading</span>
        </Wrapper>
      </div>
    </div>
  );
}
