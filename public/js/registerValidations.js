window.onload = function() {
  const inputName = document.querySelector('#name'); 
  inputName.focus();
  const form = document.querySelector('form');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let errores = []
    if (form.name.value == '' || form.name.value.length < 4) {
      form.name.classList.remove('valid');
      form.name.classList.add('errors');
      errores.push('El nombre debe tener al menos 4 caracteres.');
    } else {
      form.name.classList.remove('errors');
      form.name.classList.add('valid');
    }

    if (form.email.value == '' || form.email.value.length < 2) {
      form.email.classList.remove('valid');
      form.email.classList.add('errors');
      errores.push('El correo electrónico debe ser válido.');
    } else {
      form.email.classList.remove('errors');
      form.email.classList.add('valid');
    }

    if (form.country.value == '' || form.country.value.length < 3) {
      form.country.classList.remove('valid');
      form.country.classList.add('errors');
      errores.push('Selecciona un país.');
    } else {
      form.country.classList.remove('errors');
      form.country.classList.add('valid');
    }

    if (form.password.value == '' || form.password.value.length < 8) {
      form.password.classList.remove('valid');
      form.password.classList.add('errors');
      errores.push('La contraseña debe tener al menos 8 caracteres.');
    } else {
      form.password.classList.remove('errors');
      form.password.classList.add('valid');
    }

    const ul = document.querySelector('.errores');

    if (errores.length != 0) {
      ul.innerHTML = ''
      ul.classList.add('alert-warning');
      for (let i = 0; i < errores.length; i++) {
        const error = errores[i];
        ul.innerHTML += `<li>${error}</li>`;
      }
      Swal.fire({
        icon: 'error',
        title: 'Hubo un error!',
        text: 'Revisa los errores!'
      });
    } else {
      Swal.fire(
        'Buen trabajo!',
        'Te registraste con éxito!',
        'success'
      ).then(() => {
        form.submit();
      });
    }
  });
}