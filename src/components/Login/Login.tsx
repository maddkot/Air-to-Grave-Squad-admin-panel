import { Box, Button, Container, TextField } from '@mui/material';
import styles from './Login.module.scss';
import logo from 'assets/images/a2g.jpeg'
import { useState } from 'react';
import { getUserData } from 'api/auth/authApi';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    let navigate = useNavigate();
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');

    const handlerLogin = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLogin(event.target.value)
    }

    const handlerPassword = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value)
    }

    const handlerAuth = async() => {
        try {
            const response = await getUserData({ login, password })
            localStorage.setItem('userData', JSON.stringify(response));
            navigate('/admins', {replace: true});
            return;
        } catch(error) {
            console.log(error);
        }
    }

    return (
        <div style={{ display: 'flex', minHeight: 900, height: '100vh' }}>
            <Container className={styles.pageContent}>
                <Box className={styles.centerContentContainer}>
                <img className={styles.mainA2GLogo} src={logo} alt='air to grave logo' />
                    <TextField onChange={handlerLogin} value={login } label="Логин" variant="outlined" />
                    <TextField onChange={handlerPassword} value={password }label="Пароль" variant="outlined" type='password'/>
                    <Button onClick={handlerAuth } variant="outlined">Войти</Button>
                </Box>
            </Container>
        </div>
    )
}

export default Login;