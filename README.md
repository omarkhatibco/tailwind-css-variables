# Tailwind CSS variables

> Transform Tailwind config file to CSS variables.

[![npm](https://img.shields.io/npm/v/tailwind-css-variables.svg?style=for-the-badge)](https://www.npmjs.com/package/tailwind-css-variables)
[![Downloads](https://img.shields.io/npm/dt/tailwind-css-variables.svg?style=for-the-badge)](https://www.npmjs.com/package/tailwind-css-variables)
[![License](https://img.shields.io/npm/l/tailwind-css-variables.svg?style=for-the-badge)](https://es.wikipedia.org/wiki/Licencia_MIT)

:warning: **This version is working only with Tailwind v2 and above, if you still using the old version of tailwind please use version v2.0.0.**

## Installation

Add the plugin to you Project

```bash
# Install via npm
npm install --save-dev tailwind-css-variables
```

## Configure

The CSS variables plugin exposes options for you to use. Here is an example for adding it to your projects Tailwind plugins.

In `tailwind.js` or `tailwind.config.js` search for the plugins section and add these lines.

By default, you don't need any configuration.

```js
plugins: [
  require('tailwind-css-variables')(
    {
      // modules
    },
    {
      // options
    }
  );
]
```

## Settings

By default, this is the current setting
where object key is the `module` and object value is the `variable name`

```js
{
  colors: 'color',
  screens: 'screen',
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
}
```

### add Module

You can easily add the module by adding it to settings and specify a `variable name`

```js
{
  borderColors: 'rounded',
}
```

### Disable Module

You can easily disable the module by giving it a value of `false`

```js
{
  opacity: false,
}
```

## Options

```js
{
  postcssEachVariables: true; // default: false
}
```

### postcssEachVariables

this option will let the plugin generate CSS variables as an array of colors, screens, fonts and text sizes as this example

```css
:root {
  --colors: transparent, black, grey-darkest, grey-darker, grey-dark;
  --screens: sm, md, lg;
  --fonts: sans, serif, mono;
  --text-sizes: xs, sm, base, lg, xl, 2xl, 3xl, 4xl, 5xl;
}
```

this will allow you to use `postcss-each` plugin to loop colors and generate a button with background color for example

#### looping

Let's assume you would like to generate buttons from your colors.

first of all, install this postcss plugin

```bash
# Install via npm
npm install --save-dev postcss-each postcss-at-rules-variables
```

add the plugins to your postcss config file and respect the order.

```js
module.exports = {
  plugins: {
    tailwindcss: "./tailwind-config.js",
    "postcss-at-rules-variables": {},
    "postcss-each": {},
  },
};
```

now in your CSS file start looping you color for Example

```css
@each $key in var(--colors) {
  .btn-$key {
    color: var(--color-$(key));
  }
}
```

this will output this CSS file

```css
.btn-transparent {
  background-color: var(--color-transparent);
}

.btn-black {
  background-color: var(--color-black);
}

.btn-grey {
  background-color: var(--color-grey);
}

.btn-white {
  background-color: var(--color-white);
}
```

## Output & Name pattern

generated css variables are in this pattern `--{variable name}{size|type|color}`

for Example, generated border width will be `--{}{border}-{2}` and the default value will be `--border-default`.

Values like `w-0.5` which have comma are not allowed in css variables therefore they are going to be `--w-0_5`.

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
