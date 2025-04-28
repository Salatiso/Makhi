import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Household from './pages/Household';
import Neighborhood from './pages/Neighborhood';
import Utilities from './pages/Utilities';
import Social from './pages/Social';
import Incidents from './pages/Incidents';
import Profile from './pages/Profile';

function App() {
    const [user, setUser] = useState({ name: 'Salatiso', house: '12', unit: '', isAdmin: true }); // Mock user

    return (
        <Router>
            <div className="app">
                <Navbar />
                <Switch>
                    <Route exact path="/" component={() => <Home user={user} />} />
                    <Route path="/login" component={Login} />
                    <Route path="/household" component={() => <Household user={user} />} />
                    <Route path="/neighborhood" component={() => <Neighborhood user={user} />} />
                    <Route path="/utilities" component={Utilities} />
                    <Route path="/social" component={Social} />
                    <Route path="/incidents" component={Incidents} />
                    <Route path="/profile" component={() => <Profile user={user} />} />
                </Switch>
            </div>
        </Router>
    );
}

export default App;
