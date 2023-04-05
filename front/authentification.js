const form = document.getElementById('login-form');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const errorMessage = document.getElementById('error-message');

form.addEventListener('submit', function(event) {
	event.preventDefault();

	// Récupération des valeurs des champs email et mot de passe
	const email = emailInput.value;
	const password = passwordInput.value;

	// Vérification de l'email et du mot de passe
	if (email !== 'exemple@mail.com' || password !== 'motdepasse') {
		errorMessage.textContent = 'E-mail ou mot de passe incorrect';
	} else {
		// Redirection vers la page de succès
		window.location.href = 'succes.html';
	}
});
