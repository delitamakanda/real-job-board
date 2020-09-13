import React, { Component } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { connect } from 'react-redux';
// import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { authStudentSignup, authEmployeeSignup, authEnterpriseSignup, resetAuthLoginUserFailure } from '../../store/actions/auth';

import 'react-tabs/style/react-tabs.css';

class RegistrationForm extends Component {

  state = {
    email: '',
    password1: '',
    password2: ''
  }


  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = e => {
    e.preventDefault()
    // const { email, password1, password2 } = this.state
    // this.props.signupStudent(email, password1, password2)
  }

  componentWillUnmount() {
    this.props.reset()
  }

  render() {
    let statusTextClassNames = null;
    if (this.props.statusText) {
      statusTextClassNames = classNames({
        'alert': true,
        'alert-danger': this.props.statusText.indexOf('Authentication Error') === 0,
        'alert-success': this.props.statusText.indexOf('Authentication Error') !== 0
      });
    }
    const statusText = (
      <div className="row">
        <div className="col-sm-12">
          <div className={statusTextClassNames}>
            {this.props.statusText}
          </div>
        </div>
      </div>

    )
    return (
      <div className="container signup">
        <h1>Créer un compte gratuitement</h1>
        <Tabs>
          <TabList>
            <Tab>Etudiant</Tab>
            <Tab>Employé</Tab>
            <Tab>Entreprise</Tab>
          </TabList>

          <TabPanel>
            <h2>Any content 1</h2>
          </TabPanel>
          <TabPanel>
            <h2>Any content 2</h2>
          </TabPanel>
          <TabPanel>
            <h2>Any content 3</h2>
          </TabPanel>
        </Tabs>
        {statusText}
      </div>
    )
    /* return (
    ) */
  }
}

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    isAuthenticated: state.auth.isAuthenticated,
    isAuthenticating: state.auth.isAuthenticating,
    statusText: state.auth.statusText
  }
}

const mapDispatchToProps = dispatch => {
  return {
    signupStudent: (username, email, password1, password2, last_name, first_name, birth_date, home_phone_number, mobile_phone_number, year, cursus, faculty) => dispatch(authStudentSignup(username, email, password1, password2, last_name, first_name, birth_date, home_phone_number, mobile_phone_number, year, cursus, faculty)),

    signupEmployee: (username, email, password1, password2, last_name, first_name, birth_date, home_phone_number, mobile_phone_number, office, faculty, job) => dispatch(authEmployeeSignup(username, email, password1, password2, last_name, first_name, birth_date, home_phone_number, mobile_phone_number, office, faculty, job)),

    signupEnterprise: (username, email, password1, password2, last_name, first_name, birth_date, home_phone_number, mobile_phone_number, logo, office, company_url, address, description) => dispatch(authEnterpriseSignup(username, email, password1, password2, last_name, first_name, birth_date, home_phone_number, mobile_phone_number, logo, office, company_url, address, description)),
    reset: () => dispatch(resetAuthLoginUserFailure())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationForm);
