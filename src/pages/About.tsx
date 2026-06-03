export function About() {
  return (
    <main className="center-page">
      <section className="card about-card">
        <h1>Acerca de</h1>
        <p>
          GestorTareas es una aplicación web desarrollada con React, TypeScript,
          Firebase, Firestore, Vercel Functions y AWS SES.
        </p>
        <p>
          Permite registrar usuarios, iniciar sesión, crear tareas persistentes,
          marcar tareas como completadas, eliminarlas y enviar un email real al
          crear una nueva tarea.
        </p>
      </section>
    </main>
  );
}