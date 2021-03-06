import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';

// definir como vai funcionar a navegaçao entre as paginas
import Home from '../views/Home';
import Task from '../views/Task';
import QrCode from '../views/QrCode';

export default function Routes(){
    return (
        <BrowserRouter>
        <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/task" exact component={Task} />
            <Route path="/task/:id" exact component={Task} />
            <Route path="/qrCode" exact component={QrCode} />
        </Switch>
        </BrowserRouter>
    )
}