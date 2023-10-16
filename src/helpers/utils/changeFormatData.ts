import dayjs from "dayjs";

export function changeFormatData(dataString: string) {
  const data = dayjs(dataString);

  const dataFormatada = data.format("DD/MM/YYYY");

  return dataFormatada;
}
