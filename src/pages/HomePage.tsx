import { useAuth } from "../shared/context/AuthContext";

export function HomePage() {
  const { user, logout } = useAuth();
  return (
    <div>
      <h1>Добро пожаловать, {user?.firstName}!</h1>
      <button onClick={logout}>Выйти</button>
    </div>
  );
}