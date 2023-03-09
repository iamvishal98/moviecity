import React, { useState } from 'react'
import ContentWrapper from '../../../components/contentwrapper/ContentWrapper';
import Image from '../../../components/lazyload/Image';
import Popup from '../../../components/popup/Popup';
import './videocarousel.scss'
import VideoSkeleton from './VideoSkeleton/VideoSkeleton';

const VideoCarousel = ({data,loading}) => {
  const [show, setShow] = useState(false);
  const [videoId, setVideoId] = useState(null);

  return (
      <div className="videosSection">
          <ContentWrapper>
              {data?.results?.length>0 ? <div className="sectionHeading">Official Videos</div> : ''}
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
                  <div className="videos">
                    <VideoSkeleton />
                    <VideoSkeleton />
                    <VideoSkeleton />
                    <VideoSkeleton />
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