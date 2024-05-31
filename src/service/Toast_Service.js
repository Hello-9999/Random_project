import { toast } from "sonner";

export const error_toast = (msg) => {
  return toast.success(msg);
};

export const success_Toast = (msg) => {
  return toast.success(msg);
};

export const warn_Toast = (msg) => {
  return toast.warning(msg);
};
