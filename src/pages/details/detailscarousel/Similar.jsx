import React from "react";
import useFetch from "../../../utils/useFetch";
import Carousel from '../../../components/carousel/Carousel'



const Similar = ({ mediaType, id }) => {
    const { data, loading, error } = useFetch(`/${mediaType}/${id}/similar`);

    const title = mediaType === "tv" ? "Similar TV Shows" : "Similar Movies";

    console.log('similar',mediaType)

    return (
        <>
        <Carousel
            title={title}
            data={data?.results}
            loading={loading}
            endPoint={mediaType}
        />
        </>
    );
};

export default Similar;