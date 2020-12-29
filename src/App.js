import { BrowserRouter, Route } from 'react-router-dom'
import Rpg from './rpg';
import Battle from './battle';
import map from './map';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div>
          <Route path='/Battle' component={Battle} />
          <Route exact path='/Rpg' component={Rpg} />
          <Route exact path='/' component={map} />
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
