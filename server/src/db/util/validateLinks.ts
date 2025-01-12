import * as fs from 'fs/promises';

export const objToCsvRecord = (obj: object) => {
    const values = Object.values(obj).map((value) => {
        if (typeof value === 'string') {
            // Escape double quotes by doubling them up
            return `"${value.replace(/"/g, '""')}"`;
        }
        return value;
    });
    return values.join(',');
};

/**
 * This function checks if provided URL
 * is valid and working properly i.e., status code != 404.
 * Since this function writes the error log when the link
 * fails, it is important to keep the associated object type as
 * "object" so that we keep the function as agnostic as possible.
 * @param input: the URL
 */
export const validateURLResponse = async (
    errorLog: string,
    lineItem: object | string,
    input: string
) => {
    input = await validateURLFormat(errorLog, lineItem, input);
    if (!input) return false;

    try {
        const timeOutMillis = 120 * 1000;
        // Test URL by fetching only the Headers
        const race = await Promise.race([
            fetch(input, { method: 'HEAD' }),
            new Promise((_, reject) =>
                setTimeout(
                    () => reject(new Error('Request timed out.')),
                    timeOutMillis
                )
            ),
        ]);

        const response = <Response>race;
        const status = response.status;
        const unacceptableErrors = [404];

        if (unacceptableErrors.includes(status)) {
            process.stdout.write('\r \r');
            console.error('Invalid url - Unexpected response: ', input);
            await fs.appendFile(
                errorLog,
                `${
                    typeof lineItem === 'string'
                        ? lineItem
                        : objToCsvRecord(lineItem)
                },Invalid url - Unexpected status code: "${input}",Status code:${status}\n`
            );
            return false;
        }

        return true;
    } catch (error) {
        const unacceptableErrors = [
            'ENOTFOUND',
            'UNABLE_TO_VERIFY_LEAF_SIGNATURE',
        ];
        if (
            unacceptableErrors.includes(error.code) ||
            error.message.includes('timed out')
        ) {
            process.stdout.write('\r \r');
            console.error('Invalid url - Unexpected response: ', input);
            await fs.appendFile(
                errorLog,
                `${
                    typeof lineItem === 'string'
                        ? lineItem
                        : objToCsvRecord(lineItem)
                },"${error.message}",${error.code ? error.code : ''}\n`
            );
            return false;
        }
        return true;
    }
};

/**
 * This function checks if provided URL
 * is valid format wise.
 * Since this function writes the error log when the link
 * fails, it is important to keep the associated object type as
 * "object" so that we keep the function as agnostic as possible.
 * @param input: the URL
 */
export const validateURLFormat = async (
    errorLog: string,
    lineItem: object | string,
    input: string
) => {
    try {
        if (!input || input.includes('null')) throw new Error();
        const url = input.startsWith('http') ? input : 'https://' + input;
        const encondedURL = new URL(url);
        return encondedURL.toString();
    } catch (error) {
        if (!input.includes('null')) {
            process.stdout.write('\r \r');
            console.error('Invalid url - Unexpected format: ', input);
            await fs.appendFile(
                errorLog,
                `${
                    typeof lineItem === 'string'
                        ? lineItem
                        : objToCsvRecord(lineItem)
                },Invalid url - Unexpected format: "${input}" \n`
            );
        }
        return '';
    }
};

export const checkURLFormat = (url: string): boolean => {
    try {
        new URL(url);
        return true;
    } catch (err) {
        return false;
    }
};
