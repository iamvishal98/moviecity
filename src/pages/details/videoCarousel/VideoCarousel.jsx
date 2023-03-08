import React, { useState } from 'react'
import ContentWrapper from '../../../components/contentWrapper/ContentWrapper';
import Image from '../../../components/lazyload/Image';
import Popup from '../../../components/popup/Popup';
import './videocarousel.scss'

const VideoCarousel = ({data,loading}) => {
  const [show, setShow] = useState(false);
  const [videoId, setVideoId] = useState(null);

  const loadingSkeleton = () => {
      return (
          <div className="skItem">
              <div className="thumb skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row2 skeleton"></div>
          </div>
      );
  };

  return (
      <div className="videosSection">
          <ContentWrapper>
              {data?.length>0 ? <div className="sectionHeading">Official Videos</div> : ''}
              {!loading ? (
                  <div className="videos">
                      {data?.results?.map((video) =>(
                        <div className="videoItem" key={video?.id}
                          onClick={() => {setVideoId(video?.key); setShow(true);}}
                        >
                          <div className="videoThumbnail">
                            <Image src={`https://img.youtube.com/vi/${video?.key}/mqdefault.jpg`} />
                          </div>
                          <div className="videoTitle">
                            {video?.name}
                          </div>

                        </div>
                      ))}
                  </div>
              ) : (
                  <div className="videoSkeleton">
                      {loadingSkeleton()}
                      {loadingSkeleton()}
                      {loadingSkeleton()}
                      {loadingSkeleton()}
                  </div>
              )}
          </ContentWrapper>
          <Popup
              show={show}
              setShow={setShow}
              videoId={videoId}
              setVideoId={setVideoId}
          />
      </div>
  );
}

export default VideoCarousel