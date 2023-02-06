import { useEffect, useState } from "react";
//
import { getAll, create, update, remove } from "../services/helpers";
//
import ErrorMessage from "../components/ErrorMessage/ErrorMessage";
import Filter from "../components/Filter/Filter";
import Persons from "../components/Persons/Persons";
import PersonForm from "../components/PersonForm/PersonForm";
import SuccessMessage from "../components/SuccessMessage/SuccessMessage";
//
// import "./App.css";
//
const App = () => {
  const [errorMessage, setErrorMessage] = useState(null);
  const [persons, setPersons] = useState([]);
  const [message, setMessage] = useState(null);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchName, setSearchName] = useState("");

  console.log(persons);
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
    evt.preventDefault();
    try {
      const filteredPersons = persons.filter(
        (person) => person.name.toLowerCase() === newName.toLowerCase()
      );

      if (filteredPersons.length) {
        const oldPerson = filteredPersons[0];

        try {
          const data = await update(oldPerson.id, {
            ...oldPerson,
            number: newNumber,
          });

          if (!data) {
            throw Error("error, no data");
          }

          setPersons(
            persons.map((person) =>
              person.id === oldPerson.id ? data : person
            )
          );

          setNewName("");
          setNewNumber("");
          showMessage(`${oldPerson.name}'s number changed.`);
        } catch (error) {
          setErrorMessage(`${oldPerson.name} was already deleted.`);
          setTimeout(() => {
            setErrorMessage(null);
          }, 3000);
          setPersons(persons.filter((person) => person.id !== oldPerson.id));
        }
      } else {
        const person = await create({
          name: newName,
          number: newNumber,
        });

        setPersons([...persons, { ...person }]);
        setNewName("");
        setNewNumber("");
        showMessage(`${newName} added to phonebook!`);
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
    const id = +evt.target.id;

    try {
      const status = await remove(id);

      if (status === 200) {
        setPersons(persons.filter((person) => person.id !== id));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const showMessage = (msg) => {
    setMessage(msg);
    setTimeout(() => {
      setMessage(null);
    }, 3000);
  };

  return (
    <section className="flex flex-col items-center justify-center">
      <SuccessMessage message={message} />
      <ErrorMessage message={errorMessage} />
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
