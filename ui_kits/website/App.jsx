const { NavBar, Button } = window.TheCoopDesignSystem_a9fb85;

function App() {
  const [route, setRoute] = React.useState('home');
  const order = () => window.open(ORDER_URL, '_blank', 'noopener');

  return (
    <div>
      <NavBar tone="red" assetBase="../../" active={route}
        links={[{ value: 'home', label: 'Home' }, { value: 'menu', label: 'Menu' }, { value: 'find', label: 'Find us' }, { value: 'catering', label: 'Catering' }]}
        onNavigate={setRoute}
        cta={<Button as="a" href={ORDER_URL} target="_blank" rel="noopener" variant="dark" size="sm">ORDER ONLINE ↗</Button>} />

      {route === 'home' && <>
        <Hero onOrder={order} onMenu={() => setRoute('menu')} />
        <CateringBanner onCatering={() => setRoute('catering')} />
        <Favorites items={[
          { name: 'The Buf-Mac-Wich', price: 13, photo: 'assets/food-buf-mac-wich.jpg', description: 'fried chicken sandwich with buffalo sauce, mac & cheese, pickles, and comeback sauce' },
          { name: 'The Nuggies', price: 8, photo: 'assets/food-nuggies.jpg', description: 'eight bite-sized pieces of boneless chicken breast, freshly-battered, fried and tossed in your sauce of choice' },
          { name: "The Cluckin'", price: 13, photo: 'assets/food-cluckin.jpg', description: 'fried chicken sandwich with bacon, muenster cheese, and thousand island dressing' }
        ]} />
        <Gallery />
        <MascotBanner />
        <Footer />
      </>}
      {route === 'menu' && <><MenuScreen /><Footer /></>}
      {route === 'find' && <><FindUs /><Footer /></>}
      {route === 'catering' && <><Catering /><Footer /></>}
    </div>
  );
}
ReactDOM.createRoot(document.getElementById('root')).render(<App />);
