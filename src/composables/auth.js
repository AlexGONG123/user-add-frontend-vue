import { useCookies } from '@vueuse/integrations/useCookies'

const CSRF_ACCESS_TOKEN = "csrf_access_token"
const ACCESS_TOKEN_COOKIE = "access_token_cookie"

const cookie = useCookies()

export function getCSRFToken(){
    return cookie.get(CSRF_ACCESS_TOKEN)
}

export function getAccessTokenCookie(){
    return cookie.get(ACCESS_TOKEN_COOKIE)
}

export function removeCSRFToken(){
    return cookie.remove(CSRF_ACCESS_TOKEN)
}

export function removeAccessTokenCookie(){
    return cookie.remove(ACCESS_TOKEN_COOKIE)
}

export function getAllCookies(){
    return cookie.getAll();
}