const { MenuSection, MenuItem, Tabs, Button } = window.TheCoopDesignSystem_a9fb85;
const ORDER_URL = 'https://order.tbdine.com/pickup/30439/menu';

const MENU = {
  entrees: [
    ['The Breakfast Sandwich', 8, 'egg, american cheese, bacon, hashbrown, and a touch of comeback sauce on a toasted challah bun', 0],
    ['The Nuggies', 8, 'eight bite-sized pieces of boneless chicken breast, freshly-battered, fried and tossed in your sauce of choice', 0],
    ['The Original', 12, 'fried chicken sandwich with coleslaw, pickles, and comeback sauce', 0],
    ['The Classic', 13, 'fried chicken sandwich with lettuce, tomato, pickles, and mayo', 0],
    ["The Cluckin'", 13, 'fried chicken sandwich with bacon, muenster cheese, and thousand island dressing', 0],
    ['The Buf-Mac-Wich', 13, 'fried chicken sandwich with buffalo sauce, mac & cheese, pickles, and comeback sauce', 1],
    ['The Hot Honey', 14, 'fried chicken sandwich with bacon, pepperjack cheese, hot honey, pickles and comeback sauce', 1],
    ['The Nashville', 14, 'fried chicken sandwich with nashville hot seasoning, bacon, coleslaw, pickles, and comeback sauce', 2]
  ],
  sides: [['Clucked Fries', 15], ['Loaded Fries', 10], ['Cheese Fries', 7], ['Waffle Fries', 5], ['Fried Mac Bites', 7], ['Mac N Cheese', 5], ['Hashbrown', 2], ['Coleslaw', 4]]
};

function MenuScreen() {
  const [tab, setTab] = React.useState('entrees');
  return (
    <section style={{ maxWidth: 'var(--max-content)', margin: '0 auto', padding: 'var(--space-7) var(--gutter-page)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16, flexWrap: 'wrap', marginBottom: 'var(--space-5)' }}>
        <h1 style={{ ...window.POSTER, fontSize: 'var(--text-3xl)', margin: 0 }}>The menu</h1>
        <Tabs items={[{ value: 'entrees', label: 'Entrees' }, { value: 'sides', label: 'Sides' }]} value={tab} onChange={setTab} />
      </div>
      {tab === 'entrees' && <MenuSection title="Entrees">
        {MENU.entrees.map(([n, p, d, h]) => <MenuItem key={n} name={n} price={p} description={d} heat={h} />)}
      </MenuSection>}
      {tab === 'sides' && <MenuSection title="Sides" columns={2}>
        {MENU.sides.map(([n, p]) => <MenuItem key={n} name={n} price={p} />)}
      </MenuSection>}
      <div style={{ marginTop: 'var(--space-7)', display: 'flex', gap: 'var(--space-4)', alignItems: 'center', flexWrap: 'wrap' }}>
        <Button as="a" href={ORDER_URL} target="_blank" rel="noopener" variant="primary" size="lg" iconRight={<span style={{ fontSize: '.8em' }}>↗</span>}>ORDER ONLINE</Button>
        <span style={{ ...window.BODY, fontSize: 'var(--text-xs)', color: 'var(--text-muted)' }}>Pickup ordering is handled on TouchBistro — you'll leave this site.</span>
      </div>
    </section>
  );
}
Object.assign(window, { MenuScreen, MENU, ORDER_URL });
