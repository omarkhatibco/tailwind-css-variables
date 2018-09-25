module.exports = function CssVariabels() {
  return function tailwindCssVariabels({ addUtilities, addComponents, e, prefix, config }) {
    const modules = config('modules', []);
    let root = {};
    Object.keys(modules).forEach(key => {
      if (modules[key].includes('root')) {
        const keyValue = config(key, []);
        const names = Object.keys(keyValue);
        names.forEach(name => {
          root[`--${e(name)}`] = keyValue[name];
        });
      }
    });

    let css = {
      ':root': root
    };
    addComponents(css);
  };
};
