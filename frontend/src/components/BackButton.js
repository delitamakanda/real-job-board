import React, { Component } from 'react';
import { render } from 'react-dom';

import { Link, Router, Route, hashHistory } from 'react-router';

import Icon from '../Icons'

class BackButton extends Component{

    constructor(props){
        super(props);
        if (!props.icon) props.icon = 'leftArrow';
    }

    handleClick (event) {
        if(this.props.url) hashHistory.push(this.props.url);
        else hashHistory.goBack();
    }

    render() {
        return (
            <div onClick={this.handleClick.bind(this)} className={'uiButton backButton'}>
              <Icon kind="chevron-left" width="20" height="20" color="black" className="back-icon" />
            </div>
        );
    }
};

export default BackButton;
