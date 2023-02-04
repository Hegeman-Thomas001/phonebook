import React from "react";

const Person = ({ person, handleDelete }) => {
  return (
    <p>
      <span>{person.name}</span> <span>{person.number}</span>
      <button id={person.id} onClick={handleDelete}>
        Delete
      </button>
    </p>
  );
};

export default Person;
