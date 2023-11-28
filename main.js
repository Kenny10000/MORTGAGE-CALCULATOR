const loanAmountInput = document.querySelector(".loan-amount");
const interestRateInput = document.querySelector(".interest-rate");
const loanTenureInput = document.querySelector(".loan-tenure");

const loanEMIValue = document.querySelector(".loan-emi .value");
const totalInterestValue = document.querySelector(".total-interest .value");
const totalAmountValue = document.querySelector(".total-amount .value");

const calculateBtn = document.querySelector(".calculate-btn");

let loanAmount = parseFloat(loanAmountInput.value);
let interestRate = parseFloat(interestRateInput.value);
let loanTenure = parseFloat(loanTenureInput.value);

let interest = interestRate / 12 / 100;
let myChart;


const displayChart = (totalInterestPayableValue) => { 
const ctx = document.getElementById('myChart').getContext("2d");
 myChart = new Chart(ctx, { 
  type: 'pie',
  data: {
    labels: ["Total Interest", "Principal Loan Amount"],
    datasets: [{   
      label: '$',
      data: [totalInterestPayableValue, loanAmount],
      backgroundColor:["#e63946", "#14213d"],
      borderWidth: 1
    },
   ],
},
});
};

const updateChart = (totalInterestPayableValue) =>{
myChart.data.datasets[0].data[0] = totalInterestPayableValue;
myChart.data.datasets[0].data[1] = loanAmount; 
myChart.update();
};

const calculateEMI = () =>{
    let emi = 
    loanAmount * interest * 
    (Math.pow(1 + interest, loanTenure) /
     (Math.pow(1 + interest, loanTenure) - 1));

     return emi;
};

const updateData = (emi) => {
    loanEMIValue.innerHTML = Math.round(emi);

    let totalAmount = Math.round(loanTenure * emi);
    totalAmountValue.innerHTML = totalAmount;

    let totalInterestPayable = Math.round(totalAmount - loanAmount);
    totalInterestValue.innerHTML = totalInterestPayable;

    if (myChart){
        updateChart(totalInterestPayable);
    }else{
    displayChart(totalInterestPayable); 
}
};

const refreshInputValues = () => {
    loanAmount = parseFloat(loanAmountInput.value);
    interestRate = parseFloat(interestRateInput.value);
    loanTenure = parseFloat(loanTenureInput.value);
    interest = interestRate / 12 / 100;
    };

const init = () => {
    refreshInputValues();
    let emi = calculateEMI();
    updateData(emi);
}

init();

calculateBtn.addEventListener("click", init);




// let = setInterval(myTimer ,1000);
// function myTimer() { 
//   const d = new Date(); 
//   document.getElementById("demo").innerHTML = d.toLocaleTimeString();
// }

   