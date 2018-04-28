import React from 'react';
import Flux from "@4geeksacademy/react-flux-dash";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Dashboard from "./views/Dashboard.jsx";
import Groups from "./views/Groups.jsx";
import Events from "./views/Events.jsx";
import Meetup from "./views/Meetup.jsx";
import Login from "./views/Login.jsx";

//notice that there's only ONE dot meaning stay in the same folder ans go to actions because LAYOUT is a brother of ACTIONS
import meetupActions from './actions/MeetupActions.jsx';

export default class Layout extends Flux.View {
  constructor(){
    super();
    meetupActions.loadApiMeetups();
    meetupActions.loadApiEvents();

  }
  render() {
    return (
      <div>
        <BrowserRouter>
          <div>
            <Switch>
              <Route exact path="/" component={Dashboard} />
              <Route exact path="/dashboard" component={Dashboard} />
              <Route exact path="/groups/:id" component={Groups} />
              <Route exact path="/events/:id" component={Events} />
              <Route exact path="/meetup/:id" component={Meetup} />
              <Route exact path="/login/" component={Login} />


              <Route render={() => <h1>Not found!</h1>} />
            </Switch>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}


// layout is the parent of ALL the views. It loads first