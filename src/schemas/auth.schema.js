//schemes for backend validations
import { z } from "zod";

//Register schema
export const registerSchema = z.object({
  username: z
    .string({
      required_error: "Se necesita un nombre de usuario",
    })
    .min(3)
    .max(255),
  email: z
    .string({
      required_error: "Se necesita un email",
    })
    .email({
      required_error: "Email invalido",
    }),
  password: z
    .string({
      required_error: "Se necesita una contraseña",
    })
    .min(6, {
      message: "La contraseña debe tener al menos 6 caracteres",
    })
    .max(255),
});

//Login schema
export const loginSchema = z.object({
  email: z
    .string({
      required_error: "se necesita un email",
    })
    .email({
      required_error: "Email inválido",
    }),
  password: z
    .string({
      required_error: "Se necesita una contraseña",
    })
    .min(6, {
      message: "Contraseña incorrecta",
    })
    .max(255),
});
