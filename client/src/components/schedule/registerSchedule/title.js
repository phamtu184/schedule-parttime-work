import React from "react";
import styled from "styled-components";
import translate from "../../../asset/i18n/translate";

const DivTitle = styled.div`
  h3 {
    text-align: center;
    text-transform: capitalize;
  }
`;
export default function Title({ title }) {
  return (
    <DivTitle>
      <h3>
        {translate("registerSchedule")} {title} (AM:7H-17H, PM:13h-22H)
      </h3>
    </DivTitle>
  );
}
