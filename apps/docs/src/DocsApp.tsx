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
import {
  applyThemeVariables,
  clearThemeVariables,
  createTheme,
  themeContractToVariables
} from "@fluid-ui/react/tokens";
import maturityMap from "../content/maturity.json";
import themeProfilesData from "../content/theme-profiles.json";
import firstPrinciplesMarkdown from "../../../docs/academy/first-principles-web-fundamentals.md?raw";
import sessionHandoffMarkdown from "../../../docs/academy/session-handoff-guide.md?raw";
import questionBankMarkdown from "../../../docs/academy/first-principles-question-bank.md?raw";
import structureMapMarkdown from "../../../docs/academy/fluid-library-structure-map.md?raw";
import mobileReadinessMarkdown from "../../../docs/academy/mobile-readiness-backlog.md?raw";
import backlogIndexMarkdown from "../../../docs/academy/backlog-index.md?raw";
import buttonDeepDiveMarkdown from "../../../docs/academy/button-component-deep-dive.md?raw";
import packageUsageTutorialMarkdown from "../../../docs/academy/fluid-package-usage-tutorial.md?raw";

const THEME_STORAGE_KEY = "fluid-docs-theme-id";

type ThemeProfile = {
  id: string;
  label: string;
  description: string;
  tokens: Parameters<typeof createTheme>[0];
};

const themeProfiles = themeProfilesData.profiles as ThemeProfile[];
type EditableThemeColorKey = "primary" | "surface" | "text" | "muted" | "theme";

const editableThemeColorFields: Array<{ key: EditableThemeColorKey; label: string; ariaLabel: string }> = [
  { key: "primary", label: "Primary", ariaLabel: "Primary color token" },
  { key: "surface", label: "Surface", ariaLabel: "Surface color token" },
  { key: "text", label: "Text", ariaLabel: "Text color token" },
  { key: "muted", label: "Muted", ariaLabel: "Muted color token" },
  { key: "theme", label: "Theme accent", ariaLabel: "Theme accent token" }
];

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

function ComponentPage({
  name,
  sections,
  themeDashboard
}: {
  name: string;
  sections: ComponentSections;
  themeDashboard: React.ReactNode;
}) {
  return (
    <main>
      <h1>{name}</h1>
      {themeDashboard}
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
  const [activeThemeId, setActiveThemeId] = React.useState(() => {
    if (typeof window === "undefined") {
      return themeProfiles[0]?.id ?? "default";
    }
    return window.localStorage.getItem(THEME_STORAGE_KEY) ?? themeProfiles[0]?.id ?? "default";
  });
  const [themeColorOverrides, setThemeColorOverrides] = React.useState<
    Partial<Record<EditableThemeColorKey, string>>
  >({});
  const appliedThemeVariablesRef = React.useRef<string[]>([]);
  const activeThemeProfile =
    themeProfiles.find((profile) => profile.id === activeThemeId) ?? themeProfiles[0];

  React.useEffect(() => {
    if (!activeThemeProfile) {
      return;
    }

    clearThemeVariables(appliedThemeVariablesRef.current);
    const resolvedThemeTokens = {
      ...activeThemeProfile.tokens,
      color: {
        ...activeThemeProfile.tokens.color,
        ...themeColorOverrides
      }
    };
    const variables = themeContractToVariables(createTheme(resolvedThemeTokens));
    applyThemeVariables(variables);
    appliedThemeVariablesRef.current = Object.keys(variables);
    document.documentElement.setAttribute("data-fluid-theme", activeThemeProfile.id);
    window.localStorage.setItem(THEME_STORAGE_KEY, activeThemeProfile.id);
  }, [activeThemeProfile, themeColorOverrides]);

  const themeDashboard = (
    <section style={{ marginBottom: 16 }}>
      <label htmlFor="theme-profile-select" style={{ display: "block", fontWeight: 600 }}>
        Docs Theme
      </label>
      <select
        id="theme-profile-select"
        aria-label="Theme profile"
        value={activeThemeId}
        onChange={(event) => {
          setActiveThemeId(event.target.value);
          setThemeColorOverrides({});
        }}
      >
        {themeProfiles.map((profile) => (
          <option key={profile.id} value={profile.id}>
            {profile.label}
          </option>
        ))}
      </select>
      <p style={{ marginTop: 8 }}>{activeThemeProfile?.description}</p>
      <div style={{ display: "grid", gap: 8, maxWidth: 320 }}>
        {editableThemeColorFields.map((field) => (
          <label key={field.key} style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ width: 108 }}>{field.label}</span>
            <input
              aria-label={field.ariaLabel}
              type="color"
              value={themeColorOverrides[field.key] ?? activeThemeProfile?.tokens.color[field.key] ?? "#000000"}
              onChange={(event) =>
                setThemeColorOverrides((previous) => ({ ...previous, [field.key]: event.target.value }))
              }
            />
          </label>
        ))}
      </div>
      <button type="button" onClick={() => setThemeColorOverrides({})} style={{ marginTop: 8 }}>
        Reset Theme Colors
      </button>
    </section>
  );

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
              <a href="/theme-dashboard">Open Theme Dashboard</a>
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
          {themeDashboard}
          <ul>
            {componentRoutes.map((item) => (
              <li key={item.href}>
                <a href={item.href}>{item.name}</a>
              </li>
            ))}
          </ul>
        </main>
      );
    case "/theme-dashboard":
    case "/theme-dashboard/":
      return (
        <main>
          <h1>Theme Dashboard</h1>
          <p>Use profiles or color token overrides to preview themed components.</p>
          {themeDashboard}
          <SectionFrame title="Live Preview">
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <Button className="fluid-btn-themed">Themed Button</Button>
              <Input aria-label="theme-dashboard-input" defaultValue="Themed Input" className="fluid-input-themed" />
              <Badge className="fluid-badge-themed">Themed Badge</Badge>
            </div>
          </SectionFrame>
        </main>
      );
    case "/components/button":
      return (
        <ComponentPage
          themeDashboard={themeDashboard}
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
          themeDashboard={themeDashboard}
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
          themeDashboard={themeDashboard}
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
          themeDashboard={themeDashboard}
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
          themeDashboard={themeDashboard}
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
          themeDashboard={themeDashboard}
          name="Checkbox"
          sections={{
            default: <Checkbox aria-label="accept" />,
            variants: <Checkbox aria-label="accept-variant" className="fluid-checkbox-variant" />,
            disabled: <Checkbox aria-label="accept-disabled" disabled />,
            theming: <Checkbox aria-label="accept-themed" className="fluid-checkbox-themed" />,
            accessibility: <p>Checkbox has native checked state and keyboard toggling.</p>
          }}
        />
      );
    case "/components/radio-group":
      return (
        <ComponentPage
          themeDashboard={themeDashboard}
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
                className="fluid-radio-group-variant"
                name="plan-variant"
                options={[
                  { label: "Standard", value: "standard" },
                  { label: "Enterprise", value: "enterprise" }
                ]}
              />
            ),
            disabled: (
              <RadioGroup
                aria-label="plan-disabled"
                className="fluid-radio-group-disabled"
                name="plan-disabled"
                options={[
                  { label: "Locked Basic", value: "basic" },
                  { label: "Locked Pro", value: "pro" }
                ]}
              />
            ),
            theming: (
              <RadioGroup
                aria-label="plan-themed"
                className="fluid-radio-group-themed"
                name="plan-themed"
                options={[
                  { label: "Theme Basic", value: "basic" },
                  { label: "Theme Pro", value: "pro" }
                ]}
              />
            ),
            accessibility: <p>RadioGroup exposes grouped radio semantics through fieldset + inputs.</p>
          }}
        />
      );
    case "/components/switch":
      return (
        <ComponentPage
          themeDashboard={themeDashboard}
          name="Switch"
          sections={{
            default: <Switch aria-label="dark-mode" />,
            variants: <Switch aria-label="dark-mode-variant" className="fluid-switch-variant" />,
            disabled: <Switch aria-label="dark-mode-disabled" disabled />,
            theming: <Switch aria-label="dark-mode-themed" className="fluid-switch-themed" />,
            accessibility: <p>Switch uses role=switch with aria-checked updates.</p>
          }}
        />
      );
    case "/components/card":
      return (
        <ComponentPage
          themeDashboard={themeDashboard}
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
          themeDashboard={themeDashboard}
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
          themeDashboard={themeDashboard}
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
                className="fluid-tabs-variant"
                defaultValue="overview"
                items={[
                  { value: "overview", label: "Overview", content: "Overview Panel" },
                  { value: "billing", label: "Billing", content: "Billing Panel" }
                ]}
              />
            ),
            disabled: (
              <Tabs
                className="fluid-tabs-disabled"
                defaultValue="locked-a"
                items={[
                  { value: "locked-a", label: "Locked A", content: "Disabled preview A" },
                  { value: "locked-b", label: "Locked B", content: "Disabled preview B" }
                ]}
              />
            ),
            theming: (
              <Tabs
                className="fluid-tabs-themed"
                defaultValue="theme-a"
                items={[
                  { value: "theme-a", label: "Themed A", content: "Themed panel A" },
                  { value: "theme-b", label: "Themed B", content: "Themed panel B" }
                ]}
              />
            ),
            accessibility: <p>Tabs expose `tablist`, `tab`, and `tabpanel` roles for navigation.</p>
          }}
        />
      );
    case "/components/accordion":
      return (
        <ComponentPage
          themeDashboard={themeDashboard}
          name={`Accordion (Tier ${maturityMap.Accordion})`}
          sections={{
            default: <Accordion items={[{ id: "a1", title: "Section A", content: "A body" }]} />,
            variants: (
              <Accordion
                className="fluid-accordion-variant"
                items={[
                  { id: "b1", title: "Section B", content: "B body" },
                  { id: "c1", title: "Section C", content: "C body" }
                ]}
              />
            ),
            disabled: (
              <Accordion
                className="fluid-accordion-disabled"
                items={[{ id: "d1", title: "Disabled Section", content: "Read-only accordion preview" }]}
              />
            ),
            theming: (
              <Accordion
                className="fluid-accordion-themed"
                items={[{ id: "t1", title: "Themed Section", content: "Themed accordion content" }]}
              />
            ),
            accessibility: <p>Accordion uses button controls with `aria-expanded` state.</p>
          }}
        />
      );
    case "/components/tooltip":
      return (
        <ComponentPage
          themeDashboard={themeDashboard}
          name={`Tooltip (Tier ${maturityMap.Tooltip})`}
          sections={{
            default: <Tooltip content="Helpful info">Hover target</Tooltip>,
            variants: <Tooltip className="fluid-tooltip-variant" content="Variant hint">Variant target</Tooltip>,
            disabled: <Tooltip className="fluid-tooltip-disabled" content="Disabled hint">Disabled preview</Tooltip>,
            theming: <Tooltip className="fluid-tooltip-themed" content="Themed hint">Themed target</Tooltip>,
            accessibility: <p>Tooltip usage should provide non-visual context parity in nearby text.</p>
          }}
        />
      );
    case "/components/popover":
      return (
        <ComponentPage
          themeDashboard={themeDashboard}
          name={`Popover (Tier ${maturityMap.Popover})`}
          sections={{
            default: <Popover trigger={<Button>Open</Button>} content="Popover content" />,
            variants: <Popover className="fluid-popover-variant" trigger={<Button className="fluid-btn-variant">Open</Button>} content="Variant content" />,
            disabled: <Popover className="fluid-popover-disabled" trigger={<Button disabled>Disabled</Button>} content="Disabled preview" />,
            theming: <Popover className="fluid-popover-themed" trigger={<Button className="fluid-btn-themed">Open</Button>} content="Themed content" />,
            accessibility: <p>Popover content should preserve focus order and readable structure.</p>
          }}
        />
      );
    case "/components/dropdown-menu":
      return (
        <ComponentPage
          themeDashboard={themeDashboard}
          name={`DropdownMenu (Tier ${maturityMap.DropdownMenu})`}
          sections={{
            default: (
              <DropdownMenu
                triggerLabel="Actions"
                items={[{ label: "Edit", value: "edit" }, { label: "Delete", value: "delete" }]}
              />
            ),
            variants: (
              <DropdownMenu
                triggerLabel="More"
                className="fluid-dropdown-menu-variant"
                items={[{ label: "Open", value: "open" }, { label: "Share", value: "share" }]}
              />
            ),
            disabled: (
              <DropdownMenu
                triggerLabel="Disabled"
                className="fluid-dropdown-menu-disabled"
                items={[{ label: "Locked", value: "locked" }]}
              />
            ),
            theming: (
              <DropdownMenu
                triggerLabel="Theme"
                className="fluid-dropdown-menu-themed"
                items={[{ label: "Theme Action", value: "theme" }]}
              />
            ),
            accessibility: <p>Menu control semantics will be hardened with richer keyboard navigation.</p>
          }}
        />
      );
    case "/components/toast":
      return (
        <ComponentPage
          themeDashboard={themeDashboard}
          name={`Toast (Tier ${maturityMap.Toast})`}
          sections={{
            default: <Toast>Saved successfully</Toast>,
            variants: <Toast className="fluid-toast-variant">Warning message</Toast>,
            disabled: <p>Toast queue/disable behavior is not applicable in this basic preview.</p>,
            theming: <Toast className="fluid-toast-themed">Themed toast</Toast>,
            accessibility: <p>Toast uses status role for non-blocking announcements.</p>
          }}
        />
      );
    case "/components/badge":
      return (
        <ComponentPage
          themeDashboard={themeDashboard}
          name={`Badge (Tier ${maturityMap.Badge})`}
          sections={{
            default: <Badge>New</Badge>,
            variants: <Badge className="fluid-badge-variant">Beta</Badge>,
            disabled: <p>Disabled badge styling is pending token-level semantic color support.</p>,
            theming: <Badge className="fluid-badge-themed">Themed</Badge>,
            accessibility: <p>Badges should not be the only way to communicate critical status.</p>
          }}
        />
      );
    case "/components/avatar":
      return (
        <ComponentPage
          themeDashboard={themeDashboard}
          name={`Avatar (Tier ${maturityMap.Avatar})`}
          sections={{
            default: <Avatar alt="Demo avatar" src="https://placehold.co/48x48/png" />,
            variants: <Avatar alt="Variant avatar" src="https://placehold.co/48x48/png" className="fluid-avatar-variant" />,
            disabled: <p>Disabled avatar state is not defined because avatar is presentational.</p>,
            theming: <Avatar alt="Themed avatar" src="https://placehold.co/48x48/png" className="fluid-avatar-themed" />,
            accessibility: <p>Avatar must always include meaningful `alt` text.</p>
          }}
        />
      );
    case "/components/pagination":
      return (
        <ComponentPage
          themeDashboard={themeDashboard}
          name={`Pagination (Tier ${maturityMap.Pagination})`}
          sections={{
            default: <Pagination page={2} totalPages={5} />,
            variants: <Pagination page={3} totalPages={9} className="fluid-pagination-variant" />,
            disabled: <p>Disabled previous/next controls are planned for edge pages.</p>,
            theming: <Pagination page={1} totalPages={4} className="fluid-pagination-themed" />,
            accessibility: <p>Pagination is wrapped in navigation semantics via `nav`.</p>
          }}
        />
      );
    case "/components/breadcrumb":
      return (
        <ComponentPage
          themeDashboard={themeDashboard}
          name={`Breadcrumb (Tier ${maturityMap.Breadcrumb})`}
          sections={{
            default: <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Components" }, { label: "Button" }]} />,
            variants: (
              <Breadcrumb
                className="fluid-breadcrumb-variant"
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
          themeDashboard={themeDashboard}
          name={`DataTable (Tier ${maturityMap.DataTable})`}
          sections={{
            default: (
              <>
                <p><strong>Experimental</strong></p>
                <DataTable
                  columns={[
                    { key: "name", header: "Name" },
                    { key: "role", header: "Role" },
                    { key: "status", header: "Status" }
                  ]}
                  rows={[
                    { id: "1", name: "Amar", role: "Admin", status: "Active" },
                    { id: "2", name: "Ravi", role: "User", status: "Pending" },
                    { id: "3", name: "Anika", role: "Editor", status: "Active" }
                  ]}
                />
              </>
            ),
            variants: (
              <DataTable
                className="fluid-data-table-variant"
                columns={[
                  { key: "project", header: "Project" },
                  { key: "owner", header: "Owner" },
                  { key: "priority", header: "Priority" }
                ]}
                rows={[
                  { id: "p1", project: "Design System", owner: "Maya", priority: "High" },
                  { id: "p2", project: "Mobile QA", owner: "Ravi", priority: "Medium" },
                  { id: "p3", project: "Docs Refresh", owner: "Anika", priority: "Low" }
                ]}
              />
            ),
            disabled: (
              <>
                <p>Read-only preview (experimental):</p>
                <DataTable
                  className="fluid-data-table-disabled"
                  columns={[
                    { key: "record", header: "Record" },
                    { key: "state", header: "State" }
                  ]}
                  rows={[
                    { id: "r1", record: "Sync Job", state: "Locked" },
                    { id: "r2", record: "Audit Log", state: "Locked" }
                  ]}
                />
              </>
            ),
            theming: (
              <DataTable
                className="fluid-data-table-themed"
                columns={[
                  { key: "module", header: "Module" },
                  { key: "owner", header: "Owner" },
                  { key: "eta", header: "ETA" }
                ]}
                rows={[
                  { id: "m1", module: "Auth", owner: "Ishan", eta: "2d" },
                  { id: "m2", module: "Billing", owner: "Neha", eta: "5d" }
                ]}
              />
            ),
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
          themeDashboard={themeDashboard}
          name={`DatePicker (Tier ${maturityMap.DatePicker})`}
          sections={{
            default: (
              <>
                <p><strong>Experimental</strong></p>
                <DatePicker aria-label="date-picker-demo" />
              </>
            ),
            variants: <DatePicker aria-label="date-picker-variant" className="fluid-date-picker-variant" />,
            disabled: <DatePicker aria-label="date-picker-disabled" disabled />,
            theming: <DatePicker aria-label="date-picker-themed" className="fluid-date-picker-themed" />,
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
          themeDashboard={themeDashboard}
          name={`CommandPalette (Tier ${maturityMap.CommandPalette})`}
          sections={{
            default: (
              <>
                <p><strong>Experimental</strong></p>
                <CommandPalette items={[{ label: "Open Settings", value: "settings" }]} />
              </>
            ),
            variants: <CommandPalette items={[{ label: "Create Project", value: "create" }]} className="fluid-command-palette-variant" />,
            disabled: <CommandPalette items={[{ label: "Disabled Action", value: "disabled" }]} className="fluid-command-palette-disabled" />,
            theming: <CommandPalette items={[{ label: "Theme Action", value: "theme" }]} className="fluid-command-palette-themed" />,
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
          themeDashboard={themeDashboard}
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
                className="fluid-combobox-variant"
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
                className="fluid-combobox-themed"
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
