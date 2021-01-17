window.onload = function () {
    //botones
    $("#send").click(submitform)
    $("#btnretroalimentacion").click(enviarRetroalimentacion)
    $("#btnprueba1").click(corroborarPrueba1)
    
    //se esconden las pruebas
    $("#prueba1").addClass('hide');
    $("#formFeedback").addClass("hide");
    $("#formprueba1").addClass("hide");
    
   // const value = $("#score").val();

   function corroborarPrueba1()
   {

    var txtprueba1 = getInputVal('txtprueba1');
    console.log('Corroborar Prueba1'  +txtprueba1);

 //   x.sort((a,b) => {return a.score - b.score })
    //JSON.stringify(x)
    //Get prueba1 data
    //x.slice(0,100)



return firebase.database().ref('/escenario/1/').once('value').then(function(snapshot) {
    //Do something with your user data located in snapshot
    NumerodePartidas =  snapshot.numChildren();
    console.log(snapshot.numChildren());
    $("#NumerodePartidas").text("Estas jugando la partida N°"+ NumerodePartidas);
    
    var resp_prueba1 = snapshot.child("resp_prueba1").val();
    var titulo = snapshot.child("titulo").val();
    var url_imagen_prueba1 = snapshot.child("url_imagen_prueba1").val();


    /*
    if(snapshot.child("resp_prueba1").exists())
    {


    }
  

 snapshot.forEach(function(childSnapshot) {
    // key will be "ada" the first time and "alan" the second time
    var key = childSnapshot.key;
    // childData will be the actual contents of the child
    var childData = childSnapshot.val();
});*/

    var numeroIntento = $("#txtprueba1").val();
    var updates = {};
    if(numeroIntento == resp_prueba1)
    {
        var code = $("#code").text();
        var score = $("#score").text();
        score = Number.parseInt(score) + 100;
        alert("Lo lograste");

/*
        
        firebase.database().ref('secretosdeltiempo/' + code+ '/score/').set({
            usercode: code,
         
            
          }, (error) => {
            if (error) {
              // The write failed...
              alert('fallo por '+error.value);
            } else {
              // Data saved successfully!
              console.log('gano 100 puntos')
            }
          });
*/

// Write the new post's data simultaneously in the posts list and the user's post list.

updates['/secretosdeltiempo/' + code+ '/score/'] = score;

    }else
    {
        var code = $("#code").text();
        var score = $("#score").text();
        score = Number.parseInt(score) - 10;
        alert("no lo lograste");
/*
        firebase.database().ref('secretosdeltiempo/' + code+ '/score/').set(  {
           score
          }, (error) => {
            if (error) {
              // The write failed...
              alert('fallo por '+error.value);
            } else {
              // Data saved successfully!
              console.log('perdio 10 puntos')


             

            }
          });
*/

updates['/secretosdeltiempo/' + code+ '/score/'] = score;

    }

    return firebase.database().ref().update(updates);
    $("#score").text(score);
    DibujarScoreBoard()
});
}

   

   function enviarRetroalimentacion(){
       
   

    console.log('Retroalimentación');
    var code = $("#code").text();
     var comentario = getInputVal('txtComentario');

    firebase.database().ref('feedback/' + code+ '/'+Date.now()).set({
        usercode: code,
        coment : comentario,
        date : Date.now()
      }, (error) => {
        if (error) {
          // The write failed...
          alert('fallo por '+error.value);
        } else {
          // Data saved successfully!
          console.log('Agrego Comentario correctamente')
        }
      });


   }

   function DibujarScoreBoard() {


//Get the user data
return firebase.database().ref('/secretosdeltiempo/').once('value').then(function(snapshot) {
    //Do something with your user data located in snapshot
   var fotito = snapshot.val();
    console.log(snapshot.val());
    var   x = Object.keys(fotito).map(key=>{const a = fotito[key]; a["id"]= key; return a  });
    var w = x.sort((a,b) => {return b.score - a.score });

    console.log(w);
    console.log(w.slice(0,10));

    var $tableScore = $('<table>');

    $tableScore.append('<caption>Score Table</caption>')
    .append('<thead>').children('thead')
    .append('<tr />').children('tr').append('<th>Lugar</th><th>Alias</th><th>Puntaje</th><th>Fecha</th>');

    //tbody
     var $tbody = $tableScore.append('<tbody />').children('tbody');

var lugar = 0;
//se filtran los 10 mejores solamente
w.slice(0,10).forEach(row=>{
        lugar += 1;
        console.log(row.username)
    // add row
$tbody.append('<tr />').children('tr:last')
.append("<td>"+ lugar + "</td>")
.append("<td>"+row.username + "</td>")
.append("<td>"+ row.score+ "</td>")
.append("<td>"+  row.date + "</td>");
    
    });



// add table to dom
$tableScore.appendTo('#dynamicScoreTable');


  //  w.forEach(row=>{console.log(row)});
    //    w.forEach(row=>{console.log(row.username)})
});
}

 




/////////////////////////////////////////////////////////////////////
    function submitform() {

        var NumerodePartidas = 0 ;
        
        console.log('Apretaron el boton submit');
        var score = 100 ;

        var code = Math.floor(Math.random() * 99999999);
        var alias = getInputVal('alias');
       //var alias = 'anonimo';
     // var email = getInputVal('email');
     var email = 'anonimo@anonimo.cl';
        var date = Date.now();

        console.log(code+alias+email+score+date);
        updateData(code,alias,date,email,score);
     
       

        $("#lblalias").text(alias);
        $("#code").text(code);
        $("#score").text(score);
        $("#email").text(email);
        $("#titulo").text("Bienvenido al Juego esta es la información de tu Viaje, Recuerdala si quieres seguir manteniendo tu puntaje");
         $("#GrupoPreguntaInicial").addClass("hide");
       
         $("#prueba1").removeClass("hide");
      //   $("#formFeedback").removeClass("hide");
      $("#formprueba1").removeClass("hide");
       
      DibujarScoreBoard();
    
//Get the user data
return firebase.database().ref('/secretosdeltiempo/').once('value').then(function(snapshot) {
    //Do something with your user data located in snapshot
    NumerodePartidas =  snapshot.numChildren();
    console.log(snapshot.numChildren());
    $("#NumerodePartidas").text("Estas jugando la partida N°"+ NumerodePartidas);
});
}





//obtener valores
function getInputVal(id) {
    return document.getElementById(id).value;
  }

 // GET 
 //var email = getInputVal('email');
 //var alias = getInputVal('alias');
 //var causa = getInputVal('causa');
 //var feedback = getInputVal('feedback');
// console.log(email);

 //const response = saveFormFire(email,alias,causa,feedback);

   
}

/////////////////////////////////////////////////////////////////////

    // Initialize Firebase
    const config = {
        apiKey: "AIzaSyCYKp67w9eLsJeLLnwtCMIZX-k4tOthPqk",
        authDomain: "sala-magica.firebaseapp.com",
        databaseURL: "https://sala-magica.firebaseio.com",
        projectId: "sala-magica",
        storageBucket: "sala-magica.appspot.com",
        messagingSenderId: "843121180034",
        appId: "1:843121180034:web:58fef9794072f33351a39b"
      };
    
      firebase.initializeApp(config);
    
   //const dbrefObject = firebase.database().ref().child('quiensoy');
   const dbrefObjectsecretos = firebase.database().ref().child('secretosdeltiempo');
    

     //actualizacion autoamtica de la foto de los datos
  //dbrefObject.on('value', snap => respuestaRealTime((snap)));

  dbrefObjectsecretos.on('value', snaps => respuestaRealTime((snaps)));

  
/////////////////////////////////////////////////////////////////////
  //funciones de firebase

  function updateData(code,alias,date,email,score)
  {
    firebase.database().ref('secretosdeltiempo/' + code).set({
        username: alias,
        score : score,
        email: email,
        date : Date.now()
      }, (error) => {
        if (error) {
          // The write failed...
          alert('fallo por '+error.value);
        } else {
          // Data saved successfully!
          console.log('Agrego o Modifico Correctamente')
        }
      });


  }

  console.log(dbrefObjectsecretos);
  function respuestaRealTime(imagenNodo) {
    console.log(imagenNodo.numChildren());
    console.log(imagenNodo.val());
  }

  console.log('esto esta fuera de la funcion de firebase');
  