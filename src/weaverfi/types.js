// Token Type Guards:
export function isNativeToken(token) {
    return token.type === 'nativeToken';
}
export function isToken(token) {
    return token.type === 'token';
}
export function isLPToken(token) {
    return token.type === 'lpToken';
}
export function isDebtToken(token) {
    return token.type === 'debt';
}
export function isXToken(token) {
    return token.type === 'xToken';
}
