type JsonObject = { [key: string]: any };

export const formatData = (data: JsonObject, prefix: string = ''): string => {
    let result = '';

    if (typeof data === 'string') {
        result += `${data}`;
        return result;
    }

    for (const key in data) {
        if (data.hasOwnProperty(key)) {
            const value = data[key];
            if (typeof value === 'object' && !Array.isArray(value) && value !== null) {
                result += `<div style="margin-left: ${prefix.length * 10}px;"><strong>${key}:</strong>`;
                result += formatData(value, prefix + '  ');
                result += `</div>`;
            } else {
                let formattedValue = value;
                if (typeof value === 'string' && /^\d{1,10}$/.test(value)) {
                    formattedValue = `<strong>${value}</strong>`;
                }
                if (key === 'ok') {
                    const okStyle = value
                        ? 'background-color: green; color: white; padding: 5px; border-radius: 5px;'
                        : 'background-color: red; color: white; padding: 5px; border-radius: 5px;';
                    formattedValue = `<span style="${okStyle}">${String(value)}</span>`;
                }
                result += `<div style="margin-left: ${prefix.length * 10}px;">
                    <strong>${prefix}${key}:</strong> ${formattedValue}
                    ${typeof value === 'string' ? `<button onclick="navigator.clipboard.writeText('${value}').then(() => { alert('Copied to clipboard'); })" style="margin-left: 10px;">Copy</button>` : ''}
                </div>`;
            }
        }
    }

    return result;
};

export default formatData;
