import { RegisterForm } from "../../features/auth/ui/RegisterForm";
import styles from './RegisterPage.module.css';

export function RegisterPage() {
  return (
    <div className={styles.registerPageContainer}>
      <RegisterForm />
    </div>
  );
}