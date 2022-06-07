
// Notification.requestPermission(/* opcional: callback */);


function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

function lerData(data) {
    var dia = data;
    var mes = data;
    var ano = data;

    // dia = 2 primeiros digitos
    // mes = 4° digito até a virgula
    // ano = ultimos 4 digitos

    if(mes = "Janeiro"){mes = 1}
    if(mes = "Fevereiro"){mes = 2}
    if(mes = "Março"){mes = 3}
    if(mes = "Abril"){mes = 4}
    if(mes = "Maio"){mes = 5}
    if(mes = "Junho"){mes = 6}
    if(mes = "Julho"){mes = 7}
    if(mes = "Agosto"){mes = 8}
    if(mes = "Setembro"){mes = 9}
    if(mes = "Outubro"){mes = 10}
    if(mes = "Novembro"){mes = 11}
    if(mes = "Dezembro"){mes = 12}

    return dia,mes,ano
}


setInterval(async() => {
    var url_atual = window.location.href;
    var url_login = 'https://ais.usvisa-info.com/pt-br/niv/users/sign_in';
    var url_pay = 'https://ais.usvisa-info.com/pt-br/niv/schedule/39894926/payment';
    var best_find;

    console.log("url:", url_atual)

    

    if(url_atual == url_pay){
        // location.reload();
        var email = window.localStorage.getItem('email');
        var senha =  window.localStorage.getItem('senha');

        var proximaData = document.querySelector('tbody .text-right').innerText;
        var proximaDataBsb = window.localStorage.getItem('proximaDataBsb');
        console.log("proximaDataBsb:", proximaDataBsb )

        console.log("if pagina pay");
        console.log(proximaData);
        window.localStorage.setItem('proximaDataBsb', proximaData);

        var texto = "próxima data: " + proximaData;

        var notification2 = new Notification(texto, {
            body: "essa é a proxima data definida pelo Consul em Brasília."
        });

        if(proximaDataBsb =! proximaData){
            console.log("mudou alguma coisa")
        }
        // pega proximaData
        // if proximaData < dataMarcada
        // salva no historico e dá um alerta!
    }

    else{    
        if(url_atual == url_login){


            if(window.localStorage.getItem('email') == null || window.localStorage.getItem('password') == null) {
                let email = prompt('Digite seu email: ');
                window.localStorage.setItem('email', email);

                let password = prompt('Digite sua senha: ');
                window.localStorage.setItem('password', password);
            }

            console.log('Email: ' + localStorage.getItem('email'));
            console.log('Senha: ' + localStorage.getItem('password'));

            console.log("if pagina login")
            //verifica se ta preenchido, se n tiver da alerta de erro

            document.getElementById('user_email').value = localStorage.getItem('email');
            document.getElementById('user_password').value = localStorage.getItem('password');

            let setID = document.getElementById('policy_confirmed');
            setID.checked = true;

            let button = document.querySelector('.button');

            button.click();
            await sleep(300);
            console.log("clico")
        }
        else{

            console.log("if pagina estranha")
            window.location.href = url_pay; 
        }}

}, 4500);
