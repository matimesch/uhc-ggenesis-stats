import React, { useState } from 'react';
import './Videos.css'; // Import your custom CSS for styling

const videoData = [
  {
    id: "ftaXlg9nQ1M",
    thumbnail: "https://img.youtube.com/vi/ftaXlg9nQ1M/0.jpg",
    caption: "uhc combo",
  },
  {
    id: "JcfM_Syfr5c",
    thumbnail: "https://img.youtube.com/vi/JcfM_Syfr5c/0.jpg",
    caption: "ferni encontró un pueblo en el lugar menos esperado",
  },
  {
    id: "n4N-eDuXKaY",
    thumbnail: "https://img.youtube.com/vi/n4N-eDuXKaY/0.jpg",
    caption: "ez doble mato a las ratas carroñeras de 2 hits en uhc",
  },
  {
    id: "H03-COT2HlY",
    thumbnail: "https://img.youtube.com/vi/H03-COT2HlY/0.jpg",
    caption: "seki me hace nadar en lava",
  },
  {
    id: "0ofCXZNWA6c",
    thumbnail: "https://img.youtube.com/vi/0ofCXZNWA6c/0.jpg",
    caption: "ultra unlucky uhc",
  },
  {
    id: "BkCubAtwH60",
    thumbnail: "https://img.youtube.com/vi/BkCubAtwH60/0.jpg",
    caption: "juampi se cae a la lava",
  },
  {
    id: "https://youtu.be/3CF8a2WX-TA",
    thumbnail: "https://img.youtube.com/vi/3CF8a2WX-TA/0.jpg",
    caption: "deathamtch uhc wachin se tiltea",
  },
];

const Videos = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentVideo, setCurrentVideo] = useState(null);

  const openModal = (videoId) => {
    setCurrentVideo(videoId);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setCurrentVideo(null);
    setIsModalOpen(false);
  };

  return (
    <div>
      <div id="video-gallery">
        {videoData.map((video) => (
          <div key={video.id} className="video-item" onClick={() => openModal(video.id)}>
            <img src={video.thumbnail} alt={`Thumbnail of video ${video.id}`} />
            <div className="caption">{video.caption}</div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>
              &times;
            </button>
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${currentVideo}?autoplay=1`}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title="Video"
            ></iframe>
          </div>
        </div>
      )}
    </div>
  );
};

export default Videos;
