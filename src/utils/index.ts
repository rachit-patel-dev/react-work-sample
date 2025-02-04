import { dotMatcherRegex, thousandsSeparatorRegex } from "../resources/statics";


/**
 * Formats a number into a string representation based on the provided locale.
 * @param {number|string} numberInput - The number to format, can be either a number or a string representing a number.
 * @param {string} [convertToFormat="en-US"] - The locale to use for formatting (default: "en-US").
 * @returns {string} The formatted number as a string.
 */
export const formatNumber = (
    numberInput: number | string,
    convertToFormat = "en-US"
): string => {
    return (
        typeof numberInput === "string" ? Number(numberInput) : numberInput
    )?.toLocaleString(convertToFormat);
};

/**
 * Calculates the week number of the year for the given date.
 * @param {Date} d - The date for which to calculate the week number (default: current date).
 * @returns {number} The week number of the year.
 */
export const getWeekNumber = (d: Date = new Date()): number => {
    const formatedDate: Date = new Date(
        Date.UTC(d.getFullYear(), d.getMonth(), d.getDate())
    );
    formatedDate.setUTCDate(
        formatedDate.getUTCDate() + 4 - (formatedDate.getUTCDay() || 7)
    );
    const yearStart: Date = new Date(
        Date.UTC(formatedDate.getUTCFullYear(), 0, 1)
    );
    const weekNo = Math.ceil(
        ((formatedDate.getTime() - yearStart.getTime()) / 86400000 + 1) / 7
    );
    return weekNo;
};


/**
 * Removes the thousands separator (dot) from a German-formatted number string.
 *
 * @param {string} inputNumber - The German-formatted number string with dot separators.
 * @returns {string | null} - The number string without dot separators, or null if the input is undefined.
 *
 * @example
 * const formattedNumber = "1.234.567";
 * const result = removeThousandSeperatorFromGermanNum(formattedNumber);
 * console.log(result); // Output: "1234567"
 */
export const removeThousandSeperatorFromGermanNum = (inputNumber: string) => {
    return inputNumber?.replace(dotMatcherRegex, "")
}

/**
 * Adds thousand separators and limits the decimal part to two decimal places for a German-formatted number.
 *
 * @param {string} germanNumber - The German-formatted number to be formatted.
 * @returns {string} - The formatted number with thousand separators and limited decimal places.
 *
 * @example
 * const germanNumber = '1234567,89';
 * const formattedNumber = addThousandSeparatorToGermanNum(germanNumber);
 * // Returns: '1.234.567,89'
 */
export const addThousandSeparatorToGermanNum = (germanNumber: string) => {
    // Remove any existing thousand separators (e.g., commas)
    const sanitizedInput = removeThousandSeperatorFromGermanNum(germanNumber);

    // Split the number into integer and decimal parts (if any)
    const [integerPart, decimalPart] = sanitizedInput.split(',');

    // Add thousand separators to the integer part
    const formattedIntegerPart = integerPart.replace(thousandsSeparatorRegex, '.');

    // Limit the decimal part to two decimal places (if it exists)
    const formattedDecimalPart = decimalPart ? decimalPart.slice(0, 2) : '';

    // Combine the formatted integer part with the decimal part (if any)
    const formattedNumber = formattedDecimalPart ? `${formattedIntegerPart},${formattedDecimalPart}` : sanitizedInput?.includes(',') ? `${formattedIntegerPart},` : formattedIntegerPart;

    return formattedNumber;
}
