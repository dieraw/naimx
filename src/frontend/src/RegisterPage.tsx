import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Импортируем хук для навигации

// Определение типа для состояния формы
interface RegisterForm {
    name: string;
    username: string; // Имя пользователя - обязательное поле
    email: string;
    password: string;
    confirmPassword: string;
    birthDate: string; // Дата рождения - обязательное поле
    birthTime?: string; // Время рождения - необязательное поле
}

// Основной компонент страницы регистрации
const RegisterPage: React.FC = () => {
    const [formData, setFormData] = useState<RegisterForm>({
        name: "",
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        birthDate: "",
        birthTime: "",
    });
    const [error, setError] = useState<string>("");
    const [success, setSuccess] = useState<string>("");

    const navigate = useNavigate(); // Хук для редиректа

    // Обработчик изменения полей ввода
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Обработчик отправки формы
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Проверка на заполненность обязательных полей
        if (
            !formData.name ||
            !formData.username ||
            !formData.email ||
            !formData.password ||
            !formData.confirmPassword ||
            !formData.birthDate
        ) {
            setError("Пожалуйста, заполните все обязательные поля.");
            setSuccess("");
            return;
        }

        // Проверка на совпадение паролей
        if (formData.password !== formData.confirmPassword) {
            setError("Пароли не совпадают.");
            setSuccess("");
            return;
        }

        try {
            // Формирование данных для отправки
            const requestData = {
                name: formData.name,
                username: formData.username,
                email: formData.email,
                birthDate: formData.birthDate,
                birthTime: formData.birthTime || null, // Если поле пустое, передаем null
            };

            // Отправка данных на сервер
            const response = await fetch("http://localhost:5000/api/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(requestData),
            });

            const result = await response.json();

            if (response.ok) {
                setSuccess("Регистрация успешна!");
                setError("");
                console.log("Ответ сервера:", result);

                // Редирект на страницу авторизации
                navigate("/login");
            } else {
                setError(result.message || "Ошибка при регистрации.");
                setSuccess("");
            }
        } catch (error) {
            console.error("Ошибка при отправке данных:", error);
            setError("Ошибка подключения к серверу.");
            setSuccess("");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-center mb-6">Регистрация</h2>

                {error && (
                    <div className="mb-4 text-red-600 text-center border border-red-400 p-2 rounded">
                        {error}
                    </div>
                )}

                {success && (
                    <div className="mb-4 text-green-600 text-center border border-green-400 p-2 rounded">
                        {success}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    {/* Поле "Имя" */}
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                            Имя
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-[#0E6666] focus:border-[#0E6666]"
                            placeholder="Введите ваше имя"
                            required
                        />
                    </div>

                    {/* Поле "Имя пользователя" */}
                    <div className="mb-4">
                        <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                            Имя пользователя
                        </label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-[#0E6666] focus:border-[#0E6666]"
                            placeholder="Введите имя пользователя"
                            required
                        />
                    </div>

                    {/* Поле "Email" */}
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-[#0E6666] focus:border-[#0E6666]"
                            placeholder="Введите ваш email"
                            required
                        />
                    </div>

                    {/* Поле "Пароль" */}
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Пароль
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-[#0E6666] focus:border-[#0E6666]"
                            placeholder="Введите ваш пароль"
                            required
                        />
                    </div>

                    {/* Поле "Подтверждение пароля" */}
                    <div className="mb-6">
                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                            Подтверждение пароля
                        </label>
                        <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-[#0E6666] focus:border-[#0E6666]"
                            placeholder="Подтвердите ваш пароль"
                            required
                        />
                    </div>

                    {/* Поле "Дата рождения" */}
                    <div className="mb-4">
                        <label htmlFor="birthDate" className="block text-sm font-medium text-gray-700">
                            Дата рождения
                        </label>
                        <input
                            type="date"
                            id="birthDate"
                            name="birthDate"
                            value={formData.birthDate}
                            onChange={handleChange}
                            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-[#0E6666] focus:border-[#0E6666]"
                            required
                        />
                    </div>

                    {/* Поле "Время рождения" - необязательное */}
                    <div className="mb-4">
                        <label htmlFor="birthTime" className="block text-sm font-medium text-gray-700">
                            Время рождения (необязательно)
                        </label>
                        <input
                            type="time"
                            id="birthTime"
                            name="birthTime"
                            value={formData.birthTime || ""}
                            onChange={handleChange}
                            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-[#0E6666] focus:border-[#0E6666]"
                        />
                    </div>

                    {/* Кнопка отправки формы */}
                    <button
                        type="submit"
                        className="w-full bg-[#F25430] hover:bg-[#E1350E] text-white font-semibold py-2 px-4 rounded-md transition duration-300"
                    >
                        Зарегистрироваться
                    </button>
                </form>

                {/* Ссылка на страницу авторизации */}
                <p className="mt-4 text-sm text-center text-gray-600">
                    Уже есть аккаунт?{" "}
                    <a href="/login" className="text-[#F25430] hover:underline">
                        Войти
                    </a>
                </p>
            </div>
        </div>
    );
};

export default RegisterPage;