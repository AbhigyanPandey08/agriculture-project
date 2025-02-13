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

let label = document.getElementById("label");
let Shoppingcart = document.getElementById("shopping-cart");



let basket = JSON.parse(localStorage.getItem("data")) || [];

let calculation = () =>  {
    let carticon = document.getElementById("cartAmount");
    carticon.innerHTML =basket.map((x) => x.item).reduce((x,y) => x+y,0);
}
  
calculation();

let generateCartItems = () => {
    if (basket.length !== 0) {
        return (Shoppingcart.innerHTML=basket
            .map((x)=> {
                let { id , item }=x;
                let search = shopItemData.find((y) => y.id === id) || [];
                return `
                <div class="cart-item">
                   <img width="100px" src="${search.img}" alt=""/>
                   <div class="details">
                        <div class="title-price-x"></div>
                        <h4 class="title-price">
                           <p>${search.name}</p>
                           <p class="cart-item-price">Rs.${search.price}</p>
                        </h4>
                        <svg xmlns="http://www.w3.org/2000/svg" onclick="removeItem(${id})" width="16" height="16" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
                            <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"/>
                        </svg>
                            <div class="abc">
                                <svg onclick="increment(${id})" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-lg" viewBox="0 0 16 16">
                                    <path fill-rule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2"/>
                                </svg>
                                <div id=${id} class="quantity">${item}</div>
                                <svg onclick="decrement(${id})" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-dash-lg" viewBox="0 0 16 16">
                                    <path fill-rule="evenodd" d="M2 8a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11A.5.5 0 0 1 2 8"/>
                                </svg>
                            </div>
                        <h3>Rs ${item*search.price}</h3>
                    </div>    
                </div>
                `;
            })
            .join(""));
       
    } else {
        Shoppingcart.innerHTML =``;
        label.innerHTML =`
        <h2>Cart is Empty</h2>
        <a href="products.html">
            <button class="HomeBtn">Back to products</button>
        </a>    
        `;
    }
    
   
};

generateCartItems();

let increment = (id) => {
    let selecteditem = id;
    let search = basket.find((x) => x.id === selecteditem.id);
    if(search === undefined){
      basket.push({
        id: selecteditem.id,
        item:1,
    
      });
    }
    else{
      search.item+=1;
    }
    
    
    generateCartItems();
    update(selecteditem.id);
    localStorage.setItem("data",JSON.stringify(basket));
  };
let decrement = (id) => {
    let selecteditem = id;
    let search = basket.find((x) => x.id === selecteditem.id);
  
    if(search === undefined) return;
    else if(search.item === 0) return 0;
    else{
      search.item-=1;
    }
    update(selecteditem.id);
    basket =basket.filter((x) => x.item !==0);
    generateCartItems();
    
    localStorage.setItem("data",JSON.stringify(basket));
  }; 
let update = (id) => {
    let search = basket.find((x)=> x.id === id)
    console.log(search.item);
    document.getElementById(id).innerHTML = search.item;
    calculation();
    TotalAmount();
  };

let removeItem = (id) => {
    let selecteditem = id;
    basket = basket.filter((x) => x.id !== selecteditem.id);
    generateCartItems();
    TotalAmount();
    calculation();
    localStorage.setItem("data",JSON.stringify(basket));
}

let clearCart =()=>{
    basket=[];
    generateCartItems();
    calculation();
    localStorage.setItem("data",JSON.stringify(basket));
}

let TotalAmount =()=>{
    if(basket.lenght !==0){
        let amount = basket.map((x)=>{
            let {item,id}=x;
            let search = shopItemData.find((y)=>y.id ===id)||[];
            return item*search.price;
        }).reduce((x,y)=>x+y,0);
        //console.log(amount);
        label.innerHTML =`
        <h2>Total Bill: RS ${amount}</h2>
        <button class="checkout">Checkout</button>
        <button onclick="clearCart()" class="removeAll">Clear Cart</button>
        `;
    }
    
    else{
        return;
    }
};

TotalAmount();
