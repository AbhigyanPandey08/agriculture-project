let cartItems = 0;
let corianderSeeds = 0;

const itemsCount = document.querySelector("#itemsCount");
const addtocartCorianderBtn = document.querySelector("#addtocartCorianderBtn");
const addingCoriander = document.querySelector("#quantity");
const corianderCount = document.querySelector("#corianderCount");

// Common function to update the cart display
function updateCartDisplay() {
    itemsCount.innerText = cartItems;
    corianderCount.innerText = corianderSeeds;
}

// Add to cart button for coriander seeds
addtocartCorianderBtn.addEventListener("click", () => {
    console.log("Coriander Seeds were added to the cart");
    corianderSeeds = 1; // Set initial coriander count to 1 when added to the cart
    cartItems += 1;

    addtocartCorianderBtn.style.visibility = "hidden";
    addingCoriander.style.visibility = "visible";

    updateCartDisplay();
});

// Increment coriander seeds
document.querySelector(".add").addEventListener("click", () => {
    corianderSeeds += 1;
    cartItems += 1;

    updateCartDisplay();
});

// Decrement coriander seeds
document.querySelector(".minus").addEventListener("click", () => {
    if (corianderSeeds > 0) {
        corianderSeeds -= 1;
        cartItems -= 1;
    }

    // Hide coriander controls if no coriander seeds left
    if (corianderSeeds === 0) {
        addtocartCorianderBtn.style.visibility = "visible";
        addingCoriander.style.visibility = "hidden";
    }

    updateCartDisplay();
});
const bottleGourd = document.querySelector("#bottleGourd");
bottleGourd.addEventListener("click", ()=> {
    console.log("Bottle Gourd Seeds were added");
    cartItems ++;
    itemsCount.innerText = cartItems;
});
const fruitPlucker = document.querySelector("#fruitPlucker");
fruitPlucker.addEventListener("click", ()=> {
    console.log("Fruit Plucker was added");
    cartItems ++;
    itemsCount.innerText = cartItems;
});
const organicManure = document.querySelector("#organicManure");
organicManure.addEventListener("click", ()=> {
    console.log("Organic Manure was added");
    cartItems ++;
    itemsCount.innerText = cartItems;
});
const biovita = document.querySelector("#biovita");
biovita.addEventListener("click", ()=> {
    console.log("Biovita was added");
    cartItems ++;
    itemsCount.innerText = cartItems;
});
const tomato = document.querySelector("#tomato");
tomato.addEventListener("click", ()=> {
    console.log("Tomato seeds were added");
    cartItems ++;
    itemsCount.innerText = cartItems;
});
const chilli = document.querySelector("#chilli");
chilli.addEventListener("click", ()=> {
    console.log("Chilli seeds were added");
    cartItems ++;
    itemsCount.innerText = cartItems;
});
const soil = document.querySelector("#soil");
soil.addEventListener("click", ()=> {
    console.log("Soil Enhancer was added");
    cartItems ++;
    itemsCount.innerText = cartItems;
});

