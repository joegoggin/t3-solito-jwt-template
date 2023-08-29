export const separateTextClasses = (classes?: String) => {
    let baseClasses: string = "";
    let textClasses: string = "";

    if (classes) {
        const classArray = classes.split(" ");

        classArray.forEach((className) => {
            if (
                className.includes("text") ||
                className.includes("font") ||
                className.includes("italic") ||
                className.includes("tracking") ||
                className.includes("line") ||
                className.includes("leading")
            ) {
                textClasses += `${className} `;
            } else {
                baseClasses += `${className} `;
            }
        });
    }

    return { baseClasses, textClasses };
};
