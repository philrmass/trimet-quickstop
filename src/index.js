import Container from './components/Container';
import Cache from './cache';
import './style';

const DATA_REQUEST_INTERVAL = 30000;
const cache = new Cache(DATA_REQUEST_INTERVAL);

export default function App() {
  return <Container cache={cache} />;
}
// ??? fix all lint errors, no react
// ??? update to functional components
// ??? update graph
// ??? fix cache
// ??? merge with pr
// ??? deploy
// ??? fix manifest icon link
// ??? add real-time map
