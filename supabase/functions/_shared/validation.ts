export type FormValues = Record<string, unknown>;

export function cleanText(value: unknown, maxLength = 2000): string {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, maxLength);
}

export function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export function isValidPhone(value: string): boolean {
  return /^[+\d().\-\s]{8,20}$/.test(value);
}

export function validateConsent(value: unknown): boolean {
  return value === true;
}