import React from "react";
import styled from "styled-components";
const IframeContainer = styled.div`
  position: absolute;
  bottom: -100vh;
  z-index: -9;
  opacity: 0;
`;
const BodyTags = () => {
  return (
    <IframeContainer>
      <iframe
        src="https://m.clickbooth.com/l/con?cbiframe=1&oid=79117&cbtid={transaction_id}"
        scrolling="no"
        frameBorder="0"
        width="1"
        height="1"
      ></iframe>
      <iframe
        src="https://cvrdomain.com/l/con?cbiframe=1&oid=79115&cbtid={transaction_id}"
        scrolling="no"
        frameBorder="0"
        width="1"
        height="1"
      ></iframe>
    </IframeContainer>
  );
};

export default BodyTags;
