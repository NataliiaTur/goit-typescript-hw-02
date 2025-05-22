interface ErrorMessageProps {
  message: string | number;
}

const ErrorMessage = ({ message }: ErrorMessageProps) => {
  return (
    <div style={{ textAlign: "center", marginTop: "20px", color: "red" }}>
      <p>{message}</p>
    </div>
  );
};

export default ErrorMessage;
