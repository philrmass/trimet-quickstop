import Container from './components/Container';
import Cache from './cache';
import Routes from './routes';
import routeStops from './assets/routeStops.json';
import './style';

const DATA_REQUEST_INTERVAL = 30000;

const cache = new Cache(DATA_REQUEST_INTERVAL);
// ??? remove stopsById 
const stopsById = Routes.stopsById(routeStops);

export default function App() {
  return (
    <div>
      <Container
        cache={cache}
        stopsById={stopsById}
      />
    </div>
  );
}
