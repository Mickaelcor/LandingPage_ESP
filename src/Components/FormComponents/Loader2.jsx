import React from "react";
import { dataText } from "../../data/dataText";

export const Loader2 = ({ setIdQuestion }) => {
  // Passer à la question suivante après 1.5s avec un useEffect
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIdQuestion((prev) => prev + 1);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center py-4 lg:px-24 px-12">
      <p className=" font-extrabold text-xl lg:text-2xl text-[#64B65F] pt-16 pb-8 lg:pt-20 lg:pb-11">
        Nous avons besoin de plus d’informations, 30 secondes top chrono{" "}
      </p>
      <span className="loader2 mb-24"></span>
    </div>
  );
};
