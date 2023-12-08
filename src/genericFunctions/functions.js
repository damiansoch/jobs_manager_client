export const isResponceSuccess = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return true;
  } else {
    return false;
  }
};
