document.addEventListener("DOMContentLoaded", function () {

    const jsonURL = "http://localhost:3000/pedidosSabado";
    const jsonURL1 = "http://localhost:3000/pedidosDomingo";



    fetch(jsonURL)
        .then((response) => response.json())
        .then((data) => {
            const pedidoList = document.getElementById("pedido-list");

   
            data.forEach((pedido) => {
                if (pedido.ver === false) {
                    const listItem = document.createElement("li");
                    listItem.className = "list-group-item";
                    listItem.innerHTML = `
                        <h5 class="mb-1">Nombre: ${pedido.nombreApellido}</h5>
                        <p class="mb-1">Teléfono: ${pedido.telefono}</p>
                        <p class="mb-1">Día: ${pedido.diaSemana}</p>
                        <p class="mb-1">Servicio: ${pedido.servicio}</p>
                        <p class="mb-1">Horario: ${pedido.horario}</p>
                    `;
                    
                    pedidoList.appendChild(listItem);
                }
                console.log(pedido.nombreApellido);
            });


        })

        .catch((error) => {
            console.error("Error al cargar los datos del servidor:", error);
        });



        fetch(jsonURL1)
        .then((response) => response.json())
        .then((data) => {
            const pedidoList = document.getElementById("pedido-list");

   
            data.forEach((pedido) => {
                if (pedido.ver === false) {
                    const listItem = document.createElement("li");
                    listItem.className = "list-group-item";
                    listItem.innerHTML = `
                        <h5 class="mb-1">Nombre: ${pedido.nombreApellido}</h5>
                        <p class="mb-1">Teléfono: ${pedido.telefono}</p>
                        <p class="mb-1">Día: ${pedido.diaSemana}</p>
                        <p class="mb-1">Servicio: ${pedido.servicio}</p>
                        <p class="mb-1">Horario: ${pedido.horario}</p>
                    `;
                    
                    pedidoList.appendChild(listItem);
                }
                console.log(pedido.nombreApellido);
            });


        })

        .catch((error) => {
            console.error("Error al cargar los datos del servidor:", error);
        });





});