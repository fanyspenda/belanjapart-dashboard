export const setPagination = data => {
  const obj = {
    currentPage: data.current_page,
    lastPage: data.last_page,
    count: data.count,
    recordPerPage: data.record_per_page
  };
  return obj;
};
