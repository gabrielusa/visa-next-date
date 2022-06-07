
setInterval(() => {
    location.reload();

    var url_atual = window.location.href;
    var url_login = 'https://ais.usvisa-info.com/pt-br/niv/users/sign_in';
    var url_pay = 'https://ais.usvisa-info.com/pt-br/niv/schedule/39894926/payment';
    console.log("url:", url_atual)

    if(url_atual == url_pay){
        var proximaData = document.querySelector('tbody .text-right').innerText;
        var proximaDataBsb = window.localStorage.getItem('proximaDataBsb');
        console.log("proximaDataBsb:", proximaDataBsb )

        console.log("if pagina pay");
        console.log(proximaData);
        window.localStorage.setItem('proximaDataBsb', proximaData);

        if(proximaDataBsb =! proximaData){
            console.log("mudou alguma coisa")
        }
        // pega proximaData
        // if proximaData < dataMarcada
        // salva no historico e dá um alerta!
    }

    else{    
        if(url_atual == url_login){

            console.log("if pagina login")
            //verifica se ta preenchido, se n tiver da alerta de erro
            let setID = document.getElementById('policy_confirmed');
            setID.checked = true;

            let button = document.querySelector('.button');

            setTimeout( () => {
                button.click();
                console.log("clico")
            } ,2000)
        }
        else{

            console.log("if pagina estranha")
            window.location.href = url_pay; 
        }}
        
}, 31000);
