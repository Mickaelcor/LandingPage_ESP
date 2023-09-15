import { useState } from "react";
//Components and data
import { Form } from "./Components/Form";
import { dataQuestion } from "./data/dataQuestion";

//Icons
import { ShieldCheckIcon, ChevronRightIcon } from "@heroicons/react/24/solid";

function App() {
  const [isPassFirstQuestion, setIsPassFirstQuestion] = useState(false);
  const [selectedAnswer1, setSelectedAnswer1] = useState("");
  return (
    <div>
      {isPassFirstQuestion ? (
        <Form selectedAnswer1={selectedAnswer1} />
      ) : (
        <FormWelcome
          setIsPassFirstQuestion={setIsPassFirstQuestion}
          selectedAnswer1={selectedAnswer1}
          setSelectedAnswer1={setSelectedAnswer1}
        />
      )}
      <Footer />
    </div>
  );
}

export default App;

const FormWelcome = ({
  setIsPassFirstQuestion,
  selectedAnswer1,
  setSelectedAnswer1,
}) => {
  const oneData = dataQuestion[0];

  const [isDisabled, setIsDisabled] = useState(false);

  const handleClick = (answer) => {
    setSelectedAnswer1(answer.label);
    setIsDisabled(true);

    // useefect event welcome message view

    if (oneData?.welcomeMessage) {
      window.dataLayer.push({
        event: "welcome_message_answered",
        question: oneData.variable, // libellé de la question -> description_question selon nomenclature
        answer: answer.label, // libellé de la réponse -> reprendre le @variable_question
      });
    } else {
      window.dataLayer.push({
        event: "question_answered", // libellé de l'event -> Ne Pas Changer
        question: oneData.variable, // libellé de la question -> description_question selon nomenclature
        answer: answer.label, // libellé de la réponse -> reprendre le @variable_question
      });
    }

    setTimeout(() => {
      setIsPassFirstQuestion(true);
    }, 500);
  };

  const styleAnswer = `bg-[var(--bg-answer)] hover:scale-105 
  shadow-answer font-semibold transition-all duration-300 ease-in-out  
  text-[var(--color-answer)] border-2 border-[var(--border-answer)]  
  rounded-[var(--rounded-answer)] hover:border-2 hover:border-[var(--border-answer-hover)] 
  hover:text-[var(--color-answer-hover)] hover:bg-[var(--bg-answer-hover)]`;

  return (
    <div>
      <div className="bg-gradient-to-tl from-[#004484] to-[#008474]">
        <div className="font-bold text-[10px] md:text-[16px] flex text-white items-center justify-between mx-auto">
          <div className="flex items-center gap-1 lg:gap-2 ml-4 lg:mx-8 pt-4">
            <img
              src="http://lunchcardsolutions.com/imgITA_EM/LogoFooterWhite.svg"
              alt="buoni pasto logo"
              className="w-[100px] lg:w-[150px] ml-2"
            />
          </div>
          {/* Logo */}
          <div className="flex gap-1 mr-2 items-center lg:mx-8 pt-4">
            <ShieldCheckIcon className=" md:h-6 md:w-6 h-5 w-5 " />
            <p>Formulario seguro</p>
          </div>
        </div>
        {/* partie avec bg bleu */}
        <div className="flex flex-col items-center justify-between min-h-[85vh]">
          <div className=" mx-auto flex flex-col items-center gap-4 lg:gap-8 pt-5 lg:pt-[10px]">
            <h1 className="w-[260px] h-[70px] lg:w-[300px] lg:h-[70px] py-4 lg:py-3 font-extrabold text-[26px] text-white lg:text-[30px] lg:leading-normal text-center mx-2 bg-[#C60278] rounded-[20px] border shadowTitle border-black">
              Ticket Restaurant :
            </h1>
            <h2 className=" font-extrabold leading-[30px] text-white text-opacity-90 text-center px-6 lg:px-0 pt-2 lg:pt-0 text-[26px] lg:text-[30px]">
              Encuentra la mejor oferta para tu empresa
            </h2>
          </div>

          {/* FIRST QUESTION */}
          <div className="bg-white rounded-[30px] my-6 px-2 pb-6 mx-auto shadow-wrap max-w-[95%] min-w-[95%] md:min-w-[700px] lg:min-w-[650px] lg:max-w-[650px] lg:min-h-[35rem]">
            {/* Question */}
            <Form />
          </div>
          {/* Les icones*/}
          <div className="flex flex-col justify-center items-center">
            <p className="text-center text-white text-xl lg:text-2xl font-medium pb-2"> En colaboración con:</p>
            <img src="http://ticketrestaurantpro.com/imgFRA_EM/Edenred.png" className="w-24 pb-4" alt="edenred logo" />
            <p className="text-center text-white text-xl lg:text-2xl py-4 px-6 font-semibold">HOY MÁS QUE NUNCA, MOTIVA Y ATRAE TALENTO</p>
            <div className="pb-6 text-white text-center mx-12 text-xl lg:text-2xl font-semibold">
              <p>La ayuda de comida que todos quieren tener: <br /> distínguete y motiva a tu plantilla</p>
            </div>
          </div>
        </div>
        {/* partie avec bg gris */}
        <div className="lg:min-h-[25vh] min-h-[10vh] bg-vide">
          <div>
            <p className="text-center text-black text-xl lg:text-2xl px-6 font-bold pt-4">Obtén un presupuesto gratuito en 3 sencillos pasos y en sólo 60 segundos.</p>
          </div>
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-20 items-center lg:items-baseline justify-center py-6 lg:py-10 text-black text-base font-bold">
            <div className="flex flex-col items-center">
              <img src="http://ticketrestaurantpro.com/imgFRA_EM/Chat.png" alt="Chat logo" />
              <p>1.Rellenar el</p>
              <p>formulario</p>
            </div>
            <div className="flex flex-col items-center">
              <img src="http://ticketrestaurantpro.com/imgFRA_EM/Seller.png" className="pb-3" alt="Seller logo" />
              <p>2. Aparece su</p>
              <p>resultado</p>
            </div>
            <div className="flex flex-col items-center">
              <img src="http://ticketrestaurantpro.com/imgFRA_EM/Customer.png" className="pb-2" alt="Customer logo" />
              <p>3. Llamada gratuita</p>
              <p>y sin compromiso</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Footer = () => {
  return (
    <footer className="flex bg-[#000000] flex-wrap text-[10px] lg:text-sm text-[#717171] font-light gap-4 justify-center py-2 lg:py-6">
      <div className="flex items-center justify-center">
        <img className="w-[25%] lg:w-[10%]" src="http://lunchcardsolutions.com/imgITA_EM/LogoFooterWhite.svg" alt="" />
      </div>
      <p>
        <a
          className="hover:underline"
          target={"_blank"}
          href="http://betweencompanies.com/en/mentions-legales.html"
        >
          Información legal
        </a>
      </p>
      <p>
        <a
          className="hover:underline"
          target={"_blank"}
          href="https://betweencompanies.com/en/cgu.html"
        >
          Condiciones de uso
        </a>
      </p>
      <p>
        <a
          className="hover:underline"
          target={"_blank"}
          href="https://betweencompanies.com/en/cookies.html"
        >
          Política de gestión de cookies
        </a>
      </p>
      <p>
        <a
          target={"_blank"}
          className="hover:underline"
          href="https://betweencompanies.com/en/donnees-personnelles.html"
        >
          Política de privacidad y protección de datos
        </a>
      </p>
    </footer>
  );
};
