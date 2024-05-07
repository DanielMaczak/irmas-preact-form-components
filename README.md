# Irma's Preact form components

> [!WARNING]
> This is a work in progress. I am progressively adding more features, writing unit/integration tests and refactoring for best performance.

## Contents

- [Features](#features)
- [Installation](#installation)
- [Requirements](#requirements)
- [Use case](#use-case)
- [Planned additions](#planned-additions)
- [Documentation](#documentation)
- [Types and where to find them](#types-and-where-to-find-them)

## Features

Set of minimalistic form components with a simple premise: maximum features in minimum code.

- Independent: Preact is the only dependency.
- Modern: ES6 modules only.
- Clean: 100% in strict TypeScript.
- Easy to use: HTML components finally working as you would expect.
- No fighting: Formating reset to 0, ready to be injected with styles.
- _(Planned) Tiny: Smallest build size achievable._

### Progress

| Component      | Build size | Coverage | Notes                                                     |
| -------------- | ---------- | -------- | --------------------------------------------------------- |
| Button         |            | 0%       |                                                           |
| Date Input     | 1KB        | 100%     | Missing test of CSS props and focus in Cypress            |
| Dropdown Input |            | 0%       |                                                           |
| Number Input   |            | 0%       |                                                           |
| Switch Input   |            | 0%       |                                                           |
| Text Input     | 2KB        | 97%      | Missing test of CSS props, focus and multiline in Cypress |
| Replace Input  |            | 0%       |                                                           |

## Installation

```
npm i irmas-preact-form-components
```

## Requirements

Preact 10.16+.

## Use case

> [!NOTE]
> Will be added after first full release

## Planned additions

Following is the list of planned features:

- Parent form component: with presets for different use-cases.
- Size optimization: in the spirit of Preact push the build size to the absolute minimum.
- Testing: 100% coverage.
- Browser compatibility and accessibility: ensure uniform functionality across all major browsers.
- Maybe more HTML Input flavors if I see a good case for improvement.

If you happen to have any suggestions or ideas for future additions and improvements, please hit me with an email! You can find my address on my GitHub profile.

## Documentation

Description and usage details for all the components is available in [Wiki](https://github.com/DanielMaczak/irmas-preact-form-components/wiki/)

## Types and where to find them

> [!NOTE]
> Will be added after first full release
