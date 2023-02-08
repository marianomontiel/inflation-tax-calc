const salary = document.querySelector("#salary");
const ok = document.querySelector(".ok");
let meses = ok.addEventListener("click", () => {
  monthList(document.querySelector("#salary").value);
});

function monthList(a) {
  let mes = 0;
  meses = a;
  const body = document.querySelector(".box");

  //remove inputs before adding newones
  const container = document.querySelector(".container");
  const salary = document.querySelectorAll(".componentWrapper");
  salary.forEach((salary) => {
    container.removeChild(salary);
  });

  const inflation = document.querySelectorAll(".inflation");
  const secondDiv = document.querySelector(".second");
  inflation.forEach((inflation) => {
    secondDiv.removeChild(inflation);
  });

  //create inputs
  for (let i = 0; i < meses; i++) {
    mes += 1;

    //content wrapper
    const body = document.querySelector(".container");
    const div = document.createElement("div");
    div.setAttribute("class", "componentWrapper");
    body.appendChild(div);

    const divChild = document.createElement("div");
    divChild.setAttribute("class", "header");
    divChild.innerText = `Mes ${mes}`;
    div.appendChild(divChild);
    
    //salary inputs
    const label = document.createElement("label");
    label.setAttribute("for", `salary-${mes}`);
    label.setAttribute("class", "salary mes");
    label.innerText = `Salario`;

    const spanSalary = document.createElement("span");
    spanSalary.setAttribute("name", `salary-${mes}`);
    spanSalary.setAttribute("class", "salary");
    spanSalary.innerText = "$";

    const input = document.createElement("input");
    input.setAttribute("name", `salary-${mes}`);
    input.setAttribute("class", "input-salary");

    div.appendChild(label);
    div.appendChild(spanSalary);
    spanSalary.appendChild(input);

    //inflation inputs
    const inflationLabel = document.createElement("label");
    inflationLabel.setAttribute("for", `inflation-${mes}`);
    inflationLabel.setAttribute("class", "inflation mes");
    inflationLabel.innerText = `Inflación`;

    const spanInflation = document.createElement("span");
    spanInflation.setAttribute("name", `salary-${mes}`);
    spanInflation.setAttribute("class", "inflation");
    spanInflation.innerText = "%";

    const inflationInput = document.createElement("input");
    inflationInput.setAttribute("name", `inflation-${mes}`);
    inflationInput.setAttribute("class", "input-inflation");

    div.appendChild(inflationLabel);
    div.appendChild(spanInflation);
    spanInflation.appendChild(inflationInput);
  }
}

const calculate = document.querySelector("#calculate");
calculate.addEventListener("click", () => {
  //convert form into Array
  const salaryForm = document.querySelectorAll(".input-salary");
  console.log(salaryForm);
  const salaryFormData = new FormData();
  salaryForm.forEach((salaryForm) => {
    salaryFormData.append(salaryForm.name, salaryForm.value);
  });
  let salaryArray = Array.from(salaryFormData.values());
  //convert Array input to number
  salaryArray = salaryArray.map(function (v) {
    return parseInt(v) || 0;
  });
  console.log(salaryArray);

  //convert form into Array
  const inflationForm = document.querySelectorAll(".input-inflation");
  const inflationFormData = new FormData();
  inflationForm.forEach((inflationForm) => {
    inflationFormData.append(inflationForm.name, inflationForm.value);
  });
  const inflationArray = Array.from(inflationFormData.values());

  //create inflation salary index
  let inflationIndex = Array(inflationArray.length);
  let salaryAdjusted = Array(inflationArray.length);
  for (let i = 0, length = inflationArray.length; i < length; i++) {
    if (i < 1) {
      inflationIndex[0] = inflationArray[0] / 100 + 1;
    } else {
      inflationIndex[i] = inflationIndex[i - 1] * (inflationArray[i] / 100 + 1);
    }
    salaryAdjusted[i] = inflationIndex[i] * salaryArray[i];
  }
  console.log(salaryAdjusted);

  //subtract salary adjusted with original salary
  const initialValue = 0;
  const sumWithInitial = salaryArray.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    initialValue
  );
  console.log(sumWithInitial);

  const sumWithInitial2 = salaryAdjusted.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    initialValue
  );
  console.log(sumWithInitial2);

  //output value on DOM
  const boxDiv = document.querySelector(".box > div");
  const output = document.querySelector(".output");
  output.setAttribute("style", "padding-top: 0px");
  output.innerText = `Pagaste $ ${
    Math.floor((sumWithInitial2 - sumWithInitial) * 100) / 100
  } en impuesto inflacionado en ese periodo.`;
  boxDiv.appendChild(output);
});
