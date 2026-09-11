const { MenuSection, MenuItem, SauceChip, SAUCES, DashRule, Logo } = window.TheCoopDesignSystem_a9fb85;

const ENTREES = [
  ['The Breakfast Sandwich', 8, 'egg, american cheese, bacon, hashbrown, and a touch of comeback sauce on a toasted challah bun', 0],
  ['The Nuggies', 8, 'eight bite-sized pieces of boneless chicken breast, freshly-battered, fried and tossed in your sauce of choice', 0],
  ['The Original', 12, 'fried chicken sandwich with coleslaw, pickles, and comeback sauce', 0],
  ['The Classic', 13, 'fried chicken sandwich with lettuce, tomato, pickles, and mayo', 0],
  ["The Cluckin'", 13, 'fried chicken sandwich with bacon, muenster cheese, and thousand island dressing', 0],
  ['The Buf-Mac-Wich', 13, 'fried chicken sandwich with buffalo sauce, mac & cheese, pickles, and comeback sauce', 1],
  ['The Hot Honey', 14, 'fried chicken sandwich with bacon, pepperjack cheese, hot honey, pickles and comeback sauce', 1],
  ['The Nashville', 14, 'fried chicken sandwich with nashville hot seasoning, bacon, coleslaw, pickles, and comeback sauce', 2]
];
const SIDES = [['Clucked Fries',15],['Loaded Fries',10],['Cheese Fries',7],['Waffle Fries',5],['Fried Mac Bites',7],['Mac N Cheese',5],['Hashbrown',2],['Coleslaw',4]];

function ComebackSauce() {
  return (
    <div style={{
      width: 210, height: 240, border: '3px solid var(--coop-black)', borderRadius: '50% 50% 48% 52% / 52% 48% 50% 50%',
      display: 'grid', placeItems: 'center', textAlign: 'center', padding: 16, marginTop: 8
    }}>
      <div>
        <div style={{ fontFamily: 'var(--font-poster)', fontSize: 15, color: 'var(--coop-red)', lineHeight: 1.1, textTransform: 'uppercase' }}>Comeback<br />Sauce</div>
        <div style={{ fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: 14, lineHeight: 1.5, marginTop: 8 }}>
          worcestershire<br />mayonnaise<br />ketchup<br />hot sauce<br />black pepper<br />garlic
        </div>
      </div>
    </div>
  );
}

function MenuBoard({ assetBase = '../../' }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1.15fr 1fr', gap: 'var(--space-8)', padding: 'var(--space-7)', background: 'var(--coop-white)' }}>
      <MenuSection title="Entrees">
        {ENTREES.map(([n, p, d, h]) => <MenuItem key={n} name={n} price={p} description={d} heat={h} />)}
      </MenuSection>
      <div style={{ display: 'grid', gap: 'var(--space-5)', alignContent: 'start' }}>
        <div style={{ display: 'grid', justifyItems: 'center', gap: 6 }}>
          <Logo width={340} assetBase={assetBase} />
          <div style={{ fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: 18 }}>@thecoopeats</div>
          <div style={{ fontFamily: 'var(--font-body)', fontSize: 15, color: 'var(--text-muted)' }}>www.thecoopeats.com</div>
        </div>
        <DashRule />
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontFamily: 'var(--font-poster)', fontSize: 40, textTransform: 'uppercase', lineHeight: 1 }}>Dipped</div>
          <p style={{ fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: 14, color: 'var(--coop-red)', margin: '8px 0 12px', lineHeight: 1.3 }}>
            get any chicken item dipped in one of our truckmade delicious sauces
          </p>
          <div style={{ background: 'var(--coop-black)', borderRadius: 'var(--radius-lg)', padding: '12px', display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'center' }}>
            {SAUCES.map(s => <SauceChip key={s.id} sauce={s.id} style={{ border: 'none', background: 'transparent', padding: '2px 4px', fontSize: 18 }} />)}
          </div>
        </div>
        <DashRule />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-6)' }}>
          <MenuSection title="Sides">
            {SIDES.map(([n, p]) => <MenuItem key={n} name={n} price={p} compact />)}
          </MenuSection>
          <div style={{ display: 'grid', justifyItems: 'center' }}>
            <ComebackSauce />
          </div>
        </div>
      </div>
    </div>
  );
}
Object.assign(window, { MenuBoard, ENTREES, SIDES });
