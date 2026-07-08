# RemedyPills Pharmacy — Patient App UI Kit

Interactive click-through recreation of the RemedyPills Pharmacy patient mobile app, built from `client/src/pages/pharmacy-app.tsx` and `auth-page.tsx` in the `remedypillspharmacyApp` repo.

Open `index.html`. Flow: auth landing → "GET STARTED" (any credentials) → Home tab, then use the bottom nav to reach Prescriptions (Rx), Reminders, Care (appointments/booking), Health, and Account.

Files:
- `Shell.jsx` — gradient TopBar + 6-tab BottomNav (shared chrome)
- `AuthScreen.jsx` — landing / login / register
- `HomeTab.jsx`, `PrescriptionsTab.jsx`, `RemindersTab.jsx`, `AppointmentsTab.jsx`, `HealthTab.jsx`, `AccountTab.jsx` — the six bottom-nav destinations

Data shown (prescriptions, reminders, appointments) is static mock data standing in for the real API in the source repo.
