# Create CSV exports of our synthetic airline database
import pandas as pd
import json

# Load the database
with open('airline_database.json', 'r') as f:
    airline_db = json.load(f)

# Create CSV files for each entity
print("Creating CSV exports of the airline database...")

# Airports CSV
airports_df = pd.DataFrame(airline_db['airports'])
airports_df.to_csv('airports.csv', index=False)
print(f"Airports CSV created with {len(airports_df)} records")
print(airports_df.head())

print("\n" + "="*50 + "\n")

# Airlines CSV
airlines_df = pd.DataFrame(airline_db['airlines'])
airlines_df.to_csv('airlines.csv', index=False)
print(f"Airlines CSV created with {len(airlines_df)} records")
print(airlines_df.head())

print("\n" + "="*50 + "\n")

# Aircraft Types CSV
aircraft_df = pd.DataFrame(airline_db['aircraft_types'])
aircraft_df.to_csv('aircraft_types.csv', index=False)
print(f"Aircraft Types CSV created with {len(aircraft_df)} records")
print(aircraft_df.head())

print("\n" + "="*50 + "\n")

# Passengers CSV (first 10 records for display)
passengers_df = pd.DataFrame(airline_db['passengers'])
passengers_df.to_csv('passengers.csv', index=False)
print(f"Passengers CSV created with {len(passengers_df)} records")
print("Sample passengers:")
print(passengers_df.head())

print("\n" + "="*50 + "\n")

# Flights CSV - need to flatten the fare_classes
flights_data = []
for flight in airline_db['flights']:
    flight_record = flight.copy()
    # Flatten fare classes
    flight_record['economy_fare'] = flight['fare_classes']['Economy']
    flight_record['premium_economy_fare'] = flight['fare_classes']['Premium Economy']
    flight_record['business_fare'] = flight['fare_classes']['Business']
    flight_record['first_fare'] = flight['fare_classes']['First']
    # Remove the nested fare_classes
    del flight_record['fare_classes']
    flights_data.append(flight_record)

flights_df = pd.DataFrame(flights_data)
flights_df.to_csv('flights.csv', index=False)
print(f"Flights CSV created with {len(flights_df)} records")
print("Sample flights:")
print(flights_df[['flight_number', 'airline_name', 'origin_city', 'destination_city', 'departure_datetime', 'economy_fare']].head())

print("\n" + "="*50 + "\n")

# Bookings CSV
bookings_df = pd.DataFrame(airline_db['bookings'])
bookings_df.to_csv('bookings.csv', index=False)
print(f"Bookings CSV created with {len(bookings_df)} records")
print("Sample bookings:")
print(bookings_df[['id', 'flight_id', 'passenger_id', 'fare_class', 'total_amount', 'booking_status']].head())

print("\n" + "="*50 + "\n")

# Create a summary statistics file
summary_stats = {
    'Entity': ['Airports', 'Airlines', 'Aircraft Types', 'Passengers', 'Flights', 'Bookings'],
    'Count': [
        len(airline_db['airports']),
        len(airline_db['airlines']),
        len(airline_db['aircraft_types']),
        len(airline_db['passengers']),
        len(airline_db['flights']),
        len(airline_db['bookings'])
    ],
    'Description': [
        'Airport locations and codes',
        'Airline companies and information',
        'Aircraft models and capacities',
        'Passenger personal information',
        'Flight schedules and pricing',
        'Flight reservations and bookings'
    ]
}

summary_df = pd.DataFrame(summary_stats)
summary_df.to_csv('database_summary.csv', index=False)
print("Database Summary:")
print(summary_df)

print("\n" + "="*50 + "\n")

# Create a routes analysis
routes_analysis = {}
for flight in airline_db['flights']:
    route = f"{flight['origin_city']} to {flight['destination_city']}"
    if route not in routes_analysis:
        routes_analysis[route] = {
            'route': route,
            'origin_code': flight['origin_code'],
            'destination_code': flight['destination_code'],
            'flight_count': 0,
            'airlines': set(),
            'min_price': float('inf'),
            'max_price': 0,
            'avg_duration': []
        }
    
    routes_analysis[route]['flight_count'] += 1
    routes_analysis[route]['airlines'].add(flight['airline_name'])
    routes_analysis[route]['min_price'] = min(routes_analysis[route]['min_price'], flight['fare_classes']['Economy'])
    routes_analysis[route]['max_price'] = max(routes_analysis[route]['max_price'], flight['fare_classes']['Economy'])
    
    # Parse duration
    duration_parts = flight['duration'].split('h')
    hours = int(duration_parts[0])
    minutes = int(duration_parts[1].split('m')[0]) if 'm' in duration_parts[1] else 0
    total_minutes = hours * 60 + minutes
    routes_analysis[route]['avg_duration'].append(total_minutes)

# Convert to DataFrame
routes_data = []
for route_info in routes_analysis.values():
    avg_duration_minutes = sum(route_info['avg_duration']) / len(route_info['avg_duration'])
    avg_duration_hours = avg_duration_minutes / 60
    
    routes_data.append({
        'route': route_info['route'],
        'origin_code': route_info['origin_code'],
        'destination_code': route_info['destination_code'],
        'flight_count': route_info['flight_count'],
        'airline_count': len(route_info['airlines']),
        'airlines': ', '.join(route_info['airlines']),
        'min_economy_fare': route_info['min_price'],
        'max_economy_fare': route_info['max_price'],
        'avg_duration_hours': round(avg_duration_hours, 1)
    })

routes_df = pd.DataFrame(routes_data)
routes_df = routes_df.sort_values('flight_count', ascending=False)
routes_df.to_csv('routes_analysis.csv', index=False)
print("Routes Analysis (Top 10 most popular routes):")
print(routes_df.head(10))

print(f"\nAll CSV files have been created successfully!")
print("Files created:")
print("- airports.csv")
print("- airlines.csv") 
print("- aircraft_types.csv")
print("- passengers.csv")
print("- flights.csv")
print("- bookings.csv")
print("- database_summary.csv")
print("- routes_analysis.csv")