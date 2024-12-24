export const getLocalStorage = (key) => {
  try {
    const item = localStorage.getItem(key);    
    return item;
  } catch (error) {
    console.error('Error getting item from local storage:', error);
    return null;
  }
};
