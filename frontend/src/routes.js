import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Login from './containers/auth/Login';
import RegistrationForm from './containers/auth/Signup';
import Search from './containers/search/Search';
import NoMatchPage from './containers/no-match/NoMatch';
import Profile from './containers/dashboard/profile/Profile';
import Notifications from './containers/dashboard/notifications/Notifications';
import Annonces from './containers/dashboard/annonces/Annonces';
import EmployeeForm from "./containers/auth/registration/EmployeeForm";
import StudentForm from "./containers/auth/registration/StudentForm";
import EnterpriseForm from "./containers/auth/registration/EnterpriseForm";

const BaseRouter = () => (
    <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={RegistrationForm} />
        <Route exact path="/s/enterprise" component={EnterpriseForm} />
        <Route exact path="/s/employee" component={EmployeeForm} />
        <Route exact path="/s/student" component={StudentForm} />
        <Route path="/mon-compte">
            <Route path="/mon-compte/profil" component={Profile} />
            <Route path="/mon-compte/notifications" component={Notifications} />
            <Route path="/mon-compte/vos-annonces" component={Annonces} />
        </Route>
        <Route exact path="/" component={Search} />
        <Route path="*" component={NoMatchPage} />
    </Switch>
)

export default BaseRouter;
