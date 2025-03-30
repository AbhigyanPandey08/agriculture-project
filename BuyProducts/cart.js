let label = document.getElementById("label");
let Shoppingcart = document.getElementById("shopping-cart");

let basket = JSON.parse(localStorage.getItem("data")) || [];

let calculation = () => {
    let carticon = document.getElementById("cartAmount");
    carticon.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0);
};

calculation();

let generateCartItems = () => {
    if (basket.length !== 0) {
        return (Shoppingcart.innerHTML = basket
            .map((x) => {
                let { id, item } = x;
                let search = shopItemData.find((y) => y.id === id) || [];
                return `
                <div class="cart-item">
                   <img width="100px" src="${search.img}" alt=""/>
                   <div class="details">
                        <h4 class="title-price">
                           <p>${search.name}</p>
                           <p class="cart-item-price">Rs.${search.price}</p>
                        </h4>
                        <svg xmlns="http://www.w3.org/2000/svg" onclick="removeItem(${id})" width="16" height="16" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
                            <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"/>
                        </svg>
                        <div class="abc">
                            <svg onclick="increment(${id})" width="16" height="16" fill="currentColor" class="bi bi-plus-lg">
                                <path fill-rule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2"/>
                            </svg>
                            <div id=${id} class="quantity">${item}</div>
                            <svg onclick="decrement(${id})" width="16" height="16" fill="currentColor" class="bi bi-dash-lg">
                                <path fill-rule="evenodd" d="M2 8a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11A.5.5 0 0 1 2 8"/>
                            </svg>
                        </div>
                        <h3>Rs ${item * search.price}</h3>
                    </div>    
                </div>
                `;
            })
            .join(""));
    } else {
        Shoppingcart.innerHTML = "";
        label.innerHTML = `
        <h2>Cart is Empty</h2>
        <a href="products.html">
            <button class="HomeBtn">Back to products</button>
        </a>`;
    }
};

generateCartItems();

let increment = (id) => {
    let search = basket.find((x) => x.id === id);
    if (search === undefined) {
        basket.push({ id, item: 1 });
    } else {
        search.item += 1;
    }
    generateCartItems();
    update(id);
    localStorage.setItem("data", JSON.stringify(basket));
};

let decrement = (id) => {
    let search = basket.find((x) => x.id === id);
    if (search === undefined || search.item === 0) return;
    search.item -= 1;
    update(id);
    basket = basket.filter((x) => x.item !== 0);
    generateCartItems();
    localStorage.setItem("data", JSON.stringify(basket));
};

let update = (id) => {
    let search = basket.find((x) => x.id === id);
    document.getElementById(id).innerHTML = search.item;
    calculation();
    TotalAmount();
};

let removeItem = (id) => {
    basket = basket.filter((x) => x.id !== id);
    generateCartItems();
    TotalAmount();
    calculation();
    localStorage.setItem("data", JSON.stringify(basket));
};

let clearCart = () => {
    basket = [];
    generateCartItems();
    calculation();
    localStorage.setItem("data", JSON.stringify(basket));
};

let TotalAmount = () => {
    if (basket.length !== 0) {
        let amount = basket
            .map((x) => {
                let search = shopItemData.find((y) => y.id === x.id) || [];
                return x.item * search.price;
            })
            .reduce((x, y) => x + y, 0);

        label.innerHTML = `
        <h2>Total Bill: Rs. ${amount}</h2>
        <button class="checkout" onclick="checkout(${amount})">Checkout</button>
        <button onclick="clearCart()" class="removeAll">Clear Cart</button>`;
    }
};

let checkout = (amount) => {
    var options = {
        "key": "rzp_test_rCCaQw6PQ1MlBd", // Razorpay Test Key
        "amount": amount * 100, // Convert to paisa
        "currency": "INR",
        "name": "Mock Store",
        "description": "Test Transaction",
        "image": "logo.png",
        "handler": function (response) {
            alert("Payment Successful! ID: " + response.razorpay_payment_id);
            clearCart(); // Empty cart after payment
        },
        "prefill": {
            "name": "Test User",
            "email": "test@example.com",
            "contact": "9999999999"
        },
        "theme": {
            "color": "#3399cc"
        }
    };
    var rzp1 = new Razorpay(options);
    rzp1.open();
};

TotalAmount();
