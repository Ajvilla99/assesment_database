import './style.css'

// Function to fetch billing data from the API
const getData = async () => {
  try {
    // Send GET request to the /api/billings endpoint
    const response = await fetch('http://localhost:3000/api/v1/billings');
    if (!response.ok) throw new Error('Network response was not ok');
    // Parse the JSON response
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error('Fetch error:', error);
  }
}

getData()