const btnSend = document.querySelector('#enviar');
const email = document.querySelector('#email');
const asunto = document.querySelector('#asunto');
const mensaje = document.querySelector('#mensaje');
const form = document.querySelector('#enviar-mail');
const emailRegex =
	/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

eventListeners();

function eventListeners() {
	document.addEventListener('DOMContentLoaded', startApp);

	email.addEventListener('blur', formValidations);
	asunto.addEventListener('blur', formValidations);
	mensaje.addEventListener('blur', formValidations);
}

function startApp() {
	btnSend.disabled = true;
	btnSend.classList.add('cursor-not-allowed', 'opacity-50');
}

function formValidations(e) {
	if (e.target.value.length > 0) {
		const errors = document.querySelector('p.error');
		errors.remove();

		e.target.classList.remove('border', 'border-red-500');
		e.target.classList.add('border', 'border-green-500');
	} else {
		e.target.classList.remove('border', 'border-green-500');
		e.target.classList.add('border', 'border-red-500');

		showErrorAlert('Por favor complete todos los campos');
	}

	if (e.target.type === 'email') {
		if (emailRegex.test(e.target.value)) {
			const errors = document.querySelector('p.error');
			errors.remove();

			e.target.classList.remove('border', 'border-red-500');
			e.target.classList.add('border', 'border-green-500');
		} else {
			e.target.classList.remove('border', 'border-green-500');
			e.target.classList.add('border', 'border-red-500');
			showErrorAlert('Por favor ingrese un mail valido');
		}
	}
}

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
