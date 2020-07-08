import React from "react";
import styled from "styled-components";
import translate from "../../../asset/i18n/translate";

const DivTitle = styled.div`
  h3 {
    text-align: center;
  }
`;
export default function Title({ title, infoTitle }) {
  const {
    shift1,
    shift2,
    moneyReceptionist,
    moneyServer,
    moneyCook,
  } = infoTitle;
  return (
    <DivTitle>
      <h3>
        {title} ({translate("shift1")}: {shift1[0]}h-{shift1[1]}h,{" "}
        {translate("shift2")}: {shift2[0]}h-{shift2[1]}h,
        {translate("moneyReceptionist")}: {moneyReceptionist}đ,
        {translate("moneyServer")}: {moneyServer}đ,
        {translate("moneyCook")}: {moneyCook}đ)
      </h3>
    </DivTitle>
  );
}
