import React from "react";
import { Descriptions } from "antd";
import translate from "../../../asset/i18n/translate";

export default function Title({ title, money, shift }) {
  return (
    <Descriptions title={title}>
      {shift.map((item, index) => (
        <Descriptions.Item
          className="text-cap"
          key={item.name}
          label={translate("shiftCus", { num: index + 1 })}
        >
          {item.start}h-{item.end}h
        </Descriptions.Item>
      ))}
      <Descriptions.Item label={translate("moneyReceptionist")}>
        {money.receptionist}đ
      </Descriptions.Item>
      <Descriptions.Item label={translate("moneyServer")}>
        {money.server}đ
      </Descriptions.Item>
      <Descriptions.Item label={translate("moneyCook")}>
        {money.cook}đ
      </Descriptions.Item>
    </Descriptions>
  );
}
