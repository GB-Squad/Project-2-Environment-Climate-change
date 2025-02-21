# Wildlife Tracker Website

This wildlife tracker website provides an interactive platform for monitoring endangered species. The site features a homepage displaying a pie chart representing the levels of endangered species and a map with markers pinpointing the geographic locations of animals. Users can view, add, edit, and delete animal information, making it a powerful tool for tracking wildlife populations and their conservation statuses.

## Features

- **Home Page:**
  - **Pie Chart:** Displays the current levels of endangered species across categories (e.g., critically endangered, endangered, vulnerable).
  - **Map:** Shows an interactive map with markers indicating regions where various animal species are found. By clicking on a marker, users are redirected to the respective animal's detail page.

- **Animal Listing Page:**
  - Displays a list of all animals stored in the database.
  - Each animal entry has a **Details** button, which navigates to the animal's specific detail page.
  - Users can click **Delete** to remove an irrelevant or outdated animal entry.

- **Animal Detail Page:**
  - Provides detailed information about a specific animal, including its conservation status, habitat, and other relevant data.
  - Accessible by clicking on a map marker or the **Details** button from the animal listing page.

- **Edit Animal Page:**
  - Users can navigate to the **Edit Animal** page by clicking the **Edit** button on the Animal Detail page.
  - Allows users to edit and update the information for a specific animal. 
  - Once the changes are made, users can save the updated details.

- **Add Animal Page:**
  - Users can add new animal entries to the database with detailed information about the animal.
  - The new entry will be added to the listing and represented on the map.

## Technologies Used

- **Frontend:**
  - HTML
  - CSS
  - JavaScript
  - Chart.js (for the pie chart)
  - Leaflet.js (for the interactive map)

- **Backend:**
  - Firebase API (for data storage and management)

## Usage

- On the **Home Page**, you can view the pie chart and interactive map. Clicking on a map marker will take you to the specific animal detail page.
- From the **Animal Listing Page**, you can view all available animals and either view their details or delete them.
- On the **Animal Detail Page**, users can see detailed information and edit it using the **Edit Page**.
- The **Add Animal Page** allows you to add new animals to the database, and they will be immediately displayed on the map.

## Contributing

Feel free to fork this project and submit pull requests. If you'd like to contribute, please open an issue or submit a pull request for any bugs or improvements you notice.
