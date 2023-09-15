import React from "react";
import { useEffect, useState, useRef } from "react";
import {
    ExclamationTriangleIcon,
    ChevronRightIcon,
} from "@heroicons/react/24/solid";
import { dataText } from "../../data/dataText";

export const FormChoixListe = ({
    oneData,
    setIdQuestion,
    setData,
    idQuestion,
    setIsStop,
}) => {
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [isDisabled, setIsDisabled] = useState(false);

    const [error, setError] = useState("");

    const onClickBtn = () => {
        setError("Seleccione una respuesta");
    };
    const renderCount = useRef(0);

    const scrollToForm = () => {
        const formElement = document.getElementById("form");
        formElement.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    // const pour retourner à la question précédente et afficher la précédente réponse
    const onClickBack = () => {
        setIdQuestion((prev) => prev - 1);
        scrollToForm();
    };

    // const pour cacher le bouton retour si on est à la première question
    const isBackHidden = idQuestion === 1;

    const handleClick = (answer) => {
        // Condition to stop the form
        if (idQuestion === 2) {
            if (answer.label === "Quiere unirse a nuestra red") {
                setIsStop(true);
            }
            //} else if (idQuestion === 2) {
            //if (answer.label === "SI") {
            // setEstStop(true);
            //}
        }
        setError("");
        setIsDisabled(true);

        if (oneData?.welcomeMessage) {
            window.dataLayer.push({
                event: "welcome_message_answered",
                question: oneData.variable, // libellé de la question -> description_question selon nomenclature
                answer: answer.label, // libellé de la réponse -> reprendre le @variable_question
            });
        } else {
            window.dataLayer.push({
                event: "question_answered", // libellé de l'event -> Ne Pas Changer
                question: oneData.variable, // libellé de la question -> description_question selon nomenclature
                answer: answer.label, // libellé de la réponse -> reprendre le @variable_question
            });
        }

        setData((prev) => ({ ...prev, [oneData.variable]: answer.label }));

        // Ajout d'un délai pour passer à la question suivante
        setTimeout(() => {
            //Modification du parcours du formulaire à la question qui souhaitez vous assurer
            // => Faire un if
            setIdQuestion((prev) => prev + 1);
            setIsDisabled(false);
            setError("");
            scrollToForm();
        }, 500);
    };

    const styleAnswer = `bg-[var(--bg-answer)] hover:scale-105 
  shadow-answer font-semibold transition-all duration-300 ease-in-out  
  text-[var(--color-answer)]  
hover:border-[var(--border-answer-hover)] 
  hover:text-[var(--color-answer-hover)] hover:bg-[var(--bg-answer-hover)]`;

    //Crez moi un state qui m'indique quznd j'suis en mode hover sur un des boutons dans oneData.reponses

    const [isHover, setIsHover] = useState({});

    const handleHover = (index) => {
        setIsHover((prev) => (
            { ...prev, [index]: true }
        ));
    };

    const handleHoverOut = (index) => {
        setIsHover((prev) => (
            { ...prev, [index]: false }
        ));
    };


    return (
        <div className="flex flex-col items-center">
            {/* La question */}
            <div id="form" className="py-2 mt-2 mb-2 lg:py-4">
                <h3 className="mx-4 text-[var(--color-question)] font-[var(--weight-question)] text-xl lg:text-2xl">
                    {" "}
                    {oneData.question}
                </h3>
            </div>

            {/* Les reponses */}
            <div className="grid grid-row-6 w-[90%] lg:w-[85%] lg:grid-row-6 gap-4 pb-10 lg:pb-10 lg:mx-2">
                {oneData.reponses.map((answer, index) => (
                    <button
                        key={`${answer.id}+${oneData.id}}+${index}`}
                        onMouseOver={() => handleHover(index)}
                        onMouseOut={() => handleHoverOut(index)}

                        onClick={() => {
                            handleClick(answer);
                        }}
                        className={` ${styleAnswer} flex items-center justify-between shadow border rounded lg:border-2 border-[#4689C2] lg:border-black bg-white ${isDisabled
                            ? " opacity-70 cursor-not-allowed "
                            : ""
                            }`}
                        disabled={isDisabled}
                    >
                        <div className="flex w-full text-black leading-none font-extrabold h-[60px] lg:h-12 lg:text-[16px] gap-2 lg:gap-0 lg:flex-col justify-center items-center px-2 lg:px-6 mx-auto py-3 lg:py-2 hover:text-white">
                            {answer?.image && (
                                <img
                                    className="max-lg:w-10 lg:p-3"
                                    src={answer.image}
                                    alt={answer.alt}
                                />
                            )}
                            {answer?.image2 && (
                                <img
                                    className="max-lg:w-10 lg:p-3"
                                    src={isHover[index] ? answer.image2 : answer.image1}
                                    alt={answer.alt}
                                />
                            )}
                            {answer.label}
                        </div>
                    </button>
                ))}
            </div>
            {/* Chrono et message */}
            <div className="flex flex-row text-black gap-2 justify-center items-center py-1 text-[14px] font-extrabold">
                <img src="http://betweencompanies.com/VEH/img_ita/ChronoForm.svg" alt="chrono" />
                <p>{oneData.chrono}</p>
            </div>
            {/* Messages d'erreur */}
            <p className="flex items-center py-2 text-base font-bold text-red-500 ">
                {error !== "" && <ExclamationTriangleIcon className="w-4 h-4 " />}
                {error}
            </p>
            {/* Bouton */}
            <div className="flex justify-center">
                <button
                    className="btn bg-[#000072] border-none rounded-[var(--rounded-button)] py-0 w-[200%] lg:w-[250%] h-12 font-bold text-white text-base lg:text-xl hover:bg-[#C60278]"
                    onClick={onClickBtn}
                >
                    {oneData?.cta ? oneData.cta : "Continuar"}
                </button>
            </div>
            {/* Bouton Retour */}
            <div className=" flex font-bold text-black text-xs lg:text-lg pt-8 lg:pt-16 gap-2 w-full pl-4 " >
                <img hidden={isBackHidden} onClick={onClickBack} className=" cursor-pointer w-8 lg:w-14" src="http://ticketrestaurantpro.com/imgFRA_EM/LogoRetour.png" alt="" />
                <button hidden={isBackHidden} onClick={onClickBack} className="hover:underline">
                    {'Atrás'}
                </button>
            </div>
        </div>
    );
};
