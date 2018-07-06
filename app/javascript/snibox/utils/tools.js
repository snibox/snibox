export const getPropertyOrDefault = (object, key) => {
  return object.hasOwnProperty(key) ? object[key] : key
}
