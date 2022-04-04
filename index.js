// import { suavizadores } from "./data/suavizadores";

const optSuav       = document.querySelector( '#suavSelect' );
const spanMinSal    = document.querySelector( '#minSal' );
const spanMaxSal    = document.querySelector( '#maxSal' );
const inputSal      = document.querySelector( '#cantidadSal' );
const inputDureza   = document.querySelector( '#inputDureza' );
const labelDureza   = document.querySelector( '#labelDureza' );
const labelSal      = document.querySelector( '#labelSal' );
const labelCapInt   = document.querySelector( '#labelCapacidadIntercambio' );
const labelCantAgua = document.querySelector( '#labelCantidadAgua' );
const infoTanque    = document.querySelector( '#infoTanque' );



let suavizador=suavizadores[0];
let dureza=200;
let sal=5.5;
let capIntercambio;
let cantAgua;
let Qmin;
let Qmax;

const addSuav = ( suav, index ) => {
    const opt = document.createElement('option');
    opt.setAttribute('value', index );
    const name = document.createTextNode(`${suav.tanResina.vol} ft³`);
    opt.appendChild(name);
    document.getElementById('suavSelect').appendChild(opt);
}

//const selectSuav = document.querySelector('.nieve');

optSuav.addEventListener('change', ( suav ) => {
    suavizador = suavizadores[ suav.target.value ];
    rangoSal( suavizador.tanResina.vol );
    despliega();
    // const resultado = document.querySelector('.resultado');

    // resultado.textContent = `Te gusta el sabor ${event.target.value}`;
});

inputSal.oninput = ( slider ) => {
    sal=slider.target.value;
    despliega();
};

inputDureza.oninput = ( slider ) => {
    dureza=slider.target.value
    despliega();
};

const rangoSal = ( ) => {
    const volResina=suavizador.tanResina.vol;
    const min=3*volResina;
    const max=7*volResina;
    const media=5*volResina;

    spanMinSal.textContent=`${Number(min).toFixed(2)} kg`;
    spanMaxSal.textContent=`${Number(max).toFixed(2)} kg`;
    //despliegaCantidadSal( inputSal.value );
}

const despliegaDureza = () => {
    labelDureza.textContent=`Dureza del agua: ${Number(dureza).toFixed(0)} ppm`;
}

const despliegaCantidadSal = ( ) => {
    labelSal.textContent=`Cantidad de sal: ${Number(sal*suavizador.tanResina.vol).toFixed(2)} kg`;
}

const despliegaCapacidadIntercambio = ( ) => {
    labelCapInt.textContent=`Capacidad de intercambio iónico: ${ (capIntercambio).toFixed(0)} mg`;
}

const despliegaCantidadAgua = ( ) => {
    let txt='<p><b>'
    txt += `Cantidad aproximada de agua que puede suavizar: ${ (cantAgua).toFixed(0)} litros<br><br>`;
    const tmin  = cantAgua/(60*Qmax);
    const hmin   = Math.floor(tmin);
    const minmin = Math.ceil((tmin-hmin)*60);
    const tmax  = cantAgua/(60*Qmin);
    const hmax   = Math.floor(tmax);
    const minmax = Math.ceil((tmax-hmax)*60);

    txt +='Tiempo de trabajo: ';
    txt +=`(${ hmin } horas`;
    txt +=` ${minmin} minutos,`;
    txt +=` ${ hmax } horas`;
    txt +=` ${minmax} minutos)<br>`;
    txt += '</b></p>';
    labelCantAgua.innerHTML=txt;
}

const despliegaInfoTanque = ( ) => {
    let txt='<p align="center">'
    txt += `Tamaño del tanque: ${ suavizador.tanResina.diametro }"x${ suavizador.tanResina.alto }"<br>`;
    txt += `Cantidad de resina: ${suavizador.tanResina.vol} ft³ = ${(Number(suavizador.tanResina.vol)*28.3168).toFixed(2)} litros<br>`;
    txt += `Caudal mínimo: ${(Qmin).toFixed(2)} lpm<br>`;
    txt += `Caudal máximo: ${(Qmax).toFixed(2)} lpm<br>`;
    txt += '</p>';
    infoTanque.innerHTML=txt;

}

const init = () => {
    suavizadores.forEach( addSuav );
    rangoSal();
    despliega();
}

const despliega = () =>{
    //capIntercambio=(473366+365296*sal-21888*sal*sal)*suavizador.tanResina.vol;
    capIntercambio=(2115400*(1-Math.exp(-0.35643*sal)))*suavizador.tanResina.vol;
    cantAgua=capIntercambio/dureza;
    const d=Number(suavizador.tanResina.diametro)*0.254;//convierte de in a dm
    const A=Math.PI*d*d/4;//área en dm²
    Qmin=A*5/3;//Vmin=10m/h=100dm/60min=5/3dm/min
    Qmax=A*10;//Vmax=60m/h=600dm/60min=10dm/min
    //Qmin=Number(suavizador.tanResina.vol)*5;
    despliegaInfoTanque();
    despliegaDureza();
    despliegaCantidadSal();
    //despliegaCapacidadIntercambio();
    despliegaCantidadAgua();
    
}

init();
