//I should import a json to make script shorter
//import myJson from './example.json' assert {type: 'json'};

const salary = document.querySelector("#salary");

let startInput = document.querySelector("#start");
let endInput = document.querySelector("#end");


//assign initial values to calendar
startInput.value = `${inflationTable[inflationTable.length - 3].Año}-${String(inflationTable[inflationTable.length - 3].Mes).padStart(2,"0")}`;
endInput.value = `${inflationTable[inflationTable.length - 1].Año}-${String(inflationTable[inflationTable.length - 1].Mes).padStart(2,"0")}`;

startInput.max = `${inflationTable[inflationTable.length - 1].Año}-${String(inflationTable[inflationTable.length - 1].Mes).padStart(2,"0")}`;
endInput.max = `${inflationTable[inflationTable.length - 1].Año}-${String(inflationTable[inflationTable.length - 1].Mes).padStart(2,"0")}`;

let startMonth = parseInt(startInput.value.slice(-2));
let startYear = parseInt(startInput.value.slice(0, 4));
let endMonth = parseInt(endInput.value.slice(-2));
let endYear = parseInt(endInput.value.slice(0, 4));

//Assign month name to inputs
const startLenght = endYear * 12 + endMonth - (startYear * 12 + startMonth) + 1
monthList(startLenght);

//Check for input change in calendar and populate with new inputs
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

console.log(dolarHistorico)

  const filterTable = lastVentaValues.filter((element) => (element.month+element.year*12) >= startDate && (element.month+element.year*12) <= endDate);

  const dolarArray = filterTable.map((index) => index.lastVentaValue);
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
        legend: {
          display: true,
          onClick: (e) => e.stopPropagation()
      }
      },
      maintainAspectRatio: false,
      scales: {
        y: {  
          grace: '0%'
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
        legend: {
          display: true,
          onClick: (e) => e.stopPropagation()
      }
      },
      maintainAspectRatio: false,
      scales: {
        y: {  
          grace: '0%'
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
            onClick: (e) => e.stopPropagation()
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
