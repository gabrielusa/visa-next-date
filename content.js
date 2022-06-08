
Notification.requestPermission(/* opcional: callback */);

function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

setInterval(async() => {
    var url_atual = window.location.href;
    var url_login = 'https://ais.usvisa-info.com/pt-br/niv/users/sign_in';
    var url_pay = 'https://ais.usvisa-info.com/pt-br/niv/schedule/39962141/payment';
    var best_find;

    // console.log("url:", url_atual)

    if(url_atual == url_pay){
        location.reload();
        await sleep(1000);

        var email = window.localStorage.getItem('email');
        var senha =  window.localStorage.getItem('senha');

        var proximaData = document.querySelector('tbody .text-right').innerText;
        var ultimaDataVista = window.localStorage.getItem('ultimaDataVista');
        var texto = "próxima data: " + proximaData;

        console.log("ultimaDataVista:", ultimaDataVista )
        console.log("proximaData:",proximaData);

        window.localStorage.setItem('ultimaDataVista', proximaData);

        var compara = comparaData(proximaData);
        if(compara == '1'){
            console.log("ta comparando")
            var notification = new Notification(("data melhor: " + proximaData), {
                body: ("essa é a proxima data definida em Brasília.", proximaData)
            });
            var melhordata = melhorData(proximaData);
            if(melhordata == '1'){
                var aux = lerData(proximaData);
                window.localStorage.setItem('melhorDia', aux[0]);
                window.localStorage.setItem('melhorMes', aux[1]);
                window.localStorage.setItem('melhorAno', aux[2]);
            }
        }

        // console.log("dia: ", window.localStorage.getItem('lerDia'));
        // console.log("mes: ", window.localStorage.getItem('lerMes'));
        // console.log("ano: ", window.localStorage.getItem('lerAno'));
        console.log("melhor data até agora:",window.localStorage.getItem('melhorDia'),window.localStorage.getItem('melhorMes'),window.localStorage.getItem('melhorAno'))
        
        // pega proximaData
        // if proximaData < dataMarcada
        // salva no historico e dá um alerta!
    }

    else{    
        if(url_atual == url_login){
            console.log("Estamos na página de login")


            if(window.localStorage.getItem('email') == null || window.localStorage.getItem('password') == null) {
                let email = prompt('Digite seu email: ');
                window.localStorage.setItem('email', email);

                let password = prompt('Digite sua senha: ');
                window.localStorage.setItem('password', password);
            }

            console.log('Email: ' + localStorage.getItem('email'));
            console.log('Senha: ' + localStorage.getItem('password'));

            document.getElementById('user_email').value = localStorage.getItem('email');
            document.getElementById('user_password').value = localStorage.getItem('password');

            let setID = document.getElementById('policy_confirmed');
            setID.checked = true;
            console.log("cliquei na checkbox");
            await sleep(300);

            let button = document.querySelector('.button');

            button.click();
            console.log("cliquei em fazer login");
            await sleep(300);
        }
        else{

            console.log("esta página é estranha, vou redirecionar para a página de pagamento")
            window.location.href = url_pay; 
        }}
        console.log(' ');

}, 31000);


function lerData(data) {
    var dia = data[0]+data[1];
    var ano = data[data.length-4]+data[data.length-3]+data[data.length-2]+data[data.length-1];
    var mes;

    if (data[1] == ' '){
        dia = 0+data[0];
    }
    mes = data.replace(dia, '');
    mes = mes.replace(ano, '');
    mes = mes.replace(',', '');
    mes = mes.replace(' ', '');
    mes = mes.replace('0', '');
    mes = mes.replace('1', '');
    mes = mes.replace('2', '');
    mes = mes.replace('3', '');
    mes = mes.replace('4', '');
    mes = mes.replace('5', '');
    mes = mes.replace('6', '');
    mes = mes.replace('7', '');
    mes = mes.replace('8', '');
    mes = mes.replace('9', '');

    if(mes == "Maio "){mes = 05}
    if(mes == "Março "){mes = 03}
    if(mes == "Abril "){mes = 04}
    if(mes == "Junho "){mes = 06}
    if(mes == "Julho "){mes = 07}
    if(mes == "Agosto "){mes = 08}
    if(mes == "Janeiro "){mes = 01}
    if(mes == "Outubro "){mes = 10}
    if(mes == "Setembro "){mes = 09}
    if(mes == "Novembro "){mes = 11}
    if(mes == "Dezembro "){mes = 12}
    if(mes == "Fevereiro "){mes = 02}

    window.localStorage.setItem('lerDia', dia);
    window.localStorage.setItem('lerMes', mes);
    window.localStorage.setItem('lerAno', ano);

    return [dia, mes, ano]
}

function comparaData(data){
    // return 0 para data ruim
    // return 1 para data boa

    let proximaData = lerData(data);
    var dia = proximaData[0];
    var mes = proximaData[1];
    var ano = proximaData[2];
    var diaMarcado = window.localStorage.getItem('diaMarcado');
    var mesMarcado = window.localStorage.getItem('mesMarcado');
    var anoMarcado = window.localStorage.getItem('anoMarcado');
    

    if(anoMarcado < ano){
        console.log("Ano superior")
        return '0'
    }
    else if(anoMarcado == ano && mesMarcado < mes){
        console.log("mes superior")
        return '0'
    }
    else if(anoMarcado == ano && mesMarcado == mes && diaMarcado < dia){
        console.log("dia superior")
        return '0'
    }
    else if(anoMarcado == ano && mesMarcado == mes && diaMarcado == dia){
        console.log("dia igual")
        return '0'
    }
    else{
        console.log("data mais próxima")
        return '1'
    }
}

function melhorData(data){
    // return 0 para data ruim
    // return 1 para data boa

    let proximaData = lerData(data);
    var dia = proximaData[0];
    var mes = proximaData[1];
    var ano = proximaData[2];
    var melhorDia = window.localStorage.getItem('melhorDia');
    var melhorMes = window.localStorage.getItem('melhorMes');
    var melhorAno = window.localStorage.getItem('melhorAno');
    
    console.log("dia: ", dia, "mes: ", mes, "ano", ano);

    if(melhorAno > ano){
        console.log("melhor data por ano")
        return '1'
    }
    else if(melhorAno == ano && melhorMes > mes){
        console.log("melhor data por mes")
        return '1'
    }
    else if(melhorAno == ano && melhorMes == mes && melhorDia > dia){
        console.log("melhor data por dia")
        return '1'
    }
    else{
        console.log("n é a melhor data")
        return '0'
    }
}

