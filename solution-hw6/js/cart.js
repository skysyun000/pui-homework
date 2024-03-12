let glazePrice = 0.0;
let packPrice = 1;

let glazingPrice = {
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

//create the roll "cookie cutters"
class Roll {

    constructor(rollType, rollGlazing, packSize, rollPrice) {
        this.type = rollType;
        this.glazing =  rollGlazing;
        this.size = packSize;
        this.basePrice = rollPrice;

        this.calculatedPrice = (this.basePrice + glazingPrice[this.glazing])*packingPrice[this.size];
    }
}


const cartPageCart = new Set();


//add roll objects to the set
function addNewCartItem(rollType, rollGlazing, packSize, rollPrice) {
    const cartItem = new Roll(rollType, rollGlazing, packSize, rollPrice);
    cartPageCart.add(cartItem);
  
    return cartItem;
}

function updateCartTotal(){
    let finalTotal = 0;
    cartPageCart.forEach(cartItem =>{
        finalTotal += parseFloat(cartItem.calculatedPrice);
    });
    document.querySelector("#final-total").textContent = "$ "+ finalTotal.toFixed(2);
}

//changing the DOM
function createElement(cartItem) {
    const template = document.querySelector('#cart-template');
    const clone = template.content.cloneNode(true);
    
    cartItem.element = clone.querySelector('.cart-item');

    const btnRemove = cartItem.element.querySelector('.remove');
    btnRemove.addEventListener('click', () => {
        deleteItem(cartItem);
        updateCartTotal();
        saveToLocalStorage();
        updateCartIcon();
    });

    const cartListElement = document.querySelector('#cart-list');
    cartListElement.prepend(cartItem.element);
    updateElement(cartItem);
    updateCartTotal();
}
  
function updateElement(cartItem){
    const cartImageElement = cartItem.element.querySelector('.cart-image');
    const cartNameElement = cartItem.element.querySelector('.cart-name');
    const cartGlazeElement = cartItem.element.querySelector('.cart-glaze');
    const cartPackElement = cartItem.element.querySelector('.cart-pack');
    const cartPriceElement = cartItem.element.querySelector('#cart-price');

    cartImageElement.src = './assets/products/'+ rolls[cartItem.type]["imageFile"]
    cartNameElement.innerText = cartItem.type + " Cinnamon Roll";
    cartGlazeElement.innerText = "Glazing: " + cartItem.glazing;
    cartPackElement.innerText = "Pack Size: "+ cartItem.size;
    cartPriceElement.innerText = "$ "+ cartItem.calculatedPrice.toFixed(2);
}

function deleteItem(cartItem) {
    cartItem.element.remove();
    cartPageCart.delete(cartItem);
    localStorage.removeItem('storedItems');
}

for (const cartItem of cartPageCart) {
    createElement(cartItem);
}


//hw-6
function retrieveFromLocalStorage() {
    const cartArrayString = localStorage.getItem('storedItems');
    const cartArray = JSON.parse(cartArrayString);
    for (const cartData of cartArray) {
        const cartItem = addNewCartItem(cartData["type"], cartData["glazing"], 
            cartData["size"], cartData["basePrice"]);
        createElement(cartItem);
    }
    updateCartTotal();
    updateCartIcon();
}

if (localStorage.getItem('storedItems') != null) {
    retrieveFromLocalStorage();
    
} else {
    let cart = [];
}

function saveToLocalStorage() {
    const cartArray = Array.from(cartPageCart);
    const cartArrayString = JSON.stringify(cartArray);
    console.log(cartPageCart);
    localStorage.setItem('storedItems', cartArrayString);
}

function updateCartIcon(){
    let itemNumber = document.querySelector('#oval');
    itemNumber.innerText = cartPageCart.size;
}
console.log(cartPageCart);