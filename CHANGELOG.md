# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [2.0.3] - 2019-08-06

### added

### Fixed

- Add support for `screen` configuration objects [#4](https://github.com/omarkhatibco/tailwind-css-variables/pull/4) [@r0skar](https://github.com/r0skar)

### removed

## [2.0.2] - 2019-06-13

### added

### Fixed

- remove extra dash sign from default color [#3](https://github.com/omarkhatibco/tailwind-css-variables/pull/3) [@Knovour](https://github.com/Knovour)

### removed

## [2.0.1] - 2019-06-13

### added

### Fixed

- fix version.

### removed

## [2.0.0] - 2019-06-12

### added

- add note to readme that this version is compatible with tailwind v1 only,

### Fixed

- negative margin now in this form `--m--4`, I should look at this later.
- the problem with slashes `/` seems it's not accepted anymore in css Variables so class like `w-1/3` now is `--w-1-3`

### removed

- negative margin as it's now in the same margin object.
- prefix because it complicated.

## [1.2.0] - 2018-09-26

### added

- add ability to generate a css variable of keys array to use it with `postcss-each` and `postcss-at-rules-variables`

## [1.1.1] - 2018-09-26

### Fixed

- fix package.json

## [1.1.0] - 2018-09-26

### Fixed

- let modules being disabled only from setting because sometime you need module as css variable and not as classes.

## [1.0.1] - 2018-09-26

### Fixed

- fix fonts, it was returning array now it will return string.

## [1.0.0] - 2018-09-26

### Added

- Initial release to npm.
