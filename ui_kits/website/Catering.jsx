const { Card, Button, Badge, Checkbox, Radio, Select, Input, DashRule, PriceTag, HeatMeter } = window.TheCoopDesignSystem_a9fb85;

const ENTREE_OPTIONS = [
  { id: 'original', name: 'The Original', per: 12 },
  { id: 'classic', name: 'The Classic', per: 13 },
  { id: 'cluckin', name: "The Cluckin'", per: 13 },
  { id: 'bufmac', name: 'The Buf-Mac-Wich', per: 13, heat: 1 },
  { id: 'hothoney', name: 'The Hot Honey', per: 14, heat: 1 },
  { id: 'nashville', name: 'The Nashville', per: 14, heat: 2 },
  { id: 'nuggies', name: 'The Nuggies', per: 8 },
  { id: 'breakfast', name: 'The Breakfast Sandwich', per: 8 }
];

const SIDE_OPTIONS = [
  { id: 'waffle', name: 'Waffle Fries', per: 5 },
  { id: 'cheese', name: 'Cheese Fries', per: 7 },
  { id: 'loaded', name: 'Loaded Fries', per: 10 },
  { id: 'clucked', name: 'Clucked Fries', per: 15 },
  { id: 'macbites', name: 'Fried Mac Bites', per: 7 },
  { id: 'mac', name: 'Mac N Cheese', per: 5 },
  { id: 'slaw', name: 'Coleslaw', per: 4 },
  { id: 'hashbrown', name: 'Hashbrown', per: 2 }
];

const ZONES = [
  { id: 'local', label: 'Within 15 miles of the truck', fee: 0 },
  { id: 'near', label: '15–40 miles', fee: 85 },
  { id: 'far', label: '40–75 miles', fee: 175 },
  { id: 'road', label: 'Over 75 miles', fee: 275 }
];

const SIDE_PORTION = 0.6;   // not every guest takes every side
const STAFF_PER_HOUR = 175; // truck + two on the line
const MIN_SPEND = 850;
const DEPOSIT = 0.25;

const money = n => '$' + n.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 });

function Slider({ label, value, min, max, step, onChange, suffix }) {
  return (
    <div style={{ display: 'grid', gap: 8 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
        <span style={{ ...window.POSTER, fontSize: 'var(--text-2xs)', letterSpacing: 'var(--tracking-caps)' }}>{label}</span>
        <span style={{ ...window.POSTER, fontSize: 'var(--text-lg)', color: 'var(--coop-red)' }}>{value}{suffix}</span>
      </div>
      <input type="range" min={min} max={max} step={step} value={value}
        onChange={e => onChange(Number(e.target.value))}
        style={{ width: '100%', accentColor: 'var(--coop-red)', height: 6 }} />
    </div>
  );
}

function PickList({ options, picked, onToggle, columns = 2 }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: `repeat(${columns},minmax(0,1fr))`, gap: 'var(--space-3)' }}>
      {options.map(o => (
        <div key={o.id} style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 8,
          padding: '10px 12px', borderRadius: 'var(--radius-md)',
          border: '2px solid ' + (picked.includes(o.id) ? 'var(--coop-red)' : 'var(--border-soft)'),
          background: picked.includes(o.id) ? 'rgba(200,37,43,.06)' : 'transparent'
        }}>
          <Checkbox label={o.name} checked={picked.includes(o.id)} onChange={() => onToggle(o.id)} />
          <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            {o.heat ? <HeatMeter level={o.heat} size={14} /> : null}
            <PriceTag value={o.per} size="sm" />
          </span>
        </div>
      ))}
    </div>
  );
}

function Line({ label, note, amount, strong }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 12, padding: '8px 0' }}>
      <div>
        <div style={{ ...window.POSTER, fontSize: strong ? 'var(--text-md)' : 'var(--text-xs)' }}>{label}</div>
        {note && <div style={{ ...window.BODY, fontSize: 'var(--text-2xs)', color: 'var(--text-muted)' }}>{note}</div>}
      </div>
      <PriceTag value={amount.toLocaleString('en-US')} size={strong ? 'md' : 'sm'} tone={strong ? 'red' : 'ink'} />
    </div>
  );
}

function Catering() {
  const [guests, setGuests] = React.useState(60);
  const [hours, setHours] = React.useState(2);
  const [zone, setZone] = React.useState('local');
  const [entrees, setEntrees] = React.useState(['original', 'nuggies']);
  const [sides, setSides] = React.useState(['waffle']);
  const [email, setEmail] = React.useState('');
  const [when, setWhen] = React.useState('');
  const [sent, setSent] = React.useState(false);

  const toggle = (list, set) => id => set(list.includes(id) ? list.filter(x => x !== id) : [...list, id]);

  const chosenEntrees = ENTREE_OPTIONS.filter(o => entrees.includes(o.id));
  const chosenSides = SIDE_OPTIONS.filter(o => sides.includes(o.id));
  const zoneMeta = ZONES.find(z => z.id === zone);

  const entreePer = chosenEntrees.length
    ? chosenEntrees.reduce((t, o) => t + o.per, 0) / chosenEntrees.length : 0;
  const sidePer = chosenSides.reduce((t, o) => t + o.per, 0) * SIDE_PORTION;

  const food = Math.round((entreePer + sidePer) * guests);
  const staffing = STAFF_PER_HOUR * hours;
  const travel = zoneMeta.fee;
  const raw = food + staffing + travel;
  const total = Math.max(raw, MIN_SPEND);
  const belowMin = raw < MIN_SPEND;
  const perHead = guests ? total / guests : 0;
  const deposit = Math.round(total * DEPOSIT);
  const noMenu = chosenEntrees.length === 0;

  return (
    <section style={{ maxWidth: 'var(--max-content)', margin: '0 auto', padding: 'var(--space-7) var(--gutter-page)' }}>
      <div style={{ maxWidth: '52ch', marginBottom: 'var(--space-6)' }}>
        <Badge tone="red">Catering</Badge>
        <h1 style={{ ...window.POSTER, fontSize: 'var(--text-3xl)', margin: '12px 0 8px' }}>Bring the truck to you</h1>
        <p style={{ ...window.BODY, fontSize: 'var(--text-md)', color: 'var(--text-muted)', margin: 0 }}>
          Build your spread below and we'll price it out on the spot. Office lunches, weddings, block parties — we cook on site, same as we do on the street.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1.4fr) minmax(320px,1fr)', gap: 'var(--space-7)', alignItems: 'start' }}>
        <div style={{ display: 'grid', gap: 'var(--space-6)' }}>
          <Card sticker>
            <h2 style={{ ...window.POSTER, fontSize: 'var(--text-lg)', margin: '0 0 4px' }}>1 · The party</h2>
            <p style={{ ...window.BODY, fontSize: 'var(--text-2xs)', color: 'var(--text-muted)', margin: '0 0 var(--space-5)' }}>
              Two hours of service is our minimum — that's about 120 sandwiches off the line.
            </p>
            <div style={{ display: 'grid', gap: 'var(--space-5)' }}>
              <Slider label="Guests" value={guests} min={20} max={400} step={5} onChange={setGuests} />
              <Slider label="Hours of service" value={hours} min={2} max={6} step={1} onChange={setHours} suffix=" hrs" />
              <div style={{ display: 'grid', gap: 8 }}>
                <span style={{ ...window.POSTER, fontSize: 'var(--text-2xs)', letterSpacing: 'var(--tracking-caps)' }}>Where are we parking?</span>
                <div style={{ display: 'grid', gap: 10 }}>
                  {ZONES.map(z => (
                    <Radio key={z.id} name="zone" value={z.id} checked={zone === z.id} onChange={setZone}
                      label={z.label + (z.fee ? ` — +${money(z.fee)} travel` : ' — no travel fee')} />
                  ))}
                </div>
              </div>
            </div>
          </Card>

          <Card sticker>
            <h2 style={{ ...window.POSTER, fontSize: 'var(--text-lg)', margin: '0 0 4px' }}>2 · The sandwiches</h2>
            <p style={{ ...window.BODY, fontSize: 'var(--text-2xs)', color: 'var(--text-muted)', margin: '0 0 var(--space-4)' }}>
              Pick everything you want on the board. Every guest gets one, their choice.
            </p>
            <PickList options={ENTREE_OPTIONS} picked={entrees} onToggle={toggle(entrees, setEntrees)} />
          </Card>

          <Card sticker>
            <h2 style={{ ...window.POSTER, fontSize: 'var(--text-lg)', margin: '0 0 4px' }}>3 · The sides</h2>
            <p style={{ ...window.BODY, fontSize: 'var(--text-2xs)', color: 'var(--text-muted)', margin: '0 0 var(--space-4)' }}>
              Priced at {Math.round(SIDE_PORTION * 100)}% of headcount — nobody eats all of them.
            </p>
            <PickList options={SIDE_OPTIONS} picked={sides} onToggle={toggle(sides, setSides)} />
          </Card>
        </div>

        <Card tone="board" sticker padding="var(--space-4)" style={{ position: 'sticky', top: 'var(--space-5)', maxHeight: 'calc(100vh - 48px)', overflowY: 'auto' }}>
          <div style={{ ...window.POSTER, fontSize: 'var(--text-xl)', color: '#fff' }}>Your estimate</div>
          <div style={{ ...window.BODY, fontSize: 'var(--text-2xs)', color: 'rgba(255,255,255,.7)', marginBottom: 'var(--space-4)' }}>
            {guests} guests · {hours} hrs · {zoneMeta.label.toLowerCase()}
          </div>

          {noMenu ? (
            <p style={{ ...window.BODY, fontSize: 'var(--text-sm)', color: 'rgba(255,255,255,.8)' }}>
              Pick at least one sandwich and we'll do the math.
            </p>
          ) : (
            <div style={{ color: '#fff' }}>
              <div style={{ borderTop: '2px solid rgba(255,255,255,.25)', borderBottom: '2px solid rgba(255,255,255,.25)', padding: '4px 0' }}>
                <Line label="Food" note={`${money(Math.round(entreePer + sidePer))} per guest × ${guests}`} amount={food} />
                <Line label="On-site cooking" note={`${money(STAFF_PER_HOUR)}/hr × ${hours} hrs`} amount={staffing} />
                <Line label="Travel" note={zoneMeta.label} amount={travel} />
              </div>
              {belowMin && (
                <div style={{ ...window.BODY, fontSize: 'var(--text-2xs)', color: 'var(--sauce-spicy-maple)', padding: '10px 0' }}>
                  Rounded up to our {money(MIN_SPEND)} event minimum.
                </div>
              )}
              <div style={{ paddingTop: 8 }}>
                <Line label="Estimated total" amount={total} strong />
              </div>
              <div style={{ ...window.BODY, fontSize: 'var(--text-2xs)', color: 'rgba(255,255,255,.7)', marginBottom: 'var(--space-5)' }}>
                About {money(Math.round(perHead))} a head · {money(deposit)} deposit holds the date
              </div>
            </div>
          )}

          {sent ? (
            <div style={{ background: 'var(--coop-red)', border: '3px solid var(--coop-white)', borderRadius: 'var(--radius-lg)', padding: 'var(--space-4)', color: '#fff' }}>
              <div style={{ ...window.POSTER, fontSize: 'var(--text-lg)' }}>Quote's on its way</div>
              <p style={{ ...window.BODY, fontSize: 'var(--text-2xs)', margin: '6px 0 12px' }}>
                We sent the {money(total)} estimate to <strong>{email}</strong>{when ? ` for ${when}` : ''}. A real person comes back within a day.
              </p>
              <Button variant="light" size="sm" onClick={() => setSent(false)}>TWEAK THE NUMBERS</Button>
            </div>
          ) : (
            <div style={{ display: 'grid', gap: 'var(--space-3)' }}>
              <Input label="Email us the estimate" placeholder="you@company.com" type="email"
                value={email} onChange={e => setEmail(e.target.value)} />
              <Input label="Event date" placeholder="Sat, Nov 8"
                value={when} onChange={e => setWhen(e.target.value)} />
              <Button variant="primary" block disabled={noMenu || !email.includes('@')}
                onClick={() => setSent(true)}>SEND ME THIS QUOTE</Button>
              <p style={{ ...window.BODY, fontSize: 'var(--text-3xs)', color: 'rgba(255,255,255,.6)', margin: 0 }}>
                Estimate only — final quote comes back from us within a day. Tax and gratuity not included.
              </p>
            </div>
          )}
        </Card>
      </div>
    </section>
  );
}
Object.assign(window, { Catering });
