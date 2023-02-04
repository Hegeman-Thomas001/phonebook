//
const PersonForm = ({
  userSubmit,
  onNameChange,
  onNumberChange,
  newName,
  newNumber,
}) => {
  return (
    <form onSubmit={userSubmit}>
      <section>
        name: <input onChange={onNameChange} value={newName} required />
      </section>
      <section>
        number: <input onChange={onNumberChange} value={newNumber} required />
      </section>
      <section>
        <button type="submit">add</button>
      </section>
    </form>
  );
};

export default PersonForm;
