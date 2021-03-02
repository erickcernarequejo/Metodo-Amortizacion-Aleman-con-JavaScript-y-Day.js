const monto = document.getElementById('monto');
const tiempo = document.getElementById('tiempo');
const interes = document.getElementById('interes');
const btnCalcular = document.getElementById('btnCalcular');
const alerta = document.getElementById('alert-error');
const llenarTabla = document.querySelector('#lista-tabla tbody')

btnCalcular.addEventListener('click', () => {
    if (monto.value === '' || tiempo.value === '' || interes.value === '') {
        alerta.hidden = false;
        setTimeout(() => {
            alerta.hidden = true;
        }, 2000);
    } else {
        calcularCronograma(monto.value, interes.value, tiempo.value);
    }
})

function calcularCronograma(monto, interes, tiempo) {

    while(llenarTabla.firstChild) {
        llenarTabla.removeChild(llenarTabla.firstChild);
    }

    let mesActual = dayjs().add(1, 'month');
    let amortizacionConstante, pagoInteres, cuota;
    amortizacionConstante = monto / tiempo;
    for (let i = 1; i <= tiempo; i++) {
        pagoInteres = monto * (interes / 100);
        cuota = amortizacionConstante + pagoInteres;
        monto = monto - amortizacionConstante;

        let fecha = mesActual.format('DD-MM-YYYY');
        mesActual = mesActual.add(1, 'month');

        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${fecha}</td>
            <td>${amortizacionConstante.toFixed(2)}</td>
            <td>${pagoInteres.toFixed(2)}</td>
            <td>${cuota.toFixed(2)}</td>
            <td>${monto.toFixed(2)}</td>
        `;
        llenarTabla.appendChild(row);
        
    }
}