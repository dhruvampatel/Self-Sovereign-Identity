import Login from './components/Login/Login';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Home from './components/Home/Home';
require('dotenv').config();

function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route 
            exact
            path='/login'
            component={Login}/>
          <Route 
            exact
            path='/'
            component={Login}/>
          <Route 
            exact
            path='/home'
            component={Home}/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
