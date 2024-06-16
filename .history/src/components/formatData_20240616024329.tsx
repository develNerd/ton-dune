type JsonObject = { [key: string]: any };

function formatData(data: JsonObject, prefix: string = ''): string {
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
}

// Example data
const data = {
    "ok": true,
    "result": {
        "wallet": false,
        "balance": "5000000000",
        "account_state": "uninitialized",
        "last_transaction_id": {
            "@type": "internal.transactionId",
            "lt": "22245568000001",
            "hash": "+NNWkgt7/0Hlcf4cEDEll/gUKR7u5li7YikBYv12N8w="
        }
    }
};

// Example usage in a React component
const FormattedDataComponent: React.FC = () => {
    const formattedString = formatData(data);

    return (
        <div dangerouslySetInnerHTML={{ __html: formattedString }} />
    );
};

export default FormattedDataComponent;
