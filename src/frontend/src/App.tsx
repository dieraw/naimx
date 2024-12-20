import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LoginPage from './LoginPage'; // Страница авторизации
import RegisterPage from './RegisterPage'; // Страница регистрации
import Home from './LoginPage';
import Main from './MainPage';


const App: React.FC = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/main" element={<Main />} />

                {/* Если захотите добавить другие страницы, можете сюда добавить */}
            </Routes>
        </>
    );
};

export default App;