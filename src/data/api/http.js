import { ACCESS_TOKEN_KEY, BASE_URL } from "./config";

const getAccessToken = () => localStorage.getItem(ACCESS_TOKEN_KEY);
const setAccessToken = (value) => localStorage.setItem(ACCESS_TOKEN_KEY, value);

const fetchUrl = (endpoint, options) => {
  return fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      ...options.headers,
    },
  });
};

const fetchUrlWithToken = (endpoint, options) => {
    return fetchUrl(endpoint, {
        ...options,
        headers: {
            ...options.headers,
            Authorization: `Bearer ${getAccessToken()}`,
        }
    })
}

export {
    fetchUrl,
    fetchUrlWithToken,
    setAccessToken
}