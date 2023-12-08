window.onload = function() {
    const inputName = document.querySelector('#user');
    inputName.focus();
    const form = document.querySelector('form');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        let errores = []

        if(form.nombre.value == '' || form.nombre.value.length < 2) {
            form.nombre.classList.remove('valid');
            form.nombre.classList.add('errors');
            errores.push('El nombre debe de tener al menos 2 caracteres.');
        } else {
            form.nombre.classList.remove('errors');
            form.nombre.classList.add('valid');
        }
        if(form.email.value == '' || form.email.value.length < 2) {
            form.email.classList.remove('valid');
            form.email.classList.add('errors');
            errores.push('El correo electronico debe ser valido.');
        } else {
            form.correo.classList.remove('errors');
            form.correo.classList.add('valid');
        }
        if(form.country.value == '' || form.country.value.length < 8) {
            form.country.classList.remove('valid');
            form.country.classList.add('errors');
            errores.push('Selecciona un país.');
        } else {
            form.country.classList.remove('errors');
            form.country.classList.add('valid');
        }
        if(form.password.value == '' || form.password.value.length < 8) {
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
            Swal.fire(
                {icon : 'error',
                title : 'Hubo un error!',
                text : 'Revisar los errores!'
            }
            )
        } else {
          Swal.fire(
            'Buen trabajo!',
            'Te registraste con exito!',
            'success'
          ).then (()=> {
            form.submit()
          })
          }
        })
}