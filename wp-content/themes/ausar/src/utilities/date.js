export const getYear = (timestamp) => {
  const date = new Date(timestamp);

  return date.getUTCFullYear().toString();
}

export const getMonth = (timestamp) => {
  const date = new Date(timestamp);
  const month = date.getUTCMonth() + 1;

  return month < 10 ? `0${month}` : `${month}`;
}

export const getDate = (timestamp) => {
  const date = new Date(timestamp);
  const month = date.getUTCMonth() + 1;
  const day = date.getUTCDay();
  const year = date.getUTCFullYear();

  return `${month}/${day}/${year}`;
}
