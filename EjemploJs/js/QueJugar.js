

window.onload = function () {
  //boton final
  $("#send").click(submitform)
  //document.getElementById('contactForm').addEventListener('submit',    submitform);
  function submitform() {
    // GET 
    var email = getInputVal('email');
    var alias = getInputVal('alias');
    var causa = getInputVal('causa');
    var feedback = getInputVal('feedback');
    console.log(email);

    const response = saveForm(email,alias,causa,feedback);
    toThanks();
  }

  function saveForm(email,alias,causa,feedback) {
    var newdbrefObject = dbrefObject.push();
    newdbrefObject.set(
    {
      email:email,
      alias:alias,
      causa:causa,
      feedback:feedback,
      fechaRegistro:new Date().getTime()
	  
   });

	
  }
  //obtener valores
  function getInputVal(id) {
    return document.getElementById(id).value;
  }

}
//fin on windows.onload




  
    // Initialize Firebase
    const config = {
      // apiKey: "AIzaSyAOzMPXGoOrbn8K3y0Bq-Vxlkg1H_WosI4",
      // authDomain: "manosya-55a25.firebaseapp.com",
      // databaseURL: "https://manosya-55a25.firebaseio.com",
      // projectId: "manosya-55a25",
      // storageBucket: "manosya-55a25.appspot.com",
      // messagingSenderId: "1058918293674"
	
	//sala magica
	apiKey: "AIzaSyCYKp67w9eLsJeLLnwtCMIZX-k4tOthPqk",
    authDomain: "sala-magica.firebaseapp.com",
    databaseURL: "https://sala-magica.firebaseio.com",
    projectId: "sala-magica",
    storageBucket: "sala-magica.appspot.com",
    messagingSenderId: "843121180034",
    appId: "1:843121180034:web:58fef9794072f33351a39b"
  
    };
  
    firebase.initializeApp(config);
  
  const dbrefObject = firebase.database().ref().child('lala');
  
  //syncronizar los cambios del objeto
  
  //actualizacion autoamtica de la foto de los datos
  dbrefObject.on('value', snap => respuestaRealTime((snap)));

  function respuestaRealTime(imagenNodo) {
    console.log(imagenNodo.numChildren());
    console.log(imagenNodo.val());
  }

  console.log('esto esta fuera de la funcion de firebase');
  


  
  
  
  