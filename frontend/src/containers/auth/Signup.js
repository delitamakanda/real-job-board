import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { authSignup, resetAuthLoginUserFailure } from '../../store/actions/auth';

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
      const { email, password1, password2 } = this.state
      this.props.signup(email, password1, password2)
    }

    componentWillUnmount() {
      this.props.reset()
    }

    render() {
      const { loading } = this.props;
      const { email, password1, password2 } = this.state
      let statusText = null;
      if (this.props.statusText) {
        const statusTextClassNames = classNames({
            'alert': true,
            'alert-danger': this.props.statusText.indexOf('Authentication Error') === 0,
            'alert-success': this.props.statusText.indexOf('Authentication Error') !== 0
        });

        statusText = (
            <div className="row">
                <div className="col-sm-12">
                    <div className={statusTextClassNames}>
                        {this.props.statusText}
                    </div>
                </div>
            </div>
        );
      }
      return (
        <div className="container signup">
          <h1>Créer un compte gratuitement</h1>
          <div>
            {statusText}
            <form onSubmit={this.handleSubmit}>
              <input type="email"
                onChange={this.handleChange}
                value={email}
                name="email"
                placeholder="E-mail"
              />
              <input type="password"
                onChange={this.handleChange}
                value={password1}
                placeholder="Mot de passe"
                name="password1" 
              />
              <input type="password"
                onChange={this.handleChange}
                value={password2}
                placeholder="Confirmer mot de passe"
                name="password2" 
              />

              <button type="submit"
                loading={loading.toString()}
                disabled={loading}
              >
                Connexion
              </button>
            </form>
            <div>
            Vous avez un compte ? <Link to="/login">Connectez-vous</Link>
            </div>
            <div>
                <Link to="/">Mot de passe oublié ?</Link>
            </div>
          </div>
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
    signup: (email, password1, password2) => dispatch(authSignup(email, password1, password2)),
    reset: () => dispatch(resetAuthLoginUserFailure())
  }
}
  
export default connect(mapStateToProps, mapDispatchToProps)(RegistrationForm);
