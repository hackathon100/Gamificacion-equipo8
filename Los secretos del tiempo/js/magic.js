window.onload = function () {
    //botones
    $("#send").click(submitform);
    $("#btnretroalimentacion").click(enviarRetroalimentacion);
    $("#btnprueba1").click(corroborarPrueba1);
    
    //area imagen cuadrado
    $("#AreaCuadrado").click(pasarEtapa2);

    //botonera mision3
    $("#btn3_0").click(botonera_push_btn3_0);
    $("#btn3_1").click(botonera_push_btn3_1);
    $("#btn3_2").click(botonera_push_btn3_2);
    $("#btn3_3").click(botonera_push_btn3_3);
    $("#btn3_4").click(botonera_push_btn3_4);
    $("#btn3_5").click(botonera_push_btn3_5);
    $("#btn3_6").click(botonera_push_btn3_6);
    $("#btn3_7").click(botonera_push_btn3_7);
    $("#btn3_8").click(botonera_push_btn3_8);
    $("#btn3_9").click(botonera_push_btn3_9);
    $("#btn3_borrar").click(botonera_push_btn3_borrar);
    $("#btn3_resolver").click(botonera_push_btn3_resolver);
    //se esconden las pruebas
    $("#prueba1").addClass('hide');
   
    $("#formprueba1").addClass("hide");
    
    
    
    //obtener valores
function getInputVal(id) {
  return document.getElementById(id).value;
}
   // const value = $("#score").val();

   function corroborarPrueba1()
   {
    var txtprueba1 = getInputVal('txtprueba1');
    console.log('Corroborar Prueba1'  +txtprueba1);

    //   x.sort((a,b) => {return a.score - b.score })
    //JSON.stringify(x)
    //Get prueba1 data
    //x.slice(0,100)

return firebase.database().ref('/escenario/1/').once('value').then(function(snapshotEstaticos) {
    
    DibujarScoreBoard();
    
    //Do something with your user data located in snapshot
   // NumerodePartidas =  snapshotEstaticos.numChildren();
    console.log(snapshotEstaticos.numChildren());
      
    var resp_prueba1 = snapshotEstaticos.child("resp_prueba1").val();
    var titulo = snapshotEstaticos.child("titulo").val();
    var url_imagen_prueba1 = snapshotEstaticos.child("url_imagen_prueba1").val();


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
  //esconde la sección
  $("#section2Juego").addClass("hide");
  $("#section3Juego").removeClass("hide");


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

    $("#score").text(score);

  

    return firebase.database().ref().update(updates);
  
  
});
}

   

   function enviarRetroalimentacion(){
       

    console.log('Retroalimentación');
    var code = $("#code").text();
     var comentario = getInputVal('txtComentario');
     var email = getInputVal('txtEmail');


     
    firebase.database().ref('feedback/' + code+ '/'+Date.now()).set({
        usercode: code,
        coment : comentario,
        email : email,
        date : Date.now()
      }, (error) => {
        if (error) {
          // The write failed...
          alert('fallo por '+error.value);
        } else {
          // Data saved successfully!
          console.log('Agrego Comentario correctamente')

          var updates = {};
          updates['/secretosdeltiempo/' + code+ '/email/'] = email;
               
          $("#email").text(email);
          $("#formFeedback").addClass("hide");
alert("Felicitaciones Terminaste el Juego te invitamos a ver la tabla de puntajes");
          return firebase.database().ref().update(updates);
          

        }
      });


   }

   function DibujarScoreBoard() {


//Get the user snapshotdibujarBoard
return firebase.database().ref('/secretosdeltiempo/').once('value').then(function(snapshotBoard) {
    //Do something with your user data located in snapshot
   var fotito = snapshotBoard.val();
    console.log(snapshotBoard.val());
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

      $("#formprueba1").removeClass("hide");

      $("#introBox").addClass("hide");
   
      


        //Get the user data
return firebase.database().ref('/secretosdeltiempo/').once('value').then(function(snapshot) {
  //Do something with your user data located in snapshot
  NumerodePartidas =  snapshot.numChildren();
  console.log(snapshot.numChildren());
  $("#NumerodePartidas").text("Estas jugando la partida N°"+ NumerodePartidas);
});
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
  

  function pasarEtapa2()
  {
    
    alert('¡Muy bien! Prem pudo encender el motor de la nave.');
    $("#section3Juego").addClass("hide");
    $("#section4Juego").removeClass("hide");

    var code = $("#code").text();
    var score = $("#score").text();
    score = Number.parseInt(score) + 100;

    
    $("#score").text(score);
    var updates = {};
    updates['/secretosdeltiempo/' + code+ '/score/'] = score;

    return firebase.database().ref().update(updates);

   // return ;

  }



  ///Function de la botonera etapa 3
  function botonera_push_btn3_0() 
  {
    var txt3_respuesta =$("#p3_respuesta").text();

    if(isNaN(txt3_respuesta))
    {
     // txt3_respuesta = 0;
    }else
    {
      txt3_respuesta = txt3_respuesta + 0;
    }

    $("#p3_respuesta").text(txt3_respuesta);
    
  }
  function botonera_push_btn3_1() 
  {
    var txt3_respuesta =$("#p3_respuesta").text();

    if(isNaN(txt3_respuesta))
    {
      txt3_respuesta = 1;
    }else
    {
      txt3_respuesta = txt3_respuesta + 1;
    }

    $("#p3_respuesta").text(txt3_respuesta);
    
  }
  function botonera_push_btn3_2() 
  {
    var txt3_respuesta =$("#p3_respuesta").text();

    if(isNaN(txt3_respuesta))
    {
      txt3_respuesta = 2;
    }else
    {
      txt3_respuesta = txt3_respuesta + 2;
    }

    $("#p3_respuesta").text(txt3_respuesta);
    
  }
  function botonera_push_btn3_3() 
  {
    var txt3_respuesta =$("#p3_respuesta").text();

    if(isNaN(txt3_respuesta))
    {
      txt3_respuesta = 3;
    }else
    {
      txt3_respuesta = txt3_respuesta + 3;
    }

    $("#p3_respuesta").text(txt3_respuesta);
    
  }
  function botonera_push_btn3_4() 
  {
    var txt3_respuesta =$("#p3_respuesta").text();

    if(isNaN(txt3_respuesta))
    {
      txt3_respuesta = 4;
    }else
    {
      txt3_respuesta = txt3_respuesta + 4;
    }

    $("#p3_respuesta").text(txt3_respuesta);
    
  }
  function botonera_push_btn3_5() 
  {
    var txt3_respuesta =$("#p3_respuesta").text();

    if(isNaN(txt3_respuesta))
    {
      txt3_respuesta = 5;
    }else
    {
      txt3_respuesta = txt3_respuesta + 5;
    }

    $("#p3_respuesta").text(txt3_respuesta);
    
  }
  function botonera_push_btn3_6() 
  {
    var txt3_respuesta =$("#p3_respuesta").text();

    if(isNaN(txt3_respuesta))
    {
      txt3_respuesta = 6;
    }else
    {
      txt3_respuesta = txt3_respuesta + 6;
    }

    $("#p3_respuesta").text(txt3_respuesta);
    
  }
  function botonera_push_btn3_7() 
  {
    var txt3_respuesta =$("#p3_respuesta").text();

    if(isNaN(txt3_respuesta))
    {
      txt3_respuesta = 7;
    }else
    {
      txt3_respuesta = txt3_respuesta + 7;
    }

    $("#p3_respuesta").text(txt3_respuesta);
    
  }

  function botonera_push_btn3_8() 
  {
    var txt3_respuesta =$("#p3_respuesta").text();

    if(isNaN(txt3_respuesta))
    {
      txt3_respuesta = 8;
    }else
    {
      txt3_respuesta = txt3_respuesta + 8;
    }

    $("#p3_respuesta").text(txt3_respuesta);
    
  }

  function botonera_push_btn3_9() 
  {
    var txt3_respuesta =$("#p3_respuesta").text();

    if(isNaN(txt3_respuesta))
    {
      txt3_respuesta = 9;
    }else
    {
      txt3_respuesta = txt3_respuesta + 9;
    }

    $("#p3_respuesta").text(txt3_respuesta);
    
  }
  function botonera_push_btn3_borrar() 
  {
    /*var txt3_respuesta =$("#p3_respuesta").text();

    if(isNaN(txt3_respuesta))
    {
      txt3_respuesta = 9;
    }else
    {
      txt3_respuesta = txt3_respuesta + 9;
    }
*/
    $("#p3_respuesta").text("");
    
  }
  function botonera_push_btn3_resolver()
  {
   
  
    var txt3_respuesta =$("#p3_respuesta").text();


    return firebase.database().ref('/escenario/1/').once('value').then(function(snapshotEstaticos2) {
    
      
      //Do something with your user data located in snapshot
     // NumerodePartidas =  snapshotEstaticos.numChildren();
      console.log(snapshotEstaticos2.numChildren());
        
      var resp_prueba3 = snapshotEstaticos2.child("resp_prueba3").val();

      if(txt3_respuesta == resp_prueba3)
      {

      var code = $("#code").text();
      var score = $("#score").text();
      score = Number.parseInt(score) + 100;
  
      
      $("#score").text(score);
      var updates = {};
      updates['/secretosdeltiempo/' + code+ '/score/'] = score;
  
      alert('¡Muy bien! Prem pudo encender el motor de la nave.');

      $("#section4Juego").addClass("hide");
      $("#section5Juego").removeClass("hide");

      return firebase.database().ref().update(updates);
   
      }else
      {
        alert('¡Respuesta Equivocada! Prem necesita tu ayuda, Intentalo Denuevo.');

      }

    

    });

 




   
  }

  