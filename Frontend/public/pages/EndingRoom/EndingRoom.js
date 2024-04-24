for (var key in localStorage) {
  if (localStorage.hasOwnProperty(key)) {
    // Remove the item corresponding to the current key
    localStorage.removeItem(key);
  }
}
