const colorLabels = [...document.querySelectorAll(".input-group label")] // Récupère tous les labels dans des groupes d'input et les stocke dans un tableau
const colorPickerInputs = [...document.querySelectorAll("input[type='color']")] // Récupère tous les inputs de type couleur et les stocke dans un tableau
const rangeLabelValue = document.querySelector(".orientation-value") // Sélectionne l'élément pour afficher la valeur de l'angle du gradient

const gradientData = { // Définit un objet pour stocker les données du gradient
  angle: 90, // Angle initial du gradient
  colors: ["#FF5F6D", "#FFC371"] // Couleurs initiales du gradient
}

function populateUI(){ // Fonction pour mettre à jour l'interface utilisateur avec les données du gradient
  colorLabels[0].textContent = gradientData.colors[0]; // Met à jour le texte du premier label avec la première couleur
  colorLabels[1].textContent = gradientData.colors[1]; // Met à jour le texte du deuxième label avec la deuxième couleur

  colorPickerInputs[0].value = gradientData.colors[0]; // Met à jour la valeur du premier input de sélection de couleur
  colorPickerInputs[1].value = gradientData.colors[1]; // Met à jour la valeur du deuxième input de sélection de couleur

  colorLabels[0].style.background = gradientData.colors[0] // Applique la première couleur en arrière-plan du premier label
  colorLabels[1].style.background = gradientData.colors[1] // Applique la deuxième couleur en arrière-plan du deuxième label

  document.body.style.background = `linear-gradient(${gradientData.angle}deg, ${gradientData.colors[0]}, ${gradientData.colors[1]})` // Applique le gradient comme fond du corps de la page

  rangeLabelValue.textContent = `${gradientData.angle}°` // Affiche l'angle actuel du gradient

  adaptInputsColor() // Appelle la fonction pour adapter la couleur du texte des labels en fonction du fond
}
populateUI() // Appelle la fonction pour initialiser l'UI avec les valeurs par défaut

function adaptInputsColor(){ // Fonction pour ajuster la couleur du texte des labels basée sur la couleur de fond
  colorLabels.forEach(label => {
    const hexColor = label.textContent.replace("#", ""); // Enlève le caractère '#' de la chaîne hexadécimale
    const red = parseInt(hexColor.slice(0,2), 16) // Convertit les deux premiers caractères hex en valeur rouge
    const green = parseInt(hexColor.slice(2,4), 16) // Convertit les deux caractères suivants en valeur verte
    const blue = parseInt(hexColor.slice(4,6), 16) // Convertit les deux derniers caractères en valeur bleue

    const yiq = (red * 299 + green * 587 + blue * 144) / 1000; // Calcule la luminance
    console.log(yiq);
 
    if(yiq >= 128) {
      label.style.color = "#111" // Applique une couleur foncée pour le texte si le fond est clair
    }
    else {
      label.style.color = "#f1f1f1" // Applique une couleur claire pour le texte si le fond est foncé
    }
  })
}

const rangeInput = document.querySelector(".inp-range") // Sélectionne l'input range pour l'angle du gradient
rangeInput.addEventListener("input", handleInclination) // Attache un gestionnaire d'événement pour détecter les changements d'angle

function handleInclination(){ // Fonction appelée lors du changement de l'angle du gradient
  gradientData.angle = rangeInput.value; // Met à jour l'angle dans les données du gradient
  rangeLabelValue.textContent = `${gradientData.angle}°` // Met à jour l'affichage de l'angle
  populateUI(); // Met à jour l'interface utilisateur avec le nouvel angle
}

colorPickerInputs.forEach(input => input.addEventListener("input", colorInputModification)) // Attache des écouteurs d'événements à chaque input de couleur pour détecter les modifications
function colorInputModification(e){ // Fonction appelée lorsqu'une couleur est modifiée via un input
    const currentIndex = colorPickerInputs.indexOf(e.target); // Trouve l'index de l'input qui a déclenché l'événement
    gradientData.colors[currentIndex] = e.target.value.toUpperCase(); // Met à jour la couleur dans les données du gradient à l'index correspondant
    populateUI(); // Rafraîchit l'interface utilisateur avec les nouvelles valeurs
  }
  
  const copyBtn = document.querySelector(".copy-btn"); // Sélectionne le bouton pour copier le gradient
  copyBtn.addEventListener("click", handleGradientCopy) // Attache un gestionnaire d'événement pour réagir au clic sur ce bouton
  
  let lock = false; // Initialise une variable de verrouillage pour éviter le déclenchement multiple
  function handleGradientCopy(){ // Fonction appelée lors du clic sur le bouton de copie
  
    const gradient = `linear-gradient(${gradientData.angle}deg, ${gradientData.colors[0]}, ${gradientData.colors[1]})` // Crée la chaîne de caractères du gradient
  
    navigator.clipboard.writeText(gradient) // Copie le gradient dans le presse-papiers
  
    if(lock) return; // Empêche les actions si le verrou est actif
  
    lock = true; // Active le verrou
    copyBtn.classList.add("active") // Ajoute une classe pour indiquer que le bouton est actif
  
    setTimeout(() => { // Définit un délai pour désactiver le verrou et retirer la classe 'active'
      copyBtn.classList.remove("active")
      lock = false;
    }, 1000)
  }
  
  const randomGradientBtn = document.querySelector(".random-btn"); // Sélectionne le bouton pour générer un gradient aléatoire
  randomGradientBtn.addEventListener("click", createRandomGradient) // Attache un gestionnaire d'événement pour le clic sur ce bouton
  
  function createRandomGradient(){ // Fonction pour générer des gradients aléatoires
  
    for(let i = 0; i < colorLabels.length; i++) { // Itère sur chaque label de couleur
      let randomColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`; // Génère une couleur aléatoire en format hexadécimal
      console.log(randomColor); // Affiche la couleur générée dans la console
      gradientData.colors[i] = randomColor.toUpperCase() // Met à jour la couleur dans les données du gradient à l'index correspondant
    }
  
    populateUI() // Rafraîchit l'interface utilisateur avec les nouvelles couleurs du gradient
  }
  