import { createRoot } from 'react-dom/client';
import './styles.css';
import Game from './Game';

const rootEl = document.getElementById('root');
if (!rootEl) {
  throw new Error('Missing #root element in HTML');
}

const root = createRoot(rootEl);
root.render(<Game />);
