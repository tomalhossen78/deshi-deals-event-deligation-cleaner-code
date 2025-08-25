// data

const validCoupon = 1212;

function getNumber(id){
    const number = parseFloat(document.getElementById(id).innerText);
    return number;
}
function setNumber(id,setNumber){
     document.getElementById(id).innerText = setNumber;
}

document.getElementById('disount-btn').addEventListener('click', function () {
    const coupon = parseInt(document.getElementById('coupon').value);
    const subtotalPrice = getNumber('subtotal-price');
    if (coupon === validCoupon) {
        const saveMoney = (subtotalPrice * (10 / 100)).toFixed(2);
        setNumber('discount',saveMoney);
        const newTotal = subtotalPrice - saveMoney;
        setNumber('total-price',newTotal);

    }
    else {
        alert('Please Enter the Valid Coupon Code.')
    }
})
document.getElementById('shop-container').addEventListener('click', function (event) {
    if (event.target.className.includes('buy-btn')) {
        console.log(event.target);

        const productImg = event.target.parentNode.parentNode.parentNode.children[0].children[0].src;
        // console.log(productImg);
        const productTitle = event.target.parentNode.parentNode.children[1].innerText;
        // console.log(productTitle);
        const productPrice = parseFloat(event.target.parentNode.parentNode.children[2].innerText);
        console.log(productPrice);

        const subtotalPrice = getNumber('subtotal-price');

        const newsubtotal = productPrice + subtotalPrice;
        setNumber('subtotal-price',newsubtotal);
        setNumber('total-price',newsubtotal);

        // quantity

        const quantity = getNumber('quantity');

        setNumber('quantity',quantity + 1);
        console.log(quantity);

        // parent 
        const cartParent = document.getElementById('cart-parent');
        //    create Element
        const newItem = document.createElement('div');
        newItem.innerHTML = `<div class="bg-[#F4F1F1] flex my-4 items-center justify-around p-4 rounded-md">
                            <img src="${productImg}" alt="">
                            <div>
                                <h2 class="font-semibold text-xl text-[#111111]">${productTitle}</h2>
                                <h2 class="text-xl text-[#111111] opacity-"><span>${Number(productPrice)}</span>tk</h2>
                            </div>
                        </div>`

        // append child

        cartParent.prepend(newItem);

    }

  })
