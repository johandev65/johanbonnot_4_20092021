// Menu responsive
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");
const navLink = document.querySelectorAll(".nav-link");

hamburger.addEventListener("click", mobileMenu);
navLink.forEach(n => n.addEventListener("click", closeMenu));

function mobileMenu() {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
}

function closeMenu() {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
}


// Ciblage des éléments du DOM
const modalBtn = document.querySelectorAll(".modal-btn");
const modalbg = document.querySelector(".bground");
const modalbody = document.querySelector(".modal-body");
const modalbodyconfirm = document.querySelector(".modal-body-confirm");
const closemodal = document.querySelector(".close");
const closemodalconfirm = document.querySelector(".close-confirm");

const formData = document.querySelectorAll(".formData input");
const pushform = document.querySelector(".btn-submit");
const locationDiv = document.querySelector(".location_form");
const locationCheckbox = document.querySelectorAll(".location_form [name=\"location\"]");


// Ajout d"évènements
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));
closemodal.addEventListener("click",  closeModal);
closemodalconfirm.addEventListener("click",  closeModal);
pushform.addEventListener("click", pushForm);
  
// lancement de la fenêtre modale
function launchModal() {
    modalbg.style.display = "block";
}


// fermeture des 2 fenêtres modales (celle du formulaire et celle de la confirmation)
function closeModal() {
    modalbg.style.display = "none";
    modalbody.style.display = "block";
    modalbodyconfirm.style.display = "none";
    resetForm();
}


// validation du formulaire ou non (cela bloquera la soummission si tout n'est pas validé)
function pushForm(e) {
    e.preventDefault();
    validationForm();
}

function validationForm() {
    let validation_list = []
    first_data = firstData(formData[0].value);
    last_data = lastData(formData[1].value);
    email_data = emailData(formData[2].value);
    birthdate_data = birthdateData(formData[3].value);
    quantity_data = quantityData(formData[4].value);
    location_data = locationData(locationCheckbox);
    condition_data = conditionData(formData[11]);
    validation_form = true;

    validation_list.push(first_data, last_data, email_data, birthdate_data, quantity_data, location_data, condition_data);
    for (element in validation_list) {
        // si un ou plusieurs éléments sonts incorrects, cela bloquera la soumission l'envoi du formulaire
        if (validation_list[element] == false) {
            validation_form = false;
        }
    }
        // si tous les éléments sont corrects, cela validera la soummission du formulaire et affichera une 2ème fenêtre modale de confirmation)
        if (validation_form == true) {
            modalbody.style.display = "none";
            modalbodyconfirm.style.display = "block";
            resetForm();
        }
         // si réponse vide, cela bloquera également la soumission l'envoi du formulaire
        else {
            return false;
    }
}


// Reset du formulaire
function resetForm() {
    for (element in formData) {
        try {
            document.getElementById("myForm").reset(); 
            formData[element].value = "";
            formData[element].style.borderColor = "white";
            // reset des messages d'erreurs
            error_msg_list = ["error1", "error2", "error3", "error4", "error5", "error6", "error7"];
            var errorData = document.getElementById(error_msg_list[element]);
            errorData.remove();
        } catch {}
    }
}
  
// validation du prénom
function firstData(data) {
    var valid = false;
    var error = ('<span id="error1" class="msg_error">Veuillez entrer 2 caractères ou plus pour le champ du nom.</span>');
    var errorData = document.getElementById("error1");

    if (data.length > 1) {
        valid = true;
        formData[0].style.borderColor = "green";
    }
    else {
        valid = false
        formData[0].style.borderColor = "red";
        formData[0].insertAdjacentHTML("afterend", error)
    } try {
        errorData.remove();
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
        formData[1].style.borderColor = "green";
    }
    else {
        valid = false
        formData[1].style.borderColor = "red";
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
        formData[2].style.borderColor = "green";
    } else {
        valid = false;
        formData[2].style.borderColor = "red";
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
        formData[3].style.borderColor = "green";
    }
    else {
        valid = false
        formData[3].style.borderColor = "red";
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
        formData[4].style.borderColor = "green";
    } else {
        valid = false;
        formData[4].style.borderColor = "red";
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
