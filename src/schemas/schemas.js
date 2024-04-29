import { z } from "zod";

//Definir el schema del registro
export const registerSchema = z.object({
  username: z
    .string()
    .trim({ message: "El nombre de usaurio no debe contener espacios" })
    .regex(/^[\w]+$/, {
      message: "El valor no debe contener caracteres especiales",
    }),
  email: z.string().email({ message: "El email no es valido" }),
  phone: z
    .string()
    .length(10, {
      message: "El numero de telefono debe contener 10 character(s)",
    })
    .refine((value) => value.startsWith("618") || value.startsWith("555"), {
      message:
        "El número de teléfono debe comenzar con una lada válida (618 o 555)",
    })
    .refine((value) => /^\d+$/.test(value), {
      message:
        "El número de teléfono no puede contener caracteres no numéricos",
    }),
  passwords: z
    .object({
      password: z
        .string()
        .min(8, { message: "La contraseña debe tener al menos 8 caracteres" })
        .refine(
          (value) =>
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/.test(
              value
            ),
          {
            message:
              "La contraseña debe contener al menos una letra mayúscula, una letra minúscula, un número y un carácter especial (@$!%*?&)",
          }
        ),
      confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Las contraseñas no coinciden",
      path: ["confirmPassword"],
    }),
  firstname: z.string().min(1, { message: "El nombre es requerido" }),
  lastname: z.string().min(1, { message: "El apellido es requerido" }),
});

//Definir el schema del registro
export const updateSchema = z.object({
  phone: z
    .string()
    .length(10, {
      message: "El numero de telefono debe contener 10 character(s)",
    })
    .refine((value) => value.startsWith("618") || value.startsWith("555"), {
      message:
        "El número de teléfono debe comenzar con una lada válida (618 o 555)",
    })
    .refine((value) => /^\d+$/.test(value), {
      message:
        "El número de teléfono no puede contener caracteres no numéricos",
    }),
  firstname: z.string().min(1, { message: "El nombre es requerido" }),
  lastname: z.string().min(1, { message: "El apellido es requerido" }),
  meter: z.string().min(1, { message: "Debes completar el campo" }).refine((value) => /^\d+$/.test(value), {
    message:
      "El numero serial no puede contener caracteres no numéricos",
  }),
});

//Definir el schema del registro
export const transactionSchema = z.object({
  description: z
    .string()
    .regex(/^[\w\s]+$/, {
      message: "La descripción no debe contener caracteres especiales"
    }),
  amount: z
    .string()
    .refine(value => /^-?\d+$/.test(value), {
      message: "El número debe ser un entero o un número entero negativo"
    })
    .refine(value => Number(value) != 0, { message: "El valor no puede ser igual a cero" }),
  createdAt: z.string().min(1, { message: "Debes completar el campo" })
});

//Definir el schema del registro
export const updateTransactionSchema = z.object({
  description: z
    .string()
    .regex(/^[\w\s]+$/, {
      message: "La descripción no debe contener caracteres especiales"
    }),
  amount: z
    .string()
    .refine(value => /^-?\d+$/.test(value), {
      message: "El número debe ser un entero o un número entero negativo"
    })
    .refine(value => Number(value) != 0, { message: "El valor no puede ser igual a cero" }),
});


//Definir el schema del registro
export const goalSchema = z.object({
  description: z
    .string()
    .regex(/^[\w\s]+$/, {
      message: "La descripción no debe contener caracteres especiales"
    }),
  amountGoal: z
    .string()
    .refine(value => /^-?\d+$/.test(value), {
      message: "El número debe ser un entero o un número entero negativo"
    })
    .refine(value => Number(value) != 0, { message: "El valor no puede ser igual a cero" }),
  finalDate: z.string().min(1, { message: "Debes completar el campo" })
});

//Definir el schema del registro
export const updateGoalSchema = z.object({
  description: z
    .string()
    .regex(/^[\w\s]+$/, {
      message: "La descripción no debe contener caracteres especiales"
    }),
  amountGoal: z
    .string()
    .refine(value => /^-?\d+$/.test(value), {
      message: "El número debe ser un entero o un número entero negativo"
    })
    .refine(value => Number(value) != 0, { message: "El valor no puede ser igual a cero" }),
});

export const addGoalSchema = z.object({
  amount: z
    .string()
    .refine(value => /^-?\d+$/.test(value), {
      message: "El número debe ser un entero o un número entero negativo"
    })
    .refine(value => Number(value) != 0, { message: "El valor no puede ser igual a cero" }),
});