import type { FieldValues } from "react-hook-form";

export const getDirtyValues = <T extends FieldValues>(
  allValues: T,
  dirtyFields: Partial<Record<keyof T, any>>
): Partial<T> => {
  const dirtyValues: Partial<T> = {};

  Object.keys(dirtyFields).forEach((key) => {
    const currentKey = key as keyof T;

    // Handle nested objects or arrays if necessary
    if (typeof dirtyFields[currentKey] === 'object' && dirtyFields[currentKey] !== null) {
      dirtyValues[currentKey] = getDirtyValues(allValues[currentKey], dirtyFields[currentKey]) as any;
    } else if (dirtyFields[currentKey] === true) {
      dirtyValues[currentKey] = allValues[currentKey];
    }
  });

  return dirtyValues;
};
