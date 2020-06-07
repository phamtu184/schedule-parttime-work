import translate from "../../../asset/i18n/translate";
const formatResult = (receptionist, server, cook) => {
  return [
    { key: "counter", fullname: translate("counter"), isTitle: true },
    ...receptionist,
    { key: "dinning", fullname: translate("dinning"), isTitle: true },
    ...server,
    { key: "kitchen", fullname: translate("kitchen"), isTitle: true },
    ...cook,
  ];
};
export default formatResult;
