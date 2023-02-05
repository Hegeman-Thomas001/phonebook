import "./ErrorMessage.css";
//
const ErrorMessage = ({ message }) => {
  if (message === null) {
    return null;
  }

  return (
    <section>
      <p className="error">{message}</p>
    </section>
  );
};

export default ErrorMessage;
