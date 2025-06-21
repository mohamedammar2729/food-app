"use client";

import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import { deleteCategory } from "../_actions/category";

type StateType = {
  isLoading: boolean;
  message: string;
  status: number | null;
};

function DeleteCategory({ id }: { id: string }) {
  const [state, setState] = useState<StateType>({
    isLoading: false,
    message: "",
    status: null,
  });

  const handleDelete = async () => {
    try {
        // first we set the loading state to true
      setState((prev) => {
        return { ...prev, isLoading: true };
      });
        // then we call the deleteCategory function with the id
      const res = await deleteCategory(id);
      // if the response is successful, we update the state with the message and status
      setState((prev) => {
        return { ...prev, message: res.message, status: res.status };
      });
    } catch (error) {
      console.log(error);
    } finally {
      setState((prev) => {
        return { ...prev, isLoading: false };
      });
    }
  };
  return (
    <Button
      variant="secondary"
      disabled={state.isLoading}
      onClick={handleDelete}
    >
      <Trash2 />
    </Button>
  );
}

export default DeleteCategory;
