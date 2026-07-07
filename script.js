
let discount = 0;
// Welcome message
console.log("Welcome to AI Restaurant Website!");
document.addEventListener("DOMContentLoaded", function () {
    alert("🍕 Welcome to AI Restaurant!");
});
const searchInput = document.getElementById("searchInput");
const cards = document.querySelectorAll("#menu .card");

searchInput.addEventListener("keyup", function () {
    const value = searchInput.value.toLowerCase();

    cards.forEach(card => {
        const name = card.querySelector("h3").textContent.toLowerCase();

        if (name.includes(value)) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }
    });
});

const priceButtons =
    document.querySelectorAll(".price-btn");

const noResults =
    document.getElementById("noResults");

console.log(priceButtons.length);

priceButtons.forEach((button) => {

    button.addEventListener("click", () => {

        const filter = button.dataset.price;

        let visibleCards = 0;

        cards.forEach((card) => {

            const price = Number(card.dataset.foodPrice);

            if (
    filter === "all" ||
    (filter === "under100" && price < 100) ||
    (filter === "100to150" && price >= 100 && price <= 150) ||
    (filter === "above150" && price > 150)
) {
    card.style.display = "block";
    visibleCards++;
} else {
    card.style.display = "none";
}

        });

        if (visibleCards === 0) {
            noResults.style.display = "block";
        } else {
            noResults.style.display = "none";
        }

    });

});

let cart = JSON.parse(localStorage.getItem("cart")) || [];

const cartCountElement = document.getElementById("cartCount");
// Add to Cart Feature
const cartButtons = document.querySelectorAll(".cart-btn");


const cartPopup = document.getElementById("cartPopup");
const closeCart = document.getElementById("closeCart");
const cartIcon = document.querySelector(".cart-icon");

cartIcon.addEventListener("click", () => {
    cartPopup.style.display = "block";
});

closeCart.addEventListener("click", () => {
    cartPopup.style.display = "none";
});
// Cart Data

const cartItems = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");

// Add items to cart
cartButtons.forEach(button => {
    button.addEventListener("click", function () {

        const name = this.dataset.name;
        const price = Number(this.dataset.price);

        cart.push({
    name: name,
    price: price,
    quantity: 1
});
cartCountElement.textContent = cart.reduce(
    (total, item) => total + item.quantity,
    0
);
console.log("Cart Count Updated:", cartCountElement.textContent);
localStorage.setItem("cart", JSON.stringify(cart));
console.log(cart);
updateCart();
        
    });
});

// Update Cart
function updateCart() {

    cartItems.innerHTML = "";
    let total = 0;

    cart.forEach((item, index) => {

    total += item.price * item.quantity;

    cartItems.innerHTML += `
        <div class="cart-item">
            <p>${item.name}</p>

            <button class="qty-btn" onclick="decreaseQty(${index})">-</button>

            <span>${item.quantity}</span>

            <button class="qty-btn" onclick="increaseQty(${index})">+</button>

            <span>₹${item.price * item.quantity}</span>
            <button class="remove-btn" onclick="removeItem(${index})">🗑 Remove</button>
        </div>
    `;
}) 

    if (cart.length === 0) {
        cartItems.innerHTML = "<p>Your cart is empty.</p>";
    }

if (discount === 10) {

    total = total - (total * 10 / 100);

}

else if (discount === 50) {

    total = total - (total * 50 / 100);

    if (total < 0) {
        total = 0;
    }

}

cartTotal.textContent = total;
cartCountElement.innerText = cart.length;

localStorage.setItem("cart", JSON.stringify(cart));
}
function increaseQty(index) {
    cart[index].quantity++;
    updateCart();
}

function decreaseQty(index) {
    if (cart[index].quantity > 1) {
        cart[index].quantity--;
    } else {
        cart.splice(index, 1);
    }

    updateCart();
}
function removeItem(index) {

    cart.splice(index, 1);

    if (cart.length === 0) {

        discount = 0;
        couponInput.value = "";
    }

    updateCart();
}
updateCart();
// Login Popup
const loginBtn = document.querySelector(".login-btn");
const loginPopup = document.getElementById("loginPopup");
const closeLogin = document.getElementById("closeLogin");
const signupLink = document.getElementById("signupLink");
const loginTitle = document.getElementById("loginTitle");
const loginSubmitBtn = document.getElementById("loginSubmitBtn");
const nameInput = document.getElementById("nameInput");
const emailInput = document.getElementById("emailInput");
const passwordInput = document.getElementById("passwordInput");

loginBtn.addEventListener("click", () => {

    loginPopup.style.display = "flex";

    loginTitle.innerText = "Login";

    loginSubmitBtn.innerText = "Login";

    nameInput.style.display = "none";

});

closeLogin.addEventListener("click", () => {
    loginPopup.style.display = "none";
});
window.addEventListener("click", (event) => {

    if (event.target === loginPopup) {
        loginPopup.style.display = "none";
    }

});
signupLink.addEventListener("click", (e) => {

    e.preventDefault();

    loginTitle.innerText = "Sign Up";

    loginSubmitBtn.innerText = "Sign Up";

    nameInput.style.display = "block";

});
loginSubmitBtn.addEventListener("click", () => {

    if (loginTitle.innerText === "Sign Up") {

        const user = {
            name: nameInput.value,
            email: emailInput.value,
            password: passwordInput.value
        };

        localStorage.setItem("user", JSON.stringify(user));

        alert("Signup Successful! 🎉");

        loginPopup.style.display = "none";

        nameInput.value = "";
        emailInput.value = "";
        passwordInput.value = "";

    } else {

        const savedUser = JSON.parse(localStorage.getItem("user"));

        if (
            savedUser &&
            savedUser.email === emailInput.value &&
            savedUser.password === passwordInput.value
        ) {

            alert("Welcome " + savedUser.name + " 🎉");

            loginPopup.style.display = "none";

            emailInput.value = "";
            passwordInput.value = "";

        } else {

            alert("Invalid Email or Password ❌");

        }

    }

});
const wishlistCount = document.getElementById("wishlistCount");

const wishlistButtons = document.querySelectorAll(".wishlist-btn");


wishlistButtons.forEach((button) => {

    button.addEventListener("click", () => {

        if (button.innerText === "🤍") {
            button.innerText = "❤️";
wishlistCount.innerText++;
const foodName =
    
    button.parentElement.querySelector("h3").innerText;

wishlistItems.innerHTML +=
    "<p>" + foodName + "</p>";
    wishlist.push(foodName);

localStorage.setItem(
    "wishlist",
    JSON.stringify(wishlist)
);
        } else {
            button.innerText = "🤍";

const foodName =
    button.parentElement.querySelector("h3").innerText;

wishlist = wishlist.filter(
    item => item !== foodName
);
wishlistCount.innerText = wishlist.length;
localStorage.setItem(
    "wishlist",
    JSON.stringify(wishlist)
);
wishlistItems.innerHTML = "";

wishlist.forEach((item) => {

    wishlistItems.innerHTML += "<p>" + item + "</p>";

});
        }

    });

});
const wishlistBtn = document.getElementById("wishlistBtn");
const wishlistPopup = document.getElementById("wishlistPopup");
const darkModeBtn = document.getElementById("darkModeBtn");
const closeWishlist = document.getElementById("closeWishlist");
const wishlistItems = document.getElementById("wishlistItems");
const couponInput = document.getElementById("couponInput");
const applyCouponBtn = document.getElementById("applyCouponBtn");
const checkoutBtn = document.getElementById("checkoutBtn");
const checkoutPopup = document.getElementById("checkoutPopup");

const closeCheckout = document.getElementById("closeCheckout");

const confirmOrderBtn = document.getElementById("confirmOrderBtn");

const customerName = document.getElementById("customerName");

const customerPhone = document.getElementById("customerPhone");
const customerEmail =
document.getElementById("customerEmail");
const customerAddress = document.getElementById("customerAddress");
const checkoutSummary = document.getElementById("checkoutSummary");
const paymentMethod = document.getElementById("paymentMethod");

const upiBox = document.getElementById("upiBox");
const reviewPopup = document.getElementById("reviewPopup");

const closeReview = document.getElementById("closeReview");

const submitReviewBtn = document.getElementById("submitReviewBtn");

const reviewName = document.getElementById("reviewName");

const reviewText = document.getElementById("reviewText");

const reviewsList = document.getElementById("reviewsList");
const stars = document.querySelectorAll(".star");
const myOrdersBtn = document.getElementById("myOrdersBtn");

const ordersPopup = document.getElementById("ordersPopup");

const closeOrders = document.getElementById("closeOrders");

const ordersList = document.getElementById("ordersList");
myOrdersBtn.addEventListener("click", () => {

    ordersPopup.style.display = "flex";

});
let orders = JSON.parse(localStorage.getItem("orders")) || [];
let reviews = JSON.parse(localStorage.getItem("reviews")) || [];
let selectedRating = 5;
let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
wishlist.forEach((item) => {

    wishlistItems.innerHTML += "<p>" + item + "</p>";

});

wishlistCount.innerText = wishlist.length;
wishlistBtn.addEventListener("click", () => {

    wishlistPopup.style.display = "flex";

});
closeWishlist.addEventListener("click", () => {

    wishlistPopup.style.display = "none";

});
window.addEventListener("click", (event) => {

    if (event.target === wishlistPopup) {

        wishlistPopup.style.display = "none";

    }

});
applyCouponBtn.addEventListener("click", () => {

    const coupon = couponInput.value;

    if (coupon === "SAVE10") {

        discount = 10;

        updateCart();

        alert("SAVE10 Applied! 10% OFF 🎉");

    }

    else if (coupon === "WELCOME50") {

        discount = 50;

        updateCart();

        alert("WELCOME50 Applied! ₹50 OFF 🎉");

    }

    else {

        alert("Invalid Coupon ❌");

    }

});
closeOrders.addEventListener("click", () => {

    ordersPopup.style.display = "none";

});
window.addEventListener("click", (event) => {

    if (event.target === ordersPopup) {

        ordersPopup.style.display = "none";

    }

});
checkoutBtn.addEventListener("click", () => {

    if (cart.length === 0) {

        alert("Cart is empty! ❌");

        return;

    }
    showCheckoutSummary();

    checkoutPopup.style.display = "flex";

});
function showOrders() {
  orders = JSON.parse(
    localStorage.getItem("orders")
) || [];
console.log("Orders Length =", orders.length);
    ordersList.innerHTML = "";

    if (orders.length === 0) {

        ordersList.innerHTML = "<p>No orders yet.</p>";

        return;

    }

    orders.forEach((order, index) => {

        let orderHTML = `<h3>Order ${index + 1}</h3>`;

        // Naye orders (status ke saath)
        if (order.items) {

            orderHTML += `<p><b>Status:</b> ${order.status || "🟡 Preparing"}</p>`;

            order.items.forEach((item) => {

                orderHTML += `<p>${item.name} x ${item.quantity}</p>`;

            });

        }

        // Purane orders (sirf array wale)
        else {

            order.forEach((item) => {

                orderHTML += `<p>${item.name} x ${item.quantity}</p>`;

            });

        }

        ordersList.innerHTML += orderHTML;

    });

}
myOrdersBtn.addEventListener("click", () => {

    showOrders();

    ordersPopup.style.display = "flex";

});
confirmOrderBtn.addEventListener("click", () => {

    if (
    customerName.value === "" ||
    customerPhone.value === "" ||
    customerAddress.value === ""
) {

        alert("Please fill all details! ❌");

        return;
    }
orders.push({

    name: customerName.value,

    phone: customerPhone.value,
    
    email: customerEmail.value,

    address: customerAddress.value,

    items: [...cart],

    status: "🟡 Preparing",
    
    total: Number(cartTotal.textContent)

});

    localStorage.setItem("orders", JSON.stringify(orders));

    alert(
    "Order Placed Successfully! 🎉\n\n📧 Confirmation Email will be sent soon.\n📱 SMS Notification will be available in a future update."
);
cart = [];

localStorage.setItem(
    "cart",
    JSON.stringify(cart)
);
updateCart();

checkoutPopup.style.display = "none";

customerName.value = "";
customerPhone.value = "";
customerEmail.value = "";
customerAddress.value = "";

paymentMethod.value = "cod";

upiBox.style.display = "none";
updateCart();

checkoutPopup.style.display = "none";

});
closeCheckout.addEventListener("click", () => {

    checkoutPopup.style.display = "none";

});
window.addEventListener("click", (event) => {

    if (event.target === checkoutPopup) {

        checkoutPopup.style.display = "none";

    }

});
function showCheckoutSummary() {

    checkoutSummary.innerHTML = "";

    let total = 0;

    cart.forEach((item) => {

        total += item.price * item.quantity;

        checkoutSummary.innerHTML += `
            <p>
                ${item.name} x ${item.quantity}
                - ₹${item.price * item.quantity}
            </p>
        `;

    });
    if (discount === 10) {

    total = total - (total * 10 / 100);

}

else if (discount === 50) {

    total = total - (total * 50 / 100);

}

    checkoutSummary.innerHTML += `
        <h3>Total: ₹${total}</h3>
    `;
}
paymentMethod.addEventListener("change", () => {

    if (paymentMethod.value === "upi") {

        upiBox.style.display = "block";

    } else {

        upiBox.style.display = "none";

    }

});
const reviewButtons = document.querySelectorAll(".review-btn");

reviewButtons.forEach((button) => {

    button.addEventListener("click", () => {
      showReviews();

        reviewPopup.style.display = "flex";

    });

});
closeReview.addEventListener("click", () => {

    reviewPopup.style.display = "none";

});
submitReviewBtn.addEventListener("click", () => {

    if (
        reviewName.value === "" ||
        reviewText.value === ""
    ) {

        alert("Please fill all details! ❌");

        return;
    }

    const review = {

    name: reviewName.value,

    text: reviewText.value,

    rating: selectedRating

};

    reviews.push(review);

    localStorage.setItem(
        "reviews",
        JSON.stringify(reviews)
    );

    reviewsList.innerHTML += `
        <div class="review-item">

            <h4>${review.name}</h4>

            <p>${review.text}</p>

            <hr>
        </div>
    `;

    reviewName.value = "";

    reviewText.value = "";

    alert("Review Added Successfully! ⭐");

});
function showReviews() {

    reviewsList.innerHTML = "";

    if (reviews.length === 0) {

        reviewsList.innerHTML = "<p>No reviews yet.</p>";

        return;
    }

    reviews.forEach((review) => {

        reviewsList.innerHTML += `
            <div class="review-item">

                <h4>
    ${review.name}
    ${"⭐".repeat(review.rating || 5)}
</h4>

<p>${review.text}</p>

                <hr>

            </div>
        `;

    });

}
stars.forEach((star, index) => {

    star.addEventListener("click", () => {

        selectedRating = index + 1;

        alert("Rating: " + selectedRating + " ⭐");

    });

});
darkModeBtn.addEventListener("click", () => {

    document.body.classList.toggle("dark-mode");

});
// Table Booking Popup

const bookTableBtn = document.querySelector(".book-table-btn");

const bookingPopup = document.getElementById("bookingPopup");
const closeBooking = document.getElementById("closeBooking");

bookTableBtn.addEventListener("click", () => {
    bookingPopup.style.display = "flex";
});

closeBooking.addEventListener("click", () => {
    bookingPopup.style.display = "none";
});

window.addEventListener("click", (e) => {
    if (e.target === bookingPopup) {
        bookingPopup.style.display = "none";
    }
});
// Confirm Table Booking

const confirmBookingBtn =
document.getElementById("confirmBookingBtn");

confirmBookingBtn.addEventListener("click", () => {

    const name =
document.getElementById("bookingName").value.trim();

const phone =
document.getElementById("bookingPhone").value.trim();

    const date =
    document.getElementById("bookingDate").value;

    const time =
    document.getElementById("bookingTime").value;

    const guests =
    document.getElementById("guestCount").value;

    if (!name || !phone || !date || !time || !guests) {

        alert("Please fill all required fields!");

        return;

    }

    alert(
        "🎉 Table Booked Successfully!\n\n" +
        "👤 Name: " + name +
        "\n📞 Phone: " + phone +
        "\n📅 Date: " + date +
        "\n⏰ Time: " + time +
        "\n👥 Guests: " + guests
    );

    bookingPopup.style.display = "none";

});
// AI Food Assistant

const askAiBtn = document.getElementById("askAiBtn");
const aiQuestion = document.getElementById("aiQuestion");
const aiResponse = document.getElementById("aiResponse");
const orderStatus =
    document.getElementById("orderStatus");

askAiBtn.addEventListener("click", () => {

    const question = aiQuestion.value.toLowerCase();

    if (
    question.includes("hi") ||
    question.includes("hello") ||
    question.includes("hey")
) {

    aiResponse.innerHTML =
        "👋 Hello! I am your AI Food Assistant. Ask me about pizza, burgers, pasta, veg, non-veg or spicy food!";

}
else if (
    question.includes("thanks") ||
    question.includes("thank you")
) {

    aiResponse.innerHTML =
        "😊 You're welcome! Enjoy your meal and let me know if you need any food recommendations.";

}
else if (
    question.includes("best seller") ||
    question.includes("popular") ||
    question.includes("best food")
) {

    aiResponse.innerHTML =
        "🔥 Our best sellers are Margherita Pizza, Royal Chicken Burger and White Sauce Pasta!";

}
else if (
    question.includes("order") ||
    question.includes("booking") ||
    question.includes("how to order")
) {

    aiResponse.innerHTML =
        "🛒 To place an order, click the 'Order Now' button or add items to your cart and proceed to checkout!";

}
else if (
    question.includes("today special") ||
    question.includes("special")
) {

    aiResponse.innerHTML =
        "⭐ Today's Special: Chef's Special Margherita Pizza with a free cold drink!";

}
else if (
    question.includes("timing") ||
    question.includes("opening time") ||
    question.includes("working hours") ||
    question.includes("open")
) {

    aiResponse.innerHTML =
        "🕒 We are open every day from 10:00 AM to 11:00 PM.";

}
else if (
    question.includes("delivery") ||
    question.includes("home delivery") ||
    question.includes("delivery time")
) {

    aiResponse.innerHTML =
        "🚚 We provide fast home delivery within 30-45 minutes in nearby areas.";

}
else if (
    question.includes("contact") ||
    question.includes("phone") ||
    question.includes("call") ||
    question.includes("support")
) {

    aiResponse.innerHTML =
        "📞 Contact us at +91 98765 43210 or email: support@airestaurant.com";

}
else if (
    question.includes("bye") ||
    question.includes("goodbye") ||
    question.includes("see you")
) {

    aiResponse.innerHTML =
        "👋 Goodbye! Have a great day and enjoy your delicious meal. Visit us again!";

}

else if (question.includes("pizza")) {

        aiResponse.innerHTML =
            "🍕 Our Margherita Pizza is the customer favorite!";

    } 
    else if (
    question.includes("non veg") ||
    question.includes("nonveg")
) {

    aiResponse.innerHTML =
        "🍗 We recommend Chicken Burger, Chicken Pizza and Grilled Chicken.";

}
    
    else if (question.includes("veg")) {

        aiResponse.innerHTML =
            "🥗 We recommend Veg Pizza, Pasta and Fresh Salad.";

    } 
    
    else if (question.includes("spicy")) {

        aiResponse.innerHTML =
            "🌶️ Try our Spicy Burger and Hot Special Pizza!";

    } 
    else if (question.includes("burger")) {

    aiResponse.innerHTML =
        "🍔 Our Royal Chicken Burger is one of the best sellers!";

}


else if (question.includes("pasta")) {

    aiResponse.innerHTML =
        "🍝 Our White Sauce Pasta is loved by our customers!";

}

else if (
    question.includes("drink") ||
    question.includes("cold drink")
) {

    aiResponse.innerHTML =
        "🥤 We have Coke, Pepsi, Sprite and fresh juices available.";
}
    
    else {

        aiResponse.innerHTML =
            "🤖 Sorry, I don't understand yet. More AI features coming soon!";
    }

});
// Clear AI response when input is empty

aiQuestion.addEventListener("input", () => {

    if (aiQuestion.value.trim() === "") {

        aiResponse.innerHTML = "";

    }

});
aiQuestion.addEventListener("keydown", (e) => {

    if (e.key === "Enter") {

        e.preventDefault();

        askAiBtn.click();

    }

});
// Email Subscription

const subscribeBtn = document.getElementById("subscribeBtn");
const subscribeEmail = document.getElementById("customerEmail");
const emailMessage = document.getElementById("emailMessage");

subscribeBtn.addEventListener("click", () => {

    const email = subscribeEmail.value.trim();

    if (email === "") {

        emailMessage.innerHTML =
            "❌ Please enter your email address.";

        return;
    }

    emailMessage.innerHTML =
        "✅ Thank you for subscribing!";

    subscribeEmail.value = "";

});
// Push Notification Demo

const enableNotificationBtn = document.getElementById(
    "enableNotificationBtn"
);

const notificationMessage = document.getElementById(
    "notificationMessage"
);

enableNotificationBtn.addEventListener("click", () => {

    notificationMessage.innerHTML =
        "✅ Notifications enabled successfully!";

});
// Voice Search

const voiceSearchBtn = document.getElementById("voiceSearchBtn");
const voiceResult = document.getElementById("voiceResult");

if ('webkitSpeechRecognition' in window) {

    const recognition = new webkitSpeechRecognition();

    recognition.lang = "en-US";

    recognition.onresult = function (event) {

    const text = event.results[0][0].transcript.toLowerCase().trim();

    voiceResult.innerHTML =
        "🎤 You said: " + text;

    console.log("VOICE TEXT =", text);

    if (text === "burger") {

        voiceResult.innerHTML = "🍔 BURGER DETECTED!";

    }

    if (text.includes("pizza")) {

        document.getElementById("pizza-card")
            .scrollIntoView({
                behavior: "smooth"
            });

    }

    else if (text.includes("burger")) {

    const burger =
        document.getElementById("burger-card");

    burger.scrollIntoView({
        behavior: "smooth",
        block: "center"
    });

}

    else if (text.includes("pasta")) {

        document.getElementById("pasta-card")
            .scrollIntoView({
                behavior: "smooth"
            });

    }

    setTimeout(() => {

        voiceResult.innerHTML = "";

    }, 3000);

};

    voiceSearchBtn.addEventListener("click", () => {

        recognition.start();

    });

}

else {

    voiceResult.innerHTML =
        "❌ Voice Search is not supported in this browser.";

}
// Multilingual Support

const englishBtn = document.getElementById("englishBtn");
const hindiBtn = document.getElementById("hindiBtn");

const heroTitle = document.getElementById("heroTitle");
const heroText = document.getElementById("heroText");
const aiTitle = document.getElementById("aiTitle");

const aiText = document.getElementById("aiText");
const allBtn = document.getElementById("allBtn");

const pizzaBtn = document.getElementById("pizzaBtn");

const burgerBtn = document.getElementById("burgerBtn");

const pastaBtn = document.getElementById("pastaBtn");
if (englishBtn && hindiBtn) {
/* OLD MULTILANGUAGE CODE - KEEP FOR FUTURE */
englishBtn.addEventListener("click", () => {

    localStorage.setItem("language", "english");

    heroTitle.innerHTML = "🍽️ AI Restaurant";

    heroText.innerHTML =
        "Delicious Food • Fast Delivery • Easy Online Booking";

    searchInput.placeholder =
        "🔍 Search food...";

    allBtn.textContent = "🍽 All";

    pizzaBtn.textContent = "🍕 Pizza";

    burgerBtn.textContent = "🍔 Burger";

    pastaBtn.textContent = "🍝 Pasta";
aiTitle.textContent = "🤖 AI Food Assistant";

aiText.textContent =
    "Ask our AI Assistant for food recommendations!";
});
hindiBtn.addEventListener("click", () => {

    localStorage.setItem("language", "hindi");

    heroTitle.innerHTML = "🍽️ एआई रेस्टोरेंट";

    heroText.innerHTML =
        "स्वादिष्ट भोजन • तेज़ डिलीवरी • आसान ऑनलाइन बुकिंग";

    searchInput.placeholder =
        "🔍 खाना खोजें...";

    allBtn.textContent = "🍽 सभी";

    pizzaBtn.textContent = "🍕 पिज़्ज़ा";

    burgerBtn.textContent = "🍔 बर्गर";

    pastaBtn.textContent = "🍝 पास्ता";
aiTitle.textContent = "🤖 एआई फूड असिस्टेंट";

aiText.textContent =
    "खाने की सलाह के लिए हमारे एआई असिस्टेंट से पूछें!";
});

}
// Admin Login Demo

const adminLoginBtn =
    document.getElementById("adminLoginBtn");

const adminPanel =
    document.getElementById("adminPanel");

if (adminLoginBtn) {

    adminLoginBtn.addEventListener("click", () => {

        const password =
            prompt("Enter Admin Password:");

        if (password === "admin123") {

            alert("✅ Admin Login Successful!");

            adminPanel.style.display = "block";

        } else {

            alert("❌ Wrong Password!");

        }

    });

}
// Food Management Demo

const addFoodBtn = document.getElementById("addFoodBtn");

if (addFoodBtn) {

    addFoodBtn.addEventListener("click", () => {

        const foodName = prompt("Enter Food Name:");

        const foodPrice = prompt("Enter Food Price:");

        if (foodName && foodPrice) {
  adminFoods.push({
    name: foodName,
    price: foodPrice
});

localStorage.setItem(
    "adminFoods",
    JSON.stringify(adminFoods)
);
            alert(
                `✅ ${foodName} (₹${foodPrice}) added successfully!`
            );

        }

    });

}
// Real Food Storage

let adminFoods = JSON.parse(
    localStorage.getItem("adminFoods")
) || [];
const manageFoodBtn =
    document.getElementById("manageFoodBtn");

if (manageFoodBtn) {

    manageFoodBtn.addEventListener("click", () => {

        let foodList = "🍔 Saved Foods:\n\n";

        adminFoods.forEach((food, index) => {

            foodList +=
                `${index + 1}. ${food.name} - ₹${food.price}\n`;

        });

        if (adminFoods.length === 0) {

            foodList = "❌ No foods added yet.";

        }

        alert(foodList);

    });

}
// Real Order Storage

let restaurantOrders = JSON.parse(
    localStorage.getItem("orders")
) || [];
const viewOrdersBtn =
    document.getElementById("viewOrdersBtn");
    const ateStatusBtn =
    document.getElementById("updateStatusBtn");
    const adminViewOrdersBtn =
    document.getElementById("adminViewOrdersBtn");

const adminUpdateStatusBtn =
    document.getElementById("adminUpdateStatusBtn");
    
    const viewCustomersBtn =
    document.getElementById("viewCustomersBtn");

if (viewOrdersBtn) {

    viewOrdersBtn.addEventListener("click", () => {

        restaurantOrders = JSON.parse(
            localStorage.getItem("orders")
        ) || [];
        console.log(restaurantOrders);

        let orderList = "📦 Customer Orders:\n\n";

        restaurantOrders.forEach((order, index) => {

            let items = "No items";

if (order.items) {

    items = order.items
        .map(item => item.name)
        .join(", ");

}

            orderList +=
`📦 Order ${index + 1}

👤 Name: ${order.name || "Not Available"}

📞 Phone: ${order.phone || "Not Available"}

🏠 Address: ${order.address || "Not Available"}

🍕 Items: ${items}

🚚 Status: ${order.status}

-------------------\n`;

        });

        if (restaurantOrders.length === 0) {

            orderList = "❌ No orders available.";

        }

        alert(orderList);

    });

}
if (updateStatusBtn) {

    updateStatusBtn.addEventListener("click", () => {

        let orders = JSON.parse(
            localStorage.getItem("orders")
        ) || [];

        if (orders.length === 0) {

            alert("❌ No orders available!");

            return;
        }

        orders.forEach(order => {

            if (order.status === "🟡 Preparing") {

                order.status = "🛵 Out for Delivery";

            } else if (order.status === "🛵 Out for Delivery") {

                order.status = "✅ Delivered";

            }

        });

        localStorage.setItem(
            "orders",
            JSON.stringify(orders)
        );

        alert("✅ Order status updated!");

    });

}

if (adminViewOrdersBtn) {

    adminViewOrdersBtn.addEventListener("click", () => {

        viewOrdersBtn.click();

    });

}

if (adminUpdateStatusBtn) {

    adminUpdateStatusBtn.addEventListener("click", () => {

        updateStatusBtn.click();

    });

}
if (viewCustomersBtn) {

    viewCustomersBtn.addEventListener("click", () => {

        let orders = JSON.parse(
            localStorage.getItem("orders")
        ) || [];

        if (orders.length === 0) {

            alert("❌ No customers found!");

            return;

        }

        let customerList = "👥 Customers List\n\n";

        orders.forEach((order, index) => {

            customerList +=
                `${index + 1}. ${order.name}\n` +
                `📞 ${order.phone}\n` +
                `🏠 ${order.address}\n\n`;

        });

        alert(customerList);

    });

}
const filterButtons =
    document.querySelectorAll(".filter-btn");

filterButtons.forEach((btn) => {

    btn.addEventListener("click", () => {

        const filter = btn.dataset.filter;
        

cards.forEach((card) => {

    const foodName = card
        .querySelector("h3")
        .textContent
        .toLowerCase();

    if (
        filter === "all" ||
        foodName.includes(filter)
    ) {

        card.style.display = "block";

    } else {

        card.style.display = "none";

    }

});

    });

});
// Analytics Dashboard

const totalOrders =
    document.getElementById("totalOrders");

if (totalOrders) {

    const orders =
        JSON.parse(localStorage.getItem("orders")) || [];

    totalOrders.textContent =
        orders.length;

}
const totalRevenue =
    document.getElementById("totalRevenue");

if (totalRevenue) {

    let revenue = 0;

    orders.forEach((order) => {

        if (order.items) {

            order.items.forEach((item) => {

                revenue += order.total || (item.price * item.quantity);

            });

        }

    });

    totalRevenue.textContent = revenue;

}
const totalCustomers =
    document.getElementById("totalCustomers");

if (totalCustomers) {

    const orders =
        JSON.parse(localStorage.getItem("orders")) || [];

    const uniquePhones = [...new Set(
        orders.map(order => order.phone)
    )];

    totalCustomers.textContent =
        uniquePhones.length;

}
const bestSeller =
    document.getElementById("bestSeller");

if (bestSeller) {

    let foodCount = {};

    orders.forEach((order) => {

        if (order.items) {

            order.items.forEach((item) => {

                if (foodCount[item.name]) {

                    foodCount[item.name] += item.quantity;

                } else {

                    foodCount[item.name] = item.quantity;

                }

            });

        }

    });

    let topFood = "None";
    let maxCount = 0;

    for (let food in foodCount) {

        if (foodCount[food] > maxCount) {

            maxCount = foodCount[food];
            topFood = food;

        }

    }

    bestSeller.textContent = topFood;

}