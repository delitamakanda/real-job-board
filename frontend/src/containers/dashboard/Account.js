import React, { Component } from 'react';
import { Link, Route, Switch } from 'react-router-dom';

import Profile from './profile/Profile';
import Notifications from './notifications/Notifications';
import Annonces from './annonces/Annonces';

import { SidebarTab, Pane, Tablist } from 'evergreen-ui';

class Account extends Component {

  state = {
    selectedIndex: null,
    tabs: [
      {id: 1, title:'Profil', url: '/mon-compte/profil'}, 
      {id: 2, title:'Vos annonces', url: '/mon-compte/vos-annonces'}, 
      {id: 3, title:'Notifications', url: '/mon-compte/notifications'}
    ]
  }

  render() {
    return (
        <Pane display="flex">
          <Tablist marginBottom={16} flexBasis={240} marginRight={24}>
            {this.state.tabs.map((tab, index) => (
              <SidebarTab
                key={tab.id}
                id={tab.id}
                onSelect={() => this.setState({ selectedIndex: index })}
                isSelected={index === this.state.selectedIndex}
                aria-controls={`panel-${tab.id}`}
              >
                <Link to={tab.url}>{tab.title}</Link>
              </SidebarTab>
            ))}
          </Tablist>
          <Pane padding={16} background="tint1" flex="1">
            {this.state.tabs.map((tab, index) => (
              <Pane
                key={tab.id}
                id={`panel-${tab.id}`}
                role="tabpanel"
                aria-labelledby={tab.id}
                aria-hidden={index !== this.state.selectedIndex}
                display={index === this.state.selectedIndex ? 'block' : 'none'}
              >
                <Switch>
                  <Route path="/mon-compte/profil" component={Profile} />
                  <Route path="/mon-compte/notifications" component={Notifications} />
                  <Route path="/mon-compte/vos-annonces" component={Annonces} />
                </Switch>
              </Pane>
            ))}
          </Pane>
        </Pane>
    )
  }
}
  
export default Account;
