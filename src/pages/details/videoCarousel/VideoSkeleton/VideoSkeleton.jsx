import React from 'react';
import './videoskeleton.scss';

const VideoSkeleton = () => {

return (
    <div className="videoItem ">
        <div className="Thumbnail skeleton"></div>
        <div className="Title skeleton"></div>
    </div>
);
}

export default VideoSkeleton