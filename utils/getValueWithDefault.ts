export default function getValueWithDefault(
  value: void | number,
  defaultValue: number
) {
  if (value === undefined || value === null) {
    return defaultValue;
  }
  return value;
}
