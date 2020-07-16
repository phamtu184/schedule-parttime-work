import React, { useState } from "react";
import Title from "../common/title";
import translate from "../../asset/i18n/translate";
import statisticApi from "../../api/statisticApi";

export default function Statistic() {
  const [isLoading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);

  return (
    <>
      <Title className="color-dark">{translate("statistic")}</Title>
    </>
  );
}
