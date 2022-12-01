var horse_mount = 0;
var horse_name = [];
var laps = 0;
var horses = [];

// var color = 0;
// function time(){
//     console.log('alo')
//     color++
//     if(color == 2){
//         first_page_button.style.backgroundcolor = 'red';
//         color = 0;
//     }
//     if(color == 0){
//         first_page_button.style.backgroundcolor = 'green';
//     }
// }
// setInterval(function(){ time() },1000)

function start_changes(){
    first_page.style.display = 'none'
    window1.style.display = 'flex'
}

// QUANTIDADE DE CAVALOS
function save_mount(){
    let mount = (mount_ipt.value).trimStart();
    if(mount.length == 0 || isNaN(Number(mount)) || Number(mount) <= 1){
        alert('A quantidade de cavalos deve ser numerica maior do que 1');
    }else{
        horse_mount = Number(mount);
        console.log("QUANTIDADE DE CAVALOS: "+ horse_mount)
        window1.style.display = 'none';
        window2.style.display = 'flex';

        // for (let index = 0; index < horse_mount; index ++) {
        //     horses.push(
        //         {
        //             nome: "undefined"
        //         }
        //     );
        // }
    }
    console.log(horses)
}

// NOMES DOS CAVALOS
function save_name(){
    if(horse_name.length < horse_mount){
        var name = (name_ipt.value).trimStart();

        console.log("NOME DO CAVALO: "+ name+"\nVETOR DE NOMES: " + horse_name)

        if(name.length == 0){
            alert('Insira um nome valido');
        }else{
            if(horse_name.length == 0){
                names_view.innerHTML += `<br> ${horse_name.length + 1}° Cavalo: ${name}`
                horse_name.push(name);
                name_ipt.value = '';
            }else{
                let verify_name = true;
                for(let index = 0; index < horse_name.length; index ++){
                    if(name == horse_name[index]){
                        alert('Você já inseriu esse nome!!')
                        verify_name = false;
                    }
                }
                if(verify_name){
                    names_view.innerHTML += `<br> ${horse_name.length + 1}° Cavalo: ${name}`
                    horse_name.push(name);
                    console.log('SALVANDO NOME: '+ name)
                    name_ipt.value = '';
                }
            }
        }
    }
    if (horse_name.length == horse_mount) {
        for (let index = 0; index < horse_mount; index ++) {
            // horses[index].nome = horse_name[index];
            horses.push(
                {
                    nome : `${horse_name[index]}`,
                    tempo : 0,
                    tempoSum : 0
                }
            )
        }
        console.log(horses)
        button_save_name.style.display = 'none';
        name_ipt.style.display = 'none';
        button_next_window.style.display = 'flex';
        title_window2.innerHTML = 'Nomes adicionados'
    }
}

// BOTÃO DE CONTINUAR
function next_window(){
    window2.style.display = 'none';
    window3.style.display = 'flex';
}

// QUANTIDADE DE VOLTAS
function save_laps(){
    let lap = (laps_ipt.value).trimStart();
    if(lap.length == 0 || isNaN(Number(lap)) || Number(lap) <= 0){
        alert('A quantidade de voltas deve ser numerica maior do que 0');
        laps_ipt.value = '';
    }else{
        laps = Number(lap);
        console.log('QUANTIDADE DE VOLTAS DA CORRIDA: '+laps)
        button_save_laps.innerHTML = `Mudar`
        button_next_window2.style.display = 'flex';
    }
}
var lap_number = 1;
// IR PARA CORRIDA
function Next_window2(){
    window3.style.display = 'none'
    window4.style.display = 'flex'
    lap_view.innerHTML = lap_number;
    if(horse_mount < 3){
        third_horse.style.display = 'none'
    }
}

// Corrida
var cont = 0;
var winner = '';

function lap(){
    var first = {
        tempo: 999,
        nome: 'Undefined'
    };
    var second = {
        tempo: 999,
        nome: 'Undefined'
    };
    var third = {
        tempo: 999,
        nome: 'Undefined'
    };
    var ultimo = 0;
    cont ++
    lap_number ++
    lap_view.innerHTML = lap_number
    if(cont < laps){
        for(let index = 0; index < horse_mount; index ++){
            let time = Number((Math.random() * 2 + 7).toFixed(1))
            horses[index].tempo = time;

            var t = horses[index].tempoSum;
            t = Number(t)
            t += time
            console.log('T: '+ (typeof t) + 'T: ' +t)
            horses[index].tempoSum = Number(t);
            // horses[index].tempoSum += time;

            console.log('TEMPO: '+horses[index].tempo+'\n TEMPO SOMADO: '+horses[index].tempoSum);

            view_area.innerHTML += `<br>CAVALO: ${horses[index].nome} -
                TEMPO DA VOLTA: ${Number(horses[index].tempo).toFixed(1)} - TEMPO TOTAL: ${Number(horses[index].tempoSum).toFixed(1)}
            `
            ultimo = index;
        }
        view_area.innerHTML += `<br> -----------------------------------------------------------------------------------------------------------<br>`
        for(let i = 0; i < horse_mount; i ++){
            if(horses[i].tempoSum < first.tempo){
                first.tempo = horses[i].tempoSum
                first.nome = horses[i].nome
                f_name.innerHTML = `${first.nome}`
            }
        }
        for(let i = 0; i < horse_mount; i ++){
            if(horses[i].tempoSum > first.tempo && horses[i].tempoSum < second.tempo){
                second.tempo = horses[i].tempoSum
                second.nome = horses[i].nome
                s_name.innerHTML = `${second.nome}`
            }
        }
        for(let i = 0; i < horse_mount; i ++){
            if(horses[i].tempoSum > first.tempo && horses[i].tempoSum > second.tempo){
                third.tempo = horses[i].tempoSum
                third.nome = horses[i].nome
                t_name.innerHTML = `${third.nome}`
            }
        }
        console.log(`PEIMEIRO: nome ${first.nome} tempo ${first.tempo}\nSEGUNDO: nome ${second.nome} tempo ${second.tempo}\nTERCEIRO: nome ${third.nome} tempo ${third.tempo}`);
        winner = first.nome;
    }
    if(cont == laps){
        for(let index = 0; index < horse_mount; index++){
            view_area.innerHTML += `<br>CAVALO: ${horses[ultimo].nome} -
            TEMPO DA VOLTA: ${Number(horses[ultimo].tempo).toFixed(1)} - TEMPO TOTAL: ${Number(horses[ultimo].tempoSum).toFixed(1)}
            `
        }
        winner_span.innerHTML = `<img src="imgs/trofeu.png">`
        button_lap.style.display='none';
        view_winner.style.display = 'flex';
        name_winner.innerHTML = `${winner}⠀`
        winner = 1;
    }
}