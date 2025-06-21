"use server";

import { Pages, Routes } from "@/constants/enums";
import { getCurrentLocale } from "@/lib/getCurrentLocale";
import { db } from "@/lib/prisma";
import getTranslation from "@/lib/translation";
import { addCategorySchema, updateCategorySchema } from "@/validations/category";


import { revalidatePath } from "next/cache";

export const addCategory = async (prevState: unknown, formData: FormData) => {
  const locale = await getCurrentLocale();
  const translations = await getTranslation(locale);
  // Validate the form data using the schema
  // We use Object.fromEntries to convert FormData to a plain object
  // so that it can be validated by Zod
  // We use safeParse to avoid throwing an error if the validation fails
  const result = addCategorySchema(translations).safeParse(
    Object.fromEntries(formData.entries())
  );
  if (result.success === false) {
    return {
      error: result.error.formErrors.fieldErrors,
      status: 400,
    };
  }
  const data = result.data;

  try {
    // Create a new category in the database
    await db.category.create({
      data,
    });
    // Revalidate the paths to ensure the new category is reflected in the UI
    // We revalidate the admin categories page and the menu page
    revalidatePath(`/${locale}/${Routes.ADMIN}/${Pages.CATEGORIES}`);
    revalidatePath(`/${locale}/${Routes.MENU}`);

    return {
      status: 201,
      message: translations.messages.categoryAdded,
    };
  } catch (error) {
    console.error(error);
    return {
      status: 500,
      message: translations.messages.unexpectedError,
    };
  }
};
export const updateCategory = async (
  id: string,
  prevState: unknown,
  formData: FormData
) => {
  const locale = await getCurrentLocale();
  const translations = await getTranslation(locale);
  const result = updateCategorySchema(translations).safeParse(
    Object.fromEntries(formData.entries())
  );
  if (result.success === false) {
    return {
      error: result.error.formErrors.fieldErrors,
      status: 400,
    };
  }
  const data = result.data;

  try {
    await db.category.update({
      where: {
        id,
      },
      data: {
        name: data.categoryName,
      },
    });
    revalidatePath(`/${locale}/${Routes.ADMIN}/${Pages.CATEGORIES}`);
    revalidatePath(`/${locale}/${Routes.MENU}`);

    return {
      status: 200,
      message: translations.messages.updatecategorySucess,
    };
  } catch (error) {
    console.error(error);
    return {
      status: 500,
      message: translations.messages.unexpectedError,
    };
  }
};

export const deleteCategory = async (id: string) => {
  const locale = await getCurrentLocale();
  const translations = await getTranslation(locale);

  try {
    await db.category.delete({
      where: {
        id,
      },
    });
    revalidatePath(`/${locale}/${Routes.ADMIN}/${Pages.CATEGORIES}`);
    revalidatePath(`/${locale}/${Routes.MENU}`);
    return {
      status: 200,
      message: translations.messages.deleteCategorySucess,
    };
  } catch (error) {
    console.error(error);
    return {
      status: 500,
      message: translations.messages.unexpectedError,
    };
  }
};
