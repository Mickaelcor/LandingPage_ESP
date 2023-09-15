import React, { useEffect, useRef } from "react";
import { dataQuestion } from "../data/dataQuestion.jsx";

export const NoOffer = ({ idQuestion, setIdQuestion, setEstStop }) => {
  // const pour retourner à la question précédente et afficher la précédente réponse
  const onClickBack = () => {
    setEstStop(false);
    setIdQuestion((prev) => prev - 1);
    window.scrollTo(0, 150);
  };

  // scroller vers le haut de la page
  useEffect(() => {
    window.scrollTo({
      top: 150,
      behavior: "smooth",
    });
  }, []);

  return (
    <div className="lg:my-2 lg:mx-10">
      <div className=" pt-6 text-center text-[#1C316B] font-bold ">
        <div className="flex flex-col justify-center items-center gap-6 lg:my-10">
          <img src="http://ticketrestaurantpro.com/imgFRA/SmileySad.svg" alt="smiley sad" className="w-20 lg:w-40" />
          <span >
            Lo sentimos, pero no creemos que tu perfil sea compatible con las ofertas que ofrecemos.
          </span>
          <span>
            Gracias por darnos una parte de su valioso tiempo, le deseamos un buen día. 👋
          </span>
        </div>
        {/* Bouton Retour */}
        <div className=" flex font-bold text-black text-xs lg:text-lg pt-8 lg:pt-16 gap-2 w-full pl-4 hover:underline" >
          <img onClick={onClickBack} className=" cursor-pointer w-8 lg:w-14" src="http://ticketrestaurantpro.com/imgFRA_EM/LogoRetour.png" alt="" />
          <button onClick={onClickBack}>
            {'Atrás'}
          </button>
        </div>
      </div>
    </div>
  );
};