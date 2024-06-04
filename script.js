document.addEventListener('DOMContentLoaded', () => {
    const placeOrderButton = document.getElementById('placeOrderButton');
    const backButton = document.getElementById('backButton');
    const foodItems = document.querySelectorAll('.fooditem input[type="checkbox"]');

    placeOrderButton.addEventListener('click', () => {
        const selectedItems = [];

        foodItems.forEach(item => {
            if (item.checked) {
                selectedItems.push(item.value);
            }
        });

        if (selectedItems.length > 0) {
            showProcessing();

            placeOrder(selectedItems)
                .then(orderDetails => {
                    showOrderSuccessMessage(orderDetails.items.length)
                        .then(() => {
                            displayOrder(orderDetails);
                            switchButtons();
                        });
                })
                .catch(error => {
                    console.error('Order failed', error);
                });
        } else {
            alert('Please select at least one item to place an order.');
        }
    });

    backButton.addEventListener('click', () => {
        location.reload();
    });

    function showProcessing() {
        const main = document.querySelector('main');
        main.innerHTML = ''; 

        const processingMessage = document.createElement('div');
        processingMessage.className = 'processing';
        processingMessage.textContent = 'Processing...';
        
        main.appendChild(processingMessage);
    }

    function placeOrder(items) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const orderId = Math.floor(Math.random() * 1000000);
                resolve({
                    orderId: orderId,
                    items: items
                });
            }, 2000);
        });
    }

    function showOrderSuccessMessage(itemCount) {
        return new Promise((resolve) => {
            const main = document.querySelector('main');
            main.innerHTML = '';  

            const successMessage = document.createElement('div');
            successMessage.className = 'wow-message';
            successMessage.textContent = `Wow, your order got placed with ${itemCount} item(s)!`;

            main.appendChild(successMessage);

            setTimeout(() => {
                resolve();
            }, 1500); 
        });
    }

    function displayOrder(orderDetails) {
        const main = document.querySelector('main');
        main.innerHTML = ''; 

        const orderSummary = document.createElement('div');
        orderSummary.className = 'order-summary';

        const orderIdElement = document.createElement('p');
        orderIdElement.textContent = `Order ID: ${orderDetails.orderId}`;
        orderSummary.appendChild(orderIdElement);

        orderDetails.items.forEach(item => {
            const img = document.createElement('img');
            img.src = `./img/${item}.png`;
            img.alt = item;
            img.className = 'order-item-image';
            orderSummary.appendChild(img);
        });

        main.appendChild(orderSummary);
    }

    function switchButtons() {
        placeOrderButton.style.display = 'none';
        backButton.style.display = 'block';
    }
});