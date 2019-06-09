# Tailwind CSS variables

> Transform Tailwind config file to CSS variables.

[![npm](https://img.shields.io/npm/v/tailwind-css-variables.svg)](https://www.npmjs.com/package/tailwind-css-variables)

:warning: **This version is working only with Tailwind v1 and above, if you still using the old version of tailwind please use version v1.2.0.**

:warning: **If you want to upgrade to this version please read changelog to know what has changed.**

## Installation

Add the plugin to you Project

```bash
# Install via npm
npm install --save-dev tailwind-css-variables
```

## Configure

The css variables plugin exposes options for you to use. Here is the example for adding it to your project tailwind plugins.

In `tailwind.js` or `tailwind.config.js` search for plugins section and add this lines.

By defauts, you don't need any configurations.

```js
plugins: {
  require('tailwind-css-variables')(
    {
      // modules
    },
    {
      // options
    }
  );
}
```

## Settings

By default this is the current settings
where object key is the `module` and object value is the `variable name`

```js
{
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

## Options

```js
{
  postcssEachVariables: true; // default: false
}
```

### postcssEachVariables

this option will let the plugin generate a css variables as array of colors,screens,fonts and text sizes as this example

```css
:root {
  --colors: transparent, black, grey-darkest, grey-darker, grey-dark;
  --screens: sm, md, lg;
  --fonts: sans, serif, mono;
  --text-sizes: xs, sm, base, lg, xl, 2xl, 3xl, 4xl, 5xl;
}
```

this will allow you to use `postcss-each` plugin to loop colors and generate button with background color for example

#### looping

Let's assume you would like to generate button from you colors.

first of all install this postcss plugins

```bash
# Install via npm
npm install --save-dev postcss-each postcss-at-rules-variables
```

add the plugins to you postcss config file and respect the order.

```js
module.exports = {
  plugins: {
    tailwindcss: './tailwind-config.js',
    'postcss-at-rules-variables': {},
    'postcss-each': {}
  }
};
```

now in you css file start looping you color for Example

```css
@each $key in var(--colors) {
  .btn-$key {
    color: var(--color-$(key));
  }
}
```

this will output this css file

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
