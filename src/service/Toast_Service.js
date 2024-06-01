import { toast } from "sonner";

export const error_toast = (msg) => {
  return toast.error(msg);
};

export const success_Toast = (msg) => {
  return toast.success(msg);
};
export const des_Success_Toast = (title, msg) => {
  return toast.success(title, {
    description: msg,
  });
};

export const warn_Toast = (msg) => {
  return toast.warning(msg);
};
