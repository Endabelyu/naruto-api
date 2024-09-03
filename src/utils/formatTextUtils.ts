export function formatName(name: string): string {
  return name.charAt(0).toLocaleUpperCase() + name.slice(1).toLocaleLowerCase();
}
