// CIBLAGE DES ÉLÉMENTS DU DOM
const hamburger = document.querySelector(".hamburger"); // icône hamburger pour le mode responsive
const navMenu = document.querySelector(".nav-menu");  // liste de tous les éléments du menu
const navLink = document.querySelectorAll(".nav-link"); // lien de chaque élément du menu

const modalBtn = document.querySelectorAll(".modal-btn"); // bouton "je m'inscris" pour ouvrir la fenêtre modale
const modalbg = document.querySelector(".bground"); // totalité du bloc de la fenêtre modale
const modalbody = document.querySelector(".modal-body"); // contenu de la fenêtre modale
const modalbodyconfirm = document.querySelector(".modal-body-confirm"); // contenu de la fenêtre modale de confirmation
const closemodal = document.querySelector(".close"); // bouton croix de la fenêtre modale
const closemodalconfirm = document.querySelector(".close-confirm"); // bouton croix de la fenêtre modale de confirmation

const formData = document.querySelectorAll(".formData input"); // tous les champs du formulaire
const pushform = document.querySelector(".btn-submit"); // bouton d'envoi "c'est parti" du formulaire 
const locationDiv = document.querySelector(".location_form"); // ciblage du bloc qui englobe tous les inputs et labels des villes
const locationRadio = document.querySelectorAll(".location_form [name=\"location\"]"); // ciblage de chaque bouton radio de ville



// MENU RESPONSIVE

// ajout d'évènements
hamburger.addEventListener("click", mobileMenu); // clic sur l'icône hamburger pour afficher le menu en version responsive
navLink.forEach(n => n.addEventListener("click", closeMenu)); // à chaque clic sur un élément de menu, le menu se ferme ensuite automatiquement

// la fonction mobileMenu() ajoute également une classe "active" sur le hamburger et sur navMenu, ce qui ouvre le menu mobile.
function mobileMenu() {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
}
// la fonction closeMenu() supprime la class "active" à la fois du hamburger et du navMenu, ce qui ferme le menu mobile.
function closeMenu() {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
}



// FENÊTRES MODALES ET FORMULAIRE

// ajout d"évènements
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));
closemodal.addEventListener("click",  closeModal);
closemodalconfirm.addEventListener("click",  closeModal);
pushform.addEventListener("click", pushForm);
  
// création d'une fonction permettant le lancement de la fenêtre modale
function launchModal() {
    modalbg.style.display = "block";
}

// création d'une fonction permettant la fermeture de chacune des fenêtres modales (celle du formulaire et celle de la confirmation)
function closeModal() {
    modalbg.style.display = "none";
    modalbody.style.display = "block";
    modalbodyconfirm.style.display = "none";
    resetForm(); 
}

// création d'une fonction permettant la validation du formulaire
function validationForm() {
    let validation_list = []
    first_data = firstData(formData[0].value); // valeur rentrée par l'utilisateur dans l'ID correspondant au prénom
    last_data = lastData(formData[1].value); // valeur rentrée par l'utilisateur dans l'ID correspondant au nom
    email_data = emailData(formData[2].value); // valeur rentrée par l'utilisateur dans l'ID correspondant au mail
    birthdate_data = birthdateData(formData[3].value); // valeur rentrée par l'utilisateur dans l'ID correspondant à la date de naissance
    quantity_data = quantityData(formData[4].value); // valeur rentrée par l'utilisateur dans l'ID correspondant au nombre de tournois disputés
    location_data = locationData(locationRadio); // valeur rentrée par l'utilisateur (choix unique parmi 6 boutons radio)
    condition_data = conditionData(formData[11]); // valeur rentrée par l'utilisateur dans l'ID correspondant à l'acceptation des conditions d'utilisation
    validation_form = true; // si les valeurs entrées sont correctes, cela validera la soummission du formulaire
    // ajout de toutes les valeurs à ma variable de type tableau nommé "validation_list"
    validation_list.push(first_data, last_data, email_data, birthdate_data, quantity_data, location_data, condition_data);
    // pour chaque élément de mon tableau "validation_list"
    for (element in validation_list) {
        // si un ou plusieurs éléments sonts incorrects, cela bloquera la soumission du formulaire
        if (validation_list[element] == false) {
            validation_form = false;
        }
    }
        // si tous les éléments sont corrects, cela affichera une 2ème fenêtre modale de confirmation
        if (validation_form == true) {
            modalbody.style.display = "none"; // disparition de la fenêtre modale
            modalbodyconfirm.style.display = "block"; // apparition de la 2ème fenêtre modale de confirmation
            resetForm(); //formulaire réinitialisé après envoi
        }
         // si réponse vide, cela bloquera également la soumission l'envoi du formulaire
        else {
            return false; 
    }
}

// création d'une fonction permettant la réinitialisation du formulaire
function resetForm() {
    for (element in formData) {
        try {
            document.getElementById("myForm").reset(); // Reset total des données du formulaire après fermeture de la modale
            formData[element].value = "";
            formData[element].style.borderColor = "white";
            // reset des messages d'erreurs
            error_msg_list = ["error1", "error2", "error3", "error4", "error5", "error6", "error7"];
            var errorData = document.getElementById(error_msg_list[element]);
            errorData.remove();
        } catch {}
    }
}
  
// validation du formulaire ou non (cela bloquera la soummission si tout n'est pas validé)
function pushForm(e) {
    e.preventDefault();
    validationForm();
}

// validation du prénom
function firstData(data) {
    var valid = false; // si la valeur rentrée est invalide
    var error = ('<span id="error1" class="msg_error">Veuillez entrer 2 caractères ou plus pour le champ du nom.</span>'); // voici le message d'erreur à afficher
    var errorData = document.getElementById("error1"); // ID du message d'erreur

    if (data.length > 1) { // si la valeur rentrée contient strictement plus d'une lettre
        valid = true; // le champ est valide
        formData[0].style.border = "2px solid #33FF36"; // la bordure de l'input devient donc verte
    }
    else { // sinon
        valid = false // si le champ est invalide
        formData[0].style.border = "2px solid red"; // la bordure de l'input devient donc rouge
        formData[0].insertAdjacentHTML("afterend", error) // cela affiche ensuite un message d'erreur
    } try { 
        errorData.remove(); // le message d'erreur est supprimé
    } catch {}
        return valid;
}

// validation du nom
function lastData(data) {
    var valid = false;
    var error = ('<span id="error2" class="msg_error">Veuillez entrer 2 caractères ou plus pour le champ du nom.</span>');
    var errorData = document.getElementById("error2");

    if (data.length > 1) {
        valid = true;
        formData[1].style.border = "2px solid #33FF36";
    }
    else {
        valid = false
        formData[1].style.border = "2px solid red";
        formData[1].insertAdjacentHTML("afterend", error);
    } try {
        errorData.remove();
    } catch {}
        return valid;
}

// validation de l'email
function emailData(data) {
    var valid = false;
    const regex_mail = RegExp(/^[a-z0-9._-]+@[a-z_]+?\.[a-z]{2,3}$/);
    const regex_is = regex_mail.test(data);
    var error = ('<span id="error3" class="msg_error">Vous devez entrer une adresse email valide.</span>');
    var errorData = document.getElementById("error3");

    if (regex_is) {
        valid = true;
        formData[2].style.border = "2px solid #33FF36";
    } else {
        valid = false;
        formData[2].style.border = "2px solid red";
        formData[2].insertAdjacentHTML("afterend", error);
    } try {
        errorData.remove();
    } catch {}
        return valid;
}

// validation de la date de naissance
function birthdateData(data) {
    var valid = false;
    const regex_date = RegExp(/^\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])$/);
    const regex_is = regex_date.test(data);
    var error = ('<span id="error4" class="msg_error">Vous devez entrer votre date de naissance valide.</span>');
    var errorData = document.getElementById("error4");

    if (regex_is) {
        valid = true;
        formData[3].style.border = "2px solid #33FF36";
    }
    else {
        valid = false
        formData[3].style.border = "2px solid red";
        formData[3].insertAdjacentHTML("afterend", error);
    } try {
        errorData.remove();
    } catch {}
        return valid;
}

// validation du nombre de tournois disputés
function quantityData(data) {
    var valid = false;
    const regex_quantity = RegExp(/^\d{1,}$/);
    const regex_is = regex_quantity.test(data);
    var error = ('<span id="error5" class="msg_error">Vous devez entrer un nombre.</span>');
    var errorData = document.getElementById("error5");

    if (regex_is) {
        valid = true;
        formData[4].style.border = "2px solid #33FF36";
    } else {
        valid = false;
        formData[4].style.border = "2px solid red";
        formData[4].insertAdjacentHTML("afterend", error);
    } try {
        errorData.remove();
    } catch {}
        return valid;
}

// validation de la ville
function locationData(data) {
    var valid = false;

    for (element in  data) {
        if (data[element].checked == true) {
            valid = true;
        }
    };

    var error = ('<span id="error6" class="msg_error">Vous devez choisir une ville.</span>');
    var errorData = document.getElementById("error6");

    if (valid == true) {
    } else {
        locationDiv.insertAdjacentHTML("afterend", error);
    } try {
        errorData.remove();
    } catch {}
        return valid;
}

// validation des conditions d'utilisation
function conditionData(data) {
    var error = ('<span id="error7" class="msg_error">Vous devez accepter les termes et conditions d’utilisation.</span>');
    var errorData = document.getElementById("error7");

    if (data.checked == true) {
        valid = true;
    } else {
        valid = false;
        formData[12].insertAdjacentHTML("beforebegin", error);
    } try {
        errorData.remove();
    } catch {}
        return valid;
}
