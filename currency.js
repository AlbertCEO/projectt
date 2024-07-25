var myHeaders = new Headers();
myHeaders.append("apikey", "JGEh2dIv3YgEMIoosnkWf1tdoOioZOfR");

// JGEh2dIv3YgEMIoosnkWf1tdoOioZOfR
// yI02ezw20753kccN347BWPeZ3QtStwx7

function Calc(){
  const amount = document.getElementById('amount').value
  const symbols = document.getElementById('symbols').value
  const base = document.getElementById('base').value
  const currency = document.getElementById('currency')


var requestOptions = {
  method: 'GET',
  redirect: 'follow',
  headers: myHeaders
};
// exchangerates_data/convert?to

fetch(`https://api.apilayer.com/exchangerates_data/convert?to=${symbols}&from=${base}&amount=${amount}`, requestOptions)
  .then(response => response.text())
  .then(result => JSON.parse(result))
  .then((result) => {
    console.log(result.result)
        currency.textContent = result.result

  })

}
  



const Save = async (e) => {
  const amount = document.getElementById('amount').value
  const symbols = document.getElementById('symbols').value
  const base = document.getElementById('base').value
  const currency = document.getElementById('currency').value

  if(amount == "" || symbols == "" || base == ""){
    alert('You Need To Complete All the Fields')
    return false;
  }

  var curencydetails = {
    amount: amount,
    symbols: symbols,
    base: base,
    currency: currency
  }
try {
  const res = await fetch("/sendpost", {
    method: "POST",
    headers: {
      "Content-type": "application/json"
    },
    body: JSON.stringify(curencydetails)
  })
  const data = await res.json();
  console.log(data);
  if (data) {
  Swal.fire({
    title: "Congratulations!",
    text: "You Have Saved Your Data!",
    icon: "success"
  });

  setTimeout(() => {
    // window.location.href = "http://localhost:3000/profile.html";
    window.location.href = "http://localhost:3000/loginc.html";
}, 10000)
}       
} catch (error) {
  Swal.fire({
    title: "Oops!",
    text: "Your Data was Not Saved! Kindly Retry!",
    icon: "warning"
  });

  console.log(error.message)
}

}