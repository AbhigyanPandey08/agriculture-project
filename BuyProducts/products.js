let btn1 = document.querySelector("input");
let body = document.querySelector("body");

let curr = "light";

btn1.addEventListener("click", () => {
    if(curr === "light")
    {
        curr = "dark";
        body.classList.add("dark");
        body.classList.remove("light");
        
    }
    else{
        curr = "light";
        body.classList.add("light");
        body.classList.remove("dark");
        
    }

});

let shop =document.getElementById('shop');



let basket = JSON.parse(localStorage.getItem("data")) || [];

let generateshop =()=>{
    return (shop.innerHTML=shopItemData
        .map((x)=>{
            let {id,name,price,img}=x;
            let search = basket.find((x)=>x.id === id) || []
        return `
    <div id=product-id-${id} class="product-container">
      <div class="image-setting">
        <img src="${img}" alt="image of product">
      </div>
      <div class="heading"><h3>${name}</h3></div>
      <div class="price"><h5><b>Rs.${price}/kg</b></h5></div>
        <div class="abc">
          <svg onclick="increment(${id})" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-lg" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2"/>
          </svg>
          <div id=${id} class="quantity">
          ${search.item === undefined? 0:search.item}
          </div>
          <svg onclick="decrement(${id})" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-dash-lg" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M2 8a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11A.5.5 0 0 1 2 8"/>
          </svg>
        </div> 
    </div>`
    }).join(""));
};

generateshop();


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
  
  
  //console.log(basket);
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
  //console.log(basket);
  
  localStorage.setItem("data",JSON.stringify(basket));
}; 
let update = (id) => {
  let search = basket.find((x)=> x.id === id)
  console.log(search.item);
  document.getElementById(id).innerHTML = search.item;
  calculation();
};

let calculation = () =>  {
  let carticon = document.getElementById("cartAmount");
  carticon.innerHTML =basket.map((x) => x.item).reduce((x,y) => x+y,0);
}

calculation();