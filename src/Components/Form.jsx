import React, { useEffect, useState, useRef } from "react";
import { clients } from "../data/client";

// Importer les chemins questions
import { dataQuestion } from "../data/dataQuestion";

// Form Component
import { FormChoixImage } from "./FormComponents/FormChoixImage";
import { FormChoixListe } from "./FormComponents/FormChoixListe.jsx";
import { FormChoix } from "./FormComponents/FormChoix.jsx";
import { FormContact } from "./FormComponents/FormContact";
import { FormName } from "./FormComponents/FormName";
import { FormZipCode } from "./FormComponents/FormZipCode";
import { FormInput } from "./FormComponents/FormInput";
import { Loader } from "./FormComponents/Loader";
import { Loader2 } from "./FormComponents/Loader2";
import { FormSlider } from "./FormComponents/FormSlider";

// Other Component
import { ProgressBar } from "./ProgressBar";
import { LeadKo } from "./FormComponents/FormLeadKo";
import { OptinS } from "./OptinS";
import { OptinF } from "./OptinF";
import { NoOffer } from "./NoOffer";

export const Form = ({ }) => {
  /* State pour stocker les données du formulaire
   et l'id de la question pour le suivi */
  const [data, setData] = useState(null);
  let dataToSend = {};
  const [idQuestion, setIdQuestion] = useState(1);
  const [isStop, setIsStop] = useState(false);
  const [estKo, setEstKo] = useState(false);
  const [stateForm, setStateForm] = useState("Offre");
  const [fakeNumbers, setFakeNumbers] = useState([]);

  // State pour savoir si la personne a eu l'optin (validé comme lead)
  const [isOptin, setIsOptin] = useState(false);
  const [typeOptin, setTypeOptin] = useState("simple");

  // State pour la Zapette
  // State pour les infos du client
  const [infoClient, setInfoClient] = useState({});

  //State pour le temps de chargement du deuxieme appel vers la Zapette
  const [isLoading, setIsLoading] = useState(false);

  //State pour le bouton retour et non affichage avec le loader
  const [isClickedBack, setIsClickedBack] = useState(false);

  const [typePub, setTypePub] = useState("");

  const estFini = idQuestion > dataQuestion.length;
  const typeQuestion = dataQuestion[idQuestion - 1]?.type;

  const queryParams = new URLSearchParams(window.location.search);
  const utm_source = queryParams.get("utm_source");
  const utm_medium = queryParams.get("utm_medium");
  const utm_campaign = queryParams.get("utm_campaign");
  const utm_content = queryParams.get("utm_content");
  const utm_angle = queryParams.get("utm_angle");
  const vertical = "ESP_B2B_RTK";
  const hipto_uid = window.hipto_uid;
  const canal = "hiptoform";
  const renderCount = useRef(0);
  let endpoint = "";
  const lang = "ESP";

  function checkCookieExists(cookieName) {
    var cookies = document.cookie.split(";");

    for (var i = 0; i < cookies.length; i++) {
      var cookie = cookies[i].trim();
      if (cookie.startsWith(cookieName + "=")) {
        return true;
        // Saban oublie pas de mettre true
      }
    }
    return false;
  }

  const getFakeNumbers = () => {
    var myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      `Bearer ${import.meta.env.VITE_REACT_API_KEY_AIRTABLE}`
    );
    //myHeaders.append("Cookie", "brw=brwK3kXT0YDC7rGND; AWSALB=zlsWeoKfGFbdZgMTRcnHYDky8aoZ1lCuH5UB/aN8dxQhn7ngQt8Y+Nq+jif3soPWEl53RHDphMCJT98q7cTeybwMWl612FEoc7rJqYTUYNZCvnWQtWMSXrc9XTQI; AWSALBCORS=zlsWeoKfGFbdZgMTRcnHYDky8aoZ1lCuH5UB/aN8dxQhn7ngQt8Y+Nq+jif3soPWEl53RHDphMCJT98q7cTeybwMWl612FEoc7rJqYTUYNZCvnWQtWMSXrc9XTQI");

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(
      `https://api.airtable.com/v0/appyARij9mpnKS0mV/${lang}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        // console.log(result.records[0].fields.phPhoneNumber);
        result.records.map((record) => {
          setFakeNumbers((oldArray) => [
            ...oldArray,
            record.fields.phPhoneNumber,
          ]);
        });
      })
      .catch((error) => console.log("error", error));
  };

  // useffect pour le premier rendu
  useEffect(() => {
    // COOKIES HIPTOFORM
    var cookieName = "_ch";
    if (checkCookieExists(cookieName)) {
      var cookieName = "_ch";
      var cookies = document.cookie.split(";");
      for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i].trim();
        if (cookie.startsWith(cookieName + "=")) {
          var cookieValue = cookie.substring(cookieName.length + 1);
          break;
        }
      }
      var cookieParts = cookieValue.split("/");
      if (cookieParts[1] === "1") {
        setEstKo(true);
        if (renderCount.current === 1) {
          window.dataLayer.push({
            event: "question_answered", // libellé de l'event -> Ne Pas Changer
            question: "leadko", // libellé de la question -> description_question selon nomenclature
            answer: "", // libellé de la réponse -> reprendre le @variable_question
          });
        }
      }
    } else {
      var alreadySend = "/0/";
      var expiration = new Date();
      expiration.setTime(expiration.getTime() + 5 * 60 * 1000);
      document.cookie =
        cookieName +
        "=" +
        window.hipto_uid +
        alreadySend +
        window.vertical +
        "; expires=" +
        expiration.toUTCString();
    }
    // FIN COOKIES HIPTOFORM
  }, []);


  useEffect(() => {
    if (data?.nombre_habitants === "2-5") {
      setInfoClient(clients.find((client) => client.source === "Edenred A"));
    } else if (data?.nombre_habitants === "5-10") {
      setInfoClient(clients.find((client) => client.source === "Edenred B"));
    } else if (data?.nombre_habitants === "10-15") {
      setInfoClient(clients.find((client) => client.source === "Edenred C"));
    } else if (data?.nombre_habitants === "15-30") {
      setInfoClient(clients.find((client) => client.source === "Edenred D"));
    } else if (data?.nombre_habitants === "30+") {
      setInfoClient(clients.find((client) => client.source === "Edenred E"));
    }
  }, [data?.nombre_habitants]);

  // Envoie vers la plateforme
  useEffect(() => {
    if (estFini) {
      // Nom du cookie
      var cookieName = "_ch";
      // Si le cookie n'existe pas on le créer
      if (!checkCookieExists(cookieName)) {
        var alreadySend = "/0/";
        var expiration = new Date();
        expiration.setTime(expiration.getTime() + 5 * 60 * 1000);
        document.cookie =
          cookieName +
          "=" +
          window.hipto_uid +
          alreadySend +
          window.vertical +
          "; expires=" +
          expiration.toUTCString();
      }

      var cookieName = "_ch";
      var cookies = document.cookie.split(";");

      for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i].trim();
        if (cookie.startsWith(cookieName + "=")) {
          var cookieValue = cookie.substring(cookieName.length + 1);
          break;
        }
      }

      var cookieParts = cookieValue.split("/");

      var country_code = "ESP";
      var sheet_name = "ListeLeads";
      var spreadsheet_id = "1A4L7jGltXgMWxT_TFFehnHyjq_-nbiow1K3BHc34vGc";

      if (cookieParts[1] === "0") {
        delete data?.changement_fournisseur;
        dataToSend = {
          ...data,
          opt_in: typeOptin,
          pour_client: infoClient?.source,
          vertical: vertical,
          sk: infoClient?.sk,
          canal: canal,
          utm_angle: utm_angle,
          utm_source: utm_source,
          utm_medium: utm_medium,
          utm_campaign: utm_campaign,
          utm_content: utm_content,
        };

        // if (
        //   utm_medium &&
        //   (utm_medium.includes("TYP") ||
        //     utm_medium.includes("D3") ||
        //     utm_medium.includes("HC"))
        // ) {
        //   dataToSend.source_ref = "";
        //   dataToSend.type_de_projet = "";
        //   dataToSend.objectif = "";
        //   dataToSend.niveau_connaissance = "";
        //   dataToSend.terme_projet = "";
        //   dataToSend.montant_facture = "";
        //   dataToSend.beneficiaire = "";
        //   dataToSend.choix_offre = "";
        //   dataToSend.depart = "";

        //   endpoint =
        //     "https://hiptoform.hipto.com/HiptoForm/index.php/HiptoForm/piocheInterbot";
        // } else {
        //   dataToSend.sheet_name = sheet_name;
        //   dataToSend.spreadsheet_id = spreadsheet_id;
        //   dataToSend.country_code = country_code;
        //   dataToSend.version = "hiptoformv4";
        //   endpoint =
        //     "https://hiptoform.hipto.com/HiptoForm/index.php/HiptoForm/sendData";
        // }

        const endpoint = "https://hiptoform.hipto.com/HiptoForm/index.php/HiptoForm/sendData";
        fetch(endpoint, {
          method: "POST",
          mode: "no-cors",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          body: JSON.stringify(dataToSend),
        }).catch((error) => { });

        var alreadySend = "/1/";
        var expiration = new Date();
        // Ajoute 3 jours en millisecondes à retirer une fois le filtre à doublon mis
        expiration.setTime(expiration.getTime() + 3 * 24 * 60 * 60 * 1000);
        //expiration.setTime(expiration.getTime() + 5 * 60 * 1000); // 5 minutes
        document.cookie =
          "_ch=" +
          window.hipto_uid +
          alreadySend +
          window.vertical +
          "; expires=" +
          expiration.toUTCString();
        window.dataLayer.push({
          event: "Lead",
          fn: data.prenom,
          ln: data.nom,
          em: data.email,
          ph: data.telephone, // libellé de l'event
        });
      } else if (cookieParts[1] === "1") {
        // Faites quelque chose si la valeur est "1"
        setEstKo(true);
        window.dataLayer.push({
          event: "question_answered", // libellé de l'event -> Ne Pas Changer
          question: "leadko", // libellé de la question -> description_question selon nomenclature
          answer: "", // libellé de la réponse -> reprendre le @variable_question
        });
      }
    }
  }, [estFini]);

  // Message si on a pas d'offre
  if (isStop) {
    return <NoOffer oneData={dataQuestion[idQuestion - 1]} idQuestion={idQuestion} setIdQuestion={setIdQuestion} setEstStop={setIsStop} />;
  }
  if (estKo) {
    return <LeadKo />;
  }

  if (isLoading) {
    return (
      <div>
        <div className="flex flex-col items-center min-h-[80vh] py-4">
          <div className="bg-[#ffffff66] px-8 py-4 my-4 ">
            <p className=" text-[var(--color-question)] font-primary font-[var(--weight-question)] text-sm md:text-lg text-left">
              Plus que quelques secondes...
            </p>
          </div>
          <div className="flex items-center justify-center">
            <div
              className="inline-block h-24 w-24 animate-spin rounded-full border-8 border-solid border-blue-400 border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
              role="status"
            >
              <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                Loading...
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const styleStateInactive = "rounded-3xl bg-[#D9D9D9] ";
  const styleStateActive = "rounded-3xl text-white bg-[#82b5a6] ";

  return (
    <div
      className=" font-nunito w-full"
      id="form"
    >
      {/* Si le formulaire n'est pas fini */}
      {!estFini && (
        <div className="flex flex-col">
          <div className="text-center text-black text-[12px] lg:text-sm mx-8 md:mx-24 py-4 font-medium">
            <p className="">{dataQuestion[idQuestion - 1].header}</p>
          </div>
          {idQuestion > 0 && (
            <ProgressBar
              idQuestion={idQuestion - 1}
              nbQuestion={parseInt(dataQuestion.length)}
            />
          )}
          {/* Affichage d'un composant question */}
          <div className=" text-center">
            {/* Choix unique*/}
            {typeQuestion === "choix" && (
              <FormChoix
                oneData={dataQuestion[idQuestion - 1]}
                setIdQuestion={setIdQuestion}
                setData={setData}
                idQuestion={idQuestion}
                setIsStop={setIsStop}
              />
            )}
            {/* Choix unique en liste*/}
            {typeQuestion === "choixListe" && (
              <FormChoixListe
                oneData={dataQuestion[idQuestion - 1]}
                setIdQuestion={setIdQuestion}
                setData={setData}
                idQuestion={idQuestion}
                setIsStop={setIsStop}
              />
            )}
            {/* Choix unique avec image */}
            {typeQuestion === "choixImage" && (
              <FormChoixImage
                oneData={dataQuestion[idQuestion - 1]}
                setIdQuestion={setIdQuestion}
                setData={setData}
                idQuestion={idQuestion}
                setIsStop={setIsStop}
              />
            )}
            {typeQuestion === "slider" && (
              <FormSlider
                oneData={dataQuestion[idQuestion - 1]}
                setIdQuestion={setIdQuestion}
                setData={setData}
                idQuestion={idQuestion}
                setIsStop={setIsStop}
              />
            )}

            {/* Zipcode */}
            {typeQuestion === "zipcode" && (
              <FormZipCode
                oneData={dataQuestion[idQuestion - 1]}
                setIdQuestion={setIdQuestion}
                setData={setData}
              />
            )}
            {typeQuestion === "input" && (
              <FormInput
                oneData={dataQuestion[idQuestion - 1]}
                setIdQuestion={setIdQuestion}
                setData={setData}
                idQuestion={idQuestion}
                setEstStop={setIsStop}
                setIsClickedBack={setIsClickedBack}
              />
            )}
            {/* Nom/Prenom */}
            {typeQuestion === "name" && (
              <FormName
                oneData={dataQuestion[idQuestion - 1]}
                setIdQuestion={setIdQuestion}
                setData={setData}
              />
            )}
            {/* Contact */}
            {typeQuestion === "contact" && (
              <FormContact
                oneData={dataQuestion[idQuestion - 1]}
                setIdQuestion={setIdQuestion}
                setData={setData}
                fakeNumbers={fakeNumbers}
                data={data}
              />
            )}
            {typeQuestion === "loader" && (
              <Loader setIdQuestion={setIdQuestion}
                isClickedBack={isClickedBack}
                setIsClickedBack={setIsClickedBack}
              />
            )}
            {typeQuestion === "loader2" && (
              <Loader2 setIdQuestion={setIdQuestion} />
            )}
          </div>
        </div>
      )}

      {/* Si le formulaire est fini */}
      {estFini && (
        <div className="flex flex-col py-6">
          {idQuestion > 0 && (
            <ProgressBar
              idQuestion={idQuestion - 1}
              nbQuestion={parseInt(dataQuestion.length)}
            />
          )}
          <OptinS prenom={data.prenom} infoClient={infoClient} />
        </div>
      )}
    </div>
  );
};
