const salary = document.querySelector("#salary");
const ok = document.querySelector(".ok");
/*let meses = ok.addEventListener("change", () => {
  if (startInput.value !== null && startInput.value !== null) {
  monthList((endYear*12 + endMonth) - (startYear + startMonth));
  }
});*/
let startInput = document.querySelector("#start");
let endInput = document.querySelector("#end");
let startMonth;
let startYear;
let endMonth;
let endYear;
startInput.addEventListener("change", () => {
  startMonth = document.querySelector("#start").value.slice(-2);
  startYear = document.querySelector("#start").value.slice(0, 4);
  endMonth = document.querySelector("#end").value.slice(-2);
  endYear = document.querySelector("#end").value.slice(0, 4);
  if (startInput.value != undefined && startInput.value != undefined) {
    monthList(endYear * 12 + endMonth - (startYear * 12 + startMonth));
  }
});
endInput.addEventListener("change", () => {
  startMonth = document.querySelector("#start").value.slice(-2);
  startYear = document.querySelector("#start").value.slice(0, 4);
  endMonth = document.querySelector("#end").value.slice(-2);
  endYear = document.querySelector("#end").value.slice(0, 4);
  if (startInput.value !== null && startInput.value !== null) {
    monthList(endYear * 12 + endMonth - (startYear * 12 + startMonth));
  }
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
  }
}
const calculate = document.querySelectorAll("input");
calculate.forEach((calculate) => {
  calculate.addEventListener("change", () => {
    //convert form into Array
    const salaryForm = document.querySelectorAll(".input-salary");
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
    //inflation array database
    const inflationTable = [
      { Mes: 1, Año: 2017, Index: 1.6 },
      { Mes: 2, Año: 2017, Index: 2.1 },
      { Mes: 3, Año: 2017, Index: 2.4 },
      { Mes: 4, Año: 2017, Index: 2.7 },
      { Mes: 5, Año: 2017, Index: 1.4 },
      { Mes: 6, Año: 2017, Index: 1.2 },
      { Mes: 7, Año: 2017, Index: 1.7 },
      { Mes: 8, Año: 2017, Index: 1.4 },
      { Mes: 9, Año: 2017, Index: 1.9 },
      { Mes: 10, Año: 2017, Index: 1.5 },
      { Mes: 11, Año: 2017, Index: 1.4 },
      { Mes: 12, Año: 2017, Index: 3.1 },
      { Mes: 1, Año: 2018, Index: 1.8 },
      { Mes: 2, Año: 2018, Index: 2.4 },
      { Mes: 3, Año: 2018, Index: 2.3 },
      { Mes: 4, Año: 2018, Index: 2.7 },
      { Mes: 5, Año: 2018, Index: 2.1 },
      { Mes: 6, Año: 2018, Index: 3.7 },
      { Mes: 7, Año: 2018, Index: 3.1 },
      { Mes: 8, Año: 2018, Index: 3.9 },
      { Mes: 9, Año: 2018, Index: 6.5 },
      { Mes: 10, Año: 2018, Index: 5.4 },
      { Mes: 11, Año: 2018, Index: 3.2 },
      { Mes: 12, Año: 2018, Index: 2.6 },
      { Mes: 1, Año: 2019, Index: 2.9 },
      { Mes: 2, Año: 2019, Index: 3.8 },
      { Mes: 3, Año: 2019, Index: 4.7 },
      { Mes: 4, Año: 2019, Index: 3.4 },
      { Mes: 5, Año: 2019, Index: 3.1 },
      { Mes: 6, Año: 2019, Index: 2.7 },
      { Mes: 7, Año: 2019, Index: 2.2 },
      { Mes: 8, Año: 2019, Index: 4 },
      { Mes: 9, Año: 2019, Index: 5.9 },
      { Mes: 10, Año: 2019, Index: 3.3 },
      { Mes: 11, Año: 2019, Index: 4.3 },
      { Mes: 12, Año: 2019, Index: 3.7 },
      { Mes: 1, Año: 2020, Index: 2.3 },
      { Mes: 2, Año: 2020, Index: 2 },
      { Mes: 3, Año: 2020, Index: 3.3 },
      { Mes: 4, Año: 2020, Index: 1.5 },
      { Mes: 5, Año: 2020, Index: 1.5 },
      { Mes: 6, Año: 2020, Index: 2.2 },
      { Mes: 7, Año: 2020, Index: 1.9 },
      { Mes: 8, Año: 2020, Index: 2.7 },
      { Mes: 9, Año: 2020, Index: 2.8 },
      { Mes: 10, Año: 2020, Index: 3.8 },
      { Mes: 11, Año: 2020, Index: 3.2 },
      { Mes: 12, Año: 2020, Index: 4 },
      { Mes: 1, Año: 2021, Index: 4 },
      { Mes: 2, Año: 2021, Index: 3.6 },
      { Mes: 3, Año: 2021, Index: 4.8 },
      { Mes: 4, Año: 2021, Index: 4.1 },
      { Mes: 5, Año: 2021, Index: 3.3 },
      { Mes: 6, Año: 2021, Index: 3.2 },
      { Mes: 7, Año: 2021, Index: 3 },
      { Mes: 8, Año: 2021, Index: 2.5 },
      { Mes: 9, Año: 2021, Index: 3.5 },
      { Mes: 10, Año: 2021, Index: 3.5 },
      { Mes: 11, Año: 2021, Index: 2.5 },
      { Mes: 12, Año: 2021, Index: 3.8 },
      { Mes: 1, Año: 2022, Index: 3.9 },
      { Mes: 2, Año: 2022, Index: 4.7 },
      { Mes: 3, Año: 2022, Index: 6.7 },
      { Mes: 4, Año: 2022, Index: 6 },
      { Mes: 5, Año: 2022, Index: 5.1 },
      { Mes: 6, Año: 2022, Index: 5.3 },
      { Mes: 7, Año: 2022, Index: 7.4 },
      { Mes: 8, Año: 2022, Index: 7 },
      { Mes: 9, Año: 2022, Index: 6.2 },
      { Mes: 10, Año: 2022, Index: 6.3 },
      { Mes: 11, Año: 2022, Index: 4.9 },
      { Mes: 12, Año: 2022, Index: 5.1 }
    ];

    //filter array to desired period
    const filterTable = inflationTable.filter(
      (date) =>
        date.Mes >= startMonth &&
        date.Año >= startYear &&
        date.Mes <= endMonth &&
        date.Año <= endYear
    );
    //return array of inflation values
    const inflationArray = filterTable.map((index) => index.Index);
    console.table(inflationArray);
    //create inflation salary index
    let inflationIndex = Array(inflationArray.length);
    let salaryAdjusted = Array(inflationArray.length);
    for (let i = 0, length = inflationArray.length; i < length; i++) {
      if (i < 1) {
        inflationIndex[0] = inflationArray[0] / 100 + 1;
      } else {
        inflationIndex[i] =
          inflationIndex[i - 1] * (inflationArray[i] / 100 + 1);
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
    output.innerText = `Tu salario perdió el equivalente a $ ${
      Math.floor((sumWithInitial2 - sumWithInitial) * 100) / 100
    } en poder de compra durante este periodo.`;
    boxDiv.appendChild(output);
  });
});

//redundant function for calculate button
const calculateButton = document.querySelector("#calculate");
calculateButton.addEventListener("click", () => {
  //pupulate inputs with specific value
  /* const one = document.querySelectorAll('.input-salary');
    one.forEach(one => {
        one.value = 100
    });

    const two = document.querySelectorAll('.input-inflation');
    two.forEach(two => {
        two.value = 100
    }); */

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

  //inflation array database
  const inflationTable = [
    { Mes: 1, Año: 2017, Index: 1.6 },
    { Mes: 2, Año: 2017, Index: 2.1 },
    { Mes: 3, Año: 2017, Index: 2.4 },
    { Mes: 4, Año: 2017, Index: 2.7 },
    { Mes: 5, Año: 2017, Index: 1.4 },
    { Mes: 6, Año: 2017, Index: 1.2 },
    { Mes: 7, Año: 2017, Index: 1.7 },
    { Mes: 8, Año: 2017, Index: 1.4 },
    { Mes: 9, Año: 2017, Index: 1.9 },
    { Mes: 10, Año: 2017, Index: 1.5 },
    { Mes: 11, Año: 2017, Index: 1.4 },
    { Mes: 12, Año: 2017, Index: 3.1 },
    { Mes: 1, Año: 2018, Index: 1.8 },
    { Mes: 2, Año: 2018, Index: 2.4 },
    { Mes: 3, Año: 2018, Index: 2.3 },
    { Mes: 4, Año: 2018, Index: 2.7 },
    { Mes: 5, Año: 2018, Index: 2.1 },
    { Mes: 6, Año: 2018, Index: 3.7 },
    { Mes: 7, Año: 2018, Index: 3.1 },
    { Mes: 8, Año: 2018, Index: 3.9 },
    { Mes: 9, Año: 2018, Index: 6.5 },
    { Mes: 10, Año: 2018, Index: 5.4 },
    { Mes: 11, Año: 2018, Index: 3.2 },
    { Mes: 12, Año: 2018, Index: 2.6 },
    { Mes: 1, Año: 2019, Index: 2.9 },
    { Mes: 2, Año: 2019, Index: 3.8 },
    { Mes: 3, Año: 2019, Index: 4.7 },
    { Mes: 4, Año: 2019, Index: 3.4 },
    { Mes: 5, Año: 2019, Index: 3.1 },
    { Mes: 6, Año: 2019, Index: 2.7 },
    { Mes: 7, Año: 2019, Index: 2.2 },
    { Mes: 8, Año: 2019, Index: 4 },
    { Mes: 9, Año: 2019, Index: 5.9 },
    { Mes: 10, Año: 2019, Index: 3.3 },
    { Mes: 11, Año: 2019, Index: 4.3 },
    { Mes: 12, Año: 2019, Index: 3.7 },
    { Mes: 1, Año: 2020, Index: 2.3 },
    { Mes: 2, Año: 2020, Index: 2 },
    { Mes: 3, Año: 2020, Index: 3.3 },
    { Mes: 4, Año: 2020, Index: 1.5 },
    { Mes: 5, Año: 2020, Index: 1.5 },
    { Mes: 6, Año: 2020, Index: 2.2 },
    { Mes: 7, Año: 2020, Index: 1.9 },
    { Mes: 8, Año: 2020, Index: 2.7 },
    { Mes: 9, Año: 2020, Index: 2.8 },
    { Mes: 10, Año: 2020, Index: 3.8 },
    { Mes: 11, Año: 2020, Index: 3.2 },
    { Mes: 12, Año: 2020, Index: 4 },
    { Mes: 1, Año: 2021, Index: 4 },
    { Mes: 2, Año: 2021, Index: 3.6 },
    { Mes: 3, Año: 2021, Index: 4.8 },
    { Mes: 4, Año: 2021, Index: 4.1 },
    { Mes: 5, Año: 2021, Index: 3.3 },
    { Mes: 6, Año: 2021, Index: 3.2 },
    { Mes: 7, Año: 2021, Index: 3 },
    { Mes: 8, Año: 2021, Index: 2.5 },
    { Mes: 9, Año: 2021, Index: 3.5 },
    { Mes: 10, Año: 2021, Index: 3.5 },
    { Mes: 11, Año: 2021, Index: 2.5 },
    { Mes: 12, Año: 2021, Index: 3.8 },
    { Mes: 1, Año: 2022, Index: 3.9 },
    { Mes: 2, Año: 2022, Index: 4.7 },
    { Mes: 3, Año: 2022, Index: 6.7 },
    { Mes: 4, Año: 2022, Index: 6 },
    { Mes: 5, Año: 2022, Index: 5.1 },
    { Mes: 6, Año: 2022, Index: 5.3 },
    { Mes: 7, Año: 2022, Index: 7.4 },
    { Mes: 8, Año: 2022, Index: 7 },
    { Mes: 9, Año: 2022, Index: 6.2 },
    { Mes: 10, Año: 2022, Index: 6.3 },
    { Mes: 11, Año: 2022, Index: 4.9 },
    { Mes: 12, Año: 2022, Index: 5.1 }
  ];

  //filter array to desired period
  const filterTable = inflationTable.filter(
    (date) =>
      date.Mes >= "1" &&
      date.Año >= 2022 &&
      date.Mes <= "12" &&
      date.Año <= 2022
  );
  console.table(filterTable);
  //return array of inflation values
  const inflationArray = filterTable.map((index) => index.Index);
  console.table(inflationArray);

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
  output.innerText = `Tu salario perdió el equivalente a $ ${
    Math.floor((sumWithInitial2 - sumWithInitial) * 100) / 100
  } en poder de compra durante este periodo.`;
  boxDiv.appendChild(output);
});
