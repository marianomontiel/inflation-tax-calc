//Populate span with last inflation value on database
const lastInflation = 6.6

const precio = document.querySelector('input[name="Precio"]');
const inflacion = document.querySelector('input[name="inflacion-estimada"]')
inflacion.value = lastInflation;

function compoundInflation() {
    const mesesValue = 12;
    let finalInflation = (1 + lastInflation / 100);
    for (let i = 1, meses = mesesValue; i < meses; i++) {
        finalInflation = (lastInflation / 100 + 1) * finalInflation;
    };
    finalInflation = Math.floor((finalInflation - 1) * 1000) / 10;
    return finalInflation;
}
const span = document.querySelector('#indec')
const predeterminedInflation = document.querySelector('#inflacionEstimada');
predeterminedInflation.innerText = `(${lastInflation}% Febrero INDEC) - (${compoundInflation()}% anual)`


const calculate = document.querySelector('#calculate-price');
calculate.addEventListener('click', () => {
    const precio = document.querySelector('input[name="Precio"]');
    const mesesInput = document.querySelector('input[name="meses-faltantes"]');
    const mesesValue = mesesInput.value;
    const inflacion = document.querySelector('input[name="inflacion-estimada"]');
    let finalInflation = 0;
    const priceIndex = Array(mesesValue);
    const monthLabel = Array(mesesValue);
    for (let i = 0, meses = mesesValue; i < meses; i++) {
        if (i < 1) {
            finalInflation = (1 + inflacion.value / 100)
        } else {
            finalInflation = (inflacion.value / 100 + 1) * finalInflation;
        }
        monthLabel[i] = i;
        priceIndex[i] = finalInflation;
    }
    let calculation = Math.floor(finalInflation * precio.value*100)/100

    const box = document.querySelector(".box > .price");
    const output = document.querySelector(".price > .output");
    output.setAttribute("style", "padding-top: 0px; color: black; font-size: 20px;");
    output.innerText = `Necesitas ahorrar un total de $${numberWithCommas(calculation)} para comprar tu producto en ${mesesValue} meses`;
    box.appendChild(output);

    createPriceChart(priceIndex, monthLabel)
});

function numberWithCommas(x) {
    return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
  }

function createPriceChart(priceIndex, monthLabel) {
    const chartOne = document.querySelector("#price-index");
    const box = document.querySelector('.box > .price');
    if (chartOne == null) {
        const priceIndex = document.createElement("canvas");
        priceIndex.setAttribute('id', 'price-index');
        box.appendChild(priceIndex);
    }
    else {
        box.removeChild(chartOne);
        const priceIndex = document.createElement("canvas");
        priceIndex.setAttribute('id', 'price-index');
        box.appendChild(priceIndex);
    }
    //set month label array


    let posColour = 'rgba(52, 152, 219, .3)',
        negColour = 'rgba(255, 87, 51, .3)',
        posBackgroundColour = 'rgba(52, 152, 219, .6)',
        negBackgroundColour = 'rgba(255, 87, 51, .6)'

    new Chart("price-index", {
        type: "line",
        data: {
            labels: monthLabel,
            datasets: [{
                label: 'Salario ajustado x inflación',
                fill: { target: 'origin', above: negColour },
                backgroundColor: negBackgroundColour,
                borderColor: negBackgroundColour,
                data: priceIndex,
                tension: '0.5',
                pointRadius: '0'
            }]
        },
        options: {
            title: {
                display: true,
                text: 'Evolucion de precio estimada',
            },
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false,
                }
            }
        },
    });


}
