export function getUserDisplayName(user: { name?: string | null; username: string }) {
  return user.name?.trim() || user.username;
}
