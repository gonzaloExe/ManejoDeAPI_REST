





async function cargarServicios() {
    try {
        const response = await fetch('http://localhost:3000/servicios');
        if (response.ok) {
            const servicios = await response.json();
            const serviciosList = document.getElementById('servicios-list');
            serviciosList.innerHTML = '';

            servicios.forEach((servicio) => {
                const listItem = document.createElement('li');
                listItem.className = 'list-group-item';
                listItem.innerHTML = `
                    <div class="d-flex justify-content-between align-items-center">
                        <span class="ms-2">${servicio.nombre} (Activo: ${servicio.estado})</span>
                        <div>
                            <button type="button" class="btn btn-primary btn-sm" onclick="cambiarEstadoServicio(${servicio.id}, ${servicio.estado})">Cambiar Estado</button>
                        </div>
                    </div>
                `;
                serviciosList.appendChild(listItem);
            });
        } else {
            console.error('Error al cargar los servicios.');
        }
    } catch (error) {
        console.error('Error al cargar los servicios:', error);
    }
}


async function cambiarEstadoServicio(id, estadoActual) {
    const nuevoEstado = !estadoActual;
    try {
        const response = await fetch(`http://localhost:3000/servicios/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                estado: nuevoEstado
            })
        });

        if (response.ok) {
            cargarServicios();
        } else {
            console.error('Error al cambiar el estado del servicio.');
        }
    } catch (error) {
        console.error('Error al cambiar el estado del servicio:', error);
    }
}


async function agregarServicio(nombre, descripcion) {
    try {
        const response = await fetch('http://localhost:3000/servicios', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nombre: nombre,
                descripcion: descripcion,
                estado: true
            })
        });

        if (response.ok) {
            document.getElementById('nombreServicio').value = '';
            document.getElementById('descripcionServicio').value = '';
            cargarServicios();
        } else {
            console.error('Error al agregar el servicio.');
        }
    } catch (error) {
        console.error('Error al agregar el servicio:', error);
    }
}

const nuevoServicioForm = document.getElementById('nuevo-servicio-form');
nuevoServicioForm.addEventListener('submit', function (event) {
    event.preventDefault();
    const nombre = document.getElementById('nombreServicio').value;
    const descripcion = document.getElementById('descripcionServicio').value;
    agregarServicio(nombre, descripcion);
});



cargarServicios();
