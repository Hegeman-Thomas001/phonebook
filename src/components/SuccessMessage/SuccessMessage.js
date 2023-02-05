import "./SuccessMessage.css";
//
const SuccessMessage = ({ message }) => {
  if (message === null) {
    return null;
  }

  return (
    <section>
      <p className="success">{message}</p>
    </section>
  );
};

export default SuccessMessage;
