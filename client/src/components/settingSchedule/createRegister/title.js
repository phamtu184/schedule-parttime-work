import React from "react";
import styled from "styled-components";

const DivTitle = styled.div`
  h3 {
    text-align: center;
  }
`;
export default function Title({ title }) {
  return (
    <DivTitle>
      <h3>{title}</h3>
    </DivTitle>
  );
}
