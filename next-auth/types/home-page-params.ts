type AuthMode = 'register' | 'login' | 'logout';
type AuthParams = '?authmode=register' | '?authmode=login' | '?authmode=logout';

const queryParamsDefault: AuthParams = '?authmode=login';

export {
    type AuthMode,
    queryParamsDefault
}