let cart = [];
let appliedCoupon = "";

function addItem() {
    const select = document.getElementById('productSelect');
    const name = select.value;
    const price = parseFloat(select.options[select.selectedIndex].getAttribute('data-price'));
    const category = select.options[select.selectedIndex].getAttribute('data-cat');
    const qty = parseInt(document.getElementById('prodQty').value);

    const existingItem = cart.find(item => item.name === name);
    if (existingItem) {
        existingItem.quantity += qty;
    } else {
        cart.push({ name, price, category, quantity: qty });
    }
    
    renderCart();
}

function removeItem(index) {
    cart.splice(index, 1);
    renderCart();
}

function applyCoupon() {
    const input = document.getElementById('couponInput').value.trim().toUpperCase();
    
    if (input.startsWith("SAVE") && input.length === 6) {
        appliedCoupon = input;
        alert("Coupon Applied!");
    } else {
        alert("Invalid Coupon Code. Try 'SAVE10'");
        appliedCoupon = "";
    }
    renderCart();
}

function calculateTotals() {
    let subtotal = 0;
    let discounts = 0;
    let discountDetails = [];

    cart.forEach(item => {
        subtotal += item.price * item.quantity;
    });

    if (subtotal > 5000) {
        const bulkDisc = subtotal * 0.10;
        discounts += bulkDisc;
        discountDetails.push("Bulk Discount (10%)");
    }

    const hasElectronics = cart.some(item => item.category === "Electronics");
    if (hasElectronics && subtotal > 10000) {
        discounts += 500;
        discountDetails.push("Electronics Bonus (₹500)");
    }

    const hour = new Date().getHours();
    if (hour >= 22 || hour <= 5) {
        const nightOwl = subtotal * 0.05;
        discounts += nightOwl;
        discountDetails.push("Night Owl Special (5%)");
    }

    if (appliedCoupon === "SAVE10") {
        discounts += 100;
        discountDetails.push("Coupon SAVE10 applied");
    }

    return {
        subtotal: subtotal,
        finalTotal: Math.max(0, subtotal - discounts),
        messages: discountDetails.join(" + ")
    };
}

function renderCart() {
    const cartBody = document.getElementById('cartBody');
    cartBody.innerHTML = "";

    cart.forEach((item, index) => {
        const row = `
            <tr>
                <td>${item.name}</td>
                <td>${item.category}</td>
                <td>₹${item.price}</td>
                <td>${item.quantity}</td>
                <td>₹${item.price * item.quantity}</td>
                <td><button class="btn-remove" onclick="removeItem(${index})">Remove</button></td>
            </tr>
        `;
        cartBody.innerHTML += row;
    });

    const totals = calculateTotals();
    document.getElementById('subtotal').innerText = totals.subtotal;
    document.getElementById('finalTotal').innerText = totals.finalTotal;
    document.getElementById('discountInfo').innerText = totals.messages ? "Applied: " + totals.messages : "";
}