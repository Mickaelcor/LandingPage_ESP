import React from "react";

export const ProgressBar = ({ idQuestion, nbQuestion }) => {
  const progress = parseInt((idQuestion / nbQuestion) * 100);

  return (
    <>
      <div className="-mb-5 lg:-mb-6 text-center z-10 text-[10px] lg:text-sm font-bold" style={{ color: progress >= 50 ? "#FFFFFF" : "#5A6163", }}>
        Progreso: {progress}%
      </div>
      <div className="rounded-[8px] bg-zinc-200 w-full">
        <div
          className="flex items-center justify-center rounded-[8px] p-[6px] lg:p-[2px] text-center text-[10px] lg:text-sm font-bold"
          style={{
            width: progress <= 20 ? `${progress + 10}%` : `${progress + 2}%`,
            height: "25px",
            maxWidth: "100%",
            transition: "width 0.4s ease-in-out",
            backgroundColor: progress >= 50 ? "#C60278" : "#C60278",
          }}
        >
        </div>
      </div></>
  );
};
