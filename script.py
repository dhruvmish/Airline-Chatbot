# Let's create a synthetic airline database
import json
import random
from datetime import datetime, timedelta
import pandas as pd

# Create airports
airports = [
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
]

# Create airlines
airlines = [
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
]

# Create aircraft types
aircraft_types = [
    {"code": "B737", "name": "Boeing 737", "capacity": 180},
    {"code": "B747", "name": "Boeing 747", "capacity": 410},
    {"code": "B777", "name": "Boeing 777", "capacity": 300},
    {"code": "B787", "name": "Boeing 787", "capacity": 250},
    {"code": "A320", "name": "Airbus A320", "capacity": 180},
    {"code": "A330", "name": "Airbus A330", "capacity": 290},
    {"code": "A350", "name": "Airbus A350", "capacity": 325},
    {"code": "A380", "name": "Airbus A380", "capacity": 525}
]

# Create passengers (this will be a large dataset, so limiting to 100 for example)
first_names = ["John", "Emma", "David", "Sophia", "Michael", "Olivia", "James", "Ava", "Robert", "Isabella", 
               "William", "Mia", "Joseph", "Charlotte", "Thomas", "Amelia", "Charles", "Harper", "Daniel", "Evelyn",
               "Matthew", "Abigail", "Anthony", "Emily", "Mark", "Elizabeth", "Donald", "Sofia", "Steven", "Avery",
               "Paul", "Ella", "Andrew", "Scarlett", "Joshua", "Grace", "Kenneth", "Chloe", "Kevin", "Victoria",
               "Brian", "Riley", "George", "Aria", "Edward", "Lily", "Ronald", "Aubrey", "Timothy", "Zoey"]

last_names = ["Smith", "Johnson", "Williams", "Jones", "Brown", "Davis", "Miller", "Wilson", "Moore", "Taylor",
              "Anderson", "Thomas", "Jackson", "White", "Harris", "Martin", "Thompson", "Garcia", "Martinez", "Robinson",
              "Clark", "Rodriguez", "Lewis", "Lee", "Walker", "Hall", "Allen", "Young", "Hernandez", "King",
              "Wright", "Lopez", "Hill", "Scott", "Green", "Adams", "Baker", "Gonzalez", "Nelson", "Carter",
              "Mitchell", "Perez", "Roberts", "Turner", "Phillips", "Campbell", "Parker", "Evans", "Edwards", "Collins"]

passenger_ids = []
passengers = []

for i in range(1, 101):
    passenger_id = f"P{str(i).zfill(5)}"
    passenger_ids.append(passenger_id)
    first_name = random.choice(first_names)
    last_name = random.choice(last_names)
    email = f"{first_name.lower()}.{last_name.lower()}@example.com"
    dob = datetime.now() - timedelta(days=random.randint(365*18, 365*80))
    dob_str = dob.strftime("%Y-%m-%d")
    passengers.append({
        "id": passenger_id,
        "first_name": first_name,
        "last_name": last_name,
        "email": email,
        "phone": f"+1-{random.randint(100, 999)}-{random.randint(100, 999)}-{random.randint(1000, 9999)}",
        "date_of_birth": dob_str,
        "nationality": random.choice(["USA", "UK", "France", "UAE", "Japan", "Singapore", "Australia", "India", "Canada", "Germany"])
    })

# Create flight schedules (500 flights over the next 30 days)
flights = []
flight_ids = []
today = datetime.now().replace(hour=0, minute=0, second=0, microsecond=0)

def random_time():
    hour = random.randint(0, 23)
    minute = random.choice([0, 15, 30, 45])
    return f"{hour:02d}:{minute:02d}"

for i in range(1, 501):
    flight_id = f"F{str(i).zfill(5)}"
    flight_ids.append(flight_id)
    
    airline = random.choice(airlines)
    origin_airport = random.choice(airports)
    destination_airport = random.choice([a for a in airports if a != origin_airport])
    aircraft = random.choice(aircraft_types)
    
    departure_date = today + timedelta(days=random.randint(1, 30))
    departure_time = random_time()
    departure_datetime = f"{departure_date.strftime('%Y-%m-%d')} {departure_time}"
    
    # Calculate flight duration (roughly based on distance - simplified)
    if origin_airport["country"] == destination_airport["country"]:
        duration_hours = random.randint(1, 3)
    else:
        duration_hours = random.randint(3, 14)
    
    duration = f"{duration_hours}h {random.randint(0, 59)}m"
    
    # Calculate arrival time
    departure_dt = datetime.strptime(departure_datetime, "%Y-%m-%d %H:%M")
    arrival_dt = departure_dt + timedelta(hours=duration_hours, minutes=random.randint(0, 59))
    arrival_datetime = arrival_dt.strftime("%Y-%m-%d %H:%M")
    
    # Determine flight status (most are scheduled, some are in other states)
    status_options = ["Scheduled", "Scheduled", "Scheduled", "Scheduled", "Scheduled", 
                     "Boarding", "In Air", "Landed", "Delayed", "Cancelled"]
    status = random.choice(status_options)
    
    # Calculate fare
    base_fare = duration_hours * 50 + random.randint(50, 200)
    
    # Add fare classes
    fare_classes = {
        "Economy": base_fare,
        "Premium Economy": int(base_fare * 1.5),
        "Business": int(base_fare * 2.5),
        "First": int(base_fare * 4)
    }
    
    flights.append({
        "id": flight_id,
        "flight_number": f"{airline['code']}{random.randint(100, 999)}",
        "airline_code": airline["code"],
        "airline_name": airline["name"],
        "origin_code": origin_airport["code"],
        "origin_name": origin_airport["name"],
        "origin_city": origin_airport["city"],
        "origin_country": origin_airport["country"],
        "destination_code": destination_airport["code"],
        "destination_name": destination_airport["name"],
        "destination_city": destination_airport["city"],
        "destination_country": destination_airport["country"],
        "departure_datetime": departure_datetime,
        "arrival_datetime": arrival_datetime,
        "duration": duration,
        "aircraft_type": aircraft["code"],
        "aircraft_name": aircraft["name"],
        "status": status,
        "fare_classes": fare_classes,
        "total_seats": aircraft["capacity"],
        "available_seats": random.randint(0, aircraft["capacity"])
    })

# Create bookings (300 bookings)
bookings = []
booking_ids = []

for i in range(1, 301):
    booking_id = f"B{str(i).zfill(5)}"
    booking_ids.append(booking_id)
    
    flight = random.choice(flights)
    passenger = random.choice(passengers)
    
    # Determine booking date (before flight departure)
    flight_departure = datetime.strptime(flight["departure_datetime"], "%Y-%m-%d %H:%M")
    days_before = random.randint(1, 60)
    booking_date = flight_departure - timedelta(days=days_before)
    
    # Fare class selection
    fare_class = random.choice(list(flight["fare_classes"].keys()))
    fare_amount = flight["fare_classes"][fare_class]
    
    # Add taxes and fees
    taxes = int(fare_amount * 0.12)
    fees = random.randint(15, 50)
    total_amount = fare_amount + taxes + fees
    
    # Payment status and method
    payment_status = random.choice(["Paid", "Paid", "Paid", "Paid", "Pending", "Failed"])
    payment_method = random.choice(["Credit Card", "Credit Card", "Credit Card", "Debit Card", "PayPal", "Bank Transfer"])
    
    # Booking status
    booking_status = "Confirmed" if payment_status == "Paid" else "Pending"
    if flight["status"] == "Cancelled":
        booking_status = "Cancelled"
    
    bookings.append({
        "id": booking_id,
        "flight_id": flight["id"],
        "passenger_id": passenger["id"],
        "booking_date": booking_date.strftime("%Y-%m-%d"),
        "fare_class": fare_class,
        "fare_amount": fare_amount,
        "taxes": taxes,
        "fees": fees,
        "total_amount": total_amount,
        "currency": "USD",
        "payment_status": payment_status,
        "payment_method": payment_method,
        "booking_status": booking_status,
        "seat_number": f"{random.choice('ABCDEF')}{random.randint(1, 50)}",
        "special_requests": random.choice([None, None, None, "Wheelchair assistance", "Vegetarian meal", "Extra legroom", "Infant bassinet", "Medical assistance"])
    })

# Create the complete database
airline_database = {
    "airports": airports,
    "airlines": airlines,
    "aircraft_types": aircraft_types,
    "passengers": passengers,
    "flights": flights,
    "bookings": bookings
}

# Create flight search function
def search_flights(origin, destination, date, num_passengers=1):
    matching_flights = []
    search_date = datetime.strptime(date, "%Y-%m-%d").date()
    
    for flight in flights:
        flight_departure = datetime.strptime(flight["departure_datetime"], "%Y-%m-%d %H:%M")
        flight_date = flight_departure.date()
        
        if (flight["origin_code"] == origin or flight["origin_city"] == origin) and \
           (flight["destination_code"] == destination or flight["destination_city"] == destination) and \
           flight_date == search_date and \
           flight["available_seats"] >= num_passengers and \
           flight["status"] not in ["Cancelled"]:
            matching_flights.append(flight)
    
    return matching_flights

# Write the database to JSON files
with open('airline_database.json', 'w') as f:
    json.dump(airline_database, f, indent=2)

# Show a sample of the data
print("Sample airports:")
pd.DataFrame(airports[:3])