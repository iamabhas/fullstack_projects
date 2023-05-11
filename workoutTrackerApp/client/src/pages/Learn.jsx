import React from "react";
import YouTube from "react-youtube";

const Learn = () => {
  const videoUrl1 = "https://www.youtube.com/watch?v=EKUNGQ4LmH8";
  const videoId1 = extractVideoId(videoUrl1);

  const videoUrl2 = "https://www.youtube.com/watch?v=3IXpb6Z84-M";
  const videoId2 = extractVideoId(videoUrl2);

  const videoUrl3 = "https://www.youtube.com/watch?v=9O8mOtdKr44";
  const videoId3 = extractVideoId(videoUrl3);

  const videoUrl4 = "https://www.youtube.com/watch?v=-tld0bc0t3k";
  const videoId4 = extractVideoId(videoUrl4);

  const videoUrl5 = "https://www.youtube.com/watch?v=3MBZ3UUFHuM";
  const videoId5 = extractVideoId(videoUrl5);

  const videoUrl6 = "  https://www.youtube.com/watch?v=_8YDBi7k2eg";
  const videoId6 = extractVideoId(videoUrl6);

  const opts = {
    height: "315",
    width: "560",
    playerVars: {
      autoplay: 0,
      controls: 1,
    },
  };

  function extractVideoId(url) {
    const match = url.match(
      /(?:[?v=]|\/embed\/|\/\d\/|\/vi\/|youtu\.be\/|\/v\/|\/e\/|\/watch\?v=|&v=)([^#\&\?\n<>\'\" ]{11})/
    );
    return match && match[1];
  }

  return (
    <main className="learn-container" style={{ marginTop: "1rem" }}>
      <div>
        {" "}
        <h3>
          Learn about do's and don'ts regrading the Preparation,Training Program
          ,Gym Equipments and Nutrition{" "}
          <YouTube videoId={videoId1} opts={opts} />
        </h3>
      </div>
      <div>
        <h3>Losing fat in men vs women</h3>
        <YouTube videoId={videoId2} opts={opts} />
      </div>
      <div>
        <h3>Science based training split (Men)</h3>
        <YouTube videoId={videoId3} opts={opts} />
      </div>
      <div>
        <h3>Science based training split (Women)</h3>
        <YouTube videoId={videoId4} opts={opts} />
      </div>
      <div>
        <h3>Diet Tips for losing weight (Men and Women)</h3>
        <YouTube videoId={videoId5} opts={opts} />
      </div>
      <div>
        <h3>Diet Tips for gaining weight (Men and Women)</h3>
        <YouTube videoId={videoId6} opts={opts} />
      </div>
    </main>
  );
};

export default Learn;
