const { Card, Button, Badge, Checkbox, Radio, Input, PriceTag, HeatMeter, Switch } = window.TheCoopDesignSystem_a9fb85;

const BASE_PER_HEAD = 25;
const DRINKS_PER_HEAD = 2;
const FREE_HOURS = 2;
const STAFF_PER_HOUR_EXTRA = 150; // charged only for hours beyond the first 2
const MIN_SPEND = 850;
const DEPOSIT = 0.25;

// EmailJS sends the customer their own copy of the quote (arbitrary recipient,
// no per-address activation step). Public key is safe to ship client-side —
// restricted to thecoopeats.com / www.thecoopeats.com in EmailJS account security.
const EMAILJS_SERVICE_ID = 'service_65yxmxx';
const EMAILJS_TEMPLATE_ID = 'template_5s9rgzh';
const EMAILJS_PUBLIC_KEY = 'yJXvhp4lNkX7RiOU_';

const ENTREE_TIERS = [
  {
    id: 'tier1',
    label: 'Tier 1',
    freeCount: 2,
    extraPerItem: 1,
    items: [
      { id: 'nuggies', name: 'The Nuggies', description: 'eight bite-sized pieces of boneless chicken breast, freshly-battered, fried and tossed in your sauce of choice' },
      { id: 'original', name: 'The Original', description: 'fried chicken sandwich with coleslaw, pickles, and comeback sauce' },
      { id: 'classic', name: 'The Classic', description: 'fried chicken sandwich with lettuce, tomato, pickles, and mayo' },
      { id: 'breakfast', name: 'The Breakfast Sandwich', description: 'egg, american cheese, bacon, hashbrown, and a touch of comeback sauce on a toasted challah bun' }
    ]
  },
  {
    id: 'tier2',
    label: 'Tier 2',
    freeCount: 0,
    extraPerItem: 1,
    items: [
      { id: 'cluckin', name: "The Cluckin'", description: 'fried chicken sandwich with bacon, muenster cheese, and thousand island dressing' },
      { id: 'hothoney', name: 'The Hot Honey', description: 'fried chicken sandwich with bacon, pepperjack cheese, hot honey, pickles and comeback sauce', heat: 1 },
      { id: 'nashville', name: 'The Nashville', description: 'fried chicken sandwich with nashville hot seasoning, bacon, coleslaw, pickles, and comeback sauce', heat: 2 },
      { id: 'bufmac', name: 'The Buf-Mac-Wich', description: 'fried chicken sandwich with buffalo sauce, mac & cheese, pickles, and comeback sauce', heat: 1 }
    ]
  }
];

const SIDE_TIERS = [
  {
    id: 'tier1',
    label: 'Tier 1',
    freeCount: 2,
    extraPerItem: 1,
    items: [
      { id: 'waffle', name: 'Waffle Fries' },
      { id: 'slaw', name: 'Coleslaw' },
      { id: 'mac', name: 'Mac N Cheese' },
      { id: 'hashbrown', name: 'Hashbrown' }
    ]
  },
  {
    id: 'tier2',
    label: 'Tier 2',
    freeCount: 0,
    extraPerItem: 2,
    items: [
      { id: 'cheese', name: 'Cheese Fries' },
      { id: 'macbites', name: 'Fried Mac Bites' }
    ]
  },
  {
    id: 'tier3',
    label: 'Tier 3',
    freeCount: 0,
    extraPerItem: 3,
    items: [
      { id: 'loaded', name: 'Loaded Fries' }
    ]
  }
];

const ZONES = [
  { id: 'local', label: 'Within 15 miles of the truck', fee: 0 },
  { id: 'near', label: '15–40 miles', fee: 85 },
  { id: 'far', label: '40–75 miles', fee: 175 },
  { id: 'road', label: 'Over 75 miles', fee: 275 }
];

const money = n => '$' + n.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 });

function tierUpcharge(tier, picked) {
  const count = tier.items.filter(i => picked.includes(i.id)).length;
  const billable = Math.max(0, count - tier.freeCount);
  return billable * tier.extraPerItem;
}

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

function InfoTip({ text }) {
  const [show, setShow] = React.useState(false);
  return (
    <span style={{ position: 'relative', display: 'inline-flex' }}
      onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)}
      onFocus={() => setShow(true)} onBlur={() => setShow(false)}>
      <button type="button" aria-label="Item description" onClick={() => setShow(s => !s)} style={{
        width: 20, height: 20, borderRadius: '999px', border: 'var(--stroke-1) solid var(--coop-black)',
        background: 'var(--coop-white)', color: 'var(--coop-black)', fontFamily: 'var(--font-body)',
        fontWeight: 700, fontSize: 11, lineHeight: '16px', cursor: 'pointer', padding: 0, flex: '0 0 auto'
      }}>i</button>
      {show && (
        <span role="tooltip" style={{
          position: 'absolute', zIndex: 40, bottom: 'calc(100% + 8px)', right: 0,
          width: 200, maxWidth: '60vw', background: 'var(--coop-black)', color: 'var(--coop-white)',
          fontFamily: 'var(--font-body)', fontWeight: 500, fontSize: 'var(--text-3xs)', lineHeight: 1.4,
          padding: '8px 10px', borderRadius: 'var(--radius-sm)', whiteSpace: 'normal', textAlign: 'left'
        }}>{text}</span>
      )}
    </span>
  );
}

function TierSection({ tiers, picked, onToggle, showInfo }) {
  return (
    <div style={{ display: 'grid', gap: 'var(--space-5)' }}>
      {tiers.map(tier => {
        const ruleText = tier.freeCount > 0
          ? `First ${tier.freeCount} free, then +${money(tier.extraPerItem)}/person each`
          : `+${money(tier.extraPerItem)}/person each`;
        return (
          <div key={tier.id} style={{ display: 'grid', gap: 'var(--space-3)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 8, flexWrap: 'wrap' }}>
              <span style={{ ...window.POSTER, fontSize: 'var(--text-xs)', letterSpacing: 'var(--tracking-caps)' }}>{tier.label}</span>
              <span style={{ ...window.BODY, fontSize: 'var(--text-3xs)', color: 'var(--text-muted)' }}>{ruleText}</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,minmax(0,1fr))', gap: 'var(--space-3)' }}>
              {tier.items.map(item => (
                <div key={item.id} style={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 8,
                  padding: '10px 12px', borderRadius: 'var(--radius-md)',
                  border: '2px solid ' + (picked.includes(item.id) ? 'var(--coop-red)' : 'var(--border-soft)'),
                  background: picked.includes(item.id) ? 'rgba(200,37,43,.06)' : 'transparent'
                }}>
                  <Checkbox label={item.name} checked={picked.includes(item.id)} onChange={() => onToggle(item.id)} />
                  <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    {item.heat ? <HeatMeter level={item.heat} size={14} /> : null}
                    {showInfo && item.description && <InfoTip text={item.description} />}
                  </span>
                </div>
              ))}
            </div>
          </div>
        );
      })}
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
  const [entrees, setEntrees] = React.useState([]);
  const [sides, setSides] = React.useState([]);
  const [drinks, setDrinks] = React.useState(false);
  const [email, setEmail] = React.useState('');
  const [when, setWhen] = React.useState('');
  const [status, setStatus] = React.useState('idle'); // idle | sending | sent | error

  const toggle = (list, set) => id => set(list.includes(id) ? list.filter(x => x !== id) : [...list, id]);

  const zoneMeta = ZONES.find(z => z.id === zone);
  const entreeUpcharge = ENTREE_TIERS.reduce((t, tier) => t + tierUpcharge(tier, entrees), 0);
  const sideUpcharge = SIDE_TIERS.reduce((t, tier) => t + tierUpcharge(tier, sides), 0);
  const drinksUpcharge = drinks ? DRINKS_PER_HEAD : 0;
  const perHeadFood = BASE_PER_HEAD + entreeUpcharge + sideUpcharge + drinksUpcharge;

  const food = Math.round(perHeadFood * guests);
  const extraHours = Math.max(0, hours - FREE_HOURS);
  const staffing = extraHours * STAFF_PER_HOUR_EXTRA;
  const travel = zoneMeta.fee;
  const raw = food + staffing + travel;
  const total = Math.max(raw, MIN_SPEND);
  const belowMin = raw < MIN_SPEND;
  const perHead = guests ? total / guests : 0;
  const deposit = Math.round(total * DEPOSIT);
  const noMenu = entrees.length === 0;

  const entreeNames = ENTREE_TIERS.flatMap(t => t.items).filter(i => entrees.includes(i.id)).map(i => i.name).join(', ') || 'none selected';
  const sideNames = SIDE_TIERS.flatMap(t => t.items).filter(i => sides.includes(i.id)).map(i => i.name).join(', ') || 'none selected';

  const submit = async () => {
    if (noMenu || !email.includes('@') || status === 'sending') return;
    setStatus('sending');

    // One send covers both: the customer gets the styled quote (To), and
    // thecoopeats@gmail.com is CC'd on the same email (set in the EmailJS
    // template's settings) — that copy shows the customer's address right
    // in the To: line, ready to reply to.
    try {
      await window.emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
        to_email: email,
        guests,
        hours,
        zone: zoneMeta.label,
        entrees: entreeNames,
        sides: sideNames,
        drinks: drinks ? 'Yes' : 'No',
        event_date: when || 'not specified',
        estimated_total: money(total),
        per_head: money(Math.round(perHead)),
        deposit: money(deposit)
      }, EMAILJS_PUBLIC_KEY);
      setStatus('sent');
    } catch (err) {
      setStatus('error');
    }
  };

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
              The first {FREE_HOURS} hours of service are included. Every hour after that is {money(STAFF_PER_HOUR_EXTRA)}.
            </p>
            <div style={{ display: 'grid', gap: 'var(--space-5)' }}>
              <Slider label="Guests" value={guests} min={20} max={400} step={5} onChange={setGuests} />
              <Slider label="Hours of service" value={hours} min={2} max={6} step={1} onChange={setHours} suffix=" hrs" />
              <div style={{ display: 'grid', gap: 8 }}>
                <span style={{ ...window.POSTER, fontSize: 'var(--text-2xs)', letterSpacing: 'var(--tracking-caps)' }}>Where are we parking?</span>
                <p style={{ ...window.BODY, fontSize: 'var(--text-3xs)', color: 'var(--text-muted)', margin: 0 }}>
                  We're based in Danbury, CT — the ranges below are measured from there.
                </p>
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
            <h2 style={{ ...window.POSTER, fontSize: 'var(--text-lg)', margin: '0 0 4px' }}>2 · The Entrees</h2>
            <p style={{ ...window.BODY, fontSize: 'var(--text-2xs)', color: 'var(--text-muted)', margin: '0 0 var(--space-4)' }}>
              Starts at {money(BASE_PER_HEAD)} per person. Every guest gets one, their choice — tap the <strong>i</strong> for what's on it.
            </p>
            <TierSection tiers={ENTREE_TIERS} picked={entrees} onToggle={toggle(entrees, setEntrees)} showInfo />
          </Card>

          <Card sticker>
            <h2 style={{ ...window.POSTER, fontSize: 'var(--text-lg)', margin: '0 0 4px' }}>3 · The sides</h2>
            <p style={{ ...window.BODY, fontSize: 'var(--text-2xs)', color: 'var(--text-muted)', margin: '0 0 var(--space-4)' }}>
              Pick as many as you'd like — pricing is per person, not per pan.
            </p>
            <TierSection tiers={SIDE_TIERS} picked={sides} onToggle={toggle(sides, setSides)} />
          </Card>

          <Card sticker>
            <h2 style={{ ...window.POSTER, fontSize: 'var(--text-lg)', margin: '0 0 4px' }}>4 · Drinks</h2>
            <p style={{ ...window.BODY, fontSize: 'var(--text-2xs)', color: 'var(--text-muted)', margin: '0 0 var(--space-4)' }}>
              Water and soda, self-serve from a cooler.
            </p>
            <Switch label={`Add drinks for the group — +${money(DRINKS_PER_HEAD)}/person`} checked={drinks} onChange={setDrinks} />
          </Card>
        </div>

        <Card tone="board" sticker padding="var(--space-4)" style={{ position: 'sticky', top: 'var(--space-5)', maxHeight: 'calc(100vh - 48px)', overflowY: 'auto' }}>
          <div style={{ ...window.POSTER, fontSize: 'var(--text-xl)', color: '#fff' }}>Your estimate</div>
          <div style={{ ...window.BODY, fontSize: 'var(--text-2xs)', color: 'rgba(255,255,255,.7)', marginBottom: 'var(--space-4)' }}>
            {guests} guests · {hours} hrs · {zoneMeta.label.toLowerCase()}
          </div>

          {noMenu ? (
            <p style={{ ...window.BODY, fontSize: 'var(--text-sm)', color: 'rgba(255,255,255,.8)' }}>
              Pick at least one entrée and we'll do the math.
            </p>
          ) : (
            <div style={{ color: '#fff' }}>
              <div style={{ borderTop: '2px solid rgba(255,255,255,.25)', borderBottom: '2px solid rgba(255,255,255,.25)', padding: '4px 0' }}>
                <Line label="Food" note={`${money(perHeadFood)} per guest × ${guests}`} amount={food} />
                <Line label="On-site cooking" note={extraHours > 0 ? `${money(STAFF_PER_HOUR_EXTRA)}/hr × ${extraHours} hr${extraHours > 1 ? 's' : ''} beyond the first ${FREE_HOURS}` : `First ${FREE_HOURS} hours included`} amount={staffing} />
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

          {status === 'sent' ? (
            <div style={{ background: 'var(--coop-red)', border: '3px solid var(--coop-white)', borderRadius: 'var(--radius-lg)', padding: 'var(--space-4)', color: '#fff' }}>
              <div style={{ ...window.POSTER, fontSize: 'var(--text-lg)' }}>Quote's on its way</div>
              <p style={{ ...window.BODY, fontSize: 'var(--text-2xs)', margin: '6px 0 12px' }}>
                We sent the {money(total)} estimate to <strong>{email}</strong>{when ? ` for ${when}` : ''}. A real person comes back within a day.
              </p>
              <Button variant="light" size="sm" onClick={() => setStatus('idle')}>TWEAK THE NUMBERS</Button>
            </div>
          ) : (
            <div style={{ display: 'grid', gap: 'var(--space-3)' }}>
              <Input label="Email us the estimate" placeholder="you@company.com" type="email"
                value={email} onChange={e => setEmail(e.target.value)} />
              <Input label="Event date" placeholder="Sat, Nov 8"
                value={when} onChange={e => setWhen(e.target.value)} />
              {status === 'error' && (
                <span style={{ ...window.BODY, fontSize: 'var(--text-2xs)', color: 'var(--sauce-spicy-maple)' }}>
                  Something went wrong — try again, or email us directly at thecoopeats@gmail.com.
                </span>
              )}
              <Button variant="primary" block disabled={noMenu || !email.includes('@') || status === 'sending'}
                onClick={submit}>{status === 'sending' ? 'SENDING…' : 'SEND ME THIS QUOTE'}</Button>
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
