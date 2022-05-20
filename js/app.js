const btnSend = document.querySelector('#enviar');
const btnReset = document.querySelector('#resetBtn');
const email = document.querySelector('#email');
const asunto = document.querySelector('#asunto');
const mensaje = document.querySelector('#mensaje');
const form = document.querySelector('#enviar-mail');
const emailRegex =
	/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

eventListeners();

function eventListeners() {
	// wait until DOM is completly loaded
	document.addEventListener('DOMContentLoaded', startApp);

	// inputs eventListeners
	email.addEventListener('blur', formValidations);
	asunto.addEventListener('blur', formValidations);
	mensaje.addEventListener('blur', formValidations);

	// reset the form
	btnReset.addEventListener('click', resetForm);

	// form submit
	form.addEventListener('submit', sendEmail);
}

function startApp() {
	btnSend.disabled = true;
	btnSend.classList.add('cursor-not-allowed', 'opacity-50');
}

function formValidations(e) {
	const errors = document.querySelector('p.error');

	if (e.target.value.length > 0) {
		if (errors) errors.remove();

		inputPassValidations(e.target);
	} else {
    inputFailValidation(e.target);
		showErrorAlert('Por favor complete todos los campos');
	}

	if (e.target.type === 'email') {
		if (emailRegex.test(e.target.value)) {
			if (errors) errors.remove();

			inputPassValidations(e.target);
		} else {
			inputFailValidation(e.target);
			showErrorAlert('Por favor ingrese un mail valido');
		}
	}

	if (
		emailRegex.test(email.value) &&
		asunto.value != '' &&
		mensaje.value != ''
	) {
		btnSend.disabled = false;
		btnSend.classList.remove('cursor-not-allowed', 'opacity-50');
	}
}

// paint input border on red
function inputFailValidation(target) {
  target.classList.remove('border', 'border-green-500');
	target.classList.add('border', 'border-red-500');
}

// paint input border on green
function inputPassValidations(target) {
  target.classList.remove('border', 'border-red-500');
	target.classList.add('border', 'border-green-500');
}

// show an error message
function showErrorAlert(message) {
	const errorMessage = document.createElement('p');
	errorMessage.textContent = message;
	errorMessage.classList.add(
		'border',
		'border-red-500',
		'backgound-red-100',
		'text-red-500',
		'p-3',
		'mt-5',
		'text-center',
		'error'
	);

	const errors = document.querySelectorAll('.error');
	if (errors.length <= 0) form.appendChild(errorMessage);
}

// Simulate sending an error.
function sendEmail(e) {
	e.preventDefault();

	const spinner = document.querySelector('#spinner');
	spinner.style.display = 'flex';

	setTimeout(() => {
		spinner.style.display = 'none';

		// Create a new message
		const p = document.createElement('p');
		p.textContent = 'Email enviado correctamente';
		p.classList.add(
			'text-center',
			'my-10',
			'p-2',
			'bg-green-500',
			'text-white',
			'font-bold',
			'uppercase'
		);

		// Insert message into form body
		form.insertBefore(p, spinner);

		// Delete message after 5 seconds
		setTimeout(() => {
			p.remove();
			resetForm();
		}, 5000);
	}, 3000);
}

function resetForm() {
	form.reset();
	startApp();
}
