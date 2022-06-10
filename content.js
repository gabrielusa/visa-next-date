// INFORME AS VARIÁVEIS:

    // Informe o seu Login e Senha.
var meuEmail = 'seu_email@hotmail.com';
var meuSenha = 'minha_senha12';

    // Informe o número do processo, é o número que aparece na sua URL após "/schedule/"
        // Em desenvolvimento!
var numero_processo = 39894926;

// 39894926     conta gabriel
// 39962141     conta teste

    // Você já fez o pagamento da taxa? 1 sim, 2 não (página de agendamento só é liberada após pagamento e marcação).
var url_agenda_livre = 1;

    // infome a data interessante limite (maior data que receberá alertas).
var diaMarcado = 19;
var mesMarcado = 7;
var anoMarcado = 2023;

    // Informe de quanto em quanto tempo o bot recarregará a página.
       // Valores muito baixos podem causar "TOO MANY REQUEST 429". (recomendo: 61s.)
var delay = 4; // Em segundos.

    // Informe uma data inválida para ser ignorada
var diaBloqueado = 13;
var mesBloqueado = 6;
var anoBloqueado = 2022;

    // escolha a cidade (somente pagina de pagamento).
        // Em desenvolvimento!
var cidade= 0;

        // Brasília = 0
        // Rio de Janeiro = 1
        // São Paulo = 2
        // Recife = 3
        // PortoAlegre = 4

var url_atual = window.location.href;
var url_login = 'https://ais.usvisa-info.com/pt-br/niv/users/sign_in';
var url_pay = `https://ais.usvisa-info.com/pt-br/niv/schedule/${numero_processo}/payment`;
var url_agenda = `https://ais.usvisa-info.com/pt-br/niv/schedule/${numero_processo}/appointment`;

// função para permitir notificações no navegador, não apague. Se apagar habilite manualmente as notificações.
Notification.requestPermission(/* opcional: callback */);


    // -> INICIO DA FUNÇÃO PRINCIPAL <- //

setInterval(async() => {
    // await window.location.reload();
    console.log("url atual:", url_atual);

    if(url_atual == url_pay){

        var proximaData = document.querySelector('tbody .text-right').innerText;
        var ultimaDataVista = window.localStorage.getItem('ultimaDataVista');

        console.log("ultimaDataAnotada:", ultimaDataVista );
        console.log("Data exposta:",proximaData);

        window.localStorage.setItem('ultimaDataVista', proximaData);

        var compara = comparaDataPortugues(proximaData);
        if(compara == '1'){
            console.log("ta comparando")
            new Notification(("data melhor: " + proximaData), {
                body: ("essa é a proxima data definida em Brasília.", proximaData)
            });
            // var melhordataPortugues = melhorDataPortugues(proximaData);
            // if(melhordataPortugues == '1'){
            //     var aux = lerDataPortugues(proximaData);
            //     window.localStorage.setItem('melhorDia', aux[0]);
            //     window.localStorage.setItem('melhorMes', aux[1]);
            //     window.localStorage.setItem('melhorAno', aux[2]);
            // }

        }else{
            console.log("data não interessante")
        }
    }
    else if(url_atual == url_agenda){

        console.log("Estamos na página de Agendamento")
        
        var proximoDia = null ;
        var proximoMes ;
        var proximoAno ;



        await sleep(3000);

        var carregarMais = document.getElementsByClassName('ui-datepicker-next');
        var calendario = document.querySelector('#appointments_consulate_appointment_date');

        console.log("calendario: ",  calendario)
        
        calendario.click();

        while(proximoDia == null){
            console.log("primeiro while")
            try {
                proximoDia = document.querySelector('tbody tr td a');
                console.log("primeiro try, proximoDia: ", proximoDia)
            } catch(error){
                carregarMais[0].click();
                console.log("primeiro catch")
            }
        }

        try {
            proximoDia = document.querySelectorAll('tbody tr td a')[0].innerText;
            proximoMes = document.querySelectorAll('tbody tr td a')[0].parentNode.attributes[3].value;
            proximoMes ++;
            proximoAno = document.querySelectorAll('tbody tr td a')[0].parentNode.attributes[4].value;

        } catch (error) {
            console.log("deu erro dentro da função depois While(proximoDia === null)")
        }

        console.log("proxima dia liberado:", proximoDia);
        console.log("proxima mes liberado:", proximoMes);
        console.log("proxima ano liberado:", proximoAno);


        var compara = comparaDataCalendario(proximoDia, proximoMes, proximoAno);
        console.log("compara: ", compara)
        if(compara == '1'){
            console.log("data interessante")
            new Notification(("data melhor: " + "" + proximoDia + "/" + proximoMes + "/" + proximoAno), {
                body: ("essa é a proxima data definida em Brasília." + "" + proximoDia + "/" + proximoMes + "/" + proximoAno)
            });

        }else if(compara == '2'){ // SIGNIFICA Q A PRIMEIRA DATA É BLOQUEADA
            console.log("entrou na compara 2")
            console.log("data entrando na compara 2: ", document.querySelectorAll('tbody tr td a')[1].innerText )

            try { // SE HOUVER UM SEGUNDO VALOR BOM EM SEQUENCIA DISPARA:
                proximoDia = document.querySelectorAll('tbody tr td a')[1];
                proximoDia = document.querySelectorAll('tbody tr td a')[1].innerText;
                proximoMes = document.querySelectorAll('tbody tr td a')[1].parentNode.attributes[3].value;
                proximoMes ++;
                proximoAno = document.querySelectorAll('tbody tr td a')[1].parentNode.attributes[4].value;

                var compara = comparaDataCalendario(proximoDia, proximoMes, proximoAno);
                if(compara == '1'){
                    console.log("data interessante")
                    new Notification(("data melhor: " + "" + proximoDia + "/" + proximoMes + "/" + proximoAno), {
                        body: ("essa é a proxima data definida em Brasília." + "" + proximoDia + "/" + proximoMes + "/" + proximoAno)
                    });
                }

                
            } catch (error) { // SE NAO HOUVER UM SEGUNDO VALOR BOM EM SEQUENCIA DISPARA:

                console.log("entrou na compara 2 e no if")

                console.log("data não interessante")
                carregarMais[0].click();
                carregarMais[0].click();
    
                while(document.querySelectorAll('tbody tr td a')[0].innerText == null){
                    console.log('proximo dia: ', proximoDia)
    
                    try {
                        proximoDia = document.querySelectorAll('tbody tr td a')[0].innerText;
                        console.log('proximo dia try: ', proximoDia)
                    } catch(error){
                        carregarMais[0].click();
                        console.log('skipando: ', proximoDia)
                    }

                    console.log('proximo dia2: ', proximoDia)
                }
        
                try {
                    proximoDia = document.querySelectorAll('tbody tr td a')[0];
                    proximoDia = document.querySelectorAll('tbody tr td a')[0].innerText;
                    proximoMes = document.querySelectorAll('tbody tr td a')[0].parentNode.attributes[3].value ;
                    proximoMes ++;
                    proximoAno = document.querySelectorAll('tbody tr td a')[0].parentNode.attributes[4].value;
        
                } catch (error) {
                    console.log("deu erro dentro da função depois While(proximoDia === null)")
                }
    
                var compara = comparaDataCalendario(proximoDia, proximoMes, proximoAno);
                if(compara == '1'){
                    console.log("data interessante")
                    new Notification(("data melhor: " + "" + proximoDia + "/" + proximoMes + "/" + proximoAno), {
                        body: ("essa é a proxima data definida em Brasília." + "" + proximoDia + "/" + proximoMes + "/" + proximoAno)
                    });
                }
            }
        }
    }

    else if(url_atual == url_login){

            console.log("Estamos na página de login")

            if(window.localStorage.getItem('email') == null || window.localStorage.getItem('password') == null) {
                let email = prompt('Digite seu email: ');
                window.localStorage.setItem('email', email);

                let password = prompt('Digite sua senha: ');
                window.localStorage.setItem('password', password);
            }

            console.log('Email Salvo: ' + localStorage.getItem('email'));
            console.log('Senha Salva: ' + localStorage.getItem('password'));

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
        console.log("esta página é estranha, vou redirecionar você!")
            if(url_agenda_livre == 1){
                console.log("Vamos para a página de Agendamento")
                await sleep(900);
                window.location.href = url_agenda;
            }else{
                console.log("Vamos para a página de Pagamento")
                await sleep(900);
                window.location.href = url_pay;
            }
        }

}, (delay*1000));


function lerDataPortugues(data) {
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


function comparaDataPortugues(data){
    // return 0 para data ruim
    // return 1 para data boa

    let proximaData = lerDataPortugues(data);
    var dia = proximaData[0];
    var mes = proximaData[1];
    var ano = proximaData[2];


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
    else if((anoMarcado == ano && mesMarcado == mes && diaMarcado == dia)  || ( anoBloqueado == ano && mesBloqueado == mes && diaBloqueado == dia )  ){
        console.log("dia igual ou bloqueado")
        return '0'
    }
    else{
        console.log("data mais próxima")
        return '1'
    }
}

function melhorDataPortugues(data){
    // return 0 para data ruim
    // return 1 para data boa

    let proximaData = lerDataPortugues(data);
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

function comparaDataCalendario(dia, mes, ano){
    // return 0 para data ruim
    // return 1 para data boa
    // return 2 para data bloqueada
    

    if(anoMarcado < ano){
        console.log("Ano superior calendario")
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
    else if((anoMarcado == ano && mesMarcado == mes && diaMarcado == dia)){
        console.log("dia igual")
        return '0'
    }
    else if(anoBloqueado == ano && mesBloqueado == mes && diaBloqueado == dia){
        console.log("data bloqueada")
        return '2'
    }
    else{
        console.log("data mais próxima")
        return '1'
    }
}

function melhorDataCalendario(dia, mes, ano){
    // return 0 para data ruim
    // return 1 para data boa

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

function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

