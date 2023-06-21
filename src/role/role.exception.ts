export enum RoleException {
    AUTH_GUARD_IS_MISSING = 'Auth guard is missing',
    DO_NOT_HAVE_ACCESS = 'You do not have access to this resource',
    THERE_IS_NOT_ASSIGN_HEADER = 'There is no assign header in the request',
    ASSIGN_HEADER_IS_NOT_VALID = 'The assign header is invalid',
    SET_ID_NOT_FOUND = 'The set id is not found',
    USER_IS_NOW_SET_OWNER = 'The user is now set owner',
}