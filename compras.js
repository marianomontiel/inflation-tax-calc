//Populate span with last inflation value on database
const lastInflation = 6

const precio = document.querySelector('input[name="Precio"]');
const inflacion = document.querySelector('input[name="inflacion-estimada"]')
inflacion.value = lastInflation;

function compoundInflation() {
    const mesesValue = 12;
    let finalInflation = (1 + lastInflation/ 100);
    for (let i = 1, meses = mesesValue; i < meses; i++) {
        finalInflation = (lastInflation/ 100 + 1) * finalInflation;
    };
    finalInflation = Math.floor((finalInflation-1) * 1000)/10;
    console.log(finalInflation);
    return finalInflation;
}
const span = document.querySelector('#indec')
const predeterminedInflation = document.querySelector('#inflacionEstimada');
predeterminedInflation.innerText = `(${lastInflation}% Enero INDEC) - (${compoundInflation()}% anual)`


const calculate = document.querySelector('#calculate-price');
calculate.addEventListener('click', () => {
    const precio = document.querySelector('input[name="Precio"]');
    const mesesInput = document.querySelector('input[name="meses-faltantes"]');
    const mesesValue = mesesInput.value;
    const inflacion = document.querySelector('input[name="inflacion-estimada"]');
    let finalInflation = (1 + inflacion.value / 100);
    for (let i = 1, meses = mesesValue; i < meses; i++) {
        finalInflation = (inflacion.value / 100 + 1) * finalInflation;
        console.log(inflacion.value, finalInflation)
    }
    let calculation = (finalInflation * precio.value)

    const box = document.querySelector(".box");
    const output = document.querySelector(".output");
    output.setAttribute("style", "padding-top: 0px; color: black; font-size: 20px;");
    output.innerText = `Necesitas ahorrar un total de $${calculation} para comprar tu producto en ${mesesValue} meses`;
    box.appendChild(output);
});