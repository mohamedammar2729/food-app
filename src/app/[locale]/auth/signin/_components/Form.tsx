"use client";

import FormFields from "@/components/form-fields/form-fields";
import { Button } from "@/components/ui/button";
import Loader from "@/components/ui/loader";

import { Pages, Routes } from "@/constants/enums";
import useFormFields from "@/hooks/useFormFields";
import { IFormField } from "@/Types/app";
import { Translations } from "@/Types/translations";
import { signIn } from "next-auth/react";
import { useParams, useRouter } from "next/navigation";

import { useRef, useState } from "react";
import { toast } from "sonner";

function Form({translations}: {translations: Translations}) {
  const {locale} = useParams();
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const [error, setError] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const { getFormFields } = useFormFields({
    slug: Pages.LOGIN,
    translations,
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
      setIsLoading(true);
      // call signIn function from next-auth with credentials provider
      const res = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });
      if (res?.error) {
        // handle error
        const validationError = JSON.parse(res?.error).validationError;
        setError(validationError);
        const responseError = JSON.parse(res?.error).responseError;
        if (responseError) {
          toast.error(responseError);
        }
      }
      if( res?.ok) {
        // if signIn success, redirect to home page
        toast.success(translations.messages.loginSuccessful);
        router.replace(`/${locale}/${Routes.PROFILE}`);
      }
    } catch (error) {
      console.log(error);
    } finally{
      setIsLoading(false);
    }
  };
  return (
    <form onSubmit={onSubmit} ref={formRef}>
      {getFormFields().map((field: IFormField) => (
        <div className="mb-3" key={field.name}>
          <FormFields {...field} error={error} />
        </div>
      ))}
      <Button type="submit" disabled={isLoading} className="w-full">
        {isLoading ? <Loader /> : translations.auth.login.submit}
      </Button>
    </form>
  );
}

export default Form;
