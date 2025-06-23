'use client';

import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { deleteUser } from '../_actions/users';

function DeleteUserButton({ userId }: { userId: string }) {
  const [state, setState] = useState<{
    pending: boolean;
    status: null | number;
    message: string;
  }>({
    pending: false,
    status: null,
    message: '',
  });
  const handleDelete = async (id: string) => {
    try {
      setState((prev) => {
        return { ...prev, pending: true };
      });
      const res = await deleteUser(id);
      setState((prev) => {
        return { ...prev, status: res.status, message: res.message };
      });
    } catch (error) {
      console.log(error);
    } finally {
      setState((prev) => {
        return { ...prev, pending: false };
      });
    }
  };

  useEffect(() => {
    if (state.message && state.status && !state.pending) {
        if (state.status === 200) {
          toast.success(state.message);
        } else {
          toast.error(state.message);
        }
    }
  }, [state.pending, state.message, state.status]);
  return (
    <Button
      type='button'
      variant='outline'
      disabled={state.pending}
      onClick={() => handleDelete(userId)}
    >
      <Trash2 />
    </Button>
  );
}

export default DeleteUserButton;
