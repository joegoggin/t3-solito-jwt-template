export const objectToZodStringArray = (object: { [key: string]: string }) => {
    const array: string[] = [];

    for (const key in object) {
        array.push(object[key] as string);
    }

    return array as unknown as readonly [string, ...string[]];
};
