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
