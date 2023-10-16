import dayjs from "dayjs";

export function changeFormatHour(dataString: string) {
  const data = dayjs(dataString);

  const horarioFormatado = data.format("HH:mm");

  return horarioFormatado;
}
