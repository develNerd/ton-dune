import React from 'react';

type JsonObject = { [key: string]: any };

const formatData = (data: JsonObject, prefix: string = ''): React.ReactNode => {
    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text).then(() => {
            alert('Copied to clipboard');
        });
    };

    if (typeof data === 'string') {
        return (
            <div style={{ marginLeft: prefix.length * 10 }}>
                <span>{data}</span>
                <button onClick={() => copyToClipboard(data)} style={{ marginLeft: '10px' }}>Copy</button>
            </div>
        );
    }

    return Object.entries(data).map(([key, value]) => {
        if (typeof value === 'object' && !Array.isArray(value) && value !== null) {
            return (
                <div key={key} style={{ marginLeft: prefix.length * 10 }}>
                    <strong>{prefix}{key}:</strong>
                    <div style={{ marginLeft: '20px' }}>{formatData(value, prefix + '  ')}</div>
                </div>
            );
        } else {
            let formattedValue: React.ReactNode = value;
            if (typeof value === 'string' && /^\d{1,10}$/.test(value)) {
                formattedValue = <strong>{value}</strong>;
            }
            if (key === 'ok') {
                const okStyle = true
                    ? { backgroundColor: 'green', color: 'white', padding: '5px', borderRadius: '5px' }
                    : { backgroundColor: 'red', color: 'white', padding: '5px', borderRadius: '5px' };
                formattedValue = <span style={okStyle}>{String(value)}</span>;
            }
            return (
                <div key={key} style={{ marginLeft: prefix.length * 10 }}>
                    <strong>{prefix}{key}:</strong> {formattedValue}
                    {typeof value === 'string' && (
                        <button onClick={() => copyToClipboard(value as string)} style={{ marginLeft: '10px' }}>Copy</button>
                    )}
                </div>
            );
        }
    });
};

export default formatData;
