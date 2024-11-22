const apiUrl = "https://v6.exchangerate-api.com/v6/68162ae812512044efa38973/latest/RUB";
let exchangeRates = {};
let selectedCurrency1 = "RUB"; 
let selectedCurrency2 = "USD";
let isUserTyping = "input1"; 

const showError = (message) => {
  const errorElement = document.querySelector(".error-message");
  if (errorElement) {
    errorElement.textContent = message;
    errorElement.style.display = "block";
  }
};
  function fetchExchangeRates() {
    return fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        if (data.result === "success") {
          exchangeRates = data.conversion_rates;
          console.log(exchangeRates);
          initializeConversion();
        } else {
          showError("API xətası: " + data.error);
        }
      })
      .catch(error => {
        showError("API xətası: Çevirmə məlumatları alınmadı.");
        console.error(error);
      });}
let savedInput1Value = null; 
let savedInput2Value = null;
    function internetConnection() {
      if (navigator.onLine) {
        console.log("Bağlantı var.");
        showError("");
        fetchExchangeRates();
        if (isUserTyping === "input1" && savedInput1Value !== null) {
          document.querySelector(".input1").value = savedInput1Value;
          updateInput1();
        } else if (isUserTyping === "input2" && savedInput2Value !== null) {
          document.querySelector(".input2").value = savedInput2Value;
        }
      } else {
        showError("Bağlantı xətası: İnternet bağlantınızı yoxlayın.");
      }
    }
window.addEventListener("online", () => {internetConnection();});
window.addEventListener("offline", () => {internetConnection();});
internetConnection();
      function rubToTarget(amount, fromCurrency, toCurrency, isUserTyping) {
        if (!navigator.onLine) { 
         showError("İnternet bağlantısı yoxdur. Çevirmə edə bilməzsiniz.");
        const input1Element = document.querySelector(".input1");
        const input2Element = document.querySelector(".input2");
        if (fromCurrency === toCurrency) {
          if (isUserTyping === "input1") {
            input2Element.value = input1Element.value;
            return input1Element.value;
          } else if (isUserTyping === "input2") {
            input1Element.value = input2Element.value;
            return input2Element.value;
          }
        } else {
          showError("Fərqli valyuta seçildiyi üçün konvertasiya mümkün deyil.");
          return null;
        }
      }
      if (fromCurrency === toCurrency) {
        return parseFloat(amount).toFixed(5);
      }
  const fromRate = exchangeRates[fromCurrency];
  const toRate = exchangeRates[toCurrency];
      if (!fromRate || !toRate) {
        console.error("Döviz tapilmadi:", fromCurrency, toCurrency);
        return null;
      }
      const result = (amount / fromRate) * toRate;
      return result.toFixed(5);
    }      
 function internetConnection() {
   if (navigator.onLine) {
     console.log("Bağlantı var.");
     showError("");
     fetchExchangeRates();
      if (isUserTyping === "input1" && savedInput1Value !== null) {
       document.querySelector(".input1").value = savedInput1Value;
       updateInput1(); 
     } else if (isUserTyping === "input2" && savedInput2Value !== null) {
       document.querySelector(".input2").value = savedInput2Value;
       updateInput2(); 
     }
   } else {
     showError("Bağlantı xətası: İnternet bağlantınızı yoxlayın.");
   }
 }     
          function initializeConversion() {
  const input1Element = document.querySelector(".input1");
  const input2Element = document.querySelector(".input2");
  if (savedInput1Value === null) {
    input1Element.value = 1; 
  } else {
    input1Element.value = savedInput1Value;
  }
  if (isUserTyping === "input1") {
    const result = rubToTarget(input1Element.value, selectedCurrency1, selectedCurrency2);
    if (result !== null) {
      input2Element.value = result;
    }
  } else if (isUserTyping === "input2") {
    const inverseResult = rubToTarget(input2Element.value, selectedCurrency2, selectedCurrency1);
    if (inverseResult !== null) {
      input1Element.value = inverseResult;
    }
  }
  updateConversionInfo(selectedCurrency1, selectedCurrency2);
}
    function updateConversionInfo(fromCurrency, toCurrency) {
      const fromRate = exchangeRates[fromCurrency];
      const toRate = exchangeRates[toCurrency];
      if (!navigator.onLine) {
        if (fromCurrency === toCurrency) {
          document.querySelector(".conversion-info1").textContent = `1 ${fromCurrency} = 1 ${toCurrency}`;
          document.querySelector(".conversion-info2").textContent = `1 ${toCurrency} = 1 ${fromCurrency}`;
        } else {
          document.querySelector(".conversion-info1").textContent =` Çevrilə bilmir, internet bağlantısı yoxdur`;
          document.querySelector(".conversion-info2").textContent = `Çevrilə bilmir, internet bağlantısı yoxdur`;
        }
      } else {
        if (fromCurrency !== toCurrency) {
          const conversionRate = toRate / fromRate;
          const inverseRate = fromRate / toRate;
          document.querySelector(".conversion-info1").textContent = `1 ${fromCurrency} = ${conversionRate.toFixed(5)} ${toCurrency}`;
          document.querySelector(".conversion-info2").textContent = `1 ${toCurrency} = ${inverseRate.toFixed(5)} ${fromCurrency}`;
        } else {
          document.querySelector(".conversion-info1").textContent = `1 ${fromCurrency} = 1 ${toCurrency}`;
          document.querySelector(".conversion-info2").textContent = `1 ${toCurrency} = 1 ${fromCurrency}`;
        }
      }
            }
window.addEventListener("online", () =>{updateConversionInfo(selectedCurrency1, selectedCurrency2);});
window.addEventListener("offline", () =>{updateConversionInfo(selectedCurrency1, selectedCurrency2);});
    function updateInput1(){
          isUserTyping = "input1";
          let input1Value = document.querySelector(".input1").value.replace(',', '.');
          if (isNaN(input1Value) || input1Value.includes(' ')) {
            document.querySelector(".input2").value = '';
            return;
          }
          savedInput1Value = input1Value;
          const result = rubToTarget(input1Value, selectedCurrency1, selectedCurrency2);
          if (result !== null) {
            document.querySelector(".input2").value = result;
            updateConversionInfo(selectedCurrency1, selectedCurrency2);
          }
    };
    function updateInput2() {
      isUserTyping = "input2"; 
      let input2Value = document.querySelector(".input2").value.replace(',', '.');
      if (isNaN(input2Value) || input2Value.trim() === '') {
        document.querySelector(".input1").value = '';
        return;
      }
      savedInput2Value = input2Value;
        const inverseResult = rubToTarget(parseFloat(input2Value), selectedCurrency2, selectedCurrency1);
        if (inverseResult !== null) {
          document.querySelector(".input1").value = inverseResult;
          updateConversionInfo(selectedCurrency2, selectedCurrency1);
          }
        }
        document.querySelector(".input1").addEventListener("input", (event) => {
          isUserTyping = "input1";
          validateInput(event); 
          updateInput1();
      });
      document.querySelector(".input2").addEventListener("input", (event) => {
        isUserTyping = "input2";
        validateInput(event); 
        updateInput2();
    });
const bodyDiv1Divs = document.querySelectorAll('.body-div1 div');
const bodyDiv2Divs = document.querySelectorAll('.body-div2 div');
    bodyDiv1Divs.forEach(div => {
      div.addEventListener("click", () => {
        selectedCurrency1 = div.textContent.trim();
        selection();
        backgroundColor(bodyDiv1Divs, div);
      });
    });
    bodyDiv2Divs.forEach(div => {
      div.addEventListener("click", () => {
        selectedCurrency2 = div.textContent.trim();
        selection();
        backgroundColor(bodyDiv2Divs, div);
      });
    });
function selection(){
  if (isUserTyping === "input1") {
    updateInput1();
  } else if (isUserTyping === "input2") {
    updateInput2();
  }
};
      function backgroundColor(divGroup, selectedDiv){
            divGroup.forEach(div => {
              div.style.backgroundColor = 'white'; 
              div.style.color = 'grey'; 
            });
            selectedDiv.style.backgroundColor = 'blueviolet'; 
            selectedDiv.style.color = 'white'; 
      };
      function validateInput(event) {
          let inputValue = event.target.value;
          const regex = /^0*([0-9]*)([,.][0-9]{0,5})?$/;
          if (regex.test(inputValue)) {
            inputValue = inputValue.replace(/^0+(?=\d)/, "");
            if (inputValue.startsWith(".")||inputValue.startsWith(",")) {
              inputValue = "0" + inputValue;
            }
          } else {
            inputValue = inputValue.slice(0, -1);
          }
              if (inputValue.length > 15) {
                inputValue = inputValue.slice(0, 15); 
              }
              inputValue = inputValue.replace(',', '.');
              if (inputValue.length === 15 && (event.data === '.' || event.data === ',')) {
                inputValue = inputValue.slice(0, -1); 
              }
          event.target.value = inputValue;
        }
  document.querySelector(".input1").addEventListener("input", (event) => {
    isUserTyping = "input1"; 
    validateInput(event);
    updateInput1();
  });
  document.querySelector(".input2").addEventListener("input", (event) => {
    isUserTyping = "input2"; 
    validateInput(event); 
    updateInput2();
  });
let burger=document.querySelector(".burger");
let headerBtn=document.querySelector(".header-button");
burger.addEventListener("click",()=>{
  headerBtn.classList.toggle("burgerclass");
})