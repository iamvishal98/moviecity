export const BASE_URL = "https://api.themoviedb.org/3";
export const TOKEN = import.meta.env.VITE_TMDB_TOKEN;

export const headers = {
    Authorization: "bearer " + TOKEN ,
};
