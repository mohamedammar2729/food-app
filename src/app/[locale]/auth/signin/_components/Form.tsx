"use client";

import FormFields from "@/components/form-fields/form-fields";
import { Button } from "@/components/ui/button";
import { Pages } from "@/constants/enums";
import useFormFields from "@/hooks/useFormFields";
import { IFormField } from "@/Types/app";
import { signIn } from "next-auth/react";
import { useRef, useState } from "react";

 function Form() {
  const formRef = useRef<HTMLFormElement>(null);
  const [error, setError] = useState({});
  const { getFormFields } = useFormFields({
    slug: Pages.LOGIN,
    translations: {},
  });
  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // get values from form fields
    if (!formRef.current) return;
    // create form data from form fields
    const formData = new FormData(formRef.current);
    // create data object from form data
    const data: Record<string, string> = {};
    // convert formData to object
    formData.forEach((value, key) => {
      // store value from formData to data object
      // example: data = { email: "", password: "" }
      data[key] = value.toString();
    });
    try {
      const res = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });
      if (res?.error) {
        // handle error
        const validationError = JSON.parse(res?.error).validationError;
        setError(validationError);
      } else {
        // handle success
        console.log("Sign in successful");
        // redirect to home page or any other page
        window.location.href = "/";
      }
    } catch(error) {
      console.log(error);
    }
  };
  return (
    <form onSubmit={onSubmit} ref={formRef}>
      {getFormFields().map((field: IFormField) => (
        <div className="mb-3" key={field.name}>
          <FormFields {...field} error={error} />
        </div>
      ))}
      <Button type="submit" className="w-full">
        Sign In
      </Button>
    </form>
  );
}

export default Form;
