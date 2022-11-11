loading1();
function loading1(){
    const load = document.querySelector(".loading");
    window.addEventListener("load", function(){
        
        setTimeout(() => {
            load.style.display = "none";
        }, 2000);
    });
}

const btnchangeTheme = document.querySelector("#changeTheme");

btnchangeTheme.addEventListener('click', () =>{
    document.body.classList.toggle('dark');
})

const navMenu = document.querySelector(".toggle");
const showMenu = document.querySelector("#nav-menu");
const navClose = document.querySelector(".close");
const navLink = document.querySelectorAll('.nav__link');

if (navMenu) {
    navMenu.addEventListener('click', function () {
    showMenu.classList.toggle('nav__menu-show')
    })
}
if (navClose) {
    navClose.addEventListener('click', function () {
    showMenu.classList.remove('nav__menu-show')
    })
}

function linkAction () {
    const navMenu = document.querySelector('#nav-menu')
    navMenu.classList.remove('nav__menu-show')
}

navLink.forEach(n => n.addEventListener('click', linkAction));


const bagShop = document.querySelector(".shop");
const shop = document.querySelector(".shopBag");
const items = document.querySelector(".shopItems")
const totalShop = document.querySelector(".totalShop");
const productContent = document.querySelector(".content4");
const counterShops = document.querySelector(".count");


    let productos = [
        {
            id: 1,
            name: "Hoodies",
            price: 14.00,
            stock: 7,
            category: "hoodies",
            img: "./img/featured1.png",
        },
        {
            id: 2,
            name: "Shirts",
            price: 24.00,
            stock: 15,
            category:  "shirts",
            img: "./img/featured2.png"
        },
        {
            id: 3,
            name: "Sweatshirts",
            price: 24.00,
            stock: 20,
            category: "sweatshirts",
            img: "./img/featured3.png"
        }
    ]

    let ObjShopCart = {};
    
    function printCart(){
        let html = "";
    
        const arrayShoppingCart = Object.values(ObjShopCart)
    
        arrayShoppingCart.forEach(({category, id, img , price, name, amount, stock}) =>{
    
    
            html += `
            <article class="product__card--cart ${category}" id =${id}>
                <div class="product__img--container--cart">
                    <img src=${img}>
                </div>
                <div class="product__info--cart">
                    <h3>${name}</h3>
                    <div>Cantidad: ${stock}
                    <span>
                    |${price}</span>
                </div>
                <div class="counter__cart">
                    <div class="add__rest--btns">
                        <button class="rest" id =${id} >-</button>
                        <span class="amount__card--cart amount">Units: ${amount}</span>
                        <button class="sum" id =${id} >+</button>
                    </div>
                    <button class="delete" id =${id}> <i class="fa-solid fa-trash"></i></button>
                </div>        
    
            </div>
        </article>
            `
        }) 
    
        items.innerHTML= html
        total()
        counter () 
        countShopProduct()
    }
    
    function productsOnHtml(productos){
        productContent.innerHTML = '';
        productos.forEach(({category, id, img, price, name, stock}) => {
    
    
            const notAvailable = stock?
            `<button class="button product__button--add" id =${id} >+</button>`:
            `<button class="button product__button--add no__stock">No Stock</button>`;
    
            let html = `
                        <article class="product__card ${category}" id =${id}>
                            <div class="product__img--container">
                                <img src=${ img} alt="product" class="product__img">
                            </div>
                            <div class="product__info">
                                <h2 class="product__price">
                                    ${price}
                                    <span class="product__stock"> | Stock: ${stock}</span>
                                </h2>
                                <h3 class="product__name">${name}</h3>
                                ${notAvailable}
                            </div>
                        </article>
                    `;
                        productContent.innerHTML += html;
        });
    }
    
    function noItems() {
            const arrayShoppingCart = Object.values(ObjShopCart );
            if(!arrayShoppingCart.length) return items.innerHTML = 
                `<div class="empyCart"><img src="img/empty-cart.png"<div/>
                <h2Your cart is empty</h2>
                <p>You can add items to your cart by clicking on the + button on the product page.</p>
            `
    }

    function total () {

        const arrayShoppingCart = Object.values( ObjShopCart);
    
    
            let totalSum = arrayShoppingCart.reduce((acum, curr) =>{
                acum += curr.price * curr.amount;
        
                return acum;
            }, 0)
            let totalItems = arrayShoppingCart.reduce((acum, curr) =>{ 
                acum += curr.amount
                return acum;
            }, 0)
            totalShop .innerHTML = `
            <div class="total__items">${totalItems} <strong> total </strong> </div>
            <div class="total__price"> ${totalSum}</div>
            `;
            noItems()
    }

    function counter ()  {
    const arrayShoppingCart = Object.values(ObjShopCart);

    let totalItems = arrayShoppingCart.reduce((acum, curr) =>{ 
        acum += curr.amount
        return acum;
    }, 0)

    cartCounter.innerHTML = `${totalItems}`

    }

        productContent.addEventListener('click', (e) =>{
    if  (e.target.classList.contains("botonFirst")){
        const idProduct = Number(e.target.id);
        
        const currentProductOne = productos[0];
    
        if(ObjShopCart[currentProductOne.id]){
        ObjShopCart[currentProductOne.id].amount++;
        }else{
        ObjShopCart[currentProductOne.id] = currentProductOne; 
        ObjShopCart[currentProductOne.id].amount = 1 ;
        
        }
        } printCart()
        })

        productContent.addEventListener('click', (e) =>{
        if(e.target.classList.contains("botonSecond")){
        const idProduct = Number(e.target.id);
        const currentProductTwo = productos [1];
        if(ObjShopCart[currentProductTwo.id]){
        ObjShopCart[currentProductTwo.id].amount++;
        }else{
        ObjShopCart[currentProductTwo.id] = currentProductTwo; 
        ObjShopCart[currentProductTwo.id].amount = 1 ;
    
        }
        } printCart()
        })

        productContent.addEventListener('click', (e) =>{
    if(e.target.classList.contains("botonThree")){
        const idProduct = Number(e.target.id);
        const currentProductThree = productos[2];
    if(ObjShopCart[currentProductThree.id]){
        ObjShopCart[currentProductThree.id].amount++;
        }else{
        ObjShopCart[currentProductThree.id] = currentProductThree; 
        ObjShopCart[currentProductThree.id].amount = 1 ;
        
        }
        } printCart()
        })


        items.addEventListener('click', (e) =>{
    if(e.target.classList.contains("delete")){
        const idProduc = Number(e.target.id);
        const op = confirm("Seguro que quieres eliminar?");

        if(op){
        delete ObjShopCart[idProduc];
        }
    }

    if(e.target.classList.contains("sum")){
        const idProduc = Number(e.target.id);
        const currentProduc = productos.find((producto)=> producto.id===idProduc);
        if(currentProduc.stock===ObjShopCart[idProduc].amount)
    
        return alert("no hay más productos");
    ObjShopCart[idProduc].amount++;

    }

    if(e.target.classList.contains("rest")){
        const idProduc = Number(e.target.id);
    if(ObjShopCart[idProduc].amount===1){
        const op = confirm("Seguro que quieres eliminar?");
        if(op){
            delete  ObjShopCart[idProduc];
        }
    }else{
        ObjShopCart[idProduc].amount--;
    }
    
    }printCart()

        })

bagShop.addEventListener('click', () =>{
    shop.classList.toggle("shopBag-show")
})

