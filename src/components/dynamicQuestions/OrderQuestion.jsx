import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import ExpandMore from "@material-ui/icons/ExpandMore";
import ExpandLess from "@material-ui/icons/ExpandLess";

import "./OrderQuestion.css";
import StyledButton from "components/general/StyledButton";
import SmallText from "components/general/typeography/SmallText";
import AlignCenter from "components/general/AlignCenter";
import Fade from "react-reveal/Fade";

const OrderQuestion = ({ questionData, t, onSelectAnswer }) => {
  const [options, setOptions] = useState(questionData.options);

  function checkAnswer() {
    let order = options.map((options) => {
      return options.id;
    });

    // Compare by casting to strings
    let correctOrder = questionData.correctIdOrder + "" === order + "";

    let correctOrderText = "";
    if (correctOrder === false) {
      correctOrderText =
        "<br/><br/><b>" + t("test.correctOrder") + "</b><br/> ";
      questionData.correctIdOrder.forEach((id, index) => {
        options.forEach((option) => {
          if (option.id === id) {
            correctOrderText += index + 1 + ". " + option.text + "<br/>";
          }
        });
      });
    }

    onSelectAnswer(correctOrder, correctOrderText);
  }

  function handleOnDragEnd(result) {
    if (!result.destination) return;

    const items = Array.from(options);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setOptions(items);
  }

  return (
    <>
      <div
        style={{
          position: "absolute",
          height: "90vh",
          width: "100vw",
          top: 0,
          left: 0,
        }}
      >
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Fade>
            <AlignCenter withMaxWidth>
              <div
                style={{
                  display: "flex",
                  marginTop: "28vh",
                  width: "90%",
                }}
              >
                <div style={{ flex: "100% auto", paddingRight: "1em" }}>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      height: "100%",
                    }}
                  >
                    <SmallText xs opacity style={{ margin: "16px 0 0 0" }}>
                      {t(questionData.best)}
                    </SmallText>
                    <ExpandLess style={{ fontSize: "1.5em" }} />
                    <div
                      style={{
                        height: "100%",
                        margin: "-0.76em 0",
                        width: 2,
                        background: "white",
                      }}
                    />
                    <ExpandMore style={{ fontSize: "1.5em" }} />
                    <SmallText xs opacity style={{ margin: "0 0 16px 0" }}>
                      {t(questionData.worst)}
                    </SmallText>
                  </div>
                </div>
                <Droppable droppableId="items">
                  {(provided) => (
                    <ul
                      className="items"
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      style={{ width: "90%" }}
                    >
                      {options.map(({ text, id }, index) => {
                        return (
                          <Draggable key={id} draggableId={id} index={index}>
                            {(provided, snapshot) => {
                              if (snapshot.isDragging) {
                                const offset = { x: 0, y: 0 }; // your fixed container left/top position
                                const x =
                                  provided.draggableProps.style.left - offset.x;
                                const y =
                                  provided.draggableProps.style.top - offset.y;
                                provided.draggableProps.style.left = x;
                                provided.draggableProps.style.top = y;
                              }
                              return (
                                <li
                                  style={{ width: "100%" }}
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                >
                                  <p>{text}</p>
                                </li>
                              );
                            }}
                          </Draggable>
                        );
                      })}
                      {provided.placeholder}
                    </ul>
                  )}
                </Droppable>
              </div>
            </AlignCenter>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <StyledButton
                onClick={checkAnswer}
                style={{ paddingRight: 42, paddingLeft: 42 }}
              >
                {t("general.done")}
              </StyledButton>
            </div>
          </Fade>
        </DragDropContext>
      </div>
    </>
  );
};

export default OrderQuestion;
