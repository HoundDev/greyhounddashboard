
function convertHexToString(hex) {
    return Buffer.from(hex, 'hex').toString('utf8');
}

export { convertHexToString };