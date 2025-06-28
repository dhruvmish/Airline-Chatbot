import json
import pandas as pd
from datetime import datetime

# Load the synthetic airline database
with open('airline_database.json', 'r') as f:
    airline_db = json.load(f)

# Create helper functions for our chatbot

def search_flights(origin, destination, date, passengers=1, preferred_airline=None, max_results=5):
    """
    Search for flights based on criteria
    """
    matching_flights = []
    search_date = datetime.strptime(date, "%Y-%m-%d").date()
    
    for flight in airline_db["flights"]:
        # Parse flight departure date for comparison
        flight_departure = datetime.strptime(flight["departure_datetime"], "%Y-%m-%d %H:%M")
        flight_date = flight_departure.date()
        
        # Check if flight matches search criteria
        origin_match = (flight["origin_code"].lower() == origin.lower() or 
                       flight["origin_city"].lower() == origin.lower())
        
        destination_match = (flight["destination_code"].lower() == destination.lower() or 
                            flight["destination_city"].lower() == destination.lower())
        
        date_match = flight_date == search_date
        seats_available = flight["available_seats"] >= passengers
        not_cancelled = flight["status"] != "Cancelled"
        
        airline_match = True
        if preferred_airline:
            airline_match = (flight["airline_code"].lower() == preferred_airline.lower() or 
                            flight["airline_name"].lower() == preferred_airline.lower())
        
        if origin_match and destination_match and date_match and seats_available and not_cancelled and airline_match:
            # Create a simplified flight object for display
            simple_flight = {
                "id": flight["id"],
                "flight_number": flight["flight_number"],
                "airline": flight["airline_name"],
                "origin": f"{flight['origin_city']} ({flight['origin_code']})",
                "destination": f"{flight['destination_city']} ({flight['destination_code']})",
                "departure": flight["departure_datetime"],
                "arrival": flight["arrival_datetime"],
                "duration": flight["duration"],
                "price": flight["fare_classes"]["Economy"],  # Default to economy price
                "available_seats": flight["available_seats"]
            }
            matching_flights.append(simple_flight)
    
    # Sort by price
    matching_flights.sort(key=lambda x: x["price"])
    
    # Return top results
    return matching_flights[:max_results]

def get_flight_details(flight_id):
    """
    Get detailed information about a specific flight
    """
    for flight in airline_db["flights"]:
        if flight["id"] == flight_id:
            return flight
    return None

def get_fare_options(flight_id):
    """
    Get fare options for a specific flight
    """
    flight = get_flight_details(flight_id)
    if not flight:
        return None
    
    fare_options = []
    for fare_class, price in flight["fare_classes"].items():
        fare_options.append({
            "class": fare_class,
            "price": price,
            "features": get_fare_features(fare_class)
        })
    
    return fare_options

def get_fare_features(fare_class):
    """
    Get features included in each fare class
    """
    features = {
        "Economy": ["Standard seat", "1 carry-on bag", "Meal for long flights"],
        "Premium Economy": ["Extra legroom", "2 carry-on bags", "Meal included", "Priority boarding"],
        "Business": ["Lie-flat seat", "Lounge access", "Premium dining", "2 checked bags", "Priority check-in"],
        "First": ["Private suite", "Exclusive lounge", "Gourmet dining", "Personal concierge", "Chauffeur service"]
    }
    
    return features.get(fare_class, [])

def create_booking(flight_id, passenger_info, fare_class="Economy"):
    """
    Create a new booking
    """
    flight = get_flight_details(flight_id)
    if not flight or flight["available_seats"] <= 0:
        return {"success": False, "message": "Flight not available or sold out"}
    
    # Generate new booking ID
    new_booking_id = f"B{str(len(airline_db['bookings']) + 1).zfill(5)}"
    
    # Create new passenger if needed or use existing
    passenger_id = None
    for passenger in airline_db["passengers"]:
        if passenger["email"].lower() == passenger_info["email"].lower():
            passenger_id = passenger["id"]
            break
    
    if not passenger_id:
        passenger_id = f"P{str(len(airline_db['passengers']) + 1).zfill(5)}"
        new_passenger = {
            "id": passenger_id,
            "first_name": passenger_info["first_name"],
            "last_name": passenger_info["last_name"],
            "email": passenger_info["email"],
            "phone": passenger_info.get("phone", ""),
            "date_of_birth": passenger_info.get("date_of_birth", ""),
            "nationality": passenger_info.get("nationality", "")
        }
        airline_db["passengers"].append(new_passenger)
    
    # Calculate fare
    fare_amount = flight["fare_classes"][fare_class]
    taxes = int(fare_amount * 0.12)
    fees = 25  # Fixed fees
    total_amount = fare_amount + taxes + fees
    
    # Create booking
    new_booking = {
        "id": new_booking_id,
        "flight_id": flight_id,
        "passenger_id": passenger_id,
        "booking_date": datetime.now().strftime("%Y-%m-%d"),
        "fare_class": fare_class,
        "fare_amount": fare_amount,
        "taxes": taxes,
        "fees": fees,
        "total_amount": total_amount,
        "currency": "USD",
        "payment_status": "Pending",
        "payment_method": None,
        "booking_status": "Pending",
        "seat_number": None,  # Will be assigned later
        "special_requests": passenger_info.get("special_requests", None)
    }
    
    airline_db["bookings"].append(new_booking)
    
    # Update available seats
    for flight_obj in airline_db["flights"]:
        if flight_obj["id"] == flight_id:
            flight_obj["available_seats"] -= 1
            break
    
    return {
        "success": True,
        "booking_id": new_booking_id,
        "flight": {
            "flight_number": flight["flight_number"],
            "airline": flight["airline_name"],
            "origin": f"{flight['origin_city']} ({flight['origin_code']})",
            "destination": f"{flight['destination_city']} ({flight['destination_code']})",
            "departure": flight["departure_datetime"]
        },
        "passenger": {
            "name": f"{passenger_info['first_name']} {passenger_info['last_name']}",
            "email": passenger_info["email"]
        },
        "fare_class": fare_class,
        "total_amount": total_amount,
        "currency": "USD",
        "booking_status": "Pending"
    }

def get_booking(booking_id=None, email=None, last_name=None):
    """
    Retrieve booking information by ID or passenger details
    """
    matching_bookings = []
    
    for booking in airline_db["bookings"]:
        if booking_id and booking["id"] == booking_id:
            matching_bookings.append(get_booking_details(booking))
        elif email and last_name:
            # Find passenger
            passenger = next((p for p in airline_db["passengers"] if p["id"] == booking["passenger_id"]), None)
            if passenger and passenger["email"].lower() == email.lower() and passenger["last_name"].lower() == last_name.lower():
                matching_bookings.append(get_booking_details(booking))
    
    return matching_bookings

def get_booking_details(booking):
    """
    Get detailed booking information including flight and passenger details
    """
    flight = next((f for f in airline_db["flights"] if f["id"] == booking["flight_id"]), None)
    passenger = next((p for p in airline_db["passengers"] if p["id"] == booking["passenger_id"]), None)
    
    if not flight or not passenger:
        return None
    
    return {
        "booking_id": booking["id"],
        "booking_status": booking["booking_status"],
        "payment_status": booking["payment_status"],
        "flight": {
            "flight_number": flight["flight_number"],
            "airline": flight["airline_name"],
            "origin": f"{flight['origin_city']} ({flight['origin_code']})",
            "destination": f"{flight['destination_city']} ({flight['destination_code']})",
            "departure": flight["departure_datetime"],
            "arrival": flight["arrival_datetime"],
            "status": flight["status"]
        },
        "passenger": {
            "name": f"{passenger['first_name']} {passenger['last_name']}",
            "email": passenger["email"]
        },
        "fare_class": booking["fare_class"],
        "seat_number": booking["seat_number"],
        "total_amount": booking["total_amount"],
        "currency": booking["currency"],
        "special_requests": booking["special_requests"]
    }

# Test our functions
print("Testing flight search function...")
test_flights = search_flights("New York", "London", "2025-06-15", 1)
print(f"Found {len(test_flights)} flights from New York to London on 2025-06-15")
if test_flights:
    print("\nSample flight:")
    first_flight = test_flights[0]
    for key, value in first_flight.items():
        print(f"{key}: {value}")
    
    print("\nTesting fare options function...")
    fare_options = get_fare_options(first_flight["id"])
    print("Fare options:")
    for option in fare_options:
        print(f"{option['class']}: ${option['price']} - Features: {', '.join(option['features'])}")
    
    print("\nTesting booking creation...")
    booking_result = create_booking(
        first_flight["id"],
        {
            "first_name": "Jane",
            "last_name": "Doe",
            "email": "jane.doe@example.com",
            "phone": "+1-555-123-4567",
            "special_requests": "Vegetarian meal"
        },
        "Business"
    )
    
    if booking_result["success"]:
        print(f"Booking created successfully with ID: {booking_result['booking_id']}")
        print("Booking details:")
        for key, value in booking_result.items():
            if key not in ["success"]:
                print(f"{key}: {value}")
    else:
        print(f"Booking failed: {booking_result['message']}")
    
    print("\nTesting booking retrieval...")
    retrieved_booking = get_booking(email="jane.doe@example.com", last_name="Doe")
    if retrieved_booking:
        print("Retrieved booking:")
        for key, value in retrieved_booking[0].items():
            print(f"{key}: {value}")
    else:
        print("No booking found")
else:
    print("No flights found. Try different search parameters.")