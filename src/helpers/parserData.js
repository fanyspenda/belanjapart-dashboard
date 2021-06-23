import moment from 'moment';

export const parserData = vl => {
  const parse = vl.reduce((acc, data, i) => {
    const dataBefore = vl[i - 1];
    const dateBefore = dataBefore && moment(dataBefore.createdAt).format('DD');
    const dateCurrent = moment(data.createdAt).format('DD');
    if (dateCurrent === dateBefore) {
      acc.push({ date: null, ...data });
    } else {
      acc.push({ date: data.createdAt, separator: true, ...data });
    }
    return acc;
  }, []);

  return parse;
};

export function formatIDR(number) {
  const temp = number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  return 'Rp '.concat(temp, ',00');
}
