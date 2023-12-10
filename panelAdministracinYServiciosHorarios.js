
async function cargarHorariosSavado() {
    try {
        const response = await fetch('http://localhost:3000/horariosSabado');
        if (response.ok) {
            const horarios = await response.json();
            const horariosList = document.getElementById('horarios-list');
            horariosList.innerHTML = '';

            horarios.forEach((horario) => {
                const listItem = document.createElement('li');
                listItem.className = 'list-group-item';
                listItem.innerHTML = `
                    <div class="d-flex justify-content-between align-items-center">
                        <span class="ms-2">${horario.hora} (Ocupado: ${horario.ocupado})</span>
                        <div>
                            <button type="button" class="btn btn-primary btn-sm" onclick="cambiarEstadoHorario(${horario.id}, ${horario.ocupado})">Cambiar Estado</button>
                        </div>
                    </div>
                `;
                horariosList.appendChild(listItem);
            });
        } else {
            console.error('Error al cargar los horarios del sábado.');
        }
    } catch (error) {
        console.error('Error al cargar los horarios del sábado:', error);
    }
}


async function cambiarEstadoHorario(id, estadoActual) {
    const nuevoEstado = !estadoActual;
    try {
        const response = await fetch(`http://localhost:3000/horariosSabado/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                ocupado: nuevoEstado
            })
        });

        if (response.ok) {
            cargarHorariosSavado();
        } else {
            console.error('Error al cambiar el estado del horario del sábado.');
        }
    } catch (error) {
        console.error('Error al cambiar el estado del horario del sábado:', error);
    }
}


async function cargarHorariosDomingo() {
    try {
        const response = await fetch('http://localhost:3000/horariosDomingo');
        if (response.ok) {
            const horarios = await response.json();
            const horariosList = document.getElementById('horarios-listt');
            horariosList.innerHTML = '';

            horarios.forEach((horario) => {
                const listItem = document.createElement('li');
                listItem.className = 'list-group-item';
                listItem.innerHTML = `
                    <div class="d-flex justify-content-between align-items-center">
                        <span class="ms-2">${horario.hora} (Ocupado: ${horario.ocupado})</span>
                        <div>
                            <button type="button" class="btn btn-primary btn-sm" onclick="cambiarEstadoHorarioDomingo(${horario.id}, ${horario.ocupado})">Cambiar Estado</button>
                        </div>
                    </div>
                `;
                horariosList.appendChild(listItem);
            });
        } else {
            console.error('Error al cargar los horarios del domingo.');
        }
    } catch (error) {
        console.error('Error al cargar los horarios del domingo:', error);
    }
}


async function cambiarEstadoHorarioDomingo(id, estadoActual) {
    const nuevoEstado = !estadoActual;
    try {
        const response = await fetch(`http://localhost:3000/horariosDomingo/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                ocupado: nuevoEstado
            })
        });

        if (response.ok) {
            cargarHorariosDomingo();
        } else {
            console.error('Error al cambiar el estado del horario del domingo.');
        }
    } catch (error) {
        console.error('Error al cambiar el estado del horario del domingo:', error);
    }
}


async function cargarDias() {
    try {
        const response = await fetch('http://localhost:3000/dias');
        if (response.ok) {
            const dias = await response.json();
            const diasList = document.getElementById('dias-list');
            diasList.innerHTML = '';

            dias.forEach((dia) => {
                const listItem = document.createElement('li');
                listItem.className = 'list-group-item';
                listItem.innerHTML = `
                    <div class="d-flex justify-content-between align-items-center">
                        <span class="ms-2">${dia.dia} (Ocupado: ${dia.ocupado})</span>
                        <div>
                            <button type="button" class="btn btn-primary btn-sm" onclick="cambiarEstadoDia(${dia.id}, ${dia.ocupado})">Cambiar Estado</button>
                        </div>
                    </div>
                `;
                diasList.appendChild(listItem);
            });
        } else {
            console.error('Error al cargar los días.');
        }
    } catch (error) {
        console.error('Error al cargar los días:', error);
    }
}


async function cambiarEstadoDia(id, estadoActual) {
    const nuevoEstado = !estadoActual;
    try {
        const response = await fetch(`http://localhost:3000/dias/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                ocupado: nuevoEstado
            })
        });

        if (response.ok) {
            cargarDias();
        } else {
            console.error('Error al cambiar el estado del día.');
        }
    } catch (error) {
        console.error('Error al cambiar el estado del día:', error);
    }
}




cargarDias();
cargarHorariosSavado();
cargarHorariosDomingo();

