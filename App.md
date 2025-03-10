Create a **Desktop Application** using **Electron**.

The application should include the following screens:

1. **Splash Screen**

   - Displays the app icon in the center while loading.

2. **First Launch Screen**

   - Shown only if the app is opened for the first time.
   - Prompts the user to select a working directory.
   - Once selected, the directory is stored locally, and this screen does not appear again.

3. **Decks Screen**

   - Displays a table listing the user's card decks with the following columns:
     1. **Deck Name** – Text limited to 150 characters.
     2. **Review Algorithm** used:
        - **SM-18**
        - **FSRS**
     3. **Total number of cards** in the deck.
     4. **Last review date** of the deck.
     5. **Three-dot menu** with the following options:
        - Rename
        - Export
        - Delete
   - Clicking a deck row navigates to the **Deck Details Screen**.
   - Below the table, display a **study progress summary**, e.g., "**Today you reviewed N out of M cards**".
   - The screen should contain a **menu** with:
     1. **Create Deck** – Opens a modal for entering a deck name with validation:
        - Allowed: Letters, numbers, spaces, “-”, “\_”
        - Maximum length: 150 characters
     2. **Import Deck** – Opens a file picker for selecting a **JSON file**. If the file takes time to load, the UI should **show a loading spinner and block user interactions**.

4. **Deck Details Screen**

   - Contains a **search bar** for quick text-based filtering.
   - Displays a **table of flashcards** with the following columns:
     1. **Card Text (Front Side)** – Rendered without Markdown formatting. If too long, show ellipsis.
     2. **Card Type**:
        - **Card 1** – Standard two-sided card; always shows the front during reviews.
        - **Card 2** – Standard two-sided card; may show either side during reviews.
     3. **Three-dot menu** with options:
        - Edit
        - Move to another deck
        - Delete
   - Clicking a card row navigates to the **Card Editor Screen**.
   - Includes a **"Add Card" button**, which opens a modal to select a card type:
     - **Card 1** – Always shows the front during review.
     - **Card 2** – Can show either side randomly.

5. **Card Editor Screen**
   - Contains a **dropdown** to select the card type (**Card 1, Card 2**).
   - Includes **three tabs**:
     1. **Front Side** – Clicking opens an **EditorJS** instance for editing.
     2. **Back Side** – Clicking opens another **EditorJS** instance.
     3. **Card Statistics**:
        - Displays a **forgetting curve graph** based on data in this format:
          ```json
          "reviews": [{ "timestamp": number, "score": number, "next_review_interval": number }]
          ```
        - **X-axis**: 30 days (1-day increments).
        - **Y-axis**: Score (0 to 1).
   - The editor should include a **"code" button** to switch to Markdown mode.
   - As the user types, text should be **saved asynchronously**.
   - A **file-saving indicator** should be present when data is being written to disk.

