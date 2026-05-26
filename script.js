// variables globales
let listeDesIdees = JSON.parse(localStorage.getItem('sunu_idees')) || [];
const formIdee = document.getElementById('form-idee');
const muredesIdees = document.getElementById('mur-idees');

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