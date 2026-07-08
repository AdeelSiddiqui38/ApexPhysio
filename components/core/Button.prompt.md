Clickable action button shared by both RemedyPills and NBV surfaces, switching palette via the `brand` prop.

```jsx
<Button variant="primary" brand="remedypills">Refill</Button>
<Button variant="accent" brand="nbv" pill={false}>Discover Programs</Button>
```

Variants: `primary` (solid brand color), `accent` (teal accent — RemedyPills promo actions / NBV CTA band), `secondary` (tinted), `outline`, `ghost`. Set `pill` for the fully-rounded RemedyPills auth "GET STARTED" style.
