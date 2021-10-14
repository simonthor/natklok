import React, { useState } from "react";
import Draggable from "react-draggable"; // The default

import Delete from "@material-ui/icons/Delete";
import ArrowBack from "@material-ui/icons/ArrowBack";
import SmallText from "components/general/typeography/SmallText";

const DragToTrash = ({ questionData, onSelectAnswer, t }) => {
  const [isOverTrash, setIsOverTrash] = useState(false);

  return (
    <>
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          id="dragArea"
          style={{
            width: "100%",
            maxHeight: "50vh",
            height: 380,
            background: "white",
            borderRadius: 12,
          }}
        >
          <DragText
            questionData={questionData}
            t={t}
            isOverTrash={isOverTrash}
            setIsOverTrash={setIsOverTrash}
            onSelectAnswer={onSelectAnswer}
          />
          <ArrowBack
            style={{
              color: "grey",
              opacity: 0.4,
              fontSize: "3.5em",
              position: "absolute",
              transform: "rotate(-140deg)",
              top: "45%",
              left: "50%",
              pointerEvents: "none",
            }}
          />
          <TrashCan isOver={isOverTrash} />
        </div>
      </div>
    </>
  );
};

const TrashCan = ({ isOver }) => {
  return (
    <div
      id="trashcan"
      style={{
        position: "absolute",
        bottom: 0,
        right: 0,
        margin: 30,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Delete
        style={{
          color: "black",
          opacity: isOver ? 0.7 : 0.3,
          fontSize: "3.5em",
        }}
      />
      <SmallText
        style={{
          margin: 0,
          color: "black",
          opacity: isOver ? 0.7 : 0.2,
        }}
      >
        Trash
      </SmallText>
    </div>
  );
};

const DragText = ({
  questionData,
  t,
  setIsOverTrash,
  isOverTrash,
  onSelectAnswer,
}) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const collidingWithTrash = (data) => {
    const trashCan = document.getElementById("trashcan");
    const trashCanRect = trashCan.getBoundingClientRect();
    const dragableText = document.getElementById("dragableText");
    const dragableTextRect = dragableText.getBoundingClientRect();
    if (
      dragableTextRect.x >
        trashCanRect.left - dragableTextRect.width / 2 - 50 &&
      dragableTextRect.x <
        trashCanRect.left + dragableTextRect.width / 2 + 50 &&
      dragableTextRect.y > trashCanRect.top - dragableTextRect.height / 2 &&
      dragableTextRect.y < trashCanRect.top + dragableTextRect.height / 2
    ) {
      return true;
    }
    return false;
  };

  const onDrag = (event, data) => {
    setPosition({ x: data.x, y: data.y });
    if (collidingWithTrash(data) === true) {
      if (isOverTrash === false) {
        setIsOverTrash(true);
      }
    } else {
      setIsOverTrash(false);
    }
  };

  const handleStop = (event, data) => {
    if (collidingWithTrash(data) === true) {
      onSelectAnswer(1);
    } else {
      setPosition({ x: 0, y: 0 });
    }
  };

  return (
    <Draggable
      axis="both"
      position={position}
      onDrag={onDrag}
      onStop={handleStop}
    >
      <div>
        <div
          id="dragableText"
          style={{
            margin: 20,
            maxWidth: 200,
            cursor: "move",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: 6,
            background: "rgba(0,0,0,0.075)",
            borderRadius: 8,
            position: "relative",
            transform: isOverTrash ? "scale(0.7)" : "scale(1)",
          }}
        >
          <p style={{ color: "grey", margin: 0 }}>
            <i>{t(questionData.dragToTrashText)}</i>
          </p>
          <div
            style={{
              position: "absolute",
              bottom: -8,
              left: 20,
              width: 0,
              height: 0,
              borderStyle: "solid",
              borderWidth: "8px 6px 0 6px",
              borderColor:
                "rgba(0,0,0,0.075) transparent transparent transparent",
            }}
          />
        </div>
      </div>
    </Draggable>
  );
};

export default DragToTrash;
