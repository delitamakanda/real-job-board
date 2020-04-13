import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import classNames from 'classnames';
import { authLoginUser, resetAuthLoginUserFailure } from '../../store/actions/auth';

class Login extends Component {

    state = {
      username: '',
      password: ''
    }

    UNSAFE_componentWillMount() {
      if (!this.props.isAuthenticated) {
        this.props.reset()
      }
    }


    handleChange = e => {
      this.setState({ [e.target.name]: e.target.value })
    }
  
    handleSubmit = e => {
      e.preventDefault()
      const { username, password } = this.state
      this.props.login(username, password)
    }

    render() {
      const { loading, isAuthenticated } = this.props;
      const { username, password } = this.state;
      let statusText = null;
      if (this.props.statusText) {
        const statusTextClassNames = classNames({
            'alert': true,
            'alert-danger': this.props.statusText.indexOf('Authentication Error') === 0,
            'alert-success': this.props.statusText.indexOf('Authentication Error') !== 0
        });

        if (isAuthenticated) {
          return <Redirect to="/mon-compte/profil" />
        }

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
        <div className="container login">
          <h1>Connexion</h1>
          <div>
            {statusText}
            <form onSubmit={this.handleSubmit}>
              <input type="email"
                onChange={this.handleChange}
                value={username}
                name="username"
                placeholder="E-mail"
              />
              <input type="password"
                onChange={this.handleChange}
                value={password}
                placeholder="Mot de passe"
                name="password" 
              />

              <button type="submit"
                loading={loading.toString()}
                disabled={loading || isAuthenticated}
              >
                Connexion
              </button>
            </form>
            <div>
            Vous n’êtes pas encore membre ? <Link className="link" to="/signup">Créez un compte gratuitement</Link>
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
      login: (username, password) => dispatch(authLoginUser(username, password)),
      reset: () => dispatch(resetAuthLoginUserFailure())
  }
}
  
export default connect(mapStateToProps, mapDispatchToProps)(Login);
