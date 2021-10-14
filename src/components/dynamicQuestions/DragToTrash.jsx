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
            height: window.innerWidth < 576 ? "60vh" : 380,
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
              bottom: "45%",
              right: "40%",
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
  const collidingWithTrash = (data) => {
    const trashCan = document.getElementById("trashcan");
    const trashCanRect = trashCan.getBoundingClientRect();
    const dragableText = document.getElementById("dragableText");
    const dragableTextRect = dragableText.getBoundingClientRect();
    if (
      dragableTextRect.x > trashCanRect.left - 100 &&
      dragableTextRect.x < trashCanRect.left + 100 &&
      dragableTextRect.y > trashCanRect.top - 100 &&
      dragableTextRect.y < trashCanRect.top + 100
    ) {
      return true;
    }
    return false;
  };

  const isOutside = (data) => {
    const dragArea = document.getElementById("dragArea");
    const dragAreaRect = dragArea.getBoundingClientRect();
    const dragableText = document.getElementById("dragableText");
    const dragableTextRect = dragableText.getBoundingClientRect();
    const distOutsideToFailX = dragableTextRect.width / 5;
    const distOutsideToFailY = dragableTextRect.height / 8;
    if (
      dragableTextRect.x + dragableTextRect.width / 2 >
        dragAreaRect.x - distOutsideToFailX &&
      dragableTextRect.x + dragableTextRect.width / 2 <
        dragAreaRect.x + dragAreaRect.width + distOutsideToFailX &&
      dragableTextRect.y + dragableTextRect.height / 2 >
        dragAreaRect.y - distOutsideToFailY &&
      dragableTextRect.y + dragableTextRect.height / 2 <
        dragAreaRect.y + dragAreaRect.height + distOutsideToFailY
    ) {
      return false;
    }
    return true;
  };

  const onDrag = (event, data) => {
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
    } else if (isOutside(data) === true) {
      onSelectAnswer(0);
    }
  };

  return (
    <Draggable axis="both" onDrag={onDrag} onStop={handleStop}>
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
