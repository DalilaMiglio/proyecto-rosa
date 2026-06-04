import { ReactNode } from "react";

interface Props {
  title: string;
  subtitle: string;
  children: ReactNode;
}

export function AuthForm({ title, subtitle, children }: Props) {
  return (
    <section className="auth-card">
      <h1>{title}</h1>
      <p>{subtitle}</p>
      {children}
    </section>
  );
}