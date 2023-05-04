//I should import a json to make script shorter
//import myJson from './example.json' assert {type: 'json'};

const salary = document.querySelector("#salary");

let startInput = document.querySelector("#start");
let endInput = document.querySelector("#end");

//assign initial values
startInput.value = "2023-01";
endInput.value = "2023-03";
let startMonth = parseInt(startInput.value.slice(-2));
let startYear = parseInt(startInput.value.slice(0, 4));
let endMonth = parseInt(endInput.value.slice(-2));
let endYear = parseInt(endInput.value.slice(0, 4));

startInput.addEventListener("change", () => {
  startMonth = parseInt(startInput.value.slice(-2));
  startYear = parseInt(startInput.value.slice(0, 4));
  endMonth = parseInt(endInput.value.slice(-2));
  endYear = parseInt(endInput.value.slice(0, 4));
  const listLenght =
    endYear * 12 + endMonth - (startYear * 12 + startMonth) + 1;
  errorMessage(listLenght);
});
endInput.addEventListener("change", () => {
  startMonth = parseInt(startInput.value.slice(-2));
  startYear = parseInt(startInput.value.slice(0, 4));
  endMonth = parseInt(endInput.value.slice(-2));
  endYear = parseInt(endInput.value.slice(0, 4));
  const listLenght =
    endYear * 12 + endMonth - (startYear * 12 + startMonth) + 1;
  errorMessage(listLenght);
});

function errorMessage(listLenght) {
  if (listLenght >= 1) {
    const inputs = document.querySelectorAll(".componentWrapper > input");
    inputs.forEach((input) => (input.disabled = true));
    const dateError = document.querySelector("#error");
    dateError.innerText = "";
    monthList(listLenght);
  } else {
    const dateError = document.querySelector("#error");
    dateError.innerText = "Por favor, seleccione una fecha valida.";

    const inputs = document.querySelectorAll(".componentWrapper > input");
    inputs.forEach((input) => (input.disabled = true));
  }
}

function getDateName(month, year) {
  const date = new Date();
  date.setMonth(month - 1);
  date.setFullYear(year);

  const name = date.toLocaleString("es", { month: "long" }) + " " + year;
  return name;
}

function monthList(a) {
  let mes = 0;

  //remove inputs before adding newones
  const box = document.querySelector("#input-list");
  const salary = document.querySelectorAll("#input-list > .componentWrapper");
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
    const box = document.querySelector("#input-list");
    const wrapper = document.createElement("label");
    const calculate = document.querySelector("#calculate");
    wrapper.setAttribute("class", "componentWrapper");
    box.appendChild(wrapper);

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
    input.type = "number";
    input.setAttribute("name", `salary-${mes}`);
    input.setAttribute("class", "number-input");
    input.classList.add("tax-input");
    wrapper.appendChild(input);
  }
}
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
  { Mes: 1, Año: 2023, Index: 6.0 },
  { Mes: 2, Año: 2023, Index: 6.6 },
  { Mes: 3, Año: 2023, Index: 7.7 }
];

let calculation = 0;
function calculateTax() {
  //convert form into Array
  const salaryForm = document.querySelectorAll(".tax-input");
  const salaryFormData = new FormData();
  salaryForm.forEach((salaryForm) => {
    salaryFormData.append(salaryForm.name, salaryForm.value);
  });
  let salaryArray = Array.from(salaryFormData.values());

  //filter array to desired period
  inflationTable.forEach(function (element) {
    element.date = element.Mes + element.Año * 12;
  });

  const startDate = startMonth + startYear * 12;
  const endDate = endMonth + endYear * 12;
  const filterTable = inflationTable.filter(
    (element) => element.date >= startDate && element.date <= endDate
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
    salaryAdjusted[i] = inflationIndex[i] * salaryArray[0];
  }

  //Calculate the final $ amount and adjust it to the end of the period value(present value)
  let accumulatedLosses = Array(inflationArray.length);
  for (let i = 0, length = inflationArray.length; i < length; i++) {
    accumulatedLosses[i] = salaryAdjusted[i] - salaryArray[i];
  }
  // const totalLosses = accumulatedLosses.reduce((total, salaries) => total + salaries, 0);

  //Calculate the final $ amount and adjust it to the end of the period value(present value)
  let finalAdjustedLosses = Array(inflationArray.length);
  let indexesToAdjustInflation = Array(inflationArray.length);

  for (let i = 0, length = inflationArray.length; i < length; i++) {
    for (let b = i, length = inflationArray.length; b < length; b++) {
      if (b === i) {
        indexesToAdjustInflation[i] = (inflationArray[b] / 100 + 1);// it was 1 before realizing inflation ocurrs also the final month
      } else {
        indexesToAdjustInflation[b] =
          (inflationArray[b] / 100 + 1) * indexesToAdjustInflation[b - 1];
      }
    }
    finalAdjustedLosses[i] =
      indexesToAdjustInflation[indexesToAdjustInflation.length - 1] *
      accumulatedLosses[i];
  }
  const totalLosses = finalAdjustedLosses.reduce(
    (total, monthlylosses) => total + monthlylosses,
    0
  );

  calculation = Math.floor(totalLosses * 100) / 100;

  //output value on DOM
  const box = document.querySelector(".box > .tax");
  const output = document.querySelector(".tax > .output");
  output.setAttribute("style", "padding-top: 0px; color: black; font-size: 20px;");
  output.innerText = `Según INDEC tu salario acumuló una perdida total de $${numberWithCommas(calculation)} respecto de la inflación en el periodo comprendido entre ${getDateName(startMonth, startYear)} y ${getDateName(endMonth, endYear)}.`;
  const twitText = `Según INDEC mi salario acumuló una perdida total de $${numberWithCommas(calculation)} respecto de la inflación en el periodo comprendido entre ${getDateName(startMonth, startYear)} y ${getDateName(endMonth, endYear)}.`;
  box.appendChild(output);

  //set twit button settings
  tweetButton(twitText);
  
  //dolarize
  const dolarizedInflationAdjustedSalary = dolarizedSalary(salaryAdjusted);
  const dolarizedSalaries = dolarizedSalary(salaryArray);  
  //new charts
  createSalaryChart(filterTable, salaryArray, salaryAdjusted, accumulatedLosses, finalAdjustedLosses, dolarizedInflationAdjustedSalary, dolarizedSalaries);
}

//Fuente https://datos.gob.ar/dataset/sspm-salario-minimo-vital-movil-pesos-corrientes/archivo/sspm_57.1
const minimumWage = [
{Mes:1,Año:2017,Sueldo:8060.0},
{Mes:2,Año:2017,Sueldo:8060.0},
{Mes:3,Año:2017,Sueldo:8060.0},
{Mes:4,Año:2017,Sueldo:8060.0},
{Mes:5,Año:2017,Sueldo:8060.0},
{Mes:6,Año:2017,Sueldo:8060.0},
{Mes:7,Año:2017,Sueldo:8860.0},
{Mes:8,Año:2017,Sueldo:8860.0},
{Mes:9,Año:2017,Sueldo:8860.0},
{Mes:10,Año:2017,Sueldo:8860.0},
{Mes:11,Año:2017,Sueldo:8860.0},
{Mes:12,Año:2017,Sueldo:8860.0},
{Mes:1,Año:2018,Sueldo:9500.0},
{Mes:2,Año:2018,Sueldo:9500.0},
{Mes:3,Año:2018,Sueldo:9500.0},
{Mes:4,Año:2018,Sueldo:9500.0},
{Mes:5,Año:2018,Sueldo:9500.0},
{Mes:6,Año:2018,Sueldo:9500.0},
{Mes:7,Año:2018,Sueldo:10000.0},
{Mes:8,Año:2018,Sueldo:10000.0},
{Mes:9,Año:2018,Sueldo:10700.0},
{Mes:10,Año:2018,Sueldo:10700.0},
{Mes:11,Año:2018,Sueldo:10700.0},
{Mes:12,Año:2018,Sueldo:11300.0},
{Mes:1,Año:2019,Sueldo:11300.0},
{Mes:2,Año:2019,Sueldo:11300.0},
{Mes:3,Año:2019,Sueldo:12500.0},
{Mes:4,Año:2019,Sueldo:12500.0},
{Mes:5,Año:2019,Sueldo:12500.0},
{Mes:6,Año:2019,Sueldo:12500.0},
{Mes:7,Año:2019,Sueldo:12500.0},
{Mes:8,Año:2019,Sueldo:14125.0},
{Mes:9,Año:2019,Sueldo:15625.0},
{Mes:10,Año:2019,Sueldo:16875.0},
{Mes:11,Año:2019,Sueldo:16875.0},
{Mes:12,Año:2019,Sueldo:16875.0},
{Mes:1,Año:2020,Sueldo:16875.0},
{Mes:2,Año:2020,Sueldo:16875.0},
{Mes:3,Año:2020,Sueldo:16875.0},
{Mes:4,Año:2020,Sueldo:16875.0},
{Mes:5,Año:2020,Sueldo:16875.0},
{Mes:6,Año:2020,Sueldo:16875.0},
{Mes:7,Año:2020,Sueldo:16875.0},
{Mes:8,Año:2020,Sueldo:16875.0},
{Mes:9,Año:2020,Sueldo:16875.0},
{Mes:10,Año:2020,Sueldo:18900.0},
{Mes:11,Año:2020,Sueldo:18900.0},
{Mes:12,Año:2020,Sueldo:20587.5},
{Mes:1,Año:2021,Sueldo:20587.5},
{Mes:2,Año:2021,Sueldo:20587.5},
{Mes:3,Año:2021,Sueldo:21600.0},
{Mes:4,Año:2021,Sueldo:23544.0},
{Mes:5,Año:2021,Sueldo:24407.999999999996},
{Mes:6,Año:2021,Sueldo:25272.0},
{Mes:7,Año:2021,Sueldo:27216.0},
{Mes:8,Año:2021,Sueldo:28080.0},
{Mes:9,Año:2021,Sueldo:31104.0},
{Mes:10,Año:2021,Sueldo:32000.0},
{Mes:11,Año:2021,Sueldo:32000.0},
{Mes:12,Año:2021,Sueldo:32000.0},
{Mes:1,Año:2022,Sueldo:32000.0},
{Mes:2,Año:2022,Sueldo:33000.0},
{Mes:3,Año:2022,Sueldo:33000.0},
{Mes:4,Año:2022,Sueldo:38940.0},
{Mes:5,Año:2022,Sueldo:38940.0},
{Mes:6,Año:2022,Sueldo:45540.0},
{Mes:7,Año:2022,Sueldo:45540.0},
{Mes:8,Año:2022,Sueldo:47850.0},
{Mes:9,Año:2022,Sueldo:51200.0},
{Mes:10,Año:2022,Sueldo:54550.0},
{Mes:11,Año:2022,Sueldo:57900.0},
{Mes:12,Año:2022,Sueldo:61953.0},
{Mes:1,Año:2023,Sueldo:65427.0},
{Mes:2,Año:2023,Sueldo:67743.0},
{Mes:3,Año:2023,Sueldo:69500.0}
];

function calculateMinimumWage() {
  //convert form into Array
  minimumWage.forEach(function (element) {
    element.date = element.Mes + element.Año * 12;
  });

  const startDate = startMonth + startYear * 12;
  const endDate = endMonth + endYear * 12;
  const wageFiltered = minimumWage.filter(
    (element) => element.date >= startDate && element.date <= endDate
  );

  const wageMapped = wageFiltered.map((value) => value.Sueldo);
  fillAll(wageMapped);
  //filter array to desired period
  inflationTable.forEach(function (element) {
    element.date = element.Mes + element.Año * 12;
  });

  const filterTable = inflationTable.filter(
    (element) => element.date >= startDate && element.date <= endDate
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
    salaryAdjusted[i] = inflationIndex[i] * wageMapped[0];
  }

  //Calculate the final $ amount and adjust it to the end of the period value(present value)
  let accumulatedLosses = Array(inflationArray.length);
  for (let i = 0, length = inflationArray.length; i < length; i++) {
    accumulatedLosses[i] = salaryAdjusted[i] - wageMapped[i];
  }
  // const totalLosses = accumulatedLosses.reduce((total, salaries) => total + salaries, 0);

  //Calculate the final $ amount and adjust it to the end of the period value(present value)
  let finalAdjustedLosses = Array(inflationArray.length);
  let indexesToAdjustInflation = Array(inflationArray.length);

  for (let i = 0, length = inflationArray.length; i < length; i++) {
    for (let b = i, length = inflationArray.length; b < length; b++) {
      if (b === i) {
        indexesToAdjustInflation[i] = (inflationArray[b] / 100 + 1);// it was 1 before realizing inflation ocurrs also the final month
      } else {
        indexesToAdjustInflation[b] =
          (inflationArray[b] / 100 + 1) * indexesToAdjustInflation[b - 1];
      }
    }
    finalAdjustedLosses[i] =
      indexesToAdjustInflation[indexesToAdjustInflation.length - 1] *
      accumulatedLosses[i];
  }

  const totalLosses = finalAdjustedLosses.reduce(
    (total, monthlylosses) => total + monthlylosses,
    0
  );

  calculation = Math.floor(totalLosses * 100) / 100;

  //output value on DOM
  const box = document.querySelector(".box > .tax");
  const output = document.querySelector(".tax > .output");
  output.setAttribute("style", "padding-top: 0px; color: black; font-size: 20px;");
  output.innerText = `Según INDEC el Salario Minimo Vital y Movil acumuló una perdida total de $${numberWithCommas(calculation)} respecto de la inflación en el periodo comprendido entre ${getDateName(startMonth, startYear)} y ${getDateName(endMonth, endYear)}.`;
  const twitText = encodeURIComponent(output.innerText);
  box.appendChild(output);
  tweetButton(twitText);

  //dolarize 
  const dolarizedInflationAdjustedSalary = dolarizedSalary(salaryAdjusted);
  const dolarizedSalaries = dolarizedSalary(wageMapped);
  //new charts
  createSalaryChart(filterTable, wageMapped, salaryAdjusted, accumulatedLosses, finalAdjustedLosses, dolarizedInflationAdjustedSalary, dolarizedSalaries);
}
function dolarizedSalary(filteredSalaryArray) {
  const dolarHistorico =
[{"Fecha":"03/05/2023","Compra":467.00,"Venta":472.00},
{"Fecha":"03/05/2023","Compra":469.00,"Venta":474.00},
{"Fecha":"02/05/2023","Compra":464.00,"Venta":469.00},
{"Fecha":"27/04/2023","Compra":462.00,"Venta":467.00},
{"Fecha":"26/04/2023","Compra":469.00,"Venta":474.00},
{"Fecha":"25/04/2023","Compra":490.00,"Venta":495.00},
{"Fecha":"24/04/2023","Compra":457.00,"Venta":462.00},
{"Fecha":"21/04/2023","Compra":437.00,"Venta":442.00},
{"Fecha":"20/04/2023","Compra":427.00,"Venta":432.00},
{"Fecha":"19/04/2023","Compra":418.00,"Venta":423.00},
{"Fecha":"18/04/2023","Compra":413.00,"Venta":418.00},
{"Fecha":"17/04/2023","Compra":403.00,"Venta":408.00},
{"Fecha":"14/04/2023","Compra":396.00,"Venta":400.00},
{"Fecha":"13/04/2023","Compra":394.00,"Venta":398.00},
{"Fecha":"12/04/2023","Compra":390.00,"Venta":394.00},
{"Fecha":"11/04/2023","Compra":387.00,"Venta":391.00},
{"Fecha":"10/04/2023","Compra":388.00,"Venta":392.00},
{"Fecha":"05/04/2023","Compra":388.00,"Venta":392.00},
{"Fecha":"04/04/2023","Compra":388.00,"Venta":392.00},
{"Fecha":"03/04/2023","Compra":391.00,"Venta":395.00},
{"Fecha":"31/03/2023","Compra":388.00,"Venta":393.00},
{"Fecha":"30/03/2023","Compra":389.00,"Venta":393.00},
{"Fecha":"29/03/2023","Compra":393.00,"Venta":397.00},
{"Fecha":"28/03/2023","Compra":386.00,"Venta":390.00},
{"Fecha":"28/03/2023","Compra":386.00,"Venta":390.00},
{"Fecha":"27/03/2023","Compra":385.00,"Venta":389.00},
{"Fecha":"23/03/2023","Compra":387.00,"Venta":391.00},
{"Fecha":"22/03/2023","Compra":390.00,"Venta":394.00},
{"Fecha":"21/03/2023","Compra":382.00,"Venta":386.00},
{"Fecha":"20/03/2023","Compra":379.00,"Venta":383.00},
{"Fecha":"17/03/2023","Compra":379.00,"Venta":383.00},
{"Fecha":"16/03/2023","Compra":375.00,"Venta":379.00},
{"Fecha":"15/03/2023","Compra":373.00,"Venta":377.00},
{"Fecha":"14/03/2023","Compra":373.00,"Venta":377.00},
{"Fecha":"13/03/2023","Compra":369.00,"Venta":373.00},
{"Fecha":"10/03/2023","Compra":369.00,"Venta":373.00},
{"Fecha":"09/03/2023","Compra":374.00,"Venta":378.00},
{"Fecha":"08/03/2023","Compra":367.00,"Venta":371.00},
{"Fecha":"07/03/2023","Compra":368.00,"Venta":372.00},
{"Fecha":"06/03/2023","Compra":371.00,"Venta":375.00},
{"Fecha":"03/03/2023","Compra":373.00,"Venta":377.00},
{"Fecha":"02/03/2023","Compra":371.00,"Venta":375.00},
{"Fecha":"01/03/2023","Compra":371.00,"Venta":375.00},
{"Fecha":"28/02/2023","Compra":373.00,"Venta":377.00},
{"Fecha":"27/02/2023","Compra":375.00,"Venta":379.00},
{"Fecha":"24/02/2023","Compra":375.00,"Venta":379.00},
{"Fecha":"23/02/2023","Compra":373.00,"Venta":377.00},
{"Fecha":"22/02/2023","Compra":373.00,"Venta":377.00},
{"Fecha":"17/02/2023","Compra":373.00,"Venta":377.00},
{"Fecha":"16/02/2023","Compra":374.00,"Venta":378.00},
{"Fecha":"15/02/2023","Compra":375.00,"Venta":379.00},
{"Fecha":"14/02/2023","Compra":375.00,"Venta":379.00},
{"Fecha":"13/02/2023","Compra":373.00,"Venta":377.00},
{"Fecha":"10/02/2023","Compra":375.00,"Venta":379.00},
{"Fecha":"09/02/2023","Compra":377.00,"Venta":381.00},
{"Fecha":"07/02/2023","Compra":373.00,"Venta":377.00},
{"Fecha":"06/02/2023","Compra":369.00,"Venta":373.00},
{"Fecha":"03/02/2023","Compra":374.00,"Venta":378.00},
{"Fecha":"02/02/2023","Compra":373.00,"Venta":377.00},
{"Fecha":"01/02/2023","Compra":377.00,"Venta":381.00},
{"Fecha":"31/01/2023","Compra":379.00,"Venta":383.00},
{"Fecha":"30/01/2023","Compra":382.00,"Venta":386.00},
{"Fecha":"27/01/2023","Compra":381.00,"Venta":385.00},
{"Fecha":"26/01/2023","Compra":379.00,"Venta":383.00},
{"Fecha":"25/01/2023","Compra":377.00,"Venta":381.00},
{"Fecha":"24/01/2023","Compra":372.00,"Venta":376.00},
{"Fecha":"23/01/2023","Compra":372.00,"Venta":376.00},
{"Fecha":"20/01/2023","Compra":370.00,"Venta":374.00},
{"Fecha":"19/01/2023","Compra":373.00,"Venta":377.00},
{"Fecha":"18/01/2023","Compra":374.00,"Venta":378.00},
{"Fecha":"17/01/2023","Compra":366.00,"Venta":370.00},
{"Fecha":"16/01/2023","Compra":365.00,"Venta":369.00},
{"Fecha":"13/01/2023","Compra":365.00,"Venta":369.00},
{"Fecha":"12/01/2023","Compra":357.00,"Venta":361.00},
{"Fecha":"11/01/2023","Compra":355.00,"Venta":359.00},
{"Fecha":"10/01/2023","Compra":353.00,"Venta":357.00},
{"Fecha":"09/01/2023","Compra":351.00,"Venta":355.00},
{"Fecha":"06/01/2023","Compra":350.00,"Venta":354.00},
{"Fecha":"05/01/2023","Compra":349.00,"Venta":353.00},
{"Fecha":"04/01/2023","Compra":350.00,"Venta":354.00},
{"Fecha":"03/01/2023","Compra":350.00,"Venta":354.00},
{"Fecha":"02/01/2023","Compra":342.00,"Venta":346.00},
{"Fecha":"30/12/2022","Compra":342.00,"Venta":346.00},
{"Fecha":"29/12/2022","Compra":346.00,"Venta":350.00},
{"Fecha":"28/12/2022","Compra":353.00,"Venta":357.00},
{"Fecha":"27/12/2022","Compra":352.00,"Venta":356.00},
{"Fecha":"26/12/2022","Compra":342.00,"Venta":346.00},
{"Fecha":"23/12/2022","Compra":336.00,"Venta":340.00},
{"Fecha":"22/12/2022","Compra":326.00,"Venta":330.00},
{"Fecha":"21/12/2022","Compra":321.00,"Venta":325.00},
{"Fecha":"20/12/2022","Compra":322.00,"Venta":326.00},
{"Fecha":"19/12/2022","Compra":321.00,"Venta":325.00},
{"Fecha":"16/12/2022","Compra":317.00,"Venta":321.00},
{"Fecha":"15/12/2022","Compra":316.00,"Venta":320.00},
{"Fecha":"14/12/2022","Compra":316.00,"Venta":320.00},
{"Fecha":"13/12/2022","Compra":311.00,"Venta":315.00},
{"Fecha":"12/12/2022","Compra":308.00,"Venta":312.00},
{"Fecha":"07/12/2022","Compra":312.00,"Venta":316.00},
{"Fecha":"06/12/2022","Compra":311.00,"Venta":315.00},
{"Fecha":"05/12/2022","Compra":308.00,"Venta":312.00},
{"Fecha":"02/12/2022","Compra":308.00,"Venta":312.00},
{"Fecha":"01/12/2022","Compra":309.00,"Venta":313.00},
{"Fecha":"30/11/2022","Compra":310.00,"Venta":314.00},
{"Fecha":"29/11/2022","Compra":311.00,"Venta":315.00},
{"Fecha":"28/11/2022","Compra":314.00,"Venta":318.00},
{"Fecha":"25/11/2022","Compra":316.00,"Venta":320.00},
{"Fecha":"24/11/2022","Compra":315.00,"Venta":319.00},
{"Fecha":"23/11/2022","Compra":308.00,"Venta":312.00},
{"Fecha":"22/11/2022","Compra":304.00,"Venta":308.00},
{"Fecha":"18/11/2022","Compra":302.00,"Venta":306.00},
{"Fecha":"18/11/2022","Compra":303.00,"Venta":307.00},
{"Fecha":"18/11/2022","Compra":303.00,"Venta":307.00},
{"Fecha":"17/11/2022","Compra":303.00,"Venta":307.00},
{"Fecha":"16/11/2022","Compra":304.00,"Venta":308.00},
{"Fecha":"15/11/2022","Compra":298.00,"Venta":302.00},
{"Fecha":"14/11/2022","Compra":290.00,"Venta":294.00},
{"Fecha":"11/11/2022","Compra":289.00,"Venta":293.00},
{"Fecha":"10/11/2022","Compra":288.00,"Venta":292.00},
{"Fecha":"09/11/2022","Compra":288.00,"Venta":292.00},
{"Fecha":"08/11/2022","Compra":287.00,"Venta":291.00},
{"Fecha":"07/11/2022","Compra":286.00,"Venta":290.00},
{"Fecha":"04/11/2022","Compra":285.00,"Venta":289.00},
{"Fecha":"03/11/2022","Compra":283.00,"Venta":287.00},
{"Fecha":"02/11/2022","Compra":287.00,"Venta":291.00},
{"Fecha":"01/11/2022","Compra":286.00,"Venta":290.00},
{"Fecha":"31/10/2022","Compra":286.00,"Venta":290.00},
{"Fecha":"28/10/2022","Compra":288.00,"Venta":292.00},
{"Fecha":"27/10/2022","Compra":287.00,"Venta":291.00},
{"Fecha":"26/10/2022","Compra":288.00,"Venta":292.00},
{"Fecha":"25/10/2022","Compra":289.00,"Venta":293.00},
{"Fecha":"24/10/2022","Compra":287.00,"Venta":291.00},
{"Fecha":"21/10/2022","Compra":287.00,"Venta":291.00},
{"Fecha":"20/10/2022","Compra":287.00,"Venta":291.00},
{"Fecha":"19/10/2022","Compra":288.00,"Venta":292.00},
{"Fecha":"18/10/2022","Compra":286.00,"Venta":290.00},
{"Fecha":"17/10/2022","Compra":283.00,"Venta":287.00},
{"Fecha":"14/10/2022","Compra":286.00,"Venta":290.00},
{"Fecha":"13/10/2022","Compra":287.00,"Venta":291.00},
{"Fecha":"12/10/2022","Compra":285.00,"Venta":289.00},
{"Fecha":"11/10/2022","Compra":276.00,"Venta":280.00},
{"Fecha":"06/10/2022","Compra":273.00,"Venta":277.00},
{"Fecha":"05/10/2022","Compra":278.00,"Venta":282.00},
{"Fecha":"04/10/2022","Compra":278.00,"Venta":282.00},
{"Fecha":"03/10/2022","Compra":280.00,"Venta":284.00},
{"Fecha":"30/09/2022","Compra":284.00,"Venta":288.00},
{"Fecha":"29/09/2022","Compra":284.00,"Venta":288.00},
{"Fecha":"28/09/2022","Compra":286.00,"Venta":290.00},
{"Fecha":"27/09/2022","Compra":286.00,"Venta":290.00},
{"Fecha":"26/09/2022","Compra":282.00,"Venta":286.00},
{"Fecha":"23/09/2022","Compra":283.00,"Venta":287.00},
{"Fecha":"22/09/2022","Compra":281.00,"Venta":285.00},
{"Fecha":"22/09/2022","Compra":283.00,"Venta":287.00},
{"Fecha":"21/09/2022","Compra":283.00,"Venta":287.00},
{"Fecha":"20/09/2022","Compra":283.00,"Venta":287.00},
{"Fecha":"19/09/2022","Compra":273.00,"Venta":277.00},
{"Fecha":"16/09/2022","Compra":273.00,"Venta":277.00},
{"Fecha":"15/09/2022","Compra":272.00,"Venta":276.00},
{"Fecha":"14/09/2022","Compra":273.00,"Venta":277.00},
{"Fecha":"13/09/2022","Compra":269.00,"Venta":273.00},
{"Fecha":"12/09/2022","Compra":268.00,"Venta":272.00},
{"Fecha":"09/09/2022","Compra":270.00,"Venta":274.00},
{"Fecha":"08/09/2022","Compra":276.00,"Venta":280.00},
{"Fecha":"07/09/2022","Compra":280.00,"Venta":284.00},
{"Fecha":"06/09/2022","Compra":272.00,"Venta":276.00},
{"Fecha":"05/09/2022","Compra":266.00,"Venta":270.00},
{"Fecha":"02/09/2022","Compra":280.00,"Venta":285.00},
{"Fecha":"01/09/2022","Compra":280.00,"Venta":285.00},
{"Fecha":"31/08/2022","Compra":285.00,"Venta":290.00},
{"Fecha":"30/08/2022","Compra":286.00,"Venta":291.00},
{"Fecha":"29/08/2022","Compra":287.00,"Venta":292.00},
{"Fecha":"26/08/2022","Compra":288.00,"Venta":292.00},
{"Fecha":"25/08/2022","Compra":288.00,"Venta":293.00},
{"Fecha":"24/08/2022","Compra":290.00,"Venta":295.00},
{"Fecha":"23/08/2022","Compra":292.00,"Venta":297.00},
{"Fecha":"22/08/2022","Compra":287.00,"Venta":292.00},
{"Fecha":"19/08/2022","Compra":290.00,"Venta":295.00},
{"Fecha":"18/08/2022","Compra":288.00,"Venta":293.00},
{"Fecha":"17/08/2022","Compra":287.00,"Venta":292.00},
{"Fecha":"16/08/2022","Compra":286.00,"Venta":291.00},
{"Fecha":"12/08/2022","Compra":285.00,"Venta":295.00},
{"Fecha":"11/08/2022","Compra":287.00,"Venta":297.00},
{"Fecha":"10/08/2022","Compra":285.00,"Venta":295.00},
{"Fecha":"09/08/2022","Compra":283.00,"Venta":293.00},
{"Fecha":"08/08/2022","Compra":282.00,"Venta":292.00},
{"Fecha":"05/08/2022","Compra":283.00,"Venta":293.00},
{"Fecha":"04/08/2022","Compra":281.00,"Venta":291.00},
{"Fecha":"03/08/2022","Compra":288.00,"Venta":298.00},
{"Fecha":"02/08/2022","Compra":281.00,"Venta":291.00},
{"Fecha":"01/08/2022","Compra":272.00,"Venta":282.00},
{"Fecha":"29/07/2022","Compra":286.00,"Venta":296.00},
{"Fecha":"28/07/2022","Compra":304.00,"Venta":314.00},
{"Fecha":"27/07/2022","Compra":316.00,"Venta":326.00},
{"Fecha":"26/07/2022","Compra":313.00,"Venta":323.00},
{"Fecha":"25/07/2022","Compra":312.00,"Venta":322.00},
{"Fecha":"22/07/2022","Compra":328.00,"Venta":338.00},
{"Fecha":"21/07/2022","Compra":327.00,"Venta":337.00},
{"Fecha":"20/07/2022","Compra":307.00,"Venta":317.00},
{"Fecha":"19/07/2022","Compra":291.00,"Venta":301.00},
{"Fecha":"18/07/2022","Compra":281.00,"Venta":291.00},
{"Fecha":"15/07/2022","Compra":283.00,"Venta":293.00},
{"Fecha":"14/07/2022","Compra":279.00,"Venta":289.00},
{"Fecha":"13/07/2022","Compra":273.00,"Venta":283.00},
{"Fecha":"12/07/2022","Compra":262.00,"Venta":272.00},
{"Fecha":"11/07/2022","Compra":258.00,"Venta":268.00},
{"Fecha":"08/07/2022","Compra":263.00,"Venta":273.00},
{"Fecha":"07/07/2022","Compra":247.00,"Venta":257.00},
{"Fecha":"06/07/2022","Compra":245.00,"Venta":255.00},
{"Fecha":"05/07/2022","Compra":242.00,"Venta":252.00},
{"Fecha":"04/07/2022","Compra":250.00,"Venta":260.00},
{"Fecha":"01/07/2022","Compra":235.00,"Venta":239.00},
{"Fecha":"30/06/2022","Compra":234.00,"Venta":238.00},
{"Fecha":"29/06/2022","Compra":235.00,"Venta":239.00},
{"Fecha":"28/06/2022","Compra":235.00,"Venta":239.00},
{"Fecha":"27/06/2022","Compra":228.00,"Venta":232.00},
{"Fecha":"24/06/2022","Compra":222.00,"Venta":226.00},
{"Fecha":"23/06/2022","Compra":220.00,"Venta":224.00},
{"Fecha":"22/06/2022","Compra":220.00,"Venta":224.00},
{"Fecha":"21/06/2022","Compra":216.00,"Venta":220.00},
{"Fecha":"16/06/2022","Compra":212.00,"Venta":216.00},
{"Fecha":"15/06/2022","Compra":213.00,"Venta":217.00},
{"Fecha":"14/06/2022","Compra":220.00,"Venta":224.00},
{"Fecha":"13/06/2022","Compra":212.00,"Venta":216.00},
{"Fecha":"10/06/2022","Compra":206.00,"Venta":210.00},
{"Fecha":"09/06/2022","Compra":204.00,"Venta":208.00},
{"Fecha":"08/06/2022","Compra":204.00,"Venta":208.00},
{"Fecha":"07/06/2022","Compra":202.00,"Venta":206.00},
{"Fecha":"06/06/2022","Compra":201.00,"Venta":205.00},
{"Fecha":"03/06/2022","Compra":201.00,"Venta":205.00},
{"Fecha":"02/06/2022","Compra":202.00,"Venta":206.00},
{"Fecha":"01/06/2022","Compra":202.00,"Venta":206.00},
{"Fecha":"31/05/2022","Compra":201.00,"Venta":206.00},
{"Fecha":"30/05/2022","Compra":202.50,"Venta":206.50},
{"Fecha":"27/05/2022","Compra":202.50,"Venta":206.50},
{"Fecha":"26/05/2022","Compra":203.00,"Venta":207.00},
{"Fecha":"24/05/2022","Compra":204.00,"Venta":208.00},
{"Fecha":"23/05/2022","Compra":202.50,"Venta":206.50},
{"Fecha":"20/05/2022","Compra":201.00,"Venta":204.00},
{"Fecha":"19/05/2022","Compra":202.00,"Venta":206.00},
{"Fecha":"17/05/2022","Compra":204.00,"Venta":208.00},
{"Fecha":"16/05/2022","Compra":201.00,"Venta":205.00},
{"Fecha":"13/05/2022","Compra":199.50,"Venta":203.50},
{"Fecha":"12/05/2022","Compra":199.50,"Venta":203.50},
{"Fecha":"11/05/2022","Compra":201.00,"Venta":205.00},
{"Fecha":"10/05/2022","Compra":198.00,"Venta":202.00},
{"Fecha":"09/05/2022","Compra":197.50,"Venta":201.50},
{"Fecha":"06/05/2022","Compra":197.00,"Venta":201.00},
{"Fecha":"05/05/2022","Compra":197.50,"Venta":201.50},
{"Fecha":"04/05/2022","Compra":197.00,"Venta":201.00},
{"Fecha":"03/05/2022","Compra":199.50,"Venta":203.50},
{"Fecha":"02/05/2022","Compra":197.00,"Venta":201.00},
{"Fecha":"29/04/2022","Compra":196.50,"Venta":200.50},
{"Fecha":"28/04/2022","Compra":200.00,"Venta":204.00},
{"Fecha":"27/04/2022","Compra":202.50,"Venta":206.50},
{"Fecha":"26/04/2022","Compra":208.50,"Venta":212.50},
{"Fecha":"25/04/2022","Compra":201.50,"Venta":205.50},
{"Fecha":"22/04/2022","Compra":199.00,"Venta":203.00},
{"Fecha":"21/04/2022","Compra":198.00,"Venta":202.00},
{"Fecha":"20/04/2022","Compra":195.50,"Venta":199.50},
{"Fecha":"19/04/2022","Compra":194.00,"Venta":198.00},
{"Fecha":"18/04/2022","Compra":191.00,"Venta":195.00},
{"Fecha":"13/04/2022","Compra":191.00,"Venta":195.00},
{"Fecha":"12/04/2022","Compra":191.00,"Venta":195.00},
{"Fecha":"11/04/2022","Compra":191.00,"Venta":195.00},
{"Fecha":"08/04/2022","Compra":192.50,"Venta":196.50},
{"Fecha":"07/04/2022","Compra":192.00,"Venta":196.00},
{"Fecha":"06/04/2022","Compra":192.00,"Venta":196.00},
{"Fecha":"05/04/2022","Compra":192.00,"Venta":196.00},
{"Fecha":"04/04/2022","Compra":195.00,"Venta":199.00},
{"Fecha":"01/04/2022","Compra":196.00,"Venta":200.00},
{"Fecha":"31/03/2022","Compra":196.00,"Venta":200.00},
{"Fecha":"30/03/2022","Compra":197.00,"Venta":201.00},
{"Fecha":"29/03/2022","Compra":196.00,"Venta":200.00},
{"Fecha":"28/03/2022","Compra":196.00,"Venta":200.00},
{"Fecha":"25/03/2022","Compra":198.00,"Venta":202.00},
{"Fecha":"23/03/2022","Compra":197.00,"Venta":201.00},
{"Fecha":"22/03/2022","Compra":197.00,"Venta":201.00},
{"Fecha":"21/03/2022","Compra":198.00,"Venta":202.00},
{"Fecha":"18/03/2022","Compra":198.50,"Venta":202.50},
{"Fecha":"17/03/2022","Compra":198.00,"Venta":202.00},
{"Fecha":"16/03/2022","Compra":198.00,"Venta":202.00},
{"Fecha":"15/03/2022","Compra":196.00,"Venta":200.00},
{"Fecha":"14/03/2022","Compra":196.00,"Venta":200.00},
{"Fecha":"11/03/2022","Compra":198.00,"Venta":202.00},
{"Fecha":"10/03/2022","Compra":199.00,"Venta":203.00},
{"Fecha":"09/03/2022","Compra":200.50,"Venta":204.50},
{"Fecha":"08/03/2022","Compra":198.00,"Venta":202.00},
{"Fecha":"07/03/2022","Compra":197.00,"Venta":201.00},
{"Fecha":"07/03/2022","Compra":197.00,"Venta":201.00},
{"Fecha":"07/03/2022","Compra":197.00,"Venta":201.00},
{"Fecha":"07/03/2022","Compra":197.00,"Venta":201.00},
{"Fecha":"04/03/2022","Compra":197.00,"Venta":201.00},
{"Fecha":"03/03/2022","Compra":200.00,"Venta":204.00},
{"Fecha":"02/03/2022","Compra":202.00,"Venta":206.00},
{"Fecha":"25/02/2022","Compra":207.00,"Venta":211.00},
{"Fecha":"24/02/2022","Compra":206.50,"Venta":210.50},
{"Fecha":"23/02/2022","Compra":206.00,"Venta":210.00},
{"Fecha":"22/02/2022","Compra":206.00,"Venta":210.00},
{"Fecha":"21/02/2022","Compra":207.50,"Venta":211.50},
{"Fecha":"18/02/2022","Compra":207.00,"Venta":211.00},
{"Fecha":"17/02/2022","Compra":210.00,"Venta":214.00},
{"Fecha":"16/02/2022","Compra":211.00,"Venta":215.00},
{"Fecha":"15/02/2022","Compra":211.00,"Venta":215.00},
{"Fecha":"14/02/2022","Compra":211.00,"Venta":215.00},
{"Fecha":"11/02/2022","Compra":210.50,"Venta":215.50},
{"Fecha":"10/02/2022","Compra":211.50,"Venta":215.50},
{"Fecha":"09/02/2022","Compra":213.00,"Venta":217.00},
{"Fecha":"08/02/2022","Compra":211.00,"Venta":215.00},
{"Fecha":"07/02/2022","Compra":210.00,"Venta":214.00},
{"Fecha":"04/02/2022","Compra":210.00,"Venta":214.00},
{"Fecha":"03/02/2022","Compra":212.00,"Venta":216.00},
{"Fecha":"02/02/2022","Compra":212.50,"Venta":216.50},
{"Fecha":"01/02/2022","Compra":210.00,"Venta":214.00},
{"Fecha":"31/01/2022","Compra":209.00,"Venta":213.00},
{"Fecha":"28/01/2022","Compra":208.50,"Venta":212.50},
{"Fecha":"27/01/2022","Compra":218.50,"Venta":222.50},
{"Fecha":"26/01/2022","Compra":217.00,"Venta":221.00},
{"Fecha":"25/01/2022","Compra":215.50,"Venta":219.50},
{"Fecha":"24/01/2022","Compra":215.00,"Venta":219.00},
{"Fecha":"21/01/2022","Compra":215.00,"Venta":219.00},
{"Fecha":"20/01/2022","Compra":210.00,"Venta":214.00},
{"Fecha":"19/01/2022","Compra":209.00,"Venta":213.00},
{"Fecha":"18/01/2022","Compra":207.00,"Venta":211.00},
{"Fecha":"17/01/2022","Compra":205.00,"Venta":209.00},
{"Fecha":"14/01/2022","Compra":205.50,"Venta":209.50},
{"Fecha":"13/01/2022","Compra":205.50,"Venta":209.50},
{"Fecha":"12/01/2022","Compra":204.50,"Venta":208.50},
{"Fecha":"11/01/2022","Compra":205.00,"Venta":209.00},
{"Fecha":"10/01/2022","Compra":202.00,"Venta":206.00},
{"Fecha":"07/01/2022","Compra":204.00,"Venta":208.00},
{"Fecha":"06/01/2022","Compra":204.50,"Venta":208.50},
{"Fecha":"05/01/2022","Compra":203.50,"Venta":207.50},
{"Fecha":"04/01/2022","Compra":202.50,"Venta":206.50},
{"Fecha":"03/01/2022","Compra":202.00,"Venta":206.00},
{"Fecha":"30/12/2021","Compra":204.00,"Venta":208.00},
{"Fecha":"29/12/2021","Compra":205.00,"Venta":209.00},
{"Fecha":"28/12/2021","Compra":202.00,"Venta":206.00},
{"Fecha":"27/12/2021","Compra":199.50,"Venta":203.50},
{"Fecha":"23/12/2021","Compra":200.00,"Venta":204.00},
{"Fecha":"22/12/2021","Compra":196.50,"Venta":200.50},
{"Fecha":"21/12/2021","Compra":195.00,"Venta":199.00},
{"Fecha":"20/12/2021","Compra":196.00,"Venta":200.00},
{"Fecha":"17/12/2021","Compra":196.00,"Venta":200.00},
{"Fecha":"16/12/2021","Compra":194.50,"Venta":198.50},
{"Fecha":"15/12/2021","Compra":194.50,"Venta":198.50},
{"Fecha":"14/12/2021","Compra":192.50,"Venta":196.50},
{"Fecha":"13/12/2021","Compra":191.50,"Venta":195.50},
{"Fecha":"10/12/2021","Compra":192.50,"Venta":196.50},
{"Fecha":"09/12/2021","Compra":192.00,"Venta":196.00},
{"Fecha":"07/12/2021","Compra":194.00,"Venta":198.00},
{"Fecha":"06/12/2021","Compra":195.00,"Venta":199.00},
{"Fecha":"03/12/2021","Compra":196.50,"Venta":200.50},
{"Fecha":"02/12/2021","Compra":196.50,"Venta":200.50},
{"Fecha":"01/12/2021","Compra":196.50,"Venta":200.50},
{"Fecha":"30/11/2021","Compra":197.50,"Venta":201.50},
{"Fecha":"29/11/2021","Compra":197.00,"Venta":201.00},
{"Fecha":"26/11/2021","Compra":197.00,"Venta":201.00},
{"Fecha":"25/11/2021","Compra":197.00,"Venta":201.00},
{"Fecha":"24/11/2021","Compra":196.50,"Venta":200.50},
{"Fecha":"23/11/2021","Compra":197.00,"Venta":201.00},
{"Fecha":"19/11/2021","Compra":197.50,"Venta":201.50},
{"Fecha":"18/11/2021","Compra":197.00,"Venta":201.00},
{"Fecha":"17/11/2021","Compra":197.50,"Venta":201.50},
{"Fecha":"16/11/2021","Compra":196.50,"Venta":200.50},
{"Fecha":"15/11/2021","Compra":195.50,"Venta":199.50},
{"Fecha":"12/11/2021","Compra":196.00,"Venta":200.00},
{"Fecha":"11/11/2021","Compra":202.50,"Venta":206.50},
{"Fecha":"10/11/2021","Compra":201.00,"Venta":205.00},
{"Fecha":"09/11/2021","Compra":195.50,"Venta":199.50},
{"Fecha":"08/11/2021","Compra":195.00,"Venta":199.00},
{"Fecha":"05/11/2021","Compra":195.00,"Venta":199.00},
{"Fecha":"04/11/2021","Compra":195.00,"Venta":199.00},
{"Fecha":"03/11/2021","Compra":195.00,"Venta":199.00},
{"Fecha":"02/11/2021","Compra":193.50,"Venta":197.50},
{"Fecha":"01/11/2021","Compra":192.50,"Venta":196.50},
{"Fecha":"29/10/2021","Compra":193.50,"Venta":197.50},
{"Fecha":"28/10/2021","Compra":194.00,"Venta":198.00},
{"Fecha":"27/10/2021","Compra":193.00,"Venta":197.00},
{"Fecha":"26/10/2021","Compra":192.00,"Venta":196.00},
{"Fecha":"25/10/2021","Compra":190.00,"Venta":194.00},
{"Fecha":"22/10/2021","Compra":191.00,"Venta":195.00},
{"Fecha":"21/10/2021","Compra":187.00,"Venta":191.00},
{"Fecha":"20/10/2021","Compra":184.00,"Venta":188.00},
{"Fecha":"19/10/2021","Compra":183.00,"Venta":187.00},
{"Fecha":"18/10/2021","Compra":181.50,"Venta":185.50},
{"Fecha":"15/10/2021","Compra":182.50,"Venta":186.50},
{"Fecha":"14/10/2021","Compra":181.50,"Venta":185.50},
{"Fecha":"13/10/2021","Compra":181.00,"Venta":185.00},
{"Fecha":"12/10/2021","Compra":181.00,"Venta":185.00},
{"Fecha":"07/10/2021","Compra":180.50,"Venta":184.50},
{"Fecha":"06/10/2021","Compra":181.50,"Venta":185.50},
{"Fecha":"05/10/2021","Compra":181.00,"Venta":185.00},
{"Fecha":"04/10/2021","Compra":181.00,"Venta":185.00},
{"Fecha":"01/10/2021","Compra":182.00,"Venta":186.00},
{"Fecha":"30/09/2021","Compra":182.00,"Venta":186.00},
{"Fecha":"29/09/2021","Compra":183.00,"Venta":187.00},
{"Fecha":"28/09/2021","Compra":183.00,"Venta":187.00},
{"Fecha":"27/09/2021","Compra":182.50,"Venta":186.50},
{"Fecha":"24/09/2021","Compra":182.00,"Venta":186.00},
{"Fecha":"23/09/2021","Compra":181.00,"Venta":185.00},
{"Fecha":"22/09/2021","Compra":181.00,"Venta":185.00},
{"Fecha":"21/09/2021","Compra":180.00,"Venta":184.00},
{"Fecha":"20/09/2021","Compra":180.00,"Venta":184.00},
{"Fecha":"17/09/2021","Compra":181.00,"Venta":185.00},
{"Fecha":"16/09/2021","Compra":182.00,"Venta":186.00},
{"Fecha":"15/09/2021","Compra":181.00,"Venta":185.00},
{"Fecha":"14/09/2021","Compra":178.50,"Venta":182.50},
{"Fecha":"13/09/2021","Compra":177.00,"Venta":181.00},
{"Fecha":"10/09/2021","Compra":181.00,"Venta":185.00},
{"Fecha":"09/09/2021","Compra":182.50,"Venta":186.50},
{"Fecha":"08/09/2021","Compra":183.00,"Venta":187.00},
{"Fecha":"07/09/2021","Compra":179.50,"Venta":183.50},
{"Fecha":"06/09/2021","Compra":178.00,"Venta":182.00},
{"Fecha":"03/09/2021","Compra":177.00,"Venta":182.00},
{"Fecha":"02/09/2021","Compra":176.00,"Venta":181.00},
{"Fecha":"01/09/2021","Compra":175.50,"Venta":180.50},
{"Fecha":"31/08/2021","Compra":176.50,"Venta":181.50},
{"Fecha":"31/08/2021","Compra":176.50,"Venta":181.50},
{"Fecha":"31/08/2021","Compra":176.50,"Venta":181.50},
{"Fecha":"31/08/2021","Compra":176.50,"Venta":181.50},
{"Fecha":"31/08/2021","Compra":176.50,"Venta":181.50},
{"Fecha":"31/08/2021","Compra":177.00,"Venta":182.00},
{"Fecha":"31/08/2021","Compra":177.00,"Venta":182.00},
{"Fecha":"30/08/2021","Compra":177.00,"Venta":182.00},
{"Fecha":"27/08/2021","Compra":177.00,"Venta":182.00},
{"Fecha":"26/08/2021","Compra":176.50,"Venta":181.50},
{"Fecha":"25/08/2021","Compra":176.50,"Venta":181.50},
{"Fecha":"24/08/2021","Compra":177.00,"Venta":182.00},
{"Fecha":"23/08/2021","Compra":177.00,"Venta":182.00},
{"Fecha":"20/08/2021","Compra":177.00,"Venta":182.00},
{"Fecha":"19/08/2021","Compra":176.50,"Venta":181.50},
{"Fecha":"18/08/2021","Compra":177.00,"Venta":182.00},
{"Fecha":"17/08/2021","Compra":178.00,"Venta":183.00},
{"Fecha":"13/08/2021","Compra":177.00,"Venta":182.00},
{"Fecha":"12/08/2021","Compra":173.50,"Venta":178.50},
{"Fecha":"11/08/2021","Compra":173.00,"Venta":178.00},
{"Fecha":"10/08/2021","Compra":173.00,"Venta":178.00},
{"Fecha":"09/08/2021","Compra":174.00,"Venta":179.00},
{"Fecha":"06/08/2021","Compra":173.50,"Venta":178.50},
{"Fecha":"05/08/2021","Compra":174.50,"Venta":179.50},
{"Fecha":"05/08/2021","Compra":175.50,"Venta":180.50},
{"Fecha":"05/08/2021","Compra":175.50,"Venta":180.50},
{"Fecha":"04/08/2021","Compra":175.50,"Venta":180.50},
{"Fecha":"03/08/2021","Compra":175.50,"Venta":180.50},
{"Fecha":"03/08/2021","Compra":175.50,"Venta":180.50},
{"Fecha":"02/08/2021","Compra":175.50,"Venta":180.50},
{"Fecha":"02/08/2021","Compra":175.50,"Venta":180.50},
{"Fecha":"02/08/2021","Compra":175.50,"Venta":180.50},
{"Fecha":"02/08/2021","Compra":175.50,"Venta":180.50},
{"Fecha":"30/07/2021","Compra":175.50,"Venta":180.50},
{"Fecha":"29/07/2021","Compra":175.00,"Venta":180.00},
{"Fecha":"28/07/2021","Compra":175.00,"Venta":180.00},
{"Fecha":"27/07/2021","Compra":178.00,"Venta":183.00},
{"Fecha":"26/07/2021","Compra":179.00,"Venta":184.00},
{"Fecha":"26/07/2021","Compra":180.00,"Venta":185.00},
{"Fecha":"23/07/2021","Compra":180.00,"Venta":185.00},
{"Fecha":"23/07/2021","Compra":179.50,"Venta":184.50},
{"Fecha":"22/07/2021","Compra":179.50,"Venta":184.50},
{"Fecha":"21/07/2021","Compra":177.50,"Venta":182.50},
{"Fecha":"20/07/2021","Compra":177.00,"Venta":182.00},
{"Fecha":"19/07/2021","Compra":175.00,"Venta":180.00},
{"Fecha":"16/07/2021","Compra":174.00,"Venta":179.00},
{"Fecha":"15/07/2021","Compra":173.00,"Venta":178.00},
{"Fecha":"14/07/2021","Compra":172.00,"Venta":177.00},
{"Fecha":"13/07/2021","Compra":171.00,"Venta":176.00},
{"Fecha":"12/07/2021","Compra":172.00,"Venta":177.00},
{"Fecha":"08/07/2021","Compra":169.00,"Venta":174.00},
{"Fecha":"07/07/2021","Compra":167.00,"Venta":172.00},
{"Fecha":"06/07/2021","Compra":166.00,"Venta":171.00},
{"Fecha":"05/07/2021","Compra":166.00,"Venta":171.00},
{"Fecha":"02/07/2021","Compra":165.00,"Venta":170.00},
{"Fecha":"01/07/2021","Compra":164.00,"Venta":169.00},
{"Fecha":"30/06/2021","Compra":163.00,"Venta":168.00},
{"Fecha":"29/06/2021","Compra":165.00,"Venta":170.00},
{"Fecha":"28/06/2021","Compra":168.00,"Venta":173.00},
{"Fecha":"25/06/2021","Compra":169.00,"Venta":174.00},
{"Fecha":"24/06/2021","Compra":165.00,"Venta":170.00},
{"Fecha":"23/06/2021","Compra":161.00,"Venta":166.00},
{"Fecha":"22/06/2021","Compra":160.00,"Venta":165.00},
{"Fecha":"18/06/2021","Compra":159.00,"Venta":164.00},
{"Fecha":"17/06/2021","Compra":158.00,"Venta":163.00},
{"Fecha":"16/06/2021","Compra":158.00,"Venta":163.00},
{"Fecha":"15/06/2021","Compra":155.00,"Venta":160.00},
{"Fecha":"14/06/2021","Compra":153.00,"Venta":158.00},
{"Fecha":"11/06/2021","Compra":153.00,"Venta":158.00},
{"Fecha":"10/06/2021","Compra":152.00,"Venta":157.00},
{"Fecha":"09/06/2021","Compra":151.00,"Venta":156.00},
{"Fecha":"08/06/2021","Compra":151.00,"Venta":156.00},
{"Fecha":"07/06/2021","Compra":152.00,"Venta":157.00},
{"Fecha":"04/06/2021","Compra":152.00,"Venta":157.00},
{"Fecha":"03/06/2021","Compra":151.00,"Venta":156.00},
{"Fecha":"02/06/2021","Compra":151.00,"Venta":156.00},
{"Fecha":"01/06/2021","Compra":150.00,"Venta":155.00},
{"Fecha":"31/05/2021","Compra":152.00,"Venta":157.00},
{"Fecha":"28/05/2021","Compra":152.00,"Venta":157.00},
{"Fecha":"27/05/2021","Compra":152.00,"Venta":157.00},
{"Fecha":"26/05/2021","Compra":150.00,"Venta":155.00},
{"Fecha":"24/05/2021","Compra":148.00,"Venta":153.00},
{"Fecha":"21/05/2021","Compra":148.00,"Venta":153.00},
{"Fecha":"20/05/2021","Compra":149.00,"Venta":155.00},
{"Fecha":"19/05/2021","Compra":150.00,"Venta":156.00},
{"Fecha":"18/05/2021","Compra":151.00,"Venta":156.00},
{"Fecha":"17/05/2021","Compra":148.00,"Venta":153.00},
{"Fecha":"14/05/2021","Compra":148.00,"Venta":153.00},
{"Fecha":"13/05/2021","Compra":146.00,"Venta":151.00},
{"Fecha":"12/05/2021","Compra":147.00,"Venta":152.00},
{"Fecha":"11/05/2021","Compra":146.00,"Venta":151.00},
{"Fecha":"10/05/2021","Compra":147.00,"Venta":152.00},
{"Fecha":"07/05/2021","Compra":145.00,"Venta":151.00},
{"Fecha":"06/05/2021","Compra":145.00,"Venta":151.00},
{"Fecha":"05/05/2021","Compra":146.00,"Venta":151.00},
{"Fecha":"04/05/2021","Compra":149.00,"Venta":154.00},
{"Fecha":"03/05/2021","Compra":148.00,"Venta":153.00},
{"Fecha":"30/04/2021","Compra":145.00,"Venta":150.00},
{"Fecha":"29/04/2021","Compra":149.00,"Venta":154.00},
{"Fecha":"28/04/2021","Compra":157.00,"Venta":162.00},
{"Fecha":"27/04/2021","Compra":156.00,"Venta":161.00},
{"Fecha":"26/04/2021","Compra":153.00,"Venta":158.00},
{"Fecha":"23/04/2021","Compra":147.00,"Venta":152.00},
{"Fecha":"22/04/2021","Compra":142.00,"Venta":147.00},
{"Fecha":"21/04/2021","Compra":139.00,"Venta":144.00},
{"Fecha":"20/04/2021","Compra":138.00,"Venta":143.00},
{"Fecha":"19/04/2021","Compra":138.00,"Venta":143.00},
{"Fecha":"16/04/2021","Compra":137.00,"Venta":142.00},
{"Fecha":"15/04/2021","Compra":138.00,"Venta":143.00},
{"Fecha":"14/04/2021","Compra":138.00,"Venta":143.00},
{"Fecha":"13/04/2021","Compra":137.00,"Venta":142.00},
{"Fecha":"12/04/2021","Compra":137.00,"Venta":142.00},
{"Fecha":"09/04/2021","Compra":135.00,"Venta":140.00},
{"Fecha":"08/04/2021","Compra":135.00,"Venta":140.00},
{"Fecha":"07/04/2021","Compra":134.00,"Venta":139.00},
{"Fecha":"06/04/2021","Compra":135.00,"Venta":140.00},
{"Fecha":"05/04/2021","Compra":135.00,"Venta":140.00},
{"Fecha":"31/03/2021","Compra":136.00,"Venta":141.00},
{"Fecha":"30/03/2021","Compra":136.00,"Venta":141.00},
{"Fecha":"29/03/2021","Compra":137.00,"Venta":142.00},
{"Fecha":"26/03/2021","Compra":137.00,"Venta":142.00},
{"Fecha":"25/03/2021","Compra":138.00,"Venta":143.00},
{"Fecha":"23/03/2021","Compra":138.00,"Venta":143.00},
{"Fecha":"22/03/2021","Compra":138.00,"Venta":143.00},
{"Fecha":"22/03/2021","Compra":138.00,"Venta":143.00},
{"Fecha":"22/03/2021","Compra":139.00,"Venta":144.00},
{"Fecha":"19/03/2021","Compra":139.00,"Venta":144.00},
{"Fecha":"18/03/2021","Compra":139.00,"Venta":144.00},
{"Fecha":"17/03/2021","Compra":139.00,"Venta":144.00},
{"Fecha":"16/03/2021","Compra":139.00,"Venta":144.00},
{"Fecha":"15/03/2021","Compra":141.00,"Venta":146.00},
{"Fecha":"12/03/2021","Compra":137.00,"Venta":142.00},
{"Fecha":"11/03/2021","Compra":135.00,"Venta":140.00},
{"Fecha":"10/03/2021","Compra":138.00,"Venta":143.00},
{"Fecha":"09/03/2021","Compra":139.00,"Venta":144.00},
{"Fecha":"08/03/2021","Compra":139.00,"Venta":144.00},
{"Fecha":"05/03/2021","Compra":139.00,"Venta":144.00},
{"Fecha":"04/03/2021","Compra":139.00,"Venta":144.00},
{"Fecha":"03/03/2021","Compra":140.00,"Venta":145.00},
{"Fecha":"02/03/2021","Compra":140.00,"Venta":145.00},
{"Fecha":"01/03/2021","Compra":142.00,"Venta":147.00},
{"Fecha":"01/03/2021","Compra":141.00,"Venta":146.00},
{"Fecha":"01/03/2021","Compra":141.00,"Venta":146.00},
{"Fecha":"26/02/2021","Compra":141.00,"Venta":146.00},
{"Fecha":"25/02/2021","Compra":138.00,"Venta":143.00},
{"Fecha":"24/02/2021","Compra":140.00,"Venta":145.00},
{"Fecha":"23/02/2021","Compra":141.00,"Venta":146.00},
{"Fecha":"22/02/2021","Compra":142.00,"Venta":147.00},
{"Fecha":"19/02/2021","Compra":142.00,"Venta":147.00},
{"Fecha":"18/02/2021","Compra":148.00,"Venta":148.00},
{"Fecha":"17/02/2021","Compra":144.00,"Venta":149.00},
{"Fecha":"12/02/2021","Compra":145.00,"Venta":150.00},
{"Fecha":"11/02/2021","Compra":144.00,"Venta":149.00},
{"Fecha":"10/02/2021","Compra":146.00,"Venta":151.00},
{"Fecha":"09/02/2021","Compra":147.00,"Venta":152.00},
{"Fecha":"08/02/2021","Compra":146.00,"Venta":151.00},
{"Fecha":"08/02/2021","Compra":146.00,"Venta":151.00},
{"Fecha":"08/02/2021","Compra":146.00,"Venta":151.00},
{"Fecha":"08/02/2021","Compra":146.00,"Venta":151.00},
{"Fecha":"05/02/2021","Compra":146.00,"Venta":151.00},
{"Fecha":"04/02/2021","Compra":145.00,"Venta":150.00},
{"Fecha":"03/02/2021","Compra":148.00,"Venta":153.00},
{"Fecha":"02/02/2021","Compra":148.00,"Venta":153.00},
{"Fecha":"01/02/2021","Compra":148.00,"Venta":153.00},
{"Fecha":"29/01/2021","Compra":148.00,"Venta":153.00},
{"Fecha":"28/01/2021","Compra":149.00,"Venta":154.00},
{"Fecha":"27/01/2021","Compra":149.00,"Venta":154.00},
{"Fecha":"26/01/2021","Compra":151.00,"Venta":156.00},
{"Fecha":"25/01/2021","Compra":151.00,"Venta":156.00},
{"Fecha":"22/01/2021","Compra":151.00,"Venta":156.00},
{"Fecha":"22/01/2021","Compra":151.00,"Venta":156.00},
{"Fecha":"21/01/2021","Compra":151.00,"Venta":156.00},
{"Fecha":"20/01/2021","Compra":151.00,"Venta":156.00},
{"Fecha":"19/01/2021","Compra":152.00,"Venta":157.00},
{"Fecha":"15/01/2021","Compra":153.00,"Venta":159.00},
{"Fecha":"14/01/2021","Compra":153.00,"Venta":159.00},
{"Fecha":"13/01/2021","Compra":154.00,"Venta":160.00},
{"Fecha":"12/01/2021","Compra":153.00,"Venta":159.00},
{"Fecha":"11/01/2021","Compra":153.00,"Venta":159.00},
{"Fecha":"08/01/2021","Compra":155.00,"Venta":161.00},
{"Fecha":"07/01/2021","Compra":156.00,"Venta":162.00},
{"Fecha":"06/01/2021","Compra":154.00,"Venta":160.00},
{"Fecha":"05/01/2021","Compra":154.00,"Venta":160.00},
{"Fecha":"04/01/2021","Compra":159.00,"Venta":165.00},
{"Fecha":"30/12/2020","Compra":160.00,"Venta":166.00},
{"Fecha":"29/12/2020","Compra":159.00,"Venta":165.00},
{"Fecha":"28/12/2020","Compra":158.00,"Venta":164.00},
{"Fecha":"23/12/2020","Compra":153.00,"Venta":159.00},
{"Fecha":"22/12/2020","Compra":146.00,"Venta":152.00},
{"Fecha":"22/12/2020","Compra":145.00,"Venta":151.00},
{"Fecha":"21/12/2020","Compra":144.00,"Venta":150.00},
{"Fecha":"18/12/2020","Compra":144.00,"Venta":150.00},
{"Fecha":"17/12/2020","Compra":143.00,"Venta":149.00},
{"Fecha":"16/12/2020","Compra":144.00,"Venta":150.00},
{"Fecha":"15/12/2020","Compra":145.00,"Venta":151.00},
{"Fecha":"14/12/2020","Compra":145.00,"Venta":151.00},
{"Fecha":"11/12/2020","Compra":142.00,"Venta":148.00},
{"Fecha":"10/12/2020","Compra":140.00,"Venta":146.00},
{"Fecha":"09/12/2020","Compra":143.00,"Venta":149.00},
{"Fecha":"04/12/2020","Compra":144.00,"Venta":150.00},
{"Fecha":"03/12/2020","Compra":145.00,"Venta":151.00},
{"Fecha":"02/12/2020","Compra":147.00,"Venta":153.00},
{"Fecha":"01/12/2020","Compra":147.00,"Venta":153.00},
{"Fecha":"30/11/2020","Compra":149.00,"Venta":155.00},
{"Fecha":"27/11/2020","Compra":150.00,"Venta":156.00},
{"Fecha":"26/11/2020","Compra":151.00,"Venta":157.00},
{"Fecha":"25/11/2020","Compra":152.00,"Venta":158.00},
{"Fecha":"24/11/2020","Compra":154.00,"Venta":160.00},
{"Fecha":"20/11/2020","Compra":155.00,"Venta":161.00},
{"Fecha":"19/11/2020","Compra":157.00,"Venta":163.00},
{"Fecha":"18/11/2020","Compra":158.00,"Venta":164.00},
{"Fecha":"17/11/2020","Compra":157.00,"Venta":163.00},
{"Fecha":"16/11/2020","Compra":156.00,"Venta":162.00},
{"Fecha":"13/11/2020","Compra":166.00,"Venta":172.00},
{"Fecha":"12/11/2020","Compra":161.00,"Venta":167.00},
{"Fecha":"11/11/2020","Compra":156.00,"Venta":162.00},
{"Fecha":"10/11/2020","Compra":143.00,"Venta":149.00},
{"Fecha":"09/11/2020","Compra":145.00,"Venta":151.00},
{"Fecha":"06/11/2020","Compra":151.00,"Venta":157.00},
{"Fecha":"05/11/2020","Compra":151.00,"Venta":157.00},
{"Fecha":"04/11/2020","Compra":155.00,"Venta":161.00},
{"Fecha":"03/11/2020","Compra":159.00,"Venta":165.00},
{"Fecha":"02/11/2020","Compra":162.00,"Venta":168.00},
{"Fecha":"30/10/2020","Compra":163.00,"Venta":169.00},
{"Fecha":"29/10/2020","Compra":169.00,"Venta":175.00},
{"Fecha":"28/10/2020","Compra":172.00,"Venta":178.00},
{"Fecha":"27/10/2020","Compra":175.00,"Venta":181.00},
{"Fecha":"26/10/2020","Compra":184.00,"Venta":190.00},
{"Fecha":"23/10/2020","Compra":189.00,"Venta":195.00},
{"Fecha":"22/10/2020","Compra":184.00,"Venta":190.00},
{"Fecha":"21/10/2020","Compra":177.00,"Venta":183.00},
{"Fecha":"20/10/2020","Compra":174.00,"Venta":180.00},
{"Fecha":"19/10/2020","Compra":175.00,"Venta":181.00},
{"Fecha":"16/10/2020","Compra":172.00,"Venta":178.00},
{"Fecha":"15/10/2020","Compra":165.00,"Venta":171.00},
{"Fecha":"14/10/2020","Compra":161.00,"Venta":167.00},
{"Fecha":"13/10/2020","Compra":160.00,"Venta":166.00},
{"Fecha":"09/10/2020","Compra":161.00,"Venta":167.00},
{"Fecha":"08/10/2020","Compra":152.00,"Venta":158.00},
{"Fecha":"07/10/2020","Compra":149.00,"Venta":155.00},
{"Fecha":"06/10/2020","Compra":146.00,"Venta":152.00},
{"Fecha":"05/10/2020","Compra":144.00,"Venta":150.00},
{"Fecha":"02/10/2020","Compra":144.00,"Venta":150.00},
{"Fecha":"01/10/2020","Compra":141.00,"Venta":147.00},
{"Fecha":"30/09/2020","Compra":140.00,"Venta":146.00},
{"Fecha":"29/09/2020","Compra":140.00,"Venta":146.00},
{"Fecha":"28/09/2020","Compra":139.00,"Venta":145.00},
{"Fecha":"25/09/2020","Compra":139.00,"Venta":145.00},
{"Fecha":"24/09/2020","Compra":141.00,"Venta":147.00},
{"Fecha":"23/09/2020","Compra":139.00,"Venta":145.00},
{"Fecha":"22/09/2020","Compra":138.00,"Venta":144.00},
{"Fecha":"21/09/2020","Compra":135.00,"Venta":141.00},
{"Fecha":"18/09/2020","Compra":134.00,"Venta":140.00},
{"Fecha":"17/09/2020","Compra":135.00,"Venta":141.00},
{"Fecha":"16/09/2020","Compra":135.00,"Venta":145.00},
{"Fecha":"15/09/2020","Compra":127.00,"Venta":131.00},
{"Fecha":"14/09/2020","Compra":128.00,"Venta":132.00},
{"Fecha":"11/09/2020","Compra":127.00,"Venta":131.00},
{"Fecha":"10/09/2020","Compra":127.00,"Venta":131.00},
{"Fecha":"09/09/2020","Compra":127.00,"Venta":131.00},
{"Fecha":"08/09/2020","Compra":127.00,"Venta":131.00},
{"Fecha":"07/09/2020","Compra":127.00,"Venta":131.00},
{"Fecha":"04/09/2020","Compra":128.00,"Venta":132.00},
{"Fecha":"03/09/2020","Compra":130.00,"Venta":134.00},
{"Fecha":"02/09/2020","Compra":129.00,"Venta":133.00},
{"Fecha":"01/09/2020","Compra":129.00,"Venta":133.00},
{"Fecha":"31/08/2020","Compra":131.00,"Venta":135.00},
{"Fecha":"28/08/2020","Compra":132.00,"Venta":136.00},
{"Fecha":"27/08/2020","Compra":134.00,"Venta":138.00},
{"Fecha":"26/08/2020","Compra":133.00,"Venta":137.00},
{"Fecha":"25/08/2020","Compra":133.00,"Venta":137.00},
{"Fecha":"24/08/2020","Compra":133.00,"Venta":137.00},
{"Fecha":"21/08/2020","Compra":134.00,"Venta":138.00},
{"Fecha":"20/08/2020","Compra":131.00,"Venta":136.00},
{"Fecha":"19/08/2020","Compra":129.00,"Venta":134.00},
{"Fecha":"18/08/2020","Compra":127.00,"Venta":132.00},
{"Fecha":"17/08/2020","Compra":127.00,"Venta":132.00},
{"Fecha":"14/08/2020","Compra":127.00,"Venta":132.00},
{"Fecha":"13/08/2020","Compra":128.00,"Venta":133.00},
{"Fecha":"12/08/2020","Compra":127.00,"Venta":132.00},
{"Fecha":"11/08/2020","Compra":126.00,"Venta":131.00},
{"Fecha":"10/08/2020","Compra":126.00,"Venta":131.00},
{"Fecha":"07/08/2020","Compra":128.00,"Venta":133.00},
{"Fecha":"07/08/2020","Compra":127.00,"Venta":132.00},
{"Fecha":"07/08/2020","Compra":127.00,"Venta":132.00},
{"Fecha":"07/08/2020","Compra":127.00,"Venta":132.00},
{"Fecha":"06/08/2020","Compra":127.00,"Venta":132.00},
{"Fecha":"06/08/2020","Compra":125.00,"Venta":130.00},
{"Fecha":"05/08/2020","Compra":124.00,"Venta":129.00},
{"Fecha":"04/08/2020","Compra":123.00,"Venta":128.00},
{"Fecha":"03/08/2020","Compra":131.00,"Venta":136.00},
{"Fecha":"31/07/2020","Compra":131.00,"Venta":136.00},
{"Fecha":"30/07/2020","Compra":131.00,"Venta":136.00},
{"Fecha":"29/07/2020","Compra":130.00,"Venta":135.00},
{"Fecha":"28/07/2020","Compra":130.00,"Venta":135.00},
{"Fecha":"27/07/2020","Compra":131.00,"Venta":136.00},
{"Fecha":"24/07/2020","Compra":134.00,"Venta":139.00},
{"Fecha":"23/07/2020","Compra":131.00,"Venta":136.00},
{"Fecha":"22/07/2020","Compra":128.00,"Venta":133.00},
{"Fecha":"21/07/2020","Compra":127.00,"Venta":132.00},
{"Fecha":"20/07/2020","Compra":125.00,"Venta":130.00},
{"Fecha":"17/07/2020","Compra":125.00,"Venta":130.00},
{"Fecha":"16/07/2020","Compra":120.00,"Venta":130.00},
{"Fecha":"15/07/2020","Compra":117.00,"Venta":127.00},
{"Fecha":"14/07/2020","Compra":117.00,"Venta":127.00},
{"Fecha":"13/07/2020","Compra":117.00,"Venta":127.00},
{"Fecha":"10/07/2020","Compra":117.00,"Venta":127.00},
{"Fecha":"10/07/2020","Compra":117.00,"Venta":127.00},
{"Fecha":"08/07/2020","Compra":117.00,"Venta":127.00},
{"Fecha":"07/07/2020","Compra":117.00,"Venta":127.00},
{"Fecha":"06/07/2020","Compra":117.00,"Venta":127.00},
{"Fecha":"03/07/2020","Compra":117.00,"Venta":127.00},
{"Fecha":"02/07/2020","Compra":119.00,"Venta":129.00},
{"Fecha":"01/07/2020","Compra":118.00,"Venta":128.00},
{"Fecha":"30/06/2020","Compra":116.00,"Venta":126.00},
{"Fecha":"29/06/2020","Compra":119.00,"Venta":129.00},
{"Fecha":"26/06/2020","Compra":119.00,"Venta":129.00},
{"Fecha":"25/06/2020","Compra":118.00,"Venta":128.00},
{"Fecha":"24/06/2020","Compra":118.00,"Venta":128.00},
{"Fecha":"23/06/2020","Compra":117.00,"Venta":127.00},
{"Fecha":"22/06/2020","Compra":117.00,"Venta":127.00},
{"Fecha":"19/06/2020","Compra":118.00,"Venta":128.00},
{"Fecha":"18/06/2020","Compra":117.00,"Venta":127.00},
{"Fecha":"17/06/2020","Compra":114.00,"Venta":124.00},
{"Fecha":"16/06/2020","Compra":115.00,"Venta":125.00},
{"Fecha":"12/06/2020","Compra":116.00,"Venta":126.00},
{"Fecha":"11/06/2020","Compra":113.00,"Venta":123.00},
{"Fecha":"10/06/2020","Compra":114.00,"Venta":124.00},
{"Fecha":"09/06/2020","Compra":114.00,"Venta":124.00},
{"Fecha":"08/06/2020","Compra":115.00,"Venta":125.00},
{"Fecha":"05/06/2020","Compra":115.00,"Venta":125.00},
{"Fecha":"04/06/2020","Compra":113.00,"Venta":123.00},
{"Fecha":"03/06/2020","Compra":113.00,"Venta":123.00},
{"Fecha":"02/06/2020","Compra":114.00,"Venta":124.00},
{"Fecha":"01/06/2020","Compra":118.00,"Venta":128.00},
{"Fecha":"29/05/2020","Compra":115.00,"Venta":125.00},
{"Fecha":"28/05/2020","Compra":114.00,"Venta":124.00},
{"Fecha":"27/05/2020","Compra":117.00,"Venta":127.00},
{"Fecha":"26/05/2020","Compra":119.00,"Venta":129.00},
{"Fecha":"22/05/2020","Compra":116.00,"Venta":126.00},
{"Fecha":"21/05/2020","Compra":115.00,"Venta":125.00},
{"Fecha":"20/05/2020","Compra":114.00,"Venta":124.00},
{"Fecha":"19/05/2020","Compra":114.00,"Venta":124.00},
{"Fecha":"18/05/2020","Compra":118.00,"Venta":128.00},
{"Fecha":"15/05/2020","Compra":128.00,"Venta":138.00},
{"Fecha":"14/05/2020","Compra":128.00,"Venta":138.00},
{"Fecha":"13/05/2020","Compra":123.00,"Venta":133.00},
{"Fecha":"12/05/2020","Compra":117.00,"Venta":127.00},
{"Fecha":"11/05/2020","Compra":114.50,"Venta":124.50},
{"Fecha":"08/05/2020","Compra":112.00,"Venta":122.00},
{"Fecha":"07/05/2020","Compra":112.00,"Venta":122.00},
{"Fecha":"06/05/2020","Compra":112.00,"Venta":122.00},
{"Fecha":"05/05/2020","Compra":110.00,"Venta":120.00},
{"Fecha":"04/05/2020","Compra":110.00,"Venta":120.00},
{"Fecha":"30/04/2020","Compra":108.00,"Venta":118.00},
{"Fecha":"29/04/2020","Compra":111.00,"Venta":121.00},
{"Fecha":"28/04/2020","Compra":110.00,"Venta":120.00},
{"Fecha":"27/04/2020","Compra":108.00,"Venta":118.00},
{"Fecha":"24/04/2020","Compra":107.00,"Venta":117.00},
{"Fecha":"23/04/2020","Compra":110.00,"Venta":120.00},
{"Fecha":"22/04/2020","Compra":100.00,"Venta":110.00},
{"Fecha":"21/04/2020","Compra":98.00,"Venta":107.00},
{"Fecha":"20/04/2020","Compra":96.00,"Venta":105.00},
{"Fecha":"17/04/2020","Compra":96.00,"Venta":105.00},
{"Fecha":"16/04/2020","Compra":95.00,"Venta":100.00},
{"Fecha":"15/04/2020","Compra":90.00,"Venta":96.00},
{"Fecha":"14/04/2020","Compra":85.00,"Venta":90.00},
{"Fecha":"13/04/2020","Compra":84.25,"Venta":89.25},
{"Fecha":"08/04/2020","Compra":80.00,"Venta":85.00},
{"Fecha":"07/04/2020","Compra":80.00,"Venta":85.00},
{"Fecha":"06/04/2020","Compra":80.00,"Venta":85.00},
{"Fecha":"03/04/2020","Compra":78.50,"Venta":83.50},
{"Fecha":"02/04/2020","Compra":78.50,"Venta":83.50},
{"Fecha":"01/04/2020","Compra":79.50,"Venta":83.50},
{"Fecha":"30/03/2020","Compra":78.50,"Venta":83.50},
{"Fecha":"27/03/2020","Compra":78.50,"Venta":83.50},
{"Fecha":"26/03/2020","Compra":79.50,"Venta":84.50},
{"Fecha":"25/03/2020","Compra":79.50,"Venta":84.50},
{"Fecha":"20/03/2020","Compra":80.50,"Venta":85.50},
{"Fecha":"19/03/2020","Compra":81.50,"Venta":85.50},
{"Fecha":"18/03/2020","Compra":84.25,"Venta":89.25},
{"Fecha":"17/03/2020","Compra":82.50,"Venta":86.50},
{"Fecha":"16/03/2020","Compra":81.00,"Venta":85.00},
{"Fecha":"13/03/2020","Compra":79.75,"Venta":83.75},
{"Fecha":"12/03/2020","Compra":79.00,"Venta":83.00},
{"Fecha":"11/03/2020","Compra":76.00,"Venta":80.00},
{"Fecha":"10/03/2020","Compra":75.75,"Venta":79.75},
{"Fecha":"09/03/2020","Compra":75.50,"Venta":79.50},
{"Fecha":"06/03/2020","Compra":74.50,"Venta":78.50},
{"Fecha":"05/03/2020","Compra":74.50,"Venta":78.50},
{"Fecha":"04/03/2020","Compra":74.50,"Venta":78.50},
{"Fecha":"03/03/2020","Compra":74.50,"Venta":78.50},
{"Fecha":"02/03/2020","Compra":74.50,"Venta":78.50},
{"Fecha":"28/02/2020","Compra":74.50,"Venta":78.50},
{"Fecha":"27/02/2020","Compra":74.50,"Venta":78.50},
{"Fecha":"26/02/2020","Compra":74.70,"Venta":78.70},
{"Fecha":"21/02/2020","Compra":74.80,"Venta":78.80},
{"Fecha":"20/02/2020","Compra":74.80,"Venta":78.80},
{"Fecha":"19/02/2020","Compra":74.90,"Venta":78.90},
{"Fecha":"18/02/2020","Compra":74.70,"Venta":78.70},
{"Fecha":"17/02/2020","Compra":74.00,"Venta":78.00},
{"Fecha":"14/02/2020","Compra":73.90,"Venta":77.90},
{"Fecha":"13/02/2020","Compra":74.90,"Venta":78.90},
{"Fecha":"12/02/2020","Compra":74.25,"Venta":78.25},
{"Fecha":"11/02/2020","Compra":73.50,"Venta":77.50},
{"Fecha":"10/02/2020","Compra":73.00,"Venta":77.00},
{"Fecha":"07/02/2020","Compra":73.50,"Venta":77.50},
{"Fecha":"06/02/2020","Compra":73.50,"Venta":77.50},
{"Fecha":"05/02/2020","Compra":74.00,"Venta":78.00},
{"Fecha":"04/02/2020","Compra":74.00,"Venta":78.00},
{"Fecha":"03/02/2020","Compra":74.00,"Venta":78.00},
{"Fecha":"31/01/2020","Compra":74.00,"Venta":78.00},
{"Fecha":"30/01/2020","Compra":74.00,"Venta":78.00},
{"Fecha":"29/01/2020","Compra":74.25,"Venta":78.25},
{"Fecha":"28/01/2020","Compra":74.25,"Venta":78.25},
{"Fecha":"27/01/2020","Compra":74.00,"Venta":78.00},
{"Fecha":"24/01/2020","Compra":74.50,"Venta":78.50},
{"Fecha":"23/01/2020","Compra":73.75,"Venta":77.75},
{"Fecha":"22/01/2020","Compra":73.75,"Venta":77.75},
{"Fecha":"21/01/2020","Compra":73.50,"Venta":77.50},
{"Fecha":"20/01/2020","Compra":74.00,"Venta":78.00},
{"Fecha":"17/01/2020","Compra":73.75,"Venta":77.75},
{"Fecha":"16/01/2020","Compra":73.75,"Venta":77.75},
{"Fecha":"15/01/2020","Compra":74.00,"Venta":78.00},
{"Fecha":"14/01/2020","Compra":73.50,"Venta":77.50},
{"Fecha":"13/01/2020","Compra":71.50,"Venta":76.50},
{"Fecha":"10/01/2020","Compra":71.50,"Venta":76.50},
{"Fecha":"09/01/2020","Compra":71.50,"Venta":76.50},
{"Fecha":"08/01/2020","Compra":71.50,"Venta":76.50},
{"Fecha":"07/01/2020","Compra":71.25,"Venta":76.25},
{"Fecha":"06/01/2020","Compra":72.25,"Venta":77.25},
{"Fecha":"03/01/2020","Compra":72.00,"Venta":77.00},
{"Fecha":"02/01/2020","Compra":72.00,"Venta":77.00},
{"Fecha":"30/12/2019","Compra":73.50,"Venta":78.50},
{"Fecha":"27/12/2019","Compra":73.50,"Venta":78.50},
{"Fecha":"26/12/2019","Compra":75.00,"Venta":80.00},
{"Fecha":"23/12/2019","Compra":71.75,"Venta":76.75},
{"Fecha":"20/12/2019","Compra":70.00,"Venta":75.00},
{"Fecha":"19/12/2019","Compra":72.75,"Venta":75.75},
{"Fecha":"18/12/2019","Compra":72.00,"Venta":76.00},
{"Fecha":"17/12/2019","Compra":69.00,"Venta":74.00},
{"Fecha":"16/12/2019","Compra":68.50,"Venta":72.50},
{"Fecha":"13/12/2019","Compra":61.75,"Venta":66.75},
{"Fecha":"12/12/2019","Compra":62.50,"Venta":66.50},
{"Fecha":"11/12/2019","Compra":64.50,"Venta":68.50},
{"Fecha":"10/12/2019","Compra":65.50,"Venta":69.50},
{"Fecha":"09/12/2019","Compra":66.00,"Venta":70.00},
{"Fecha":"06/12/2019","Compra":68.00,"Venta":71.00},
{"Fecha":"05/12/2019","Compra":66.00,"Venta":70.00},
{"Fecha":"04/12/2019","Compra":65.00,"Venta":69.00},
{"Fecha":"03/12/2019","Compra":64.50,"Venta":68.50},
{"Fecha":"02/12/2019","Compra":64.25,"Venta":68.25},
{"Fecha":"29/11/2019","Compra":66.25,"Venta":69.25},
{"Fecha":"28/11/2019","Compra":66.75,"Venta":69.75},
{"Fecha":"27/11/2019","Compra":66.25,"Venta":69.25},
{"Fecha":"26/11/2019","Compra":65.25,"Venta":68.25},
{"Fecha":"25/11/2019","Compra":65.00,"Venta":68.00},
{"Fecha":"22/11/2019","Compra":65.50,"Venta":68.50},
{"Fecha":"21/11/2019","Compra":63.75,"Venta":66.75},
{"Fecha":"20/11/2019","Compra":63.75,"Venta":66.75},
{"Fecha":"19/11/2019","Compra":63.50,"Venta":66.50},
{"Fecha":"15/11/2019","Compra":63.75,"Venta":66.75},
{"Fecha":"14/11/2019","Compra":63.75,"Venta":66.75},
{"Fecha":"13/11/2019","Compra":63.75,"Venta":66.75},
{"Fecha":"12/11/2019","Compra":62.50,"Venta":65.50},
{"Fecha":"11/11/2019","Compra":61.50,"Venta":64.50},
{"Fecha":"08/11/2019","Compra":62.25,"Venta":65.25},
{"Fecha":"07/11/2019","Compra":61.00,"Venta":64.00},
{"Fecha":"06/11/2019","Compra":62.00,"Venta":65.00},
{"Fecha":"05/11/2019","Compra":61.50,"Venta":64.50},
{"Fecha":"04/11/2019","Compra":62.50,"Venta":65.50},
{"Fecha":"01/11/2019","Compra":64.50,"Venta":67.50},
{"Fecha":"31/10/2019","Compra":66.00,"Venta":69.00},
{"Fecha":"30/10/2019","Compra":64.00,"Venta":67.00},
{"Fecha":"29/10/2019","Compra":64.00,"Venta":67.00},
{"Fecha":"28/10/2019","Compra":71.00,"Venta":74.00},
{"Fecha":"25/10/2019","Compra":72.75,"Venta":75.75},
{"Fecha":"24/10/2019","Compra":66.75,"Venta":69.75},
{"Fecha":"23/10/2019","Compra":66.75,"Venta":69.75},
{"Fecha":"22/10/2019","Compra":64.25,"Venta":67.25},
{"Fecha":"21/10/2019","Compra":63.25,"Venta":66.25},
{"Fecha":"18/10/2019","Compra":62.25,"Venta":65.25},
{"Fecha":"17/10/2019","Compra":64.50,"Venta":67.50},
{"Fecha":"16/10/2019","Compra":62.50,"Venta":64.50},
{"Fecha":"15/10/2019","Compra":61.50,"Venta":63.50},
{"Fecha":"11/10/2019","Compra":61.50,"Venta":63.50},
{"Fecha":"10/10/2019","Compra":61.00,"Venta":63.00},
{"Fecha":"09/10/2019","Compra":59.75,"Venta":61.75},
{"Fecha":"08/10/2019","Compra":57.50,"Venta":61.50},
{"Fecha":"07/10/2019","Compra":58.25,"Venta":61.25},
{"Fecha":"04/10/2019","Compra":58.25,"Venta":61.25},
{"Fecha":"03/10/2019","Compra":58.00,"Venta":61.00},
{"Fecha":"02/10/2019","Compra":58.50,"Venta":61.50},
{"Fecha":"01/10/2019","Compra":57.75,"Venta":60.75},
{"Fecha":"30/09/2019","Compra":58.25,"Venta":61.25},
{"Fecha":"27/09/2019","Compra":58.50,"Venta":61.50},
{"Fecha":"26/09/2019","Compra":59.00,"Venta":62.00},
{"Fecha":"25/09/2019","Compra":58.75,"Venta":61.75},
{"Fecha":"24/09/2019","Compra":58.75,"Venta":61.75},
{"Fecha":"23/09/2019","Compra":59.25,"Venta":62.25},
{"Fecha":"20/09/2019","Compra":58.75,"Venta":62.75},
{"Fecha":"19/09/2019","Compra":60.00,"Venta":63.00},
{"Fecha":"18/09/2019","Compra":59.75,"Venta":62.75},
{"Fecha":"17/09/2019","Compra":59.00,"Venta":62.00},
{"Fecha":"16/09/2019","Compra":58.50,"Venta":61.50},
{"Fecha":"13/09/2019","Compra":57.50,"Venta":61.50},
{"Fecha":"12/09/2019","Compra":55.00,"Venta":60.00},
{"Fecha":"11/09/2019","Compra":55.00,"Venta":59.00},
{"Fecha":"10/09/2019","Compra":54.50,"Venta":58.75},
{"Fecha":"09/09/2019","Compra":55.00,"Venta":59.00},
{"Fecha":"06/09/2019","Compra":55.00,"Venta":59.00},
{"Fecha":"05/09/2019","Compra":54.00,"Venta":59.00},
{"Fecha":"04/09/2019","Compra":54.00,"Venta":59.00},
{"Fecha":"03/09/2019","Compra":57.00,"Venta":61.00},
{"Fecha":"02/09/2019","Compra":59.50,"Venta":63.50},
{"Fecha":"30/08/2019","Compra":60.00,"Venta":63.00},
{"Fecha":"29/08/2019","Compra":57.75,"Venta":60.75},
{"Fecha":"28/08/2019","Compra":59.50,"Venta":60.50},
{"Fecha":"27/08/2019","Compra":56.00,"Venta":59.00},
{"Fecha":"26/08/2019","Compra":54.50,"Venta":57.50},
{"Fecha":"23/08/2019","Compra":54.00,"Venta":58.00},
{"Fecha":"22/08/2019","Compra":54.00,"Venta":58.00},
{"Fecha":"21/08/2019","Compra":54.50,"Venta":58.50},
{"Fecha":"20/08/2019","Compra":53.00,"Venta":58.00},
{"Fecha":"16/08/2019","Compra":55.00,"Venta":59.00},
{"Fecha":"15/08/2019","Compra":55.00,"Venta":59.00},
{"Fecha":"14/08/2019","Compra":58.50,"Venta":62.00},
{"Fecha":"13/08/2019","Compra":53.00,"Venta":57.00},
{"Fecha":"12/08/2019","Compra":53.00,"Venta":57.00},
{"Fecha":"09/08/2019","Compra":45.40,"Venta":46.90},
{"Fecha":"08/08/2019","Compra":45.22,"Venta":46.72},
{"Fecha":"07/08/2019","Compra":45.00,"Venta":46.50},
{"Fecha":"06/08/2019","Compra":44.90,"Venta":46.40},
{"Fecha":"05/08/2019","Compra":45.10,"Venta":46.60},
{"Fecha":"02/08/2019","Compra":44.40,"Venta":45.90},
{"Fecha":"01/08/2019","Compra":43.93,"Venta":45.43},
{"Fecha":"31/07/2019","Compra":43.70,"Venta":45.20},
{"Fecha":"30/07/2019","Compra":43.65,"Venta":45.15},
{"Fecha":"29/07/2019","Compra":43.65,"Venta":45.15},
{"Fecha":"26/07/2019","Compra":43.45,"Venta":44.95},
{"Fecha":"25/07/2019","Compra":43.45,"Venta":44.95},
{"Fecha":"24/07/2019","Compra":43.10,"Venta":44.60},
{"Fecha":"23/07/2019","Compra":42.75,"Venta":44.25},
{"Fecha":"22/07/2019","Compra":42.55,"Venta":44.05},
{"Fecha":"19/07/2019","Compra":42.45,"Venta":43.95},
{"Fecha":"18/07/2019","Compra":42.45,"Venta":43.95},
{"Fecha":"17/07/2019","Compra":42.70,"Venta":44.20},
{"Fecha":"16/07/2019","Compra":42.95,"Venta":44.45},
{"Fecha":"15/07/2019","Compra":42.25,"Venta":43.75},
{"Fecha":"12/07/2019","Compra":41.75,"Venta":43.25},
{"Fecha":"11/07/2019","Compra":41.70,"Venta":43.20},
{"Fecha":"10/07/2019","Compra":41.30,"Venta":42.80},
{"Fecha":"05/07/2019","Compra":41.40,"Venta":42.90},
{"Fecha":"04/07/2019","Compra":41.40,"Venta":42.90},
{"Fecha":"03/07/2019","Compra":41.55,"Venta":43.05},
{"Fecha":"02/07/2019","Compra":42.00,"Venta":43.50},
{"Fecha":"01/07/2019","Compra":41.95,"Venta":43.45},
{"Fecha":"28/06/2019","Compra":42.30,"Venta":43.80},
{"Fecha":"27/06/2019","Compra":42.70,"Venta":44.20},
{"Fecha":"26/06/2019","Compra":42.70,"Venta":44.20},
{"Fecha":"25/06/2019","Compra":42.60,"Venta":44.10},
{"Fecha":"24/06/2019","Compra":42.94,"Venta":44.44},
{"Fecha":"21/06/2019","Compra":43.00,"Venta":44.50},
{"Fecha":"19/06/2019","Compra":43.40,"Venta":44.90},
{"Fecha":"18/06/2019","Compra":43.65,"Venta":45.15},
{"Fecha":"14/06/2019","Compra":43.70,"Venta":45.20},
{"Fecha":"13/06/2019","Compra":43.80,"Venta":45.30},
{"Fecha":"12/06/2019","Compra":43.80,"Venta":45.30},
{"Fecha":"11/06/2019","Compra":44.00,"Venta":45.50},
{"Fecha":"10/06/2019","Compra":44.00,"Venta":45.50},
{"Fecha":"07/06/2019","Compra":44.20,"Venta":45.70},
{"Fecha":"06/06/2019","Compra":44.15,"Venta":45.65},
{"Fecha":"05/06/2019","Compra":44.10,"Venta":45.60},
{"Fecha":"04/06/2019","Compra":44.50,"Venta":46.00},
{"Fecha":"03/06/2019","Compra":44.60,"Venta":46.10},
{"Fecha":"31/05/2019","Compra":44.50,"Venta":46.00},
{"Fecha":"30/05/2019","Compra":44.40,"Venta":45.90},
{"Fecha":"29/05/2019","Compra":44.70,"Venta":46.20},
{"Fecha":"28/05/2019","Compra":44.70,"Venta":46.20},
{"Fecha":"27/05/2019","Compra":44.65,"Venta":46.15},
{"Fecha":"24/05/2019","Compra":44.65,"Venta":46.15},
{"Fecha":"23/05/2019","Compra":44.70,"Venta":46.20},
{"Fecha":"22/05/2019","Compra":44.60,"Venta":46.10},
{"Fecha":"21/05/2019","Compra":44.75,"Venta":46.25},
{"Fecha":"20/05/2019","Compra":44.85,"Venta":46.35},
{"Fecha":"17/05/2019","Compra":44.60,"Venta":46.10},
{"Fecha":"16/05/2019","Compra":44.50,"Venta":46.00},
{"Fecha":"15/05/2019","Compra":44.50,"Venta":46.00},
{"Fecha":"14/05/2019","Compra":44.50,"Venta":46.00},
{"Fecha":"13/05/2019","Compra":44.50,"Venta":46.00},
{"Fecha":"10/05/2019","Compra":44.50,"Venta":46.00},
{"Fecha":"09/05/2019","Compra":45.00,"Venta":46.00},
{"Fecha":"08/05/2019","Compra":45.00,"Venta":46.00},
{"Fecha":"07/05/2019","Compra":45.00,"Venta":46.00},
{"Fecha":"06/05/2019","Compra":45.50,"Venta":46.50},
{"Fecha":"03/05/2019","Compra":44.55,"Venta":45.75},
{"Fecha":"02/05/2019","Compra":45.25,"Venta":46.25},
{"Fecha":"30/04/2019","Compra":45.00,"Venta":46.00},
{"Fecha":"29/04/2019","Compra":44.07,"Venta":45.07},
{"Fecha":"26/04/2019","Compra":45.10,"Venta":46.10},
{"Fecha":"25/04/2019","Compra":45.00,"Venta":46.00},
{"Fecha":"24/04/2019","Compra":43.50,"Venta":44.50},
{"Fecha":"23/04/2019","Compra":43.15,"Venta":44.15},
{"Fecha":"22/04/2019","Compra":43.35,"Venta":44.35},
{"Fecha":"17/04/2019","Compra":41.40,"Venta":43.45},
{"Fecha":"16/04/2019","Compra":42.80,"Venta":43.80},
{"Fecha":"15/04/2019","Compra":42.50,"Venta":43.50},
{"Fecha":"12/04/2019","Compra":42.65,"Venta":43.65},
{"Fecha":"11/04/2019","Compra":43.00,"Venta":44.00},
{"Fecha":"10/04/2019","Compra":43.00,"Venta":44.00},
{"Fecha":"09/04/2019","Compra":43.00,"Venta":44.00},
{"Fecha":"08/04/2019","Compra":43.00,"Venta":44.00},
{"Fecha":"05/04/2019","Compra":43.00,"Venta":44.00},
{"Fecha":"04/04/2019","Compra":42.65,"Venta":43.65},
{"Fecha":"03/04/2019","Compra":42.50,"Venta":43.50},
{"Fecha":"01/04/2019","Compra":42.50,"Venta":43.50},
{"Fecha":"29/03/2019","Compra":42.65,"Venta":43.65},
{"Fecha":"28/03/2019","Compra":41.80,"Venta":43.80},
{"Fecha":"27/03/2019","Compra":43.00,"Venta":44.00},
{"Fecha":"26/03/2019","Compra":41.55,"Venta":42.55},
{"Fecha":"25/03/2019","Compra":40.90,"Venta":41.90},
{"Fecha":"22/03/2019","Compra":39.75,"Venta":41.75},
{"Fecha":"21/03/2019","Compra":39.25,"Venta":41.25},
{"Fecha":"20/03/2019","Compra":40.25,"Venta":41.25},
{"Fecha":"19/03/2019","Compra":40.25,"Venta":41.25},
{"Fecha":"18/03/2019","Compra":40.00,"Venta":41.00},
{"Fecha":"15/03/2019","Compra":39.00,"Venta":41.00},
{"Fecha":"14/03/2019","Compra":40.00,"Venta":41.00},
{"Fecha":"13/03/2019","Compra":40.50,"Venta":41.50},
{"Fecha":"12/03/2019","Compra":40.25,"Venta":41.25},
{"Fecha":"11/03/2019","Compra":40.00,"Venta":41.00},
{"Fecha":"08/03/2019","Compra":40.00,"Venta":41.00},
{"Fecha":"07/03/2019","Compra":41.50,"Venta":42.50},
{"Fecha":"06/03/2019","Compra":38.50,"Venta":40.50},
{"Fecha":"01/03/2019","Compra":37.00,"Venta":39.00},
{"Fecha":"28/02/2019","Compra":38.00,"Venta":39.00},
{"Fecha":"27/02/2019","Compra":38.00,"Venta":39.00},
{"Fecha":"26/02/2019","Compra":37.25,"Venta":39.25},
{"Fecha":"25/02/2019","Compra":36.75,"Venta":38.75},
{"Fecha":"22/02/2019","Compra":38.75,"Venta":38.75},
{"Fecha":"21/02/2019","Compra":38.25,"Venta":39.25},
{"Fecha":"20/02/2019","Compra":38.75,"Venta":39.75},
{"Fecha":"19/02/2019","Compra":38.00,"Venta":39.00},
{"Fecha":"18/02/2019","Compra":37.75,"Venta":38.75},
{"Fecha":"15/02/2019","Compra":37.75,"Venta":38.75},
{"Fecha":"14/02/2019","Compra":37.50,"Venta":38.50},
{"Fecha":"13/02/2019","Compra":37.25,"Venta":38.25},
{"Fecha":"12/02/2019","Compra":37.00,"Venta":38.00},
{"Fecha":"11/02/2019","Compra":37.00,"Venta":38.00},
{"Fecha":"08/02/2019","Compra":36.50,"Venta":37.50},
{"Fecha":"07/02/2019","Compra":36.75,"Venta":37.75},
{"Fecha":"06/02/2019","Compra":35.25,"Venta":37.25},
{"Fecha":"05/02/2019","Compra":35.30,"Venta":37.30},
{"Fecha":"04/02/2019","Compra":35.50,"Venta":37.50},
{"Fecha":"01/02/2019","Compra":35.75,"Venta":37.75},
{"Fecha":"31/01/2019","Compra":35.50,"Venta":37.50},
{"Fecha":"30/01/2019","Compra":36.25,"Venta":38.25},
{"Fecha":"29/01/2019","Compra":36.50,"Venta":38.50},
{"Fecha":"28/01/2019","Compra":36.25,"Venta":38.25},
{"Fecha":"25/01/2019","Compra":36.25,"Venta":38.25},
{"Fecha":"24/01/2019","Compra":36.50,"Venta":38.50},
{"Fecha":"23/01/2019","Compra":37.00,"Venta":39.00},
{"Fecha":"22/01/2019","Compra":36.75,"Venta":38.75},
{"Fecha":"21/01/2019","Compra":36.75,"Venta":38.75},
{"Fecha":"18/01/2019","Compra":37.00,"Venta":39.00},
{"Fecha":"17/01/2019","Compra":37.00,"Venta":39.00},
{"Fecha":"16/01/2019","Compra":37.25,"Venta":39.25},
{"Fecha":"15/01/2019","Compra":37.25,"Venta":39.25},
{"Fecha":"14/01/2019","Compra":37.25,"Venta":39.00},
{"Fecha":"11/01/2019","Compra":37.25,"Venta":39.25},
{"Fecha":"10/01/2019","Compra":37.25,"Venta":39.25},
{"Fecha":"09/01/2019","Compra":37.75,"Venta":39.75},
{"Fecha":"08/01/2019","Compra":37.25,"Venta":39.25},
{"Fecha":"07/01/2019","Compra":37.50,"Venta":39.50},
{"Fecha":"04/01/2019","Compra":38.00,"Venta":40.00},
{"Fecha":"03/01/2019","Compra":38.25,"Venta":40.25},
{"Fecha":"02/01/2019","Compra":38.50,"Venta":40.50},
{"Fecha":"28/12/2018","Compra":38.50,"Venta":40.50},
{"Fecha":"27/12/2018","Compra":38.00,"Venta":40.00},
{"Fecha":"26/12/2018","Compra":37.75,"Venta":39.75},
{"Fecha":"21/12/2018","Compra":37.00,"Venta":39.00},
{"Fecha":"20/12/2018","Compra":37.00,"Venta":39.00},
{"Fecha":"19/12/2018","Compra":37.00,"Venta":39.00},
{"Fecha":"18/12/2018","Compra":36.50,"Venta":38.50},
{"Fecha":"17/12/2018","Compra":36.50,"Venta":38.50},
{"Fecha":"14/12/2018","Compra":35.65,"Venta":37.65},
{"Fecha":"13/12/2018","Compra":35.65,"Venta":37.65},
{"Fecha":"12/12/2018","Compra":35.50,"Venta":37.50},
{"Fecha":"11/12/2018","Compra":35.50,"Venta":37.50},
{"Fecha":"10/12/2018","Compra":35.50,"Venta":37.50},
{"Fecha":"07/12/2018","Compra":35.50,"Venta":37.50},
{"Fecha":"06/12/2018","Compra":35.50,"Venta":37.50},
{"Fecha":"05/12/2018","Compra":35.00,"Venta":37.00},
{"Fecha":"04/12/2018","Compra":35.00,"Venta":37.00},
{"Fecha":"03/12/2018","Compra":35.00,"Venta":37.00},
{"Fecha":"29/11/2018","Compra":36.00,"Venta":38.00},
{"Fecha":"28/11/2018","Compra":36.00,"Venta":38.00},
{"Fecha":"27/11/2018","Compra":36.50,"Venta":38.50},
{"Fecha":"26/11/2018","Compra":37.00,"Venta":39.00},
{"Fecha":"23/11/2018","Compra":35.50,"Venta":37.50},
{"Fecha":"22/11/2018","Compra":34.50,"Venta":36.50},
{"Fecha":"21/11/2018","Compra":34.30,"Venta":36.30},
{"Fecha":"20/11/2018","Compra":34.26,"Venta":36.26},
{"Fecha":"16/11/2018","Compra":34.06,"Venta":36.06},
{"Fecha":"15/11/2018","Compra":34.09,"Venta":36.09},
{"Fecha":"14/11/2018","Compra":34.00,"Venta":36.00},
{"Fecha":"13/11/2018","Compra":34.00,"Venta":36.00},
{"Fecha":"12/11/2018","Compra":33.25,"Venta":35.25},
{"Fecha":"09/11/2018","Compra":33.50,"Venta":35.50},
{"Fecha":"08/11/2018","Compra":33.50,"Venta":35.50},
{"Fecha":"07/11/2018","Compra":33.50,"Venta":35.50},
{"Fecha":"05/11/2018","Compra":33.60,"Venta":35.60},
{"Fecha":"02/11/2018","Compra":34.25,"Venta":36.25},
{"Fecha":"01/11/2018","Compra":34.25,"Venta":36.25},
{"Fecha":"31/10/2018","Compra":34.50,"Venta":36.50},
{"Fecha":"30/10/2018","Compra":35.00,"Venta":37.00},
{"Fecha":"29/10/2018","Compra":35.00,"Venta":37.00},
{"Fecha":"26/10/2018","Compra":35.25,"Venta":37.25},
{"Fecha":"25/10/2018","Compra":35.20,"Venta":37.20},
{"Fecha":"24/10/2018","Compra":35.20,"Venta":37.20},
{"Fecha":"23/10/2018","Compra":35.30,"Venta":37.30},
{"Fecha":"22/10/2018","Compra":35.25,"Venta":37.25},
{"Fecha":"19/10/2018","Compra":35.75,"Venta":37.75},
{"Fecha":"18/10/2018","Compra":35.75,"Venta":37.75},
{"Fecha":"17/10/2018","Compra":35.70,"Venta":37.70},
{"Fecha":"16/10/2018","Compra":35.70,"Venta":37.80},
{"Fecha":"12/10/2018","Compra":35.80,"Venta":37.80},
{"Fecha":"11/10/2018","Compra":36.00,"Venta":38.00},
{"Fecha":"10/10/2018","Compra":36.00,"Venta":38.00},
{"Fecha":"09/10/2018","Compra":36.00,"Venta":38.00},
{"Fecha":"08/10/2018","Compra":36.00,"Venta":38.00},
{"Fecha":"05/10/2018","Compra":36.50,"Venta":38.50},
{"Fecha":"04/10/2018","Compra":36.80,"Venta":38.80},
{"Fecha":"03/10/2018","Compra":37.00,"Venta":39.00},
{"Fecha":"02/10/2018","Compra":36.50,"Venta":38.50},
{"Fecha":"01/10/2018","Compra":38.00,"Venta":40.00},
{"Fecha":"28/09/2018","Compra":39.30,"Venta":41.30},
{"Fecha":"27/09/2018","Compra":39.00,"Venta":40.50},
{"Fecha":"26/09/2018","Compra":37.75,"Venta":39.25},
{"Fecha":"25/09/2018","Compra":38.50,"Venta":40.00},
{"Fecha":"24/09/2018","Compra":36.75,"Venta":38.25},
{"Fecha":"21/09/2018","Compra":36.75,"Venta":38.25},
{"Fecha":"20/09/2018","Compra":37.50,"Venta":39.00},
{"Fecha":"19/09/2018","Compra":38.00,"Venta":39.50},
{"Fecha":"18/09/2018","Compra":38.00,"Venta":39.75},
{"Fecha":"17/09/2018","Compra":38.35,"Venta":40.35},
{"Fecha":"14/09/2018","Compra":38.00,"Venta":40.00},
{"Fecha":"13/09/2018","Compra":38.00,"Venta":39.50},
{"Fecha":"12/09/2018","Compra":37.00,"Venta":38.50},
{"Fecha":"11/09/2018","Compra":36.50,"Venta":38.25},
{"Fecha":"10/09/2018","Compra":35.70,"Venta":37.70},
{"Fecha":"07/09/2018","Compra":36.50,"Venta":37.50},
{"Fecha":"06/09/2018","Compra":36.60,"Venta":38.60},
{"Fecha":"05/09/2018","Compra":37.20,"Venta":39.20},
{"Fecha":"04/09/2018","Compra":38.00,"Venta":40.00},
{"Fecha":"03/09/2018","Compra":36.70,"Venta":38.70},
{"Fecha":"31/08/2018","Compra":36.00,"Venta":38.00},
{"Fecha":"30/08/2018","Compra":38.50,"Venta":40.00},
{"Fecha":"29/08/2018","Compra":34.00,"Venta":35.00},
{"Fecha":"28/08/2018","Compra":32.00,"Venta":33.00},
{"Fecha":"27/08/2018","Compra":31.20,"Venta":32.20},
{"Fecha":"24/08/2018","Compra":30.35,"Venta":31.35},
{"Fecha":"23/08/2018","Compra":29.95,"Venta":30.95},
{"Fecha":"22/08/2018","Compra":29.80,"Venta":30.80},
{"Fecha":"21/08/2018","Compra":29.50,"Venta":30.50},
{"Fecha":"17/08/2018","Compra":29.20,"Venta":30.20},
{"Fecha":"16/08/2018","Compra":29.10,"Venta":30.10},
{"Fecha":"15/08/2018","Compra":29.50,"Venta":30.50},
{"Fecha":"14/08/2018","Compra":29.50,"Venta":30.50},
{"Fecha":"13/08/2018","Compra":29.50,"Venta":30.50},
{"Fecha":"10/08/2018","Compra":28.50,"Venta":29.50},
{"Fecha":"09/08/2018","Compra":27.50,"Venta":28.50},
{"Fecha":"08/08/2018","Compra":27.30,"Venta":28.30},
{"Fecha":"07/08/2018","Compra":27.30,"Venta":28.30},
{"Fecha":"06/08/2018","Compra":27.30,"Venta":28.30},
{"Fecha":"03/08/2018","Compra":27.35,"Venta":28.35},
{"Fecha":"02/08/2018","Compra":27.40,"Venta":28.40},
{"Fecha":"01/08/2018","Compra":27.45,"Venta":28.45},
{"Fecha":"31/07/2018","Compra":27.45,"Venta":28.45},
{"Fecha":"30/07/2018","Compra":27.65,"Venta":28.65},
{"Fecha":"27/07/2018","Compra":27.70,"Venta":28.70},
{"Fecha":"26/07/2018","Compra":27.70,"Venta":28.70},
{"Fecha":"25/07/2018","Compra":27.70,"Venta":28.70},
{"Fecha":"24/07/2018","Compra":27.70,"Venta":28.70},
{"Fecha":"23/07/2018","Compra":27.80,"Venta":28.80},
{"Fecha":"20/07/2018","Compra":27.90,"Venta":28.90},
{"Fecha":"19/07/2018","Compra":27.65,"Venta":28.65},
{"Fecha":"18/07/2018","Compra":27.65,"Venta":28.65},
{"Fecha":"17/07/2018","Compra":27.80,"Venta":28.80},
{"Fecha":"16/07/2018","Compra":27.85,"Venta":28.85},
{"Fecha":"13/07/2018","Compra":27.68,"Venta":28.68},
{"Fecha":"12/07/2018","Compra":27.40,"Venta":28.40},
{"Fecha":"11/07/2018","Compra":27.50,"Venta":28.50},
{"Fecha":"10/07/2018","Compra":27.50,"Venta":28.50},
{"Fecha":"06/07/2018","Compra":27.90,"Venta":28.90},
{"Fecha":"05/07/2018","Compra":27.90,"Venta":28.90},
{"Fecha":"04/07/2018","Compra":27.97,"Venta":28.95},
{"Fecha":"03/07/2018","Compra":28.00,"Venta":29.00},
{"Fecha":"02/07/2018","Compra":28.30,"Venta":29.30},
{"Fecha":"29/06/2018","Compra":28.40,"Venta":29.40},
{"Fecha":"28/06/2018","Compra":27.50,"Venta":28.50},
{"Fecha":"27/06/2018","Compra":27.30,"Venta":28.30},
{"Fecha":"26/06/2018","Compra":27.30,"Venta":28.30},
{"Fecha":"25/06/2018","Compra":27.30,"Venta":28.30},
{"Fecha":"22/06/2018","Compra":27.10,"Venta":28.10},
{"Fecha":"21/06/2018","Compra":27.50,"Venta":28.50},
{"Fecha":"19/06/2018","Compra":27.50,"Venta":28.50},
{"Fecha":"18/06/2018","Compra":27.50,"Venta":28.50},
{"Fecha":"15/06/2018","Compra":27.70,"Venta":28.70},
{"Fecha":"14/06/2018","Compra":27.20,"Venta":28.70},
{"Fecha":"13/06/2018","Compra":26.00,"Venta":27.00},
{"Fecha":"12/06/2018","Compra":25.70,"Venta":26.70},
{"Fecha":"11/06/2018","Compra":25.50,"Venta":26.30},
{"Fecha":"08/06/2018","Compra":25.20,"Venta":26.20},
{"Fecha":"07/06/2018","Compra":24.85,"Venta":25.65},
{"Fecha":"06/06/2018","Compra":24.75,"Venta":25.55},
{"Fecha":"05/06/2018","Compra":25.10,"Venta":25.90},
{"Fecha":"04/06/2018","Compra":25.20,"Venta":26.00},
{"Fecha":"01/06/2018","Compra":25.20,"Venta":26.00},
{"Fecha":"31/05/2018","Compra":25.17,"Venta":25.97},
{"Fecha":"30/05/2018","Compra":25.10,"Venta":25.90},
{"Fecha":"29/05/2018","Compra":25.05,"Venta":25.85},
{"Fecha":"28/05/2018","Compra":25.05,"Venta":25.85},
{"Fecha":"24/05/2018","Compra":24.80,"Venta":25.75},
{"Fecha":"23/05/2018","Compra":24.49,"Venta":25.49},
{"Fecha":"22/05/2018","Compra":24.40,"Venta":25.40},
{"Fecha":"21/05/2018","Compra":24.40,"Venta":25.40},
{"Fecha":"18/05/2018","Compra":24.60,"Venta":25.40},
{"Fecha":"17/05/2018","Compra":24.60,"Venta":25.20},
{"Fecha":"16/05/2018","Compra":24.20,"Venta":25.00},
{"Fecha":"15/05/2018","Compra":24.00,"Venta":24.80},
{"Fecha":"14/05/2018","Compra":25.80,"Venta":26.80},
{"Fecha":"11/05/2018","Compra":23.65,"Venta":24.25},
{"Fecha":"10/05/2018","Compra":22.95,"Venta":23.55},
{"Fecha":"09/05/2018","Compra":22.90,"Venta":23.50},
{"Fecha":"08/05/2018","Compra":22.40,"Venta":23.00},
{"Fecha":"07/05/2018","Compra":21.90,"Venta":22.50},
{"Fecha":"04/05/2018","Compra":21.80,"Venta":22.20},
{"Fecha":"03/05/2018","Compra":23.10,"Venta":23.50},
{"Fecha":"02/05/2018","Compra":21.10,"Venta":21.50},
{"Fecha":"27/04/2018","Compra":20.60,"Venta":21.00},
{"Fecha":"26/04/2018","Compra":20.45,"Venta":20.85},
{"Fecha":"25/04/2018","Compra":20.16,"Venta":20.56},
{"Fecha":"24/04/2018","Compra":20.19,"Venta":20.59},
{"Fecha":"23/04/2018","Compra":20.17,"Venta":20.57},
{"Fecha":"20/04/2018","Compra":20.18,"Venta":20.58},
{"Fecha":"19/04/2018","Compra":20.15,"Venta":20.55},
{"Fecha":"18/04/2018","Compra":20.23,"Venta":20.63},
{"Fecha":"17/04/2018","Compra":20.30,"Venta":20.70},
{"Fecha":"16/04/2018","Compra":20.30,"Venta":20.70},
{"Fecha":"13/04/2018","Compra":20.30,"Venta":20.70},
{"Fecha":"12/04/2018","Compra":20.30,"Venta":20.70},
{"Fecha":"11/04/2018","Compra":20.30,"Venta":20.70},
{"Fecha":"10/04/2018","Compra":20.21,"Venta":20.61},
{"Fecha":"09/04/2018","Compra":20.21,"Venta":20.61},
{"Fecha":"06/04/2018","Compra":20.24,"Venta":20.64},
{"Fecha":"05/04/2018","Compra":20.25,"Venta":20.65},
{"Fecha":"04/04/2018","Compra":20.20,"Venta":20.60},
{"Fecha":"03/04/2018","Compra":20.42,"Venta":20.82},
{"Fecha":"28/03/2018","Compra":20.36,"Venta":20.76},
{"Fecha":"27/03/2018","Compra":20.36,"Venta":20.76},
{"Fecha":"26/03/2018","Compra":20.48,"Venta":20.88},
{"Fecha":"23/03/2018","Compra":20.54,"Venta":20.94},
{"Fecha":"22/03/2018","Compra":20.50,"Venta":20.90},
{"Fecha":"21/03/2018","Compra":20.58,"Venta":20.98},
{"Fecha":"20/03/2018","Compra":20.57,"Venta":20.97},
{"Fecha":"19/03/2018","Compra":20.52,"Venta":20.92},
{"Fecha":"16/03/2018","Compra":20.49,"Venta":20.89},
{"Fecha":"15/03/2018","Compra":20.42,"Venta":20.82},
{"Fecha":"14/03/2018","Compra":20.35,"Venta":20.75},
{"Fecha":"13/03/2018","Compra":20.27,"Venta":20.67},
{"Fecha":"12/03/2018","Compra":20.20,"Venta":20.60},
{"Fecha":"09/03/2018","Compra":20.21,"Venta":20.61},
{"Fecha":"08/03/2018","Compra":20.25,"Venta":20.65},
{"Fecha":"07/03/2018","Compra":20.28,"Venta":20.68},
{"Fecha":"06/03/2018","Compra":20.25,"Venta":20.65},
{"Fecha":"05/03/2018","Compra":20.15,"Venta":20.55},
{"Fecha":"02/03/2018","Compra":20.10,"Venta":20.50},
{"Fecha":"01/03/2018","Compra":20.00,"Venta":20.40},
{"Fecha":"28/02/2018","Compra":19.95,"Venta":20.35},
{"Fecha":"27/02/2018","Compra":20.00,"Venta":20.40},
{"Fecha":"26/02/2018","Compra":20.00,"Venta":20.40},
{"Fecha":"23/02/2018","Compra":19.95,"Venta":20.35},
{"Fecha":"22/02/2018","Compra":19.91,"Venta":20.31},
{"Fecha":"21/02/2018","Compra":19.80,"Venta":20.30},
{"Fecha":"20/02/2018","Compra":19.76,"Venta":20.16},
{"Fecha":"19/02/2018","Compra":19.83,"Venta":20.23},
{"Fecha":"16/02/2018","Compra":19.75,"Venta":20.15},
{"Fecha":"15/02/2018","Compra":18.72,"Venta":20.12},
{"Fecha":"14/02/2018","Compra":19.80,"Venta":20.20},
{"Fecha":"09/02/2018","Compra":19.83,"Venta":20.23},
{"Fecha":"08/02/2018","Compra":19.53,"Venta":19.93},
{"Fecha":"07/02/2018","Compra":19.45,"Venta":19.85},
{"Fecha":"06/02/2018","Compra":19.49,"Venta":19.89},
{"Fecha":"05/02/2018","Compra":19.52,"Venta":19.92},
{"Fecha":"02/02/2018","Compra":19.52,"Venta":19.92},
{"Fecha":"01/02/2018","Compra":19.53,"Venta":19.93},
{"Fecha":"31/01/2018","Compra":19.55,"Venta":19.95},
{"Fecha":"30/01/2018","Compra":19.64,"Venta":20.04},
{"Fecha":"29/01/2018","Compra":19.63,"Venta":20.03},
{"Fecha":"26/01/2018","Compra":19.58,"Venta":19.98},
{"Fecha":"25/01/2018","Compra":19.56,"Venta":19.96},
{"Fecha":"24/01/2018","Compra":19.63,"Venta":20.03},
{"Fecha":"23/01/2018","Compra":19.48,"Venta":19.88},
{"Fecha":"22/01/2018","Compra":19.40,"Venta":19.80},
{"Fecha":"19/01/2018","Compra":19.29,"Venta":19.69},
{"Fecha":"18/01/2018","Compra":19.24,"Venta":19.64},
{"Fecha":"17/01/2018","Compra":19.22,"Venta":19.62},
{"Fecha":"16/01/2018","Compra":19.20,"Venta":19.60},
{"Fecha":"15/01/2018","Compra":19.21,"Venta":19.61},
{"Fecha":"12/01/2018","Compra":19.14,"Venta":19.54},
{"Fecha":"11/01/2018","Compra":19.01,"Venta":19.41},
{"Fecha":"10/01/2018","Compra":18.92,"Venta":19.32},
{"Fecha":"09/01/2018","Compra":19.14,"Venta":19.54},
{"Fecha":"08/01/2018","Compra":19.18,"Venta":19.58},
{"Fecha":"05/01/2018","Compra":19.05,"Venta":19.45},
{"Fecha":"04/01/2018","Compra":19.01,"Venta":19.41},
{"Fecha":"03/01/2018","Compra":18.89,"Venta":19.29},
{"Fecha":"02/01/2018","Compra":18.85,"Venta":19.25},
{"Fecha":"29/12/2017","Compra":18.88,"Venta":19.28},
{"Fecha":"28/12/2017","Compra":19.15,"Venta":19.55},
{"Fecha":"27/12/2017","Compra":18.65,"Venta":19.05},
{"Fecha":"26/12/2017","Compra":18.50,"Venta":18.90},
{"Fecha":"22/12/2017","Compra":18.07,"Venta":18.47},
{"Fecha":"21/12/2017","Compra":17.83,"Venta":18.23},
{"Fecha":"20/12/2017","Compra":17.66,"Venta":18.06},
{"Fecha":"19/12/2017","Compra":17.74,"Venta":18.14},
{"Fecha":"18/12/2017","Compra":17.85,"Venta":18.25},
{"Fecha":"15/12/2017","Compra":17.69,"Venta":18.09},
{"Fecha":"14/12/2017","Compra":17.56,"Venta":17.96},
{"Fecha":"13/12/2017","Compra":17.43,"Venta":17.93},
{"Fecha":"12/12/2017","Compra":17.55,"Venta":17.95},
{"Fecha":"11/12/2017","Compra":17.53,"Venta":17.93},
{"Fecha":"07/12/2017","Compra":17.48,"Venta":17.88},
{"Fecha":"06/12/2017","Compra":17.55,"Venta":17.95},
{"Fecha":"05/12/2017","Compra":17.56,"Venta":17.96},
{"Fecha":"04/12/2017","Compra":17.67,"Venta":18.07},
{"Fecha":"01/12/2017","Compra":17.61,"Venta":18.01},
{"Fecha":"30/11/2017","Compra":17.56,"Venta":17.96},
{"Fecha":"29/11/2017","Compra":17.72,"Venta":18.12},
{"Fecha":"28/11/2017","Compra":17.74,"Venta":18.14},
{"Fecha":"27/11/2017","Compra":17.71,"Venta":18.11},
{"Fecha":"24/11/2017","Compra":17.77,"Venta":18.07},
{"Fecha":"23/11/2017","Compra":17.70,"Venta":18.10},
{"Fecha":"22/11/2017","Compra":17.74,"Venta":18.14},
{"Fecha":"21/11/2017","Compra":17.72,"Venta":18.12},
{"Fecha":"17/11/2017","Compra":17.69,"Venta":18.09},
{"Fecha":"16/11/2017","Compra":17.66,"Venta":18.06},
{"Fecha":"15/11/2017","Compra":17.66,"Venta":18.06},
{"Fecha":"14/11/2017","Compra":17.67,"Venta":18.07},
{"Fecha":"13/11/2017","Compra":17.68,"Venta":18.08},
{"Fecha":"10/11/2017","Compra":17.58,"Venta":17.98},
{"Fecha":"09/11/2017","Compra":17.55,"Venta":17.95},
{"Fecha":"08/11/2017","Compra":17.50,"Venta":17.90},
{"Fecha":"07/11/2017","Compra":17.60,"Venta":18.00},
{"Fecha":"03/11/2017","Compra":17.61,"Venta":18.01},
{"Fecha":"02/11/2017","Compra":17.63,"Venta":18.03},
{"Fecha":"01/11/2017","Compra":17.63,"Venta":18.03},
{"Fecha":"31/10/2017","Compra":17.70,"Venta":18.10},
{"Fecha":"30/10/2017","Compra":17.75,"Venta":18.15},
{"Fecha":"27/10/2017","Compra":17.72,"Venta":18.12},
{"Fecha":"26/10/2017","Compra":17.68,"Venta":18.08},
{"Fecha":"25/10/2017","Compra":17.70,"Venta":18.10},
{"Fecha":"24/10/2017","Compra":17.74,"Venta":18.14},
{"Fecha":"23/10/2017","Compra":17.67,"Venta":18.07},
{"Fecha":"20/10/2017","Compra":17.61,"Venta":18.01},
{"Fecha":"19/10/2017","Compra":17.58,"Venta":17.98},
{"Fecha":"18/10/2017","Compra":17.65,"Venta":18.05},
{"Fecha":"17/10/2017","Compra":17.62,"Venta":18.02},
{"Fecha":"13/10/2017","Compra":17.50,"Venta":17.90},
{"Fecha":"12/10/2017","Compra":17.49,"Venta":17.89},
{"Fecha":"11/10/2017","Compra":17.45,"Venta":17.85},
{"Fecha":"10/10/2017","Compra":17.46,"Venta":17.86},
{"Fecha":"09/10/2017","Compra":17.47,"Venta":17.87},
{"Fecha":"06/10/2017","Compra":17.41,"Venta":17.78},
{"Fecha":"05/10/2017","Compra":17.40,"Venta":17.80},
{"Fecha":"04/10/2017","Compra":17.42,"Venta":17.82},
{"Fecha":"03/10/2017","Compra":17.50,"Venta":17.90},
{"Fecha":"02/10/2017","Compra":17.56,"Venta":17.96},
{"Fecha":"29/09/2017","Compra":17.51,"Venta":17.91},
{"Fecha":"28/09/2017","Compra":17.57,"Venta":17.97},
{"Fecha":"27/09/2017","Compra":17.59,"Venta":17.99},
{"Fecha":"26/09/2017","Compra":17.65,"Venta":18.05},
{"Fecha":"25/09/2017","Compra":17.57,"Venta":17.97},
{"Fecha":"22/09/2017","Compra":17.55,"Venta":17.95},
{"Fecha":"21/09/2017","Compra":17.55,"Venta":17.95},
{"Fecha":"20/09/2017","Compra":17.57,"Venta":17.97},
{"Fecha":"19/09/2017","Compra":17.55,"Venta":17.95},
{"Fecha":"18/09/2017","Compra":17.52,"Venta":17.92},
{"Fecha":"15/09/2017","Compra":17.44,"Venta":17.84},
{"Fecha":"14/09/2017","Compra":17.46,"Venta":17.86},
{"Fecha":"13/09/2017","Compra":17.45,"Venta":17.85},
{"Fecha":"12/09/2017","Compra":17.48,"Venta":17.88},
{"Fecha":"11/09/2017","Compra":17.54,"Venta":17.94},
{"Fecha":"08/09/2017","Compra":17.48,"Venta":17.88},
{"Fecha":"07/09/2017","Compra":17.43,"Venta":17.83},
{"Fecha":"06/09/2017","Compra":17.55,"Venta":17.95},
{"Fecha":"05/09/2017","Compra":17.59,"Venta":17.99},
{"Fecha":"04/09/2017","Compra":17.70,"Venta":18.10},
{"Fecha":"01/09/2017","Compra":17.75,"Venta":18.15},
{"Fecha":"31/08/2017","Compra":17.83,"Venta":18.23},
{"Fecha":"30/08/2017","Compra":17.86,"Venta":18.26},
{"Fecha":"29/08/2017","Compra":17.89,"Venta":18.29},
{"Fecha":"28/08/2017","Compra":17.91,"Venta":18.31},
{"Fecha":"25/08/2017","Compra":17.88,"Venta":18.28},
{"Fecha":"24/08/2017","Compra":17.86,"Venta":18.26},
{"Fecha":"23/08/2017","Compra":17.90,"Venta":18.30},
{"Fecha":"22/08/2017","Compra":17.92,"Venta":18.32},
{"Fecha":"18/08/2017","Compra":17.90,"Venta":18.30},
{"Fecha":"17/08/2017","Compra":17.95,"Venta":18.35},
{"Fecha":"16/08/2017","Compra":17.90,"Venta":18.30},
{"Fecha":"15/08/2017","Compra":17.75,"Venta":18.15},
{"Fecha":"14/08/2017","Compra":17.70,"Venta":18.10},
{"Fecha":"11/08/2017","Compra":18.08,"Venta":18.48},
{"Fecha":"10/08/2017","Compra":18.08,"Venta":18.48},
{"Fecha":"09/08/2017","Compra":18.01,"Venta":18.41},
{"Fecha":"08/08/2017","Compra":18.00,"Venta":18.40},
{"Fecha":"07/08/2017","Compra":17.79,"Venta":18.19},
{"Fecha":"04/08/2017","Compra":17.75,"Venta":18.15},
{"Fecha":"03/08/2017","Compra":17.78,"Venta":18.18},
{"Fecha":"02/08/2017","Compra":17.86,"Venta":18.26},
{"Fecha":"01/08/2017","Compra":17.69,"Venta":18.09},
{"Fecha":"31/07/2017","Compra":17.65,"Venta":18.09},
{"Fecha":"28/07/2017","Compra":18.03,"Venta":18.43},
{"Fecha":"27/07/2017","Compra":18.02,"Venta":18.42},
{"Fecha":"26/07/2017","Compra":17.87,"Venta":18.27},
{"Fecha":"25/07/2017","Compra":17.74,"Venta":18.14},
{"Fecha":"24/07/2017","Compra":17.65,"Venta":18.05},
{"Fecha":"21/07/2017","Compra":17.56,"Venta":17.96},
{"Fecha":"20/07/2017","Compra":17.44,"Venta":17.84},
{"Fecha":"19/07/2017","Compra":17.42,"Venta":17.82},
{"Fecha":"18/07/2017","Compra":17.44,"Venta":17.84},
{"Fecha":"17/07/2017","Compra":17.32,"Venta":17.72},
{"Fecha":"14/07/2017","Compra":17.17,"Venta":17.57},
{"Fecha":"13/07/2017","Compra":17.20,"Venta":17.60},
{"Fecha":"12/07/2017","Compra":17.10,"Venta":17.50},
{"Fecha":"11/07/2017","Compra":16.02,"Venta":17.42},
{"Fecha":"10/07/2017","Compra":16.90,"Venta":17.30},
{"Fecha":"07/07/2017","Compra":16.80,"Venta":17.20},
{"Fecha":"06/07/2017","Compra":16.85,"Venta":17.25},
{"Fecha":"05/07/2017","Compra":16.81,"Venta":17.21},
{"Fecha":"04/07/2017","Compra":16.56,"Venta":16.96},
{"Fecha":"03/07/2017","Compra":16.51,"Venta":16.91},
{"Fecha":"30/06/2017","Compra":16.44,"Venta":16.84},
{"Fecha":"29/06/2017","Compra":16.31,"Venta":16.71},
{"Fecha":"28/06/2017","Compra":16.27,"Venta":16.67},
{"Fecha":"27/06/2017","Compra":16.32,"Venta":16.72},
{"Fecha":"26/06/2017","Compra":16.27,"Venta":16.67},
{"Fecha":"23/06/2017","Compra":16.16,"Venta":16.56},
{"Fecha":"22/06/2017","Compra":16.13,"Venta":16.53},
{"Fecha":"21/06/2017","Compra":16.30,"Venta":16.70},
{"Fecha":"19/06/2017","Compra":16.24,"Venta":16.64},
{"Fecha":"16/06/2017","Compra":16.13,"Venta":16.53},
{"Fecha":"15/06/2017","Compra":16.09,"Venta":16.49},
{"Fecha":"14/06/2017","Compra":16.11,"Venta":16.51},
{"Fecha":"13/06/2017","Compra":16.01,"Venta":16.41},
{"Fecha":"12/06/2017","Compra":16.01,"Venta":16.41},
{"Fecha":"09/06/2017","Compra":15.95,"Venta":16.35},
{"Fecha":"08/06/2017","Compra":15.94,"Venta":16.34},
{"Fecha":"07/06/2017","Compra":15.96,"Venta":16.36},
{"Fecha":"06/06/2017","Compra":15.98,"Venta":16.38},
{"Fecha":"05/06/2017","Compra":15.94,"Venta":16.34},
{"Fecha":"02/06/2017","Compra":15.92,"Venta":16.32},
{"Fecha":"01/06/2017","Compra":15.90,"Venta":16.30},
{"Fecha":"31/05/2017","Compra":15.99,"Venta":16.39},
{"Fecha":"30/05/2017","Compra":16.05,"Venta":16.45},
{"Fecha":"29/05/2017","Compra":16.00,"Venta":16.41},
{"Fecha":"26/05/2017","Compra":15.94,"Venta":16.34},
{"Fecha":"24/05/2017","Compra":15.89,"Venta":16.29},
{"Fecha":"23/05/2017","Compra":15.88,"Venta":16.28},
{"Fecha":"22/05/2017","Compra":15.82,"Venta":16.22},
{"Fecha":"19/05/2017","Compra":15.71,"Venta":16.11},
{"Fecha":"18/05/2017","Compra":15.80,"Venta":16.20},
{"Fecha":"17/05/2017","Compra":15.66,"Venta":16.06},
{"Fecha":"16/05/2017","Compra":15.65,"Venta":16.05},
{"Fecha":"15/05/2017","Compra":15.57,"Venta":15.97},
{"Fecha":"12/05/2017","Compra":15.53,"Venta":15.93},
{"Fecha":"11/05/2017","Compra":15.52,"Venta":15.92},
{"Fecha":"10/05/2017","Compra":15.44,"Venta":15.94},
{"Fecha":"09/05/2017","Compra":15.55,"Venta":15.95},
{"Fecha":"08/05/2017","Compra":15.61,"Venta":16.01},
{"Fecha":"05/05/2017","Compra":15.51,"Venta":15.91},
{"Fecha":"04/05/2017","Compra":15.51,"Venta":15.91},
{"Fecha":"03/05/2017","Compra":15.49,"Venta":15.89},
{"Fecha":"02/05/2017","Compra":15.57,"Venta":15.97},
{"Fecha":"28/04/2017","Compra":15.59,"Venta":15.99},
{"Fecha":"27/04/2017","Compra":15.55,"Venta":15.95},
{"Fecha":"26/04/2017","Compra":15.66,"Venta":16.06},
{"Fecha":"25/04/2017","Compra":15.70,"Venta":16.10},
{"Fecha":"24/04/2017","Compra":15.72,"Venta":16.12},
{"Fecha":"21/04/2017","Compra":15.69,"Venta":16.09},
{"Fecha":"20/04/2017","Compra":15.69,"Venta":16.09},
{"Fecha":"19/04/2017","Compra":15.70,"Venta":16.10},
{"Fecha":"18/04/2017","Compra":15.47,"Venta":15.87},
{"Fecha":"17/04/2017","Compra":15.51,"Venta":15.91},
{"Fecha":"12/04/2017","Compra":15.29,"Venta":15.69},
{"Fecha":"11/04/2017","Compra":15.29,"Venta":15.69},
{"Fecha":"10/04/2017","Compra":15.23,"Venta":15.63},
{"Fecha":"07/04/2017","Compra":15.29,"Venta":15.69},
{"Fecha":"06/04/2017","Compra":15.47,"Venta":15.87},
{"Fecha":"05/04/2017","Compra":15.47,"Venta":15.87},
{"Fecha":"04/04/2017","Compra":15.48,"Venta":15.88},
{"Fecha":"03/04/2017","Compra":15.59,"Venta":15.99},
{"Fecha":"31/03/2017","Compra":15.58,"Venta":15.98},
{"Fecha":"30/03/2017","Compra":15.49,"Venta":15.89},
{"Fecha":"29/03/2017","Compra":15.50,"Venta":15.90},
{"Fecha":"28/03/2017","Compra":15.67,"Venta":16.07},
{"Fecha":"27/03/2017","Compra":15.71,"Venta":16.11},
{"Fecha":"23/03/2017","Compra":15.69,"Venta":16.09},
{"Fecha":"22/03/2017","Compra":15.68,"Venta":16.08},
{"Fecha":"21/03/2017","Compra":15.73,"Venta":16.13},
{"Fecha":"20/03/2017","Compra":15.80,"Venta":16.20},
{"Fecha":"17/03/2017","Compra":15.67,"Venta":16.07},
{"Fecha":"16/03/2017","Compra":15.64,"Venta":16.04},
{"Fecha":"15/03/2017","Compra":15.66,"Venta":16.06},
{"Fecha":"14/03/2017","Compra":15.67,"Venta":16.07},
{"Fecha":"13/03/2017","Compra":15.68,"Venta":16.08},
{"Fecha":"10/03/2017","Compra":15.64,"Venta":16.04},
{"Fecha":"09/03/2017","Compra":15.62,"Venta":16.02},
{"Fecha":"08/03/2017","Compra":15.62,"Venta":16.02},
{"Fecha":"07/03/2017","Compra":15.69,"Venta":16.09},
{"Fecha":"06/03/2017","Compra":15.70,"Venta":16.10},
{"Fecha":"03/03/2017","Compra":15.67,"Venta":16.07},
{"Fecha":"02/03/2017","Compra":15.62,"Venta":16.02},
{"Fecha":"01/03/2017","Compra":15.84,"Venta":16.24},
{"Fecha":"24/02/2017","Compra":15.88,"Venta":16.28},
{"Fecha":"23/02/2017","Compra":15.86,"Venta":16.26},
{"Fecha":"22/02/2017","Compra":15.95,"Venta":16.35},
{"Fecha":"21/02/2017","Compra":16.02,"Venta":16.42},
{"Fecha":"20/02/2017","Compra":16.09,"Venta":16.49},
{"Fecha":"17/02/2017","Compra":16.08,"Venta":16.48},
{"Fecha":"16/02/2017","Compra":15.98,"Venta":16.28},
{"Fecha":"15/02/2017","Compra":15.92,"Venta":16.32},
{"Fecha":"14/02/2017","Compra":16.01,"Venta":16.41},
{"Fecha":"13/02/2017","Compra":16.05,"Venta":16.45},
{"Fecha":"10/02/2017","Compra":16.03,"Venta":16.43},
{"Fecha":"09/02/2017","Compra":16.03,"Venta":16.43},
{"Fecha":"08/02/2017","Compra":16.08,"Venta":16.48},
{"Fecha":"07/02/2017","Compra":16.09,"Venta":16.49},
{"Fecha":"06/02/2017","Compra":16.08,"Venta":16.48},
{"Fecha":"03/02/2017","Compra":16.08,"Venta":16.48},
{"Fecha":"02/02/2017","Compra":16.11,"Venta":16.51},
{"Fecha":"01/02/2017","Compra":16.21,"Venta":16.61},
{"Fecha":"31/01/2017","Compra":16.24,"Venta":16.64},
{"Fecha":"30/01/2017","Compra":16.30,"Venta":16.70},
{"Fecha":"27/01/2017","Compra":16.40,"Venta":16.80},
{"Fecha":"26/01/2017","Compra":16.40,"Venta":16.80},
{"Fecha":"25/01/2017","Compra":16.45,"Venta":16.85},
{"Fecha":"24/01/2017","Compra":16.47,"Venta":16.87},
{"Fecha":"23/01/2017","Compra":16.48,"Venta":16.88},
{"Fecha":"20/01/2017","Compra":16.46,"Venta":16.86},
{"Fecha":"19/01/2017","Compra":16.49,"Venta":16.89},
{"Fecha":"18/01/2017","Compra":16.48,"Venta":16.88},
{"Fecha":"17/01/2017","Compra":16.45,"Venta":16.85},
{"Fecha":"16/01/2017","Compra":16.41,"Venta":16.81},
{"Fecha":"13/01/2017","Compra":16.39,"Venta":16.79},
{"Fecha":"12/01/2017","Compra":16.42,"Venta":16.82},
{"Fecha":"11/01/2017","Compra":16.41,"Venta":16.81},
{"Fecha":"10/01/2017","Compra":16.45,"Venta":16.85},
{"Fecha":"09/01/2017","Compra":16.48,"Venta":16.88}];

  const startDate = startMonth + startYear * 12;
  const endDate = endMonth + endYear * 12;
  
  const lastVentaValues = [];

  dolarHistorico.forEach(record => {
  const dateParts = record.Fecha.split('/');
  const year = parseInt(dateParts[2]);
  const month = parseInt(dateParts[1]);
  const dateValue = parseFloat(record.Venta);
  const key = year.toString() + '-' + month.toString();
  const existingIndex = lastVentaValues.findIndex(item => item.month === month && item.year === year);
  
  if (existingIndex > -1) {
    const existingDate = new Date(lastVentaValues[existingIndex].date);
    const currentDate = new Date(record.Fecha);    

    if (currentDate > existingDate) {
      lastVentaValues[existingIndex].lastVentaValue = dateValue;
      lastVentaValues[existingIndex].date = record.Fecha;
    }
  } else {
    lastVentaValues.push({
      lastVentaValue: dateValue,
      date: record.Fecha,
      month: month,
      year: year
    });
  }
});

  const filterTable = lastVentaValues.filter((element) => (element.month+element.year*12) >= startDate && (element.month+element.year*12) <= endDate);

  const dolarArray = filterTable.map((index) => index.lastVentaValue);
  console.log(dolarArray);
  //console.log(dolarArray);
  const dolarWage = Array(dolarArray.length);
  for (let i=0,length = dolarArray.length; i<length; i++){
    dolarWage[i] = Math.floor(filteredSalaryArray[i] / dolarArray[length-i-1]*100)/100;
  }
  return dolarWage;
}
//Fills the entire input list with the salary values used
function fillAll(Array) {
  let inputArray = [...document.querySelectorAll(".tax-input")];
  for (let i = 0; i < inputArray.length; i++) {
    if (inputArray[i].getAttribute("type") != "month") {
      inputArray[i].value = Array[i];
    }
  }
}

function numberWithCommas(x) {
  return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
}

function tweetButton(outputInnerText) {
  const taxDiv = document.querySelector('.tax')
  const tweetAnchor = document.querySelector("#tweet-button");
  tweetAnchor.classList.add('tweet-button')
  const tweetInnerText = outputInnerText+" Esto fue calculado usando el sitio web:"
    tweetAnchor.innerText = 'Twitear resultados';
    const tweetImage = document.createElement('img');
    tweetImage.setAttribute('src', './icons/twitter-white.svg');
    tweetAnchor.setAttribute("href", `https://twitter.com/intent/tweet?hashtags=impuestazo&original_referer=https%3A%2F%2Fwww.impuestazo.com.ar%2F&ref_src=twsrc%5Etfw%7Ctwcamp%5Ebuttonembed%7Ctwterm%5Eshare%7Ctwgr%5E&text=${tweetInnerText}&url=https%3A%2F%2Fimpuestazo.com.ar`);
    taxDiv.appendChild(tweetAnchor);
    tweetAnchor.appendChild(tweetImage);
}

const calculateButton = document.querySelector("#calculate");
calculateButton.addEventListener("click", () => {
  calculateTax();
});

const minimumWageButton = document.querySelector("#calculate-1");
minimumWageButton.addEventListener("click", () => {
  calculateMinimumWage();
  window.scrollTo(0, 896, "smooth");
});

function createSalaryChart(dateArray, mappedSalary, inflationAdjustedSalary, accumulatedLosses, finalAdjustedLosses, dolarizedInflationAdjustedSalary, dolarizedSalary) {
  let posColour = 'rgba(52, 152, 219, .3)',
      negColour = 'rgba(255, 87, 51, .3)',
      posBackgroundColour = 'rgba(52, 152, 219, .6)',
      negBackgroundColour = 'rgba(255, 87, 51, .6)';
  
  const chartOne = document.querySelector("#myChart");
  const box = document.querySelector('.box > .tax');
  if (chartOne == null) {
    const myChart = document.createElement("canvas");
    myChart.setAttribute('id', 'myChart');
    box.appendChild(myChart);
  }
  else {
    box.removeChild(chartOne);
    const myChart = document.createElement("canvas");
    myChart.setAttribute('id', 'myChart');
    box.appendChild(myChart);
  }
  //add label to array
  dateArray.forEach(function (element) {
    element.label = element.Mes + "/" + element.Año;
  });
  const dateLabel = dateArray.map((index) => index.label);
  new Chart("myChart", {
    type: "line",
    data: {
      labels: dateLabel,
      datasets: [{
        label: 'Salario ajustado x inflación (ARS)',
        fill: { target: 'origin', above: negColour },
        backgroundColor: negBackgroundColour,
        borderColor: negBackgroundColour,
        data: inflationAdjustedSalary,
        tension: '0.5',
        pointRadius: '0'
      }, {
        label: 'Salario (ARS)',
        fill: { target: 'origin', above: posColour },
        backgroundColor: posBackgroundColour,
        borderColor: posBackgroundColour,
        data: mappedSalary,
        tension: '0.5',
        pointRadius: '0',
      }]
    },
    options: {
      plugins: {
        title: {
          display: true,
          text: 'Evolucion salarial vs "inflación" (ARS)',
        },
      },
      maintainAspectRatio: false,
      scales: {
        y: {  
          beginAtZero:false
        }
      },
    },
  });

    //dolar chart
  const chartThree = document.querySelector("#dolarChart");
  if (chartThree == null) {
    const dolarChart = document.createElement("canvas");
    dolarChart.setAttribute('id', 'dolarChart');
    box.appendChild(dolarChart);
  }
  else {
    box.removeChild(chartThree);
    const dolarChart = document.createElement("canvas");
    dolarChart.setAttribute('id', 'dolarChart');
    box.appendChild(dolarChart);
  }
  new Chart("dolarChart", {
    type: "line",
    data: {
      labels: dateLabel,
      datasets: [{
        label: 'Salario ajustado x inflacion (USD)',
        fill: { target: 'origin', above: negColour },
        backgroundColor: negBackgroundColour,
        borderColor: negBackgroundColour,
        data: dolarizedInflationAdjustedSalary,
        tension: '0.5',
        pointRadius: '0'
      }, {
        label: 'Salario (USD)',
        fill: { target: 'origin', above: posColour },
        backgroundColor: posBackgroundColour,
        borderColor: posBackgroundColour,
        data: dolarizedSalary,
        tension: '0.5',
        pointRadius: '0',
      }]
    },
    options: {
      plugins: {
        title: {
          display: true,
          text: 'Evolucion salarial vs "inflación" (USD)',
        },
      },
      maintainAspectRatio: false,
      scales: {
        y: {  
          beginAtZero:false
        }
      },
    }
  });

  let invertedAdjustedLosses = finalAdjustedLosses.map(value => value * (-1));
  const chartTwo = document.querySelector("#adjustedChart");
  if (chartTwo == null) {
    const adjustedChart = document.createElement("canvas");
    adjustedChart.setAttribute('id', 'adjustedChart');
    box.appendChild(adjustedChart);
  }
  else {
    box.removeChild(chartTwo);
    const adjustedChart = document.createElement("canvas");
    adjustedChart.setAttribute('id', 'adjustedChart');
    box.appendChild(adjustedChart);
  }
  new Chart("adjustedChart", {
    type: "line",
    data: {
      labels: dateLabel,
      datasets: [{
          label: 'Perdidas/Ganancias',
          backgroundColor: negBackgroundColour,
          borderColor: negBackgroundColour,
          fill: { target: 'origin', above: posColour, below: negColour },
          data: invertedAdjustedLosses,
          tension: '0.5',
          pointRadius: '0',
        }]
    },
    options: {
      title: {
        display: true,
        text: 'Ganancias/Perdidas ajustadas por inflación (ARS)'
      },
      maintainAspectRatio: false,
      plugins: {
        title: {
          display: true,
          text: 'Ganancias/Perdidas ajustadas por inflación'
        },
        legend: {
            display: false,
        }
    },
    scales: {
      y: {  
         beginAtZero: true
         }
      },
    }
  });
}
