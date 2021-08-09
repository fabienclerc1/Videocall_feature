import './App.css';
import styled from 'styled-components';
import {Route, BrowserRouter as Router, Switch} from "react-router-dom";
import Login from './pages/Login';
import Call from './pages/Call';
import WithAuthentication from './components/HOC';

const Application = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100vh;
`;

function App() {
  return (
    <Application className="App">
      <Router>
        <Switch>
          <Route exact path={'/'} component={Login} />
          <Route exact path={'/call'} component={WithAuthentication(Call)} />
        </Switch>
      </Router>
    </Application>
  );
}

export default App;
