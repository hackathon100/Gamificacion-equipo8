window.onload = function () {
    //boton final
    $("#send").click(submitform)
    //document.getElementById('contactForm').addEventListener('submit',    submitform);
    function submitform() {
      // GET 
      var email = getInputVal('email');
      var nombreServicio = getInputVal('nombreServicio');
      var resuelve = getInputVal('resuelve');
      var comoEs = getInputVal('comoEs');
      var experiencia = getInputVal('experiencia');
      var validacionExperiencia = getInputVal('validacionExperiencia');
      var feedback = getInputVal('feedback');
    
  
     const response = saveForm(email,nombreServicio,resuelve,comoEs,experiencia,validacionExperiencia,feedback);
      toThanks();
    }
  
    function saveForm(email,nombreServicio,resuelve,comoEs,experiencia,validacionExperiencia,feedback) {
      var newdbrefObject = dbrefObject.push();
      newdbrefObject.set(
      {
        email:email,
        nombreServicio:nombreServicio,
        resuelve:resuelve,
        comoEs:comoEs,
        experiencia:experiencia,
        validacionExperiencia:validacionExperiencia,
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
    apiKey: "AIzaSyAOzMPXGoOrbn8K3y0Bq-Vxlkg1H_WosI4",
    authDomain: "manosya-55a25.firebaseapp.com",
    databaseURL: "https://manosya-55a25.firebaseio.com",
    projectId: "manosya-55a25",
    storageBucket: "manosya-55a25.appspot.com",
    messagingSenderId: "1058918293674"
  };

  firebase.initializeApp(config);

const dbrefObject = firebase.database().ref().child('queofrezco');