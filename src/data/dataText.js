export const dataText = {
  next: "Suivant",
  firstName: "ej : José",
  labelPrenom: "Nombre",
  lastName: "ej : Gómez Iglesias",
  labelNom: "Apellidos",
  societe: "ej : compañía",
  labelSociete: "Nombre de tu empresa",
  email: "ej: juanmartinez@gmail.com",
  labelEmail: "Tu correo electrónico",
  phone: "ej: 666 XX XX XX",
  labelPhone: "Tu número de teléfono",
  zipcode: "ex : 28000 Madrid",
  input: "Ecrire ...",
  select: "Sélectionner ...",
  loader: "Chargement ...",
  errEmail: "El correo electrónico no es válido",
  errPhone: "El teléfono no es válido",
  errZipcode: "El código postal no es válido",
  errCGU: "Vous devez accepter les CGU",
  textNoOffer: "Aucune offre disponible",
  discover: "Découvrir mon offre",
  confirmationOptinFort: "Recevoir mon offre",
};

export const OptinConfig = {
  colorName: "blue",
};

export const textOptin = (prenom, infoClient) => {
  const nameOptin = document.getElementById("nameOptin");
  const nameOptin1 = document.getElementById("nameOptin1");

  const nameOptinTextHTML =
    `<span class="font-bold text-red-500">${prenom}</span>, ` +
    `après étude de votre besoin, l'offre du fournisseur ` +
    `<span class="text-red-500 font-bold">${infoClient}</span> ` +
    `semble être parfaitement adaptée !`;
  console.log(nameOptin);
  if (nameOptin) {
    nameOptin.innerHTML = nameOptinTextHTML;
  }
  if (nameOptin1) {
    nameOptin1.innerHTML = nameOptinTextHTML;
  }
  const phoneOptin = document.getElementById("phoneOptin");
  const phoneOptin1 = document.getElementById("phoneOptin1");
  const phoneOptinTextHTML = `Un conseiller <span className="font-bold text-red-600">${infoClient}</span>
  est disponible ! Restez près de votre téléphone. Vous serez
 recontacté dans moins de 2 minutes.`;
  console.log(phoneOptin);
  if (phoneOptin) {
    phoneOptin.innerHTML = phoneOptinTextHTML;
  }
  if (phoneOptin1) {
    phoneOptin1.innerHTML = phoneOptinTextHTML;
  }
};
