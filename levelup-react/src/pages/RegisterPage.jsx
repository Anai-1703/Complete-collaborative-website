import { RegisterForm } from "../forms/RegisterForm";
import "../styles/index.css";
// import "../styles/RegisterForm.css";
export function RegisterPage() {
  return (
    <div className="register-page">
      <div className="form">
        <RegisterForm />
      </div>
    </div>
  );
}
