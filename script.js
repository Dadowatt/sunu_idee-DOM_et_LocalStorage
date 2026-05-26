// variables globales
let listeDesIdees = JSON.parse(localStorage.getItem('sunu_idees')) || [];
const formIdee = document.getElementById('form-idee');

// Fonction dédiée à la création d'une nouvelle idée
function creerUneIdee(nouvelleIdee) {
    listeDesIdees.unshift(nouvelleIdee);
    localStorage.setItem('sunu_idees', JSON.stringify(listeDesIdees));
}

formIdee.addEventListener('submit', (e) => {
    e.preventDefault();

    const ideeA_Ajouter = {
        id: Date.now(),
        titre: document.getElementById('titre').value,
        categorie: document.getElementById('categorie').value,
        description: document.getElementById('description').value
    };

    creerUneIdee(ideeA_Ajouter);
    formIdee.reset();
});