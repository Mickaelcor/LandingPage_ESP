import React, { useState, useEffect } from "react";
import { Loader } from "./Loader.jsx";
import { dataText } from "../../data/dataText";
// Import Icones
import {
  ExclamationTriangleIcon,
  PencilIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/solid";

export const FormZipCode = ({ oneData, setIdQuestion, setData, idQuestion, }) => {
  const [zipcode, setZipcode] = useState("");
  const [errorZipcode, setErrorZipcode] = useState("");
  const [displayLoader, setDisplayLoader] = useState(false);
  const [displayForm, setDisplayForm] = useState(true);

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

  // Une fonction qui permet de vérifier si le code postal est valide
  const isValidZipcode = (zipcode) => {
    const regex = new RegExp("^[0-9]{5}$");
    return regex.test(zipcode);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isValidZipcode(zipcode)) {
      setErrorZipcode(dataText.errZipcode);
    } else {
      fetch(`https://api.zippopotam.us/es/${zipcode}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Código postal no encontrado");
          }
          // Mettre en pause l'exécution pour afficher le composant "Loader"
          setDisplayLoader(true);
          return response.json();
        })
        .then((data) => {
          if (data?.places?.length > 0) {
            const province = data.places[0].state;
            setData((prev) => ({ ...prev, ["code_postal"]: zipcode }));
            setIdQuestion((prev) => prev + 1);
            // Event GA
            window.dataLayer.push({
              event: "question_answered",
              question: "code_postal",
              answer: "",
            });
          }
          // Cacher le composant "Loader" et afficher à nouveau le formulaire
          setTimeout(() => {
            setDisplayLoader(false);
            setDisplayForm(true);
          }, 2000);
        })
        .catch((error) => {
          setErrorZipcode("Codice postale non valido"); // Afficher une erreur en cas d'échec de la requête
          setDisplayLoader(false);
          setDisplayForm(true);
        });
      scrollToForm();
      // Réinitialiser l'erreur
      setErrorZipcode("");
    }
  };

  return (
    <div>
      {displayForm && (
        <div className="flex flex-col items-center">
          <div id="form" className="pt-2 mt-2">
            <h3 className=" text-[var(--color-question)] font-[var(--weight-question)] text-xl lg:text-2xl">
              {" "}
              {oneData.question}
            </h3>
          </div>

          <form className="flex flex-col gap-1 w-[90%]" onSubmit={handleSubmit}>
            {/* INPUT 1 */}
            <div className="flex items-center border lg:border-2 lg:border-black border-[#4689C2] !bg-white rounded inputzc mt-8">
              <input
                name="code_postal"
                required
                type="number"
                inputMode="numeric"  // Ajoutez cet attribut pour forcer le clavier numérique sur mobile
                value={zipcode}
                onChange={(e) => setZipcode(e.target.value)}
                placeholder="ex : 28000 Madrid"
                onFocus={(event) =>
                  (event.target.placeholder = "Introduzca su código postal")
                }
                onBlur={(event) => (event.target.placeholder = "ex : 28000 Madrid")}
                className=" p-3 w-full rounded"
              />
            </div>
            <p className=" text-red-500 flex text-base items-center font-bold py-1">
              {errorZipcode !== "" && (
                <ExclamationTriangleIcon className="h-4 w-4 " />
              )}
              {errorZipcode}
            </p>
            {/* MESSAGE REASSURANCE */}
            <div className="flex gap-1 text-[#8A8A8A] p-2 text-[11px] items-center bg-[#D1E9FF] h-12 w-[100%] justify-center rounded-[10px] ">
              <InformationCircleIcon className="w-6" />
              Tu código postal nos permite identificar al proveedor ideal cerca de ti.
            </div>
            {/* Chrono et message */}
            <div className="flex flex-row text-black gap-2 justify-center items-center pt-8 text-[14px] font-extrabold">
              <img src="http://betweencompanies.com/VEH/img_ita/ChronoForm.svg" alt="chrono" />
              <p>{oneData.chrono}</p>
            </div>
            {/* Bouton */}
            <div className="flex justify-center pt-3">
              <button
                className="btn bg-[#000072] border-none rounded-[var(--rounded-button)] py-0 w-[100%] lg:w-[80%] h-12 font-bold text-white text-base lg:text-xl hover:bg-[#C60278]"
                type="submit"
              >
                {oneData?.cta ? oneData.cta : "Continuar"}
              </button>
            </div>
            {/* Bouton Retour */}
            <div className=" flex font-bold text-black text-xs lg:text-lg pt-8 lg:pt-24 gap-2 w-full" >
              <img hidden={isBackHidden} onClick={onClickBack} className=" cursor-pointer w-8 lg:w-14" src="http://ticketrestaurantpro.com/imgFRA_EM/LogoRetour.png" alt="" />
              <button hidden={isBackHidden} onClick={onClickBack} className="hover:underline">
                {'Atrás'}
              </button>
            </div>
          </form>
        </div>
      )}
      {displayLoader && <Loader />} {/* Render the Loader component when displayLoader is true */}
    </div>
  );
};
