import { useEffect, useState } from "react";
//
import { getAll, create, update, remove } from "../services/helpers";
//
import Filter from "../components/Filter/Filter";
import Persons from "../components/Persons/Persons";
import PersonForm from "../components/PersonForm/PersonForm";
//
// import "./App.css";
//
const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchName, setSearchName] = useState("");

  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(searchName.toLowerCase())
  );

  useEffect(() => {
    try {
      const fetchData = async () => {
        const data = await getAll();

        setPersons(data);
      };

      fetchData();
    } catch (error) {
      console.log(error);
    }
  }, []);

  const userSubmit = async (evt) => {
    try {
      evt.preventDefault();

      const filteredPersons = persons.filter(
        (person) => person.name.toLowerCase() === newName.toLowerCase()
      );

      if (filteredPersons.length) {
        const oldPerson = filteredPersons[0];
        const data = await update(oldPerson.id, {
          ...oldPerson,
          number: newNumber,
        });

        setPersons(
          persons.map((person) => (person.id === oldPerson.id ? data : person))
        );
      } else {
        const person = await create({
          name: newName,
          number: newNumber,
        });

        setPersons([...persons, { ...person }]);
        setNewName("");
        setNewNumber("");
      }
    } catch (error) {
      console.log("app submit", error);
    }
  };

  const onSearchChange = (evt) => {
    setSearchName(evt.target.value);
  };

  const onNameChange = (evt) => {
    setNewName(evt.target.value);
  };

  const onNumberChange = (evt) => {
    setNewNumber(evt.target.value);
  };

  const handleDelete = async (evt) => {
    try {
      const id = +evt.target.id;
      const status = await remove(id);

      if (status === 200) {
        setPersons(persons.filter((person) => person.id !== id));
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="flex flex-col items-center justify-center">
      <section>
        <h2>Phonebook</h2>
        <Filter onSearchChange={onSearchChange} value={searchName} />
      </section>
      <section>
        <h2>Add a name and number</h2>
        <PersonForm
          userSubmit={userSubmit}
          onNameChange={onNameChange}
          onNumberChange={onNumberChange}
          newName={newName}
          newNumber={newNumber}
        />
        {/* {personExists && (
        <p
          style={{ color: "red", fontSize: "2rem" }}
        >{`${newName} already exists.`}</p>
      )} */}
      </section>
      <section>
        <h2>Numbers</h2>
        <Persons
          filteredPersons={filteredPersons}
          handleDelete={handleDelete}
        />
      </section>
    </section>
  );
};

export default App;
