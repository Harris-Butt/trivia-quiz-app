import React from "react";

import { AnswerObject } from "../App";
import { Wrapper } from "../App.styles";
import { ButtonWrapper } from "./QuestionCard.styles";

type Props = {
  question: string;
  answers: string[];
  callback: any;
  userAnswer: AnswerObject | undefined;
  questionNumber: number;
  totalQuestions: number;
};
export const QuestionCard: React.FC<Props> = ({
  question,
  answers,
  callback,
  userAnswer,
  questionNumber,
  totalQuestions,
}) => {
  return (
    <Wrapper>
      <p className="number">
        Question: {questionNumber}/{totalQuestions}
      </p>
      <p dangerouslySetInnerHTML={{ __html: question }} />
      <div>
        {answers.map((ans) => (
          <ButtonWrapper
            key={ans}
            correct={userAnswer?.correctAnswer === ans}
            userClicked={userAnswer?.answer === ans}
          >
            <button
              disabled={userAnswer ? true : false}
              value={ans}
              onClick={callback}
            >
              <span dangerouslySetInnerHTML={{ __html: ans }} />
            </button>
          </ButtonWrapper>
        ))}
      </div>
    </Wrapper>
  );
};
