# Pockez

A lightweight, offline-friendly personal dashboard for notes, body-stat estimates, weight tracking, and training. Built with plain HTML, CSS, and JavaScript so it can run directly in a browser or deploy easily with GitHub Pages.

## Features

- Multi-note editor with automatic local saving
- Training log: record sessions (exercise, sets × reps × kg) with automatic session tonnage, all-time PR tracking, and fun celebration messages
- English and Spanish interface
- Dark mode, accent themes, and background styles
- BMI, BMR, maintenance, and suggested calorie estimates
- Up to five customizable people profiles, each with separate health data
- Personal Trainer widget with day-based splits, goals, training emphasis, exercise cues, and adjustable variables
- Recommended generator plus a Custom mode: pick a split, then add or remove exercises per day
- Set/reps recommendations that adapt to each other, plus 2 - 3 minute rest guidance
- Reference-based low, moderate, and moderate-high weekly training volume bands
- Weight history with goals, trends, accessible chart points, and date filters
- Edit and delete weight measurements
- JSON export, import, and clear-data tools
- Responsive layout for desktop and mobile

## Run locally

Open `index.html` in a modern browser. No build step or dependencies are required.

## Privacy

Dashboard data stays in the browser's `localStorage` unless you explicitly export it. The app does not include a server or account system. Health calculations are estimates for personal learning and tracking, not medical advice.

## GitHub Pages

This repository is ready for a static GitHub Pages deployment. In the repository settings, choose **Pages**, select the deployment branch, and use the root folder.
