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
  const { isFavourite, contactType } = query;

  const parsedType = parseType(contactType);
  const parsedIsFavourite = parseBoolean(isFavourite);

  return {
    isFavourite: parsedIsFavourite,
    contactType: parsedType,
  };
};
