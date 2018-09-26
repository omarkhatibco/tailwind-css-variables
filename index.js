module.exports = function(customVariableName, opts) {
  return ({ addComponents, e, config }) => {
    const modules = config('modules', []);
    const { prefix } = config('options', []);
    const varModules = {
      colors: 'color',
      screens: '',
      fonts: 'font',
      textSizes: 'text',
      fontWeights: 'font',
      leading: 'leading',
      tracking: 'tracking',
      backgroundSize: 'bg',
      borderWidths: 'border',
      borderRadius: 'rounded',
      width: 'w',
      height: 'h',
      minWidth: 'min-w',
      minHeight: 'min-h',
      maxWidth: 'max-w',
      maxHeight: 'max-h',
      padding: 'p',
      margin: 'm',
      negativeMargin: 'nm',
      shadows: 'shadows',
      zIndex: 'z',
      opacity: 'opacity',
      ...customVariableName
    };
    const options = {
      postcssEachVariables: false,
      ...opts
    };
    let rootArray = {};
    Object.keys(varModules).forEach(key => {
      if ((key === 'colors' && varModules['colors']) || (key === 'screens' && varModules['screens'] !== false) || varModules[key]) {
        const keyValue = config(key, []);
        const names = Object.keys(keyValue);
        const modulePrefix = varModules[key];

        if (options.postcssEachVariables) {
          const selectedKey = ['colors', 'screens', 'fonts', 'textSizes'];
          if (selectedKey.includes(key)) {
            const varName = `-${prefix !== '' ? '-' + prefix : ''}${key !== '' ? '-' + key : ''}`;
            rootArray[varName] = names.toString();
          }
        }

        names.forEach(name => {
          const varName = `-${prefix !== '' ? '-' + prefix : ''}${modulePrefix !== '' ? '-' + modulePrefix : ''}${
            name !== 'default' ? '-' + name : ''
          }`;
          const value = typeof keyValue[name] === 'string' ? keyValue[name] : keyValue[name].toString();
          rootArray[varName] = value;
        });
      }
    });
    let root = {
      ':root': rootArray
    };
    addComponents(root);
  };
};
