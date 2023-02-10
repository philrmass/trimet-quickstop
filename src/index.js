import Container from './components/Container';
import Cache from './cache';
import './style';

const DATA_REQUEST_INTERVAL = 30000;
const cache = new Cache(DATA_REQUEST_INTERVAL);

export default function App() {
  return <Container cache={cache} />;
}

// TODO:
// Try adjusting the graph arrows
// Add a real icon
// Add a real-time map when you click on an arrival
