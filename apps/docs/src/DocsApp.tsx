import React from "react";
import { marked } from "marked";
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
import firstPrinciplesMarkdown from "../../../docs/academy/first-principles-web-fundamentals.md?raw";
import sessionHandoffMarkdown from "../../../docs/academy/session-handoff-guide.md?raw";
import questionBankMarkdown from "../../../docs/academy/first-principles-question-bank.md?raw";

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

const academyRoutes = [
  {
    name: "First Principles Web Fundamentals",
    href: "/academy/first-principles",
    markdown: firstPrinciplesMarkdown
  },
  {
    name: "Session Handoff Guide",
    href: "/academy/session-handoff",
    markdown: sessionHandoffMarkdown
  },
  {
    name: "First-Principles Question Bank",
    href: "/academy/question-bank",
    markdown: questionBankMarkdown
  }
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
  const [buttonVariantClicks, setButtonVariantClicks] = React.useState(0);
  const [buttonThemeClicks, setButtonThemeClicks] = React.useState(0);

  switch (route) {
    case "/":
      return (
        <main>
          <h1>FLUID Docs</h1>
          <p>Explore available UI components.</p>
          <ul>
            <li>
              <a href="/components">Browse Components</a>
            </li>
            <li>
              <a href="/academy">Browse Academy Notes</a>
            </li>
          </ul>
        </main>
      );
    case "/academy":
    case "/academy/":
      return (
        <main>
          <h1>Academy Notes</h1>
          <ul>
            {academyRoutes.map((item) => (
              <li key={item.href}>
                <a href={item.href}>{item.name}</a>
              </li>
            ))}
          </ul>
        </main>
      );
    case "/academy/first-principles":
      return (
        <main>
          <h1>Academy: First Principles</h1>
          <article
            className="academy-markdown"
            dangerouslySetInnerHTML={{ __html: marked.parse(firstPrinciplesMarkdown) }}
          />
        </main>
      );
    case "/academy/session-handoff":
      return (
        <main>
          <h1>Academy: Session Handoff Guide</h1>
          <article
            className="academy-markdown"
            dangerouslySetInnerHTML={{ __html: marked.parse(sessionHandoffMarkdown) }}
          />
        </main>
      );
    case "/academy/question-bank":
      return (
        <main>
          <h1>Academy: First-Principles Question Bank</h1>
          <article
            className="academy-markdown"
            dangerouslySetInnerHTML={{ __html: marked.parse(questionBankMarkdown) }}
          />
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
                <Button
                  className="fluid-btn-variant"
                  onClick={() => setButtonVariantClicks((v) => v + 1)}
                >
                  Accent ({buttonVariantClicks})
                </Button>
                <IconButton
                  aria-label="star"
                  className="fluid-btn-variant"
                  onClick={() => setButtonVariantClicks((v) => v + 1)}
                >
                  *
                </IconButton>
              </div>
            ),
            disabled: <Button disabled>Disabled</Button>,
            theming: (
              <Button
                className="fluid-btn-themed"
                onClick={() => setButtonThemeClicks((v) => v + 1)}
              >
                Construction Theme ({buttonThemeClicks})
              </Button>
            ),
            accessibility: (
              <p>
                Click or focus then press Enter/Space. Current click count:{" "}
                <strong>{buttonClicks}</strong>; variant clicks:{" "}
                <strong>{buttonVariantClicks}</strong>; themed clicks:{" "}
                <strong>{buttonThemeClicks}</strong>
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
            default: <Card className="fluid-card">Card Body</Card>,
            variants: <Card className="fluid-card fluid-card-variant">Variant Card</Card>,
            disabled: <Card className="fluid-card fluid-card-disabled">Disabled Preview</Card>,
            theming: <Card className="fluid-card fluid-card-themed">Themed Card</Card>,
            accessibility: <p>Card is a presentational container and inherits semantic children.</p>
          }}
        />
      );
    case "/components/modal":
      return (
        <ComponentPage
          name="Modal"
          sections={{
            default: (
              <Modal open title="Confirm" className="fluid-modal">
                Modal content
              </Modal>
            ),
            variants: (
              <Modal open title="Variant" className="fluid-modal fluid-modal-variant">
                Variant modal content
              </Modal>
            ),
            disabled: (
              <Modal open title="Disabled" className="fluid-modal fluid-modal-disabled">
                Disabled-style modal preview
              </Modal>
            ),
            theming: (
              <Modal open title="Themed" className="fluid-modal fluid-modal-themed">
                Themed modal
              </Modal>
            ),
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
