$('document').ready(function(){
  // INICIO QUIEN SOY
    $("#toAlias").click(onClickToAlias);
    $("#toOne").click(onClickToOne);
    
    $("#toMision").click(onClickToMision);
    $("#toTwo").click(onClickToTwo);
  
    $("#toFeedback").click(onClickToFeedback);
    $("#toThree").click(onClickToThree);
  // FIN QUIEN SOY

   // INICIO QUE OFREZCO
   //page 1
   $("#qo_toEmail").click(onClickqo_toEmail);
   //$("#toOne").click(onClickToOne);
   //page2
   $("#toNombreServicio").click(onClickqo_toNombreServicio);
   $("#toOne_qo").click(onClickToOne_QO);
   //page3
   $("#toQueResuelve").click(onClickqo_toQueResuelve);
   $("#toTwo_qo").click(onClickToTwo_QO);
   //page4
   $("#toComoEs").click(onClickqo_toComoEs);
   $("#toThree_qo").click(onClickToThree_QO);
   //page5
   $("#toExperiencia").click(onClickqo_toExperiencia);
   $("#toFour_qo").click(onClickToFour_QO);
   
   //page6
   $("#toValidacionExperiencia").click(onClickqo_toValidacionExperiencia);
   $("#toFive_qo").click(onClickToFive_QO);
   //page7
   $("#toFeedback_qo").click(onClickqo_toFeedback);
   $("#toSix_qo").click(onClickToSix_QO);
   // FIN QUE OFREZCO
  
  });
//  INICIO QUE OFREZCO
  //page 1
  function onClickqo_toEmail() {
 
      $("#qo-welcome-box").addClass("hide");
      $("#qo-email-box").removeClass("hide");
    
  }
   //page 2
    function onClickqo_toNombreServicio() {
    const value = $("#email").val();
      if (validate(value)) {
    
      $("#qo-nombre-servicio-box").removeClass("hide");
      $("#qo-email-box").addClass("hide");
      }

   
     }
     
     function onClickToOne_QO() {
      $("#qo-email-box").removeClass("hide");
      $("#qo-nombre-servicio-box").addClass("hide");
    }
    //page 3

  function onClickqo_toQueResuelve() {
    const value = $("#nombreServicio").val();
    if (validate(value)) {
  
    $("#qo-que-resuelve-box").removeClass("hide");
    $("#qo-nombre-servicio-box").addClass("hide");
    }
    
  }
 
  function onClickToTwo_QO() {
    $("#qo-nombre-servicio-box").removeClass("hide");
    $("#qo-que-resuelve-box").addClass("hide");
  }
  //page 4
  function onClickqo_toComoEs() {
   
  
    $("#qo-como-es-box").removeClass("hide");
    $("#qo-que-resuelve-box").addClass("hide");
    
    
  }
 
  function onClickToThree_QO() {
    $("#qo-que-resuelve-box").removeClass("hide");
    $("#qo-como-es-box").addClass("hide");
    
  }
  //page 5
  function onClickqo_toExperiencia() {
  //  const value = $("#experiencia").val();
   // if (validate(value)) {
  
    $("#qo-Experiencia-box").removeClass("hide");
    $("#qo-como-es-box").addClass("hide");
  
   // }
    
  }
 
  function onClickToFour_QO() {
    $("#qo-como-es-box").removeClass("hide");
    $("#qo-Experiencia-box").addClass("hide");

  }
 //page 6
 function onClickqo_toValidacionExperiencia() {
  //  const value = $("#experiencia").val();
   // if (validate(value)) {
   console.log('entre');
    $("#qo-Validacion-Experiencia-box").removeClass("hide");
    $("#qo-Experiencia-box").addClass("hide");
  
   // }
    
  }
 
  function onClickToFive_QO() {
    $("#qo-Experiencia-box").removeClass("hide");
    $("#qo-Validacion-Experiencia-box").addClass("hide");

  }
  //page 7
  function onClickqo_toFeedback() {
    //  const value = $("#experiencia").val();
     // if (validate(value)) {
   
      $("#feedback-box").removeClass("hide");
      $("#qo-Validacion-Experiencia-box").addClass("hide");
    
     // }
      
    }
   
    function onClickToSix_QO() {
      $("#qo-Validacion-Experiencia-box").removeClass("hide");
      $("#feedback-box").addClass("hide");
  
    }

   
   
    
    
// FIN QUE OFREZCO


  // INICIO QUIEN SOY
  function onClickToAlias() {
    const value = $("#email").val();
    if (validate(value)) {
      $("#email-box").addClass("hide");
      $("#alias-box").removeClass("hide");
    }
  }
  
  function onClickToMision() {
    const value = $("#alias").val();
    if (validate(value)) {
      $("#alias-box").addClass("hide");
      $("#mision-box").removeClass("hide");
    }
  }


  
  function onClickToFeedback() {
    $("#mision-box").addClass("hide");
    $("#feedback-box").removeClass("hide");
  }
  
  function onClickToOne() {
    $("#email-box").removeClass("hide");
    $("#alias-box").addClass("hide");
  }
  
  function onClickToTwo() {
    $("#alias-box").removeClass("hide");
    $("#mision-box").addClass("hide");
  }
  
  function onClickToThree() {
    $("#mision-box").removeClass("hide");
    $("#feedback-box").addClass("hide");
  }
  
  function validate (value) {
    if (value === '') {
      return false;
    }
    return true;
  }
  // FIN QUIEN SOY


  function toThanks() {
    $("#thanks").removeClass("hide");
    $("#feedback-box").addClass("hide");
  }
  