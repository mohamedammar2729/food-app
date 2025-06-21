
import { Translations } from "@/Types/translations";
import * as z from "zod";

export const addCategorySchema = (translations: Translations) => {
  return z.object({
    name: z.string().trim().min(1, {
      message: translations.admin.categories.form.name.validation.required,
    }),
  });
};

export const updateCategorySchema = (translations: Translations) => {
  return z.object({
    // in update, we use categoryName to avoid conflict with the name field in the form
    // which must 2 input not have the same name
    categoryName: z.string().trim().min(1, {
      message: translations.admin.categories.form.name.validation.required,
    }),
  });
};
