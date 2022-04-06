// import { suavizadores } from "./data/suavizadores";

const optSuav       = document.querySelector( '#suavSelect' );

const spanMinSal    = document.querySelector( '#minSal' );
const spanMaxSal    = document.querySelector( '#maxSal' );
const inputSal      = document.querySelector( '#cantidadSal' );
const labelSal      = document.querySelector( '#labelSal' );

const spanQmin      = document.querySelector( '#spanQmin' );
const spanQmax      = document.querySelector( '#spanQmax' );
const inputQ        = document.querySelector( '#inputQ' );
const labelQ        = document.querySelector( '#labelQ' );

const inputDureza   = document.querySelector( '#inputDureza' );
const labelDureza   = document.querySelector( '#labelDureza' );
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
let Q=10;

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
    rangoQ();
    despliega();
    // const resultado = document.querySelector('.resultado');

    // resultado.textContent = `Te gusta el sabor ${event.target.value}`;
});

inputQ.oninput = ( slider ) => {
    Q=slider.target.value;
    despliega();
};

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

const rangoQ = ( ) => {
    const d=Number(suavizador.tanResina.diametro)*0.254;//convierte de in a dm
    const A=Math.PI*d*d/4;//área en dm²
    Qmin=A*5/3;//Vmin=10m/h=100dm/60min=5/3dm/min
    Qmax=A*10;//Vmax=60m/h=600dm/60min=10dm/min
    const labelQmin = Math.round(Qmin);
    const labelQmax = Math.round(Qmax);
    
    if( Q < labelQmin){
        Q = labelQmin;
    }
    if( Q > labelQmax){
        Q = labelQmax;
    }


    spanQmin.textContent=`${labelQmin} lpm`;
    spanQmax.textContent=`${labelQmax} lpm`;
    
    inputQ.setAttribute('value', Q );
    inputQ.setAttribute('min', labelQmin );
    inputQ.setAttribute('max', labelQmax );
    //handleValueChange();
    //despliegaCantidadSal( inputSal.value );
}

const despliegaQ = () => {
    let txt='<p align="center">'
    txt += `Caudal: ${Q} lpm<br>`;
    // txt += `<br>*Se sugiere un caudal dentro del intervalo:`;
    // txt += `(${(Qmin).toFixed(2)} lpm, ${(Qmax).toFixed(2)} lpm)`;
    txt += '</p>';
    
    labelQ.innerHTML=txt;
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
    let txt='<p align="center"><b>'
    txt += `Cantidad aproximada de agua que puede suavizar: ${ (cantAgua).toFixed(0)} litros<br><br>`;
    const tmin  = cantAgua/(60*Qmax);
    const hmin   = Math.floor(tmin);
    const minmin = Math.ceil((tmin-hmin)*60);
    const tmax  = cantAgua/(60*Qmin);
    const hmax   = Math.floor(tmax);
    const minmax = Math.ceil((tmax-hmax)*60);

    const t  = cantAgua/(60*Q);
    const h   = Math.floor(t);
    const min = Math.ceil((t-h)*60);

    txt +='Tiempo de trabajo aproximado: ';
    txt +=`${ h } horas`;
    txt +=` ${min} minutos<br>`;
    
    // txt +=`(${ hmin } horas`;
    // txt +=` ${minmin} minutos,`;
    // txt +=` ${ hmax } horas`;
    // txt +=` ${minmax} minutos)<br>`;

    txt += '</b></p>';
    labelCantAgua.innerHTML=txt;
}

const despliegaInfoTanque = ( ) => {
    let txt='<p align="center">'
    txt += `Tamaño del tanque: ${ suavizador.tanResina.diametro }"x${ suavizador.tanResina.alto }"<br>`;
    //txt += `Cantidad de resina: ${suavizador.tanResina.vol} ft³ = ${(Number(suavizador.tanResina.vol)*28.3168).toFixed(2)} litros<br>`;
    // txt += `Caudal mínimo: ${(Qmin).toFixed(2)} lpm<br>`;
    // txt += `Caudal máximo: ${(Qmax).toFixed(2)} lpm<br>`;
    txt += '<br>*Los siguientes cálculos se realizan suponiendo la cantidad de resina es:';
    txt += ` ${suavizador.tanResina.vol} ft³ = ${(Number(suavizador.tanResina.vol)*28.3168).toFixed(2)} litros<br>`;
    txt += '</p>';
    infoTanque.innerHTML=txt;

}

const init = () => {
    suavizadores.forEach( addSuav );
    rangoSal();
    rangoQ();
    despliega();
}

const despliega = () =>{
    //capIntercambio=(473366+365296*sal-21888*sal*sal)*suavizador.tanResina.vol;
    capIntercambio=(2115400*(1-Math.exp(-0.35643*sal)))*suavizador.tanResina.vol;
    cantAgua=capIntercambio/dureza;
    
    //Qmin=Number(suavizador.tanResina.vol)*5;
    despliegaInfoTanque();
    despliegaDureza();
    despliegaCantidadSal();
    despliegaQ();
    //despliegaCapacidadIntercambio();
    despliegaCantidadAgua();
    
}

init();
