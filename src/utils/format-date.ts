import moment from "moment";

export const formatBirthday = (birthday: string) => {
  const formattedDate = moment(birthday).format("YYYY-MM-DD");
  return formattedDate;
};

export const formatAge = (birthday: string) => {
  const formattedDate = moment(birthday).format("DD / MM / YYYY");
  const age = moment().diff(moment(birthday), "years");

  return `${formattedDate} (Age ${age})`;
};
