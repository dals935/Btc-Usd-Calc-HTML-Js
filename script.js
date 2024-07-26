const API_URL = "https://api.coindesk.com/v1/bpi/currentprice.json";

document.addEventListener("DOMContentLoaded", async () => {
  const main = document.getElementById("main");
  const bitcoinPriceElement = document.getElementById("bitcoinPrice");
  const bitcoinAmountInput = document.getElementById("bitcoinAmount");
  const calculateBtn = document.getElementById("calculateBtn");
  const usdAmountElement = document.getElementById("usdAmount");

  let bitcoinPrice = localStorage.getItem("lastBitcoinPrice");

  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    bitcoinPrice = data.bpi.USD.rate_float.toFixed(2);
    localStorage.setItem("lastBitcoinPrice", bitcoinPrice);

    bitcoinPriceElement.textContent = bitcoinPrice;
    // Set the text content of bitcoinPriceElement to the current bitcoinPrice
  } catch {
    if (bitcoinPrice) {
      // If there's an existing bitcoinPrice in localStorage...
      bitcoinPriceElement.textContent = bitcoinPrice;
      // ...display whatever is saved localStorage
    } else {
      main.innerHTML = "<p>Could not fetch Bitcoin price :(</p>";
      return;
    }
  }

  console.log(bitcoinPrice);

  let bitcoinAmount = localStorage.getItem("bitcoinAmount");

  const calculateUSDAmount = () => {
    bitcoinAmount = bitcoinAmountInput.value || 0;
    // bitcoinAmount will be reassigned to whatever is in the input on the front end, otherwise it's default value will be zero

    const usdAmount = bitcoinAmount * bitcoinPrice;
    // Say you have 2 Bitcoins and the price is 60000.
    // 2 * 60000 = 120000

    usdAmountElement.innerHTML = `<b>$${usdAmount.toFixed(
      2
    )} USD</b> worth of Bitcoin.`;
    // Round it to the nearest 2 decimals and display it
  };

  if (bitcoinAmount) {
    bitcoinAmountInput.value = bitcoinAmount;
    // Set the input's value to bitcoinAmount

    calculateUSDAmount();
    // Calculate and update the front-end
  }

  calculateBtn.addEventListener("click", () => {
    localStorage.setItem("bitcoinAmount", bitcoinAmountInput.value);
    // Save the input value to localStorage
  
    calculateUSDAmount();
    // Calculate and update the front-end
  });
});