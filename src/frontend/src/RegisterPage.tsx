import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Импортируем хук для навигации

// Определение типа для состояния формы
interface RegisterForm {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
}

// Основной компонент страницы регистрации
const RegisterPage: React.FC = () => {
    const [formData, setFormData] = useState<RegisterForm>({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
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
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Проверка на заполненность полей
        if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
            setError("Пожалуйста, заполните все поля.");
            setSuccess("");
            return;
        }

        // Проверка на совпадение паролей
        if (formData.password !== formData.confirmPassword) {
            setError("Пароли не совпадают.");
            setSuccess("");
            return;
        }

        setError(""); // Очистка ошибки
        setSuccess("Регистрация успешна!");
        console.log("Отправлено:", formData);

        // Здесь можно добавить логику отправки данных на сервер
        alert("Вы успешно зарегистрировались!");

        // Редирект на страницу авторизации после успешной регистрации
        navigate("/login");
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

                    <button
                        type="submit"
                        className="w-full bg-[#F25430] hover:bg-[#E1350E] text-white font-semibold py-2 px-4 rounded-md transition duration-300"
                    >
                        Зарегистрироваться
                    </button>
                </form>

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