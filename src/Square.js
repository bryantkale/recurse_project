import { motion } from 'motion/react';

export default function Square({ value, onSquareClick }) {
  return (
    <motion.button
      className="square"
      onClick={onSquareClick}
      type="button"
      whileHover={{
        y: [0, -8, 0, -4, 0],
        x: [0, 2, -2, 1, 0],
        rotate: [0, -3, 3, -2, 0],
        scale: [1, 1.06, 1.03, 1.05, 1.02],
      }}
      whileTap={{ scale: 0.94 }}
      transition={{ duration: 0.45, ease: 'easeInOut' }}
    >
      {value}
    </motion.button>
  );
}
