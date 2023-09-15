import React, { useState } from "react";
import { dataText } from "../../data/dataText";
import "react-phone-number-input/style.css";
import Input from "react-phone-number-input/input";
//import de la librairie pour les numéros de téléphone
import {
  isValidPhoneNumber,
  parsePhoneNumber,
  parsePhoneNumberFromString,
} from "libphonenumber-js/max";

import {
  ExclamationTriangleIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/solid";

export const FormContact = ({
  oneData,
  setIdQuestion,
  setData,
  idQuestion,
  lengthForm,
  fakeNumbers,
  data,
}) => {
  const [email, setEmail] = useState("");
  // const [zipcode, setZipcode] = useState("");

  // On utilise un state pour le numéro de téléphone et un autre pour l'affichage
  const [phone, setPhone] = useState("");

  //State pour les erreurs
  const [errorEmail, setErrorEmail] = useState("");
  // const [errorZipcode, setErrorZipcode] = useState("");
  const [errorPhone, setErrorPhone] = useState("");
  const [errorCGU, setErrorCGU] = useState("");

  const [isDisabled, setIsDisabled] = useState(true);

  const lang = "ES";

  const scrollToForm = () => {
    const formElement = document.getElementById("form");
    formElement.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // const pour retourner à la question précédente et afficher la précédente réponse
  const onClickBack = () => {
    setIdQuestion((prev) => prev - 1);
    scrollToForm();
  };

  // Fonction pour masquer le bouton de retour s'il s'agit de la première question
  const isBackHidden = idQuestion === 1;

  // lutilisateur doit rentrer son numero de telephone et on a une liste de faux numero mais sans le 2 premier chiffre peux tu me faire une fonction pour check
  const isFakeNumber = (phone) => {
    for (const fakeNumber of fakeNumbers) {
      if (phone.includes(fakeNumber)) {
        return true;
      }
    }
    return false; // Renvoie false si aucun faux numéro n'est trouvé
  };

  const setErrors = () => {
    if (!validationPhone(phone)) {
      setErrorPhone(dataText.errPhone);
    } else {
      setErrorPhone("");
    }

    if (isFakeNumber(phone)) {
      setErrorPhone(dataText.errPhone);
    }

  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors();
    if (
      validationPhone(phone)) {
      setData((prev) => ({
        ...prev,
        ["email"]: email,
      }));
      setData((prev) => ({
        ...prev,
        ["telephone"]: phone,
      }));
      setIdQuestion((prev) => prev + 1);

      // Push des données dans le dataLayer
      window.dataLayer.push({
        event: "question_answered", // libellé de l'event -> Ne Pas Changer
        question: "tel_mail_cgu", // libellé de la question -> description_question selon nomenclature
        answer: "", // libellé de la réponse -> reprendre le @variable_question
      });

      // Reset des erreurs
      setErrorEmail("");
      setErrorPhone("");
    }
  };

  const validationPhone = (phone) => {
    const phoneNumber = phone && parsePhoneNumberFromString(phone, lang);
    if (
      phone &&
      phoneNumber?.isValid() &&
      phoneNumber?.country === lang &&
      !isFakeNumber(phone)
    ) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <div className="flex flex-col items-center">
      {/* QUESTION */}
      <div id="form" className=" px-4 py-2 mt-2 pb-2 lg:pb-6 ">
        <h3 className=" text-[var(--color-question)] font-[var(--weight-question)] text-xl lg:text-2xl">
          {oneData.question}
        </h3>
      </div>

      {/* LES INPUTS */}
      <div className="py-2 pt-4 w-[90%] mx-auto">
        <form onSubmit={handleSubmit}>
          <div>
            <label className="text-[#1C316B] flex pb-2 text-[18px] lg:text-[22px] font-extrabold">
              {dataText.labelPhone}
            </label>

            <div className="flex items-center border lg:border-2 lg:border-black border-[#4689C2] !bg-white rounded inputPhone ">
              <Input
                defaultCountry={lang}
                placeholder={dataText.phone}
                value={phone}
                name="phone"
                onChange={setPhone}
                required
                onFocus={(event) =>
                  (event.target.placeholder = "Introduzca su número de teléfono")
                }
                onBlur={(event) => (event.target.placeholder = "ej: 666 XX XX XX")}
                className="p-3 w-full rounded"
              />
            </div>
          </div>

          <p className="flex items-center py-1 pb-4 text-base font-bold text-red-500 ">
            {errorPhone !== "" && (
              <ExclamationTriangleIcon className="w-4 h-4 " />
            )}
            {errorPhone}
          </p>

          <div>
            <label className="text-[#1C316B] flex pb-2 text-[18px] lg:text-[22px] font-extrabold">
              {dataText.labelEmail}
            </label>
            <div className="flex items-center border lg:border-2 lg:border-black border-[#4689C2] !bg-white rounded inputMail ">
              <input
                name="email"
                required
                type="email"
                placeholder="ej: ejemplo@mail.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                onFocus={(event) =>
                  (event.target.placeholder = "Introduzca su dirección de correo electrónico")
                }
                onBlur={(event) => (event.target.placeholder = "ej: ejemplo@mail.com")}
                className="p-3 w-full rounded"
              />
            </div>
          </div>
          {/* Chrono et message */}
          <div className="flex flex-row text-black gap-2 justify-center items-center py-4 pt-8 text-[14px] font-extrabold">
            <img src="http://betweencompanies.com/VEH/img_ita/ChronoForm.svg" alt="chrono" />
            <p>{oneData.chrono}</p>
          </div>
          {/* Message */}
          <div className=" font-normal text-[10px] text-[#818181] pb-6">
            <p>
              Al hacer clic en "Obtener un presupuesto gratuito",
              acepta que uno de nuestros operadores asociados se ponga en contacto con usted por correo electrónico,
              teléfono y/o SMS para responder a sus preguntas sobre la oferta,
              de conformidad con nuestras condiciones generales y nuestra política de confidencialidad.
            </p>
          </div>
          {/* Bouton */}
          <div className="flex justify-center">
            <button
              className="btn bg-[#000072] border-none rounded-[var(--rounded-button)] py-0 w-[100%] lg:w-[80%] h-12 font-bold text-white text-base lg:text-xl hover:bg-[#C60278]"
              type="submit"
            >
              {oneData?.cta ? oneData.cta : "OBTENER UN PRESUPUESTO GRATUITO"}
            </button>
          </div>
          {/* Bouton Retour */}
          <div className=" flex font-bold text-black text-xs lg:text-lg pt-8 lg:pt-12 gap-2 w-full" >
            <img onClick={onClickBack} className=" cursor-pointer w-8 lg:w-14" src="http://ticketrestaurantpro.com/imgFRA_EM/LogoRetour.png" alt="" />
            <button onClick={onClickBack} className="hover:underline">
              {'Atrás'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
