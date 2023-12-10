document.addEventListener("DOMContentLoaded", function () {

    const jsonURL = "http://localhost:3000/pedidosSabado";


    async function cancelarPedido(pedidoId) {
        const confirmacion = confirm(`¿Estás seguro de cancelar el pedido con ID ${pedidoId}?`);
        if (!confirmacion) {
            return;
        }

        const deleteResponse = await fetch(`http://localhost:3000/pedidosSabado/${pedidoId}`, {
            method: 'DELETE'
        });

        if (deleteResponse.ok) {
            console.log(`Se ha cancelado el pedido con ID ${pedidoId}.`);
        } else {
            console.error(`Hubo un problema al cancelar el pedido con ID ${pedidoId}.`);
        }
    }

    fetch(jsonURL)
        .then((response) => response.json())
        .then((data) => {
            const pedidoList = document.getElementById("pedido-list");

            data.forEach((pedido) => {
                if (pedido.ver === true) {
                    const listItem = document.createElement("li");
                    listItem.className = "list-group-item";
                    listItem.innerHTML = `
                        <h5 class="mb-1">Nombre: ${pedido.nombreApellido}</h5>
                        <p class="mb-1">Teléfono: ${pedido.telefono}</p>
                        <p class="mb-1">Día: ${pedido.diaSemana}</p>
                        <p class="mb-1">Servicio: ${pedido.servicio}</p>
                        <p class="mb-1">Horario: ${pedido.horario}</p>
                        <p class="mb-1">¿Realizado? <input class="form-check-input" type="checkbox" id="exampleCheckbox"></p>
                        <p>¿Borrar pedido Permanentemente? <button class="btn btn-danger cancelar-btn " data-id="${pedido.id}"><i class="fas fa-trash-alt"></i></button></p>
                        <br>
                    `;
                    pedidoList.appendChild(listItem);
                }
            });

               const cancelarBotones = document.querySelectorAll(".cancelar-btn");
               cancelarBotones.forEach((btn) => {
                   btn.addEventListener("click", (e) => {
                       const pedidoId = e.target.getAttribute("data-id");
                       cancelarPedido(pedidoId);
                   });
               });
           })
           .catch((error) => {
               console.error("Error al cargar los datos del servidor:", error);
           });

       const borrarListaBoton = document.getElementById("borrarListaBoton");
       const confirmarBorrarBoton = document.getElementById("confirmarBorrarBoton");

       borrarListaBoton.addEventListener("click", () => {
           $('#confirmacionModal').modal('show');
       });


       confirmarBorrarBoton.addEventListener("click", async () => {
        
           const confirmacion = confirm("¿Está seguro de marcar como realizado todos los pedidos?");
           if (!confirmacion) {
               $('#confirmacionModal').modal('hide'); 
               return; 
           }

           let hayValoresTrue;

           do {
             
               const response = await fetch('http://localhost:3000/pedidosSabado');
               const pedidos = await response.json();
               hayValoresTrue = false;

               for (let i = 0; i < pedidos.length; i++) {
            
                   const pedido = pedidos[i];
                   if (pedido.ver === true) {
                       const idDelPedido = pedido.id;
                       const patchResponse = await fetch(`http://localhost:3000/pedidosSabado/${idDelPedido}`, {
                           method: 'PATCH',
                           headers: {
                               'Content-Type': 'application/json'
                           },
                           body: JSON.stringify({
                               ver: false
                           })
                       });

                       if (patchResponse.ok) {
                           console.log(`El valor "ver" se ha actualizado a "false" para el pedido con ID ${idDelPedido}.`);
                       } else {
                           console.error(`Hubo un problema al actualizar el valor "ver" para el pedido con ID ${idDelPedido}.`);
                       }
                   }

                   if (pedido.ver === true) {
                       hayValoresTrue = true;
                   }
               }

    
        const patchSabado = await fetch('http://localhost:3000/horariosSabado', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                ocupado: false
            })
        });

        } while (hayValoresTrue);

           $('#confirmacionModal').modal('hide'); 
           alert('Se han actualizado todos los valores "ver" a "false".');
       });

});







