import React, { Component, useState, useEffect } from 'react';
import { connect } from 'react-redux';
// import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { authEmployeeSignup } from '../../../store/actions/auth';
import { jobListURL, facultyListURL } from '../../../constants';
import { makeStyles, InputLabel, FormControl, Input, InputAdornment, CircularProgress, IconButton, TextField } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import { Visibility, VisibilityOff } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'column'
    },
    margin: {
        margin: theme.spacing(1),
    },
    textField: {
        width: '100%',
    },
}));

const FormEmployee = () => {
    const classes = useStyles();
    const [values, setValues] = React.useState({
        password: '',
        showPassword: false,
    });
    const [open, setOpen] = useState(false);
    const [open2, setOpen2] = useState(false);
    const [options, setOptions] = useState([]);
    const [options2, setOptions2] = useState([]);
    const loading = open && options.length === 0;
    const loading2 = open2 && options2.length === 0;

    useEffect(() => {
        let active = true;

        if (!loading) {
            return undefined;
        }

        (async () => {
            const response = await fetch(facultyListURL);
            const faculties = await response.json();

            if (active) {
                setOptions(Object.keys(faculties).map((key) => faculties[key]));
            }

        })();

        return () => {
            active = false;
        };
    }, [loading]);

    useEffect(() => {
        let active2 = true;

        if (!loading2) {
            return undefined;
        }

        (async () => {
            const response = await fetch(jobListURL);
            const jobs = await response.json();

            if (active2) {
                setOptions2(Object.keys(jobs).map((key) => jobs[key]));
            }

        })();

        return () => {
            active2 = false;
        };
    }, [loading2]);

    useEffect(() => {
        if (!open) {
            setOptions([]);
        }
    }, [open]);

    useEffect(() => {
        if (!open2) {
            setOptions2([]);
        }
    }, [open2]);

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    return (
        <form className={classes.root}>
            <div>
                <FormControl className={classNames(classes.margin, classes.textField)}>
                    <InputLabel htmlFor="standard-adornment-weight">Identifiant</InputLabel>
                    <Input
                        id="standard-adornment-weight"
                    />
                </FormControl>
            </div>
            <div>
                <FormControl className={classNames(classes.margin, classes.textField)}>
                    <InputLabel htmlFor="standard-adornment-weight">E-mail</InputLabel>
                    <Input
                        id="standard-adornment-weight"
                    />
                </FormControl>
            </div>
            <div>
                <FormControl className={classNames(classes.margin, classes.textField)}>
                    <InputLabel htmlFor="standard-adornment-password">Mot de passe</InputLabel>
                    <Input
                        id="standard-adornment-password"
                        type={values.showPassword ? 'text' : 'password'}
                        onChange={handleChange('password')}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                >
                                    {values.showPassword ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                </FormControl>
            </div>
            <div>
                <FormControl className={classNames(classes.margin, classes.textField)}>
                    <InputLabel htmlFor="standard-adornment-password">Confirmation de mot de passe</InputLabel>
                    <Input
                        id="standard-adornment-password"
                        type='password'
                        onChange={handleChange('password')}
                    />
                </FormControl>
            </div>
            <div>
                <FormControl className={classNames(classes.margin)}>
                    <InputLabel htmlFor="standard-adornment-weight">Prénom</InputLabel>
                    <Input
                        id="standard-adornment-weight"
                    />
                </FormControl>
                <FormControl className={classNames(classes.margin)}>
                    <InputLabel htmlFor="standard-adornment-weight">Nom</InputLabel>
                    <Input
                        id="standard-adornment-weight"
                    />
                </FormControl>
                <FormControl className={classNames(classes.margin)}>
                    <InputLabel htmlFor="standard-adornment-weight">Date de Naissance</InputLabel>
                    <Input
                        id="standard-adornment-weight"
                    />
                </FormControl>
            </div>
            <div>
                <FormControl className={classNames(classes.margin)}>
                    <InputLabel htmlFor="standard-adornment-weight">Mobile</InputLabel>
                    <Input
                        id="standard-adornment-weight"
                    />
                </FormControl>
                <FormControl className={classNames(classes.margin)}>
                    <InputLabel htmlFor="standard-adornment-weight">Téléphone</InputLabel>
                    <Input
                        id="standard-adornment-weight"
                    />
                </FormControl>
            </div>
            <div>
                <FormControl className={classNames(classes.margin)}>
                    <InputLabel htmlFor="standard-adornment-weight">Office</InputLabel>
                    <Input
                        id="standard-adornment-weight"
                    />
                </FormControl>
                <Autocomplete
                    id="asynchronous-demo"
                    style={{ width: 'auto' }}
                    open={open}
                    onOpen={() => {
                        setOpen(true);
                    }}
                    onClose={() => {
                        setOpen(false);
                    }}
                    getOptionSelected={(option, value) => option.id === value.id}
                    getOptionLabel={(option) => option.name}
                    options={options}
                    loading={loading}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Faculté"
                            variant="outlined"
                            InputProps={{
                                ...params.InputProps,
                                endAdornment: (
                                    <React.Fragment>
                                        {loading ? <CircularProgress color="inherit" size={20} /> : null}
                                        {params.InputProps.endAdornment}
                                    </React.Fragment>
                                ),
                            }}
                        />
                    )}
                />
                <Autocomplete
                    id="asynchronous-demo"
                    style={{ width: 'auto' }}
                    open={open2}
                    onOpen={() => {
                        setOpen2(true);
                    }}
                    onClose={() => {
                        setOpen2(false);
                    }}
                    getOptionSelected={(option, value) => option.id === value.id}
                    getOptionLabel={(option) => option.title}
                    options={options2}
                    loading={loading2}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Profession"
                            variant="outlined"
                            InputProps={{
                                ...params.InputProps,
                                endAdornment: (
                                    <React.Fragment>
                                        {loading2 ? <CircularProgress color="inherit" size={20} /> : null}
                                        {params.InputProps.endAdornment}
                                    </React.Fragment>
                                ),
                            }}
                        />
                    )}
                />
            </div>
        </form>
    )
}

class EmployeeForm extends Component {

    state = {
        loading: false,
        error: null,
        formData: {
            username: '',
            email: '',
            password1: '',
            password2: '',
            last_name: '',
            first_name: '',
            birth_date: '',
            home_phone_number: '',
            mobile_phone_number: '',
            office: '',
            job: '',
            faculty: ''
        },
        success: false,
        saving: false
    }


    handleChange = e => {
        const { formData } = this.state
        const updatedFormData = {
            ...formData,
            [e.target.name]: e.target.value
        }
        this.setState({
            formData: updatedFormData
        })
    }

    handleSubmit = e => {
        this.setState({ saving: true });
        e.preventDefault()
        // const { email, password1, password2 } = this.state
        // this.props.signupStudent(email, password1, password2)
    }

    render() {
        return (
            <div className="container signup">
                <h1>Créer un compte Employé gratuitement</h1>
                <FormEmployee></FormEmployee>
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
        signupEmployee: (username, email, password1, password2, last_name, first_name, birth_date, home_phone_number, mobile_phone_number, office, faculty, job) => dispatch(authEmployeeSignup(username, email, password1, password2, last_name, first_name, birth_date, home_phone_number, mobile_phone_number, office, faculty, job))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeForm);
