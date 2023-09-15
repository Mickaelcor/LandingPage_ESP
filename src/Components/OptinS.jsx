import { HandThumbUpIcon } from "@heroicons/react/24/outline";
import React, { useState, useEffect } from "react";

export const OptinS = ({ infoClient, prenom }) => {
  // mettre en majuscule seulement la première lettre pour le prenom props

  return (
    <div className=" flex flex-col items-center">
      {/* Message */}
      <p className=" text-[#333366] pt-4 pb-6 lg:pt-6 font-black text-[20px] text-center">
        Será contactado(a) rapidamente por nuestro socio EDENRED que responderá
        a sus necesidades ✅
      </p>
      {/* Logo */}
      <img
        src={infoClient.image}
        alt={infoClient.name}
        className="py-0 lg:w-40"
      />

      <p className=" text-[#333366] flex font-medium py-4 lg:py-8 mx-6 text-center items-center text-base lg:text-[21px]">
        Estas son algunas de las ventajas de sus soluciones:
      </p>
      <div className="flex flex-col lg:flex-row gap-6 lg:gap-10 items-center justify-center text-[#333366] text-xs lg:text-sm font-extrabold">
        <div className="flex flex-col items-center">
          <img
            src="http://lunchcardsolutions.com/img_Cobee/Optin1.png"
            className="w-16 pb-1 lg:pb-6"
            alt="Chat logo"
          />
          <p>AUMENTE SU</p>
          <p>PRODUCTIVIDAD</p>
        </div>
        <div className="flex flex-col items-center">
          <img
            src="http://lunchcardsolutions.com/img_Cobee/Optin2.png"
            className="w-16 pb-1 lg:pb-6"
            alt="Seller logo"
          />
          <p>RECOGIDA SENCILLA,</p>
          <p>RÁPIDA Y SEGURA</p>
        </div>
        <div className="flex flex-col items-center">
          <img
            src="http://lunchcardsolutions.com/img_Cobee/Optin3.png"
            className="w-16 pb-1 lg:pb-6"
            alt="Customer logo"
          />
          <p>EFECTIVO</p>
          <p>FÁCIL USAR</p>
        </div>
      </div>
    </div>
  );
};
