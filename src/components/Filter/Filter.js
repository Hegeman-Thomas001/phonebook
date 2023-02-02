//
const Filter = ({ onSearchChange, searchName }) => {
  return (
    <>
      Filter shown with <input onChange={onSearchChange} value={searchName} />
    </>
  );
};

export default Filter;
