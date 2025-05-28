"use client";

import FormFields from "@/components/form-fields/form-fields";
import { Button } from "@/components/ui/button";
import { Pages } from "@/constants/enums";
import useFormFields from "@/hooks/useFormFields";
import { IFormField } from "@/Types/app";

function Form() {
  const { getFormFields } = useFormFields({
    slug: Pages.LOGIN,
    translations: {},
  });
  return (
    <form>
      {getFormFields().map((field: IFormField) => (
        <FormFields key={field.id} {...field} error={{}} />
      ))}
      <Button type="submit" className="w-full">
        Sign In
      </Button>
    </form>
  );
}

export default Form;
