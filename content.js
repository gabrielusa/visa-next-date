// INFORME AS VARIÁVEIS:

// Informe o seu Login e Senha.
var meuEmail = 'gabryellagrigaitis@gmail.com';
var meuSenha = 'Gkda2001';

    // Informe o número do processo, é o número que aparece na sua URL quando você logo no site ( geralmente após "/schedule/",  nunca após "/groups" )
var numero_processo = 41597324;

    // Você já fez o pagamento da taxa? 1 sim, 2 não (página de agendamento só é liberada após pagamento e marcação).
var url_agenda_livre = 1;

    // infome a data interessante limite (maior data que receberá alertas).
var diaMarcado = 01;
var mesMarcado = 01;
var anoMarcado = 2023;

    // Informe de quanto em quanto tempo o bot recarregará a página.
        // Valores muito baixos podem causar 429 (TOO MANY REQUEST). (delay recomendado: 61s.)
var delay = 4; // Em segundos.

    // Informe uma data para ser ignorada
var diaBloqueado = 1;
var mesBloqueado = 6;
var anoBloqueado = 2025;

    // escolha a cidade à ser observada.
var cidade= 0;
var cidades = ['brasília','Rio de Janeiro','São Paulo','Recife','Porto Alegre'] // NÃO ALTERE

var cidadeAux= 54;
if(cidade == 1){
    cidadeAux = 55;
}else if(cidade == 2){
    cidadeAux = 56;
}else if(cidade == 3){
    cidadeAux = 57;
}else if(cidade == 4){
    cidadeAux = 128;
}
        // Brasília =       [0] -> 54
        // Rio de Janeiro = [1] -> 55
        // São Paulo =      [2] -> 56
        // Recife =         [3] -> 57
        // Porto Alegre =   [4] -> 128

    // reload (f5) -> necessário para puxar informações novas
var reload = 1; // 0 = desligado, 1 = ligado

var url_atual = window.location.href;
var url_login = 'https://ais.usvisa-info.com/pt-br/niv/users/sign_in';
var url_pay = `https://ais.usvisa-info.com/pt-br/niv/schedule/${numero_processo}/payment`;
var url_agenda = `https://ais.usvisa-info.com/pt-br/niv/schedule/${numero_processo}/appointment`;
var url_maldosa = `https://ais.usvisa-info.com/pt-br/niv/schedule/${numero_processo}/appointment/days/${cidadeAux}.json?appointments[expedite]=false`;

// função para permitir notificações no navegador, não apague. Se apagar habilite manualmente as notificações.
Notification.requestPermission(/* opcional: callback */);


    // -> INICIO DA FUNÇÃO PRINCIPAL <- //

setInterval(async() => {

    if( reload == 1){
        await window.location.reload();
    }

    console.log("url atual:", url_atual);

    if(url_atual == url_pay){

        var proximaData = document.querySelectorAll('tbody .text-right')[cidade].innerText;
        var ultimaDataVista = window.localStorage.getItem('ultimaDataVista');

        console.log("ultimaDataAnotada:", ultimaDataVista );
        console.log("Data exposta:",proximaData);

        window.localStorage.setItem('ultimaDataVista', proximaData);

        var compara = comparaDataPortugues(proximaData);
        if(compara == '1'){
            console.log("ta comparando")

            new Notification(("data disponível em "+ cidades[cidade] + ": " + proximaData), {
                body: ("essa é a proxima data definida em " + cidades[cidade] + ": " + proximaData)
            });


        }else{
            console.log("data não interessante")
        }

    }

    else if(url_atual == url_maldosa){

        var texto = document.getElementsByTagName('pre');
        const obj = JSON.parse(texto[0].innerHTML);

        console.log("obj: "+ obj[0])

        var compara = comparaDataMaldosa(obj[0].date);

        console.log('FALA CMG')

        if(compara == '1'){
            console.log("ta comparando")

            new Notification(("data disponível em "+ cidades[cidade] + ": " + obj[0].date), {
                body: ("essa é a proxima data definida em " + cidades[cidade] + ": " + obj[0].date)
            });

        }else{
            console.log("data não interessante")
        }

    }

    else if(url_atual == url_agenda){

        window.location.href = url_maldosa;

        console.log("Estamos na página de Agendamento")
        console.log("cidade de:", cidade)

        document.querySelector('#appointments_consulate_appointment_facility_id').value = 54;


            if(cidade == 1){
                console.log("cidade de 1")
                document.querySelector('#appointments_consulate_appointment_facility_id').value = 55;
            }
            if(cidade == 2){
                console.log("cidade de 2")
                document.querySelector('#appointments_consulate_appointment_facility_id').value = 56;
            }
            if(cidade == 3){
                console.log("cidade de 3")
                document.querySelector('#appointments_consulate_appointment_facility_id').value = 57;
            }
            if(cidade == 4){
                console.log("cidade de 4")
                document.querySelector('#appointments_consulate_appointment_facility_id').value = 128;
            }


        document.getElementById('consulate_date_time').style = "display: block;"
        await sleep(1000);
        console.log("cidade dev: ", document.querySelector('#appointments_consulate_appointment_facility_id').value)

        
        var calendario = document.querySelector('#appointments_consulate_appointment_date');
        calendario.click();

        var carregarMais = document.getElementsByClassName('ui-datepicker-next');

        var i = 0;
        var proximoDia = 'null' ;
        var proximoMes ;
        var proximoAno ;

        while(proximoDia == 'null' && i <= 30 ){
            // console.log("primeiro while")
            try {
                proximoDia = document.querySelector('tbody tr td a').innerText;
                // console.log("primeiro try, proximoDia: ", proximoDia)
            } catch(error){
                carregarMais[0].click();
                // console.log("primeiro catch")
            }
            console.log("i: ", i)
            i++;
            if(i == 30){console.log("primeiro while entrou em LOOP!!!")}
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
            new Notification(("data disponível em "+ cidades[cidade] + ": "+ proximoDia + "/" + proximoMes + "/" + proximoAno), {
                body: ("essa é a proxima data definida em " + cidades[cidade] + ": " + proximoDia + "/" + proximoMes + "/" + proximoAno)
            });

        }else if(compara == '2'){ // SIGNIFICA Q A PRIMEIRA DATA É BLOQUEADA
            // console.log("entrou na compara 2")
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
                    new Notification(("data disponível em "+ cidades[cidade] + ": " + proximoDia + "/" + proximoMes + "/" + proximoAno), {
                        body: ("essa é a proxima data definida em Brasília." + "" + proximoDia + "/" + proximoMes + "/" + proximoAno)
                    });
                }

                
            } catch (error) { // SE NAO HOUVER UM SEGUNDO VALOR BOM EM SEQUENCIA DISPARA:

                // console.log("entrou na compara 2 e no if")

                console.log("data não interessante")
                carregarMais[0].click();
                carregarMais[0].click();

                proximoDia= 'null';
                i = 0; 
    
                while(proximoDia == 'null' && i <= 30){
                    console.log('proximo dia: ', proximoDia)
    
                    try {
                        proximoDia = document.querySelectorAll('tbody tr td a')[0].innerText;
                        console.log('proximo dia try: ', proximoDia)
                    } catch(error){
                        carregarMais[0].click();
                        console.log('skipando: ', proximoDia)
                    }

                    console.log('proximo dia2: ', proximoDia)

                    i++;
                    if(i == 30){console.log("Segundo while entrou em LOOP!!!")}
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
                    new Notification(("data disponível em "+ cidades[cidade] + ": " + proximoDia + "/" + proximoMes + "/" + proximoAno), {
                        body: ("essa é a proxima data definida em " + cidades[cidade] + ": " + proximoDia + "/" + proximoMes + "/" + proximoAno)
                    });
                }
            }
        }
    }

    else if(url_atual == url_login){

            console.log("Estamos na página de login")

            // modulo para gravar dados na localstorage
                // if(window.localStorage.getItem('email') == null || window.localStorage.getItem('password') == null) {
                //     let email = prompt('Digite seu email: ');
                //     window.localStorage.setItem('email', email);

                //     let password = prompt('Digite sua senha: ');
                //     window.localStorage.setItem('password', password);
                // }

                // console.log('Email Salvo: ' + localStorage.getItem('email'));
                // console.log('Senha Salva: ' + localStorage.getItem('password'));

            document.getElementById('user_email').value = meuEmail;
            document.getElementById('user_password').value = meuSenha;

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
                window.location.href = url_maldosa;
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


function lerDataMaldosa(data) {
    console.log("data é essa: "+ data)
    var dia = data[8]+data[9];
    console.log("data dia é essa: "+ dia)
    var ano = data[0]+data[1]+data[2]+data[3];
    var mes = data[5]+data[6];

    return [dia, mes, ano]
}

function comparaDataMaldosa(data){
    // return 0 para data ruim
    // return 1 para data boa

    let proximaData = lerDataMaldosa(data);
    var dia = proximaData[0];
    var mes = proximaData[1];
    var ano = proximaData[2];

    if( dia == diaBloqueado && mes == mesBloqueado && ano == anoBloqueado ){
        console.log("data bloqueada")
        return '0'
    }
    else if(anoMarcado < ano){
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

function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}