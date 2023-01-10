export const API_HOST_URL = "https://nf-api.onrender.com"
export const API_BASE = "/api/v1"
export const API_SOCIAL = "/social"
export const API_SOCIAL_URL = `${API_HOST_URL}${API_BASE}${API_SOCIAL}`

export const API_AUTH_REGISTER = "/auth/register"
export const API_REGISTER_URL = `${API_SOCIAL_URL}${API_AUTH_REGISTER}`

export const API_LOGIN = "/auth/login"
export const API_AUTH_LOGIN = `${API_SOCIAL_URL}${API_LOGIN}`

export const API_POST = "/posts"
export const API_SOCIAL_POST = `${API_SOCIAL_URL}${API_POST}`

export const POST_PARAM = "/?_author=true&_reactions=true&_comments=true";
