/*
 * Architecture of the Auto Ontology pilot: what runs locally, what goes to NVIDIA's hosted models,
 * and where the agreed rules live. Generic pipeline only: no client tables, columns or figures.
 * Plain HTML so it reflows to one column on small screens; arrows are decorative (aria-hidden),
 * and the order of the steps carries the flow for screen readers.
 */

function Down() {
  return (
    <span aria-hidden="true" className="flex justify-center py-1.5 font-mono text-sm leading-none text-cyan">
      ↓
    </span>
  );
}

function Node({
  step,
  title,
  children,
  mine,
}: {
  step: string;
  title: string;
  children: React.ReactNode;
  /** Something I added by hand, as opposed to what the tool produced. */
  mine?: boolean;
}) {
  return (
    <div className={`rounded-lg border bg-deep/90 p-3.5 ${mine ? "border-cyan/60" : "border-line-strong"}`}>
      <p className="font-mono text-[0.625rem] tracking-[0.16em] text-cyan uppercase">{step}</p>
      <p className="mt-1 text-sm font-semibold text-ink">{title}</p>
      <div className="mt-1 text-xs leading-relaxed text-muted">{children}</div>
    </div>
  );
}

export function Architecture() {
  return (
    <figure className="panel ticks p-5 sm:p-7">
      <figcaption>
        <p className="font-display text-lg font-semibold tracking-tight text-ink">How it fits together</p>
        <p className="mt-1 text-sm text-muted">
          Everything ran locally in Docker except the language models, which NVIDIA hosts. Boxes with a cyan border are
          the parts I added by hand; the rest is what the tool builds.
        </p>
      </figcaption>

      {/*
       * Wide screens: a 3-column, 4-row grid. The dashed "my machine" frame is its own grid item spanning
       * column 1, rows 1–4, and the steps sit on top of it, so the hosted zone can line up with step 03.
       * Narrow screens: one column in DOM order, with the frame hidden and a plain label instead.
       */}
      <div className="mt-6 grid gap-x-4 lg:grid-cols-[minmax(0,1fr)_7.5rem_minmax(0,14rem)] lg:grid-rows-[auto_auto_auto_auto]">
        <div
          aria-hidden="true"
          className="hidden rounded-xl border border-dashed border-line-strong lg:col-start-1 lg:row-span-4 lg:row-start-1 lg:block"
        />
        <div className="lg:col-start-1 lg:row-start-1 lg:px-4 lg:pt-4">
          <p className="mb-3 font-mono text-[0.625rem] tracking-[0.16em] text-dim uppercase">My machine · Docker</p>
          <Node step="01 · Source" title="CRM export">
            Contacts, deals, leads and stages. Email and phone dropped before loading.
          </Node>
          <Down />
        </div>
        <div className="lg:col-start-1 lg:row-start-2 lg:px-4">
          <Node step="02 · Database" title="PostgreSQL, 8 tables" mine>
            Plus views that hold the agreed rules (won month, channel group, monthly funnel). Two confusing tables
            hidden from the agent.
          </Node>
          <Down />
        </div>
        <div className="lg:col-start-1 lg:row-start-3 lg:px-4">
          <div className="rounded-lg border border-line-strong bg-cyan/5 p-2.5">
            <p className="px-1 pb-2 font-mono text-[0.625rem] tracking-[0.16em] text-cyan uppercase">
              03 · NVIDIA Auto Ontology
            </p>
            <div className="grid gap-2 sm:grid-cols-3 lg:grid-cols-1">
              <Node step="Build" title="Business map">
                Terms, column descriptions and table links, drafted automatically.
              </Node>
              <Node step="Rules" title="10 SQL metrics" mine>
                The agreed funnel definitions, written by hand and attached to terms.
              </Node>
              <Node step="Agent" title="Chat agent">
                Searches the map, tests queries, then submits one final SQL query.
              </Node>
            </div>
          </div>
        </div>

        {/* The link between the zones */}
        <div
          aria-hidden="true"
          className="flex flex-col items-center gap-1 py-3 text-center lg:col-start-2 lg:row-start-3 lg:self-center lg:py-0"
        >
          <span className="font-mono text-sm text-cyan">
            <span className="lg:hidden">↓</span>
            <span className="hidden lg:inline">→</span>
          </span>
          <span className="text-[0.6875rem] leading-snug text-muted">Sampled values, questions, embeddings</span>
          <span className="font-mono text-sm text-cyan">
            <span className="lg:hidden">↑</span>
            <span className="hidden lg:inline">←</span>
          </span>
          <span className="text-[0.6875rem] leading-snug text-muted">Names, descriptions, draft SQL</span>
        </div>

        {/* Hosted zone */}
        <div className="rounded-xl border border-dashed border-viz-2/70 p-3 sm:p-4 lg:col-start-3 lg:row-start-3 lg:self-center">
          <p className="mb-3 font-mono text-[0.625rem] tracking-[0.16em] text-dim uppercase">NVIDIA hosted API</p>
          <Node step="Build model" title="Drafts the map">
            Names terms and describes columns from sampled values.
          </Node>
          <div className="h-2" />
          <Node step="Answering model" title="Nemotron Ultra (from B3)">
            Writes the SQL for each question. B1 and B2 used the tool’s smaller default, Nemotron 3.5 Lightning.
          </Node>
          <p className="mt-3 text-[0.6875rem] leading-relaxed text-muted">
            This is the data that leaves the machine. Review it before using real client data.
          </p>
        </div>

        <div className="mt-4 lg:col-start-1 lg:row-start-4 lg:mt-0 lg:px-4 lg:pb-4">
          <Down />
          <Node step="04 · Answer" title="Chat, MCP or API">
            A number plus the SQL behind it, so anyone can check how it was computed.
          </Node>
        </div>
      </div>

      <p className="sr-only">
        Flow: a CRM export, with email and phone removed, is loaded into PostgreSQL, where views hold the agreed rules
        and two confusing tables are hidden. NVIDIA Auto Ontology builds a business map, holds 10 hand-written SQL
        metrics and runs a chat agent. The answer comes back through chat, MCP or an API with its SQL. All of this runs
        locally in Docker; sampled values, questions and embeddings are sent to NVIDIA’s hosted models, which return
        names, descriptions and draft SQL. Answers used Nemotron 3.5 Lightning in batches B1 and B2 and Nemotron Ultra from B3 onward.
      </p>
    </figure>
  );
}
