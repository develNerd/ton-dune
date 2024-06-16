import React from 'react';

type JsonObject = { [key: string]: any };

function formatData(data: JsonObject | string, prefix: string = ''): string {
    let result = '';

    if (typeof data === 'string') {
        result += data;
        return result;
    }

    for (const key in data) {
        if (data.hasOwnProperty(key)) {
            const value = data[key];
            if (typeof value === 'object' && !Array.isArray(value) && value !== null) {
                result += `${prefix}${key}:\n`;
                result += formatData(value, prefix + '  ');
            } else {
                let formattedValue = value;
                if (typeof value === 'string' && /^\d{1,10}$/.test(value)) {
                    formattedValue = `**${value}**`;
                }
                result += `${prefix}${key}: ${formattedValue}\n`;
            }
        }
    }

    return result;
}

export default formatData;
