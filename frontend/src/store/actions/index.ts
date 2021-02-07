export const dispatchBegin = (type: string) => {
  return {
    type,
  };
};

export const dispatchComplete = <T>(type: string, payload: T) => {
  return {
    type,
    payload,
  };
};
