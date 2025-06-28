// Airline Chatbot Application

// Database - Contains airlines, airports, flights, fare features and FAQs
const airlineDB = {
  airlines: [
    {"code": "AA", "name": "American Airlines", "country": "USA"},
    {"code": "UA", "name": "United Airlines", "country": "USA"},
    {"code": "DL", "name": "Delta Air Lines", "country": "USA"},
    {"code": "BA", "name": "British Airways", "country": "UK"},
    {"code": "AF", "name": "Air France", "country": "France"},
    {"code": "EK", "name": "Emirates", "country": "UAE"},
    {"code": "JL", "name": "Japan Airlines", "country": "Japan"},
    {"code": "SQ", "name": "Singapore Airlines", "country": "Singapore"},
    {"code": "QF", "name": "Qantas", "country": "Australia"},
    {"code": "AI", "name": "Air India", "country": "India"}
  ],
  airports: [
    {"code": "JFK", "name": "John F. Kennedy International Airport", "city": "New York", "country": "USA"},
    {"code": "LAX", "name": "Los Angeles International Airport", "city": "Los Angeles", "country": "USA"},
    {"code": "ORD", "name": "O'Hare International Airport", "city": "Chicago", "country": "USA"},
    {"code": "LHR", "name": "Heathrow Airport", "city": "London", "country": "UK"},
    {"code": "CDG", "name": "Charles de Gaulle Airport", "city": "Paris", "country": "France"},
    {"code": "DXB", "name": "Dubai International Airport", "city": "Dubai", "country": "UAE"},
    {"code": "HND", "name": "Haneda Airport", "city": "Tokyo", "country": "Japan"},
    {"code": "SIN", "name": "Changi Airport", "city": "Singapore", "country": "Singapore"},
    {"code": "SYD", "name": "Sydney Airport", "city": "Sydney", "country": "Australia"},
    {"code": "DEL", "name": "Indira Gandhi International Airport", "city": "Delhi", "country": "India"}
  ],
  flights: [
    {
      "id": "F00001",
      "flight_number": "AA101",
      "airline_name": "American Airlines",
      "origin_city": "New York",
      "origin_code": "JFK",
      "destination_city": "London",
      "destination_code": "LHR",
      "departure_datetime": "2025-06-15 10:30",
      "arrival_datetime": "2025-06-15 22:45",
      "duration": "7h 15m",
      "status": "Scheduled",
      "available_seats": 45,
      "fare_classes": {
        "Economy": 599,
        "Premium Economy": 899,
        "Business": 1499,
        "First": 2399
      }
    },
    {
      "id": "F00002",
      "flight_number": "BA205",
      "airline_name": "British Airways",
      "origin_city": "London",
      "origin_code": "LHR",
      "destination_city": "Dubai",
      "destination_code": "DXB",
      "departure_datetime": "2025-06-16 14:20",
      "arrival_datetime": "2025-06-17 01:35",
      "duration": "6h 15m",
      "status": "Scheduled",
      "available_seats": 32,
      "fare_classes": {
        "Economy": 699,
        "Premium Economy": 1099,
        "Business": 1899,
        "First": 2999
      }
    },
    {
      "id": "F00003",
      "flight_number": "EK415",
      "airline_name": "Emirates",
      "origin_city": "Dubai",
      "origin_code": "DXB",
      "destination_city": "Tokyo",
      "destination_code": "HND",
      "departure_datetime": "2025-06-17 08:15",
      "arrival_datetime": "2025-06-17 22:30",
      "duration": "9h 15m",
      "status": "Scheduled",
      "available_seats": 67,
      "fare_classes": {
        "Economy": 899,
        "Premium Economy": 1299,
        "Business": 2199,
        "First": 3599
      }
    },
    {
      "id": "F00004",
      "flight_number": "SQ777",
      "airline_name": "Singapore Airlines",
      "origin_city": "Singapore",
      "origin_code": "SIN",
      "destination_city": "Sydney",
      "destination_code": "SYD",
      "departure_datetime": "2025-06-18 23:55",
      "arrival_datetime": "2025-06-19 10:20",
      "duration": "8h 25m",
      "status": "Scheduled",
      "available_seats": 89,
      "fare_classes": {
        "Economy": 749,
        "Premium Economy": 1149,
        "Business": 1949,
        "First": 3199
      }
    },
    // Add more flights for testing purposes with various routes
    {
      "id": "F00005",
      "flight_number": "AA202",
      "airline_name": "American Airlines",
      "origin_city": "Los Angeles",
      "origin_code": "LAX",
      "destination_city": "New York",
      "destination_code": "JFK",
      "departure_datetime": "2025-06-15 08:30",
      "arrival_datetime": "2025-06-15 16:45",
      "duration": "5h 15m",
      "status": "Scheduled",
      "available_seats": 62,
      "fare_classes": {
        "Economy": 399,
        "Premium Economy": 599,
        "Business": 999,
        "First": 1599
      }
    },
    {
      "id": "F00006",
      "flight_number": "UA505",
      "airline_name": "United Airlines",
      "origin_city": "Chicago",
      "origin_code": "ORD",
      "destination_city": "Los Angeles",
      "destination_code": "LAX",
      "departure_datetime": "2025-06-16 11:20",
      "arrival_datetime": "2025-06-16 13:45",
      "duration": "4h 25m",
      "status": "Scheduled",
      "available_seats": 48,
      "fare_classes": {
        "Economy": 349,
        "Premium Economy": 549,
        "Business": 899,
        "First": 1499
      }
    },
    {
      "id": "F00007",
      "flight_number": "DL303",
      "airline_name": "Delta Air Lines",
      "origin_city": "New York",
      "origin_code": "JFK",
      "destination_city": "Chicago",
      "destination_code": "ORD",
      "departure_datetime": "2025-06-17 09:15",
      "arrival_datetime": "2025-06-17 11:00",
      "duration": "2h 45m",
      "status": "Scheduled",
      "available_seats": 75,
      "fare_classes": {
        "Economy": 249,
        "Premium Economy": 399,
        "Business": 699,
        "First": 1099
      }
    }
  ],
  fareFeatures: {
    "Economy": ["Standard seat", "1 carry-on bag", "Meal for long flights", "Entertainment system"],
    "Premium Economy": ["Extra legroom", "2 carry-on bags", "Meal included", "Priority boarding", "Enhanced entertainment"],
    "Business": ["Lie-flat seat", "Lounge access", "Premium dining", "2 checked bags", "Priority check-in", "Fast-track security"],
    "First": ["Private suite", "Exclusive lounge", "Gourmet dining", "Personal concierge", "Chauffeur service", "Unlimited baggage"]
  },
  commonQuestions: [
    {
      "question": "What documents do I need to travel?",
      "answer": "You'll need a valid passport for international travel. Some destinations may require a visa. Check with the embassy or consulate of your destination country for specific requirements."
    },
    {
      "question": "What is the baggage allowance?",
      "answer": "Baggage allowance varies by fare class: Economy (1x23kg), Premium Economy (2x23kg), Business (2x32kg), First (3x32kg). Carry-on is typically 7-10kg depending on the airline."
    },
    {
      "question": "Can I change or cancel my booking?",
      "answer": "Yes, most bookings can be changed or cancelled. Fees may apply depending on your fare type and timing. Flexible fares typically have lower or no change fees."
    },
    {
      "question": "How early should I arrive at the airport?",
      "answer": "We recommend arriving 2 hours early for domestic flights and 3 hours early for international flights. Check-in typically opens 2-4 hours before departure."
    },
    {
      "question": "What about special dietary requirements?",
      "answer": "We offer various special meals including vegetarian, vegan, halal, kosher, and dietary restriction options. Please request when booking or at least 24 hours before your flight."
    }
  ],
  // Sample bookings for demonstration purposes
  bookings: [
    {
      "booking_id": "BK12345",
      "passenger_name": "John Smith",
      "email": "john.smith@example.com",
      "flight_id": "F00001",
      "fare_class": "Business",
      "seat": "12A",
      "booking_date": "2025-05-20",
      "status": "Confirmed",
      "payment": {
        "amount": 1499,
        "currency": "USD",
        "method": "Credit Card",
        "status": "Paid"
      }
    },
    {
      "booking_id": "BK23456",
      "passenger_name": "Emma Johnson",
      "email": "emma.j@example.com",
      "flight_id": "F00003",
      "fare_class": "Premium Economy",
      "seat": "25C",
      "booking_date": "2025-05-28",
      "status": "Confirmed",
      "payment": {
        "amount": 1299,
        "currency": "USD",
        "method": "PayPal",
        "status": "Paid"
      }
    }
  ]
};

// Chat state management
const chatState = {
  currentFlow: null,
  currentStep: null,
  flowData: {},
  searchResults: null,
  selectedFlight: null,
  selectedFareClass: null,
  bookingResult: null,
  isWaitingForResponse: false,
  history: []
};

// DOM Elements
const chatMessages = document.getElementById('chat-messages');
const chatForm = document.getElementById('chat-form');
const userInput = document.getElementById('user-input');
const quickActionButtons = document.querySelectorAll('.quick-action');
const clearChatButton = document.getElementById('clear-chat');
const flowDiagram = document.getElementById('flow-diagram');
const closeDiagramButton = document.querySelector('.close-diagram');

// Helper functions
function formatDate(dateString) {
  const options = { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
}

function formatTime(dateTimeString) {
  const options = { hour: '2-digit', minute: '2-digit' };
  return new Date(dateTimeString).toLocaleTimeString(undefined, options);
}

function formatDateTime(dateTimeString) {
  const date = new Date(dateTimeString);
  const datePart = date.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
  const timePart = date.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' });
  return `${datePart}, ${timePart}`;
}

function getStatusClass(status) {
  status = status.toLowerCase();
  if (status.includes('scheduled')) return 'status-scheduled';
  if (status.includes('on time')) return 'status-on-time';
  if (status.includes('delay')) return 'status-delayed';
  if (status.includes('cancel')) return 'status-cancelled';
  return 'status-scheduled';
}

// Function to add a message to the chat
function addMessage(message, isUser = false, delay = 0) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const messageElement = document.createElement('div');
      messageElement.classList.add('message', isUser ? 'message-user' : 'message-bot');
      
      // Convert URLs to links
      const processedMessage = message.replace(
        /(https?:\/\/[^\s]+)/g, 
        '<a href="$1" target="_blank">$1</a>'
      );
      
      // Get current time
      const now = new Date();
      const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      
      messageElement.innerHTML = `
        ${processedMessage}
        <div class="message-time">${timeStr}</div>
      `;
      
      chatMessages.appendChild(messageElement);
      chatMessages.scrollTop = chatMessages.scrollHeight;
      resolve();
    }, delay);
  });
}

// Function to display typing indicator
function showTypingIndicator() {
  const typingElement = document.createElement('div');
  typingElement.classList.add('typing-indicator');
  typingElement.innerHTML = `
    <div class="typing-dot"></div>
    <div class="typing-dot"></div>
    <div class="typing-dot"></div>
  `;
  chatMessages.appendChild(typingElement);
  chatMessages.scrollTop = chatMessages.scrollHeight;
  return typingElement;
}

// Function to remove typing indicator
function removeTypingIndicator(indicator) {
  if (indicator && indicator.parentNode) {
    indicator.parentNode.removeChild(indicator);
  }
}

// Function to add quick reply options
function addQuickReplies(options) {
  const quickRepliesElement = document.createElement('div');
  quickRepliesElement.classList.add('quick-replies');
  
  options.forEach(option => {
    const button = document.createElement('button');
    button.classList.add('quick-reply');
    button.textContent = option;
    button.addEventListener('click', () => {
      handleUserInput(option);
    });
    quickRepliesElement.appendChild(button);
  });
  
  chatMessages.appendChild(quickRepliesElement);
  chatMessages.scrollTop = chatMessages.scrollHeight;
  return quickRepliesElement;
}

// Function to create a flight card
function createFlightCard(flight) {
  const card = document.createElement('div');
  card.classList.add('card-container');
  
  // Calculate base price (Economy)
  const basePrice = flight.fare_classes.Economy;
  
  card.innerHTML = `
    <div class="flight-card">
      <div class="flight-card-header">
        <div>${flight.airline_name}</div>
        <div>${flight.flight_number}</div>
      </div>
      <div class="flight-card-body">
        <div class="flight-route">
          <div class="flight-station">
            <div class="station-code">${flight.origin_code}</div>
            <div class="station-city">${flight.origin_city}</div>
          </div>
          <div class="flight-route-line"></div>
          <div class="flight-station">
            <div class="station-code">${flight.destination_code}</div>
            <div class="station-city">${flight.destination_city}</div>
          </div>
        </div>
        <div class="flight-details">
          <div>Departure: ${formatDateTime(flight.departure_datetime)}</div>
          <div>Duration: ${flight.duration}</div>
          <div>Arrival: ${formatDateTime(flight.arrival_datetime)}</div>
        </div>
        <div class="flight-details">
          <div class="status-indicator ${getStatusClass(flight.status)}">
            ${flight.status}
          </div>
          <div>${flight.available_seats} seats available</div>
        </div>
      </div>
      <div class="flight-card-footer">
        <div class="flight-price">From $${basePrice}</div>
        <button class="btn btn--primary btn--sm select-flight" data-flight-id="${flight.id}">Select</button>
      </div>
    </div>
  `;
  
  // Add event listener to the select button
  setTimeout(() => {
    const selectButton = card.querySelector('.select-flight');
    selectButton.addEventListener('click', () => {
      chatState.selectedFlight = flight;
      handleFlightSelection(flight);
    });
  }, 0);
  
  return card;
}

// Function to create fare options
function createFareOptions(flight) {
  const fareOptionsContainer = document.createElement('div');
  fareOptionsContainer.classList.add('fare-options');
  
  Object.entries(flight.fare_classes).forEach(([fareClass, price]) => {
    const fareOption = document.createElement('div');
    fareOption.classList.add('fare-option');
    fareOption.dataset.fareClass = fareClass;
    
    const features = airlineDB.fareFeatures[fareClass].map(feature => 
      `<div class="fare-feature">${feature}</div>`
    ).join('');
    
    fareOption.innerHTML = `
      <div class="fare-header">
        <div class="fare-class">${fareClass}</div>
        <div class="fare-price">$${price}</div>
      </div>
      <div class="fare-features">
        ${features}
      </div>
    `;
    
    fareOption.addEventListener('click', () => {
      // Remove selected class from all options
      document.querySelectorAll('.fare-option').forEach(opt => {
        opt.classList.remove('selected');
      });
      
      // Add selected class to this option
      fareOption.classList.add('selected');
      
      // Update state
      chatState.selectedFareClass = fareClass;
      chatState.selectedFarePrice = price;
    });
    
    fareOptionsContainer.appendChild(fareOption);
  });
  
  const confirmButton = document.createElement('button');
  confirmButton.classList.add('btn', 'btn--primary', 'mt-8');
  confirmButton.textContent = 'Continue with Selected Fare';
  confirmButton.addEventListener('click', () => {
    if (chatState.selectedFareClass) {
      handleFareSelection();
    } else {
      addMessage("Please select a fare class to continue.");
    }
  });
  
  fareOptionsContainer.appendChild(confirmButton);
  return fareOptionsContainer;
}

// Function to create booking details view
function createBookingDetails(booking) {
  const flight = airlineDB.flights.find(f => f.id === booking.flight_id);
  
  const bookingDetails = document.createElement('div');
  bookingDetails.classList.add('booking-details');
  
  bookingDetails.innerHTML = `
    <div class="booking-section">
      <div class="booking-section-title">Booking Information</div>
      <div class="booking-data">
        <div class="booking-item">
          <div class="booking-label">Booking Reference</div>
          <div class="booking-value">${booking.booking_id}</div>
        </div>
        <div class="booking-item">
          <div class="booking-label">Status</div>
          <div class="booking-value">${booking.status}</div>
        </div>
        <div class="booking-item">
          <div class="booking-label">Booking Date</div>
          <div class="booking-value">${formatDate(booking.booking_date)}</div>
        </div>
      </div>
    </div>
    
    <div class="booking-section">
      <div class="booking-section-title">Passenger Information</div>
      <div class="booking-data">
        <div class="booking-item">
          <div class="booking-label">Passenger</div>
          <div class="booking-value">${booking.passenger_name}</div>
        </div>
        <div class="booking-item">
          <div class="booking-label">Email</div>
          <div class="booking-value">${booking.email}</div>
        </div>
      </div>
    </div>
    
    <div class="booking-section">
      <div class="booking-section-title">Flight Information</div>
      <div class="booking-data">
        <div class="booking-item">
          <div class="booking-label">Flight</div>
          <div class="booking-value">${flight.flight_number}</div>
        </div>
        <div class="booking-item">
          <div class="booking-label">Airline</div>
          <div class="booking-value">${flight.airline_name}</div>
        </div>
        <div class="booking-item">
          <div class="booking-label">Route</div>
          <div class="booking-value">${flight.origin_city} (${flight.origin_code}) → ${flight.destination_city} (${flight.destination_code})</div>
        </div>
        <div class="booking-item">
          <div class="booking-label">Departure</div>
          <div class="booking-value">${formatDateTime(flight.departure_datetime)}</div>
        </div>
        <div class="booking-item">
          <div class="booking-label">Arrival</div>
          <div class="booking-value">${formatDateTime(flight.arrival_datetime)}</div>
        </div>
        <div class="booking-item">
          <div class="booking-label">Class</div>
          <div class="booking-value">${booking.fare_class}</div>
        </div>
        <div class="booking-item">
          <div class="booking-label">Seat</div>
          <div class="booking-value">${booking.seat}</div>
        </div>
      </div>
    </div>
    
    <div class="booking-section">
      <div class="booking-section-title">Payment Details</div>
      <div class="booking-data">
        <div class="booking-item">
          <div class="booking-label">Amount</div>
          <div class="booking-value">$${booking.payment.amount} ${booking.payment.currency}</div>
        </div>
        <div class="booking-item">
          <div class="booking-label">Method</div>
          <div class="booking-value">${booking.payment.method}</div>
        </div>
        <div class="booking-item">
          <div class="booking-label">Payment Status</div>
          <div class="booking-value">${booking.payment.status}</div>
        </div>
      </div>
    </div>
    
    <div class="booking-actions mt-8 flex gap-8">
      <button class="btn btn--outline manage-booking" data-action="modify">Modify Booking</button>
      <button class="btn btn--outline manage-booking" data-action="cancel">Cancel Booking</button>
    </div>
  `;
  
  // Add event listeners for action buttons
  setTimeout(() => {
    const actionButtons = bookingDetails.querySelectorAll('.manage-booking');
    actionButtons.forEach(button => {
      button.addEventListener('click', () => {
        const action = button.dataset.action;
        handleBookingAction(booking.booking_id, action);
      });
    });
  }, 0);
  
  return bookingDetails;
}

// Function to create FAQ section
function createFAQSection() {
  const faqContainer = document.createElement('div');
  faqContainer.classList.add('faq-container');
  
  airlineDB.commonQuestions.forEach((faq, index) => {
    const faqItem = document.createElement('div');
    faqItem.classList.add('faq-item');
    
    faqItem.innerHTML = `
      <div class="faq-question" data-index="${index}">
        ${faq.question}
      </div>
      <div class="faq-answer" style="display: none;">
        ${faq.answer}
      </div>
    `;
    
    faqContainer.appendChild(faqItem);
  });
  
  // Add event listeners to questions
  setTimeout(() => {
    const questions = faqContainer.querySelectorAll('.faq-question');
    questions.forEach(question => {
      question.addEventListener('click', () => {
        const answer = question.nextElementSibling;
        if (answer.style.display === 'none') {
          answer.style.display = 'block';
        } else {
          answer.style.display = 'none';
        }
      });
    });
  }, 0);
  
  return faqContainer;
}

// Handle flight search
function handleFlightSearch() {
  chatState.currentFlow = 'flightSearch';
  chatState.currentStep = 'askOrigin';
  chatState.flowData = {};
  
  addMessage("I'll help you find a flight. First, where are you flying from? (city or airport code)")
    .then(() => {
      const originSuggestions = airlineDB.airports.map(airport => airport.city);
      addQuickReplies(originSuggestions.slice(0, 5));
    });
}

// Handle origin selection
function handleOriginSelection(input) {
  const airports = airlineDB.airports;
  const airport = airports.find(a => 
    a.city.toLowerCase() === input.toLowerCase() || 
    a.code.toLowerCase() === input.toLowerCase()
  );
  
  if (airport) {
    chatState.flowData.origin = airport;
    chatState.currentStep = 'askDestination';
    
    addMessage(`Great! Flying from ${airport.city} (${airport.code}). Where would you like to fly to?`)
      .then(() => {
        // Suggest some destinations
        const destinationSuggestions = airports
          .filter(a => a.code !== airport.code)
          .map(a => a.city);
        addQuickReplies(destinationSuggestions.slice(0, 5));
      });
  } else {
    addMessage("I couldn't find that airport or city in our system. Please try again with a different city name or airport code.");
  }
}

// Handle destination selection
function handleDestinationSelection(input) {
  const airports = airlineDB.airports;
  const airport = airports.find(a => 
    a.city.toLowerCase() === input.toLowerCase() || 
    a.code.toLowerCase() === input.toLowerCase()
  );
  
  if (airport) {
    if (airport.code === chatState.flowData.origin.code) {
      addMessage("The origin and destination cannot be the same. Please select a different destination.");
      return;
    }
    
    chatState.flowData.destination = airport;
    chatState.currentStep = 'askDate';
    
    addMessage(`Flying from ${chatState.flowData.origin.city} to ${airport.city}. When would you like to travel? (YYYY-MM-DD or use suggestions below)`)
      .then(() => {
        // Generate some date suggestions (next 5 days)
        const dateSuggestions = [];
        const today = new Date();
        
        for (let i = 1; i <= 5; i++) {
          const futureDate = new Date(today);
          futureDate.setDate(today.getDate() + i);
          const dateStr = futureDate.toISOString().split('T')[0];
          const dateLabel = formatDate(dateStr);
          dateSuggestions.push(dateStr);
        }
        
        addQuickReplies(dateSuggestions);
      });
  } else {
    addMessage("I couldn't find that airport or city in our system. Please try again with a different city name or airport code.");
  }
}

// Handle date selection
function handleDateSelection(input) {
  const datePattern = /^\d{4}-\d{2}-\d{2}$/;
  
  if (datePattern.test(input)) {
    const selectedDate = new Date(input);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (selectedDate < today) {
      addMessage("Please select a date in the future.");
      return;
    }
    
    chatState.flowData.date = input;
    chatState.currentStep = 'askPassengers';
    
    addMessage(`Travel date: ${formatDate(input)}. How many passengers will be traveling?`)
      .then(() => {
        addQuickReplies(['1', '2', '3', '4']);
      });
  } else {
    addMessage("Please enter the date in format YYYY-MM-DD (e.g., 2025-06-20).");
  }
}

// Handle passenger selection
function handlePassengerSelection(input) {
  const passengers = parseInt(input);
  
  if (isNaN(passengers) || passengers < 1 || passengers > 9) {
    addMessage("Please enter a number between 1 and 9.");
    return;
  }
  
  chatState.flowData.passengers = passengers;
  chatState.currentStep = 'searchResults';
  
  // Show loading indicator
  const typingIndicator = showTypingIndicator();
  
  // Simulate search delay
  setTimeout(() => {
    removeTypingIndicator(typingIndicator);
    
    // Perform search and display results
    performFlightSearch();
  }, 1500);
}

// Search for flights
function performFlightSearch() {
  const origin = chatState.flowData.origin.code;
  const destination = chatState.flowData.destination.code;
  
  // Filter flights based on origin and destination
  let matchingFlights = airlineDB.flights.filter(flight => 
    (flight.origin_code === origin && flight.destination_code === destination) ||
    (flight.origin_code === destination && flight.destination_code === origin)
  );
  
  // If no flights match exactly, we'll display all flights for demo purposes
  // In a real app, we'd adjust dates, suggest nearby airports, etc.
  if (matchingFlights.length === 0) {
    // For demo, let's create a new flight on the fly with the requested route
    const newFlightId = 'F' + (100000 + Math.floor(Math.random() * 900000)).toString();
    const randomAirline = airlineDB.airlines[Math.floor(Math.random() * airlineDB.airlines.length)];
    const flightNumber = randomAirline.code + Math.floor(100 + Math.random() * 900).toString();
    
    // Create a demo date based on the requested date
    const demoDate = new Date(chatState.flowData.date);
    const departureHour = 7 + Math.floor(Math.random() * 12); // Between 7am and 7pm
    demoDate.setHours(departureHour, Math.floor(Math.random() * 60), 0, 0);
    
    // Calculate a reasonable flight duration based on airports
    const durationHours = 1 + Math.floor(Math.random() * 10); // Between 1 and 10 hours
    const durationMinutes = Math.floor(Math.random() * 60);
    const durationStr = `${durationHours}h ${durationMinutes}m`;
    
    // Calculate arrival time
    const arrivalDate = new Date(demoDate);
    arrivalDate.setHours(arrivalDate.getHours() + durationHours);
    arrivalDate.setMinutes(arrivalDate.getMinutes() + durationMinutes);
    
    // Create demo flight
    const demoFlight = {
      "id": newFlightId,
      "flight_number": flightNumber,
      "airline_name": randomAirline.name,
      "origin_city": chatState.flowData.origin.city,
      "origin_code": chatState.flowData.origin.code,
      "destination_city": chatState.flowData.destination.city,
      "destination_code": chatState.flowData.destination.code,
      "departure_datetime": demoDate.toISOString().replace('T', ' ').slice(0, 16),
      "arrival_datetime": arrivalDate.toISOString().replace('T', ' ').slice(0, 16),
      "duration": durationStr,
      "status": "Scheduled",
      "available_seats": 25 + Math.floor(Math.random() * 75),
      "fare_classes": {
        "Economy": 200 + Math.floor(Math.random() * 800),
        "Premium Economy": 400 + Math.floor(Math.random() * 800),
        "Business": 800 + Math.floor(Math.random() * 1200),
        "First": 1500 + Math.floor(Math.random() * 2000)
      }
    };
    
    // Add to database and matching flights
    airlineDB.flights.push(demoFlight);
    matchingFlights = [demoFlight];
  }
  
  chatState.searchResults = matchingFlights;
  
  addMessage(`I found ${matchingFlights.length} flights from ${chatState.flowData.origin.city} to ${chatState.flowData.destination.city} on ${formatDate(chatState.flowData.date)} for ${chatState.flowData.passengers} passenger(s). Please select a flight:`)
    .then(() => {
      const resultsContainer = document.createElement('div');
      resultsContainer.classList.add('search-results');
      
      matchingFlights.forEach(flight => {
        resultsContainer.appendChild(createFlightCard(flight));
      });
      
      chatMessages.appendChild(resultsContainer);
      chatMessages.scrollTop = chatMessages.scrollHeight;
    });
}

// Handle flight selection
function handleFlightSelection(flight) {
  chatState.currentStep = 'fareSelection';
  
  addMessage(`You've selected flight ${flight.flight_number} from ${flight.origin_city} to ${flight.destination_city}. Please select your fare class:`)
    .then(() => {
      const fareOptionsContainer = createFareOptions(flight);
      chatMessages.appendChild(fareOptionsContainer);
      chatMessages.scrollTop = chatMessages.scrollHeight;
    });
}

// Handle fare selection
function handleFareSelection() {
  const flight = chatState.selectedFlight;
  const fareClass = chatState.selectedFareClass;
  const price = flight.fare_classes[fareClass];
  const passengers = chatState.flowData.passengers || 1;
  const totalPrice = price * passengers;
  
  chatState.currentStep = 'confirmBooking';
  
  addMessage(`You've selected ${fareClass} class at $${price} per passenger. For ${passengers} passenger(s), the total price is $${totalPrice}.`)
    .then(() => {
      addMessage("Would you like to proceed with booking?")
        .then(() => {
          addQuickReplies(['Yes, complete booking', 'No, cancel']);
        });
    });
}

// Handle booking confirmation
function handleBookingConfirmation(input) {
  if (input.toLowerCase().includes('yes')) {
    chatState.currentStep = 'completed';
    
    // Generate a random booking ID
    const bookingId = 'BK' + Math.floor(100000 + Math.random() * 900000);
    
    // Create a new booking
    const newBooking = {
      booking_id: bookingId,
      passenger_name: "Guest User",
      email: "guest@example.com",
      flight_id: chatState.selectedFlight.id,
      fare_class: chatState.selectedFareClass,
      seat: String.fromCharCode(65 + Math.floor(Math.random() * 6)) + Math.floor(10 + Math.random() * 20),
      booking_date: new Date().toISOString().split('T')[0],
      status: "Confirmed",
      payment: {
        amount: chatState.selectedFlight.fare_classes[chatState.selectedFareClass],
        currency: "USD",
        method: "Credit Card",
        status: "Paid"
      }
    };
    
    // Add booking to database
    airlineDB.bookings.push(newBooking);
    chatState.bookingResult = newBooking;
    
    // Show typing indicator
    const typingIndicator = showTypingIndicator();
    
    // Simulate processing delay
    setTimeout(() => {
      removeTypingIndicator(typingIndicator);
      
      addMessage(`Great news! Your booking is confirmed with reference number <strong>${bookingId}</strong>.`)
        .then(() => {
          return addMessage(`Your flight details: ${chatState.selectedFlight.airline_name} ${chatState.selectedFlight.flight_number}, from ${chatState.selectedFlight.origin_city} to ${chatState.selectedFlight.destination_city}, departing on ${formatDateTime(chatState.selectedFlight.departure_datetime)}.`);
        })
        .then(() => {
          return addMessage("You can check your booking details anytime using the 'Check Booking' option from the main menu with your booking reference.");
        })
        .then(() => {
          return addMessage("Is there anything else I can help you with?");
        })
        .then(() => {
          addQuickReplies(['Check my booking', 'Flight status', 'Main menu']);
        });
    }, 2000);
    
  } else {
    chatState.currentStep = null;
    
    addMessage("No problem, your booking has been cancelled. Is there anything else I can help you with?")
      .then(() => {
        addQuickReplies(['Search flights', 'Check booking', 'Flight status', 'Help']);
      });
  }
}

// Handle booking management
function handleBookingManagement() {
  chatState.currentFlow = 'bookingManagement';
  chatState.currentStep = 'askBookingId';
  
  addMessage("I'll help you find your booking. Please provide your booking reference (e.g., BK12345) or email address.")
    .then(() => {
      // For demo purposes, suggest a sample booking ID
      const sampleBookings = airlineDB.bookings.map(b => b.booking_id);
      if (sampleBookings.length > 0) {
        addQuickReplies(sampleBookings);
      }
    });
}

// Handle booking lookup
function handleBookingLookup(input) {
  // Check if input matches booking ID or email
  const booking = airlineDB.bookings.find(b => 
    b.booking_id.toLowerCase() === input.toLowerCase() ||
    b.email.toLowerCase() === input.toLowerCase()
  );
  
  if (booking) {
    chatState.currentStep = 'bookingDetails';
    
    addMessage(`I found your booking with reference ${booking.booking_id}:`)
      .then(() => {
        const bookingDetailsElement = createBookingDetails(booking);
        chatMessages.appendChild(bookingDetailsElement);
        chatMessages.scrollTop = chatMessages.scrollHeight;
      });
  } else {
    addMessage("I couldn't find a booking with that reference or email. Please check and try again, or use one of the sample bookings for this demo.")
      .then(() => {
        // For demo purposes, suggest a sample booking ID again
        const sampleBookings = airlineDB.bookings.map(b => b.booking_id);
        if (sampleBookings.length > 0) {
          addQuickReplies(sampleBookings);
        }
      });
  }
}

// Handle booking action (modify/cancel)
function handleBookingAction(bookingId, action) {
  if (action === 'modify') {
    addMessage("To modify your booking, please contact our support team at support@skylineair.example or call +1-800-SKY-LINE. For this demo, no actual changes will be made.")
      .then(() => {
        return addMessage("Is there anything else I can help you with?");
      })
      .then(() => {
        addQuickReplies(['Search flights', 'Check another booking', 'Main menu']);
      });
  } else if (action === 'cancel') {
    addMessage("To cancel your booking, please confirm by typing 'CONFIRM CANCEL'. Please note that cancellation fees may apply. For this demo, no actual changes will be made.")
      .then(() => {
        chatState.currentStep = 'confirmCancel';
        chatState.flowData.bookingToCancel = bookingId;
      });
  }
}

// Handle flight status check
function handleFlightStatus() {
  chatState.currentFlow = 'flightStatus';
  chatState.currentStep = 'askFlightNumber';
  
  addMessage("I'll help you check the status of your flight. Please enter the flight number (e.g., AA101).")
    .then(() => {
      // Suggest sample flight numbers
      const flightNumbers = airlineDB.flights.map(f => f.flight_number);
      addQuickReplies(flightNumbers);
    });
}

// Handle flight number lookup
function handleFlightLookup(input) {
  const flight = airlineDB.flights.find(f => 
    f.flight_number.toLowerCase() === input.toLowerCase()
  );
  
  if (flight) {
    // Assign a random status for demo purposes
    const statuses = ["Scheduled", "On Time", "Delayed (20 minutes)", "Boarding", "Departed"];
    flight.status = statuses[Math.floor(Math.random() * statuses.length)];
    
    chatState.currentStep = 'flightDetails';
    
    addMessage(`Here's the current status for ${flight.flight_number}:`)
      .then(() => {
        const flightCard = createFlightCard(flight);
        chatMessages.appendChild(flightCard);
        chatMessages.scrollTop = chatMessages.scrollHeight;
        
        // Remove the select button since it's not needed here
        const selectButton = flightCard.querySelector('.select-flight');
        if (selectButton) selectButton.remove();
      })
      .then(() => {
        addMessage("Is there anything else I can help you with?")
          .then(() => {
            addQuickReplies(['Check another flight', 'Search flights', 'Main menu']);
          });
      });
  } else {
    addMessage("I couldn't find a flight with that number. Please check and try again, or use one of the sample flight numbers.")
      .then(() => {
        // Suggest flight numbers again
        const flightNumbers = airlineDB.flights.map(f => f.flight_number);
        addQuickReplies(flightNumbers);
      });
  }
}

// Handle help request
function handleHelpRequest() {
  chatState.currentFlow = 'help';
  
  addMessage("Here are some frequently asked questions that might help you:")
    .then(() => {
      const faqSection = createFAQSection();
      chatMessages.appendChild(faqSection);
      chatMessages.scrollTop = chatMessages.scrollHeight;
    })
    .then(() => {
      return addMessage("If you don't see your question here, please tell me what you need help with.");
    })
    .then(() => {
      addQuickReplies(['Search flights', 'Check booking', 'Flight status', 'Main menu']);
    });
}

// Process user input based on current flow and step
function processUserInput(input) {
  if (!chatState.currentFlow) {
    // Identify the desired flow from the input
    if (input.toLowerCase().includes('search') || input.toLowerCase().includes('flight') || input.toLowerCase().includes('book')) {
      handleFlightSearch();
    } else if (input.toLowerCase().includes('booking') || input.toLowerCase().includes('reservation')) {
      handleBookingManagement();
    } else if (input.toLowerCase().includes('status')) {
      handleFlightStatus();
    } else if (input.toLowerCase().includes('help') || input.toLowerCase().includes('question') || input.toLowerCase().includes('faq')) {
      handleHelpRequest();
    } else {
      // Default to main menu
      showMainMenu();
    }
    return;
  }
  
  // Process based on current flow
  switch (chatState.currentFlow) {
    case 'flightSearch':
      handleFlightSearchFlow(input);
      break;
      
    case 'bookingManagement':
      handleBookingManagementFlow(input);
      break;
      
    case 'flightStatus':
      handleFlightStatusFlow(input);
      break;
      
    case 'help':
      // Most help interactions can lead back to main menu options
      if (input.toLowerCase().includes('search') || input.toLowerCase().includes('flight')) {
        handleFlightSearch();
      } else if (input.toLowerCase().includes('booking')) {
        handleBookingManagement();
      } else if (input.toLowerCase().includes('status')) {
        handleFlightStatus();
      } else if (input.toLowerCase().includes('menu')) {
        showMainMenu();
      } else {
        addMessage("I'm not sure how to help with that specific question. Would you like to search for flights, check a booking, or check flight status?")
          .then(() => {
            addQuickReplies(['Search flights', 'Check booking', 'Flight status', 'Main menu']);
          });
      }
      break;
      
    default:
      showMainMenu();
  }
}

// Handle flight search flow steps
function handleFlightSearchFlow(input) {
  switch (chatState.currentStep) {
    case 'askOrigin':
      handleOriginSelection(input);
      break;
      
    case 'askDestination':
      handleDestinationSelection(input);
      break;
      
    case 'askDate':
      handleDateSelection(input);
      break;
      
    case 'askPassengers':
      handlePassengerSelection(input);
      break;
      
    case 'confirmBooking':
      handleBookingConfirmation(input);
      break;
      
    case 'noResults':
    case 'completed':
      if (input.toLowerCase().includes('search') || input.toLowerCase().includes('again')) {
        handleFlightSearch();
      } else if (input.toLowerCase().includes('menu')) {
        showMainMenu();
      } else if (input.toLowerCase().includes('booking') && input.toLowerCase().includes('check')) {
        handleBookingManagement();
      } else if (input.toLowerCase().includes('status')) {
        handleFlightStatus();
      } else {
        showMainMenu();
      }
      break;
  }
}

// Handle booking management flow steps
function handleBookingManagementFlow(input) {
  switch (chatState.currentStep) {
    case 'askBookingId':
      handleBookingLookup(input);
      break;
      
    case 'confirmCancel':
      if (input === 'CONFIRM CANCEL') {
        const bookingId = chatState.flowData.bookingToCancel;
        const bookingIndex = airlineDB.bookings.findIndex(b => b.booking_id === bookingId);
        
        if (bookingIndex !== -1) {
          // For demo purposes, we'll just say it's cancelled without actually removing it
          airlineDB.bookings[bookingIndex].status = 'Cancelled';
          
          addMessage(`Your booking ${bookingId} has been cancelled. A confirmation email will be sent to your registered email address.`)
            .then(() => {
              return addMessage("Is there anything else I can help you with?");
            })
            .then(() => {
              addQuickReplies(['Search flights', 'Check another booking', 'Main menu']);
            });
        }
      } else {
        addMessage("Cancellation not confirmed. Your booking remains active.")
          .then(() => {
            addQuickReplies(['Check another booking', 'Main menu']);
          });
      }
      break;
      
    case 'bookingDetails':
      if (input.toLowerCase().includes('search')) {
        handleFlightSearch();
      } else if (input.toLowerCase().includes('check') && input.toLowerCase().includes('another')) {
        handleBookingManagement();
      } else if (input.toLowerCase().includes('menu')) {
        showMainMenu();
      } else {
        addMessage("What would you like to do next?")
          .then(() => {
            addQuickReplies(['Check another booking', 'Search flights', 'Main menu']);
          });
      }
      break;
  }
}

// Handle flight status flow steps
function handleFlightStatusFlow(input) {
  switch (chatState.currentStep) {
    case 'askFlightNumber':
      handleFlightLookup(input);
      break;
      
    case 'flightDetails':
      if (input.toLowerCase().includes('check') && input.toLowerCase().includes('another')) {
        handleFlightStatus();
      } else if (input.toLowerCase().includes('search')) {
        handleFlightSearch();
      } else if (input.toLowerCase().includes('menu')) {
        showMainMenu();
      } else {
        addMessage("What would you like to do next?")
          .then(() => {
            addQuickReplies(['Check another flight', 'Search flights', 'Main menu']);
          });
      }
      break;
  }
}

// Show main menu
function showMainMenu() {
  chatState.currentFlow = null;
  chatState.currentStep = null;
  chatState.flowData = {};
  
  addMessage("What can I help you with today?")
    .then(() => {
      addQuickReplies([
        'Search flights', 
        'Check booking', 
        'Flight status', 
        'Help / FAQ'
      ]);
    });
}

// Handle user input submission
function handleUserInput(input) {
  if (chatState.isWaitingForResponse) {
    return;
  }
  
  chatState.isWaitingForResponse = true;
  
  // Add user message to chat
  addMessage(input, true)
    .then(() => {
      // Store in history
      chatState.history.push({ role: 'user', message: input });
      
      // Show typing indicator
      const typingIndicator = showTypingIndicator();
      
      // Process input after a short delay to simulate thinking
      setTimeout(() => {
        removeTypingIndicator(typingIndicator);
        processUserInput(input);
        chatState.isWaitingForResponse = false;
      }, 500);
    });
}

// Event listener for chat form submission
chatForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const input = userInput.value.trim();
  if (input) {
    handleUserInput(input);
    userInput.value = '';
  }
});

// Event listener for quick action buttons
quickActionButtons.forEach(button => {
  button.addEventListener('click', () => {
    const action = button.dataset.action;
    
    switch(action) {
      case 'search-flights':
        handleFlightSearch();
        break;
      case 'check-booking':
        handleBookingManagement();
        break;
      case 'flight-status':
        handleFlightStatus();
        break;
      case 'help':
        handleHelpRequest();
        break;
    }
  });
});

// Event listener for clear chat button
clearChatButton.addEventListener('click', () => {
  chatMessages.innerHTML = '';
  chatState.currentFlow = null;
  chatState.currentStep = null;
  chatState.flowData = {};
  chatState.history = [];
  
  // Show welcome message again
  welcomeUser();
});

// Flow diagram toggle
document.querySelector('.close-diagram').addEventListener('click', () => {
  flowDiagram.classList.remove('visible');
});

// Initialize the chat with a welcome message
function welcomeUser() {
  addMessage("👋 Welcome to SkyLine Airlines! I'm your virtual assistant, ready to help you with flight bookings, managing your reservations, checking flight status, and answering your questions.")
    .then(() => {
      return addMessage("How can I assist you today?");
    })
    .then(() => {
      addQuickReplies([
        'Search flights',
        'Check booking',
        'Flight status',
        'Help / FAQ'
      ]);
    });
}

// Start the chat when page loads
document.addEventListener('DOMContentLoaded', () => {
  welcomeUser();
});