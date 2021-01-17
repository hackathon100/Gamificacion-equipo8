
// Api de visibilidad en el navegador
window.addEventListener('visibilitychange',() => 
{
    switch(document.visibilityState)
    {
        case 'prerender':
            console.log('tab is pre-rendering');
            break;
        case 'hidden':
            console.log('tab is hidden');
            break;
        case 'visible':
            console.log('tab is focused');
            break;


    }


});

window.addEventListener('offline',networkStatus);
window.addEventListener('online' ,networkStatus);

function networkStatus(e){
    console.log(e.type);

    // hacemos que vibre el aparato
    navigator.vibrate(200);

    navigator.vibrate([400,300,300,200,500]);

    navigator.vibrate(0);
}

let logo = document.querySelector('img');

window.addEventListener('deviceorientation',(e)=>{

let titleLR = e.gamma;
let titleFb = e.beta;

//por alguna razon no esta capturando ningun elemento
//logo.style.transform = `rotate(${titleLR}deg) rotate3d(1,0,0, ${titleFb * -1}deg)`;


});

//copy to clipboard https://clipboardjs.com/

//luz del ambiente

window.addEventListener('devicelight',(e)=>{
    console.log(`${e.value} lux ` )

});


//nivel de bateria del aparato conectado
// se podria combinar con local storage para guardar informacion si el usuario no alcanza a hacerlo

navigator.getBattery().then((baterry) =>{
 
  console.log(`nivel de bateria al ${baterry.level *100}%`);

  baterry.addEventListener('levelchange',() => {
  
    console.log(`nivel de bateria al ${this.level * 100}%`);


  
  });
});