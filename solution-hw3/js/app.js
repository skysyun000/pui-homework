const basePrice = 2.49;
let glazePrice = 0.0;
let packPrice = 1;

const glazingPrice = {
    "Keep original": 0,
    "Sugar milk": 0,
    "Vanilla milk": 0.5,
    "Double chocolate": 1.5
}

let packingPrice = {
    "1": 1,
    "3": 3,
    "6": 5,
    "12": 10
}

for (let key in glazingPrice){ //referenced stackflow: "How do I loop through or enumerate a JavaScript object?" 
    let option1 = document.createElement('option');
    option1.text = key;
    option1.value = glazingPrice[key];
    let select = document.getElementById("glazingOptions");
    select.appendChild(option1);
}

for (let key in packingPrice){
    let option2 = document.createElement('option');
    option2.text = key;
    option2.value = packingPrice[key];
    let select = document.getElementById("packingOptions");
    select.appendChild(option2);
}

function glazingChange() {
    let selectGlaze = document.querySelector('#glazingOptions');
    const priceChangeG = Number(selectGlaze.value);
    glazePrice = priceChangeG;
    updatePrice();
} 

function packingChange() {
    let selectPack = document.querySelector('#packingOptions');
    const priceChangeP = Number(selectPack.value);
    packPrice = priceChangeP;
    updatePrice();
} 

function updatePrice(){
    let updatedPrice = (basePrice + glazePrice) * packPrice;
    let costElement = document.querySelector('.detail-cost');
    costElement.innerText = "$"+ updatedPrice.toFixed(2); //toFixed(2) was also searched up, it is for rounding off the trailing 0s
}
