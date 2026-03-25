import { Button } from "../../../../../packages/fluid-react/src";

export default function ButtonDocsPage() {
  return (
    <main>
      <h1>Button</h1>

      <section>
        <h2>Default</h2>
        <Button>Default</Button>
      </section>

      <section>
        <h2>Variants</h2>
        <Button className="fluid-btn-primary">Primary</Button>
      </section>

      <section>
        <h2>Disabled</h2>
        <Button disabled>Disabled</Button>
      </section>

      <section>
        <h2>Theming</h2>
        <Button className="theme-construction">Themed</Button>
      </section>

      <section>
        <h2>Accessibility</h2>
        <p>Supports keyboard activation with Enter on focused button.</p>
      </section>
    </main>
  );
}
