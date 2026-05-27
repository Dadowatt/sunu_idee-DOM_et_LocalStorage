// variables globales
let listeDesIdees = JSON.parse(localStorage.getItem('sunu_idees')) || [];
const formIdee = document.getElementById('form-idee');
const muredesIdees = document.getElementById('mur-idees');
let idEnCoursDeModification = null;

// Fonction pour la création d'une nouvelle idée
function creerUneIdee(nouvelleIdee) {
    listeDesIdees.unshift(nouvelleIdee);
    localStorage.setItem('sunu_idees', JSON.stringify(listeDesIdees));
}

// Fonction logique pour modifier une idée dans le tableau et sauvegarder
function modifierUneIdee(ideeModifiee) {
    const ideeA_Modifier = listeDesIdees.find(idee => idee.id === ideeModifiee.id);

    if (ideeA_Modifier) {
        ideeA_Modifier.titre = ideeModifiee.titre;
        ideeA_Modifier.categorie = ideeModifiee.categorie;
        ideeA_Modifier.description = ideeModifiee.description;

        localStorage.setItem('sunu_idees', JSON.stringify(listeDesIdees));
    }
}

formIdee.addEventListener('submit', (e) => {
    e.preventDefault();

    const titreTape = document.getElementById('titre').value;
    const categorieChoisie = document.getElementById('categorie').value;
    const descriptionTapee = document.getElementById('description').value;

    if (idEnCoursDeModification !== null) {

        const ideeModifiee = {
            id: idEnCoursDeModification,
            titre: titreTape,
            categorie: categorieChoisie,
            description: descriptionTapee
        };

        modifierUneIdee(ideeModifiee);
        
        idEnCoursDeModification = null;
        const boutonSoumettre = formIdee.querySelector('button[type="submit"]');
        boutonSoumettre.innerHTML = "Soumettre l'idée";
        boutonSoumettre.classList.replace('bg-green-600', 'bg-black');

    } else {
        
        const ideeA_Ajouter = {
            id: Date.now(),
            titre: titreTape,
            categorie: categorieChoisie,
            description: descriptionTapee
        };

        creerUneIdee(ideeA_Ajouter);
    }

    afficherLeMur();
    formIdee.reset();
});

muredesIdees.addEventListener('click', (e) => {
    const boutonEditer = e.target.closest('.btn-editer');

    if (boutonEditer) {
        const carteHTML = e.target.closest('[data-id]');
        const idA_Modifier = Number(carteHTML.dataset.id);
        const ideeTrouvee = listeDesIdees.find(idee => idee.id === idA_Modifier);
        
        if (ideeTrouvee) {
            document.getElementById('titre').value = ideeTrouvee.titre;
            document.getElementById('categorie').value = ideeTrouvee.categorie;
            document.getElementById('description').value = ideeTrouvee.description;

            idEnCoursDeModification = ideeTrouvee.id;

            const boutonSoumettre = formIdee.querySelector('button[type="submit"]');
            boutonSoumettre.innerHTML = "Enregistrer les modifications";
            boutonSoumettre.classList.replace(
    'bg-black',
    'bg-green-600'
); 
        }
    }
});


// Fonction pour afficher les idées sur le mur
function afficherLeMur() {
    muredesIdees.innerHTML = ""; 

    listeDesIdees.forEach(idee => {
        
        const carteHTML = `
            <div class="bg-white p-5 rounded-xl border border-slate-100 shadow-xs flex flex-col justify-between min-h-[200px]" data-id="${idee.id}">
                <div>
                    <div class="flex justify-between items-center mb-3">
                        <span class="bg-slate-100 text-slate-700 text-[10px] font-bold px-2 py-0.5 rounded-sm uppercase tracking-wider">
                            ${idee.categorie}
                        </span>
                        <span class="text-[10px] text-slate-400">Enregistré</span>
                    </div>
                    <h3 class="font-bold text-slate-900 text-base mb-2">${idee.titre}</h3>
                    <p class="text-slate-500 text-xs leading-relaxed">${idee.description}</p>
                </div>
                <div class="flex justify-between items-center mt-6 pt-3 border-t border-slate-50 text-[11px] text-slate-400">
                    <div class="flex gap-3">
                        <button class="hover:text-slate-700 flex items-center gap-1 cursor-pointer btn-editer">
                            <span><i class="fa-solid fa-pencil"></i></span> Éditer
                        </button>
                        <button class="hover:text-red-600 flex items-center gap-1 cursor-pointer btn-supprimer">
                            <span><i class="fa-solid fa-trash-can"></i></span> Supprimer
                        </button>
                    </div>
                    <span class="flex items-center gap-1 font-medium text-slate-600">
                        <span><i class="fa-solid fa-thumbs-up"></i></span> 0
                    </span>
                </div>
            </div>
        `;

        muredesIdees.insertAdjacentHTML('beforeend', carteHTML);
    });
}

afficherLeMur();

