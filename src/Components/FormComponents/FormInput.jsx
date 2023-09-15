import React, { useState, useEffect } from "react";
import { Loader } from "./Loader";
import { ExclamationTriangleIcon, PencilIcon } from "@heroicons/react/24/solid";
import { useContext } from "react";

export const FormInput = ({ oneData, setIdQuestion, setData, idQuestion, setIsClickedBack }) => {
    const [input, setInput] = useState("");
    const [error, setError] = useState("");

    const scrollToForm = () => {
        const formElement = document.getElementById("form");
        formElement.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    // const pour retourner à la question précédente et afficher la précédente réponse
    const onClickBack = () => {
        setIdQuestion((prev) => prev - 1);
        scrollToForm();
    };

    //useEffect(() => {
    //setIsClickedBack(false);
    //}, [])

    // const pour cacher le bouton retour si on est à la première question
    const isBackHidden = idQuestion === 1;

    const handleClick = (e) => {
        e.preventDefault();
        if (input === "") {
            setError("El campo no puede estar vacío");
        }
        if (input !== "") {
            setError("");
            setData((prev) => ({ ...prev, [oneData.variable]: input }));
            if (idQuestion === 1) {
                window.dataLayer.push({
                    event: "welcome_message_answered", // libellé de l'event -> Ne Pas Changer
                    question: oneData.variable, // libellé de la question -> description_question selon nomenclature
                    answer: "", // libellé de la réponse -> reprendre le @variable_question
                });
            } else {
                window.dataLayer.push({
                    event: "question_answered", // libellé de l'event -> Ne Pas Changer
                    question: oneData.variable, // libellé de la question -> description_question selon nomenclature
                    answer: "", // libellé de la réponse -> reprendre le @variable_question
                });
            }
            setInput("");
            setIdQuestion((prev) => prev + 1);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault(); // Empêcher le comportement par défaut du formulaire de se produire
        handleClick(e);
        // Reset des erreurs
        setError("");
    };

    return (
        <div>
            <div id="form" className="flex flex-col py-4">
                <h3 className=" text-[#1C316B] font-medium text-xl text-left py-2 ml-2 lg:py-6 md:text-2xl">
                    {" "}
                    {oneData.question}
                </h3>

                <form onSubmit={handleSubmit}>
                    {" "}
                    {/* Ajouter le gestionnaire d'événements onSubmit */}
                    <div className="my-4 px-1 flex items-center border-2 border-[var(--border-answer)] !bg-[var(--bg-answer)] rounded-[var(--rounded-answer)]">
                        <input
                            name="input"
                            required
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Ecrivez"
                            className="p-3 w-full text-black focus-visible:outline-none "
                        />
                    </div>
                    <p className=" text-red-500 flex text-xs items-center py-1 pb-4">
                        {error !== "" && <ExclamationTriangleIcon className="h-4 w-4 " />}
                        {error}
                    </p>
                </form>
                <div className="flex flex-row gap-2 justify-center items-center py-2 pb-6 text-[14px] text-black font-bold">
                    <img src="http://betweencompanies.com/VEH/img_ita/ChronoForm.svg" alt="chrono" />
                    <p>{oneData.chrono}</p>
                </div>
                <div className="pb-4 flex justify-center lg:pt-8">
                    <button
                        className="btn bg-[#1C316B] border-none rounded-[var(--rounded-button)] py-0 w-[95%] h-16 font-semibold text-white text-base lg:text-xl hover:bg-[#DEA74D]"
                        onClick={handleClick}
                    >
                        obtenir un devis gratuit
                    </button>
                </div>
                <div className=" text-black font-medium text-lg pt-4 lg:pt-16" >
                    <button hidden={isBackHidden} onClick={onClickBack}>
                        {'< Retour'}
                    </button>
                </div>
            </div>
        </div>
    );
};