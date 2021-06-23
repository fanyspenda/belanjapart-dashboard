import moment from 'moment';

const getStringDate = date => {
  const dayString = moment(date).format('DD MMM YYYY');

  return dayString;
};

export { getStringDate };
