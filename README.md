# RideSimple
A minimalist ride-hailing app clone offering quick, reliable rides. Features real-time booking, fare estimates, secure payments, and ride tracking. Built for simplicity and efficiency in urban commuting.

## Project Overview
RideSimple is a full-stack ride-hailing application split between a modern React-based frontend and a robust Node.js/Express backend that leverages Socket.io for real-time ride updates. The frontend handles user interactions with pages for login, ride details, and registration, while the backend manages user/captain authentication, ride requests, and mapping services.

## Good Points
- Clean, minimalist design with an intuitive user interface.
- Real-time communication enabling live ride tracking and updates.
- Secure authentication across both users and captains.
- Well-documented APIs and clear separation of frontend and backend concerns.
- Lightweight and efficient architecture ideal for urban commuting.

## Future Directions
- Scale the application with microservice architecture.
- Enhance UI/UX with more advanced features and personalized dashboards.
- Integrate AI for dynamic pricing, route optimization, and predictive maintenance.
- Add payment options and support multi-language interfaces.
- Introduce additional ride-sharing and customer support functionalities.

## How to Run
- For the Frontend:
  - Open a terminal in `d:/Projects/RideSimple/frontend`.
  - Run: npm install
  - Run: npm run dev
  - Open your browser at the localhost URL displayed.
- For the Backend:
  - Open a terminal in `d:/Projects/RideSimple/Backend`.
  - Run: npm install
  - Configure your environment variables in .env.
  - Run: npx nodemon
