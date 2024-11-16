import React, { useState, useEffect } from "react";

interface User {
    id: number;
    name: string;
    username: string;
    birthDate: string;
    birthTime: string; // Время рождения - обязательный параметр
}

const HomePage: React.FC = () => {
    const [pageTitle, setPageTitle] = useState("Управление пользователями");
    useEffect(() => {
        document.title = pageTitle;
    }, [pageTitle]); // Обновляем заголовок, если `pageTitle` изменился

    const [users, setUsers] = useState<User[]>([]);
    const [newUser, setNewUser] = useState<User>({
        id: 0,
        name: "",
        username: "",
        birthDate: "",
        birthTime: "",
    });
    const [selectedUsers, setSelectedUsers] = useState<number[]>([]);
    const [compatibilityPercentage, setCompatibilityPercentage] = useState<number | null>(null);
    const [error, setError] = useState<string>("");
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    // Моковые пользователи
    const mockUsers: User[] = [
        { id: 1, name: "Анна Иванова", username: "anna123", birthDate: "1990-06-15", birthTime: "08:30" },
        { id: 2, name: "Иван Петров", username: "ivan_petrov", birthDate: "1985-12-10", birthTime: "14:45" },
        { id: 3, name: "Мария Сидорова", username: "masha_s", birthDate: "1992-08-20", birthTime: "10:15" },
    ];

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                // Попытка загрузить пользователей с сервера
                const response = await fetch("http://localhost:5000/api/users");
                const data = await response.json();
                setUsers(data);
            } catch (error) {
                console.error("Ошибка при загрузке пользователей, используем моковые данные:", error);
                // Если ошибка, используем моковые данные
                setUsers(mockUsers);
            }
        };
        fetchUsers();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNewUser({ ...newUser, [name]: value });
    };

    const handleAddUser = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!newUser.name || !newUser.username || !newUser.birthDate || !newUser.birthTime) {
            setError("Все поля обязательны для заполнения.");
            return;
        }

        try {
            const response = await fetch("http://localhost:5000/api/users", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newUser),
            });

            if (response.ok) {
                const addedUser = await response.json();
                setUsers([...users, addedUser]);
                setNewUser({ id: 0, name: "", username: "", birthDate: "", birthTime: "" });
                setIsModalOpen(false); // Закрыть модальное окно
                setError("");
            } else {
                const result = await response.json();
                setError(result.message || "Ошибка при добавлении пользователя.");
            }
        } catch (error) {
            console.error("Ошибка при добавлении пользователя:", error);
            setError("Не удалось подключиться к серверу.");
        }
    };

    const handleSelectUser = (id: number) => {
        if (selectedUsers.includes(id)) {
            setSelectedUsers(selectedUsers.filter((userId) => userId !== id));
        } else if (selectedUsers.length < 2) {
            setSelectedUsers([...selectedUsers, id]);
        } else {
            setError("Вы можете выбрать только двух пользователей для проверки.");
        }
    };

    const handleCheckCompatibility = () => {
        if (selectedUsers.length !== 2) {
            setError("Выберите двух пользователей для проверки совместимости.");
            return;
        }

        // Генерация случайного процента для моковой проверки
        const mockCompatibility = Math.floor(Math.random() * 101); // От 0 до 100
        setCompatibilityPercentage(mockCompatibility);
        setError(""); // Сброс ошибок
    };

    return (
        <div className="relative flex items-center justify-center min-h-screen overflow-hidden drop-shadow">
            <div
                className="absolute inset-0 z-0"
                style={{
                    backgroundImage: `url(${require('./img/bg4.jpg')})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            ></div>

            <div className="relative z-10 w-full max-w-3xl bg-white p-8 rounded-lg opacity-100">
                <h1 className="text-3xl font-bold text-center mb-6">Управление пользователями</h1>

                {error && (
                    <div className="text-red-600 mb-4 text-center border border-red-400 p-2 rounded">
                        {error}
                    </div>
                )}

                <button
                    onClick={() => setIsModalOpen(true)}
                    className="w-full bg-[#0E6666] text-white px-4 py-2 rounded-md hover:bg-[#083939] mb-6"
                >
                    Добавить пользователя
                </button>

                <h2 className="text-xl font-semibold mb-4 text-center">Список пользователей</h2>
                <ul className="list-disc pl-5 mb-4">
                    {users.map((user) => (
                        <li
                            key={user.id}
                            className={`cursor-pointer ${
                                selectedUsers.includes(user.id) ? "text-[#FF9929] font-bold" : ""
                            }`}
                            onClick={() => handleSelectUser(user.id)}
                        >
                            {user.name} - {user.username} ({user.birthDate}, {user.birthTime})
                        </li>
                    ))}
                </ul>

                <button
                    onClick={handleCheckCompatibility}
                    className="w-full bg-[#F25430] text-white px-4 py-2 rounded-md hover:bg-[#E1350E]"
                >
                    Проверить совместимость
                </button>

                {compatibilityPercentage !== null && (
                    <div className="mt-6 p-4 bg-gray-100 border rounded-md text-center">
                        <h3 className="text-lg font-semibold mb-4">Результат совместимости:</h3>
                        <div className="w-full bg-gray-200 rounded-full h-6">
                            <div
                                className="bg-[#0E6666] h-6 rounded-full text-white text-center text-sm"
                                style={{ width: `${compatibilityPercentage}%`,
                                    minWidth: "20px", // Минимальная ширина для отображения числа
                                }}
                            >
                                {compatibilityPercentage}%
                            </div>
                        </div>
                    </div>
                )}

                {isModalOpen && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                        <div className="bg-white w-full max-w-md p-6 rounded-lg shadow-lg">
                            <h2 className="text-xl font-bold mb-4 text-center">Добавить пользователя</h2>
                            <form onSubmit={handleAddUser}>
                                <div className="mb-4">
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                        Имя
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={newUser.name}
                                        onChange={handleChange}
                                        className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                                        required
                                    />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                                        Имя пользователя
                                    </label>
                                    <input
                                        type="text"
                                        id="username"
                                        name="username"
                                        value={newUser.username}
                                        onChange={handleChange}
                                        className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                                        required
                                    />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="birthDate" className="block text-sm font-medium text-gray-700">
                                        Дата рождения
                                    </label>
                                    <input
                                        type="date"
                                        id="birthDate"
                                        name="birthDate"
                                        value={newUser.birthDate}
                                        onChange={handleChange}
                                        className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                                        required
                                    />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="birthTime" className="block text-sm font-medium text-gray-700">
                                        Время рождения
                                    </label>
                                    <input
                                        type="time"
                                        id="birthTime"
                                        name="birthTime"
                                        value={newUser.birthTime}
                                        onChange={handleChange}
                                        className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                                        required
                                    />
                                </div>
                                <div className="flex justify-end space-x-2">
                                    <button
                                        type="button"
                                        onClick={() => setIsModalOpen(false)}
                                        className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400"
                                    >
                                        Отмена
                                    </button>
                                    <button
                                        type="submit"
                                        className="bg-[#0E6666] text-white px-4 py-2 rounded-md hover:bg-[#083939]"
                                    >
                                        Добавить
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default HomePage;
