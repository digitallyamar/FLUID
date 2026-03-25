import React from "react";
import {
  Button,
  Card,
  Checkbox,
  IconButton,
  Input,
  Modal,
  RadioGroup,
  Select,
  Switch,
  Textarea
} from "@fluid-ui/react";

const componentRoutes = [
  { name: "Button", href: "/components/button" },
  { name: "IconButton", href: "/components/icon-button" },
  { name: "Input", href: "/components/input" },
  { name: "Textarea", href: "/components/textarea" },
  { name: "Select", href: "/components/select" },
  { name: "Checkbox", href: "/components/checkbox" },
  { name: "RadioGroup", href: "/components/radio-group" },
  { name: "Switch", href: "/components/switch" },
  { name: "Card", href: "/components/card" },
  { name: "Modal", href: "/components/modal" }
];

function SectionFrame({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section style={{ marginBottom: 16 }}>
      <h2>{title}</h2>
      {children}
    </section>
  );
}

function ComponentPage({
  name,
  control
}: {
  name: string;
  control: React.ReactNode;
}) {
  return (
    <main>
      <h1>{name}</h1>
      <SectionFrame title="Default">{control}</SectionFrame>
      <SectionFrame title="Variants">{control}</SectionFrame>
      <SectionFrame title="Disabled">{control}</SectionFrame>
      <SectionFrame title="Theming">{control}</SectionFrame>
      <SectionFrame title="Accessibility">
        <p>Keyboard and semantic behavior covered in tests.</p>
      </SectionFrame>
    </main>
  );
}

export function DocsApp() {
  const route = window.location.pathname;

  switch (route) {
    case "/":
      return (
        <main>
          <h1>FLUID Docs</h1>
          <p>Explore available UI components.</p>
          <a href="/components">Browse Components</a>
        </main>
      );
    case "/components":
      return (
        <main>
          <h1>Components</h1>
          <ul>
            {componentRoutes.map((item) => (
              <li key={item.href}>
                <a href={item.href}>{item.name}</a>
              </li>
            ))}
          </ul>
        </main>
      );
    case "/components/button":
      return <ComponentPage name="Button" control={<Button>Default</Button>} />;
    case "/components/icon-button":
      return <ComponentPage name="IconButton" control={<IconButton aria-label="settings">*</IconButton>} />;
    case "/components/input":
      return <ComponentPage name="Input" control={<Input aria-label="name" defaultValue="FLUID" />} />;
    case "/components/textarea":
      return <ComponentPage name="Textarea" control={<Textarea aria-label="description" defaultValue="Text" />} />;
    case "/components/select":
      return (
        <ComponentPage
          name="Select"
          control={
            <Select aria-label="role" defaultValue="admin">
              <option value="admin">Admin</option>
              <option value="user">User</option>
            </Select>
          }
        />
      );
    case "/components/checkbox":
      return <ComponentPage name="Checkbox" control={<Checkbox aria-label="accept" />} />;
    case "/components/radio-group":
      return (
        <ComponentPage
          name="RadioGroup"
          control={
            <RadioGroup
              aria-label="plan"
              name="plan"
              options={[
                { label: "Basic", value: "basic" },
                { label: "Pro", value: "pro" }
              ]}
            />
          }
        />
      );
    case "/components/switch":
      return <ComponentPage name="Switch" control={<Switch aria-label="dark-mode" />} />;
    case "/components/card":
      return <ComponentPage name="Card" control={<Card>Card Body</Card>} />;
    case "/components/modal":
      return <ComponentPage name="Modal" control={<Modal open title="Confirm">Modal content</Modal>} />;
    default:
      return (
        <main>
          <h1>Not Found</h1>
        </main>
      );
  }
}
