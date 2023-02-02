import Person from "../Person/Person";
//
const Persons = ({ filteredPersons }) => {
  return (
    <>
      {filteredPersons.map((person) => (
        <Person key={person.name} person={person} />
      ))}
    </>
  );
};

export default Persons;
