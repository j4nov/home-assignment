// Function to create VAT calculator within the specified div element
function createVATCalculator() {
  var taxCalcDiv = document.getElementById("tax-calc");
  taxCalcDiv.style.display = "flex";
  taxCalcDiv.style.flexWrap = "wrap";
  taxCalcDiv.style.maxWidth = "880px";
  taxCalcDiv.style.margin = "auto";
  taxCalcDiv.style.border = "1px solid #CECECE";
  taxCalcDiv.style.overflow = "hidden";

  var textElements = document.querySelectorAll(
    "body *:not(script):not(style):not(link)"
  );

  var fontFamily =
    "'SEB Sans Serif', 'Trebuchet MS', Verdana, Arial, Helvetica, sans-serif";

  textElements.forEach(function (element) {
    element.style.fontFamily = fontFamily;
  });

  // Div for input, left side of calculator
  var inputDiv = document.createElement("div");
  inputDiv.style.flex = "1";
  inputDiv.style.padding = "20px";
  inputDiv.style.backgroundColor = "#F8F8F8";
  inputDiv.style.width = "65%";

  var inputHeading = document.createElement("h2");
  inputHeading.textContent = "VAT Calculator";

  var vatText = document.createElement("p");
  vatText.textContent = "EE VAT is 22%";
  vatText.style.textAlign = "left";
  vatText.style.marginBottom = "10px";
  vatText.style.fontSize = "15px";
  vatText.style.color = "#484848";

  var emptyDiv = document.createElement("div");
  emptyDiv.style.width = "100%";
  emptyDiv.style.height = "0";
  emptyDiv.style.borderTop = "1px solid #C3C3C3";
  emptyDiv.style.marginTop = "40px";
  emptyDiv.style.marginBottom = "20px";

  var inputLabel = document.createElement("label");
  inputLabel.textContent = "Enter Amount:";
  inputLabel.style.marginBottom = "4px";
  inputLabel.style.display = "block";
  inputLabel.style.fontSize = "15px";
  inputLabel.style.color = "#484848";
  inputLabel.setAttribute("for", "amount");

  // Container for input and currency
  var inputContainer = document.createElement("div");
  inputContainer.style.display = "flex";
  inputContainer.style.position = "relative";
  inputContainer.style.flexDirection = "row";
  inputContainer.style.alignItems = "center";
  inputContainer.style.marginBottom = "10px";
  inputContainer.style.borderRadius = "3px";
  inputContainer.style.width = "200px";
  inputContainer.style.height = "42px";

  var amountInput = document.createElement("input");
  amountInput.type = "text";
  amountInput.id = "amount";
  amountInput.required = true;
  amountInput.style.width = "70px";
  amountInput.style.paddingLeft = "9px";
  amountInput.style.border = "0";
  amountInput.style.width = "100%";
  amountInput.style.height = "42px";
  amountInput.style.border = "1px solid #C3C3C3";
  amountInput.style.borderRadius = "3px";
  amountInput.value = "1200";
  amountInput.setAttribute("maxlength", "6");
  amountInput.setAttribute("autocomplete", "off");

  // Event listener to validate input
  amountInput.addEventListener("input", function () {
    this.value = this.value.replace(/\D/g, "");
    if (!this.validity.valid) {
      this.style.borderBottom = "4px solid red";
      this.style.height = "38px";
      document.querySelector("#result p").style.display = "none";
    } else {
      this.style.border = "1px solid #C3C3C3";
      document.querySelector("#result p").style.display = "block";
    }
    calculateVAT();
  });

  // Event listener for hover effect
  amountInput.addEventListener("mouseenter", function () {
    if (!this.validity.valid) {
      this.style.borderTop = "1px solid #41B0EE";
      this.style.borderRight = "1px solid #41B0EE";
      this.style.borderLeft = "1px solid #41B0EE";
      this.style.borderBottom = "4px solid red";
    } else {
      this.style.border = "1px solid #41B0EE";
    }
  });

  amountInput.addEventListener("mouseleave", function () {
    if (!this.validity.valid) {
      this.style.borderTop = "1px solid #C3C3C3";
      this.style.borderRight = "1px solid #C3C3C3";
      this.style.borderLeft = "1px solid #C3C3C3";
      this.style.borderBottom = "4px solid red";
    } else {
      this.style.border = "1px solid #C3C3C3";
    }
  });

  // Currency inside input
  var currencySpan = document.createElement("span");
  currencySpan.textContent = "EUR";
  currencySpan.style.fontWeight = "bold";
  currencySpan.style.color = "black";
  currencySpan.style.position = "absolute";
  currencySpan.style.right = "5%";
  currencySpan.style.fontSize = "14px";
  currencySpan.style.color = "#555";

  inputContainer.appendChild(amountInput);
  inputContainer.appendChild(currencySpan);

  // Div for result, right side of calculator
  var resultDiv = document.createElement("div");
  resultDiv.id = "result";
  resultDiv.style.display = "flex";
  resultDiv.style.flexDirection = "column";
  resultDiv.style.justifyContent = "center";
  resultDiv.style.width = "35%";
  resultDiv.style.padding = "15px";

  var resultParagraph = document.createElement("p");
  resultParagraph.textContent = "Sum with EE VAT";
  resultParagraph.style.margin = "0";
  resultParagraph.style.fontSize = "15px";
  resultParagraph.style.color = "#505050";
  resultParagraph.style.display = "none";

  // Append the elements to resultDiv
  resultDiv.appendChild(document.createElement("span"));
  resultDiv.appendChild(resultParagraph);

  // Append input and result divs to taxCalcDiv
  taxCalcDiv.appendChild(inputDiv);
  taxCalcDiv.appendChild(resultDiv);

  // Add event listener for window resize
  window.addEventListener("resize", function () {
    if (window.innerWidth < 768) {
      inputDiv.style.width = "100%";
      resultDiv.style.width = "100%";
      resultDiv.style.padding = "40px 10px 40px 10px";
    } else {
      inputDiv.style.width = "65%";
      resultDiv.style.width = "35%";
    }
  });

  var form = document.createElement("form");
  form.id = "vat-form";
  form.appendChild(inputHeading);
  form.appendChild(vatText);
  form.appendChild(emptyDiv);
  form.appendChild(inputLabel);
  form.appendChild(inputContainer);

  inputDiv.appendChild(form);
}

// Function to calculate VAT
function calculateVAT() {
  var amountInput = document.getElementById("amount");
  var amount = parseFloat(amountInput.value);
  var resultSpan = document.querySelector("#result span");
  var resultParagraph = document.querySelector("#result p");

  resultSpan.style.fontSize = "32px";
  resultSpan.style.fontWeight = "600";

  if (!isNaN(amount)) {
    var vatAmount = (amount * 1.22).toFixed(2);
    // Add commas to format the number with gaps between each three numbers
    var formattedAmount = vatAmount.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    resultSpan.textContent = formattedAmount + " EUR";
    resultParagraph.style.display = "block";
  } else {
    resultSpan.textContent = "Please enter a valid amount";
    resultSpan.style.fontSize = "24px";
    resultParagraph.style.display = "none";
  }
}

// Call the function to create the VAT calculator when the window is loaded
window.addEventListener("load", function () {
  createVATCalculator();
  calculateVAT();
});
