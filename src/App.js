import React from 'react';
import { Route, Switch } from 'react-router';
import TopNav from './components/TopNav';
import Landing from './components/Landing';
import Detail from './components/Detail';
import './css/App.css';

function App() {
  return (
    <div className="App">
      <TopNav />
      <Switch>
        <Route path="/" exact component={Landing} />
        <Route path="/detail/:username/:repoName" component={Detail} />
      </Switch>
    </div>
  );
}

export default App;
