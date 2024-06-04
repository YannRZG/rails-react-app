import React, { useContext, useEffect } from 'react';
import { AppContext } from '../App';

function LatestImage() {
  const { latestPost, setLatestPost } = useContext(AppContext);

  useEffect(() => {
    fetch("http://localhost:3000/latest")
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setLatestPost(data.image_url);
      })
      .catch((error) => console.error('Error:', error));
  }, [latestPost, setLatestPost]);

  return (
    <div>
      <img src={latestPost} alt="latest post" className="latest-image" />
    </div>
  );
}

export default LatestImage;
