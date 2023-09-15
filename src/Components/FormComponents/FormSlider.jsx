import React, { useEffect } from "react";
import { useState } from "react";
import {
  ExclamationTriangleIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/solid";
import { dataText } from "../../data/dataText";

export const FormSlider = ({
  oneData,
  setIdQuestion,
  setData,
  idQuestion,
  setIsStop,
}) => {
  const [selectedAnswer, setSelectedAnswer] = useState(
    oneData.reponses[0].label
  );
  const [valueSlider, setValueSlider] = useState(0);
  const [isDisabled, setIsDisabled] = useState(false);

  const [error, setError] = useState("");

  const onClickBtn = () => {
    setError({});
  };

  const setSelectAnswerWithSlider = (value) => {
    if (value === "0") {
      setSelectedAnswer(oneData.reponses[0].label);
    } else if (value === "50") {
      setSelectedAnswer(oneData.reponses[1].label);
    } else if (value === "100") {
      setSelectedAnswer(oneData.reponses[2].label);
    }
  };

  useEffect(() => {
    setSelectAnswerWithSlider(valueSlider);
  }, [valueSlider]);

  const handleClick = (answer) => {
    setError("");
    setIsDisabled(true);

    if (oneData?.welcomeMessage) {
      window.dataLayer.push({
        event: "welcome_message_answered",
        question: oneData.variable, // libellé de la question -> description_question selon nomenclature
        answer: selectedAnswer, // libellé de la réponse -> reprendre le @variable_question
      });
    } else {
      window.dataLayer.push({
        event: "question_answered", // libellé de l'event -> Ne Pas Changer
        question: oneData.variable, // libellé de la question -> description_question selon nomenclature
        answer: selectedAnswer, // libellé de la réponse -> reprendre le @variable_question
      });
    }

    setData((prev) => ({ ...prev, [oneData.variable]: selectedAnswer }));

    // Ajout d'un délai pour passer à la question suivante
    setTimeout(() => {
      //Modification du parcours du formulaire à la question qui souhaitez vous assurer
      // => Faire un if
      setIdQuestion((prev) => prev + 1);
      setIsDisabled(false);
      setError("");
    }, 500);
  };

  const styleAnswer = `bg-[var(--bg-answer)] hover:scale-105 
  shadow-answer font-semibold transition-all duration-300 ease-in-out  
  text-[var(--color-answer)] border-2 border-[var(--border-answer)]  
  rounded-[var(--rounded-answer)] hover:border-2 hover:border-[var(--border-answer-hover)] 
  hover:text-[var(--color-answer-hover)] hover:bg-[var(--bg-answer-hover)]`;

  return (
    <div className="flex flex-col items-center pb-4 lg:px-24 px-12">
      {/* La question */}
      <div className="py-2 mt-8 mb-6  ">
        <h3 className=" text-[var(--color-question)] font-[var(--weight-question)] text-xl lg:text-2xl">
          {" "}
          {oneData.question}
        </h3>
      </div>

      {/* Les réponses */}
      <input
        type="range"
        min={0}
        max="100"
        value={valueSlider}
        onChange={(e) => setValueSlider(e.target.value)}
        className="range w-[300px]"
        step="50"
      />
      <div className=" w-[300px] flex justify-between text-xs px-2 ">
        {oneData.reponses.map((answer, index) => (
          <span key={`${answer.id}+${oneData.id}}+${index}`}>|</span>
        ))}
      </div>
      <p className=" font-extrabold text-lg py-8">{selectedAnswer}</p>
      {/* Messages d'erreur */}
      <div>
        <button
          className="bg-[#438ABF] text-white px-20 py-3 text-2xl rounded-md"
          onClick={handleClick}
        >
          CONTINUER
        </button>
      </div>
      <p className="flex items-center py-1 text-xs font-bold text-red-500 ">
        {error !== "" && <ExclamationTriangleIcon className="w-4 h-4 " />}
        {error}
      </p>
    </div>
  );
};
