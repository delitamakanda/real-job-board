import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { Link } from 'react-router-dom';
// import classNames from 'classnames';
import { authEnterpriseSignup } from '../../../store/actions/auth';

class EnterpriseForm extends Component {

  state = {
    formData: {
      email: '',
      password1: '',
      password2: ''
    }
  }


  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = e => {
    e.preventDefault()
    // const { email, password1, password2 } = this.state
    // this.props.signupStudent(email, password1, password2)
  }

  render() {
    return (
      <div className="container signup">
        <h1>Créer un compte Entreprise gratuitement</h1>
      </div>
    )
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
    signupEnterprise: (username, email, password1, password2, last_name, first_name, birth_date, home_phone_number, mobile_phone_number, logo, office, company_url, address, description) => dispatch(authEnterpriseSignup(username, email, password1, password2, last_name, first_name, birth_date, home_phone_number, mobile_phone_number, logo, office, company_url, address, description))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EnterpriseForm);
