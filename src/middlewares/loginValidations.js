window.onload = function() {
    const inputEmail = document.getElementById('email');
    inputEmail.focus();
    const form = document.querySelector('#form');
    const password = document.getElementById('#password')
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      let errors = [];
      console.log('hola');
      if (form.email.value == '') {
        form.email.classList.remove('.valid');
        form.email.classList.add('.errors');
        errors.push('El campo "usuario" es obligatorio.');
      } else {
        form.email.classList.remove('errors');
        form.email.classList.add('valid');
      }
      if (form.password.value == '' || form.password.value.length < 7) {
        form.password.classList.remove('.valid');
        form.password.classList.add('.errors');
        errors.push('El campo contraseña está vacío o la contraseña es incorrecta.');
      } else {
        form.password.classList.remove('errors');
        form.password.classList.add('valid');
      }
      const ul = document.querySelector('.errores');
  
      if (errors.length != 0) {
        ul.innerHTML = '';
        ul.classList.add('alert-warning');
        for (let i = 0; i < errors.length; i++) {
          const error = errors[i];
          ul.innerHTML += `<li>${error}</li>`;
        }
        Swal.fire(
          {
            icon: 'error',
            title: 'Hubo un error!',
            text: 'Revisa los errores!'
          }
        );
      } else {
        Swal.fire({
          title: "Buen trabajo!",
          text: "Te logueaste!",
          icon: "success"
        }).then(() => {
          form.submit();
        });
      }
    });
  };