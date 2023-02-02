import axios from "axios";
import { useEffect, useState } from "react";

//
import Filter from "./components/Filter/Filter";
import Persons from "./components/Persons/Persons";
import PersonForm from "./components/PersonForm/PersonForm";
//
const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [personExists, setPersonExists] = useState(false);
  const [newNumber, setNewNumber] = useState("");
  const [searchName, setSearchName] = useState("");

  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(searchName.toLowerCase())
  );

  useEffect(() => {
    axios
      .get("http://localhost:3001/persons")
      .then((response) => {
        setPersons(response.data);
      })
      .catch((err) => console.log(err, "error"));
  }, []);

  const userSubmit = (evt) => {
    evt.preventDefault();

    const inputName = newName.toLowerCase();
    const filteredPersons = persons.filter(
      (person) => person.name.toLowerCase() === inputName
    );

    if (filteredPersons.length) {
      setPersonExists(true);
    } else {
      const person = {
        name: newName,
        number: newNumber,
      };

      axios
        .post("http://localhost:3001/persons", person)
        .then((response) =>
          setPersons([...persons, { ...person, id: response.data.id }])
        )
        .catch((err) => console.log("error", err));
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
