//global data store
const validCoupon = 1212;

// ✔✔helper fucntion
function getNumber(id) {
    return parseFloat(document.getElementById(id).innerText) || 0;

}
function setNumber(id, value) {
    document.getElementById(id).innerText = value;
}

// ✅ coupon apply
document.getElementById('disount-btn').addEventListener('click', function () {
    const coupon = parseInt(document.getElementById('coupon').value);
    const subtotalPrice = getNumber('subtotal-price');
    if (coupon === validCoupon) {
        const saveMoney = (subtotalPrice * (10 / 100)).toFixed(2);
        setNumber('discount', saveMoney);
        const newTotal = subtotalPrice - saveMoney;
        setNumber('total-price', newTotal);

    }
    else {
        alert('Please Enter the Valid Coupon Code.')
    }
})
// ✅✅ add to cart
document.getElementById('shop-container').addEventListener('click', function (event) {
    if (event.target.className.includes('buy-btn')) {
        // get product info
        const productImg = event.target.parentNode.parentNode.parentNode.children[0].children[0].src;
        const productTitle = event.target.parentNode.parentNode.children[1].innerText;
        const productPrice = parseFloat(event.target.parentNode.parentNode.children[2].innerText);
        // update total and subtotal
        const subtotalPrice = getNumber('subtotal-price');
        const newsubtotal = productPrice + subtotalPrice;
        setNumber('subtotal-price', newsubtotal);
        setNumber('total-price', newsubtotal);

        //upadate glbal quantity
        const quantity = getNumber('quantity');
        setNumber('quantity', quantity + 1);

        // parent 
        const cartParent = document.getElementById('cart-parent');

        // check if products already exits

        let existingItem = null;
        for (let item of cartParent.children) {
            const title = item.querySelector('h2').innerText;
            // console.log(title);
            if (title === productTitle) {
                existingItem = item;
                break;
            }
        }
        if (existingItem) {
            // update quantity
            const ProductQuantity = existingItem.querySelector("#product-quantity");
            const newQty = parseInt(ProductQuantity.innerText) + 1;
            ProductQuantity.innerText = newQty;
            // update total for this item
            const total = existingItem.querySelector('#total');
            const totalProductPrice = newQty * productPrice;
            total.innerText = totalProductPrice.toFixed(2);
        } else {

            //    create new cart Element
            const newItem = document.createElement('div');
            newItem.innerHTML = `<div class="bg-[#F4F1F1] flex my-4 items-center justify-around p-4 rounded-md relative">
        <i class="fa-solid fa-circle-xmark absolute top-[10%] left-[3%] text-2xl text-red-600"></i>
                            <img src="${productImg}" alt="">
                            <div>
                                <h2 class="font-semibold text-xl text-[#111111]">${productTitle}</h2>
                                <h2 class="text-xl text-[#111111]  "><span>${Number(productPrice).toFixed(2)}</span>tk</h2>
                                <h2 class="text-xl text-[#111111]  ">Quantity : <span id="product-quantity">1</span></h2>
                                <h2 class="text-xl text-[#111111]  ">Total: <span id="total">${productPrice.toFixed(2)}</span>tk</h2>
                            </div>
                        </div>`

            // append child
            cartParent.prepend(newItem);

            // removie item
            newItem.querySelector('.fa-circle-xmark').addEventListener('click', function () {
                const totalPrice = parseFloat(newItem.querySelector('#total').innerText);
                const ProductQuantity = parseInt(newItem.querySelector('#product-quantity').innerText);
                const total = getNumber('total-price');
                const subtotalPrice = getNumber('subtotal-price');
                const quantity = getNumber('quantity');
                const newQuantity = quantity - ProductQuantity;
                const newSubTotalPrice = subtotalPrice - totalPrice;
                const newTotalPrice = total - totalPrice;
                //    update total & subtotal & quantity
                setNumber('subtotal-price', newSubTotalPrice.toFixed(2));
                setNumber('total-price', newTotalPrice.toFixed(2));
                setNumber('quantity', newQuantity);

                const coupon = parseInt(document.getElementById('coupon').value);
                // const subtotalPrice = getNumber('subtotal-price');
                if (coupon === validCoupon) {
                    const saveMoney = (newSubTotalPrice* (10 / 100)).toFixed(2);
                    setNumber('discount', saveMoney);
                    const newTotal =newSubTotalPrice - saveMoney;
                    setNumber('total-price', newTotal);

                }
                else {
                    setNumber('discount', 0);
                    setNumber('total-price', newSubTotalPrice);
                }

                newItem.remove();
            })


        }


    }

})
