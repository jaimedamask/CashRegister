const cash = document.getElementById('cash');
const purchaseBtn = document.getElementById('purchase-btn');
const changeDue = document.getElementById('change-due');
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

let price = 1.87;
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

const checkCashRegister = () => {
  if (Number(cash.value) < price) {
    alert('Customer does not have enough money to purchase the item');
    cash.value = '';
    return;
  }

  if (Number(cash.value) === price) {
    changeDue.innerHTML = '<p>No change due - customer paid with exact cash</p>';
    cash.value = '';
    return;
  }

  let change = cash.value - price;
  let cidTotal = 0;
  let result = { status: 'OPEN', change: [] };

  for (let el of cid) {
    cidTotal += el[1];
  }

  console.log(cidTotal);

  if (change > cidTotal) {
    return (changeDue.innerHTML = '<p>Status: INSUFFICIENT_FUNDS</p>');
  } else if (change === cidTotal) {
    return result.status = 'CLOSED';
  } else {
    let changeArr = [];
    let cidReversed = cid.reverse();

    for (let el of cidReversed) {
      let currentDenom = [el[0], 0];

      while (change >= denominations[el[0]] && el[1] > 0) {
        change -= denominations[el[0]];
        el[1] -= denominations[el[0]];
        currentDenom[1] += denominations[el[0]];
      }

      if (currentDenom[1] > 0) {
        result.change.push(currentDenom);
        console.log(result);
      }
    }

    if (change > 0) {
      return (changeDue.innerHTML = '<p>Status: INSUFFICIENT_FUNDS</p>');
    }

    console.log(result);
  }
};

purchaseBtn.addEventListener('click', checkCashRegister);