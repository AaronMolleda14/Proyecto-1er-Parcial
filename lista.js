const campo = document.getElementById("campo");
const lista = document.getElementById("lista");

/*Agregar Elemento*/
function agregar(){
    if(campo.value === ''){
        /*Mensaje de Alerta*/
        alert("¡Debes escribir algo para agregar una nueva tarea!")
    }else{
        let div = document.createElement("DIV");
        lista.appendChild(div);
        /*Crear Input Nuevo*/
        let input = document.createElement("INPUT");
        input.setAttribute('type', 'text');
        input.setAttribute('readonly', 'readonly');
        input.className = "lectura";
        input.value = campo.value;
        input.setAttribute("name", "fila")
        div.appendChild(input);
        /*Crear Boton para Borrar*/
        var span = document.createElement("SPAN");
        var txt = document.createTextNode("Borrar");
        span.className = "borrar";
        span.appendChild(txt);
        div.appendChild(span);
        /*Crear Boton para Editar*/
        var span = document.createElement("SPAN");
        var txt = document.createTextNode("Editar");
        span.className = "editar";
        span.appendChild(txt);
        div.appendChild(span);
    }
    campo.value = "";
    guardar();
}

/*Manejo de Elementos*/
lista.addEventListener("click", function(e){
    var elemento = e.target;
    var padre = elemento.parentElement;
    /*Marcar Tarea como Incompleta*/
    if(e.target.tagName === "INPUT" && e.target.className === "terminada"){
        elemento.className = "lectura";
        
    /*Marcar Tarea como Terminada*/
    }else if(e.target.tagName === "INPUT" && e.target.className === "lectura"){
        elemento.className = "terminada";
        
    /*Eliminar Tarea*/
    }else if(e.target.className === "borrar"){
        elemento.parentElement.remove();
        
    /*Editar Tarea*/
    }else if(e.target.className === "editar"){
        let c = padre.querySelector("INPUT");
        c.className = "escritura";
        c.removeAttribute("readonly");
        elemento.innerText = "Guardar";
        elemento.className = "guardar";
        
    /*Guardar Tarea Editada*/
    }else if(e.target.className === "guardar"){
        let c = padre.querySelector("INPUT");
        c.className = "lectura";
        c.setAttribute("readonly", "readonly");
        elemento.innerText = "Editar";
        elemento.className = "editar";
        
    }guardar();
}, false);

/*Guardar las Tareas*/
function guardar(){
    localStorage.setItem("lista", lista.innerHTML);

    let filas = lista.childElementCount;
    let tareas = [];
    console.log(filas);
    for(var i=0; i<filas; i++){
        tareas[i] = document.getElementsByName("fila")[i].value;
        console.log(tareas[i]);
    }

    localStorage.setItem("tareas", JSON.stringify(tareas));
}

/*Mostrar las Tareas*/
function mostrar(){
    lista.innerHTML = localStorage.getItem("lista");

    let filas = lista.childElementCount;
    let tareas = localStorage.getItem("tareas");
    tareas = JSON.parse(tareas);
    for(var i=0; i<filas; i++){
        document.getElementsByName("fila")[i].value = tareas[i];
    }
}

mostrar();
