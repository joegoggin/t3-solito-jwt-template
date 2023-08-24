export const capitalize = (string: string): string => {
    let capitalizedString = "";

    if (string.includes("-")) {
        const stringArray = string.split("-");

        stringArray.forEach((word) => {
            const capitalizedWord =
                word.charAt(0).toUpperCase() + word.slice(1);
            capitalizedString += " " + capitalizedWord;
        });
    } else if (string.includes(" ")) {
        const stringArray = string.split(" ");

        stringArray.forEach((word, index) => {
            const capitalizedWord =
                word.charAt(0).toUpperCase() + word.slice(1);
            if (index === 0) {
                capitalizedString += capitalizedWord;
            } else {
                capitalizedString += " " + capitalizedWord;
            }
        });
    } else {
        capitalizedString = string.charAt(0).toUpperCase() + string.slice(1);
    }

    return capitalizedString;
};
