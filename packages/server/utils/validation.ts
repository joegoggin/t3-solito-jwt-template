export const validateEmail = (email: string) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
};

export const validateNewPassword = (password: string) => {
    const hasCapital = new RegExp("(?=.*?[A-Z])");
    const hasLowerCase = new RegExp("(?=.*?[a-z])");
    const hasDigit = new RegExp("(?=.*?[0-9])");
    const hasSpecial = new RegExp("(?=.*?[#?!@$%^&*-])");

    if (!hasCapital.test(password)) {
        return {
            error: "At least one capital letter required.",
            isValid: false,
        };
    }

    if (!hasLowerCase.test(password)) {
        return {
            error: "At least one lowercase letter required.",
            isValid: false,
        };
    }

    if (!hasDigit.test(password)) {
        return { error: "At least one number required.", isValid: false };
    }

    if (!hasSpecial.test(password)) {
        return {
            error: "At least one special character required. (!, @, #, $, %, ^, &, *, -)",
            isValid: false,
        };
    }

    if (password.length < 8) {
        return {
            error: "Password must be at least 8 characters long.",
            isValid: false,
        };
    }

    return { error: null, isValid: true };
};
