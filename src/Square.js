export default function Square({ value, onSquareClick }) {
  return (
    <button
      className="square"
      onClick={onSquareClick}
      type="button"
    >
      {value}
    </button>
  );
}
