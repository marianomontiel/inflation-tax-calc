const salary = document.querySelector('#salary');
const ok = document.querySelector('.ok');
let meses = ok.addEventListener('click', () => { monthList() });

//still need to remove the first inputs before modifying the input amount
function monthList() {
    let mes = 0;
    let meses = document.querySelector('#salary').value;
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
        //need to put all of this in a div
        
        const label = document.createElement('label');
        label.setAttribute('for', `salary-${mes}`);
        label.setAttribute('class', 'salary');
        label.innerText = `mes ${mes}`;

        const input = document.createElement('input');
        input.setAttribute('name', `salary-${mes}`);
        input.setAttribute('class', 'salary');
        firstDiv.appendChild(label);
        firstDiv.appendChild(input);

        //modify to allow input for inflation
        //need to put all of this in a div
        
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
  const form = document.querySelector('form');
  
    const formData = new FormData(form)
    const values= Array.from(formData.values());
    console.log(values);
  
  const container = document.querySelector('.container');
  //output value on DOM
  const output =
  document.createElement('p');
  output.innerText = `${values}`
  container.appendChild(output);
  
});


function inflationIndex() {

}
