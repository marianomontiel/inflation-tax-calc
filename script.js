const salary = document.querySelector('#salary');
const ok = document.querySelector('.ok');
let meses = ok.addEventListener('click', () => { monthList(document.querySelector('#salary').value) });
monthList(6);

function monthList(a) {
    let mes = 0;
    meses = a;
    const body = document.querySelector('body');

    //remove inputs before adding newones
    const salary = document.querySelectorAll('.salary');
    const firstDiv = document.querySelector('.first');
    salary.forEach(salary => { firstDiv.removeChild(salary); });

    const inflation = document.querySelectorAll('.inflation');
    const secondDiv = document.querySelector('.second');
    inflation.forEach(inflation => { secondDiv.removeChild(inflation); });

    //create inputs
    for (let i = 0; i < meses; i++) {
        mes += 1;

        //salary inputs
        const label = document.createElement('label');
        label.setAttribute('for', `salary-${mes}`);
        label.setAttribute('class', 'salary');
        label.innerText = `mes ${mes}`;

        const input = document.createElement('input');
        input.setAttribute('name', `salary-${mes}`);
        input.setAttribute('class', 'salary');
        firstDiv.appendChild(label);
        firstDiv.appendChild(input);

        //inflation inputs
        const inflationLabel = document.createElement('label');
        inflationLabel.setAttribute('for', `inflation-${mes}`);
        inflationLabel.setAttribute('class', 'inflation');
        inflationLabel.innerText = `Inflación mes ${mes}`;

        const inflationInput = document.createElement('input');
        inflationInput.setAttribute('name', `inflation-${mes}`);
        inflationInput.setAttribute('class', 'inflation');

        secondDiv.appendChild(inflationLabel);
        secondDiv.appendChild(inflationInput);
    };
}


const calculate = document.querySelector('#calculate');
calculate.addEventListener('click', () => {
    //convert form into Array
    const salaryForm = document.querySelector('.first');
    const salaryFormData = new FormData(salaryForm);
    const salaryArray = Array.from(salaryFormData.values());

    //divide array by
    /*     var salaryIndex = Array (salaryArray.length);
        for (var i = 0, length = salaryArray.length; i < length; i++) {
            salaryIndex[i] = salaryArray[i] / salaryArray[0];
        } */

    //convert form into Array
    const inflationForm = document.querySelector('.second');
    const inflationFormData = new FormData(inflationForm)
    const inflationArray = Array.from(inflationFormData.values());

    //create inflation salary index
    var inflationIndex = Array(inflationArray.length);
    for (var i = 0, length = inflationArray.length; i < length; i++) {
        if (i < 1) { inflationIndex[0] = inflationArray[0] / 100 + 1 }
        else {
            inflationIndex[i] = inflationIndex[i - 1] * (inflationArray[i] / 100 + 1);
        }

    }

    //output value on DOM
    const body = document.querySelector('body');
    const output = document.createElement('p');
    output.innerText = `${salaryArray}. El indice inflacionario es ${inflationIndex}`;
    body.appendChild(output);
});


function inflationIndex() {

}
