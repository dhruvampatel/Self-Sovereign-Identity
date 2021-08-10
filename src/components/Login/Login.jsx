import './Login.css';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { TextField, Button, InputAdornment } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {PersonOutline, FingerprintOutlined} from '@material-ui/icons';
import { useState } from 'react';
import {useHistory} from 'react-router-dom';
import {useCookies} from 'react-cookie';
const fetch = require('node-fetch');

//Styling material-ui components
const styles = makeStyles({
    textfield: {
        width: '80%',
        '& :focus': {
            backgroundColor: '#dae3eb'
        }
    },
    button: {
        width: '80%',
        marginBottom: 20,
        height: 50,
        fontFamily: 'Lexend',
        fontWeight: '500'
    }
});

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [usernameError, setUsernameError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [usernameErrorColor, setUsernameErrorColor] = useState({color: 'white'});
    const [passwordErrorColor, setPasswordErrorColor] = useState({color: 'white'});
    const classes = styles();
    const history = useHistory();
    const [cookies, setCookie, removeCookie] = useCookies(['user']);

    //Adding theme to material-ui components
    const theme = createMuiTheme({
        palette: {
            primary: {
                main: '#6A8EAE',
            },
            secondary: {
                main: '#061826'
            },
        },
    });

    const signIn = () => {
        //Return if any of the field is empty
        if(!validate()) return;

        //Check the credentials with the server
        fetch(`${process.env.REACT_APP_BASE_URL}/login`, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json', 
                'Accept': 'application/json' 
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
        })
        .then(res => {
            console.log(res);
            if(res.ok){
                //Redirect to home screen
                history.replace('/home');
            } else{
                alert('Invalid credentials!');
            }
        })
        .catch(err => console.log(err));
    }

    const validate = () => {
        if(username === ''){
            setUsernameError(true);
            setUsernameErrorColor({color: 'red'});
            return false;
        } else{
            setUsernameErrorColor({color: 'white'});
            setUsernameError(false);
        }
        if(password === ''){
            setPasswordError(true);
            setPasswordErrorColor({color: 'red'});
            return false;
        } else{
            setPasswordErrorColor({color: 'white'});
            setPasswordError(false);
        }
        return true;
    }

    return(
        <MuiThemeProvider theme={theme}>
            <div className='container'>
                <div className='login-controlls'>
                    <span style={{color: 'black', marginBottom: '20px', fontFamily: 'Lexend', fontWeight: '500'}}>LOGIN</span>
                    <TextField value={username}
                        onChange={(event) => setUsername(event.target.value)}
                        variant="outlined"  
                        color='primary' 
                        label='Username'
                        inputProps={{
                            style: {
                                height: 20
                            }
                        }}
                        InputProps={{
                            startAdornment: (
                            <InputAdornment position="start">
                                <PersonOutline />
                            </InputAdornment>
                            ),
                        }}
                        className={classes.textfield}
                        required
                        autoFocus={true} 
                        type='text'
                        autoComplete='text'
                        error={usernameError}/>
                    <span className='error' style={usernameErrorColor}>Username is required</span>
                    <TextField value={password}
                        onChange={(event) => setPassword(event.target.value)} 
                        // placeholder="Password"
                        variant="outlined" 
                        label='Password' 
                        className={classes.textfield}
                        inputProps={{
                            style: {
                                height: 20
                            }
                        }}
                        InputProps={{
                            startAdornment: (
                            <InputAdornment position="start">
                                <FingerprintOutlined />
                            </InputAdornment>
                            ),
                        }}
                        required
                        color='primary'  
                        type='password'
                        error={passwordError}/>
                    <span className='error' style={passwordErrorColor}>Password is required</span>
                    <Button variant="contained" 
                        onClick={signIn} 
                        color='secondary'
                        className={classes.button}>
                        Sign in
                    </Button>
                </div>
            </div>
        </MuiThemeProvider>
        
    )
}

export default Login;