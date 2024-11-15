import React, { useState, useEffect } from "react";

interface User {
    id: number;
    name: string;
    username: string;
    birthDate: string;
    birthTime: string; // Время рождения - обязательный параметр
}

const HomePage: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [newUser, setNewUser] = useState<User>({
        id: 0,
        name: "",
        username: "",
        birthDate: "",
        birthTime: "",
    });
    const [selectedUsers, setSelectedUsers] = useState<number[]>([]);
    const [compatibilityResult, setCompatibilityResult] = useState<string>("");
    const [error, setError] = useState<string>("");
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch("http://localhost:5000/api/users");
                const data = await response.json();
                setUsers(data);
            } catch (error) {
                console.error("Ошибка при загрузке пользователей:", error);
                setError("Не удалось загрузить список пользователей.");
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

    const handleCheckCompatibility = async () => {
        if (selectedUsers.length !== 2) {
            setError("Выберите двух пользователей для проверки совместимости.");
            return;
        }

        try {
            const response = await fetch("http://localhost:5000/api/compatibility", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ userIds: selectedUsers }),
            });

            const result = await response.json();

            if (response.ok) {
                setCompatibilityResult(result.message || "Совместимость не рассчитана.");
            } else {
                setError(result.message || "Ошибка при расчете совместимости.");
            }
        } catch (error) {
            console.error("Ошибка при проверке совместимости:", error);
            setError("Не удалось подключиться к серверу.");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-3xl bg-white p-8 rounded-lg shadow-lg">
                <h1 className="text-3xl font-bold text-center mb-6">Управление пользователями</h1>

                {error && (
                    <div className="text-red-600 mb-4 text-center border border-red-400 p-2 rounded">
                        {error}
                    </div>
                )}

                {/* Кнопка для открытия модального окна */}
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="w-full bg-[#0E6666] text-white px-4 py-2 rounded-md hover:bg-[#083939] mb-6"
                >
                    Добавить пользователя
                </button>

                {/* Список пользователей */}
                <h2 className="text-xl font-semibold mb-4 text-center">Список пользователей</h2>
                <ul className="list-disc pl-5 mb-4">
                    {users.map((user) => (
                        <li
                            key={user.id}
                            className={`cursor-pointer ${
                                selectedUsers.includes(user.id) ? "text-blue-500 font-bold" : ""
                            }`}
                            onClick={() => handleSelectUser(user.id)}
                        >
                            {user.name} - {user.username} ({user.birthDate}, {user.birthTime})
                        </li>
                    ))}
                </ul>

                {/* Кнопка проверки совместимости */}
                <button
                    onClick={handleCheckCompatibility}
                    className="w-full bg-[#F25430] text-white px-4 py-2 rounded-md hover:bg-[#E1350E]"
                >
                    Проверить совместимость
                </button>

                {/* Результат совместимости */}
                {compatibilityResult && (
                    <div className="mt-6 p-4 bg-gray-100 border rounded-md text-center">
                        <h3 className="text-lg font-semibold mb-2">Результат совместимости:</h3>
                        <p>{compatibilityResult}</p>
                    </div>
                )}

                {/* Модальное окно */}
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