import React, { useState } from "react";
import { dataText } from "../../data/dataText";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import Input from "react-phone-number-input/input";

import {
  ExclamationTriangleIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/solid";

export const FormContactZ = ({
  oneData,
  setIdQuestion,
  setData,
  lengthForm,
  fakeNumbers,
}) => {
  const [email, setEmail] = useState("");
  // const [zipcode, setZipcode] = useState("");

  // On utilise un state pour le numéro de téléphone et un autre pour l'affichage
  const [phone, setPhone] = useState("");
  const [zipcode, setZipcode] = useState("");

  //State pour les erreurs
  const [errorEmail, setErrorEmail] = useState("");
  const [errorZipcode, setErrorZipcode] = useState("");
  const [errorPhone, setErrorPhone] = useState("");
  const [errorCGU, setErrorCGU] = useState("");

  const [checkbox, setCheckbox] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);

  const isFakeNumber = (phone) => {
    for (const fakeNumber of fakeNumbers) {
      if (phone.includes(fakeNumber)) {
        return true;
      }
    }
    return false; // Renvoie false si aucun faux numéro n'est trouvé
  };

  // Une fonction qui permet de vérifier si un numero de téléphone est valide
  const isPhoneValid = (phone) => {
    const regex = /^(\+33|0033|0)(6|7|9)\d{8}$/;
    return regex.test(phone);
  };
  // Une fonction qui permet de vérifier si un email est valide

  const isValidZipcode = (zipcode) => {
    const regex = new RegExp("^[0-9]{5}$");
    return regex.test(zipcode);
  };

  const setErrors = () => {
    if (!isPhoneValid(phone)) {
      setErrorPhone(dataText.errPhone);
    } else {
      setErrorPhone("");
    }

    if (isFakeNumber(phone)) {
      setErrorPhone(dataText.errPhone);
    }

    if (!checkbox) {
      setErrorCGU(dataText.errCGU);
    } else {
      setErrorCGU("");
    }

    if (!isValidZipcode(zipcode)) {
      setErrorZipcode(dataText.errZipcode);
    } else {
      setErrorZipcode("");
    }

    if (!checkbox) {
      setErrorCGU(dataText.errCGU);
    } else {
      setErrorCGU("");
    }
  };

  // Une fonction qui permet de formater le numéro de téléphone
  const handleClick = (e) => {
    e.preventDefault();
    setErrors();
    if (
      isValidZipcode(zipcode) &&
      isPhoneValid(phone) &&
      !isFakeNumber(phone)
    ) {
      fetch(`https://api-adresse.data.gouv.fr/search/?q=${zipcode}`)
        .then((response) => response.json())
        .then((data) => {
          if (data.features.length === 0) {
            setErrorZipcode("Code postal invalide");
          } else {
            setData((prev) => ({
              ...prev,
              ["email"]: email,
            }));
            setData((prev) => ({
              ...prev,
              ["telephone"]: phone,
            }));
            setData((prev) => ({
              ...prev,
              ["code_postal"]: zipcode,
            }));
            if (checkbox) {
              setIdQuestion((prev) => prev + 1);
              window.dataLayer.push({
                event: "question_answered", // libellé de l'event -> Ne Pas Changer
                question: "code_postal_tel_mail_cgu", // libellé de la question -> description_question selon nomenclature
                answer: "", // libellé de la réponse -> reprendre le @variable_question
              });
            } else {
              setErrorCGU("Veuillez accepter les CGU");
            }
          }
        });
      // Reset des erreurs
      setErrorEmail("");
      setErrorZipcode("");
      setErrorPhone("");
      setErrorCGU("");
    }
  };

  const OnChangeCheckbox = (e) => {
    setCheckbox(e.target.checked);
    if (e.target.checked) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  };

  const styleCGU = {
    textDecoration: "underline",
    cursor: "pointer",
  };

  return (
    <div className="flex flex-col pb-8 ">
      <div className=" px-1 lg:px-8 py-2 mt-4 ">
        <h3 className=" text-[var(--color-question)] text-left font-primary font-[var(--weight-question)] text-base md:text-xl">
          {" "}
          {oneData.question}
        </h3>
      </div>

      <div className="py-2 pt-4">
        <form onSubmit={handleClick}>
          <div className="flex items-center border-2 !bg-white rounded-md ">
            <input
              name="code_postal"
              required
              type="number"
              value={zipcode}
              onChange={(e) => setZipcode(e.target.value)}
              placeholder={dataText.zipcode}
              className="p-3 w-full rounded-md"
            />
          </div>
          <p className=" text-error flex text-xs items-center  py-1 pb-4">
            {errorZipcode !== "" && (
              <ExclamationTriangleIcon className="h-5 w-5 " />
            )}
            {errorZipcode}
          </p>
          {/* <p className="font-light text-white">Téléphone</p> */}
          <div className="flex items-center ">
            <Input
              defaultCountry="FR"
              placeholder={dataText.phone}
              value={phone}
              onChange={setPhone}
              required
              className="p-3 w-full  text-black border-2  !bg-[var(--bg-answer)] rounded-[var(--rounded-answer)]"
            />
          </div>
          <p className=" text-error flex text-xs items-center py-1 pb-4">
            {errorPhone !== "" && (
              <ExclamationTriangleIcon className="h-4 w-4 " />
            )}
            {errorPhone}
          </p>
          {/* <p className="font-light text-white">E-mail</p> */}
          <div className="flex items-center border-2 !bg-white rounded-md ">
            <input
              required
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={dataText.email}
              className="p-3 w-full rounded-md"
            />
          </div>
          <p className=" text-error flex text-xs items-center  py-1">
            {errorEmail !== "" && (
              <ExclamationTriangleIcon className="h-4 w-4 " />
            )}
            {errorEmail}
          </p>
          <label className="cursor-pointer flex items-start  pt-4">
            <input
              type="checkbox"
              value={checkbox}
              onChange={OnChangeCheckbox}
              className="mr-2 mt-2 checkbox checkbox-md checkbox-primary bg-white"
              required
            />
            <div className="leading-4 text-[10px] text-black">
              En cliquant sur "Recevoir mon offre personnalisée", j’accepte que
              mes informations personnelles soient transmises à Social Assur et
              un de ses partenaires à des fins de prospection commerciale
              téléphonique pour une Assurance de prêt conformément aux{" "}
              <a
                className=" text-blue-800 font-bold"
                href="https://social-assur.com/fr/cgu.html"
                target="_blank"
              >
                conditions générales d'utilisations.{" "}
              </a>
            </div>
          </label>
          <p className=" text-error flex text-xs items-center font-bold py-1">
            {errorCGU !== "" && (
              <ExclamationTriangleIcon className="h-4 w-4 " />
            )}
            {errorCGU}
          </p>
          <div className="py-4 flex justify-center">
            <button
              className=" bg-[var(--bg-button)] border-none rounded-[var(--rounded-button)] py-2 w-[90%] font-bold text-white text-xl hover:bg-[#34AF1F]"
              type="submit"
            >
              {dataText.discover}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
