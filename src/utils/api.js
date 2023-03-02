import axios from "axios";

export const BASE_URL = "https://api.themoviedb.org/3";
export const TOKEN = import.meta.env.VITE_TMDB_TOKEN;

export const headers = {
    Authorization: "bearer " + TOKEN ,
};


export const fetchDataFromApi = async (url, params) => {
    try {
        const { data } = await axios.get(BASE_URL + url, {
            headers,
            params,
        });
        return data;
    } catch (err) {
        console.log(err);
        return err;
    }
};

export const fetchGenre =  async() => {
    let response =[]
    let endPoints = ["tv","movie"];
    let allGenre={}

    endPoints.forEach((ep) => {
        response.push(fetchDataFromApi(`/genre/${ep}/list`));
    })

    const data = await Promise.all(response);
    data.map(({genres}) => {
        return genres.map((item) => allGenre[item.id] = item.name);
    });

    return allGenre;

}