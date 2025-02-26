import moment from "moment";

export const formatBirthday = (birthday: string) => {
  const formattedDate = moment(birthday).format("YYYY-MM-DD");
  return formattedDate;
};
