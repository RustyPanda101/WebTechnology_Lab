let inventory = [];

document.addEventListener("DOMContentLoaded", loadInventory);

function loadInventory() {
    fetch("inventory.json")
        .then(res => res.json())
        .then(data => {
            inventory = data;
            render();
        });
}

function render() {
    const table = document.getElementById("inventoryTable");
    table.innerHTML = "";

    let total = 0;

    inventory.forEach((p, i) => {
        total += p.price * p.stock;

        const lowStock = p.stock < 3 ? "style='color:red'" : "";

        table.innerHTML += `
            <tr ${lowStock}>
                <td>${p.id}</td>
                <td>${p.name}</td>
                <td>${p.category}</td>
                <td>${p.price}</td>
                <td>${p.stock}</td>
                <td><button onclick="deleteProduct(${i})">Delete</button></td>
            </tr>
        `;
    });

    document.getElementById("totalValue").textContent =
        "Total Inventory Value: ₹" + total;
}

function addProduct() {
    inventory.push({
        id: prodId.value,
        name: prodName.value,
        category: prodCategory.value,
        price: Number(prodPrice.value),
        stock: Number(prodStock.value)
    });
    render();
}

function deleteProduct(index) {
    inventory.splice(index, 1);
    render();
}
