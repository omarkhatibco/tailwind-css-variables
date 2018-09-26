# Tailwind CSS variables

> Transform Tailwind config file to CSS variables.

[![npm](https://img.shields.io/npm/v/tailwind-css-variables.svg)](https://www.npmjs.com/package/tailwind-css-variables)

## Installation

Add the plugin to you Project

```bash
# Install via npm
npm install --save-dev tailwind-css-variables
```

## Configure

The css variables plugin exposes options for you to use. Here is the example for adding it to your project plugins

```js
require('tailwind-css-variables')({
  // settings
});
```

## Settings

By default this is the current settings
where object key is the `module` and object value is the `variable name`

```js
{
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
}
```

### add Module

You can easily add module by add it to setting and specify a `variable name`

```js
{
  borderColors: 'rounded',
}
```

### Disable Module

You can easily disable module by give it a value of `false`

```js
{
  opacity: false,
}
```

## Output & Name pattern

generated css variables are in this pattern `--{prefix}{variable name}{size|type|color}`

for Example generated border width will be `--{}{border}{0}` and default value will be `--border`.

The result of this plugin is a `:root` with CSS variables.

```css
:root {
  --color-transparent: transparent;
  --color-black: #22292f;
  --color-grey: #b8c2cc;
  --color-white: #fff;
  --sm: 576px;
  --md: 768px;
  --lg: 992px;
  --xl: 1200px;
  --border-0: 0;
  --border-2: 2px;
  --border-4: 4px;
  --border-8: 8px;
  --border: 1px;
}
```

## Release History

Checkout [CHANGELOG.md](https://github.com/omarkhatibco/tailwind-css-variables/blob/master/CHANGELOG.md) file for release history.

## Meta

Checkout [LICENSE](https://github.com/omarkhatibco/tailwind-css-variables/blob/master/LICENSE) for license information.
