export function getValueOrDefault<T>(value: T | undefined, defaultValue: T) {
    return value ? value : defaultValue;
}
