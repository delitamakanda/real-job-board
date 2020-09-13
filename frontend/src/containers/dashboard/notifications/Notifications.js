import React, { Component } from 'react';
import { SidebarTab, Pane, Tablist } from 'evergreen-ui';

class Notifications extends Component {

  state = {
    selectedIndex: null,
    tabs: [
      { id: 1, title: 'Profil', text: 'profile' },
      { id: 2, title: 'Vos annonces', text: 'annonces' },
      { id: 3, title: 'Notifications', text: 'notifications' }
    ]
  }
  render() {
    return (
      <div>
        <h1>Notifications</h1>
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
                {tab.title}
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
                {tab.text}
              </Pane>
            ))}
          </Pane>
        </Pane>
      </div>
    )
  }
};

export default Notifications;
