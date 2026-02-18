const searchInput = document.getElementById("search");
const resultsDiv = document.getElementById("results");

let products = [];
let debounceTimer;

// Load products once when page loads
document.addEventListener("DOMContentLoaded", () => {
    fetch("products.json")
        .then(res => {
            if (!res.ok) throw new Error("Failed to load products");
            return res.json();
        })
        .then(data => {
            products = data.products;
            displayProducts(products);   // Show all initially
        })
        .catch(() => {
            resultsDiv.textContent = "Error loading products";
        });
});

// Debounce search
searchInput.addEventListener("input", () => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(searchProducts, 400);
});

function searchProducts() {
    const query = searchInput.value.trim().toLowerCase();

    if (query === "") {
        displayProducts(products);  // Show all if empty
        return;
    }

    const filtered = products.filter(p =>
        p.name.toLowerCase().includes(query)
    );

    if (filtered.length === 0) {
        resultsDiv.innerHTML = "<p>No results found</p>";
    } else {
        displayProducts(filtered);
    }
}

function displayProducts(list) {
    resultsDiv.innerHTML = "";

    list.forEach(p => {
        const div = document.createElement("div");
        div.innerHTML = `
            <strong>${p.name}</strong><br>
            Price: ₹${p.price}<br>
            Category: ${p.category}
            <hr>
        `;
        resultsDiv.appendChild(div);
    });
}
