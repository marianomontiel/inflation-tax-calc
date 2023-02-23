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
  { Mes: 1, Año: 2023, Index: 6.0 }
];
const minimumWage = [
  { Mes: 01, Año: 2017, Sueldo: 8060 },
  { Mes: 02, Año: 2017, Sueldo: 8060 },
  { Mes: 03, Año: 2017, Sueldo: 8060 },
  { Mes: 04, Año: 2017, Sueldo: 8060 },
  { Mes: 05, Año: 2017, Sueldo: 8060 },
  { Mes: 06, Año: 2017, Sueldo: 8860 },
  { Mes: 07, Año: 2017, Sueldo: 8860 },
  { Mes: 08, Año: 2017, Sueldo: 8860 },
  { Mes: 09, Año: 2017, Sueldo: 8860 },
  { Mes: 10, Año: 2017, Sueldo: 8860 },
  { Mes: 11, Año: 2017, Sueldo: 8860 },
  { Mes: 12, Año: 2017, Sueldo: 9500 },
  { Mes: 01, Año: 2018, Sueldo: 9500 },
  { Mes: 02, Año: 2018, Sueldo: 9500 },
  { Mes: 03, Año: 2018, Sueldo: 9500 },
  { Mes: 04, Año: 2018, Sueldo: 9500 },
  { Mes: 05, Año: 2018, Sueldo: 9500 },
  { Mes: 06, Año: 2018, Sueldo: 10000 },
  { Mes: 07, Año: 2018, Sueldo: 10000 },
  { Mes: 08, Año: 2018, Sueldo: 10700 },
  { Mes: 09, Año: 2018, Sueldo: 10700 },
  { Mes: 10, Año: 2018, Sueldo: 10700 },
  { Mes: 11, Año: 2018, Sueldo: 11300 },
  { Mes: 12, Año: 2018, Sueldo: 11300 },
  { Mes: 01, Año: 2019, Sueldo: 11300 },
  { Mes: 02, Año: 2019, Sueldo: 12500 },
  { Mes: 03, Año: 2019, Sueldo: 12500 },
  { Mes: 04, Año: 2019, Sueldo: 12500 },
  { Mes: 05, Año: 2019, Sueldo: 12500 },
  { Mes: 06, Año: 2019, Sueldo: 12500 },
  { Mes: 07, Año: 2019, Sueldo: 14125 },
  { Mes: 08, Año: 2019, Sueldo: 15625 },
  { Mes: 09, Año: 2019, Sueldo: 16875 },
  { Mes: 10, Año: 2019, Sueldo: 16875 },
  { Mes: 11, Año: 2019, Sueldo: 16875 },
  { Mes: 12, Año: 2019, Sueldo: 16875 },
  { Mes: 01, Año: 2020, Sueldo: 16875 },
  { Mes: 02, Año: 2020, Sueldo: 16875 },
  { Mes: 03, Año: 2020, Sueldo: 16875 },
  { Mes: 04, Año: 2020, Sueldo: 16875 },
  { Mes: 05, Año: 2020, Sueldo: 16875 },
  { Mes: 06, Año: 2020, Sueldo: 16875 },
  { Mes: 07, Año: 2020, Sueldo: 16875 },
  { Mes: 08, Año: 2020, Sueldo: 16875 },
  { Mes: 09, Año: 2020, Sueldo: 18900 },
  { Mes: 10, Año: 2020, Sueldo: 18900 },
  { Mes: 11, Año: 2020, Sueldo: 20587.5 },
  { Mes: 12, Año: 2020, Sueldo: 20587.5 },
  { Mes: 01, Año: 2021, Sueldo: 20587.5 },
  { Mes: 02, Año: 2021, Sueldo: 21600 },
  { Mes: 03, Año: 2021, Sueldo: 23544 },
  { Mes: 04, Año: 2021, Sueldo: 24408 },
  { Mes: 05, Año: 2021, Sueldo: 25272 },
  { Mes: 06, Año: 2021, Sueldo: 27216 },
  { Mes: 07, Año: 2021, Sueldo: 28080 },
  { Mes: 08, Año: 2021, Sueldo: 31104 },
  { Mes: 09, Año: 2021, Sueldo: 32000 },
  { Mes: 10, Año: 2021, Sueldo: 32000 },
  { Mes: 11, Año: 2021, Sueldo: 32000 },
  { Mes: 12, Año: 2021, Sueldo: 32000 },
  { Mes: 01, Año: 2022, Sueldo: 33000 },
  { Mes: 02, Año: 2022, Sueldo: 33000 },
  { Mes: 03, Año: 2022, Sueldo: 38940 },
  { Mes: 04, Año: 2022, Sueldo: 38940 },
  { Mes: 05, Año: 2022, Sueldo: 45540 },
  { Mes: 06, Año: 2022, Sueldo: 45540 },
  { Mes: 07, Año: 2022, Sueldo: 47850 },
  { Mes: 08, Año: 2022, Sueldo: 51200 },
  { Mes: 09, Año: 2022, Sueldo: 54550 },
  { Mes: 10, Año: 2022, Sueldo: 57900 },
  { Mes: 11, Año: 2022, Sueldo: 61953 },
  { Mes: 12, Año: 2022, Sueldo: 65427 },
  { Mes: 01, Año: 2023, Sueldo: 67743 },
  { Mes: 02, Año: 2023, Sueldo: 69500 }
];
let calculation = 0;
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
  console.table(accumulatedLosses);
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
  console.table(salaryArray);
  console.table(salaryAdjusted);
  console.table(finalAdjustedLosses);

  const totalLosses = finalAdjustedLosses.reduce(
    (total, monthlylosses) => total + monthlylosses,
    0
  );

  calculation = Math.floor(totalLosses * 100) / 100;

  //output value on DOM
  const box = document.querySelector(".box");
  const output = document.querySelector(".output");
  output.setAttribute("style", "padding-top: 0px; color: black; font-size: 20px;");
  output.innerText = `Según INDEC tu salario acumula una perdida de $${calculation} respecto de la inflación en el periodo comprendido entre ${getDateName(startMonth,startYear)} y ${getDateName(endMonth, endYear)}.`;
  const twitText = `Según INDEC mi salario acumula una perdida de $${calculation} respecto de la inflación en el periodo comprendido entre ${getDateName(startMonth,startYear)} y ${getDateName(endMonth, endYear)}.`;
  box.appendChild(output);

  //set twit button settings
  tweetButton(twitText); 
  //new charts
  createSalaryChart(filterTable, salaryArray, salaryAdjusted,accumulatedLosses,finalAdjustedLosses); 
}
//Fills the entire input list with the salary values used
function fillAll(Array) {
  let inputArray = [...document.querySelectorAll("input")];
  console.log(inputArray);
  for (let i = 2; i < inputArray.length; i++) {
    if (inputArray[i].getAttribute("type") != "month") {
      inputArray[i].value = Array[i - 2];
      console.log(Array[i - 2]);
    }
  }
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
  console.table(accumulatedLosses);
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
  console.table(wageMapped);
  console.table(salaryAdjusted);
  console.table(finalAdjustedLosses);

  const totalLosses = finalAdjustedLosses.reduce(
    (total, monthlylosses) => total + monthlylosses,
    0
  );

  calculation = Math.floor(totalLosses * 100) / 100;

  //output value on DOM
  const box = document.querySelector(".box");
  const output = document.querySelector(".output");
  output.setAttribute("style", "padding-top: 0px; color: black; font-size: 20px;");
  output.innerText = `Según INDEC el Salario Minimo Vital y Movil acumula una perdida de $${calculation} respecto de la inflación en el periodo comprendido entre ${getDateName(startMonth, startYear)} y ${getDateName(endMonth, endYear)}.`;
  const twitText = output.innerText;
  box.appendChild(output);
  tweetButton(twitText);
  
  //new charts
  createSalaryChart(filterTable, wageMapped, salaryAdjusted,accumulatedLosses,finalAdjustedLosses);  
}

function tweetButton(outputInnerText) {
  const mediaButtonsDiv = document.querySelector(".social-media-buttons");
  const iframe = document.querySelector("iframe");
  if (iframe == null) {
    const twit = document.querySelector("#twitter");
    twit.setAttribute("class", "twitter-share-button");
    twit.setAttribute(
      "data-text",
      `${outputInnerText} Esto fue calculado usando el sitio web:`
    );

    let addScript = document.createElement("script");
    addScript.setAttribute("id", "tweet-script");
    addScript.setAttribute("src", "https://platform.twitter.com/widgets.js");
    document.head.appendChild(addScript);
  } else {
    mediaButtonsDiv.removeChild(iframe);
    // document.head.removeChild(addScript);
    const tweetButton = document.createElement("a");
    tweetButton.setAttribute("class", "twitter-share-button");
    tweetButton.setAttribute(
      "data-text",
      `${outputInnerText} Esto fue calculado usando el sitio web:`
    );
    tweetButton.setAttribute("href", "https://twitter.com/intent/tweet");
    tweetButton.setAttribute("data-size", "large");
    tweetButton.setAttribute("data-url", "https://impuestazo.com.ar");
    tweetButton.setAttribute("data-hashtags", "impuestazo");
    tweetButton.setAttribute("data-lang", "es");
    tweetButton.setAttribute("data-show-count", "true");
    mediaButtonsDiv.appendChild(tweetButton);

    var addScript = document.createElement("script");
    addScript.setAttribute("id", "tweet-script");
    addScript.setAttribute("src", "https://platform.twitter.com/widgets.js");
    document.head.appendChild(addScript);
  }
}

const calculateButton = document.querySelector("#calculate");
calculateButton.addEventListener("click", () => {
  calculateTax();
});

const minimumWageButton = document.querySelector("#calculate-1");
minimumWageButton.addEventListener("click", () => {
  calculateMinimumWage();
  window.scrollTo(0, document.body.scrollHeight, "smooth");
});

function createSalaryChart(dateArray,mappedSalary,inflationAdjustedSalary,accumulatedLosses,finalAdjustedLosses) {
  const chartOne = document.querySelector("#myChart");
  const box = document.querySelector('.box');
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
    element.label = element.Mes +"/"+element.Año;
  });  
  const dateLabel = dateArray.map((index) => index.label);
  
  
  new Chart("myChart", {
    type: "line",
    data: {
     labels: dateLabel,
     datasets: [{
      label: 'Salario ajustado x inflación',
      backgroundColor: "rgba(255,0,0,0.3)",
      borderColor: "rgba(255,0,0,0.6)",
      data: inflationAdjustedSalary
     }, {
      label: 'Salario',
      backgroundColor: "rgba(0,0,255,0.3)",
      borderColor: "rgba(0,0,255,0.6)",
      data: mappedSalary
     }]
    }, 
    options:{
      title: {
       display: true,
       text: 'Evolucion salarial contra inflación',
      },
      maintainAspectRatio: false
    }
  });
/*   const chartTwo = document.querySelector("#adjustedChart");
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
      label: 'Perdidas totales',
      backgroundColor: "rgba(0,0,255,0.3)",
      borderColor: "rgba(0,0,255,0.6)",
      data: accumulatedLosses
     },{
      label: 'Perdidas totales ajustadas a "valor actual"',
      backgroundColor: "rgba(255,0,0,0.3)",
      borderColor: "rgba(255,0,0,0.6)",
      data: finalAdjustedLosses
     }]
    }, 
    options:{
      title: {
       display: true,
       text: 'Perdidas totales'
      }
    }
  }); */
}