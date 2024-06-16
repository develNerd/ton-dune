import React from 'react';

type JsonObject = { [key: string]: any };

const formatData = (data: JsonObject | string, prefix: string = ''): React.ReactNode => {
    if (typeof data === 'string') {
        return <span>{data}</span>;
    }

    const entries = Object.entries(data).map(([key, value]) => {
        if (typeof value === 'object' && !Array.isArray(value) && value !== null) {
            return (
                <div key={key} style={{ marginLeft: '20px' }}>
                    <strong>{prefix}{key}:</strong>
                    <div style={{ marginLeft: '20px' }}>{formatData(value, '')}</div>
                </div>
            );
        } else {
            let formattedValue = value;
            if (typeof value === 'string' && /^\d{1,10}$/.test(value)) {
                formattedValue = <strong>{value}</strong>;
            }
            if (key === 'ok') {
                const okStyle = value ? { backgroundColor: 'green', color: 'white', padding: '5px', borderRadius: '5px' } : { backgroundColor: 'red', color: 'white', padding: '5px', borderRadius: '5px' };
                formattedValue = <span style={okStyle}>{String(value)}</span>;
            }
            return (
                <div key={key} style={{ marginLeft: '20px' }}>
                    <strong>{prefix}{key}:</strong> {formattedValue}
                </div>
            );
        }
    });

    return <div>{entries}</div>;
};

export default formatData;
