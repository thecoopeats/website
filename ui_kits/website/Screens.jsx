const { NavBar, Button, Card, Badge, Logo, MenuSection, MenuItem, SauceChip, SAUCES, DashRule, Tabs, Input, Select, Checkbox, Radio, Switch, Stepper, Toast, Dialog, PriceTag, IconButton } = window.TheCoopDesignSystem_a9fb85;
const AB = '../../';
const ORDER = 'https://order.tbdine.com/pickup/30439/menu';
const MERCH = 'https://the-coop-8.creator-spring.com/';
const EXT = <span style={{ fontSize: '.8em' }}>↗</span>;

const POSTER = { fontFamily: 'var(--font-poster)', textTransform: 'uppercase', letterSpacing: 'var(--tracking-poster)', lineHeight: 1 };
const BODY = { fontFamily: 'var(--font-body)', fontWeight: 500, lineHeight: 'var(--leading-body)' };

function Hero({ onOrder, onMenu }) {
  return (
    <section style={{ position: 'relative', borderBottom: '5px solid var(--coop-black)' }}>
      <img src={AB + 'assets/food-nashville.jpg'} alt="The Nashville sandwich" style={{ width: '100%', height: 460, objectFit: 'cover', objectPosition: 'center 62%', display: 'block' }} />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg,rgba(10,10,10,.78) 0%,rgba(10,10,10,.45) 55%,transparent 100%)' }} />
      <div style={{ position: 'absolute', inset: 0, display: 'grid', alignContent: 'center', gap: 'var(--space-4)', padding: '0 var(--gutter-page)', maxWidth: 'var(--max-content)' }}>
        <Badge tone="red">Truck is open · 11–8</Badge>
        <h1 style={{ ...POSTER, fontSize: 'var(--text-4xl)', color: '#fff', margin: 0, maxWidth: '16ch' }}>Fried chicken worth chasing down the block</h1>
        <p style={{ ...BODY, fontSize: 'var(--text-md)', color: '#fff', margin: 0, maxWidth: '46ch' }}>
          Hand-battered sandwiches and nuggies, dipped in six truckmade sauces. We're playful about everything except the chicken.
        </p>
        <div style={{ display: 'flex', gap: 'var(--space-3)', flexWrap: 'wrap' }}>
          <Button as="a" href={ORDER} target="_blank" rel="noopener" variant="primary" size="lg" iconRight={EXT}>ORDER ONLINE</Button>
          <Button variant="light" size="lg" onClick={onMenu}>SEE THE MENU</Button>
        </div>
      </div>
    </section>
  );
}

function CateringBanner({ onCatering }) {
  return (
    <section style={{ background: 'var(--coop-black)', borderTop: '5px solid var(--coop-black)', borderBottom: '5px solid var(--coop-black)' }}>
      <div style={{ maxWidth: 'var(--max-content)', margin: '0 auto', display: 'grid', gridTemplateColumns: 'minmax(0,1.05fr) minmax(0,1fr)', alignItems: 'stretch' }}>
        <div style={{ padding: 'var(--space-7) var(--gutter-page)', display: 'grid', alignContent: 'center', gap: 'var(--space-4)' }}>
          <Badge tone="red">Now booking 2026 dates</Badge>
          <h2 style={{ ...POSTER, fontSize: 'var(--text-3xl)', color: '#fff', margin: 0, maxWidth: '14ch' }}>Park the truck at your party</h2>
          <p style={{ ...BODY, fontSize: 'var(--text-md)', color: '#fff', margin: 0, maxWidth: '40ch' }}>
            Weddings, office lunches, birthdays, block parties. Pick your headcount and get a price in about ten seconds.
          </p>
          <div style={{ display: 'flex', gap: 'var(--space-3)', flexWrap: 'wrap', alignItems: 'center' }}>
            <Button variant="primary" size="lg" onClick={onCatering}>GET AN ESTIMATE</Button>
            <span style={{ ...POSTER, fontSize: 'var(--text-xs)', color: 'var(--coop-red-bright)' }}>$850 event minimum</span>
          </div>
        </div>
        <div style={{ position: 'relative', minHeight: 320, borderLeft: '5px solid var(--coop-red)' }}>
          <img src={AB + 'assets/photo-truck.jpg'} alt="The Coop truck parked at an event" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
        </div>
      </div>
    </section>
  );
}

function Favorites({ items }) {
  return (
    <section style={{ maxWidth: 'var(--max-content)', margin: '0 auto', padding: 'var(--gutter-section) var(--gutter-page)' }}>
      <h2 style={{ ...POSTER, fontSize: 'var(--text-2xl)', color: 'var(--coop-red)', margin: '0 0 var(--space-5)' }}>Crowd favorites</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,minmax(0,1fr))', gap: 'var(--space-5)' }}>
        {items.map(it => (
          <Card key={it.name} sticker hoverLift padding="0" style={{ overflow: 'hidden' }}>
            <img src={AB + it.photo} alt={it.name} style={{ width: '100%', height: 200, objectFit: 'cover', display: 'block', borderBottom: '3px solid var(--coop-black)' }} />
            <div style={{ padding: 'var(--space-5)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8 }}>
              <div style={{ ...POSTER, fontSize: 'var(--text-lg)' }}>{it.name}</div>
              <PriceTag value={it.price} size="sm" />
            </div>
            <p style={{ ...BODY, fontSize: 'var(--text-xs)', color: 'var(--text-muted)', margin: '8px 0 16px' }}>{it.description}</p>
            <Button as="a" href={ORDER} target="_blank" rel="noopener" variant="dark" size="sm" iconRight={EXT}>ORDER ONLINE</Button>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}

function Gallery() {
  const shots = [
    ['assets/food-clucked-fries.jpg', 'Clucked Fries'],
    ['assets/food-cluckin.jpg', "The Cluckin'"],
    ['assets/food-buf-mac-wich.jpg', 'The Buf-Mac-Wich'],
    ['assets/food-nuggies.jpg', 'The Nuggies, honey bbq']
  ];
  return (
    <section style={{ borderTop: '5px solid var(--coop-black)', borderBottom: '5px solid var(--coop-black)', display: 'grid', gridTemplateColumns: 'repeat(4,1fr)' }}>
      {shots.map(([src, alt], i) => (
        <div key={src} style={{ position: 'relative', borderRight: i < 3 ? '3px solid var(--coop-black)' : 'none' }}>
          <img src={AB + src} alt={alt} style={{ width: '100%', height: 260, objectFit: 'cover', display: 'block' }} />
          <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, padding: '28px 14px 12px', background: 'linear-gradient(transparent,rgba(10,10,10,.85))', ...POSTER, fontSize: 'var(--text-xs)', color: '#fff' }}>{alt}</div>
        </div>
      ))}
    </section>
  );
}

function MascotBanner() {
  return (
    <section style={{ background: 'var(--coop-red)', borderTop: '5px solid var(--coop-black)', borderBottom: '5px solid var(--coop-black)', padding: 'var(--space-7) var(--gutter-page)' }}>
      <div style={{ maxWidth: 'var(--max-content)', margin: '0 auto', display: 'flex', gap: 'var(--space-7)', alignItems: 'center', flexWrap: 'wrap' }}>
        <img src={AB + 'assets/nugs-not-drugs.png'} alt="Nugs not drugs" style={{ height: 240 }} />
        <div style={{ flex: 1, minWidth: 260 }}>
          <h2 style={{ ...POSTER, fontSize: 'var(--text-3xl)', color: '#fff', margin: '0 0 var(--space-3)' }}>Wear the nugget</h2>
          <p style={{ ...BODY, fontSize: 'var(--text-md)', color: '#fff', margin: '0 0 var(--space-5)', maxWidth: '44ch' }}>
            Stickers, tees and the occasional bumper sticker. Wear it, slap it on a laptop, tell your friends where the truck is parked.
          </p>
          <Button as="a" href={MERCH} target="_blank" rel="noopener" variant="dark" size="md" iconRight={EXT}>SHOP THE MERCH</Button>
        </div>
      </div>
    </section>
  );
}

function ContactForm() {
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [message, setMessage] = React.useState('');
  const [honey, setHoney] = React.useState('');
  const [status, setStatus] = React.useState('idle'); // idle | sending | sent | error
  const [focus, setFocus] = React.useState(false);

  const valid = name.trim() && email.includes('@') && message.trim();

  const submit = async e => {
    e.preventDefault();
    if (!valid || status === 'sending' || honey) return;
    setStatus('sending');
    try {
      const res = await fetch('https://formsubmit.co/ajax/thecoopeats@gmail.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name, email, message,
          _subject: 'New message from thecoopeats.com',
          _replyto: email,
          _template: 'table'
        })
      });
      if (!res.ok) throw new Error('send failed');
      setStatus('sent');
    } catch (err) {
      setStatus('error');
    }
  };

  return (
    <section id="contact" style={{ maxWidth: 'var(--max-content)', margin: '0 auto', padding: 'var(--gutter-section) var(--gutter-page)' }}>
      <h2 style={{ ...POSTER, fontSize: 'var(--text-2xl)', color: 'var(--coop-red)', margin: '0 0 var(--space-2)' }}>Say hey</h2>
      <p style={{ ...BODY, fontSize: 'var(--text-sm)', color: 'var(--text-muted)', margin: '0 0 var(--space-5)', maxWidth: '52ch' }}>
        Questions, feedback, or just want to tell us where to park next — drop a line and a real person will reply shortly.
      </p>
      <Card sticker style={{ maxWidth: 560 }}>
        {status === 'sent' ? (
          <Toast tone="dark" title="Message sent" message={`Thanks — we'll reply to ${email} soon.`} />
        ) : (
          <form onSubmit={submit} style={{ display: 'grid', gap: 'var(--space-4)' }}>
            <input type="text" value={honey} onChange={e => setHoney(e.target.value)} tabIndex={-1} autoComplete="off"
              style={{ position: 'absolute', left: '-9999px', width: 1, height: 1, opacity: 0 }} aria-hidden="true" />
            <Input label="Name" placeholder="Your name" value={name} onChange={e => setName(e.target.value)} required />
            <Input label="Email" type="email" placeholder="you@example.com" value={email} onChange={e => setEmail(e.target.value)} required />
            <div style={{ display: 'grid', gap: '6px' }}>
              <label style={{
                fontFamily: 'var(--font-poster)', fontSize: 'var(--text-2xs)', letterSpacing: 'var(--tracking-caps)',
                textTransform: 'uppercase', color: 'var(--coop-black)'
              }}>Message</label>
              <textarea value={message} onChange={e => setMessage(e.target.value)} onFocus={() => setFocus(true)} onBlur={() => setFocus(false)}
                required rows={4} placeholder="What's up?"
                style={{
                  fontFamily: 'var(--font-body)', fontWeight: 'var(--weight-body)', fontSize: 'var(--text-sm)',
                  color: 'var(--text-body)', background: 'var(--coop-white)', borderRadius: 'var(--radius-md)',
                  border: 'var(--stroke-2) solid var(--coop-black)',
                  boxShadow: focus ? '0 0 0 3px rgba(200,37,43,.35)' : 'none',
                  padding: 'var(--space-3)', resize: 'vertical', outline: 'none', transition: 'box-shadow var(--dur-fast) linear'
                }} />
            </div>
            {status === 'error' && (
              <span style={{ ...BODY, fontSize: 'var(--text-2xs)', color: 'var(--coop-red)' }}>
                Something went wrong — try again, or email us directly at thecoopeats@gmail.com.
              </span>
            )}
            <Button type="submit" variant="primary" block disabled={!valid || status === 'sending'}>
              {status === 'sending' ? 'SENDING…' : 'SEND MESSAGE'}
            </Button>
          </form>
        )}
      </Card>
    </section>
  );
}

function Footer() {
  return (
    <footer style={{ background: 'var(--coop-black)', color: '#fff', padding: 'var(--space-7) var(--gutter-page)', borderTop: '5px solid var(--coop-black)' }}>
      <div style={{ maxWidth: 'var(--max-content)', margin: '0 auto', display: 'flex', justifyContent: 'space-between', gap: 'var(--space-6)', flexWrap: 'wrap', alignItems: 'center' }}>
        <Logo variant="knockout" width={140} assetBase={AB} />
        <div style={{ display: 'flex', gap: 'var(--space-5)', flexWrap: 'wrap', alignItems: 'center' }}>
          <a href={ORDER} target="_blank" rel="noopener" style={{ ...POSTER, fontSize: 'var(--text-xs)', color: '#fff', textDecoration: 'none', borderBottom: '3px solid var(--coop-red-bright)' }}>Order online ↗</a>
          <a href={MERCH} target="_blank" rel="noopener" style={{ ...POSTER, fontSize: 'var(--text-xs)', color: '#fff', textDecoration: 'none', borderBottom: '3px solid var(--coop-red-bright)' }}>Merch ↗</a>
          <span style={{ ...BODY, fontSize: 'var(--text-xs)', opacity: .85 }}>@thecoopeats · www.thecoopeats.com</span>
        </div>
        <div style={{ ...POSTER, fontSize: 'var(--text-xs)', color: 'var(--coop-red-bright)' }}>Nugs not drugs</div>
      </div>
    </footer>
  );
}
Object.assign(window, { Hero, CateringBanner, Favorites, Gallery, MascotBanner, ContactForm, Footer, POSTER, BODY, AB, ORDER, MERCH, EXT });
