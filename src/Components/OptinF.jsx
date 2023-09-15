import { PhoneArrowDownLeftIcon } from "@heroicons/react/24/solid";
import React, { useState, useEffect, useRef } from "react";
import { Share } from "./Share";
import { dataText, textOptin } from "../data/dataText";

export const OptinF = ({ infoClient, prenom, setIsOptin }) => {
  // mettre en majuscule seulement la première lettre pour le prenom props
  const [isClicked, setIsClicked] = useState(false);
  const renderCount = useRef(0);
  const handleClick = () => {
    setIsOptin(true);
    setIsClicked(true);
  };

  useEffect(() => {
    renderCount.current += 1;
    if (renderCount.current === 1) {
      window.dataLayer.push({
        event: "opt_in_view",
        opt_in_type: "opt_in_fort",
        client: infoClient?.source,
      });
    }
  }, []);

  return (
    <div>
      <div className="bg-white my-4 p-4 text-sm md:text-base  rounded-[10px] text-center ">
        <div className="flex flex-col items-center ">
          {/* Message */}
          <p className=" font-bold text-2xl lg:text-3xl">
            Merci {prenom.charAt(0).toUpperCase() + prenom.slice(1)}, d’avoir
            utilisé Club Fibre
          </p>
          <br />
          {/* Logo */}
          <img
            src={infoClient?.image}
            alt={infoClient?.nom}
            className="w-32 h-32 md:w-48 md:h-48 object-contain"
          />
          <p className="lg:px-16">
            <span className=" font-bold">{infoClient?.nom}</span> correspond
            parfaitement à votre profil. Vous allez pouvoir profiter des
            meilleures offres internet du moment.
          </p>
          {/* Liste à puces */}
          {/* <ul className="flex flex-col gap-1 px-2 py-4 text-xs text-left md:text-base list-disc">
            <li>{infoClient?.argument1}</li>
            <li>{infoClient?.argument2}</li>
            <li>{infoClient?.argument3}</li>
          </ul> */}
        </div>
      </div>
      {/* ######## */}
      {/* Bouton Recevoir mon offre */}
      {!isClicked && (
        <div className="flex justify-center py-4">
          <button
            id="buttonOptin"
            onClick={handleClick}
            className=" bg-[var(--bg-button)] border-none rounded-[var(--rounded-button)] p-4 font-bold text-white text-xl hover:bg-[#34AF1F]"
          >
            {dataText.confirmationOptinFort}
          </button>
        </div>
      )}
      {/* Message Telephone */}
      {isClicked && (
        <div className="flex flex-col items-center py-4">
          <div className="flex items-center">
            <PhoneArrowDownLeftIcon className="text-black inline-block w-7 h-7 mr-2" />
            <p className="font-bold text-[#59AE3C]">
              Un conseiller est disponible. <br /> Restez près de votre
              téléphone.
            </p>
          </div>
          {/* Boutons partages */}
          <div className=" mt-6 md:mt-9">
            <Share />
          </div>
        </div>
      )}
    </div>
  );
};
