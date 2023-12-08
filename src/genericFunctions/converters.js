import { format, parseISO } from 'date-fns';

export const convertToLabel = (propertyName) => {
  return propertyName
    .replace(/([a-z])([A-Z])/g, '$1 $2') // Insert space between camelCase words
    .replace(/\b\w/g, (char) => char.toUpperCase()); // Capitalize the first letter of each word
};

export const convertDateForTable = (value) => {
  const dateRegex = /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?/;
  if (typeof value === 'string' && dateRegex.test(value)) {
    return format(parseISO(value), 'yyyy-MM-dd');
  }
  return value;
};
