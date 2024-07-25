
// const btn1 = document.getElementById('btn1')


var myHeaders = new Headers();
myHeaders.append("apikey", "9u7UNWJWWBZ6BhGXAY0vnQG3KQKuXqDZ");

// okk0BrKEFmbecCklBKvKrWFT1aVWHr5u
// yI02ezw20753kccN347BWPeZ3QtStwx7



function Translate(){
let txt22 = document.getElementById('text2')
let txt2 = txt22.value;

const target = document.getElementById('tg').value
const source = document.getElementById('sc').value
const txt1 = document.getElementById('text')


let requestOptions = {
  method: 'POST',
  redirect: 'follow',
  headers: myHeaders,
  
  body: txt2,

};



fetch(`https://api.apilayer.com/language_translation/translate?target=${target}&source=${source}`, requestOptions)
  .then(response => response.text())
  .then(res =>  JSON.parse(res))
  .then ((res) => {
    console.log(res)

    txt1.textContent = res.translations[0].translation
    // txt1.innerHTML = res.translations[0].translation
  // source.textContent = res.source;
  // translate.textContent = res.timezone;

})
}



// var config = {
//     cUrl: 'https://api.countrystatecity.in/v1/countries',
//     ckey: 'NHhvOEcyWk50N2Vna3VFTE00bFp3MjFKR0ZEOUhkZlg4RTk1MlJlaA=='
// }


// var sc = document.getElementById('sc')
// var tg = document.getElementById('tg')

// function loadCountries() {
   
//     let apiEnpoint = config.cUrl

//     // citySelect.innerHTML = '<option value="">Select City</option>' // Clear existing city options

//     fetch(apiEnpoint, {headers: {"X-CSCAPI-KEY": config.ckey}})
//     .then(response => response.json())
//     .then(data => {
//         console.log(data);

//         // data.forEach(city => {
//         //     const option = document.createElement('option')
//         //     option.value = city.iso2
//         //     option.textContent = city.name 
//         //     sc.appendChild(option)
//         // })
//         // data.forEach(city => {
//         //     const option = document.createElement('option')
//         //     option.value = city.iso2
//         //     option.textContent = city.name 
//         //     tg.appendChild(option)
//         // })
//     })
// }

// window.onload = loadCountries


function yespro(){
    alert("Hello");
}

