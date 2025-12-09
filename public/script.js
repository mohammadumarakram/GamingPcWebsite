const toggleButton = document.getElementById('mobile-menu');
const navbarLinks = document.getElementById('nav-links');

toggleButton.addEventListener('click', (e) => {
    e.preventDefault(); // Prevent jump to top
    navbarLinks.classList.toggle('active');
});


/* --- TYPEWRITER EFFECT --- */
const TypeWriter = function(txtElement, words, wait = 3000) {
    this.txtElement = txtElement;
    this.words = words;
    this.txt = '';
    this.wordIndex = 0;
    this.wait = parseInt(wait, 10);
    this.type();
    this.isDeleting = false;
}

TypeWriter.prototype.type = function() {
    // Current index of word
    const current = this.wordIndex % this.words.length;
    // Get full text of current word
    const fullTxt = this.words[current];

    // Check if deleting
    if(this.isDeleting) {
        // Remove char
        this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
        // Add char
        this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    // Insert txt into element
    this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;

    // Initial Type Speed
    let typeSpeed = 200;

    if(this.isDeleting) {
        typeSpeed /= 2;
    }

    // If word is complete
    if(!this.isDeleting && this.txt === fullTxt) {
        // Make pause at end
        typeSpeed = this.wait;
        // Set delete to true
        this.isDeleting = true;
    } else if(this.isDeleting && this.txt === '') {
        this.isDeleting = false;
        // Move to next word
        this.wordIndex++;
        // Pause before start typing
        typeSpeed = 500;
    }

    setTimeout(() => this.type(), typeSpeed);
}

// Init On DOM Load
document.addEventListener('DOMContentLoaded', init);

function init() {
    const txtElement = document.querySelector('.txt-type');
    if (txtElement) { // Only run if element exists (prebuilds page)
        const words = JSON.parse(txtElement.getAttribute('data-words'));
        const wait = txtElement.getAttribute('data-wait');
        new TypeWriter(txtElement, words, wait);
    }
}


// =========================================
// CONTACT / ORDER PAGE LOGIC
// =========================================

document.addEventListener('DOMContentLoaded', function() {

    // Check if we are on the contact page by looking for the form
    const orderForm = document.getElementById('orderForm');

    if (orderForm) {

        // 1. Populate Data from URL
        const urlParams = new URLSearchParams(window.location.search);

        const product = urlParams.get('product');
        const price = urlParams.get('price');
        const cpu = urlParams.get('cpu');
        const ram = urlParams.get('ram');
        const gpu = urlParams.get('gpu');
        const img = urlParams.get('image');

        // If product data exists in URL, show the summary card
        if (product) {
            document.getElementById('orderCard').style.display = 'block';

            // Fill Visual Summary
            // Using logic to prevent errors if elements don't exist
            const setText = (id, text) => {
                const el = document.getElementById(id);
                if (el) el.innerText = text;
            };

            setText('summary-title', product);
            setText('summary-price', price);
            setText('summary-cpu', cpu);
            setText('summary-ram', ram);
            setText('summary-gpu', gpu);

            // Use a default image if none provided
            const imgEl = document.getElementById('summary-img');
            if (imgEl) {
                imgEl.src = img || 'public/images/logo.png';
            }

            // Fill Hidden Form Fields (For Backend)
            const setVal = (id, val) => {
                const el = document.getElementById(id);
                if (el) el.value = val;
            };

            setVal('hidden_product_name', product);
            setVal('hidden_base_price', price);
            setVal('hidden_specs', `${cpu} | ${ram} | ${gpu}`);
        }

        // 2. Handle Form Submission
        orderForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Stop page reload

            // Gather Form Data
            const formData = new FormData(orderForm);
            const data = Object.fromEntries(formData.entries());

            // UI Feedback: Change button to "Processing..."
            const btn = document.querySelector('.btn-submit');
            const originalText = btn.innerText;
            
            btn.innerText = "Processing...";
            btn.disabled = true;
            btn.style.opacity = "0.7";

            // --- SEND DATA TO BACKEND ---
            // FIXED: Pointing to the specific port 3000 where server.js is running
            fetch('http://localhost:3000/send-order', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            .then(response => response.json())
            .then(result => {
                if (result.success) {
                    // Success Logic
                    document.getElementById('success-msg').style.display = 'block';
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                    btn.innerText = "Request Sent ✓";
                    
                    // Optional: Reset only user fields, keep product info
                    // orderForm.reset();
                    // Re-populate hidden fields if reset clears them
                    if(product) {
                         document.getElementById('hidden_product_name').value = product;
                         document.getElementById('hidden_base_price').value = price;
                         document.getElementById('hidden_specs').value = `${cpu} | ${ram} | ${gpu}`;
                    }
                } else {
                    // Error Logic
                    alert("Something went wrong. Please try again or contact us on WhatsApp.");
                    btn.innerText = "Try Again";
                    btn.disabled = false;
                    btn.style.opacity = "1";
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert("Server error. Check console.");
                btn.innerText = "Try Again";
                btn.disabled = false;
                btn.style.opacity = "1";
            });
        });

    } // end if(orderForm)

}); // end DOMContentLoaded

