import { z } from "zod";

const ACCEPETE_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png"];
const MAX_FILE_SIZE = 2000000; // 2mb

export const loginSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(20, "Password must be at most 20 characters"),
});

export type LoginSchema = z.infer<typeof loginSchema>;

export const profileSchema = z.object({
  image: z
    .any()
    .refine((file) => file.size > 0, {
      message: "Profile image is required",
    })
    .refine(
      (file) => !file || ACCEPETE_IMAGE_TYPES.includes(file.type),
      "File harus berupa gambar (jpeg, jpg, atau png)",
    )
    .refine(
      (file) => !file || file.size <= MAX_FILE_SIZE,
      "Ukuran file tidak boleh lebih dari 2MB",
    )
    .optional(),
  displayName: z.string().min(1, "Display name is required"),
  gender: z.string().optional(),
  birthday: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Permitted formats 0000-00-00"),
  horoscope: z.string().optional(),
  zodiac: z.string().optional(),
  height: z.string().optional(),
  weight: z.string().optional(),
});

export type ProfileFormSchema = z.infer<typeof profileSchema>;
