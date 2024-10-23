README.md
Bill Splitter with Meal Selection
Project Description
The Bill Splitter with Meal Selection is a React application that helps users easily split a bill between friends based on the items they ordered. The app integrates with TheMealDB API to fetch real meal data, allowing users to browse and select meals, assign them to individuals, and calculate the total amount each friend owes, including tax and tip.

This project is perfect for situations where friends go out to eat, order different items, and need to divide the bill based on their respective orders, simplifying the process and avoiding confusion.

Problem it Solves
When splitting a bill in a group, especially when everyone orders different items, calculating each person's share can become tricky. This app automates that process by:

Allowing users to select specific meals from a menu.
Automatically assigning prices to meals.
Enabling users to assign meals to friends and calculating the total cost for each person.
Taking into account tax and tip.
This eliminates the need for manual calculations, making it easier to split the bill fairly.

How to Set Up and Run the Project
Prerequisites
Node.js (Ensure you have Node.js installed, which comes with npm)
Steps to Set Up the Project
Clone the repository:

bash
Copy code
git clone https://github.com/your-username/bill-splitter-meal-selection.git
cd bill-splitter-meal-selection
Install dependencies:

bash
Copy code
npm install
Start the development server:

bash
Copy code
npm start
Open the app in your browser:

The app should automatically open in your browser at http://localhost:3000. If it doesn't, manually open your browser and navigate to the same URL.

Running the App
Once the app is running, you can:

Browse a list of meals fetched from TheMealDB API.
Select meals from the list and assign them to friends.
Input the total bill, tip percentage, and tax amount.
Calculate how much each friend owes based on the selected meals.
API Information and Integration
API Used
This project uses TheMealDB API for fetching meal data. TheMealDB API is a free, open-source API that provides access to a collection of meals from different cuisines around the world, including meal names, ingredients, categories, and images.

API Base URL: https://www.themealdb.com/api/json/v1/1/search.php?s=
How the API is Integrated
Fetching Meals:

When the app loads, the useEffect hook fetches meal data from TheMealDB API.
The fetched meals are displayed to the user, allowing them to browse and select items.
Adding Meals to Orders:

Each meal is shown with a randomly assigned price.
Users can add meals to their order by clicking the "Add to Order" button.
Assigning Meals:

Once meals are added to the order, users can assign each meal to a specific friend for the purpose of splitting the bill.
The integration with TheMealDB API provides a realistic meal selection experience, making it easier for users to simulate restaurant orders.

Credits
AI-Generated Code
This project utilized AI-generated code to accelerate the development process. The following portions were generated with the help of AI (via OpenAI's ChatGPT):

Basic React App Setup: The initial structure of the React app was generated, including the setup of state management using hooks (useState, useEffect).
API Integration: The logic to fetch meal data from TheMealDB API using the fetch method was assisted by AI, as well as handling meal selection and displaying menu items.
Order Assignment Logic: AI assistance was used in creating the functionality for assigning meals to friends and calculating individual totals, including handling state updates for orders.
UI and Component Structure: The layout for displaying meal lists, input fields for adding orders, and dropdowns for assigning friends was also enhanced with AI suggestions.
The AI code helped streamline the process of creating the app, while custom logic and improvements were added to suit the project's specific requirements.

License
This project is open-source and available under the MIT License.
