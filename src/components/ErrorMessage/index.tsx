type Props = {
  message: string;
};

export default function ErrorMessage({ message }: Props) {
  return (
    <p className="error-message" role="alert">
      {message}
    </p>
  );
}
