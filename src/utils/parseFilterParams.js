const parseType = (type) => {
  const isString = typeof type === 'string';
  if (!isString) return;
  const isType = (type) => ['home', 'work', 'personal'].includes(type);

  if (isType(type)) return type;
};

const parseBoolean = (value) => {
  if (typeof value === 'string') {
    return value.toLowerCase() === 'true' || value.toLowerCase() === 'false'
      ? value.toLowerCase() === 'true'
      : undefined;
  }
};

export const parseFilterParams = (query) => {
  const { isFavorite, contactType } = query;

  const parsedType = parseType(contactType);
  const parsedIsFavorite = parseBoolean(isFavorite);

  return {
    isFavorite: parsedIsFavorite,
    contactType: parsedType,
  };
};
