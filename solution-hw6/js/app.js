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
//hw6
let cart = [];

function updateCart(){
    let glazingSel = document.querySelector('#glazingOptions');
    let packSel = document.querySelector('#packingOptions');
    let rollGlazing = glazingSel.options[glazingSel.selectedIndex].text;
    let packSize = packSel.options[packSel.selectedIndex].text;
    cart.push(new Roll(rollType, rollGlazing, packSize, basePrice));
    console.log(cart);
    saveToLocalStorage();
    updateCartIcon();
}

console.log(cart);
function saveToLocalStorage() {
    const cartArray = Array.from(cart);
    const cartArrayString = JSON.stringify(cartArray);
    // console.log("cartArrayString:" + cartArrayString);
    localStorage.setItem('storedItems', cartArrayString);
}

function retrieveFromLocalStorage() {
    const cartArrayString = localStorage.getItem('storedItems');
    const cartArray = JSON.parse(cartArrayString);
    for (const item of cartArray){
        cart.push(item);
    }
    updateCartIcon();
}

if (localStorage.getItem('storedItems') != null) {
    retrieveFromLocalStorage();
}

function updateCartIcon(){
    let itemNumber = document.querySelector('#oval');
    itemNumber.innerText = cart.length;
}




//hw3
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

//hw-4
const queryString = window.location.search;
const params = new URLSearchParams(queryString);
const rollType = params.get('roll');

//changing image
const rollImage = document.querySelector('.detail-image');
const imageFile = rolls[rollType]["imageFile"];
rollImage.src = './assets/products/' + imageFile;

//changing header
let detailHeader = document.querySelector('#item-name');
detailHeader.innerText = rollType + ' cinnamon roll';

//changing base price
let basePrice = rolls[rollType]["basePrice"];
let costElement = document.querySelector('.detail-cost');
costElement.innerText = "$"+ basePrice;


class Roll {
    constructor(rollType, rollGlazing, packSize, basePrice) {
        this.type = rollType;
        this.glazing = rollGlazing;
        this.size = packSize;
        this.basePrice = basePrice;
    }
}

//hw6
const btnCart = document.querySelector('.add-to-cart');
btnCart.onclick = updateCart;
