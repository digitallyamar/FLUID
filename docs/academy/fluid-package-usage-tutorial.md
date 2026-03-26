# FLUID Package Usage Tutorial (Sample Web App)

## Goal

Use `@fluid-ui/react` in a fresh sample web app and verify it renders real FLUID components.

---

## Prerequisites

- Node.js 20+ and npm 10+
- Local FLUID worktree at:
  - `/home/amar/dev/FLUID/.worktrees/fluid-v1-implementation`

---

## Step 1: Build FLUID Package Locally

From FLUID worktree root:

```bash
cd /home/amar/dev/FLUID/.worktrees/fluid-v1-implementation
npm install
npm run -w @fluid-ui/react build
```

Why: this generates package artifacts and CSS used by consumer apps.

---

## Step 2: Create a Sample App

Create a Vite React TypeScript app in `/tmp`:

```bash
cd /tmp
npm create vite@latest fluid-sample-app -- --template react-ts
cd fluid-sample-app
npm install
```

---

## Step 3: Install FLUID Package Into the Sample App

Install from your local FLUID package path:

```bash
npm install /home/amar/dev/FLUID/.worktrees/fluid-v1-implementation/packages/fluid-react
```

---

## Step 4: Import FLUID CSS

Edit `src/main.tsx` and add:

```ts
import "@fluid-ui/react/styles.css";
```

Place it with other top-level imports.

---

## Step 5: Render FLUID Components

Replace `src/App.tsx` with:

```tsx
import { Button, Card, Input } from "@fluid-ui/react";

export default function App() {
  return (
    <main style={{ padding: 24, display: "grid", gap: 16, maxWidth: 520 }}>
      <h1>FLUID Sample App</h1>

      <Card className="fluid-card">
        <h2 style={{ marginTop: 0 }}>Contact</h2>
        <Input aria-label="name" placeholder="Your name" />
      </Card>

      <Button onClick={() => alert("FLUID Button clicked")}>Save</Button>
      <Button className="fluid-btn-variant">Accent Action</Button>
      <Button className="fluid-btn-themed">Themed Action</Button>
    </main>
  );
}
```

---

## Step 6: Run and Verify

Start the sample app:

```bash
npm run dev
```

Open the printed localhost URL and verify:

1. Buttons have FLUID styling (not plain browser defaults).
2. Input and Card render with FLUID classes.
3. Clicking `Save` shows the alert.

---

## Common Issues

## FLUID styles are missing (looks like plain HTML)

Checks:

1. Confirm this import exists in `src/main.tsx`:
   - `import "@fluid-ui/react/styles.css";`
2. Rebuild FLUID package:
   - `cd /home/amar/dev/FLUID/.worktrees/fluid-v1-implementation`
   - `npm run -w @fluid-ui/react build`
3. Reinstall in sample app:
   - `cd /tmp/fluid-sample-app`
   - `npm install /home/amar/dev/FLUID/.worktrees/fluid-v1-implementation/packages/fluid-react`

## Import path errors for `@fluid-ui/react`

Checks:

1. Confirm install completed without errors:
   - `npm ls @fluid-ui/react`
2. If needed, remove and reinstall:
   - `rm -rf node_modules package-lock.json`
   - `npm install`
   - `npm install /home/amar/dev/FLUID/.worktrees/fluid-v1-implementation/packages/fluid-react`

---

## Next Extension Ideas

After this baseline works, extend with:

1. Add `Select`, `Switch`, and `Modal` demos.
2. Add a local theme toggle that switches between default and themed classes.
3. Add a tiny form with validation and disabled submit behavior.
