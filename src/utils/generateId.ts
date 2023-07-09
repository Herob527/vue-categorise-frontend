export const generateId = (file: File) => {
  const { name, size } = file;
  return `${name}-${size}`;
};
