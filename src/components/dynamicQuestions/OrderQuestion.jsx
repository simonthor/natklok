import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import ExpandMore from "@material-ui/icons/ExpandMore";
import ExpandLess from "@material-ui/icons/ExpandLess";

import "./OrderQuestion.css";
import { StyledButton } from "../general";

const OrderQuestion = ({ questionData, t, onSelectAnswer }) => {
  const [options, setOptions] = useState(questionData.options);

  function checkAnswer() {
    let order = options.map((options) => {
      return options.id;
    });
    console.log(order);
    console.log(questionData.correctIdOrder);

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
      <div style={{ display: "flex", width: "100%" }}>
        <div style={{ flex: "100% auto", paddingRight: "1em" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              height: "100%",
            }}
          >
            <p style={{ opacity: 0.8, fontSize: "0.8em" }}>
              {t(questionData.best)}
            </p>
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
            <p style={{ opacity: 0.8, fontSize: "0.8em" }}>
              {t(questionData.worst)}
            </p>
          </div>
        </div>
        <div style={{ flex: 1 }}>
          <DragDropContext onDragEnd={handleOnDragEnd}>
            <Droppable droppableId="characters">
              {(provided) => (
                <ul
                  className="items"
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {options.map(({ text, id }, index) => {
                    return (
                      <Draggable key={id} draggableId={id} index={index}>
                        {(provided) => (
                          <li
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <p>{text}</p>
                          </li>
                        )}
                      </Draggable>
                    );
                  })}
                  {provided.placeholder}
                </ul>
              )}
            </Droppable>
          </DragDropContext>
        </div>
      </div>
      <StyledButton onClick={checkAnswer}>{t("general.done")}</StyledButton>
    </>
  );
};

export default OrderQuestion;
