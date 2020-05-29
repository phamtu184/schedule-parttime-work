import React from "react";
import ButtonList from "./buttonList";
import translate from "../../asset/i18n/translate";
import Title from "../common/title";

export default function Calendar() {
  return (
    <>
      <Title className="color-dark">{translate("calendar")}</Title>
      <ButtonList />
    </>
  );
}
