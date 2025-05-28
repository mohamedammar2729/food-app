import { Pages } from "@/constants/enums";
import { IFormField, IFormFieldsVariables } from "@/Types/app";

interface Props extends IFormFieldsVariables {
  translations: any;
}

const useFormFields = ({ slug, translations }: Props) => {
  const loginFields = (): IFormField[] => [
    {
      label: "email",
      name: "email",
      type: "email",
      placeholder: "enter your email",
      autoFocus: true,
    },
    {
      label: "password",
      name: "password",
      type: "password",
      placeholder: "enter your password",
    },
  ];
  const getFormFields = (): IFormField[] => {
    switch (slug) {
      case Pages.LOGIN:
        return loginFields();
      default:
        return [];
    }
  };
  return {
    getFormFields,
  }
};

export default useFormFields;
