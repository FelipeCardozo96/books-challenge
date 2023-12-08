window.onload = function() {
    const inputUser = document.querySelector('#user');
    inputUser.focus();
    const form = document.querySelector('form');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        let errores = []
        
        if(form.user.value == '') {
            form.user.classList.remove('.valid');
            form.user.classList.add('.errors');
            errores.push('El campo "usuario" es obligatorio.');
        } else {
            form.user.classList.remove('errors');
            form.user.classList.add('valid');
        }
        if(form.password.value == '') {
            form.password.classList.remove('.valid');
            form.password.classList.add('.errors');
            errores.push('El campo "contraseña" es obligatorio.');
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
                text : 'Revisa los errores!'
            }
            )
        }else {
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