import React from "react";
import styled from "styled-components";
import ButtonList from "./buttonList";
import translate from "../../asset/i18n/translate";

const Title = styled.h1`
  margin-bottom: 36px;
  font-size: 24px;
  text-transform: capitalize;
`;
export default function User() {
  return (
    <>
      <Title className="color-dark">{translate("users")}</Title>
      <ButtonList />
    </>
  );
}
