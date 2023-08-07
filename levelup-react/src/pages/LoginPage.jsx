import "../styles/index.css";
import "../styles/GenericForm.css";
import { LoginForm } from "../forms/LoginForm";

export function LoginPage() {
  return (
    <main>
    <section className="login-page">
        <LoginForm />
    </section>
    </main>
  )
}
