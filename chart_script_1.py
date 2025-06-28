import plotly.graph_objects as go
import pandas as pd

# Create data for the architecture diagram using a scatter plot approach
components_data = [
    # User Interface Layer
    {'name': 'Web Browser', 'x': 1, 'y': 5, 'layer': 'UI Layer', 'color': '#1FB8CD'},
    {'name': 'Mobile App', 'x': 2, 'y': 5, 'layer': 'UI Layer', 'color': '#1FB8CD'},
    {'name': 'Messaging', 'x': 3, 'y': 5, 'layer': 'UI Layer', 'color': '#1FB8CD'},
    
    # Chatbot Core Layer
    {'name': 'Conv Flow Eng', 'x': 1, 'y': 4, 'layer': 'Chatbot Core', 'color': '#ECEBD5'},
    {'name': 'NLP Engine', 'x': 2, 'y': 4, 'layer': 'Chatbot Core', 'color': '#ECEBD5'},
    {'name': 'Intent Recog', 'x': 3, 'y': 4, 'layer': 'Chatbot Core', 'color': '#ECEBD5'},
    {'name': 'Context Mgmt', 'x': 4, 'y': 4, 'layer': 'Chatbot Core', 'color': '#ECEBD5'},
    
    # Business Logic Layer
    {'name': 'Flight Search', 'x': 1, 'y': 3, 'layer': 'Business Logic', 'color': '#FFC185'},
    {'name': 'Booking Mgmt', 'x': 2, 'y': 3, 'layer': 'Business Logic', 'color': '#FFC185'},
    {'name': 'Payment Proc', 'x': 3, 'y': 3, 'layer': 'Business Logic', 'color': '#FFC185'},
    {'name': 'Notification', 'x': 4, 'y': 3, 'layer': 'Business Logic', 'color': '#FFC185'},
    
    # Data Layer
    {'name': 'API Gateway', 'x': 1, 'y': 2, 'layer': 'Data Layer', 'color': '#5D878F'},
    {'name': 'Data Access', 'x': 2, 'y': 2, 'layer': 'Data Layer', 'color': '#5D878F'},
    {'name': 'Airports', 'x': 3, 'y': 2, 'layer': 'Data Layer', 'color': '#5D878F'},
    {'name': 'Airlines', 'x': 4, 'y': 2, 'layer': 'Data Layer', 'color': '#5D878F'},
    {'name': 'Flights', 'x': 5, 'y': 2, 'layer': 'Data Layer', 'color': '#5D878F'},
    {'name': 'Passengers', 'x': 6, 'y': 2, 'layer': 'Data Layer', 'color': '#5D878F'},
    {'name': 'Bookings', 'x': 7, 'y': 2, 'layer': 'Data Layer', 'color': '#5D878F'},
    
    # External Services
    {'name': 'Payment GW', 'x': 1, 'y': 1, 'layer': 'External Svc', 'color': '#B4413C'},
    {'name': 'Email Service', 'x': 2, 'y': 1, 'layer': 'External Svc', 'color': '#B4413C'},
    {'name': 'SMS Service', 'x': 3, 'y': 1, 'layer': 'External Svc', 'color': '#B4413C'},
]

df = pd.DataFrame(components_data)

# Create the scatter plot
fig = go.Figure()

# Add scatter points for each layer
for layer in df['layer'].unique():
    layer_data = df[df['layer'] == layer]
    fig.add_trace(go.Scatter(
        x=layer_data['x'],
        y=layer_data['y'],
        mode='markers+text',
        marker=dict(
            size=25,
            color=layer_data['color'].iloc[0],
            opacity=0.8,
            symbol='square'
        ),
        text=layer_data['name'],
        textposition='middle center',
        textfont=dict(size=10, color='black'),
        name=layer,
        hovertemplate='<b>%{text}</b><br>Layer: ' + layer + '<extra></extra>',
        cliponaxis=False
    ))

# Update layout
fig.update_layout(
    title="Airline Chatbot Arch",
    xaxis=dict(
        title="Components",
        range=[0.5, 7.5],
        showgrid=True,
        gridcolor='lightgray',
        showticklabels=False
    ),
    yaxis=dict(
        title="Layers",
        range=[0.5, 5.5],
        showgrid=True,
        gridcolor='lightgray',
        tickvals=[1, 2, 3, 4, 5],
        ticktext=['External', 'Data', 'Business', 'Chatbot', 'UI']
    ),
    legend=dict(
        orientation='h',
        yanchor='bottom',
        y=1.05,
        xanchor='center',
        x=0.5
    ),
    plot_bgcolor='white'
)

# Save the chart
fig.write_image("airline_chatbot_architecture.png")