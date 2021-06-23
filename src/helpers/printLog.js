/* eslint-disable no-lone-blocks */
const printLog = (name, value, color) => {
  {
    console.log(
      `%c ${name} `,
      `color: white; background-color: ${color}`,
      value
    );
  }
};

export default printLog;
