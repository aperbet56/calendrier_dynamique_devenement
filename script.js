// Récupération des différents éléments
const hr = document.querySelector(".hours");
const min = document.querySelector(".minutes");
const sec = document.querySelector(".seconds");
const currentMonthAndYear = document.querySelector(".current__month__year");
const footerCopyrightYear = document.querySelector(".footer__text__year");

// Déclaration de la fonction digitalClock qui va permettre l'affichage de l'heure
const digitalClock = () => {
  let date = new Date();
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let seconds = date.getSeconds();

  hours = hours < 10 ? "0" + hours : hours;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;

  hr.textContent = hours;
  min.textContent = minutes;
  sec.textContent = seconds;

  const monthNames = [
    "Janvier",
    "Février",
    "Mars",
    "Avril",
    "Mai",
    "Juin",
    "Juillet",
    "Août",
    "Septembre",
    "Octobre",
    "Novembre",
    "Décembre",
  ];
  let currentMonth = date.getMonth();
  let currentYear = date.getFullYear();
  currentMonthAndYear.textContent = `${monthNames[currentMonth]} ${currentYear}`;
  footerCopyrightYear.textContent = `${currentYear}`;
};
// Appel de la fonction digitalClock toutes les secondes
setInterval(digitalClock, 1000);

// Déclaration de la fonction generateCalendar qui va générer le calendrier
const generateCalendar = () => {
  const calendar = document.getElementById("calendar");

  // Création d'un nouvel objet Date pour obtenir la date, le mois et l'année actuels
  const currentDate = new Date();
  const month = currentDate.getMonth();
  const year = currentDate.getFullYear();

  // Calcul afin d'obtenir le premier et le dernier jour du mois
  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);

  // Calcul afin d'obtenir le jour de la semaine du premier jour du mois
  const firstDayOfWeek = firstDayOfMonth.getDay();
  const totalDays = lastDayOfMonth.getDate();

  // création d'un élément div et ajout dans le DOM
  for (let i = 0; i < firstDayOfWeek; i++) {
    let blankDay = document.createElement("div");
    calendar.appendChild(blankDay);
  }

  // Création d'élément div pour chaque jour du mois et ajout dans le DOM
  for (let day = 1; day <= totalDays; day++) {
    let daySquare = document.createElement("div");
    daySquare.className = "calendar__day";
    daySquare.textContent = day;
    daySquare.id = `day-${day}`;
    calendar.appendChild(daySquare);
  }
};

// Déclaration de la fonction showAddTaskModal qui va faire apparaître la modale
const showAddTaskModal = () => {
  document.getElementById("addTaskModal").style.display = "block";
};

// Déclaration de la fonction CloseAddTaskModal qui va permettre de fermer la modale
const closeAddTaskModal = () => {
  document.getElementById("addTaskModal").style.display = "none";
};

// Déclaration de la fonction deleteTask qui va permettre de supprimer un événement
const deleteTask = (taskElement) => {
  // Confirmation de la suppression
  if (confirm("Voulez-vous vraiment supprimer cet événement ?")) {
    // Si confirmation validée, suppression de l'événement
    taskElement.parentNode.removeChild(taskElement);
  }
};

// Déclaration de la fonction editTask qui va permettre d'éditer un événement
const editTask = (taskElement) => {
  // Promptl'utilisateur peut modifier la description de la tâche, avec la description actuelle par défaut
  const newTaskDesc = prompt(
    "Editer votre événement :",
    taskElement.textContent
  );
  // Voir si l'utilisateur a inscrit une nouvelle description et si elle est vide
  if ((newTaskDesc !== null) & (newTaskDesc.trim() !== "")) {
    // Mise à jour de la description
    taskElement.textContent = newTaskDesc;
  }
};

// Déclaration de la fonction addTask qui va permettre d'ajouter un événement
const addTask = () => {
  // Obtenir la date et la description de l'événement
  const taskDate = new Date(document.getElementById("task__date").value);
  const taskDesc = document.getElementById("task__desc").value.trim();

  // Valider la date et la description de l'événement
  if (taskDesc && !isNaN(taskDate.getDate())) {
    // Obtenir les jours
    const calendarDays = document.getElementById("calendar").children;
    // Iteration sur les jour du calendrier
    for (let i = 0; i < calendarDays.length; i++) {
      const day = calendarDays[i];
      if (parseInt(day.textContent) === taskDate.getDate()) {
        // Création de l'événement
        const taskElement = document.createElement("div");
        taskElement.className = "task";
        taskElement.textContent = taskDesc;

        // Ecoute de l'événement contextmenu
        taskElement.addEventListener("contextmenu", (e) => {
          e.preventDefault(); // Suppression du comportement par défaut
          deleteTask(taskElement); // Appel de la fonction deleteTask ayant comme paramètre l'événement à supprimer
        });

        // Ecoute de l'événement click
        taskElement.addEventListener("click", () => {
          editTask(taskElement); // Appel de la fonction editTask
        });

        // Ajout de l'événement dans le DOM
        day.appendChild(taskElement);
        break;
      }
    }
    closeAddTaskModal(); // Appel de la fonction closeAddTaskModal
  } else {
    // Si date invalide ou description
    alert("Veuillez saisir une date valide et/ou une description");
  }
};

// Appel de la fonction generateCalendar dès le chargement de la page
window.onload = () => {
  generateCalendar();
};
