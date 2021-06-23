const truncate = (string, max) => {
  if (string) {
    if (string.length > max) return `${string.substring(0, max)}...`;
    return string;
  }
};

const regexStartEndSpace = /^\s+|\s+$/g;

export { truncate, regexStartEndSpace };
