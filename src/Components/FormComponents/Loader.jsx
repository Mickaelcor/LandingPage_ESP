import React from "react";

export const Loader = ({ setIdQuestion, setIsClickedBack, isClickedBack }) => {
  // Passer à la question suivante après 1.5s avec un useEffect
  React.useEffect(() => {
    const timer = setTimeout(() => {
      if (isClickedBack) {
        setIdQuestion((prev) => prev - 1);
      }
      else {
        setIdQuestion((prev) => prev + 1);
      }
    }, 4000);
    return () => clearTimeout(timer);
  }, []);
  ;

  return (
    <div className="flex flex-col items-center py-8 lg:py-8">
      <div className="px-8 pb-10">
        <p className=" text-[#1C316B] font-primary font-bold text-xl md:text-2xl text-center">
          Por favor, espere, ¡estamos buscando la mejor oferta que se ajuste perfectamente a sus criterios!
        </p>
      </div>
      <div className="flex items-center justify-center">
        <img className=" w-32 h-32 animate-spin" src="http://ticketrestaurantpro.com/imgFRA/Loader.png" alt="Loading icon" />

        <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
          Loading...
        </span>
      </div>
    </div>

  );
};
