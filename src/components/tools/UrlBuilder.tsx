import { RESULT_LIMIT, SORT_DIRECTION, URL_BASE } from "../global/consts";

export const USERS_URL = `${URL_BASE}/search/users`;
export const REPOSITORIES_URL = `${URL_BASE}/search/repositories`;

export const getRepositoriesUrl = (query: string) => {
    return `${REPOSITORIES_URL}?q=${query}&type=repositories&s=login&o=${SORT_DIRECTION}&page=1&per_page=${RESULT_LIMIT}`;
};

export const getUsersUrl = (query: string) => {
    return `${USERS_URL}?q=${query}&type:Users&s=login&o=${SORT_DIRECTION}&page=1&per_page=${RESULT_LIMIT}`;
};