// Pour créer un nouveau chemin, il faut créer un nouveau dataQuestion
// et l'importer dans Form.jsx

// choix,name,zipcode,contact,contactz,list,select,date,input,loader

//ajouter welcomeMessage:true pour la premiere question


export const dataQuestion = [
  // Question 1
  {
    id: 1,
    type: "choixImage",
    welcomeMessage: true,
    header: "",
    question: "¿Cuál es tu sector de actividad?",
    chrono: "Sólo se necesita un minuto!",
    cta: "",
    variable: "secteur",
    variableGA: "",
    reponses: [
      {
        id: 1,
        label: "Banco Seguros",
        texte: (<div>Banco <br /> Seguros</div>),
        image1: "http://ticketrestaurantpro.com/imgESP_EM/Banco.png",
        image2: "http://ticketrestaurantpro.com/imgESP_EM/BancoHover.png",
        alt: "Banco logo",
      },
      {
        id: 2,
        label: "Hôtel Restaurante Panadería",
        texte: (<div>Hotel<br />Restaurante <br />Panadería</div>),
        image1: "http://ticketrestaurantpro.com/imgFRA_EM/Hotel.png",
        image2: "http://ticketrestaurantpro.com/imgFRA_EM/HotelHover.png",
        alt: "Logo hotel",
      },
      {
        id: 3,
        label: "Química Farmacéutica",
        texte: (<div>Química <br /> Farmacéutica</div>),
        image1: "http://ticketrestaurantpro.com/imgFRA_EM/Chimie.png",
        image2: "http://ticketrestaurantpro.com/imgFRA_EM/ChimieHover.png",
        alt: "Logo chimie",
      },
      {
        id: 4,
        label: "Edición Comunicación Multimedia",
        texte: (<div>Edición<br />Comunicación <br />Multimedia</div>),
        image1: "http://ticketrestaurantpro.com/imgESP_EM/Megaphone.png",
        image2: "http://ticketrestaurantpro.com/imgESP_EM/MegaphoneHover.png",
        alt: "Logo chimie",
      },
      {
        id: 5,
        label: "Transporte Logística",
        texte: (<div>Transporte <br /> Logística</div>),
        image1: "http://ticketrestaurantpro.com/imgFRA_EM/Transport.png",
        image2: "http://ticketrestaurantpro.com/imgFRA_EM/TransportHover.png",
        alt: "Logo logistique",
      },
      {
        id: 6,
        label: "Servicios a empresas",
        texte: (<div>Servicios a <br /> empresas</div>),
        image1: "http://ticketrestaurantpro.com/imgFRA_EM/Service.png",
        image2: "http://ticketrestaurantpro.com/imgFRA_EM/ServiceHover.png",
        alt: "Logo service",
      },
      {
        id: 7,
        label: "Construcción",
        texte: (<div>Construcción</div>),
        image1: "http://ticketrestaurantpro.com/imgFRA_EM/Btp.png",
        image2: "http://ticketrestaurantpro.com/imgFRA_EM/BtpHover.png",
        alt: "Logo btp",
      },
      {
        id: 8,
        label: "Otro",
        texte: (<div>Otro</div>),
        image1: "http://ticketrestaurantpro.com/imgFRA_EM/Autre.png",
        image2: "http://ticketrestaurantpro.com/imgFRA_EM/AutreHover.png",
        alt: "Logo autre",
      },
    ],
  },

  // Question 2 optionel
  {
    id: 2,
    type: "choixListe",
    header: "",
    question: "¿Deseas unirte a nuestra red u ofrecer ticket restaurant a tus empleados?",
    chrono: "Quedan 35 segundos ...",
    cta: "",
    variable: "besoin_particulier",
    variableGA: "",
    reponses: [
      {
        id: 9,
        label: "Quieres unirte a nuestra red",
      },
      {
        id: 10,
        label: "Ofrece vales de comida a sus empleados",
      },
    ],
  },

  // Question 4
  {
    id: 4,
    type: "choix",
    header: "",
    question: "¿Trabajas como autónomo?",
    chrono: "Quedan 50 segundos ...",
    cta: "",
    variable: "eligibilite",
    variableGA: "",
    reponses: [
      {
        id: 11,
        label: "SÍ",
        image1: "http://ticketrestaurantpro.com/imgFRA_EM/Oui.png",
        image2: "http://ticketrestaurantpro.com/imgESP_EM/SiHover.png",
        alt: "Logo oui",
      },
      {
        id: 12,
        label: "NO",
        image1: "http://ticketrestaurantpro.com/imgFRA_EM/Non.png",
        image2: "http://ticketrestaurantpro.com/imgESP_EM/NoHover.png",
        alt: "Logo non",
      },
    ],
  },

  // Question 5
  {
    id: 5,
    type: "choixListe",
    header: "",
    question: "¿Cuántos empleados tiene la empresa?",
    chrono: "Quedan 40 segundos ...",
    cta: "",
    variable: "nombre_habitants",
    variableGA: "",
    reponses: [
      {
        id: 13,
        label: "2-5",
      },
      {
        id: 14,
        label: "5-10",
      },
      {
        id: 15,
        label: "10-15",
      },
      {
        id: 16,
        label: "15-30",
      },
      {
        id: 17,
        label: "30+",
      },
    ],
  },

  // Question 6
  {
    id: 6,
    type: "choix",
    header: "",
    question: "¿Eres dueño de la empresa?",
    chrono: "Quedan 35 segundos ...",
    cta: "",
    variable: "situation_actuelle",
    variableGA: "",
    reponses: [
      {
        id: 18,
        label: "SÍ",
        image1: "http://ticketrestaurantpro.com/imgFRA_EM/Oui.png",
        image2: "http://ticketrestaurantpro.com/imgESP_EM/SiHover.png",
        alt: "Logo oui",
      },
      {
        id: 19,
        label: "NO",
        image1: "http://ticketrestaurantpro.com/imgFRA_EM/Non.png",
        image2: "http://ticketrestaurantpro.com/imgESP_EM/NoHover.png",
        alt: "Logo non",
      },
    ],
  },

  // Question 7
  {
    id: 7,
    label: "Code postal",
    type: "zipcode",
    question: "¿Cuál es el código postal de tu empresa?", // input
    chrono: "Quedan 30 segundos ...",
  },

  // loader
  {
    id: 8,
    type: "loader",
  },

  // Question 9
  {
    id: 8,
    header: "Buenas noticias. Hemos encontrado el proveedor perfecto para ti. ¡Sólo 2 pasos más para obtener su presupuesto gratuito!",
    type: "name",
    question: "", // input
    chrono: "Quedan 20 segundos ...",
  },

  // Question 10
  {
    id: 10,
    type: "contact",
    question: "Último paso ¿Cuáles son sus datos de contacto?", // input
    chrono: "Quedan 10 segundos ...",
  },
];