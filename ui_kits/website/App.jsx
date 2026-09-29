const { NavBar, Button } = window.TheCoopDesignSystem_a9fb85;

const ROUTE_BY_PATH = { '/': 'home', '/menu': 'menu', '/find-us': 'find', '/catering': 'catering' };
const PATH_BY_ROUTE = { home: '/', menu: '/menu', find: '/find-us', catering: '/catering' };
const PAGE_META = {
  home: {
    title: 'The Coop — Fried Chicken Food Truck | Danbury, CT',
    description: "Hand-battered fried chicken sandwiches and nuggies, dipped in six truckmade sauces. Find The Coop's schedule, order ahead for pickup, or book us for catering."
  },
  menu: {
    title: 'Menu — The Coop',
    description: 'The full Coop menu: hand-battered fried chicken sandwiches, nuggies, and sides. Order ahead for pickup.'
  },
  find: {
    title: 'Find The Coop — Truck Schedule',
    description: "See where The Coop truck is parked next, straight from our live calendar. Based in Danbury, CT."
  },
  catering: {
    title: 'Catering — The Coop',
    description: 'Book The Coop for your next event. Build an instant catering estimate for weddings, office lunches, and parties.'
  }
};

function routeFromPath(pathname) {
  return ROUTE_BY_PATH[pathname] || 'home';
}

function App() {
  const [route, setRoute] = React.useState(() => routeFromPath(window.location.pathname));

  const navigate = React.useCallback(next => {
    const path = PATH_BY_ROUTE[next] || '/';
    if (window.location.pathname !== path) window.history.pushState(null, '', path);
    setRoute(next);
  }, []);

  React.useEffect(() => {
    const onPopState = () => setRoute(routeFromPath(window.location.pathname));
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  React.useEffect(() => {
    const meta = PAGE_META[route] || PAGE_META.home;
    document.title = meta.title;
    let tag = document.querySelector('meta[name="description"]');
    if (!tag) {
      tag = document.createElement('meta');
      tag.setAttribute('name', 'description');
      document.head.appendChild(tag);
    }
    tag.setAttribute('content', meta.description);
    window.scrollTo(0, 0);
  }, [route]);

  const order = () => window.open(ORDER_URL, '_blank', 'noopener');

  return (
    <div>
      <NavBar tone="red" assetBase="/" active={route}
        links={[{ value: 'home', label: 'Home' }, { value: 'menu', label: 'Menu' }, { value: 'find', label: 'Find us' }, { value: 'catering', label: 'Catering' }]}
        onNavigate={navigate}
        cta={<Button as="a" href={ORDER_URL} target="_blank" rel="noopener" variant="dark" size="sm">ORDER ONLINE ↗</Button>} />

      {route === 'home' && <>
        <Hero onOrder={order} onMenu={() => navigate('menu')} />
        <CateringBanner onCatering={() => navigate('catering')} />
        <Favorites items={[
          { name: 'The Buf-Mac-Wich', price: 13, photo: 'assets/food-buf-mac-wich.jpg', description: 'fried chicken sandwich with buffalo sauce, mac & cheese, pickles, and comeback sauce' },
          { name: 'The Nuggies', price: 8, photo: 'assets/food-nuggies.jpg', description: 'eight bite-sized pieces of boneless chicken breast, freshly-battered, fried and tossed in your sauce of choice' },
          { name: "The Cluckin'", price: 13, photo: 'assets/food-cluckin.jpg', description: 'fried chicken sandwich with bacon, muenster cheese, and thousand island dressing' }
        ]} />
        <Gallery />
        <MascotBanner />
        <ContactForm />
        <Footer />
      </>}
      {route === 'menu' && <><MenuScreen /><Footer /></>}
      {route === 'find' && <><FindUs /><Footer /></>}
      {route === 'catering' && <><Catering /><Footer /></>}
    </div>
  );
}
ReactDOM.createRoot(document.getElementById('root')).render(<App />);
