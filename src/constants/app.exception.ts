export enum AppException {
    EMAIL_NOT_VALID = 'The email address entered is not valid',
    PASSWORD_LENGTH = 'The length of the password must be between 8 and 12 characters',
    STRING_EMPTY = 'Entered string is empty',
    NUMBER_NOT_VALID = 'The number entered is not valid',
    DATE_NOT_VALID = 'The date entered is not valid',
    MISSING_RESOURCE = 'The resource is missing',
    COOKIE_IS_EMPTY = 'The request does not have an cookie',
}