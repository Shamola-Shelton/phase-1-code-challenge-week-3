## Phase 1 Code Challenge Week 3

A modern web application for managing posts, built with HTML, CSS, and JavaScript. This project allows users to view, add, edit, and delete posts with a clean, user-friendly interface. All changes are persisted using a mock API.

## Overview

This project fulfills the requirements of a Phase 1 Code Challenge, implementing:

- **Core Deliverables**: Display post titles, view details on click, and add new posts.
- **Advanced Deliverables**: Show the first post on load, edit posts with a form, and delete posts.
- **Extra Advanced Deliverables**: Persist all changes (create, update, delete) via API requests.

## Setup

### Prerequisites

- Node.js and npm installed on your system.
- Git for version control.

### Installation

1. **Clone the Repository**:
   ```bash
   git clone https://https://github.com/Shamola-Shelton/phase-1-code-challenge-week-3
   cd phase-1-code-challenge-week-3
2. **Install Dependencies**:

   Install `json-server` and `live-server` globally 

3. **Start the Application**:

   Start the mock API:
   ```bash
   json-server db.json
   ```
   This runs the API at `http://localhost:3000`.

   In a separate terminal, start the frontend:
   - Globally: `live-server`
   - Locally: `npm run start:frontend`

   Open your browser to `http://127.0.0.1:8080` (or the port specified by `live-server`).

## Usage

- **View Posts**: Post titles are listed in the sidebar. Click a title to see its details in the main area.
- **Add a Post**: Fill out the form at the bottom and click "Add Post".
- **Edit a Post**: Click "Edit" on a post's details, update the form, and submit.
- **Delete a Post**: Click "Delete" to remove a post from the list and details.
- All changes persist via the API and remain after a page refresh.

## Features

- **Responsive Layout**: Clean sidebar and content area inspired by "Post Pulse".
- **Core Functionality**: List posts, view details, and add new posts.
- **Advanced Functionality**: Auto-display first post on load, in-place editing, and deletion.
- **API Persistence**: Create, update, and delete posts are saved to `db.json` using `POST`, `PATCH`, and `DELETE` requests.

## File Structure

- `index.html`: Main HTML structure with sidebar, content, and forms.
- `src/index.js`: JavaScript logic for fetching data, DOM updates, and event handling.
- `css/styles.css`: Styles for a modern, text-only interface.
- `db.json`: Mock API data for posts.

## Troubleshooting

- **Permission Errors**: If `npm install -g` fails with `EACCES`, use the user-specific npm directory setup above or install locally.
- **API Not Running**: Ensure `json-server db.json` is active in a terminal.
- **Frontend Not Loading**: Verify `live-server` is running and check the console for errors.

## Contributing

Feel free to fork this repository and submit pull requests for enhancements or bug fixes.

## License

This project is for educational purposes only. No formal license is applied.

## Acknowledgments

- Built as part of a Phase 1 Code Challenge.
