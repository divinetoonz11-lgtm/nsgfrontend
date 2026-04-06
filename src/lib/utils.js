import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { toast } from "sonner";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount || 0);
}

export function formatDate(dateString) {
  if (!dateString) return '';
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(date);
}

export function exportToExcel(data, filename) {
  // Mock implementation for frontend-only environment
  toast.success(`Exported ${data?.length || 0} rows to ${filename}.xlsx`);
  console.log("Exporting to Excel:", data);
}

export async function copyToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text);
    toast.success("Copied!");
  } catch (err) {
    toast.error("Failed to copy text");
  }
}

export function getStatusColor(status) {
  const s = (status || '').toLowerCase();
  if (['active', 'approved', 'available', 'closed', 'success'].includes(s)) return 'status-active';
  if (['inactive', 'rejected', 'booked', 'open', 'failed', 'danger'].includes(s)) return 'status-inactive';
  if (['pending', 'hold', 'in progress', 'warning'].includes(s)) return 'status-pending';
  return 'bg-muted text-muted-foreground';
}