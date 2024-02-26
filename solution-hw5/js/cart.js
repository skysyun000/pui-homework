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
        console.log(typeof(glazingPrice[this.glazing]));
        console.log(this.calculatedPrice);

    }
}


const cartPageCart = new Set();


//add roll objects to the set
function addNewCartItem(rollType, rollGlazing, packSize, rollPrice) {
    const cartItem = new Roll(rollType, rollGlazing, packSize, rollPrice);
    cartPageCart.add(cartItem);
  
    return cartItem;
}

//changing the DOM
function createElement(cartItem) {
    const template = document.querySelector('#cart-template');
    const clone = template.content.cloneNode(true);
    
    cartItem.element = clone.querySelector('.cart-item');

    const btnRemove = cartItem.element.querySelector('.remove');
    console.log(btnRemove);
    btnRemove.addEventListener('click', () => {
        deleteItem(cartItem);
    });

    const cartListElement = document.querySelector('#cart-list');
    cartListElement.prepend(cartItem.element);
    updateElement(cartItem);
}
  
function updateElement(cartItem){
    const cartImageElement = cartItem.element.querySelector('.cart-image');
    const cartNameElement = cartItem.element.querySelector('.cart-name');
    const cartGlazeElement = cartItem.element.querySelector('.cart-glaze');
    const cartPackElement = cartItem.element.querySelector('.cart-pack');
    const cartPriceElement = cartItem.element.querySelector('.cart-price');

    cartImageElement.src = './assets/products/'+ rolls[cartItem.type]["imageFile"]
    cartNameElement.innerText = cartItem.type;
    cartGlazeElement.innerText = cartItem.glazing;
    cartPackElement.innerText = cartItem.size;
    cartPriceElement.innerText = cartItem.calculatedPrice.toFixed(2);

}


function deleteItem(cartItem) {
    cartItem.element.remove();
    cartPageCart.delete(cartItem);
}

const RollFour = addNewCartItem(
    "Apple",
    "Keep original",
    3,
    rolls["Apple"]["basePrice"]
);
const RollThree = addNewCartItem(
    "Raisin",
    "Sugar milk",
    3,
    rolls["Raisin"]["basePrice"]
);

const RollTwo = addNewCartItem(
    "Walnut",
    "Vanilla milk",
    12,
    rolls["Walnut"]["basePrice"]
);
const RollOne = addNewCartItem(
    "Original",
    "Sugar milk",
    1,
    rolls["Original"]["basePrice"]
);








for (const cartItem of cartPageCart) {
    console.log(cartItem);
    createElement(cartItem);
}
