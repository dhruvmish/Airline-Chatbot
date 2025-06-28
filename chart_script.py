import plotly.graph_objects as go
import plotly.express as px
import numpy as np

# Define the nodes and their properties
nodes = [
    # Common starting point
    {"id": 0, "label": "Welcome", "flow_type": "start", "x": 0, "y": 0},
    
    # Flight Search Flow (green)
    {"id": 1, "label": "Flight Search", "flow_type": "search", "x": -3, "y": -1},
    {"id": 2, "label": "Ask Origin", "flow_type": "search", "x": -4, "y": -2},
    {"id": 3, "label": "Ask Dest", "flow_type": "search", "x": -4, "y": -3},
    {"id": 4, "label": "Ask Date", "flow_type": "search", "x": -4, "y": -4},
    {"id": 5, "label": "Ask Passengers", "flow_type": "search", "x": -4, "y": -5},
    {"id": 6, "label": "Show Results", "flow_type": "search", "x": -3, "y": -6},
    {"id": 7, "label": "Select Flight", "flow_type": "search", "x": -2, "y": -7},
    {"id": 8, "label": "Show Fares", "flow_type": "search", "x": -1, "y": -8},
    {"id": 9, "label": "Select Fare", "flow_type": "search", "x": 0, "y": -9},
    {"id": 10, "label": "Get Details", "flow_type": "search", "x": 1, "y": -8},
    {"id": 11, "label": "Create Booking", "flow_type": "search", "x": 2, "y": -7},
    {"id": 12, "label": "Payment", "flow_type": "search", "x": 3, "y": -6},
    
    # Booking Management Flow (blue)
    {"id": 13, "label": "Booking Mgmt", "flow_type": "booking", "x": -1, "y": -1},
    {"id": 14, "label": "Ask ID/Email", "flow_type": "booking", "x": -1, "y": -2},
    {"id": 15, "label": "Get Booking", "flow_type": "booking", "x": -1, "y": -3},
    {"id": 16, "label": "View Details", "flow_type": "booking", "x": -2, "y": -4},
    {"id": 17, "label": "Cancel Book", "flow_type": "booking", "x": -1, "y": -4},
    {"id": 18, "label": "Modify Book", "flow_type": "booking", "x": 0, "y": -4},
    
    # Flight Status Flow (orange)
    {"id": 19, "label": "Flight Status", "flow_type": "status", "x": 1, "y": -1},
    {"id": 20, "label": "Ask Flight #", "flow_type": "status", "x": 1, "y": -2},
    {"id": 21, "label": "Show Status", "flow_type": "status", "x": 1, "y": -3},
    
    # Help/FAQ Flow (purple)
    {"id": 22, "label": "Help/FAQ", "flow_type": "help", "x": 3, "y": -1},
    {"id": 23, "label": "Show FAQ", "flow_type": "help", "x": 3, "y": -2},
]

# Define the connections (edges)
edges = [
    # From Welcome to main options
    (0, 1), (0, 13), (0, 19), (0, 22),
    
    # Flight Search Flow
    (1, 2), (2, 3), (3, 4), (4, 5), (5, 6), (6, 7), (7, 8), (8, 9), (9, 10), (10, 11), (11, 12),
    
    # Booking Management Flow
    (13, 14), (14, 15), (15, 16), (15, 17), (15, 18),
    
    # Flight Status Flow
    (19, 20), (20, 21),
    
    # Help/FAQ Flow
    (22, 23),
]

# Color mapping for flow types
color_map = {
    "start": "#1FB8CD",      # Strong cyan
    "search": "#ECEBD5",     # Light green
    "booking": "#1FB8CD",    # Strong cyan
    "status": "#FFC185",     # Light orange
    "help": "#D2BA4C"        # Moderate yellow
}

# Create node traces
x_nodes = [node["x"] for node in nodes]
y_nodes = [node["y"] for node in nodes]
node_colors = [color_map[node["flow_type"]] for node in nodes]
node_labels = [node["label"] for node in nodes]

# Create edge traces
x_edges = []
y_edges = []
for start_id, end_id in edges:
    start_node = nodes[start_id]
    end_node = nodes[end_id]
    x_edges.extend([start_node["x"], end_node["x"], None])
    y_edges.extend([start_node["y"], end_node["y"], None])

# Create the figure
fig = go.Figure()

# Add edges
fig.add_trace(go.Scatter(
    x=x_edges, y=y_edges,
    mode='lines',
    line=dict(color='gray', width=2),
    showlegend=False,
    hoverinfo='none',
    cliponaxis=False
))

# Add nodes
fig.add_trace(go.Scatter(
    x=x_nodes, y=y_nodes,
    mode='markers+text',
    marker=dict(
        size=20,
        color=node_colors,
        line=dict(width=2, color='white')
    ),
    text=node_labels,
    textposition="middle center",
    textfont=dict(size=10, color='black'),
    showlegend=False,
    hoverinfo='text',
    hovertext=node_labels,
    cliponaxis=False
))

# Create legend
legend_traces = []
for flow_type, color in color_map.items():
    if flow_type == "start":
        legend_name = "Start"
    elif flow_type == "search":
        legend_name = "Search"
    elif flow_type == "booking":
        legend_name = "Booking"
    elif flow_type == "status":
        legend_name = "Status"
    elif flow_type == "help":
        legend_name = "Help"
    
    fig.add_trace(go.Scatter(
        x=[None], y=[None],
        mode='markers',
        marker=dict(size=10, color=color),
        name=legend_name,
        showlegend=True,
        cliponaxis=False
    ))

fig.update_layout(
    title="Airline Chatbot Flow",
    showlegend=True,
    legend=dict(orientation='h', yanchor='bottom', y=1.05, xanchor='center', x=0.5),
    xaxis=dict(showgrid=False, zeroline=False, showticklabels=False),
    yaxis=dict(showgrid=False, zeroline=False, showticklabels=False),
    plot_bgcolor='white'
)

fig.write_image("chatbot_flow.png")