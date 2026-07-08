RemedyPills app-wide bottom tab bar — 6 tabs (Home, Rx, Reminders, Care, Health, Account), sticky at viewport bottom.

```jsx
<BottomNav
  items={[{id:'home', label:'Home', icon:<Home/>}, ...]}
  active="home"
  onChange={setTab}
/>
```
