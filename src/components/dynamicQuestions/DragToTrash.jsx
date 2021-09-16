import React, { useState } from "react";
import Draggable from "react-draggable"; // The default

import { ArrowBack, Delete } from "@material-ui/icons";

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
          style={{
            width: "100%",
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
              bottom: "45%",
              right: "40%",
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
      <p
        style={{
          margin: 0,
          fontSize: "1em",
          color: "black",
          opacity: isOver ? 0.7 : 0.2,
        }}
      >
        Trash
      </p>
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

  const onDrag = (event, data) => {
    if (collidingWithTrash(data) === true) {
      if (isOverTrash === false) {
        setIsOverTrash(true);
      }
    } else if (isOverTrash === true) {
      setIsOverTrash(false);
    }
  };

  const handleStop = (event, data) => {
    if (collidingWithTrash(data) === true) {
      onSelectAnswer(1);
    }
  };

  return (
    <Draggable axis="both" onDrag={onDrag} onStop={handleStop}>
      <div
        id="dragableText"
        style={{
          width: 200,
          height: 70,
          margin: 30,
          cursor: "move",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <p style={{ color: "grey", fontSize: isOverTrash ? "0.8em" : "1em" }}>
          <i>{t(questionData.dragToTrashText)}</i>
        </p>
      </div>
    </Draggable>
  );
};

export default DragToTrash;
