/* @ds-bundle: {"format":4,"namespace":"TheCoopDesignSystem_a9fb85","components":[{"name":"Badge","sourcePath":"components/core/Badge.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Card","sourcePath":"components/core/Card.jsx"},{"name":"IconButton","sourcePath":"components/core/IconButton.jsx"},{"name":"Logo","sourcePath":"components/core/Logo.jsx"},{"name":"Dialog","sourcePath":"components/feedback/Dialog.jsx"},{"name":"Toast","sourcePath":"components/feedback/Toast.jsx"},{"name":"Tooltip","sourcePath":"components/feedback/Tooltip.jsx"},{"name":"Checkbox","sourcePath":"components/forms/Checkbox.jsx"},{"name":"Input","sourcePath":"components/forms/Input.jsx"},{"name":"Radio","sourcePath":"components/forms/Radio.jsx"},{"name":"Select","sourcePath":"components/forms/Select.jsx"},{"name":"Stepper","sourcePath":"components/forms/Stepper.jsx"},{"name":"Switch","sourcePath":"components/forms/Switch.jsx"},{"name":"DashRule","sourcePath":"components/menu/DashRule.jsx"},{"name":"HeatMeter","sourcePath":"components/menu/HeatMeter.jsx"},{"name":"MenuItem","sourcePath":"components/menu/MenuItem.jsx"},{"name":"MenuSection","sourcePath":"components/menu/MenuSection.jsx"},{"name":"PriceTag","sourcePath":"components/menu/PriceTag.jsx"},{"name":"SAUCES","sourcePath":"components/menu/SauceChip.jsx"},{"name":"SauceChip","sourcePath":"components/menu/SauceChip.jsx"},{"name":"NavBar","sourcePath":"components/navigation/NavBar.jsx"},{"name":"Tabs","sourcePath":"components/navigation/Tabs.jsx"}],"sourceHashes":{"components/core/Badge.jsx":"1484682220bf","components/core/Button.jsx":"dc332467c796","components/core/Card.jsx":"5b2c73dcfc5f","components/core/IconButton.jsx":"4f71f8ee7d01","components/core/Logo.jsx":"5a9a9031d9fe","components/feedback/Dialog.jsx":"71df3f1f069c","components/feedback/Toast.jsx":"3a93aca2d530","components/feedback/Tooltip.jsx":"861da2772fc8","components/forms/Checkbox.jsx":"48be8beab891","components/forms/Input.jsx":"a10966a2cea1","components/forms/Radio.jsx":"2094c0680b7c","components/forms/Select.jsx":"9d87e4097736","components/forms/Stepper.jsx":"6bb712f8f64b","components/forms/Switch.jsx":"83e772f649b2","components/menu/DashRule.jsx":"a7284845ff43","components/menu/HeatMeter.jsx":"6b109f74936f","components/menu/MenuItem.jsx":"22fefa8238e3","components/menu/MenuSection.jsx":"ef723fca47da","components/menu/PriceTag.jsx":"80dd87978fca","components/menu/SauceChip.jsx":"53c8934d7e89","components/navigation/NavBar.jsx":"5820da00af9a","components/navigation/Tabs.jsx":"c6b65214cd3f","ui_kits/menu_board/MenuBoard.jsx":"a9049edbf8dc","ui_kits/website/App.jsx":"c0fa9302fcb8","ui_kits/website/Catering.jsx":"1d07c16ffe2d","ui_kits/website/FindUs.jsx":"dd556d84dd4d","ui_kits/website/MenuScreen.jsx":"a5265c567b8e","ui_kits/website/Screens.jsx":"9283b63325d8"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.TheCoopDesignSystem_a9fb85 = window.TheCoopDesignSystem_a9fb85 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/core/Badge.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const tones = {
  red: {
    background: 'var(--coop-red)',
    color: '#fff'
  },
  black: {
    background: 'var(--coop-black)',
    color: '#fff'
  },
  white: {
    background: '#fff',
    color: 'var(--coop-black)'
  },
  maple: {
    background: 'var(--sauce-spicy-maple)',
    color: 'var(--coop-black)'
  },
  buffalo: {
    background: 'var(--sauce-buffalo)',
    color: 'var(--coop-black)'
  }
};
function Badge({
  tone = 'red',
  size = 'md',
  outlined = true,
  children,
  style,
  ...rest
}) {
  const dims = size === 'sm' ? {
    fontSize: 'var(--text-3xs)',
    padding: '3px 8px',
    borderWidth: 'var(--stroke-1)'
  } : {
    fontSize: 'var(--text-2xs)',
    padding: '5px 12px',
    borderWidth: 'var(--stroke-2)'
  };
  return /*#__PURE__*/React.createElement("span", _extends({}, rest, {
    style: {
      ...tones[tone],
      ...dims,
      display: 'inline-flex',
      width: 'fit-content',
      justifySelf: 'start',
      alignItems: 'center',
      gap: '4px',
      fontFamily: 'var(--font-poster)',
      letterSpacing: 'var(--tracking-caps)',
      lineHeight: 1.1,
      textTransform: 'uppercase',
      borderRadius: 'var(--radius-pill)',
      borderStyle: 'solid',
      borderColor: outlined ? 'var(--coop-black)' : 'transparent',
      ...style
    }
  }), children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Badge.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const base = {
  fontFamily: 'var(--font-poster)',
  letterSpacing: 'var(--tracking-poster)',
  border: 'var(--stroke-2) solid var(--coop-black)',
  cursor: 'pointer',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 'var(--space-2)',
  textDecoration: 'none',
  lineHeight: 1,
  whiteSpace: 'nowrap',
  transition: 'transform var(--dur-fast) var(--ease-pop), box-shadow var(--dur-fast) var(--ease-pop), background var(--dur-fast) linear'
};
const sizes = {
  sm: {
    fontSize: 'var(--text-xs)',
    padding: '9px 14px',
    borderRadius: 'var(--radius-md)'
  },
  md: {
    fontSize: 'var(--text-md)',
    padding: '13px 22px',
    borderRadius: 'var(--radius-lg)'
  },
  lg: {
    fontSize: 'var(--text-lg)',
    padding: '18px 32px',
    borderRadius: 'var(--radius-lg)'
  }
};
const variants = {
  primary: {
    background: 'var(--coop-red)',
    color: 'var(--coop-white)'
  },
  dark: {
    background: 'var(--coop-black)',
    color: 'var(--coop-white)'
  },
  light: {
    background: 'var(--coop-white)',
    color: 'var(--coop-black)'
  },
  ghost: {
    background: 'transparent',
    color: 'var(--coop-black)',
    border: 'var(--stroke-2) solid transparent',
    boxShadow: 'none'
  }
};
function Button({
  variant = 'primary',
  size = 'md',
  block,
  disabled,
  iconLeft,
  iconRight,
  as = 'button',
  children,
  style,
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const [down, setDown] = React.useState(false);
  const Tag = as;
  const flat = variant === 'ghost';
  const offset = down ? 2 : 0;
  const s = {
    ...base,
    ...sizes[size],
    ...variants[variant],
    width: block ? '100%' : undefined,
    boxShadow: flat ? 'none' : down ? 'var(--shadow-sticker-press)' : 'var(--shadow-sticker)',
    transform: down ? 'translate(2px,2px)' : hover && !flat ? 'translate(-1px,-1px)' : 'none',
    filter: hover && !flat ? 'brightness(1.06)' : 'none',
    background: flat && hover ? 'var(--gray-100)' : variants[variant].background,
    opacity: disabled ? 0.4 : 1,
    pointerEvents: disabled ? 'none' : undefined,
    ...style
  };
  void offset;
  return /*#__PURE__*/React.createElement(Tag, _extends({}, rest, {
    disabled: Tag === 'button' ? disabled : undefined,
    style: s,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => {
      setHover(false);
      setDown(false);
    },
    onMouseDown: () => setDown(true),
    onMouseUp: () => setDown(false)
  }), iconLeft, children, iconRight);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/Card.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Card({
  tone = 'paper',
  outlined = true,
  sticker,
  hoverLift,
  padding = 'var(--space-5)',
  children,
  style,
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const tones = {
    paper: {
      background: 'var(--surface-card)',
      color: 'var(--text-body)'
    },
    board: {
      background: 'var(--coop-black)',
      color: 'var(--text-on-black)'
    },
    red: {
      background: 'var(--coop-red)',
      color: 'var(--text-on-red)'
    },
    sunk: {
      background: 'var(--surface-sunk)',
      color: 'var(--text-body)'
    }
  };
  return /*#__PURE__*/React.createElement("div", _extends({}, rest, {
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      ...tones[tone],
      padding,
      borderRadius: 'var(--radius-lg)',
      border: outlined ? 'var(--outline-hard)' : '1px solid var(--border-soft)',
      boxShadow: sticker ? hoverLift && hover ? 'var(--shadow-sticker-lg)' : 'var(--shadow-sticker)' : outlined ? 'none' : 'var(--shadow-card)',
      transform: sticker && hoverLift && hover ? 'translate(-2px,-2px)' : 'none',
      transition: 'transform var(--dur-med) var(--ease-pop), box-shadow var(--dur-med) var(--ease-pop)',
      ...style
    }
  }), children);
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Card.jsx", error: String((e && e.message) || e) }); }

// components/core/IconButton.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function IconButton({
  variant = 'light',
  size = 40,
  label,
  children,
  style,
  ...rest
}) {
  const [down, setDown] = React.useState(false);
  const [hover, setHover] = React.useState(false);
  const bg = {
    light: 'var(--coop-white)',
    dark: 'var(--coop-black)',
    red: 'var(--coop-red)'
  }[variant];
  const fg = variant === 'light' ? 'var(--coop-black)' : 'var(--coop-white)';
  return /*#__PURE__*/React.createElement("button", _extends({}, rest, {
    "aria-label": label,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => {
      setHover(false);
      setDown(false);
    },
    onMouseDown: () => setDown(true),
    onMouseUp: () => setDown(false),
    style: {
      width: size,
      height: size,
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: bg,
      color: fg,
      border: 'var(--stroke-2) solid var(--coop-black)',
      borderRadius: 'var(--radius-pill)',
      cursor: 'pointer',
      padding: 0,
      boxShadow: down ? 'var(--shadow-sticker-press)' : 'var(--shadow-sticker)',
      transform: down ? 'translate(2px,2px)' : hover ? 'translate(-1px,-1px)' : 'none',
      transition: 'transform var(--dur-fast) var(--ease-pop), box-shadow var(--dur-fast) var(--ease-pop)',
      ...style
    }
  }), children);
}
Object.assign(__ds_scope, { IconButton });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/IconButton.jsx", error: String((e && e.message) || e) }); }

// components/core/Logo.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const files = {
  primary: 'assets/logo-coop.png',
  knockout: 'assets/logo-coop-knockout.png',
  nugs: 'assets/nugs-not-drugs.png'
};
function Logo({
  variant = 'primary',
  width = 180,
  assetBase = '',
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("img", _extends({}, rest, {
    src: assetBase + files[variant],
    alt: variant === 'nugs' ? 'Nugs Not Drugs — The Coop' : 'The Coop',
    style: {
      width,
      height: 'auto',
      display: 'block',
      ...style
    }
  }));
}
Object.assign(__ds_scope, { Logo });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Logo.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Dialog.jsx
try { (() => {
function Dialog({
  open,
  title,
  children,
  onClose,
  footer,
  width = 480
}) {
  if (!open) return null;
  return /*#__PURE__*/React.createElement("div", {
    onClick: onClose,
    style: {
      position: 'fixed',
      inset: 0,
      background: 'rgba(10,10,10,.6)',
      display: 'grid',
      placeItems: 'center',
      padding: 'var(--space-5)',
      zIndex: 60
    }
  }, /*#__PURE__*/React.createElement("div", {
    onClick: e => e.stopPropagation(),
    role: "dialog",
    "aria-modal": "true",
    style: {
      width: '100%',
      maxWidth: width,
      background: 'var(--coop-white)',
      border: 'var(--outline-hard)',
      borderRadius: 'var(--radius-xl)',
      boxShadow: 'var(--shadow-sticker-lg)',
      padding: 'var(--space-6)',
      animation: 'none'
    }
  }, title && /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: '0 0 var(--space-3)',
      fontFamily: 'var(--font-poster)',
      fontSize: 'var(--text-xl)',
      textTransform: 'uppercase',
      letterSpacing: 'var(--tracking-poster)',
      lineHeight: 1.05
    }
  }, title), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--text-sm)',
      lineHeight: 'var(--leading-body)',
      color: 'var(--text-body)'
    }
  }, children), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 'var(--space-3)',
      justifyContent: 'flex-end',
      marginTop: 'var(--space-5)'
    }
  }, footer || /*#__PURE__*/React.createElement(__ds_scope.Button, {
    variant: "primary",
    onClick: onClose
  }, "GOT IT"))));
}
Object.assign(__ds_scope, { Dialog });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Dialog.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Toast.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Toast({
  tone = 'dark',
  title,
  message,
  onDismiss,
  style,
  ...rest
}) {
  const bg = {
    dark: 'var(--coop-black)',
    red: 'var(--coop-red)',
    white: 'var(--coop-white)'
  }[tone];
  const fg = tone === 'white' ? 'var(--coop-black)' : 'var(--coop-white)';
  return /*#__PURE__*/React.createElement("div", _extends({}, rest, {
    role: "status",
    style: {
      display: 'flex',
      alignItems: 'flex-start',
      gap: 'var(--space-3)',
      background: bg,
      color: fg,
      border: 'var(--outline-hard)',
      borderRadius: 'var(--radius-lg)',
      boxShadow: 'var(--shadow-sticker)',
      padding: 'var(--space-3) var(--space-4)',
      maxWidth: 380,
      ...style
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gap: '2px',
      flex: 1
    }
  }, title && /*#__PURE__*/React.createElement("strong", {
    style: {
      fontFamily: 'var(--font-poster)',
      fontSize: 'var(--text-xs)',
      letterSpacing: 'var(--tracking-caps)',
      textTransform: 'uppercase',
      fontWeight: 400
    }
  }, title), message && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--text-2xs)',
      lineHeight: 'var(--leading-body)'
    }
  }, message)), onDismiss && /*#__PURE__*/React.createElement("button", {
    onClick: onDismiss,
    "aria-label": "Dismiss",
    style: {
      border: 'none',
      background: 'transparent',
      color: fg,
      cursor: 'pointer',
      fontFamily: 'var(--font-poster)',
      fontSize: 'var(--text-sm)',
      lineHeight: 1,
      padding: 0
    }
  }, "\xD7"));
}
Object.assign(__ds_scope, { Toast });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Toast.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Tooltip.jsx
try { (() => {
function Tooltip({
  label,
  placement = 'top',
  children
}) {
  const [show, setShow] = React.useState(false);
  const pos = placement === 'bottom' ? {
    top: 'calc(100% + 8px)'
  } : {
    bottom: 'calc(100% + 8px)'
  };
  return /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'relative',
      display: 'inline-flex'
    },
    onMouseEnter: () => setShow(true),
    onMouseLeave: () => setShow(false),
    onFocus: () => setShow(true),
    onBlur: () => setShow(false)
  }, children, show && /*#__PURE__*/React.createElement("span", {
    role: "tooltip",
    style: {
      position: 'absolute',
      left: '50%',
      transform: 'translateX(-50%)',
      ...pos,
      background: 'var(--coop-black)',
      color: 'var(--coop-white)',
      fontFamily: 'var(--font-body)',
      fontWeight: 700,
      fontSize: 'var(--text-3xs)',
      padding: '6px 10px',
      borderRadius: 'var(--radius-sm)',
      whiteSpace: 'nowrap',
      zIndex: 40
    }
  }, label));
}
Object.assign(__ds_scope, { Tooltip });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Tooltip.jsx", error: String((e && e.message) || e) }); }

// components/forms/Checkbox.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Checkbox({
  label,
  description,
  checked,
  onChange,
  disabled,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: 'flex',
      gap: 'var(--space-3)',
      alignItems: 'flex-start',
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.45 : 1
    }
  }, /*#__PURE__*/React.createElement("input", _extends({}, rest, {
    type: "checkbox",
    checked: checked,
    disabled: disabled,
    onChange: e => onChange && onChange(e.target.checked, e),
    style: {
      appearance: 'none',
      width: 24,
      height: 24,
      margin: 0,
      flex: '0 0 auto',
      border: 'var(--stroke-2) solid var(--coop-black)',
      borderRadius: '7px',
      background: checked ? 'var(--coop-red)' : 'var(--coop-white)',
      cursor: 'inherit',
      transition: 'background var(--dur-fast) linear',
      boxShadow: checked ? 'inset 0 0 0 3px var(--coop-white), inset 0 0 0 12px var(--coop-red)' : 'none'
    }
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'grid',
      gap: '2px'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-body)',
      fontWeight: 700,
      fontSize: 'var(--text-sm)'
    }
  }, label), description && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--text-2xs)',
      color: 'var(--text-muted)'
    }
  }, description)));
}
Object.assign(__ds_scope, { Checkbox });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Checkbox.jsx", error: String((e && e.message) || e) }); }

// components/forms/Input.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Input({
  label,
  hint,
  error,
  prefix,
  suffix,
  id,
  style,
  ...rest
}) {
  const [focus, setFocus] = React.useState(false);
  const uid = id || React.useId();
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gap: '6px'
    }
  }, label && /*#__PURE__*/React.createElement("label", {
    htmlFor: uid,
    style: {
      fontFamily: 'var(--font-poster)',
      fontSize: 'var(--text-2xs)',
      letterSpacing: 'var(--tracking-caps)',
      textTransform: 'uppercase',
      color: 'var(--coop-black)'
    }
  }, label), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--space-2)',
      background: 'var(--coop-white)',
      borderRadius: 'var(--radius-md)',
      border: 'var(--stroke-2) solid ' + (error ? 'var(--coop-red)' : 'var(--coop-black)'),
      boxShadow: focus ? '0 0 0 3px rgba(200,37,43,.35)' : 'none',
      padding: '0 var(--space-3)',
      transition: 'box-shadow var(--dur-fast) linear'
    }
  }, prefix && /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--gray-600)',
      display: 'flex'
    }
  }, prefix), /*#__PURE__*/React.createElement("input", _extends({}, rest, {
    id: uid,
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
    style: {
      flex: 1,
      minWidth: 0,
      border: 'none',
      outline: 'none',
      background: 'transparent',
      fontFamily: 'var(--font-body)',
      fontWeight: 'var(--weight-body)',
      fontSize: 'var(--text-sm)',
      color: 'var(--text-body)',
      padding: '12px 0',
      ...style
    }
  })), suffix && /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--gray-600)',
      display: 'flex'
    }
  }, suffix)), (hint || error) && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--text-2xs)',
      color: error ? 'var(--coop-red)' : 'var(--text-muted)'
    }
  }, error || hint));
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Input.jsx", error: String((e && e.message) || e) }); }

// components/forms/Radio.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Radio({
  label,
  name,
  value,
  checked,
  onChange,
  disabled,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: 'flex',
      gap: 'var(--space-3)',
      alignItems: 'center',
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.45 : 1
    }
  }, /*#__PURE__*/React.createElement("input", _extends({}, rest, {
    type: "radio",
    name: name,
    value: value,
    checked: checked,
    disabled: disabled,
    onChange: e => onChange && onChange(value, e),
    style: {
      appearance: 'none',
      width: 24,
      height: 24,
      margin: 0,
      flex: '0 0 auto',
      border: 'var(--stroke-2) solid var(--coop-black)',
      borderRadius: '999px',
      background: 'var(--coop-white)',
      cursor: 'inherit',
      boxShadow: checked ? 'inset 0 0 0 4px var(--coop-white), inset 0 0 0 12px var(--coop-red)' : 'none',
      transition: 'box-shadow var(--dur-fast) var(--ease-pop)'
    }
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-body)',
      fontWeight: 700,
      fontSize: 'var(--text-sm)'
    }
  }, label));
}
Object.assign(__ds_scope, { Radio });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Radio.jsx", error: String((e && e.message) || e) }); }

// components/forms/Select.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Select({
  label,
  options = [],
  hint,
  id,
  style,
  ...rest
}) {
  const uid = id || React.useId();
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gap: '6px'
    }
  }, label && /*#__PURE__*/React.createElement("label", {
    htmlFor: uid,
    style: {
      fontFamily: 'var(--font-poster)',
      fontSize: 'var(--text-2xs)',
      letterSpacing: 'var(--tracking-caps)',
      textTransform: 'uppercase'
    }
  }, label), /*#__PURE__*/React.createElement("select", _extends({}, rest, {
    id: uid,
    style: {
      appearance: 'none',
      width: '100%',
      background: 'var(--coop-white)',
      border: 'var(--stroke-2) solid var(--coop-black)',
      borderRadius: 'var(--radius-md)',
      padding: '12px var(--space-6) 12px var(--space-3)',
      fontFamily: 'var(--font-body)',
      fontWeight: 'var(--weight-body)',
      fontSize: 'var(--text-sm)',
      color: 'var(--text-body)',
      cursor: 'pointer',
      backgroundImage: 'linear-gradient(45deg,transparent 50%,var(--coop-black) 50%),linear-gradient(135deg,var(--coop-black) 50%,transparent 50%)',
      backgroundPosition: 'calc(100% - 20px) 21px,calc(100% - 14px) 21px',
      backgroundSize: '6px 6px,6px 6px',
      backgroundRepeat: 'no-repeat',
      ...style
    }
  }), options.map(o => {
    const v = typeof o === 'string' ? o : o.value;
    const l = typeof o === 'string' ? o : o.label;
    return /*#__PURE__*/React.createElement("option", {
      key: v,
      value: v
    }, l);
  })), hint && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--text-2xs)',
      color: 'var(--text-muted)'
    }
  }, hint));
}
Object.assign(__ds_scope, { Select });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Select.jsx", error: String((e && e.message) || e) }); }

// components/forms/Stepper.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Stepper({
  value = 1,
  min = 0,
  max = 99,
  onChange,
  size = 'md',
  ...rest
}) {
  const dim = size === 'sm' ? 32 : 40;
  const btn = (glyph, next, disabled) => /*#__PURE__*/React.createElement("button", {
    type: "button",
    disabled: disabled,
    onClick: () => onChange && onChange(next),
    style: {
      width: dim,
      height: dim,
      border: 'none',
      background: 'transparent',
      fontFamily: 'var(--font-poster)',
      fontSize: 'var(--text-md)',
      lineHeight: 1,
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.3 : 1,
      color: 'var(--coop-black)'
    }
  }, glyph);
  return /*#__PURE__*/React.createElement("div", _extends({}, rest, {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      border: 'var(--stroke-2) solid var(--coop-black)',
      borderRadius: 'var(--radius-pill)',
      background: 'var(--coop-white)',
      overflow: 'hidden'
    }
  }), btn('–', Math.max(min, value - 1), value <= min), /*#__PURE__*/React.createElement("span", {
    style: {
      minWidth: 28,
      textAlign: 'center',
      fontFamily: 'var(--font-poster)',
      fontSize: 'var(--text-sm)',
      lineHeight: 1
    }
  }, value), btn('+', Math.min(max, value + 1), value >= max));
}
Object.assign(__ds_scope, { Stepper });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Stepper.jsx", error: String((e && e.message) || e) }); }

// components/forms/Switch.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Switch({
  label,
  checked,
  onChange,
  disabled,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: 'inline-flex',
      gap: 'var(--space-3)',
      alignItems: 'center',
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.45 : 1
    }
  }, /*#__PURE__*/React.createElement("span", {
    onClick: () => !disabled && onChange && onChange(!checked),
    style: {
      width: 56,
      height: 32,
      borderRadius: 'var(--radius-pill)',
      position: 'relative',
      border: 'var(--stroke-2) solid var(--coop-black)',
      background: checked ? 'var(--coop-red)' : 'var(--gray-200)',
      transition: 'background var(--dur-med) linear',
      flex: '0 0 auto'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      top: 2,
      left: checked ? 26 : 2,
      width: 22,
      height: 22,
      borderRadius: '999px',
      background: 'var(--coop-white)',
      border: 'var(--stroke-1) solid var(--coop-black)',
      transition: 'left var(--dur-med) var(--ease-pop)'
    }
  })), label && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-body)',
      fontWeight: 700,
      fontSize: 'var(--text-sm)'
    }
  }, label), /*#__PURE__*/React.createElement("input", _extends({
    type: "checkbox",
    checked: !!checked,
    readOnly: true,
    hidden: true
  }, rest)));
}
Object.assign(__ds_scope, { Switch });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Switch.jsx", error: String((e && e.message) || e) }); }

// components/menu/DashRule.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function DashRule({
  color = 'var(--coop-red)',
  thickness = 5,
  dash = 18,
  gap = 14,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({}, rest, {
    role: "separator",
    style: {
      height: thickness,
      background: `repeating-linear-gradient(90deg,${color} 0 ${dash}px,transparent ${dash}px ${dash + gap}px)`,
      ...style
    }
  }));
}
Object.assign(__ds_scope, { DashRule });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/menu/DashRule.jsx", error: String((e && e.message) || e) }); }

// components/menu/HeatMeter.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function HeatMeter({
  level = 0,
  size = 16,
  style,
  ...rest
}) {
  if (!level) return null;
  const colors = ['var(--heat-1)', 'var(--heat-2)', 'var(--heat-3)'];
  return /*#__PURE__*/React.createElement("span", _extends({}, rest, {
    role: "img",
    "aria-label": `Heat level ${level} of 3`,
    style: {
      display: 'inline-flex',
      gap: '2px',
      verticalAlign: 'middle',
      ...style
    }
  }), Array.from({
    length: level
  }).map((_, i) => /*#__PURE__*/React.createElement("svg", {
    key: i,
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: colors[Math.min(i, 2)],
    stroke: "var(--coop-black)",
    strokeWidth: "1.5",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M12 2c2.5 3.5 1 5.5 0 6.5C10.5 7 9 6 9 4 6.5 6 5 9 5 12a7 7 0 0 0 14 0c0-3.5-2.5-7-7-10z"
  }))));
}
Object.assign(__ds_scope, { HeatMeter });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/menu/HeatMeter.jsx", error: String((e && e.message) || e) }); }

// components/menu/MenuSection.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function MenuSection({
  title,
  tone = 'paper',
  note,
  columns = 1,
  children,
  style,
  ...rest
}) {
  const dark = tone === 'board';
  return /*#__PURE__*/React.createElement("section", _extends({}, rest, {
    style: {
      color: dark ? 'var(--text-on-black)' : 'var(--text-body)',
      ...style
    }
  }), /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: '0 0 var(--space-2)',
      fontFamily: 'var(--font-poster)',
      fontSize: 'var(--text-2xl)',
      letterSpacing: 'var(--tracking-poster)',
      textTransform: 'uppercase',
      lineHeight: 1,
      color: dark ? 'var(--coop-white)' : 'var(--coop-red)'
    }
  }, title), note && /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '0 0 var(--space-3)',
      fontFamily: 'var(--font-body)',
      fontWeight: 700,
      fontSize: 'var(--text-xs)',
      color: 'var(--coop-red)',
      lineHeight: 'var(--leading-snug)'
    }
  }, note), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: `repeat(${columns},minmax(0,1fr))`,
      columnGap: 'var(--space-6)'
    }
  }, children));
}
Object.assign(__ds_scope, { MenuSection });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/menu/MenuSection.jsx", error: String((e && e.message) || e) }); }

// components/menu/PriceTag.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function PriceTag({
  value,
  size = 'md',
  tone = 'ink',
  currency = '$',
  style,
  ...rest
}) {
  const sizes = {
    sm: 'var(--text-md)',
    md: 'var(--text-xl)',
    lg: 'var(--text-2xl)'
  };
  const colors = {
    ink: 'var(--coop-black)',
    red: 'var(--coop-red)',
    white: 'var(--coop-white)'
  };
  return /*#__PURE__*/React.createElement("span", _extends({}, rest, {
    style: {
      fontFamily: 'var(--font-poster)',
      fontSize: sizes[size],
      color: colors[tone],
      letterSpacing: 'var(--tracking-poster)',
      lineHeight: 1,
      whiteSpace: 'nowrap',
      ...style
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: '0.62em',
      verticalAlign: '0.28em',
      marginRight: '1px'
    }
  }, currency), value);
}
Object.assign(__ds_scope, { PriceTag });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/menu/PriceTag.jsx", error: String((e && e.message) || e) }); }

// components/menu/MenuItem.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function MenuItem({
  name,
  price,
  description,
  heat = 0,
  badge,
  tone = 'paper',
  compact,
  soldOut,
  onClick,
  style,
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const dark = tone === 'board';
  const clickable = typeof onClick === 'function' && !soldOut;
  return /*#__PURE__*/React.createElement("div", _extends({}, rest, {
    onClick: clickable ? onClick : undefined,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr auto',
      columnGap: 'var(--space-4)',
      alignItems: 'baseline',
      padding: compact ? 'var(--space-2) 0' : 'var(--space-3) 0',
      cursor: clickable ? 'pointer' : 'default',
      opacity: soldOut ? 0.45 : 1,
      color: dark ? 'var(--text-on-black)' : 'var(--text-body)',
      ...style
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--space-2)',
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-poster)',
      fontSize: compact ? 'var(--text-md)' : 'var(--text-lg)',
      letterSpacing: 'var(--tracking-poster)',
      textTransform: 'uppercase',
      lineHeight: 1.05,
      color: dark ? 'var(--coop-white)' : 'var(--coop-black)',
      textDecoration: clickable && hover ? 'underline' : 'none',
      textDecorationThickness: '3px',
      textUnderlineOffset: '3px',
      textDecorationColor: 'var(--coop-red)'
    }
  }, name), /*#__PURE__*/React.createElement(__ds_scope.HeatMeter, {
    level: heat,
    size: compact ? 14 : 17
  }), badge && /*#__PURE__*/React.createElement(__ds_scope.Badge, {
    tone: dark ? 'white' : 'red',
    size: "sm"
  }, badge), soldOut && /*#__PURE__*/React.createElement(__ds_scope.Badge, {
    tone: "black",
    size: "sm"
  }, "Sold out")), description && !compact && /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '4px 0 0',
      fontFamily: 'var(--font-body)',
      fontWeight: 'var(--weight-body)',
      fontSize: 'var(--text-sm)',
      lineHeight: 'var(--leading-body)',
      maxWidth: '46ch',
      color: dark ? 'rgba(255,255,255,.82)' : 'var(--text-muted)'
    }
  }, description)), /*#__PURE__*/React.createElement(__ds_scope.PriceTag, {
    value: price,
    size: compact ? 'sm' : 'md',
    tone: dark ? 'white' : 'ink'
  }));
}
Object.assign(__ds_scope, { MenuItem });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/menu/MenuItem.jsx", error: String((e && e.message) || e) }); }

// components/menu/SauceChip.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const SAUCES = [{
  id: 'honey-bbq',
  label: 'Honey BBQ',
  color: 'var(--sauce-honey-bbq)'
}, {
  id: 'garlic-parmesan',
  label: 'Garlic Parmesan',
  color: 'var(--sauce-garlic-parm)'
}, {
  id: 'spicy-maple',
  label: 'Spicy Maple',
  color: 'var(--sauce-spicy-maple)'
}, {
  id: 'sweet-thai-chili',
  label: 'Sweet Thai Chili',
  color: 'var(--sauce-sweet-thai)'
}, {
  id: 'buffalo',
  label: 'Buffalo',
  color: 'var(--sauce-buffalo)'
}, {
  id: 'nashville-hot',
  label: 'Nashville Hot',
  color: 'var(--sauce-nashville)'
}];
function SauceChip({
  sauce,
  label,
  color,
  selected,
  onSelect,
  style,
  ...rest
}) {
  const meta = SAUCES.find(s => s.id === sauce);
  const text = label || meta && meta.label || sauce;
  const c = color || meta && meta.color || 'var(--sauce-spicy-maple)';
  const interactive = typeof onSelect === 'function';
  return /*#__PURE__*/React.createElement("button", _extends({}, rest, {
    type: "button",
    disabled: !interactive,
    onClick: interactive ? () => onSelect(sauce) : undefined,
    style: {
      fontFamily: 'var(--font-poster)',
      fontSize: 'var(--text-xs)',
      letterSpacing: 'var(--tracking-caps)',
      textTransform: 'uppercase',
      lineHeight: 1,
      padding: '9px 14px',
      borderRadius: 'var(--radius-pill)',
      cursor: interactive ? 'pointer' : 'default',
      border: 'var(--stroke-2) solid ' + (selected ? c : 'var(--coop-black)'),
      background: selected ? c : 'var(--coop-black)',
      color: selected ? 'var(--coop-black)' : c,
      transition: 'background var(--dur-fast) linear, color var(--dur-fast) linear, transform var(--dur-fast) var(--ease-pop)',
      transform: selected ? 'scale(1.03)' : 'none',
      ...style
    }
  }), text);
}
Object.assign(__ds_scope, { SAUCES, SauceChip });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/menu/SauceChip.jsx", error: String((e && e.message) || e) }); }

// components/navigation/NavBar.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function NavBar({
  links = [],
  active,
  onNavigate,
  cta,
  assetBase = '',
  tone = 'red',
  style,
  ...rest
}) {
  const dark = tone !== 'white';
  return /*#__PURE__*/React.createElement("header", _extends({}, rest, {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 'var(--space-5)',
      padding: 'var(--space-3) var(--gutter-page)',
      background: tone === 'red' ? 'var(--coop-red)' : tone === 'black' ? 'var(--coop-black)' : 'var(--coop-white)',
      borderBottom: 'var(--stroke-3) solid var(--coop-black)',
      ...style
    }
  }), /*#__PURE__*/React.createElement("a", {
    href: "#",
    onClick: e => {
      e.preventDefault();
      onNavigate && onNavigate(links[0] && (links[0].value || links[0]));
    },
    style: {
      display: 'flex',
      alignItems: 'center',
      textDecoration: 'none'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Logo, {
    variant: dark ? 'knockout' : 'primary',
    width: 110,
    assetBase: assetBase
  })), /*#__PURE__*/React.createElement("nav", {
    style: {
      display: 'flex',
      gap: 'var(--space-5)',
      alignItems: 'center',
      flexWrap: 'wrap'
    }
  }, links.map(l => {
    const id = typeof l === 'string' ? l : l.value;
    const label = typeof l === 'string' ? l : l.label;
    const on = id === active;
    return /*#__PURE__*/React.createElement("a", {
      key: id,
      href: "#",
      onClick: e => {
        e.preventDefault();
        onNavigate && onNavigate(id);
      },
      style: {
        fontFamily: 'var(--font-poster)',
        fontSize: 'var(--text-sm)',
        letterSpacing: 'var(--tracking-caps)',
        textTransform: 'uppercase',
        textDecoration: 'none',
        color: dark ? 'var(--coop-white)' : 'var(--coop-black)',
        borderBottom: on ? '4px solid ' + (dark ? 'var(--coop-white)' : 'var(--coop-red)') : '4px solid transparent',
        paddingBottom: 2
      }
    }, label);
  }), cta));
}
Object.assign(__ds_scope, { NavBar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/NavBar.jsx", error: String((e && e.message) || e) }); }

// components/navigation/Tabs.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Tabs({
  items = [],
  value,
  onChange,
  tone = 'paper',
  style,
  ...rest
}) {
  const dark = tone === 'board';
  return /*#__PURE__*/React.createElement("div", _extends({}, rest, {
    role: "tablist",
    style: {
      display: 'flex',
      gap: 'var(--space-2)',
      flexWrap: 'wrap',
      ...style
    }
  }), items.map(it => {
    const id = typeof it === 'string' ? it : it.value;
    const label = typeof it === 'string' ? it : it.label;
    const active = id === value;
    return /*#__PURE__*/React.createElement("button", {
      key: id,
      role: "tab",
      "aria-selected": active,
      type: "button",
      onClick: () => onChange && onChange(id),
      style: {
        fontFamily: 'var(--font-poster)',
        fontSize: 'var(--text-xs)',
        letterSpacing: 'var(--tracking-caps)',
        textTransform: 'uppercase',
        lineHeight: 1,
        padding: '11px 18px',
        borderRadius: 'var(--radius-pill)',
        cursor: 'pointer',
        border: 'var(--stroke-2) solid ' + (dark ? 'var(--coop-white)' : 'var(--coop-black)'),
        background: active ? 'var(--coop-red)' : dark ? 'transparent' : 'var(--coop-white)',
        color: active ? 'var(--coop-white)' : dark ? 'var(--coop-white)' : 'var(--coop-black)',
        transition: 'background var(--dur-fast) linear, color var(--dur-fast) linear'
      }
    }, label);
  }));
}
Object.assign(__ds_scope, { Tabs });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/Tabs.jsx", error: String((e && e.message) || e) }); }

// ui_kits/menu_board/MenuBoard.jsx
try { (() => {
const {
  MenuSection,
  MenuItem,
  SauceChip,
  SAUCES,
  DashRule,
  Logo
} = window.TheCoopDesignSystem_a9fb85;
const ENTREES = [['The Breakfast Sandwich', 8, 'egg, american cheese, bacon, hashbrown, and a touch of comeback sauce on a toasted challah bun', 0], ['The Nuggies', 8, 'eight bite-sized pieces of boneless chicken breast, freshly-battered, fried and tossed in your sauce of choice', 0], ['The Original', 12, 'fried chicken sandwich with coleslaw, pickles, and comeback sauce', 0], ['The Classic', 13, 'fried chicken sandwich with lettuce, tomato, pickles, and mayo', 0], ["The Cluckin'", 13, 'fried chicken sandwich with bacon, muenster cheese, and thousand island dressing', 0], ['The Buf-Mac-Wich', 13, 'fried chicken sandwich with buffalo sauce, mac & cheese, pickles, and comeback sauce', 1], ['The Hot Honey', 14, 'fried chicken sandwich with bacon, pepperjack cheese, hot honey, pickles and comeback sauce', 1], ['The Nashville', 14, 'fried chicken sandwich with nashville hot seasoning, bacon, coleslaw, pickles, and comeback sauce', 2]];
const SIDES = [['Clucked Fries', 15], ['Loaded Fries', 10], ['Cheese Fries', 7], ['Waffle Fries', 5], ['Fried Mac Bites', 7], ['Mac N Cheese', 5], ['Hashbrown', 2], ['Coleslaw', 4]];
function ComebackSauce() {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: 210,
      height: 240,
      border: '3px solid var(--coop-black)',
      borderRadius: '50% 50% 48% 52% / 52% 48% 50% 50%',
      display: 'grid',
      placeItems: 'center',
      textAlign: 'center',
      padding: 16,
      marginTop: 8
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-poster)',
      fontSize: 15,
      color: 'var(--coop-red)',
      lineHeight: 1.1,
      textTransform: 'uppercase'
    }
  }, "Comeback", /*#__PURE__*/React.createElement("br", null), "Sauce"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-body)',
      fontWeight: 700,
      fontSize: 14,
      lineHeight: 1.5,
      marginTop: 8
    }
  }, "worcestershire", /*#__PURE__*/React.createElement("br", null), "mayonnaise", /*#__PURE__*/React.createElement("br", null), "ketchup", /*#__PURE__*/React.createElement("br", null), "hot sauce", /*#__PURE__*/React.createElement("br", null), "black pepper", /*#__PURE__*/React.createElement("br", null), "garlic")));
}
function MenuBoard({
  assetBase = '../../'
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1.15fr 1fr',
      gap: 'var(--space-8)',
      padding: 'var(--space-7)',
      background: 'var(--coop-white)'
    }
  }, /*#__PURE__*/React.createElement(MenuSection, {
    title: "Entrees"
  }, ENTREES.map(([n, p, d, h]) => /*#__PURE__*/React.createElement(MenuItem, {
    key: n,
    name: n,
    price: p,
    description: d,
    heat: h
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gap: 'var(--space-5)',
      alignContent: 'start'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      justifyItems: 'center',
      gap: 6
    }
  }, /*#__PURE__*/React.createElement(Logo, {
    width: 340,
    assetBase: assetBase
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-body)',
      fontWeight: 700,
      fontSize: 18
    }
  }, "@thecoopeats"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 15,
      color: 'var(--text-muted)'
    }
  }, "www.thecoopeats.com")), /*#__PURE__*/React.createElement(DashRule, null), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-poster)',
      fontSize: 40,
      textTransform: 'uppercase',
      lineHeight: 1
    }
  }, "Dipped"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-body)',
      fontWeight: 700,
      fontSize: 14,
      color: 'var(--coop-red)',
      margin: '8px 0 12px',
      lineHeight: 1.3
    }
  }, "get any chicken item dipped in one of our truckmade delicious sauces"), /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--coop-black)',
      borderRadius: 'var(--radius-lg)',
      padding: '12px',
      display: 'flex',
      gap: 8,
      flexWrap: 'wrap',
      justifyContent: 'center'
    }
  }, SAUCES.map(s => /*#__PURE__*/React.createElement(SauceChip, {
    key: s.id,
    sauce: s.id,
    style: {
      border: 'none',
      background: 'transparent',
      padding: '2px 4px',
      fontSize: 18
    }
  })))), /*#__PURE__*/React.createElement(DashRule, null), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 'var(--space-6)'
    }
  }, /*#__PURE__*/React.createElement(MenuSection, {
    title: "Sides"
  }, SIDES.map(([n, p]) => /*#__PURE__*/React.createElement(MenuItem, {
    key: n,
    name: n,
    price: p,
    compact: true
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      justifyItems: 'center'
    }
  }, /*#__PURE__*/React.createElement(ComebackSauce, null)))));
}
Object.assign(window, {
  MenuBoard,
  ENTREES,
  SIDES
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/menu_board/MenuBoard.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/App.jsx
try { (() => {
const {
  NavBar,
  Button
} = window.TheCoopDesignSystem_a9fb85;
function App() {
  const [route, setRoute] = React.useState('home');
  const order = () => window.open(ORDER_URL, '_blank', 'noopener');
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(NavBar, {
    tone: "red",
    assetBase: "../../",
    active: route,
    links: [{
      value: 'home',
      label: 'Home'
    }, {
      value: 'menu',
      label: 'Menu'
    }, {
      value: 'find',
      label: 'Find us'
    }, {
      value: 'catering',
      label: 'Catering'
    }],
    onNavigate: setRoute,
    cta: /*#__PURE__*/React.createElement(Button, {
      as: "a",
      href: ORDER_URL,
      target: "_blank",
      rel: "noopener",
      variant: "dark",
      size: "sm"
    }, "ORDER ONLINE \u2197")
  }), route === 'home' && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Hero, {
    onOrder: order,
    onMenu: () => setRoute('menu')
  }), /*#__PURE__*/React.createElement(CateringBanner, {
    onCatering: () => setRoute('catering')
  }), /*#__PURE__*/React.createElement(Favorites, {
    items: [{
      name: 'The Buf-Mac-Wich',
      price: 13,
      photo: 'assets/food-buf-mac-wich.jpg',
      description: 'fried chicken sandwich with buffalo sauce, mac & cheese, pickles, and comeback sauce'
    }, {
      name: 'The Nuggies',
      price: 8,
      photo: 'assets/food-nuggies.jpg',
      description: 'eight bite-sized pieces of boneless chicken breast, freshly-battered, fried and tossed in your sauce of choice'
    }, {
      name: "The Cluckin'",
      price: 13,
      photo: 'assets/food-cluckin.jpg',
      description: 'fried chicken sandwich with bacon, muenster cheese, and thousand island dressing'
    }]
  }), /*#__PURE__*/React.createElement(Gallery, null), /*#__PURE__*/React.createElement(MascotBanner, null), /*#__PURE__*/React.createElement(Footer, null)), route === 'menu' && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(MenuScreen, null), /*#__PURE__*/React.createElement(Footer, null)), route === 'find' && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(FindUs, null), /*#__PURE__*/React.createElement(Footer, null)), route === 'catering' && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Catering, null), /*#__PURE__*/React.createElement(Footer, null)));
}
ReactDOM.createRoot(document.getElementById('root')).render(/*#__PURE__*/React.createElement(App, null));
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/App.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Catering.jsx
try { (() => {
const {
  Card,
  Button,
  Badge,
  Checkbox,
  Radio,
  Select,
  Input,
  DashRule,
  PriceTag,
  HeatMeter
} = window.TheCoopDesignSystem_a9fb85;
const ENTREE_OPTIONS = [{
  id: 'original',
  name: 'The Original',
  per: 12
}, {
  id: 'classic',
  name: 'The Classic',
  per: 13
}, {
  id: 'cluckin',
  name: "The Cluckin'",
  per: 13
}, {
  id: 'bufmac',
  name: 'The Buf-Mac-Wich',
  per: 13,
  heat: 1
}, {
  id: 'hothoney',
  name: 'The Hot Honey',
  per: 14,
  heat: 1
}, {
  id: 'nashville',
  name: 'The Nashville',
  per: 14,
  heat: 2
}, {
  id: 'nuggies',
  name: 'The Nuggies',
  per: 8
}, {
  id: 'breakfast',
  name: 'The Breakfast Sandwich',
  per: 8
}];
const SIDE_OPTIONS = [{
  id: 'waffle',
  name: 'Waffle Fries',
  per: 5
}, {
  id: 'cheese',
  name: 'Cheese Fries',
  per: 7
}, {
  id: 'loaded',
  name: 'Loaded Fries',
  per: 10
}, {
  id: 'clucked',
  name: 'Clucked Fries',
  per: 15
}, {
  id: 'macbites',
  name: 'Fried Mac Bites',
  per: 7
}, {
  id: 'mac',
  name: 'Mac N Cheese',
  per: 5
}, {
  id: 'slaw',
  name: 'Coleslaw',
  per: 4
}, {
  id: 'hashbrown',
  name: 'Hashbrown',
  per: 2
}];
const ZONES = [{
  id: 'local',
  label: 'Within 15 miles of the truck',
  fee: 0
}, {
  id: 'near',
  label: '15–40 miles',
  fee: 85
}, {
  id: 'far',
  label: '40–75 miles',
  fee: 175
}, {
  id: 'road',
  label: 'Over 75 miles',
  fee: 275
}];
const SIDE_PORTION = 0.6; // not every guest takes every side
const STAFF_PER_HOUR = 175; // truck + two on the line
const MIN_SPEND = 850;
const DEPOSIT = 0.25;
const money = n => '$' + n.toLocaleString('en-US', {
  minimumFractionDigits: 0,
  maximumFractionDigits: 0
});
function Slider({
  label,
  value,
  min,
  max,
  step,
  onChange,
  suffix
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'baseline'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      ...window.POSTER,
      fontSize: 'var(--text-2xs)',
      letterSpacing: 'var(--tracking-caps)'
    }
  }, label), /*#__PURE__*/React.createElement("span", {
    style: {
      ...window.POSTER,
      fontSize: 'var(--text-lg)',
      color: 'var(--coop-red)'
    }
  }, value, suffix)), /*#__PURE__*/React.createElement("input", {
    type: "range",
    min: min,
    max: max,
    step: step,
    value: value,
    onChange: e => onChange(Number(e.target.value)),
    style: {
      width: '100%',
      accentColor: 'var(--coop-red)',
      height: 6
    }
  }));
}
function PickList({
  options,
  picked,
  onToggle,
  columns = 2
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: `repeat(${columns},minmax(0,1fr))`,
      gap: 'var(--space-3)'
    }
  }, options.map(o => /*#__PURE__*/React.createElement("div", {
    key: o.id,
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      gap: 8,
      padding: '10px 12px',
      borderRadius: 'var(--radius-md)',
      border: '2px solid ' + (picked.includes(o.id) ? 'var(--coop-red)' : 'var(--border-soft)'),
      background: picked.includes(o.id) ? 'rgba(200,37,43,.06)' : 'transparent'
    }
  }, /*#__PURE__*/React.createElement(Checkbox, {
    label: o.name,
    checked: picked.includes(o.id),
    onChange: () => onToggle(o.id)
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 6
    }
  }, o.heat ? /*#__PURE__*/React.createElement(HeatMeter, {
    level: o.heat,
    size: 14
  }) : null, /*#__PURE__*/React.createElement(PriceTag, {
    value: o.per,
    size: "sm"
  })))));
}
function Line({
  label,
  note,
  amount,
  strong
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'baseline',
      gap: 12,
      padding: '8px 0'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      ...window.POSTER,
      fontSize: strong ? 'var(--text-md)' : 'var(--text-xs)'
    }
  }, label), note && /*#__PURE__*/React.createElement("div", {
    style: {
      ...window.BODY,
      fontSize: 'var(--text-2xs)',
      color: 'var(--text-muted)'
    }
  }, note)), /*#__PURE__*/React.createElement(PriceTag, {
    value: amount.toLocaleString('en-US'),
    size: strong ? 'md' : 'sm',
    tone: strong ? 'red' : 'ink'
  }));
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
  const entreePer = chosenEntrees.length ? chosenEntrees.reduce((t, o) => t + o.per, 0) / chosenEntrees.length : 0;
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
  return /*#__PURE__*/React.createElement("section", {
    style: {
      maxWidth: 'var(--max-content)',
      margin: '0 auto',
      padding: 'var(--space-7) var(--gutter-page)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: '52ch',
      marginBottom: 'var(--space-6)'
    }
  }, /*#__PURE__*/React.createElement(Badge, {
    tone: "red"
  }, "Catering"), /*#__PURE__*/React.createElement("h1", {
    style: {
      ...window.POSTER,
      fontSize: 'var(--text-3xl)',
      margin: '12px 0 8px'
    }
  }, "Bring the truck to you"), /*#__PURE__*/React.createElement("p", {
    style: {
      ...window.BODY,
      fontSize: 'var(--text-md)',
      color: 'var(--text-muted)',
      margin: 0
    }
  }, "Build your spread below and we'll price it out on the spot. Office lunches, weddings, block parties \u2014 we cook on site, same as we do on the street.")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'minmax(0,1.4fr) minmax(320px,1fr)',
      gap: 'var(--space-7)',
      alignItems: 'start'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gap: 'var(--space-6)'
    }
  }, /*#__PURE__*/React.createElement(Card, {
    sticker: true
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      ...window.POSTER,
      fontSize: 'var(--text-lg)',
      margin: '0 0 4px'
    }
  }, "1 \xB7 The party"), /*#__PURE__*/React.createElement("p", {
    style: {
      ...window.BODY,
      fontSize: 'var(--text-2xs)',
      color: 'var(--text-muted)',
      margin: '0 0 var(--space-5)'
    }
  }, "Two hours of service is our minimum \u2014 that's about 120 sandwiches off the line."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gap: 'var(--space-5)'
    }
  }, /*#__PURE__*/React.createElement(Slider, {
    label: "Guests",
    value: guests,
    min: 20,
    max: 400,
    step: 5,
    onChange: setGuests
  }), /*#__PURE__*/React.createElement(Slider, {
    label: "Hours of service",
    value: hours,
    min: 2,
    max: 6,
    step: 1,
    onChange: setHours,
    suffix: " hrs"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      ...window.POSTER,
      fontSize: 'var(--text-2xs)',
      letterSpacing: 'var(--tracking-caps)'
    }
  }, "Where are we parking?"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gap: 10
    }
  }, ZONES.map(z => /*#__PURE__*/React.createElement(Radio, {
    key: z.id,
    name: "zone",
    value: z.id,
    checked: zone === z.id,
    onChange: setZone,
    label: z.label + (z.fee ? ` — +${money(z.fee)} travel` : ' — no travel fee')
  })))))), /*#__PURE__*/React.createElement(Card, {
    sticker: true
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      ...window.POSTER,
      fontSize: 'var(--text-lg)',
      margin: '0 0 4px'
    }
  }, "2 \xB7 The sandwiches"), /*#__PURE__*/React.createElement("p", {
    style: {
      ...window.BODY,
      fontSize: 'var(--text-2xs)',
      color: 'var(--text-muted)',
      margin: '0 0 var(--space-4)'
    }
  }, "Pick everything you want on the board. Every guest gets one, their choice."), /*#__PURE__*/React.createElement(PickList, {
    options: ENTREE_OPTIONS,
    picked: entrees,
    onToggle: toggle(entrees, setEntrees)
  })), /*#__PURE__*/React.createElement(Card, {
    sticker: true
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      ...window.POSTER,
      fontSize: 'var(--text-lg)',
      margin: '0 0 4px'
    }
  }, "3 \xB7 The sides"), /*#__PURE__*/React.createElement("p", {
    style: {
      ...window.BODY,
      fontSize: 'var(--text-2xs)',
      color: 'var(--text-muted)',
      margin: '0 0 var(--space-4)'
    }
  }, "Priced at ", Math.round(SIDE_PORTION * 100), "% of headcount \u2014 nobody eats all of them."), /*#__PURE__*/React.createElement(PickList, {
    options: SIDE_OPTIONS,
    picked: sides,
    onToggle: toggle(sides, setSides)
  }))), /*#__PURE__*/React.createElement(Card, {
    tone: "board",
    sticker: true,
    padding: "var(--space-4)",
    style: {
      position: 'sticky',
      top: 'var(--space-5)',
      maxHeight: 'calc(100vh - 48px)',
      overflowY: 'auto'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      ...window.POSTER,
      fontSize: 'var(--text-xl)',
      color: '#fff'
    }
  }, "Your estimate"), /*#__PURE__*/React.createElement("div", {
    style: {
      ...window.BODY,
      fontSize: 'var(--text-2xs)',
      color: 'rgba(255,255,255,.7)',
      marginBottom: 'var(--space-4)'
    }
  }, guests, " guests \xB7 ", hours, " hrs \xB7 ", zoneMeta.label.toLowerCase()), noMenu ? /*#__PURE__*/React.createElement("p", {
    style: {
      ...window.BODY,
      fontSize: 'var(--text-sm)',
      color: 'rgba(255,255,255,.8)'
    }
  }, "Pick at least one sandwich and we'll do the math.") : /*#__PURE__*/React.createElement("div", {
    style: {
      color: '#fff'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      borderTop: '2px solid rgba(255,255,255,.25)',
      borderBottom: '2px solid rgba(255,255,255,.25)',
      padding: '4px 0'
    }
  }, /*#__PURE__*/React.createElement(Line, {
    label: "Food",
    note: `${money(Math.round(entreePer + sidePer))} per guest × ${guests}`,
    amount: food
  }), /*#__PURE__*/React.createElement(Line, {
    label: "On-site cooking",
    note: `${money(STAFF_PER_HOUR)}/hr × ${hours} hrs`,
    amount: staffing
  }), /*#__PURE__*/React.createElement(Line, {
    label: "Travel",
    note: zoneMeta.label,
    amount: travel
  })), belowMin && /*#__PURE__*/React.createElement("div", {
    style: {
      ...window.BODY,
      fontSize: 'var(--text-2xs)',
      color: 'var(--sauce-spicy-maple)',
      padding: '10px 0'
    }
  }, "Rounded up to our ", money(MIN_SPEND), " event minimum."), /*#__PURE__*/React.createElement("div", {
    style: {
      paddingTop: 8
    }
  }, /*#__PURE__*/React.createElement(Line, {
    label: "Estimated total",
    amount: total,
    strong: true
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      ...window.BODY,
      fontSize: 'var(--text-2xs)',
      color: 'rgba(255,255,255,.7)',
      marginBottom: 'var(--space-5)'
    }
  }, "About ", money(Math.round(perHead)), " a head \xB7 ", money(deposit), " deposit holds the date")), sent ? /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--coop-red)',
      border: '3px solid var(--coop-white)',
      borderRadius: 'var(--radius-lg)',
      padding: 'var(--space-4)',
      color: '#fff'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      ...window.POSTER,
      fontSize: 'var(--text-lg)'
    }
  }, "Quote's on its way"), /*#__PURE__*/React.createElement("p", {
    style: {
      ...window.BODY,
      fontSize: 'var(--text-2xs)',
      margin: '6px 0 12px'
    }
  }, "We sent the ", money(total), " estimate to ", /*#__PURE__*/React.createElement("strong", null, email), when ? ` for ${when}` : '', ". A real person comes back within a day."), /*#__PURE__*/React.createElement(Button, {
    variant: "light",
    size: "sm",
    onClick: () => setSent(false)
  }, "TWEAK THE NUMBERS")) : /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gap: 'var(--space-3)'
    }
  }, /*#__PURE__*/React.createElement(Input, {
    label: "Email us the estimate",
    placeholder: "you@company.com",
    type: "email",
    value: email,
    onChange: e => setEmail(e.target.value)
  }), /*#__PURE__*/React.createElement(Input, {
    label: "Event date",
    placeholder: "Sat, Nov 8",
    value: when,
    onChange: e => setWhen(e.target.value)
  }), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    block: true,
    disabled: noMenu || !email.includes('@'),
    onClick: () => setSent(true)
  }, "SEND ME THIS QUOTE"), /*#__PURE__*/React.createElement("p", {
    style: {
      ...window.BODY,
      fontSize: 'var(--text-3xs)',
      color: 'rgba(255,255,255,.6)',
      margin: 0
    }
  }, "Estimate only \u2014 final quote comes back from us within a day. Tax and gratuity not included.")))));
}
Object.assign(window, {
  Catering
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Catering.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/FindUs.jsx
try { (() => {
const {
  Card,
  Button,
  Tabs
} = window.TheCoopDesignSystem_a9fb85;

// The Coop's real public Google Calendar.
const CAL_ID = '0r49o8cj65ab5l9lj063idkjf8%40group.calendar.google.com';
const CAL_SUBSCRIBE = 'https://calendar.google.com/calendar/u/0?cid=MHI0OW84Y2o2NWFiNWw5bGowNjNpZGtqZjhAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ';
const embedUrl = mode => 'https://calendar.google.com/calendar/embed?src=' + CAL_ID + '&mode=' + mode + '&showTitle=0&showPrint=0&showTabs=0&showCalendars=0&showTz=0' + '&ctz=America%2FNew_York&bgcolor=%23FFFFFF&color=%23C8252B';
function FindUs() {
  const [mode, setMode] = React.useState('AGENDA');
  return /*#__PURE__*/React.createElement("section", {
    style: {
      maxWidth: 'var(--max-content)',
      margin: '0 auto',
      padding: 'var(--space-7) var(--gutter-page)'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: window.AB + 'assets/photo-truck.jpg',
    alt: "The Coop truck",
    style: {
      width: '100%',
      height: 280,
      objectFit: 'cover',
      display: 'block',
      border: '3px solid var(--coop-black)',
      borderRadius: 'var(--radius-lg)',
      marginBottom: 'var(--space-6)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-end',
      gap: 'var(--space-4)',
      flexWrap: 'wrap',
      marginBottom: 'var(--space-5)'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h1", {
    style: {
      ...window.POSTER,
      fontSize: 'var(--text-3xl)',
      margin: '0 0 6px'
    }
  }, "Find the truck"), /*#__PURE__*/React.createElement("p", {
    style: {
      ...window.BODY,
      fontSize: 'var(--text-sm)',
      color: 'var(--text-muted)',
      margin: 0,
      maxWidth: '52ch'
    }
  }, "Every stop we've got booked, straight off our calendar. Subscribe and it updates itself on your phone.")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 'var(--space-3)',
      alignItems: 'center',
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement(Tabs, {
    items: [{
      value: 'AGENDA',
      label: 'List'
    }, {
      value: 'MONTH',
      label: 'Month'
    }],
    value: mode,
    onChange: setMode
  }), /*#__PURE__*/React.createElement(Button, {
    as: "a",
    href: CAL_SUBSCRIBE,
    target: "_blank",
    rel: "noopener",
    variant: "primary",
    iconRight: /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: '.8em'
      }
    }, "\u2197")
  }, "ADD TO YOUR CALENDAR"))), /*#__PURE__*/React.createElement(Card, {
    sticker: true,
    padding: "0",
    style: {
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("iframe", {
    key: mode,
    title: "The Coop schedule",
    src: embedUrl(mode),
    style: {
      width: '100%',
      height: mode === 'MONTH' ? 700 : 620,
      border: 'none',
      display: 'block'
    }
  })), /*#__PURE__*/React.createElement("p", {
    style: {
      ...window.BODY,
      fontSize: 'var(--text-2xs)',
      color: 'var(--text-muted)',
      marginTop: 'var(--space-4)'
    }
  }, "Weather and breakdowns happen. We post changes on @thecoopeats first."));
}
Object.assign(window, {
  FindUs,
  CAL_SUBSCRIBE,
  CAL_ID
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/FindUs.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/MenuScreen.jsx
try { (() => {
const {
  MenuSection,
  MenuItem,
  Tabs,
  Button
} = window.TheCoopDesignSystem_a9fb85;
const ORDER_URL = 'https://order.tbdine.com/pickup/30439/menu';
const MENU = {
  entrees: [['The Breakfast Sandwich', 8, 'egg, american cheese, bacon, hashbrown, and a touch of comeback sauce on a toasted challah bun', 0], ['The Nuggies', 8, 'eight bite-sized pieces of boneless chicken breast, freshly-battered, fried and tossed in your sauce of choice', 0], ['The Original', 12, 'fried chicken sandwich with coleslaw, pickles, and comeback sauce', 0], ['The Classic', 13, 'fried chicken sandwich with lettuce, tomato, pickles, and mayo', 0], ["The Cluckin'", 13, 'fried chicken sandwich with bacon, muenster cheese, and thousand island dressing', 0], ['The Buf-Mac-Wich', 13, 'fried chicken sandwich with buffalo sauce, mac & cheese, pickles, and comeback sauce', 1], ['The Hot Honey', 14, 'fried chicken sandwich with bacon, pepperjack cheese, hot honey, pickles and comeback sauce', 1], ['The Nashville', 14, 'fried chicken sandwich with nashville hot seasoning, bacon, coleslaw, pickles, and comeback sauce', 2]],
  sides: [['Clucked Fries', 15], ['Loaded Fries', 10], ['Cheese Fries', 7], ['Waffle Fries', 5], ['Fried Mac Bites', 7], ['Mac N Cheese', 5], ['Hashbrown', 2], ['Coleslaw', 4]]
};
function MenuScreen() {
  const [tab, setTab] = React.useState('entrees');
  return /*#__PURE__*/React.createElement("section", {
    style: {
      maxWidth: 'var(--max-content)',
      margin: '0 auto',
      padding: 'var(--space-7) var(--gutter-page)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      gap: 16,
      flexWrap: 'wrap',
      marginBottom: 'var(--space-5)'
    }
  }, /*#__PURE__*/React.createElement("h1", {
    style: {
      ...window.POSTER,
      fontSize: 'var(--text-3xl)',
      margin: 0
    }
  }, "The menu"), /*#__PURE__*/React.createElement(Tabs, {
    items: [{
      value: 'entrees',
      label: 'Entrees'
    }, {
      value: 'sides',
      label: 'Sides'
    }],
    value: tab,
    onChange: setTab
  })), tab === 'entrees' && /*#__PURE__*/React.createElement(MenuSection, {
    title: "Entrees"
  }, MENU.entrees.map(([n, p, d, h]) => /*#__PURE__*/React.createElement(MenuItem, {
    key: n,
    name: n,
    price: p,
    description: d,
    heat: h
  }))), tab === 'sides' && /*#__PURE__*/React.createElement(MenuSection, {
    title: "Sides",
    columns: 2
  }, MENU.sides.map(([n, p]) => /*#__PURE__*/React.createElement(MenuItem, {
    key: n,
    name: n,
    price: p
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 'var(--space-7)',
      display: 'flex',
      gap: 'var(--space-4)',
      alignItems: 'center',
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement(Button, {
    as: "a",
    href: ORDER_URL,
    target: "_blank",
    rel: "noopener",
    variant: "primary",
    size: "lg",
    iconRight: /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: '.8em'
      }
    }, "\u2197")
  }, "ORDER ONLINE"), /*#__PURE__*/React.createElement("span", {
    style: {
      ...window.BODY,
      fontSize: 'var(--text-xs)',
      color: 'var(--text-muted)'
    }
  }, "Pickup ordering is handled on TouchBistro \u2014 you'll leave this site.")));
}
Object.assign(window, {
  MenuScreen,
  MENU,
  ORDER_URL
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/MenuScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Screens.jsx
try { (() => {
const {
  NavBar,
  Button,
  Card,
  Badge,
  Logo,
  MenuSection,
  MenuItem,
  SauceChip,
  SAUCES,
  DashRule,
  Tabs,
  Input,
  Select,
  Checkbox,
  Radio,
  Switch,
  Stepper,
  Toast,
  Dialog,
  PriceTag,
  IconButton
} = window.TheCoopDesignSystem_a9fb85;
const AB = '../../';
const ORDER = 'https://order.tbdine.com/pickup/30439/menu';
const MERCH = 'https://the-coop-8.creator-spring.com/';
const EXT = /*#__PURE__*/React.createElement("span", {
  style: {
    fontSize: '.8em'
  }
}, "\u2197");
const POSTER = {
  fontFamily: 'var(--font-poster)',
  textTransform: 'uppercase',
  letterSpacing: 'var(--tracking-poster)',
  lineHeight: 1
};
const BODY = {
  fontFamily: 'var(--font-body)',
  fontWeight: 500,
  lineHeight: 'var(--leading-body)'
};
function Hero({
  onOrder,
  onMenu
}) {
  return /*#__PURE__*/React.createElement("section", {
    style: {
      position: 'relative',
      borderBottom: '5px solid var(--coop-black)'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: AB + 'assets/food-nashville.jpg',
    alt: "The Nashville sandwich",
    style: {
      width: '100%',
      height: 460,
      objectFit: 'cover',
      objectPosition: 'center 62%',
      display: 'block'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      background: 'linear-gradient(90deg,rgba(10,10,10,.78) 0%,rgba(10,10,10,.45) 55%,transparent 100%)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      display: 'grid',
      alignContent: 'center',
      gap: 'var(--space-4)',
      padding: '0 var(--gutter-page)',
      maxWidth: 'var(--max-content)'
    }
  }, /*#__PURE__*/React.createElement(Badge, {
    tone: "red"
  }, "Truck is open \xB7 11\u20138"), /*#__PURE__*/React.createElement("h1", {
    style: {
      ...POSTER,
      fontSize: 'var(--text-4xl)',
      color: '#fff',
      margin: 0,
      maxWidth: '16ch'
    }
  }, "Fried chicken worth chasing down the block"), /*#__PURE__*/React.createElement("p", {
    style: {
      ...BODY,
      fontSize: 'var(--text-md)',
      color: '#fff',
      margin: 0,
      maxWidth: '46ch'
    }
  }, "Hand-battered sandwiches and nuggies, dipped in six truckmade sauces. We're playful about everything except the chicken."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 'var(--space-3)',
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement(Button, {
    as: "a",
    href: ORDER,
    target: "_blank",
    rel: "noopener",
    variant: "primary",
    size: "lg",
    iconRight: EXT
  }, "ORDER ONLINE"), /*#__PURE__*/React.createElement(Button, {
    variant: "light",
    size: "lg",
    onClick: onMenu
  }, "SEE THE MENU"))));
}
function CateringBanner({
  onCatering
}) {
  return /*#__PURE__*/React.createElement("section", {
    style: {
      background: 'var(--coop-black)',
      borderTop: '5px solid var(--coop-black)',
      borderBottom: '5px solid var(--coop-black)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--max-content)',
      margin: '0 auto',
      display: 'grid',
      gridTemplateColumns: 'minmax(0,1.05fr) minmax(0,1fr)',
      alignItems: 'stretch'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 'var(--space-7) var(--gutter-page)',
      display: 'grid',
      alignContent: 'center',
      gap: 'var(--space-4)'
    }
  }, /*#__PURE__*/React.createElement(Badge, {
    tone: "red"
  }, "Now booking 2026 dates"), /*#__PURE__*/React.createElement("h2", {
    style: {
      ...POSTER,
      fontSize: 'var(--text-3xl)',
      color: '#fff',
      margin: 0,
      maxWidth: '14ch'
    }
  }, "Park the truck at your party"), /*#__PURE__*/React.createElement("p", {
    style: {
      ...BODY,
      fontSize: 'var(--text-md)',
      color: '#fff',
      margin: 0,
      maxWidth: '40ch'
    }
  }, "Weddings, office lunches, birthdays, block parties. Pick your headcount and get a price in about ten seconds."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 'var(--space-3)',
      flexWrap: 'wrap',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    size: "lg",
    onClick: onCatering
  }, "GET AN ESTIMATE"), /*#__PURE__*/React.createElement("span", {
    style: {
      ...POSTER,
      fontSize: 'var(--text-xs)',
      color: 'var(--coop-red-bright)'
    }
  }, "$850 event minimum"))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      minHeight: 320,
      borderLeft: '5px solid var(--coop-red)'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: AB + 'assets/photo-truck.jpg',
    alt: "The Coop truck parked at an event",
    style: {
      position: 'absolute',
      inset: 0,
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      display: 'block'
    }
  }))));
}
function Favorites({
  items
}) {
  return /*#__PURE__*/React.createElement("section", {
    style: {
      maxWidth: 'var(--max-content)',
      margin: '0 auto',
      padding: 'var(--gutter-section) var(--gutter-page)'
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      ...POSTER,
      fontSize: 'var(--text-2xl)',
      color: 'var(--coop-red)',
      margin: '0 0 var(--space-5)'
    }
  }, "Crowd favorites"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3,minmax(0,1fr))',
      gap: 'var(--space-5)'
    }
  }, items.map(it => /*#__PURE__*/React.createElement(Card, {
    key: it.name,
    sticker: true,
    hoverLift: true,
    padding: "0",
    style: {
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: AB + it.photo,
    alt: it.name,
    style: {
      width: '100%',
      height: 200,
      objectFit: 'cover',
      display: 'block',
      borderBottom: '3px solid var(--coop-black)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 'var(--space-5)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      ...POSTER,
      fontSize: 'var(--text-lg)'
    }
  }, it.name), /*#__PURE__*/React.createElement(PriceTag, {
    value: it.price,
    size: "sm"
  })), /*#__PURE__*/React.createElement("p", {
    style: {
      ...BODY,
      fontSize: 'var(--text-xs)',
      color: 'var(--text-muted)',
      margin: '8px 0 16px'
    }
  }, it.description), /*#__PURE__*/React.createElement(Button, {
    as: "a",
    href: ORDER,
    target: "_blank",
    rel: "noopener",
    variant: "dark",
    size: "sm",
    iconRight: EXT
  }, "ORDER ONLINE"))))));
}
function Gallery() {
  const shots = [['assets/food-clucked-fries.jpg', 'Clucked Fries'], ['assets/food-cluckin.jpg', "The Cluckin'"], ['assets/food-buf-mac-wich.jpg', 'The Buf-Mac-Wich'], ['assets/food-nuggies.jpg', 'The Nuggies, honey bbq']];
  return /*#__PURE__*/React.createElement("section", {
    style: {
      borderTop: '5px solid var(--coop-black)',
      borderBottom: '5px solid var(--coop-black)',
      display: 'grid',
      gridTemplateColumns: 'repeat(4,1fr)'
    }
  }, shots.map(([src, alt], i) => /*#__PURE__*/React.createElement("div", {
    key: src,
    style: {
      position: 'relative',
      borderRight: i < 3 ? '3px solid var(--coop-black)' : 'none'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: AB + src,
    alt: alt,
    style: {
      width: '100%',
      height: 260,
      objectFit: 'cover',
      display: 'block'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 0,
      padding: '28px 14px 12px',
      background: 'linear-gradient(transparent,rgba(10,10,10,.85))',
      ...POSTER,
      fontSize: 'var(--text-xs)',
      color: '#fff'
    }
  }, alt))));
}
function MascotBanner() {
  return /*#__PURE__*/React.createElement("section", {
    style: {
      background: 'var(--coop-red)',
      borderTop: '5px solid var(--coop-black)',
      borderBottom: '5px solid var(--coop-black)',
      padding: 'var(--space-7) var(--gutter-page)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--max-content)',
      margin: '0 auto',
      display: 'flex',
      gap: 'var(--space-7)',
      alignItems: 'center',
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: AB + 'assets/nugs-not-drugs.png',
    alt: "Nugs not drugs",
    style: {
      height: 240
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 260
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      ...POSTER,
      fontSize: 'var(--text-3xl)',
      color: '#fff',
      margin: '0 0 var(--space-3)'
    }
  }, "Wear the nugget"), /*#__PURE__*/React.createElement("p", {
    style: {
      ...BODY,
      fontSize: 'var(--text-md)',
      color: '#fff',
      margin: '0 0 var(--space-5)',
      maxWidth: '44ch'
    }
  }, "Stickers, tees and the occasional bumper sticker. Wear it, slap it on a laptop, tell your friends where the truck is parked."), /*#__PURE__*/React.createElement(Button, {
    as: "a",
    href: MERCH,
    target: "_blank",
    rel: "noopener",
    variant: "dark",
    size: "md",
    iconRight: EXT
  }, "SHOP THE MERCH"))));
}
function Footer() {
  return /*#__PURE__*/React.createElement("footer", {
    style: {
      background: 'var(--coop-black)',
      color: '#fff',
      padding: 'var(--space-7) var(--gutter-page)',
      borderTop: '5px solid var(--coop-black)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--max-content)',
      margin: '0 auto',
      display: 'flex',
      justifyContent: 'space-between',
      gap: 'var(--space-6)',
      flexWrap: 'wrap',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement(Logo, {
    variant: "knockout",
    width: 140,
    assetBase: AB
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 'var(--space-5)',
      flexWrap: 'wrap',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: ORDER,
    target: "_blank",
    rel: "noopener",
    style: {
      ...POSTER,
      fontSize: 'var(--text-xs)',
      color: '#fff',
      textDecoration: 'none',
      borderBottom: '3px solid var(--coop-red-bright)'
    }
  }, "Order online \u2197"), /*#__PURE__*/React.createElement("a", {
    href: MERCH,
    target: "_blank",
    rel: "noopener",
    style: {
      ...POSTER,
      fontSize: 'var(--text-xs)',
      color: '#fff',
      textDecoration: 'none',
      borderBottom: '3px solid var(--coop-red-bright)'
    }
  }, "Merch \u2197"), /*#__PURE__*/React.createElement("span", {
    style: {
      ...BODY,
      fontSize: 'var(--text-xs)',
      opacity: .85
    }
  }, "@thecoopeats \xB7 www.thecoopeats.com")), /*#__PURE__*/React.createElement("div", {
    style: {
      ...POSTER,
      fontSize: 'var(--text-xs)',
      color: 'var(--coop-red-bright)'
    }
  }, "Nugs not drugs")));
}
Object.assign(window, {
  Hero,
  CateringBanner,
  Favorites,
  Gallery,
  MascotBanner,
  Footer,
  POSTER,
  BODY,
  AB,
  ORDER,
  MERCH,
  EXT
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Screens.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.IconButton = __ds_scope.IconButton;

__ds_ns.Logo = __ds_scope.Logo;

__ds_ns.Dialog = __ds_scope.Dialog;

__ds_ns.Toast = __ds_scope.Toast;

__ds_ns.Tooltip = __ds_scope.Tooltip;

__ds_ns.Checkbox = __ds_scope.Checkbox;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.Radio = __ds_scope.Radio;

__ds_ns.Select = __ds_scope.Select;

__ds_ns.Stepper = __ds_scope.Stepper;

__ds_ns.Switch = __ds_scope.Switch;

__ds_ns.DashRule = __ds_scope.DashRule;

__ds_ns.HeatMeter = __ds_scope.HeatMeter;

__ds_ns.MenuItem = __ds_scope.MenuItem;

__ds_ns.MenuSection = __ds_scope.MenuSection;

__ds_ns.PriceTag = __ds_scope.PriceTag;

__ds_ns.SAUCES = __ds_scope.SAUCES;

__ds_ns.SauceChip = __ds_scope.SauceChip;

__ds_ns.NavBar = __ds_scope.NavBar;

__ds_ns.Tabs = __ds_scope.Tabs;

})();
