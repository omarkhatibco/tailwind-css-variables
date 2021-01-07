module.exports = function(customVariableName, opts) {
  return ({ addComponents, config }) => {
    const varModules = {
      colors: 'color',
      screens: '',
      fontFamily: 'font',
      fontSize: 'text',
      fontWeight: 'font',
      lineHeight: 'leading',
      letterSpacing: 'tracking',
      backgroundSize: 'bg',
      borderWidth: 'border',
      borderRadius: 'rounded',
      width: 'w',
      height: 'h',
      minWidth: 'min-w',
      minHeight: 'min-h',
      maxWidth: 'max-w',
      maxHeight: 'max-h',
      padding: 'p',
      margin: 'm',
      boxShadow: 'shadows',
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
        const keyValue = config(`theme.${key}`, []);
        const names = Object.keys(keyValue);
        const modulePrefix = varModules[key];

        if (options.postcssEachVariables) {
          const selectedKey = ['colors', 'screens', 'fontFamily', 'fontSize'];
          if (selectedKey.includes(key)) {
            if (key=== 'colors') {
              const colorsArr = [];

              names.forEach(colorName=> {
               const colorObj = keyValue[colorName];
               if (isObject(colorObj)) {
                Object.keys(colorObj).forEach(level=>{
                  const fullColorName= `${colorName}-${level}`;
                  colorsArr.push(fullColorName);
                });
               } else {
                colorsArr.push(colorName);
               }
              })
              const varName = `--${key !== '' ? key : ''}`;
              rootArray[varName] = colorsArr.toString();
            } else {
              const varName = `--${key !== '' ? key : ''}`;
              rootArray[varName] = names.toString();
            }

          }
        }

        names.forEach(name => {
          let varName, value;
          if (key=== 'colors' && isObject(keyValue[name])) {
            colorObj = keyValue[name];
            Object.keys(colorObj).forEach(key=>{
              varName = `--${modulePrefix !== '' ? modulePrefix : ''}-${name}-${key}`.replace(/-default$/i, '');
              value = typeof keyValue[name][key] === 'string' ? keyValue[name][key] : keyValue[name][key].toString();
              rootArray[varName] = value;
            });

          } else if (key === 'screens' && isObject(keyValue[name])) {
            const minWEntries = Object.entries(keyValue[name]).filter(e => e[0] === 'min')

            minWEntries.forEach(([_, screenValue]) => {
              varName = `-${modulePrefix !== '' ? modulePrefix : ''}${!isDefault(name) ? '-' + name.replace('/','-') : ''}`;
              rootArray[varName] = screenValue.toString();
            })
          } else if (key === 'fontSize' && Array.isArray(keyValue[name]) && keyValue[name].length == 2) {
            const addItem = (name, value) => {
              varName = `--${modulePrefix !== '' ? modulePrefix : ''}-${name}`;
              rootArray[varName] = value;
            }

            addItem(name, keyValue[name][0]); // Add "default key"
            Object.entries(keyValue[name][1]).forEach(([subName, subValue]) => {
              addItem(`${name}-${subName}`, subValue);
            })

          } else {
            varName = `-${key !== 'screens' ? '-': ''}${modulePrefix !== '' ? modulePrefix : ''}${
              !isDefault(name) ? '-' + name.replace('/','-') : ''
            }`;
            value = typeof keyValue[name] === 'string' ? keyValue[name] : keyValue[name].toString();
            rootArray[varName] = value;
          }


        });
      }
    });
    let root = {
      ':root': rootArray
    };
    addComponents(root);
  };
};

var isObject = (obj) =>{
	return Object.prototype.toString.call(obj) === '[object Object]';
};

var isDefault = (name) => name !== 'default' || name !== 'DEFAULT';
