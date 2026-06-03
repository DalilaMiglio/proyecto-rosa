import type { VercelRequest, VercelResponse } from "@vercel/node";
import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";

const ses = new SESClient({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
  },
});

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método no permitido" });
  }

  const { to, title, description } = req.body;

  if (!to || !title) {
    return res.status(400).json({ error: "Faltan datos obligatorios" });
  }

  try {
    const command = new SendEmailCommand({
      Source: process.env.AWS_SES_FROM_EMAIL,
      Destination: {
        ToAddresses: [to],
      },
      Message: {
        Subject: {
          Data: `Nueva tarea creada: ${title}`,
          Charset: "UTF-8",
        },
        Body: {
          Text: {
            Data: `Creaste una nueva tarea.\n\nTítulo: ${title}\nDescripción: ${
              description || "Sin descripción"
            }`,
            Charset: "UTF-8",
          },
        },
      },
    });

    await ses.send(command);

    return res.status(200).json({ message: "Email enviado correctamente" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error enviando email" });
  }
}