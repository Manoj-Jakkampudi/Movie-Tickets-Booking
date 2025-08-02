// script.js
const theaters = document.querySelectorAll('.select-theater');
const seats = document.querySelectorAll('.seat:not(.booked)');
const selectedSeatsElement = document.getElementById('selected-seats');
const totalPriceElement = document.getElementById('total-price');
const bookNowButton = document.querySelector('.book-now');
const receiptSection = document.querySelector('.receipt');

let pricePerSeat = 200; // Default price, updates dynamically.
let selectedSeats = [];
let currentTheater = '';
let currentShowtime = '';
const showtimes = {
    'Theater 1 (AC)': ['10:00 AM', '1:00 PM', '4:00 PM', '7:00 PM'],
    'Theater 2 (Non-AC)': ['11:00 AM', '2:00 PM', '5:00 PM', '8:00 PM']
};

theaters.forEach((theater, index) => {
    theater.addEventListener('click', () => {
        // Update current theater and price
        if (index === 0) {
            currentTheater = 'Theater 1 (AC)';
            pricePerSeat = 200;
        } else if (index === 1) {
            currentTheater = 'Theater 2 (Non-AC)';
            pricePerSeat = 150;
        }

        // Reset seat selection
        selectedSeats = [];
        updateSelectedSeats();

        // Display available showtimes
        currentShowtime = showtimes[currentTheater][0]; // Default showtime
        alert(`You selected ${currentTheater}. Price per seat: ₹${pricePerSeat}. Default Showtime: ${currentShowtime}`);
    });
});

seats.forEach((seat) => {
    seat.addEventListener('click', () => {
        if (!seat.classList.contains('booked')) {
            seat.classList.toggle('selected');
            const seatNumber = seat.getAttribute('data-seat');
            if (seat.classList.contains('selected')) {
                selectedSeats.push(seatNumber);
            } else {
                selectedSeats = selectedSeats.filter((s) => s !== seatNumber);
            }
            updateSelectedSeats();
        }
    });
});

function updateSelectedSeats() {
    selectedSeatsElement.textContent = selectedSeats.length ? selectedSeats.join(', ') : 'None';
    totalPriceElement.textContent = selectedSeats.length * pricePerSeat;
}

bookNowButton.addEventListener('click', () => {
    if (!currentTheater || selectedSeats.length === 0) {
        alert('Please select a theater and seats before booking.');
        return;
    }

    // Generate receipt
    receiptSection.innerHTML = `
        <h2>Booking Receipt</h2>
        <p><strong>Theater:</strong> ${currentTheater}</p>
        <p><strong>Showtime:</strong> ${currentShowtime}</p>
        <p><strong>Seats:</strong> ${selectedSeats.join(', ')}</p>
        <p><strong>Total Price:</strong> ₹${selectedSeats.length * pricePerSeat}</p>
    `;
    receiptSection.style.display = 'block';
});
