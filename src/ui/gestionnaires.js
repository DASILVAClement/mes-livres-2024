// gestionnaires d'événements

import {estLuLivre, insererLivre, supprimerLivre} from "../services/livreService.js"
import {afficherLivres} from "./render.js";

export const setupGestionnaires = () => {

    // Récupérer les élements dans le DOM
    const toggleFormBtn = document.querySelector('#toggleFormBtn');
    const formSection = document.querySelector('#formSection');
    const formCollapse = new bootstrap.Collapse(formSection, {toggle: false})
    const livreForm = document.querySelector('#bookForm')

    // Gestionnaire clic bouton toggleFormBtn
    toggleFormBtn.addEventListener('click', () => {
        formCollapse.toggle()
    });

    // On reset le formulaire lorsque celui-ci est caché
    formSection.addEventListener('hidden.bs.collapse', () => {
        livreForm.reset()
    })

    // Traitement du formulaire
    livreForm.addEventListener('submit', (evt) => {
        // Empêcher le refresh de la page
        evt.preventDefault();
        // Récupérer les valeurs saisies
        const titre = livreForm.title.value;
        const auteur = livreForm.author.value;
        const resume = livreForm.summary.value;
        const estLu = livreForm.isRead.checked;


        // Sauvegarder les données saisies
        insererLivre(titre, auteur, resume, estLu)

        // Cacher (collapse) le formulaire
        formCollapse.hide()

        // Affiche la liste des livres
        afficherLivres()
    })

    // Traitement de la suppression d'un livre
    // Délégation d'événements
    const listeLivres = document.querySelector('#booksList')
    listeLivres.addEventListener('click', (evt) => {
        // Récupérer l'élément sur lequel on a cliqué
        const target = evt.target.closest('.delete-btn, .toggle-read-btn')
        if (target===null) return
        // Récupérer l'id du livre à supprimer à partir du data-id(dataset)
        const idLivre = target.dataset.id
        if (target.classList.contains('delete-btn')) {
            supprimerLivre(idLivre)
            afficherLivres()
        }else if (target.classList.contains('toggle-read-btn')) {
            estLuLivre(idLivre)
            afficherLivres()
        }

    })
}