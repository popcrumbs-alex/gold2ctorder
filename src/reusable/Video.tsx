import React from "react";
import styled from "styled-components";

const ReactVideoContainer = styled.div`
  width: 100%;
  height: 100%;
`;
const Iframe = styled.iframe`
  width: 100%;
  height: 100%;
`;

const Video = ({ videoSrcURL, videoTitle, ...props }) => {
  return (
    <ReactVideoContainer>
      <Iframe
        src={videoSrcURL}
        title={videoTitle}
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        frameBorder="0"
        allowFullScreen
      />
    </ReactVideoContainer>
  );
};

export default Video;
