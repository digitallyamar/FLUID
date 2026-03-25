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

type ComponentSections = {
  default: React.ReactNode;
  variants: React.ReactNode;
  disabled: React.ReactNode;
  theming: React.ReactNode;
  accessibility: React.ReactNode;
};

function ComponentPage({ name, sections }: { name: string; sections: ComponentSections }) {
  return (
    <main>
      <h1>{name}</h1>
      <SectionFrame title="Default">{sections.default}</SectionFrame>
      <SectionFrame title="Variants">{sections.variants}</SectionFrame>
      <SectionFrame title="Disabled">{sections.disabled}</SectionFrame>
      <SectionFrame title="Theming">{sections.theming}</SectionFrame>
      <SectionFrame title="Accessibility">{sections.accessibility}</SectionFrame>
    </main>
  );
}

export function DocsApp() {
  const route = window.location.pathname;
  const [buttonClicks, setButtonClicks] = React.useState(0);

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
      return (
        <ComponentPage
          name="Button"
          sections={{
            default: (
              <Button onClick={() => setButtonClicks((v) => v + 1)}>
                Default ({buttonClicks})
              </Button>
            ),
            variants: (
              <div style={{ display: "flex", gap: 8 }}>
                <Button className="fluid-btn-variant">Accent</Button>
                <IconButton aria-label="star" className="fluid-btn-variant">
                  *
                </IconButton>
              </div>
            ),
            disabled: <Button disabled>Disabled</Button>,
            theming: <Button className="fluid-btn-themed">Construction Theme</Button>,
            accessibility: (
              <p>
                Click or focus then press Enter/Space. Current click count:{" "}
                <strong>{buttonClicks}</strong>
              </p>
            )
          }}
        />
      );
    case "/components/icon-button":
      return (
        <ComponentPage
          name="IconButton"
          sections={{
            default: <IconButton aria-label="settings">*</IconButton>,
            variants: <IconButton aria-label="settings-accent" className="fluid-btn-variant">*</IconButton>,
            disabled: (
              <IconButton aria-label="settings-disabled" disabled>
                *
              </IconButton>
            ),
            theming: <IconButton aria-label="settings-themed" className="fluid-btn-themed">*</IconButton>,
            accessibility: <p>Icon buttons use explicit aria-label text for screen readers.</p>
          }}
        />
      );
    case "/components/input":
      return (
        <ComponentPage
          name="Input"
          sections={{
            default: <Input aria-label="name" defaultValue="FLUID" />,
            variants: <Input aria-label="name-variant" defaultValue="Variant" className="fluid-input-variant" />,
            disabled: <Input aria-label="name-disabled" defaultValue="Disabled" disabled />,
            theming: <Input aria-label="name-themed" defaultValue="Theme" className="fluid-input-themed" />,
            accessibility: <p>Input uses native semantics and label association via aria-label.</p>
          }}
        />
      );
    case "/components/textarea":
      return (
        <ComponentPage
          name="Textarea"
          sections={{
            default: <Textarea aria-label="description" defaultValue="Text" />,
            variants: <Textarea aria-label="description-variant" defaultValue="Variant" className="fluid-input-variant" />,
            disabled: <Textarea aria-label="description-disabled" defaultValue="Disabled" disabled />,
            theming: <Textarea aria-label="description-themed" defaultValue="Theme" className="fluid-input-themed" />,
            accessibility: <p>Textarea keeps native keyboard behavior and browser accessibility mappings.</p>
          }}
        />
      );
    case "/components/select":
      return (
        <ComponentPage
          name="Select"
          sections={{
            default: (
              <Select aria-label="role" defaultValue="admin">
                <option value="admin">Admin</option>
                <option value="user">User</option>
              </Select>
            ),
            variants: (
              <Select aria-label="role-variant" defaultValue="user" className="fluid-input-variant">
                <option value="admin">Admin</option>
                <option value="user">User</option>
              </Select>
            ),
            disabled: (
              <Select aria-label="role-disabled" defaultValue="admin" disabled>
                <option value="admin">Admin</option>
                <option value="user">User</option>
              </Select>
            ),
            theming: (
              <Select aria-label="role-themed" defaultValue="admin" className="fluid-input-themed">
                <option value="admin">Admin</option>
                <option value="user">User</option>
              </Select>
            ),
            accessibility: <p>Select uses combobox semantics and keyboard navigation.</p>
          }}
        />
      );
    case "/components/checkbox":
      return (
        <ComponentPage
          name="Checkbox"
          sections={{
            default: <Checkbox aria-label="accept" />,
            variants: <Checkbox aria-label="accept-variant" className="fluid-btn-variant" />,
            disabled: <Checkbox aria-label="accept-disabled" disabled />,
            theming: <Checkbox aria-label="accept-themed" className="fluid-btn-themed" />,
            accessibility: <p>Checkbox has native checked state and keyboard toggling.</p>
          }}
        />
      );
    case "/components/radio-group":
      return (
        <ComponentPage
          name="RadioGroup"
          sections={{
            default: (
              <RadioGroup
                aria-label="plan"
                name="plan"
                options={[
                  { label: "Basic", value: "basic" },
                  { label: "Pro", value: "pro" }
                ]}
              />
            ),
            variants: (
              <RadioGroup
                aria-label="plan-variant"
                name="plan-variant"
                options={[
                  { label: "Standard", value: "standard" },
                  { label: "Enterprise", value: "enterprise" }
                ]}
              />
            ),
            disabled: <p>Disabled variant pending for grouped controls.</p>,
            theming: <p>Theming for grouped controls is token-driven and will evolve.</p>,
            accessibility: <p>RadioGroup exposes grouped radio semantics through fieldset + inputs.</p>
          }}
        />
      );
    case "/components/switch":
      return (
        <ComponentPage
          name="Switch"
          sections={{
            default: <Switch aria-label="dark-mode" />,
            variants: <Switch aria-label="dark-mode-variant" className="fluid-btn-variant" />,
            disabled: <Switch aria-label="dark-mode-disabled" disabled />,
            theming: <Switch aria-label="dark-mode-themed" className="fluid-btn-themed" />,
            accessibility: <p>Switch uses role=switch with aria-checked updates.</p>
          }}
        />
      );
    case "/components/card":
      return (
        <ComponentPage
          name="Card"
          sections={{
            default: <Card>Card Body</Card>,
            variants: <Card className="fluid-input-variant">Variant Card</Card>,
            disabled: <Card>Not interactive</Card>,
            theming: <Card className="fluid-btn-themed">Themed Card</Card>,
            accessibility: <p>Card is a presentational container and inherits semantic children.</p>
          }}
        />
      );
    case "/components/modal":
      return (
        <ComponentPage
          name="Modal"
          sections={{
            default: <Modal open title="Confirm">Modal content</Modal>,
            variants: <Modal open title="Variant">Variant modal content</Modal>,
            disabled: <p>Modal visibility is controlled by the `open` prop.</p>,
            theming: <Modal open title="Themed" className="fluid-btn-themed">Themed modal</Modal>,
            accessibility: <p>Modal uses dialog role and accessible title via aria-label.</p>
          }}
        />
      );
    default:
      return (
        <main>
          <h1>Not Found</h1>
        </main>
      );
  }
}
