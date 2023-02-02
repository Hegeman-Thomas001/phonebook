import { useState } from "react";
//
import Filter from "./components/Filter/Filter";
import Persons from "./components/Persons/Persons";
import PersonForm from "./components/PersonForm/PersonForm";
//
const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-1234567" },
    { name: "Arlo", number: "040-111" },
    { name: "Artoh", number: "040-1111" },
  ]);
  const [newName, setNewName] = useState("");
  const [personExists, setPersonExists] = useState(false);
  const [newNumber, setNewNumber] = useState("");
  const [searchName, setSearchName] = useState("");

  const userSubmit = (evt) => {
    evt.preventDefault();

    const inputName = newName.toLowerCase();
    const filteredPersons = persons.filter(
      (person) => person.name.toLowerCase() === inputName
    );

    if (filteredPersons.length) {
      setPersonExists(true);
    } else {
      setPersons([...persons, { name: newName, number: newNumber }]);
      setNewName("");
      setNewNumber("");
    }
  };

  const onSearchChange = (evt) => {
    setSearchName(evt.target.value);
  };

  const onNameChange = (evt) => {
    if (personExists) {
      setPersonExists(false);
    }
    setNewName(evt.target.value);
  };

  const onNumberChange = (evt) => {
    setNewNumber(evt.target.value);
  };

  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(searchName.toLowerCase())
  );

  console.log(persons);

  return (
    <section>
      <section>
        <h2>Phonebook</h2>
        <Filter onSearchChange={onSearchChange} value={searchName} />
      </section>
      <h2>Add a name and number</h2>
      <PersonForm
        userSubmit={userSubmit}
        onNameChange={onNameChange}
        onNumberChange={onNumberChange}
        newName={newName}
        newNumber={newNumber}
      />
      {personExists && (
        <p style={{ color: "red" }}>{`${newName} already exists.`}</p>
      )}
      <section>
        <h2>Numbers</h2>
        <Persons filteredPersons={filteredPersons} />
      </section>
    </section>
  );
};

export default App;
