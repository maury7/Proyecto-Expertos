var planes =[
  {
      nombre: "Plan Basico",
      tipo_plan:  "----",
      descripcion:  "este plan permite 1 proyecto privado",
     },
     {
         nombre: "Plan normal",
         tipo_plan:"----",
         descripcion:  "este plan permite 1 proyecto privado",
      },
      {
          nombre: "Plan premiun",
          tipo_plan:"----",
          descripcion:  "nose",
       }
   
  ]

$(document).ready(function(){
	//Se cargo todo el DOM
	
		
      for (var i=0;i<3;i++){
        $("#select-planes").append(        
            `<option value="${planes[i].nombre}">${planes[i].nombre}</option>`);
                }
		
	
	
});