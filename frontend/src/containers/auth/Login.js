import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import classNames from 'classnames';
import { Button } from '@material-ui/core';
import { authLoginUser, resetAuthLoginUserFailure } from '../../store/actions/auth';
import Header from '../../components/Header';

class Login extends Component {

  state = {
    username: '',
    password: ''
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
        return <Redirect to="/" />
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
      <div className="flex flex-col min-h-screen overflow-hidden">
        <Header />
        <main className="flex-grow">
          <section className="bg-gradient-to-b from-gray-100 to-white">
            <div className="max-w-6xl mx-auto px-4 sm:px-6">
              <div className="pt-32 pb-12 md:pt-40 md:pb-20">
                <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
                  <h1 className="h1">{statusText}</h1>
                </div>
                <div className="max-w-sm mx-auto">

                  <form onSubmit={this.handleSubmit}>
                    <div className="flex flex-wrap -mx-3 mb-4">
                      <div className="w-full px-3">
                        <label className="block text-gray-800 text-sm font-medium mb-1" htmlFor="username">Email</label>
                        <input type="email"
                          onChange={this.handleChange}
                          value={username}
                          name="username"
                          id="username"
                          placeholder="E-mail"
                          className="form-input w-full text-gray-800"
                        />
                      </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-4">
                      <div className="w-full px-3">
                        <label className="block text-gray-800 text-sm font-medium mb-1" htmlFor="password">Password</label>
                        <input type="password"
                          onChange={this.handleChange}
                          value={password}
                          placeholder="Mot de passe"
                          name="password"
                          id="password"
                          className="form-input w-full text-gray-800"
                        />
                      </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mt-6">
                      <div className="w-full px-3">
                        <Button type="submit"
                          loading={loading.toString()}
                          disabled={loading || isAuthenticated}
                          className="btn text-white bg-blue-600 hover:bg-blue-700 w-full"
                        >
                          Connexion
                    </Button>
                      </div>
                    </div>
                  </form>
                  <div className="text-gray-600 text-center mt-6">
                    Vous n’êtes pas encore membre ? <Link to="/signup" className="text-blue-600 hover:underline transition duration-150 ease-in-out">Créez un compte gratuitement</Link>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <div>
          </div>
        </main>
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
