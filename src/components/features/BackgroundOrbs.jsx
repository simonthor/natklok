import { useRef, useEffect, useState } from "react";

import { LIGHT_BLUE, PINK } from "util/constants";

import "keyframes.css";

function shuffle(array) {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle...
  while (currentIndex !== 0) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}

const BackgroundOrbs = ({ hideWhenSmall = false, seed = -1 }) => {
  const bgdRef = useRef(null);
  const [generatedOnce, setGeneratedOnce] = useState(false);
  const [currentSeed, setCurrentSeed] = useState(-1);
  const [blobInfo, setBlobInfo] = useState([]);

  useEffect(() => {
    // Seed makes it possible for us to change the constalation of blobs
    if (generatedOnce === false || currentSeed !== seed) {
      setGeneratedOnce(true);
      setCurrentSeed(seed);
      setBlobInfo(generateBlobInfo(seed));
    }
  }, [bgdRef, seed, currentSeed]);

  const generateBlobInfo = (seed) => {
    let availablePositions = [
      { x: "15%", y: "20%" },
      { x: "10%", y: "40%" },
      { x: "15%", y: "60%" },
      { x: "85%", y: "20%" },
      { x: "90%", y: "40%" },
      { x: "85%", y: "65%" },
    ];
    let standardblobInfo = [
      { x: "15%", y: "20%", diam: 70 },
      { x: "15%", y: "60%", diam: 150 },
      { x: "85%", y: "40%", diam: 100 },
    ];
    let blobInfo = [];
    if (seed === -1) {
      return standardblobInfo;
    }

    shuffle(availablePositions)
      .slice(0, 3)
      .forEach((availablePosition) => {
        blobInfo.splice(Math.floor(Math.random() * blobInfo.length), 0, {
          ...availablePosition,
          diam: Math.floor(70 + Math.random() * 80),
        });
      });
    return blobInfo;
  };

  if (window.innerWidth < 1000 && hideWhenSmall === true) {
    return null;
  } else {
    return (
      <div
        style={{
          top: 0,
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          position: "absolute",
          width: "100%",
          height: "90vh",
          marginTop: window.innerWidth > 600 ? "10vh" : 0,
          overflow: "hidden",
        }}
        id="hoverColorEffect"
      >
        {blobInfo.map((info, i) => {
          return <Blob info={info} i={i} seed={seed} />;
        })}
      </div>
    );
  }
};

const Blob = ({ info, i, seed }) => {
  let color = i % 2 === 0 ? PINK : LIGHT_BLUE;
  let shade = i % 2 === 0 ? "#e892d5" : "#9fe0f5";
  let yPos = "calc(" + info.y + " - " + info.diam / 2 + "px)";
  let xPos = "calc(" + info.x + " - " + info.diam / 2 + "px)";
  let background = `radial-gradient(58.66% 58.66% at 77.37% 78.77%, ${shade} 0%, ${color} 100%)`;

  return (
    <div
      style={{
        width: info.diam,
        height: info.diam,
        position: "absolute",
        top: yPos,
        left: xPos,
        background: background,
        borderRadius: "100%",
        zIndex: 0,
        animation: "blobsExpand 8s infinite alternate",
        animationDelay: i * 2 + "s",
        transition: "0.8s cubic-bezier(.52,.08,.58,.93)",
        opacity: seed === -1 ? 1 : 0.6,
      }}
    />
  );
};

export default BackgroundOrbs;
