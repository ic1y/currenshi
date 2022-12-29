(async () => {
  let data;
  await fetch("https://api.exchangerate.host/latest").then(async resp => {
    if (!resp.ok) {
      console.log("Response not okay (" + resp.status + ")");
      return;
    }
    await resp.json().then(json => {
      console.log(json);
      data = json;
    }).catch(err => {
      console.log("Error occurred in the parsing of data\n" + err);
    })
  }).catch(err => {
    console.log("Error occurred in the fetching of currency data:\n" + err);
  })
  const currencyList = Object.keys(data.rates);
  const amtToConvertInp = document.getElementById("amountConverting");
  const currToConvertSelect = document.getElementById("currencyConverting");
  const resultInp = document.getElementById("result");
  const resultCurrencySelect = document.getElementById("resultCurrency");
  console.log(currencyList)
  for (const curr of currencyList) {
    const opt = document.createElement("option");
    opt.value = opt.innerText = curr;
    currToConvertSelect.appendChild(opt);
    
  }  
  for (const curr of currencyList) {
    const opt = document.createElement("option");
    opt.value = opt.innerText = curr;
    resultCurrencySelect.appendChild(opt);
  }  
  function roundTo(n, digits) {
    var negative = false;
    if (digits === undefined) {
      digits = 0;
    }
    if (n < 0) {
      negative = true;
      n = n * -1;
    }
    var multiplicator = Math.pow(10, digits);
    n = parseFloat((n * multiplicator).toFixed(11));
    n = (Math.round(n) / multiplicator).toFixed(digits);
    if (negative) {
      n = (n * -1).toFixed(digits);
    }
    return n;
  }
  function convert() {
    resultInp.value = roundTo(amtToConvertInp.value / data.rates[currToConvertSelect.value] * data.rates[resultCurrencySelect.value], 2);
  }
  amtToConvertInp.addEventListener("input", convert);
  currToConvertSelect.addEventListener("change", convert);
  resultCurrencySelect.addEventListener("change", convert);
  const swapCurrBtn = document.getElementById("swapCurrency");
  swapCurrBtn.addEventListener("click", () => {
    const prevAmt = amtToConvertInp.value;
    const prevCurr = currToConvertSelect.value;
    amtToConvertInp.value = resultInp.value;
    currToConvertSelect.value = resultCurrencySelect.value;
    resultInp.value = prevAmt;
    resultCurrencySelect.value = prevCurr;
  })
  currToConvertSelect.value = "USD";
  resultCurrencySelect.value = "EUR";
  convert();
})();
