import { LoginForm } from "../../features/auth/ui/LoginForm";
import styles from './LoginPage.module.css';

export function LoginPage() {
  return (
    <div className={styles.loginPageContainer}>
      <LoginForm />
    </div>
  );
}