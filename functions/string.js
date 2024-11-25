export function insertInString(string, insertIndex, insertString) {
    let result = string.slice(0, insertIndex) + insertString + string.slice(insertIndex);
    return result;
}