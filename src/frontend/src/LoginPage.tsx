import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Импортируем хук для навигации

// Определение типа для состояния формы
interface LoginForm {
    email: string;
    password: string;
}

// Основной компонент страницы авторизации
const LoginPage: React.FC = () => {
    // Хуки состояния
    const [formData, setFormData] = useState<LoginForm>({ email: "", password: "" });
    const [error, setError] = useState<string>("");

    const navigate = useNavigate(); // Инициализируем хук для редиректа

    // Обработчик изменения полей ввода
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Проверка, заполнены ли поля
        if (!formData.email || !formData.password) {
            setError("Пожалуйста, заполните все поля.");
            return;
        }

        try {
            // Отправляем данные на сервер
            const response = await fetch("http://localhost:5000/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const result = await response.json();

            if (response.ok) {
                console.log("Авторизация успешна:", result);

                // Успешный вход — перенаправляем пользователя
                navigate("/home"); // Например, на главную страницу
            } else {
                setError(result.message || "Ошибка авторизации. Проверьте введенные данные.");
            }
        } catch (error) {
            console.error("Ошибка при подключении:", error);
            setError("Не удалось подключиться к серверу. Попробуйте позже.");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-center mb-6">Вход в аккаунт</h2>
                {error && (
                    <div className="mb-4 text-red-600 text-center border border-red-400 p-2 rounded">
                        {error}
                    </div>
                )}
                <form onSubmit={handleSubmit}>
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
                    <div className="mb-6">
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
                    <button
                        type="submit"
                        className="w-full bg-[#F25430] hover:bg-[#E1350E] text-white font-semibold py-2 px-4 rounded-md transition duration-300"
                    >
                        Войти
                    </button>
                </form>
                <p className="mt-4 text-sm text-center text-gray-600">
                    Нет аккаунта?{" "}
                    <a href="/register" className="text-[#F25430] hover:underline">
                        Зарегистрироваться
                    </a>
                </p>
            </div>
        </div>
    );
};

export default LoginPage;