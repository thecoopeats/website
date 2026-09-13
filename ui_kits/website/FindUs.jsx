const { Card, Button } = window.TheCoopDesignSystem_a9fb85;

// The Coop's real public Google Calendar.
const CAL_ID = '0r49o8cj65ab5l9lj063idkjf8%40group.calendar.google.com';
const CAL_SUBSCRIBE = 'https://calendar.google.com/calendar/u/0?cid=MHI0OW84Y2o2NWFiNWw5bGowNjNpZGtqZjhAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ';
// Restricted to the Calendar API + thecoopeats.com / www.thecoopeats.com in Google Cloud Console.
const CAL_API_KEY = 'REPLACE_WITH_YOUR_CALENDAR_API_KEY';
const CAL_MAX_STOPS = 20;

function formatStop(ev) {
  const isAllDay = !!ev.start.date && !ev.start.dateTime;
  const start = new Date(ev.start.dateTime || ev.start.date + 'T00:00:00');
  const end = ev.end && (ev.end.dateTime || ev.end.date) ? new Date(ev.end.dateTime || ev.end.date + 'T00:00:00') : null;
  const dateLabel = start.toLocaleDateString('en-US', {
    weekday: 'short', month: 'short', day: 'numeric',
    timeZone: isAllDay ? 'UTC' : 'America/New_York'
  });
  if (isAllDay) return { dateLabel, timeLabel: 'All day' };
  const fmtTime = d => d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', timeZone: 'America/New_York' });
  return { dateLabel, timeLabel: end ? `${fmtTime(start)}–${fmtTime(end)}` : fmtTime(start) };
}

function StopRow({ event, last }) {
  const { dateLabel, timeLabel } = formatStop(event);
  return (
    <div style={{ display: 'flex', gap: 'var(--space-4)', alignItems: 'flex-start', padding: '16px var(--space-5)', borderBottom: last ? 'none' : '2px solid var(--border-soft)' }}>
      <div style={{ minWidth: 100, display: 'grid', gap: 2 }}>
        <div style={{ ...window.POSTER, fontSize: 'var(--text-md)', color: 'var(--coop-red)' }}>{dateLabel}</div>
        <div style={{ ...window.BODY, fontSize: 'var(--text-2xs)', color: 'var(--text-muted)' }}>{timeLabel}</div>
      </div>
      <div style={{ display: 'grid', gap: 2 }}>
        <div style={{ ...window.POSTER, fontSize: 'var(--text-sm)' }}>{event.summary || 'The Coop'}</div>
        {event.location && <div style={{ ...window.BODY, fontSize: 'var(--text-2xs)', color: 'var(--text-muted)' }}>{event.location}</div>}
      </div>
    </div>
  );
}

function FindUs() {
  const [events, setEvents] = React.useState(null); // null = loading
  const [failed, setFailed] = React.useState(false);

  React.useEffect(() => {
    let cancelled = false;
    const url = 'https://www.googleapis.com/calendar/v3/calendars/' + CAL_ID + '/events' +
      '?key=' + CAL_API_KEY +
      '&timeMin=' + encodeURIComponent(new Date().toISOString()) +
      '&singleEvents=true&orderBy=startTime&maxResults=' + CAL_MAX_STOPS;
    fetch(url)
      .then(r => { if (!r.ok) throw new Error('calendar fetch failed'); return r.json(); })
      .then(data => { if (!cancelled) setEvents((data.items || []).filter(e => e.status !== 'cancelled')); })
      .catch(() => { if (!cancelled) setFailed(true); });
    return () => { cancelled = true; };
  }, []);

  let body;
  if (failed) {
    body = (
      <div style={{ padding: 'var(--space-6)', textAlign: 'center' }}>
        <p style={{ ...window.BODY, fontSize: 'var(--text-sm)', color: 'var(--text-muted)', margin: '0 0 12px' }}>Couldn't load the schedule right now.</p>
        <Button as="a" href={CAL_SUBSCRIBE} target="_blank" rel="noopener" variant="primary" size="sm">VIEW ON GOOGLE CALENDAR ↗</Button>
      </div>
    );
  } else if (events === null) {
    body = <div style={{ ...window.BODY, padding: 'var(--space-6)', textAlign: 'center', fontSize: 'var(--text-sm)', color: 'var(--text-muted)' }}>Loading the schedule…</div>;
  } else if (events.length === 0) {
    body = <div style={{ ...window.BODY, padding: 'var(--space-6)', textAlign: 'center', fontSize: 'var(--text-sm)', color: 'var(--text-muted)' }}>No stops booked yet — check @thecoopeats for updates.</div>;
  } else {
    body = events.map((ev, i) => <StopRow key={ev.id || i} event={ev} last={i === events.length - 1} />);
  }

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
            Every upcoming stop we've got booked, straight off our calendar — nothing that's already passed. Subscribe and it updates itself on your phone.
          </p>
        </div>
        <Button as="a" href={CAL_SUBSCRIBE} target="_blank" rel="noopener" variant="primary"
          iconRight={<span style={{ fontSize: '.8em' }}>↗</span>}>ADD TO YOUR CALENDAR</Button>
      </div>
      <Card sticker padding="0" style={{ overflow: 'hidden' }}>
        {body}
      </Card>
      <p style={{ ...window.BODY, fontSize: 'var(--text-2xs)', color: 'var(--text-muted)', marginTop: 'var(--space-4)' }}>
        Weather and breakdowns happen. We post changes on @thecoopeats first.
      </p>
    </section>
  );
}
Object.assign(window, { FindUs, CAL_SUBSCRIBE, CAL_ID });
