export const maskEmail = (email: string): string => {
  const [username, domain] = email.split("@");
  const maskedUsername = `${username.substring(0, 3)}${"*".repeat(username.length - 5)}${username.substring(username.length - 2)}`;
  return `${maskedUsername}@${domain}`;
};
