const { Card, Button, Tabs } = window.TheCoopDesignSystem_a9fb85;

// The Coop's real public Google Calendar.
const CAL_ID = '0r49o8cj65ab5l9lj063idkjf8%40group.calendar.google.com';
const CAL_SUBSCRIBE = 'https://calendar.google.com/calendar/u/0?cid=MHI0OW84Y2o2NWFiNWw5bGowNjNpZGtqZjhAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ';
const embedUrl = mode =>
  'https://calendar.google.com/calendar/embed?src=' + CAL_ID +
  '&mode=' + mode + '&showTitle=0&showPrint=0&showTabs=0&showCalendars=0&showTz=0' +
  '&ctz=America%2FNew_York&bgcolor=%23FFFFFF&color=%23C8252B';

function FindUs() {
  const [mode, setMode] = React.useState('AGENDA');
  return (
    <section style={{ maxWidth: 'var(--max-content)', margin: '0 auto', padding: 'var(--space-7) var(--gutter-page)' }}>
      <img src={window.AB + 'assets/photo-truck.jpg'} alt="The Coop truck" style={{
        width: '100%', height: 280, objectFit: 'cover', display: 'block',
        border: '3px solid var(--coop-black)', borderRadius: 'var(--radius-lg)', marginBottom: 'var(--space-6)'
      }} />
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 'var(--space-4)', flexWrap: 'wrap', marginBottom: 'var(--space-5)' }}>
        <div>
          <h1 style={{ ...window.POSTER, fontSize: 'var(--text-3xl)', margin: '0 0 6px' }}>Find the truck</h1>
          <p style={{ ...window.BODY, fontSize: 'var(--text-sm)', color: 'var(--text-muted)', margin: 0, maxWidth: '52ch' }}>
            Every stop we've got booked, straight off our calendar. Subscribe and it updates itself on your phone.
          </p>
        </div>
        <div style={{ display: 'flex', gap: 'var(--space-3)', alignItems: 'center', flexWrap: 'wrap' }}>
          <Tabs items={[{ value: 'AGENDA', label: 'List' }, { value: 'MONTH', label: 'Month' }]} value={mode} onChange={setMode} />
          <Button as="a" href={CAL_SUBSCRIBE} target="_blank" rel="noopener" variant="primary"
            iconRight={<span style={{ fontSize: '.8em' }}>↗</span>}>ADD TO YOUR CALENDAR</Button>
        </div>
      </div>
      <Card sticker padding="0" style={{ overflow: 'hidden' }}>
        <iframe key={mode} title="The Coop schedule" src={embedUrl(mode)}
          style={{ width: '100%', height: mode === 'MONTH' ? 700 : 620, border: 'none', display: 'block' }}></iframe>
      </Card>
      <p style={{ ...window.BODY, fontSize: 'var(--text-2xs)', color: 'var(--text-muted)', marginTop: 'var(--space-4)' }}>
        Weather and breakdowns happen. We post changes on @thecoopeats first.
      </p>
    </section>
  );
}
Object.assign(window, { FindUs, CAL_SUBSCRIBE, CAL_ID });
