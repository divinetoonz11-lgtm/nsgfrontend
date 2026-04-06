import { toast as sonnerToast } from 'sonner';

// Wrapper to ensure consistent styling if needed, though sonner is used directly in most places
export const Toast = {
  success: (msg) => sonnerToast.success(msg),
  error: (msg) => sonnerToast.error(msg),
  info: (msg) => sonnerToast.info(msg),
  warning: (msg) => sonnerToast.warning(msg),
};