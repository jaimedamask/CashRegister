const cash = document.getElementById('cash');
const purchaseBtn = document.getElementById('purchase-btn');
const changeDue = document.getElementById('change-due');
const cidDisplay = document.getElementById('cid-display');
const priceDisplay = document.getElementById('price');
const denominations = {
	'ONE HUNDRED': 100,
	'TWENTY': 20,
	'TEN': 10,
	'FIVE': 5,
	'ONE': 1,
	'QUARTER': 0.25,
	'DIME': 0.10,
	'NICKEL': 0.05,
	'PENNY': 0.01,
};

//let price = 1.87;
let price = 3.26;
let cid = [
  ['PENNY', 1.01],
  ['NICKEL', 2.05],
  ['DIME', 3.1],
  ['QUARTER', 4.25],
  ['ONE', 90],
  ['FIVE', 55],
  ['TEN', 20],
  ['TWENTY', 60],
  ['ONE HUNDRED', 100]
];

const displayCID = () => {
  cidDisplay.innerHTML = '';

  for (let i = 0; i < cid.length; i++) {
    cidDisplay.innerHTML += `
      <p>${cid[i][0]}: ${cid[i][1]}</p>
    `
  }
};


const formatResults = (status, change) => {
  changeDue.innerHTML = `<p>Status: ${status}</p>`;
  change.forEach(el => {
    changeDue.innerHTML += `<p>${el[0]}: $${el[1]}</p>`;
  });
};

const checkCashRegister = () => {
  let cashInput = parseFloat(cash.value);

  if (cashInput < price) {
    alert('Customer does not have enough money to purchase the item');
    cash.value = '';
    return;
  }

  if (cashInput === price) {
    changeDue.innerHTML = '<p>No change due - customer paid with exact cash</p>';
    cash.value = '';
    return;
  }

  let change = cashInput - price;
  let cidTotal = 0;
  let result = { status: 'OPEN', change: [] };

  for (let el of cid) {
    cidTotal += el[1];
  }

  if (change > cidTotal) {
    return (changeDue.innerHTML = '<p>Status: INSUFFICIENT_FUNDS</p>');
  } else if (change === cidTotal) {
    return result.status = 'CLOSED';
  } else {
    let cidReversed = cid.reverse();

    for (let el of cidReversed) {
      let currentDenom = [el[0], 0];

      while (change >= denominations[el[0]] && el[1] > 0) {
        console.log(denominations[el[0]]);
        change = parseFloat((change - denominations[el[0]]).toFixed(2));
        el[1] -= denominations[el[0]];
        currentDenom[1] += denominations[el[0]];
      }

      if (currentDenom[1] > 0) {
        result.change.push(currentDenom);
      }
    }
  }

  if (change > 0) {
    return (changeDue.innerHTML = '<p>Status: INSUFFICIENT_FUNDS</p>');
  }

  formatResults(result.status, result.change);
  displayCID();
};

const checkInput = () => {
  if (!cash.value) {
    return;
  }

  checkCashRegister();
};

window.onload = displayCID;

purchaseBtn.addEventListener('click', checkInput);