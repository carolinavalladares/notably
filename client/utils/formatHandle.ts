export default function formatHandle(username: string) {
  const handle = username.replace(" ", "_").toLowerCase();

  return `@${handle}`;
}
