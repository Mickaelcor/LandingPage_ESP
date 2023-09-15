import React from "react";

const link = "https://accordmutuelle.fr/MutuelleSenior_L0_FP_FL1/";

const socials = [
  {
    name: "facebook",
    icon: "https://clubfibre.com/images/lp/lpv2/optin/facebook.png",
    displayName: "Facebook",
    color: "#435993",
    link: `https://www.facebook.com/sharer/sharer.php?u=${link}%2F%3Futm_source%3Dgoogle_shared&amp;src=sdkpreparse`,
  },
  {
    name: "twitter",
    icon: "https://clubfibre.com/images/lp/lpv2/optin/twitter.png",
    displayName: "Twitter",
    color: "#4E9FEB",
    link: `https://twitter.com/intent/tweet?text=${link}/?utm_source=google_shared`,
  },
  {
    name: "linkedin",
    icon: "https://clubfibre.com/images/lp/lpv2/optin/linkedin.png",
    displayName: "LinkedIn",
    color: "#0077B5",
    link: `https://www.linkedin.com/shareArticle?mini=true&url=${link}?utm_source=google_shared`,
  },
  {
    name: "whatsapp",
    icon: "https://clubfibre.com/images/lp/lpv2/optin/whatsApp.png",
    displayName: "WhatsApp",
    color: "#59BE56",
    link: `https://api.whatsapp.com/send?text=${link}?utm_source=google_shared`,
  },
];

export const Share = () => {
  return (
    <div>
      {/* Texte */}
      <p className="py-2 text-center">Partagez sur :</p>
      {/* LISTE BOUTONS */}
      <div className=" flex flex-wrap justify-center  mx-auto gap-4">
        {
          // Pour chaque social, on affiche un bouton
          socials.map((social) => (
            <ShareButton key={social.name} social={social} />
          ))
        }
      </div>
    </div>
  );
};

const ShareButton = ({ social }) => {
  const backgroundColor = {
    backgroundColor: social.color,
  };

  return (
    <a
      style={backgroundColor}
      className=" text-white  p-4 rounded-md hover:scale-105  transition-all duration-300 ease-in-out"
      href={social.link}
      target="_blank"
    >
      <button
        type="submit"
        onClick={() => {
          console.log(social.name);
          window.dataLayer.push({
            event: "question_answered",
            question: "share_button",
            answer: social.name,
          });
        }}
        className="flex items-center"
      >
        <img src={social.icon} alt={social.displayName} />
      </button>
    </a>
  );
};
