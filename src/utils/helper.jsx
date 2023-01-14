export function validateObject(obj) {
  let invalidKeys = [];
  for (const key in obj) {
    if (!obj[key] || obj[key] === "") {
      invalidKeys.push(key);
    }
  }
  return invalidKeys;
}
