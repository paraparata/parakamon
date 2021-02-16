const setPersistState = (key, state) => {
  window.localStorage.setItem(key, JSON.stringify(state));
};

const getPersistState = (key) => {
  const savedState = window.localStorage.getItem(key);
  try {
    if (!savedState) {
      return undefined;
    }
    return JSON.parse(savedState);
  } catch (e) {
    console.error("Error loading state : " + key);
    return undefined;
  }
};

export { setPersistState, getPersistState };
