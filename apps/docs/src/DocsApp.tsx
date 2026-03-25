import React from "react";
import { marked } from "marked";
import {
  Accordion,
  Avatar,
  Badge,
  Breadcrumb,
  Button,
  Card,
  Checkbox,
  Combobox,
  CommandPalette,
  DataTable,
  DatePicker,
  DropdownMenu,
  IconButton,
  Input,
  Modal,
  Pagination,
  Popover,
  RadioGroup,
  Select,
  Switch,
  Tabs,
  Textarea,
  Toast,
  Tooltip
} from "@fluid-ui/react";
import maturityMap from "../content/maturity.json";
import firstPrinciplesMarkdown from "../../../docs/academy/first-principles-web-fundamentals.md?raw";
import sessionHandoffMarkdown from "../../../docs/academy/session-handoff-guide.md?raw";
import questionBankMarkdown from "../../../docs/academy/first-principles-question-bank.md?raw";
import structureMapMarkdown from "../../../docs/academy/fluid-library-structure-map.md?raw";
import mobileReadinessMarkdown from "../../../docs/academy/mobile-readiness-backlog.md?raw";
import backlogIndexMarkdown from "../../../docs/academy/backlog-index.md?raw";
import buttonDeepDiveMarkdown from "../../../docs/academy/button-component-deep-dive.md?raw";
import packageUsageTutorialMarkdown from "../../../docs/academy/fluid-package-usage-tutorial.md?raw";

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
  { name: "Modal", href: "/components/modal" },
  { name: "Tabs (Tier B)", href: "/components/tabs" },
  { name: "Accordion (Tier B)", href: "/components/accordion" },
  { name: "Tooltip (Tier B)", href: "/components/tooltip" },
  { name: "Popover (Tier B)", href: "/components/popover" },
  { name: "DropdownMenu (Tier B)", href: "/components/dropdown-menu" },
  { name: "Toast (Tier B)", href: "/components/toast" },
  { name: "Badge (Tier B)", href: "/components/badge" },
  { name: "Avatar (Tier B)", href: "/components/avatar" },
  { name: "Pagination (Tier B)", href: "/components/pagination" },
  { name: "Breadcrumb (Tier B)", href: "/components/breadcrumb" },
  { name: "DataTable (Tier C)", href: "/components/data-table" },
  { name: "DatePicker (Tier C)", href: "/components/date-picker" },
  { name: "CommandPalette (Tier C)", href: "/components/command-palette" },
  { name: "Combobox (Tier C)", href: "/components/combobox" }
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
  },
  {
    name: "FLUID Library Structure Map",
    href: "/academy/structure-map",
    markdown: structureMapMarkdown
  },
  {
    name: "Button Component Deep Dive",
    href: "/academy/button-deep-dive",
    markdown: buttonDeepDiveMarkdown
  },
  {
    name: "FLUID Package Usage Tutorial",
    href: "/academy/package-usage-tutorial",
    markdown: packageUsageTutorialMarkdown
  },
  {
    name: "Backlog Index",
    href: "/academy/backlogs",
    markdown: backlogIndexMarkdown
  },
  {
    name: "Mobile Readiness Backlog",
    href: "/academy/mobile-readiness",
    markdown: mobileReadinessMarkdown
  }
];

const academyCoreRoutes = academyRoutes.filter((item) => item.href !== "/academy/mobile-readiness" && item.href !== "/academy/backlogs");
const academyBacklogRoutes = academyRoutes.filter((item) => item.href === "/academy/mobile-readiness" || item.href === "/academy/backlogs");

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
          <h2>Core Notes</h2>
          <ul>
            {academyCoreRoutes.map((item) => (
              <li key={item.href}>
                <a href={item.href}>{item.name}</a>
              </li>
            ))}
          </ul>
          <h2>Backlogs</h2>
          <ul>
            {academyBacklogRoutes.map((item) => (
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
    case "/academy/structure-map":
      return (
        <main>
          <h1>Academy: FLUID Library Structure Map</h1>
          <article
            className="academy-markdown"
            dangerouslySetInnerHTML={{ __html: marked.parse(structureMapMarkdown) }}
          />
        </main>
      );
    case "/academy/button-deep-dive":
      return (
        <main>
          <h1>Academy: Button Component Deep Dive</h1>
          <article
            className="academy-markdown"
            dangerouslySetInnerHTML={{ __html: marked.parse(buttonDeepDiveMarkdown) }}
          />
        </main>
      );
    case "/academy/package-usage-tutorial":
      return (
        <main>
          <h1>Academy: FLUID Package Usage Tutorial</h1>
          <article
            className="academy-markdown"
            dangerouslySetInnerHTML={{ __html: marked.parse(packageUsageTutorialMarkdown) }}
          />
        </main>
      );
    case "/academy/mobile-readiness":
      return (
        <main>
          <h1>Academy: Mobile Readiness Backlog</h1>
          <article
            className="academy-markdown"
            dangerouslySetInnerHTML={{ __html: marked.parse(mobileReadinessMarkdown) }}
          />
        </main>
      );
    case "/academy/backlogs":
      return (
        <main>
          <h1>Academy: Backlog Index</h1>
          <article
            className="academy-markdown"
            dangerouslySetInnerHTML={{ __html: marked.parse(backlogIndexMarkdown) }}
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
    case "/components/tabs":
      return (
        <ComponentPage
          name={`Tabs (Tier ${maturityMap.Tabs})`}
          sections={{
            default: (
              <Tabs
                defaultValue="account"
                items={[
                  { value: "account", label: "Account", content: "Account Panel" },
                  { value: "security", label: "Security", content: "Security Panel" }
                ]}
              />
            ),
            variants: (
              <Tabs
                defaultValue="overview"
                items={[
                  { value: "overview", label: "Overview", content: "Overview Panel" },
                  { value: "billing", label: "Billing", content: "Billing Panel" }
                ]}
              />
            ),
            disabled: <p>Disabled tabs variant will be added with richer keyboard guards.</p>,
            theming: <p>Tabs theming is currently class-driven and will migrate to token-only styling.</p>,
            accessibility: <p>Tabs expose `tablist`, `tab`, and `tabpanel` roles for navigation.</p>
          }}
        />
      );
    case "/components/accordion":
      return (
        <ComponentPage
          name={`Accordion (Tier ${maturityMap.Accordion})`}
          sections={{
            default: <Accordion items={[{ id: "a1", title: "Section A", content: "A body" }]} />,
            variants: (
              <Accordion
                items={[
                  { id: "b1", title: "Section B", content: "B body" },
                  { id: "c1", title: "Section C", content: "C body" }
                ]}
              />
            ),
            disabled: <p>Disabled accordion state is planned with per-item lock support.</p>,
            theming: <p>Accordion visual states will align with token-based spacings and borders.</p>,
            accessibility: <p>Accordion uses button controls with `aria-expanded` state.</p>
          }}
        />
      );
    case "/components/tooltip":
      return (
        <ComponentPage
          name={`Tooltip (Tier ${maturityMap.Tooltip})`}
          sections={{
            default: <Tooltip content="Helpful info">Hover target</Tooltip>,
            variants: <Tooltip content="Variant hint">Variant target</Tooltip>,
            disabled: <p>Disabled tooltip trigger behavior is pending richer trigger-state handling.</p>,
            theming: <p>Tooltip theming is in-progress for surface and elevation tokens.</p>,
            accessibility: <p>Tooltip usage should provide non-visual context parity in nearby text.</p>
          }}
        />
      );
    case "/components/popover":
      return (
        <ComponentPage
          name={`Popover (Tier ${maturityMap.Popover})`}
          sections={{
            default: <Popover trigger={<Button>Open</Button>} content="Popover content" />,
            variants: <Popover trigger={<Button className="fluid-btn-variant">Open</Button>} content="Variant content" />,
            disabled: <p>Disabled popover trigger states are not yet implemented.</p>,
            theming: <p>Popover surface tokens will be expanded for stronger theme support.</p>,
            accessibility: <p>Popover content should preserve focus order and readable structure.</p>
          }}
        />
      );
    case "/components/dropdown-menu":
      return (
        <ComponentPage
          name={`DropdownMenu (Tier ${maturityMap.DropdownMenu})`}
          sections={{
            default: <DropdownMenu items={[{ label: "Edit", value: "edit" }, { label: "Delete", value: "delete" }]} />,
            variants: (
              <DropdownMenu
                items={[{ label: "Open", value: "open" }, { label: "Share", value: "share" }]}
              />
            ),
            disabled: <p>Disabled menu item model is planned in a follow-up iteration.</p>,
            theming: <p>Menu spacing and hover token alignment remains in progress.</p>,
            accessibility: <p>Menu control semantics will be hardened with richer keyboard navigation.</p>
          }}
        />
      );
    case "/components/toast":
      return (
        <ComponentPage
          name={`Toast (Tier ${maturityMap.Toast})`}
          sections={{
            default: <Toast>Saved successfully</Toast>,
            variants: <Toast className="fluid-btn-variant">Warning message</Toast>,
            disabled: <p>Toast queue/disable behavior is not applicable in this basic preview.</p>,
            theming: <Toast className="fluid-btn-themed">Themed toast</Toast>,
            accessibility: <p>Toast uses status role for non-blocking announcements.</p>
          }}
        />
      );
    case "/components/badge":
      return (
        <ComponentPage
          name={`Badge (Tier ${maturityMap.Badge})`}
          sections={{
            default: <Badge>New</Badge>,
            variants: <Badge className="fluid-btn-variant">Beta</Badge>,
            disabled: <p>Disabled badge styling is pending token-level semantic color support.</p>,
            theming: <Badge className="fluid-btn-themed">Themed</Badge>,
            accessibility: <p>Badges should not be the only way to communicate critical status.</p>
          }}
        />
      );
    case "/components/avatar":
      return (
        <ComponentPage
          name={`Avatar (Tier ${maturityMap.Avatar})`}
          sections={{
            default: <Avatar alt="Demo avatar" src="https://placehold.co/48x48/png" />,
            variants: <Avatar alt="Variant avatar" src="https://placehold.co/48x48/png" className="fluid-btn-variant" />,
            disabled: <p>Disabled avatar state is not defined because avatar is presentational.</p>,
            theming: <Avatar alt="Themed avatar" src="https://placehold.co/48x48/png" className="fluid-btn-themed" />,
            accessibility: <p>Avatar must always include meaningful `alt` text.</p>
          }}
        />
      );
    case "/components/pagination":
      return (
        <ComponentPage
          name={`Pagination (Tier ${maturityMap.Pagination})`}
          sections={{
            default: <Pagination page={2} totalPages={5} />,
            variants: <Pagination page={3} totalPages={9} className="fluid-btn-variant" />,
            disabled: <p>Disabled previous/next controls are planned for edge pages.</p>,
            theming: <Pagination page={1} totalPages={4} className="fluid-btn-themed" />,
            accessibility: <p>Pagination is wrapped in navigation semantics via `nav`.</p>
          }}
        />
      );
    case "/components/breadcrumb":
      return (
        <ComponentPage
          name={`Breadcrumb (Tier ${maturityMap.Breadcrumb})`}
          sections={{
            default: <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Components" }, { label: "Button" }]} />,
            variants: (
              <Breadcrumb
                items={[{ label: "Docs", href: "/" }, { label: "Academy", href: "/academy" }, { label: "Deep Dive" }]}
              />
            ),
            disabled: <p>Disabled breadcrumb segments are not part of current behavior model.</p>,
            theming: <p>Breadcrumb theming currently inherits typography and spacing utilities.</p>,
            accessibility: <p>Breadcrumb is exposed via `nav` with `aria-label=\"breadcrumb\"`.</p>
          }}
        />
      );
    case "/components/data-table":
      return (
        <ComponentPage
          name={`DataTable (Tier ${maturityMap.DataTable})`}
          sections={{
            default: (
              <>
                <p><strong>Experimental</strong></p>
                <DataTable
                  columns={[
                    { key: "name", header: "Name" },
                    { key: "role", header: "Role" }
                  ]}
                  rows={[
                    { id: "1", name: "Amar", role: "Admin" },
                    { id: "2", name: "Ravi", role: "User" }
                  ]}
                />
              </>
            ),
            variants: <p>Variant model is not yet defined for DataTable.</p>,
            disabled: <p>Disabled row/cell interactions are pending.</p>,
            theming: <p>Table tokens for density and borders are still evolving.</p>,
            accessibility: (
              <>
                <p>DataTable uses semantic table elements.</p>
                <h3>Caveats</h3>
                <ul>
                  <li>No sorting or filtering yet.</li>
                  <li>No keyboard row navigation yet.</li>
                </ul>
              </>
            )
          }}
        />
      );
    case "/components/date-picker":
      return (
        <ComponentPage
          name={`DatePicker (Tier ${maturityMap.DatePicker})`}
          sections={{
            default: (
              <>
                <p><strong>Experimental</strong></p>
                <DatePicker aria-label="date-picker-demo" />
              </>
            ),
            variants: <DatePicker aria-label="date-picker-variant" className="fluid-input-variant" />,
            disabled: <DatePicker aria-label="date-picker-disabled" disabled />,
            theming: <DatePicker aria-label="date-picker-themed" className="fluid-input-themed" />,
            accessibility: (
              <>
                <p>DatePicker currently wraps native date input semantics.</p>
                <h3>Caveats</h3>
                <ul>
                  <li>Calendar UI varies by browser.</li>
                  <li>No range mode yet.</li>
                </ul>
              </>
            )
          }}
        />
      );
    case "/components/command-palette":
      return (
        <ComponentPage
          name={`CommandPalette (Tier ${maturityMap.CommandPalette})`}
          sections={{
            default: (
              <>
                <p><strong>Experimental</strong></p>
                <CommandPalette items={[{ label: "Open Settings", value: "settings" }]} />
              </>
            ),
            variants: <CommandPalette items={[{ label: "Create Project", value: "create" }]} className="fluid-input-variant" />,
            disabled: <p>Disabled command execution model is pending.</p>,
            theming: <p>Command palette overlays and surfaces are still evolving.</p>,
            accessibility: (
              <>
                <p>Command list uses plain button controls for now.</p>
                <h3>Caveats</h3>
                <ul>
                  <li>No keyboard shortcuts yet.</li>
                  <li>No async command loading yet.</li>
                </ul>
              </>
            )
          }}
        />
      );
    case "/components/combobox":
      return (
        <ComponentPage
          name={`Combobox (Tier ${maturityMap.Combobox})`}
          sections={{
            default: (
              <>
                <p><strong>Experimental</strong></p>
                <Combobox
                  aria-label="combobox-demo"
                  options={[
                    { value: "react", label: "React" },
                    { value: "vue", label: "Vue" }
                  ]}
                />
              </>
            ),
            variants: (
              <Combobox
                aria-label="combobox-variant"
                className="fluid-input-variant"
                options={[
                  { value: "design", label: "Design" },
                  { value: "dev", label: "Development" }
                ]}
              />
            ),
            disabled: <Combobox aria-label="combobox-disabled" disabled options={[{ value: "disabled", label: "Disabled" }]} />,
            theming: (
              <Combobox
                aria-label="combobox-themed"
                className="fluid-input-themed"
                options={[{ value: "theme", label: "Theme" }]}
              />
            ),
            accessibility: (
              <>
                <p>Combobox is currently implemented with input+datalist.</p>
                <h3>Caveats</h3>
                <ul>
                  <li>Keyboard behavior depends on browser datalist support.</li>
                  <li>No async option loading yet.</li>
                </ul>
              </>
            )
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
