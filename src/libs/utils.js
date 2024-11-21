export function validateEmail(string) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(string);
}

export const bytesToMb = (bytes) => {
  return bytes / (1024 * 1024);
};