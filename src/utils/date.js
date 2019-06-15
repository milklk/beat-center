export const format = (d, type) => {
  const date = new Date(d);
  const yyyy = date.getFullYear();
  const MM = date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
  const dd = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
  const HH = date.getHours() < 10 ? `0${date.getHours()}` : date.getDate();
  const mm = date.getMinutes() < 10 ? `0${date.getHours()}` : date.getDate();
  const ss = date.getSeconds() < 10 ? `0${date.getHours()}` : date.getDate();
  switch (type) {
    case "yyyy-MM-dd":
      return `${yyyy}-${MM}-${dd}`;
      break;
    case "yyyy-MM-dd HH:mm:ss":
      return `${yyyy}-${MM}-${dd} ${HH}:${mm}:${ss}`;
      break;
    default:
      return `${yyyy}-${MM}-${dd}`;
      break;
  }
};
