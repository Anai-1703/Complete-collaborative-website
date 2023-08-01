import "../index.css";
import { LoginForm } from "../forms/LoginForm";

export function LoginPage() {
  return (
    <div className="login-page">
      <div className="form">
        <LoginForm />
      </div>
    </div>
  );
}
