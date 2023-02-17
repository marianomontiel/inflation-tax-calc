const salary = document.querySelector("#salary");

let startInput = document.querySelector("#start");
let endInput = document.querySelector("#end");

//assign initial values
startInput.value = "2022-11";
endInput.value = "2023-01";
let startMonth = parseInt(startInput.value.slice(-2));
let startYear = parseInt(startInput.value.slice(0, 4));
let endMonth = parseInt(endInput.value.slice(-2));
let endYear = parseInt(endInput.value.slice(0, 4));

startInput.addEventListener("change", () => {
  startMonth = parseInt(startInput.value.slice(-2));
  startYear = parseInt(startInput.value.slice(0, 4));
  endMonth = parseInt(endInput.value.slice(-2));
  endYear = parseInt(endInput.value.slice(0, 4));
  const listLenght = endYear * 12 + endMonth - (startYear * 12 + startMonth) + 1;
  errorMessage(listLenght);

});
endInput.addEventListener("change", () => {
  startMonth = parseInt(startInput.value.slice(-2));
  startYear = parseInt(startInput.value.slice(0, 4));
  endMonth = parseInt(endInput.value.slice(-2));
  endYear = parseInt(endInput.value.slice(0, 4));
  const listLenght = endYear * 12 + endMonth - (startYear * 12 + startMonth) + 1;
  errorMessage(listLenght);
});

function errorMessage(listLenght) {
  if (listLenght >= 1) {
    const inputs = document.querySelectorAll('.componentWrapper > input');
    inputs.forEach(input => input.disabled = true);
    const dateError = document.querySelector('#error');
    dateError.innerText = '';
    monthList(listLenght);
  }
  else {
    const dateError = document.querySelector('#error');
    dateError.innerText = 'Por favor, seleccione una fecha valida.';

    const inputs = document.querySelectorAll('.componentWrapper > input');
    inputs.forEach(input => input.disabled = true);
  }
}

function monthList(a) {
  let mes = 0;

  //remove inputs before adding newones
  const box = document.querySelector(".box");
  const salary = document.querySelectorAll(".componentWrapper");
  salary.forEach((salary) => {
    box.removeChild(salary);
  });

  //convert month number to string
  function getMonthName(monthNumber) {
    const date = new Date();
    date.setMonth(monthNumber - 1);

    const name = date.toLocaleString("es", { month: "long" });
    const upper = name.slice(0, 1).toUpperCase();
    const lower = name.slice(1);
    return upper + lower;
  }

  let monthCount = startMonth; //counter for labeling inputs
  let yearCount = startYear;
  function getYear(initialYearNumber) {
    if (monthCount > 12) {
      monthCount = monthCount - 12;
      yearCount++;
      return yearCount;
    } else {
      return yearCount;
    }
  }

  //create inputs
  for (let i = 0; i < a; i++, monthCount++, mes++) {
    //content wrapper
    const box = document.querySelector(".box");
    const wrapper = document.createElement("label");
    const calculate = document.querySelector("#calculate");
    wrapper.setAttribute("class", "componentWrapper");
    box.insertBefore(wrapper, calculate);

    const header = document.createElement("span");
    header.setAttribute("class", "header");
    header.innerText = `Salario ${getMonthName(monthCount)} ${getYear(
      yearCount
    )}`;
    wrapper.appendChild(header);

    //salary inputs
    const symbol = document.createElement("span");
    symbol.setAttribute("name", `salary-${mes}`);
    symbol.setAttribute("class", "salary");
    symbol.innerText = "$";
    wrapper.appendChild(symbol);

    const input = document.createElement("input");
    input.setAttribute("name", `salary-${mes}`);
    input.setAttribute("class", "input-salary");
    wrapper.appendChild(input);

    const inputs = document.querySelectorAll(".input-salary");
    inputs.forEach((input) => {
      input.addEventListener("change", () => {
        calculateTax();
      });
    });
  }
}

function calculateTax() {
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
    { Mes: 12, Año: 2022, Index: 5.1 },
    { Mes: 1, Año: 2023, Index: 6.0 }
  ];
  //filter array to desired period

  inflationTable.forEach(function (element) {
  element.date = element.Mes + element.Año * 12;
});
  
  const startDate = startMonth + startYear * 12;
  const endDate = endMonth + endYear * 12;
  const filterTable = inflationTable.filter(
    (element) =>
      element.date >= startDate &&
      element.date <= endDate
  );

  //return array of inflation values
  const inflationArray = filterTable.map((index) => index.Index);
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
  //subtract salary adjusted with original salary
  const initialValue = 0;
  const sumWithInitial = salaryArray.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    initialValue
  );

  const sumWithInitial2 = salaryAdjusted.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    initialValue
  );

  //output value on DOM
  const box = document.querySelector(".box");
  const output = document.querySelector(".output");
  output.setAttribute("style", "padding-top: 0px");
  output.innerText = `Tu salario perdió el equivalente a $ ${Math.floor((sumWithInitial2 - sumWithInitial) * 100) / 100
    } en poder de compra durante este periodo.`;
  box.appendChild(output);
}

const inputs = document.querySelectorAll(".input-salary");
inputs.forEach((input) => {
  input.addEventListener("change", () => {
    calculateTax();
  });
});

const calculateButton = document.querySelector("#calculate");
calculateButton.addEventListener("click", () => {
  calculateTax();
});
