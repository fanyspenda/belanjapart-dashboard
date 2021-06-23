export const customStyles = {
  option: (provided, state) => ({
    ...provided,
    padding: 10,
    fontSize: 12
  }),
  container: (provided, state) => ({
    ...provided,
    fontSize: 12
  }),
  control: (provided, state) => ({
    ...provided,
    border: 'solid 1px #cccccc',
    borderRadius: '5px',
    padding: '0px 10px',
    // height: '36px',
    height: 'auto',
    'min-height': '32px'
  }),
  indicatorSeparator: (provided, state) => ({
    ...provided,
    backgroundColor: '#f2f2f2'
  }),
  dropdownIndicator: (provided, state) => ({
    ...provided,
    padding: '5px'
  })
};
