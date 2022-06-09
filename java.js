
    let btnEmail = document.getElementById('btn-email');
    let email = document.getElementById('email');
    let btnSenha = document.getElementById('btn-senha');
    let senha = document.getElementById('senha');
    var subtextStyle = document.getElementById('subtext').style;
    let btnDate = document.getElementById('btn-date');


    // setando valores locais já salvos
    email.value = window.localStorage.getItem('email');
    senha.value = window.localStorage.getItem('password');
    document.querySelector('#date-dia').value = window.localStorage.getItem('diaMarcado');
    document.querySelector('#date-mes').value = window.localStorage.getItem('mesMarcado');
    document.querySelector('#date-ano').value = window.localStorage.getItem('anoMarcado');

    btnReload.onclick = () => {
        console.log("clicou em reload")
        email.value = window.localStorage.getItem('email');
        senha.value = window.localStorage.getItem('password');
        document.querySelector('#date-dia').value = window.localStorage.getItem('diaMarcado');
        document.querySelector('#date-mes').value = window.localStorage.getItem('mesMarcado');
        document.querySelector('#date-ano').value = window.localStorage.getItem('anoMarcado');
    }

    btnEmail.onclick = () => {
        window.localStorage.setItem('email', document.querySelector('#email').value);
        document.querySelector('#email').value = window.localStorage.getItem('email');
        console.log("Um novo valor de email foi associado a esta url")
    }

    btnSenha.onclick = () => {
        window.localStorage.setItem('password', document.querySelector('#senha').value);
        document.querySelector('#senha').value = window.localStorage.getItem('password');
        console.log("Um novo valor de senha foi associado a esta url")
    }

    btnDate.onclick = () => {
        window.localStorage.setItem('diaMarcado', document.querySelector('#date-dia').value);
        window.localStorage.setItem('mesMarcado', document.querySelector('#date-mes').value);
        window.localStorage.setItem('anoMarcado', document.querySelector('#date-ano').value);
    }
