const form = document.getElementById('register-form');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const confirmPasswordInput = document.getElementById('confirm-password');
const errorMessage = document.getElementById('error-message');
const successMessage = document.getElementById('success-message');

form.addEventListener('submit', function(event) {
	event.preventDefault();

	// Récupération des valeurs des champs email et mot de passe
	const email = emailInput.value;
	const password = passwordInput.value;
	const confirmPassword = confirmPasswordInput.value;

	// Vérification de l'email et du mot de passe
	if (email === '') {
		errorMessage.textContent = 'L\'e-mail est requis';
	} else if (!isValidEmail(email)) {
		errorMessage.textContent = 'L\'e-mail est incorrect';
	} else if (password === '') {
		errorMessage.textContent = 'Le mot de passe est requis';
	} else if (password !== confirmPassword) {
		errorMessage.textContent = 'Les mots de passe ne correspondent pas';
	} else {
		// Envoi du formulaire au serveur (simulation)
		const isSuccess = simulateRegistration(email, password);

		// Affichage du message de succès ou d'erreur
		if (isSuccess) {
			successMessage.textContent = 'Inscription réussie';
			errorMessage.textContent = '';
		} else {
			errorMessage.textContent =		'Une erreur s\'est produite, veuillez réessayer plus tard';
            successMessage.textContent = '';
        }
    }
});

function isValidEmail(email) {
// Vérification de la validité de l'adresse e-mail à l'aide d'une expression régulière
const emailRegex = /^[^\s@]+@[^\s@]+.[^\s@]+$/;
return emailRegex.test(email);
}

function simulateRegistration(email, password) {
// Simulation de l'envoi du formulaire au serveur
// Ici, on considère que l'inscription est réussie si l'adresse e-mail est différente de "test@test.com"
return email !== 'test@test.com';
}




    
