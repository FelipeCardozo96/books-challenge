window.onload = function () {
  const db = require('../database/models');

  const inputEmail = document.getElementById('email');
  inputEmail.focus();

  const form = document.querySelector('#form');
  const password = document.getElementById('password');
  const emailExists =  db.User.findOne({ where: { email: 'email' } });

  form.addEventListener('submit', async (e) => {
      e.preventDefault();

      let errors = [];

      if (inputEmail.value == '') {
          inputEmail.classList.remove('valid');
          inputEmail.classList.add('errors');
          errors.push('El campo "usuario" es obligatorio.');
      } else {
          const response = await checkEmailExists(emailExists, inputEmail.value);

          if (!response.success) {
              errors.push('El correo electrónico no está registrado.');
          }

          inputEmail.classList.remove('errors');
          inputEmail.classList.add('valid');
      }

      if (password.value == '' || password.value.length < 7) {
          password.classList.remove('valid');
          password.classList.add('errors');
          errors.push('El campo contraseña está vacío o la contraseña es incorrecta.');
      } else {
          password.classList.remove('errors');
          password.classList.add('valid');
      }

      const ul = document.querySelector('.errores');

      if (errors.length != 0) {
          ul.innerHTML = '';
          ul.classList.add('alert-warning');
          for (let i = 0; i < errors.length; i++) {
              const error = errors[i];
              ul.innerHTML += `<li>${error}</li>`;
          }
          await Swal.fire({
              icon: 'error',
              title: 'Hubo un error!',
              text: 'Revisa los errores!'
          });
      } else {
          await Swal.fire({
              title: "Buen trabajo!",
              text: "Te logueaste!",
              icon: "success"
          }).then(() => {
              form.submit();
          });
      }
  });

  async function checkEmailExists(url, email) {
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email }),
        });

        return await response.json();
    } catch (error) {
        console.error('Error en la verificación del correo electrónico:', error);
        return { success: false };
    }
}
};