var _ = require("lodash");
var flattenColorPalette = require("tailwindcss/lib/util/flattenColorPalette")
  .default;

const defaultVariablesNames = {
  colors: "color",
  screens: "screen",
  fontFamily: "font",
  fontSize: "text",
  fontWeight: "font",
  lineHeight: "leading",
  letterSpacing: "tracking",
  backgroundSize: "bg",
  borderWidth: "border",
  borderRadius: "rounded",
  width: "w",
  height: "h",
  minWidth: "min-w",
  minHeight: "min-h",
  maxWidth: "max-w",
  maxHeight: "max-h",
  padding: "p",
  margin: "m",
  boxShadow: "shadows",
  zIndex: "z",
  opacity: "opacity",
};

const defaultOptions = {
  postcssEachVariables: false,
};

module.exports = function (customVariablesNames, customOptions) {
  return ({ addComponents, config }) => {
    const variableRoot = {};
    const variablesNames = {
      ...defaultVariablesNames,
      ...customVariablesNames,
    };

    const options = {
      ...defaultOptions,
      ...customOptions,
    };

    Object.entries(variablesNames).forEach(([key, customName]) => {
      if (!customName) return;
      const tailwindPrefix = config("prefix", "");
      const originalConfig = config(`theme.${key}`, []);

      let modifiedConfig = {};

      switch (key) {
        case "colors":
          modifiedConfig = flattenColorPalette(originalConfig);
          break;
        case "fontFamily":
          modifiedConfig = flattenFontFamily(originalConfig);
          break;
        case "fontSize":
          modifiedConfig = flattenFontSize(originalConfig);
          break;

        default:
          modifiedConfig = originalConfig;
          break;
      }

      Object.entries(modifiedConfig).forEach(([key, value]) => {
        const cssVariableName = `--${tailwindPrefix}${customName}-${getFixedKey(
          key
        )}`;
        variableRoot[cssVariableName] = value;
      });

      if (options.postcssEachVariables) {
        const postcssEachVariablesKeys = [
          "colors",
          "screens",
          "fontFamily",
          "fontSize",
        ];
        if (postcssEachVariablesKeys.includes(key)) {
          const cssVariableName = `--${tailwindPrefix}${postCssForEachKeys[key]}`;
          variableRoot[cssVariableName] = normalizePostcssEachVariablesValues(
            modifiedConfig
          );
        }
      }
    });

    const root = {
      ":root": variableRoot,
    };
    addComponents(root);
  };
};

const flattenFontFamily = (obj) => {
  return Object.entries(obj).reduce((prevObj, [key, value]) => {
    return {
      ...prevObj,
      [key]: value.join(","),
    };
  }, {});
};

const flattenFontSize = (obj) => {
  return Object.entries(obj).reduce((prevObj, [key, value]) => {
    const [fontSize, options] = Array.isArray(value) ? value : [value];
    const { lineHeight, letterSpacing } = _.isPlainObject(options)
      ? options
      : {
          lineHeight: options,
        };

    return {
      ...prevObj,
      [key]: fontSize,
      ...(lineHeight === undefined
        ? {}
        : {
            [`${key}-line-height`]: lineHeight,
          }),
      ...(letterSpacing === undefined
        ? {}
        : {
            [`${key}-letter-spacing`]: letterSpacing,
          }),
    };
  }, {});
};

const getFixedKey = (key) => {
  if (key === "DEFAULT" || key === "default") {
    return "default";
  }
  return key.replace("/", "-").replace(".", "_");
};

const postCssForEachKeys = {
  colors: "colors",
  screens: "screens",
  fontFamily: "font-families",
  fontSize: "font-sizes",
};

const normalizePostcssEachVariablesValues = (obj) => {
  return Object.keys(obj)
    .filter(
      (key) => !(key.includes("letter-spacing") || key.includes("line-height"))
    )
    .join(",");
};
