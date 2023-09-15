import React, { useState, useEffect } from "react";

// Import Icones
import {
  ExclamationTriangleIcon,
  PencilIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/solid";

// Import dataText
import { dataText } from "../../data/dataText";

export const FormName = ({ oneData, setIdQuestion, setData, idQuestion }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  //State Societe
  const [societe, setSociete] = useState("");
  const [errorSociete, setErrorSociete] = useState("");

  const scrollToForm = () => {
    const formElement = document.getElementById("form");
    formElement.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // const pour retourner à la question précédente et afficher la précédente réponse
  const onClickBack = () => {
    setIdQuestion((prev) => prev - 2);
    scrollToForm();
  };

  // Fonction pour masquer le bouton de retour s'il s'agit de la première question
  const isBackHidden = idQuestion === 1;

  const setErrors = () => {
    if (societe === "") {
      setErrorSociete("Veuillez renseigner le nom de votre société");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors();
    setData((prev) => ({ ...prev, ["prenom"]: firstName }));
    setData((prev) => ({ ...prev, ["nom"]: lastName }));
    setData((prev) => ({ ...prev, ["societe"]: societe }));
    setIdQuestion((prev) => prev + 1);
    scrollToForm();

    // Event GA
    window.dataLayer.push({
      event: "question_answered", // libellé de l'event -> Ne Pas Changer
      question: "nom_prenom", // libellé de la question -> description_question selon nomenclature
      answer: "", // libellé de la réponse -> reprendre le @variable_question
    });

    //Reset des erreurs 
    setErrorSociete("");
  };


  return (
    <div>
      <div className="flex flex-col items-center">
        <div id="form" className="mt-0">
          <h3 className=" text-[var(--color-question)] font-[var(--weight-question)] text-xl lg:text-2xl">
            {" "}
            {oneData.question}
          </h3>
        </div>

        <form
          autoComplete="on"
          className="flex flex-col gap-4 mt-4 w-[90%]"
          onSubmit={handleSubmit}
        >
          {/* INPUT 1 */}
          <div>
            <label className="text-[#1C316B] flex pb-2 text-[18px] lg:text-[22px] font-extrabold">
              {dataText.labelPrenom}
            </label>
            <div className="flex items-center border lg:border-2 lg:border-black border-[#4689C2] !bg-white rounded inputPrenom ">
              <input
                name="prenom"
                required
                type="text"
                placeholder={dataText.firstName}
                value={firstName}
                onChange={(e) => {
                  setFirstName(e.target.value);
                }}
                onFocus={(event) =>
                  (event.target.placeholder = "Introduzca su nombre")
                }
                onBlur={(event) => (event.target.placeholder = "ej : José")}
                className="p-3 w-full rounded "
              />
            </div>
          </div>

          {/* INPUT2 */}
          <div>
            <label className="text-[#1C316B] flex pb-2 text-[18px] lg:text-[22px] font-extrabold">
              {dataText.labelNom}
            </label>
            <div className="flex items-center border lg:border-2 lg:border-black border-[#4689C2] !bg-white rounded inputNom ">
              <input
                name="nom"
                required
                placeholder={dataText.lastName}
                type="text"
                value={lastName}
                onChange={(e) => {
                  setLastName(e.target.value);
                }}
                onFocus={(event) =>
                  (event.target.placeholder = "Introduzca su apellidos")
                }
                onBlur={(event) => (event.target.placeholder = "ej : Gómez Iglesias")}
                className="p-3 w-full rounded"
              />
            </div>
          </div>

          {/* INPUT3 */}
          <div>
            <label className="text-[#1C316B] flex pb-2 text-[18px] lg:text-[22px] font-extrabold">
              {dataText.labelSociete}
            </label>
            <div className="flex items-center border lg:border-2 lg:border-black border-[#4689C2] !bg-white rounded inputSociete ">
              <input
                name="societe"
                required
                placeholder={dataText.societe}
                type="text"
                value={societe}
                onChange={(e) => {
                  setSociete(e.target.value);
                }}
                onFocus={(event) =>
                  (event.target.placeholder = "Introduzca el nombre de su empresa")
                }
                onBlur={(event) => (event.target.placeholder = "ej : compañía")}
                className="p-3 w-full rounded"
              />
            </div>
            <p className=" text-red-500 flex text-base items-center font-bold py-1">
              {errorSociete !== "" && (
                <ExclamationTriangleIcon className="h-4 w-4 " />
              )}
              {errorSociete}
            </p>
          </div>

          {/* MESSAGE REASSURANCE */}
          <div className="flex gap-1 text-[#8A8A8A] p-2 text-[10px] lg:text-[11px] items-center bg-[#D1E9FF] h-14 w-[100%] justify-center rounded-[10px] ">
            <InformationCircleIcon className="w-12 lg:w-8" />
            Concedemos la máxima importancia a la protección y a la confidencialidad de tus datos personales.
            Nunca serán compartidos sin tu consentimiento.
          </div>
          {/* Chrono et message */}
          <div className="flex flex-row text-black gap-2 justify-center items-center py-4 text-[14px] font-extrabold">
            <img src="http://betweencompanies.com/VEH/img_ita/ChronoForm.svg" alt="chrono" />
            <p>{oneData.chrono}</p>
          </div>
          {/* Bouton */}
          <div className="flex justify-center">
            <button
              className="btn bg-[#000072] border-none rounded-[var(--rounded-button)] py-0 w-[100%] lg:w-[80%] h-12 font-bold text-white text-base lg:text-xl hover:bg-[#C60278]"
              type="submit"
            >
              {oneData?.cta ? oneData.cta : "Continuar"}
            </button>
          </div>
          {/* Bouton Retour */}
          <div className=" flex font-bold text-black text-xs lg:text-lg pt-8 lg:pt-4 gap-2 w-full pl-2 " >
            <img hidden={isBackHidden} onClick={onClickBack} className=" cursor-pointer w-8 lg:w-14" src="http://ticketrestaurantpro.com/imgFRA_EM/LogoRetour.png" alt="" />
            <button hidden={isBackHidden} onClick={onClickBack} className="hover:underline">
              {'Atrás'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
