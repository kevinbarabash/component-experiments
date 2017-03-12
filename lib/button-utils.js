// @flow

export function solidStyle(color: string) {
    return {
        textColor: 'white',
        backgroundColor: color,
        borderColor: color,
    };
}

export function outlineStyle(
    color: string,
    backgroundColor: string = 'transparent'
) {
    return {
        textColor: color,
        backgroundColor: backgroundColor,
        borderColor: color,
    }
}
