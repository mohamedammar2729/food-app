'use client'
import { InputTypes, Routes } from "@/constants/enums";
import useFormFields from "@/hooks/useFormFields";
import { Translations } from "@/Types/translations";
import { Session } from "next-auth";
import Image from "next/image";
import FormFields from "../form-fields/form-fields";
import { IFormField } from "@/Types/app";
import { Button } from "../ui/button";
import { UserRole } from "@prisma/client";
import Checkbox from "../form-fields/checkbox";
import { useActionState, useEffect, useState } from "react";
import { toast } from "sonner";

import { ValidationErrors } from "@/validations/auth";
import Loader from "../ui/loader";
import { updateProfile } from "./_actions/profile";
import { CameraIcon } from "lucide-react";

function EditUserForm({
  translations,
  user,
}: {
  translations: Translations;
  user: Session["user"];
}) {

  const formData = new FormData();
// get the user data and append some attributes to the formData
// object.entries(user) it converts the user object into an array of key-value pairs
// then we can iterate over the array and append each key-value pair to the formData
  Object.entries(user).forEach(([key, value]) => {
    // if Value not null or undefined, and key is not image
    // then append the key and value to the formData
    // we check if the key is not "image" because we will handle the image upload separately
    // and we don't want to append the image URL to the formData
    if (value !== null && value !== undefined && key !== "image") {
      formData.append(key, value.toString());
    }
  });

  const initialState: {
    message?: string;
    error?: ValidationErrors;
    status?: number | null;
    formData?: FormData | null;
  } = {
    message: "",
    error: {},
    status: null,
    formData,
  };
  const [selectedImage, setSelectedImage] = useState(user.image ?? "");
  const [isAdmin, setIsAdmin] = useState(user.role === UserRole.ADMIN);

  const [state, action, pending] = useActionState(
    // we add another parameter to the updateProfile function
    // to indicate if the user is an admin or not
    //isAdmin with initial value null
    updateProfile.bind(null, isAdmin),
    initialState
  );
  const { getFormFields } = useFormFields({
    slug: Routes.PROFILE,
    translations,
  });

  useEffect(() => {
    if (state.message && state.status && !pending) {
        if (state.status === 200) {
          toast.success(state.message);
        } else {
          toast.error(state.message);
        }
    }
  }, [pending, state.message, state.status]);

  useEffect(() => {
    setSelectedImage(user.image as string);
  }, [user.image]);

  return (
    <form action={action} className="flex flex-col md:flex-row gap-10">
      <div className="group relative w-[200px] h-[200px] overflow-hidden rounded-full mx-auto">
        {selectedImage && (
          <Image
            src={selectedImage}
            alt={user.name}
            width={200}
            height={200}
            className="rounded-full object-cover"
          />
        )}

        <div
          className={`${
            selectedImage
              ? "group-hover:opacity-[1] opacity-0  transition-opacity duration-200"
              : ""
          } absolute top-0 left-0 w-full h-full bg-gray-50/40`}
        >
          <UploadImage setSelectedImage={setSelectedImage} />
        </div>
      </div>
      <div className="flex-1">
        {getFormFields().map((field: IFormField) => {
          const fieldValue =
            state?.formData?.get(field.name) ?? formData.get(field.name);
          return (
            <div key={field.name} className="mb-3">
              <FormFields
                {...field}
                defaultValue={fieldValue as string}
                error={state?.error}
                readOnly={field.type === InputTypes.EMAIL}
              />
            </div>
          );
        })}
        
        {user.role === UserRole.ADMIN && (
          <div className="flex items-center gap-2 my-4">
            {/* Checkbox is from shadcn ui and it considered button */}
            <Checkbox
              name="admin"
              checked={isAdmin}
              onClick={() => setIsAdmin(!isAdmin)}
              label="Admin"
            />
          </div>
        )}
        <Button type="submit" className="w-full">
          {pending ? <Loader /> : translations.save}
        </Button>
      </div>
    </form>
  );
}

export default EditUserForm;

const UploadImage = ({
  setSelectedImage,
}: {
  setSelectedImage: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
        // Create a URL for the selected file and set it as the selected image
      const url = URL.createObjectURL(file);
      setSelectedImage(url);
    }
  };
  return (
    <>
      <input
        type="file"
        accept="image/*"
        className="hidden"
        id="image-upload"
        onChange={handleImageChange}
        name="image"
      />
      <label
        htmlFor="image-upload"
        className="border rounded-full w-[200px] h-[200px] element-center cursor-pointer"
      >
        <CameraIcon className="!w-8 !h-8 text-accent" />
      </label>
    </>
  );
};