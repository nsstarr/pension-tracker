## Getting Started

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

First, run the development server:

```bash
npm run dev
```

For testing, run:

```bash
npm run test
```

To build, run:

```bash
npm run build
```

## Live Demo

You can view the live application here: [Pension Tracker Live Demo](https://pension-tracker-73vjerx0l-anastasiastarostinas-projects.vercel.app/)

## Technologies Used

- **Next.js** (14.2.13)
- **React** (^18)
- **Chart.js** (^4.4.4): A charting library used for visualizing data.
- **React-Chartjs-2** (^5.2.0): A React wrapper for Chart.js.

## Component Structure

The Pension Tracker follows the **Atomic Design** principles by [Brad Frost](https://bradfrost.com/blog/post/atomic-web-design/). This approach organizes the components into a hierarchy of:

- **Atoms**: Basic building blocks like buttons, labels, and input fields.
- **Molecules**: Combinations of atoms working together, such as form groups.
- **Organisms**: Groups of molecules forming distinct sections of the UI, like the form or chart components.
- **Templates**: Page-level structures that place components together into layouts.
- **Pages**: Specific instances of templates with actual content.

This design pattern ensures a modular and maintainable structure, making it easier to extend or modify the app.

## Theme Support

The app supports both **light** and **dark** themes. It automatically adjusts based on the user's system preferences, providing a seamless experience whether they prefer a light or dark interface.

## Purpose

The Pension Tracker app allows users to:

- Input their desired annual income in retirement.
- Input monthly contributions from their employer.
- Input their personal monthly contributions.
- Specify their desired retirement age.
- Include any current pension pots they may already have.

The app provides the following visualizations:

- Projected Pension Pot: How much the user is expected to accumulate by their retirement age.
- Pension Pot Depletion: How the money decreases after retirement as withdrawals are made to sustain the user's desired annual income.
- Desired Pension Pot: A visual representation of the amount required to meet their retirement goals.
- Current Pension Pot Contribution: How their current pension pot contributes to the desired pension total.

Assumptions:

- The user will retire at the specified age and will live until 81.
- The user starts working at the age of 25 and maintains the same job until retirement.
- The pension pot earns an annual interest rate of 4.9% until retirement.

## How to Use the Pension Tracker

1. Input your desired annual income, monthly employer contributions, personal contributions, retirement age, and any current pension pots you may have.
2. Click the "Calculate" button to visualize your projected pension pot and see how your current contributions and savings will affect your retirement balance.
3. View your "Pension Summary," which provides details on the desired pension pot, projected pension pot at retirement, and current pension pot contribution.

## Glossary

💰 **Pension Pot** is the total amount of money that an individual has saved or accumulated for their retirement. It comprises regular contributions made by the individual, contributions from their employer (if applicable), and any investment growth or interest earned over time.

💰 **Desired Pension Pot** is the total amount the user needs at the point of retirement to sustain their desired annual income throughout retirement.

💰 **Projected Pension Pot** is the estimated amount of money that the user is expected to have accumulated by the time they reach their chosen retirement age.

💰 **Retirement balance** is the projected amount of money available in the user's pension pot at various stages of their retirement. It reflects how the pension pot changes over time as the user withdraws their desired annual income and potentially continues to earn interest. The retirement balance helps visualize how long the pension pot will last and whether it will be sufficient to meet the user's income needs throughout retirement.

## What's Next

- Increase Test Coverage: Improve test coverage to ensure all components and logic are well-tested.
- Interactivity with Real-time Updates: Allow the chart to update interactively as the user inputs or changes data in the form.
- Support for Multiple Pension Pots: Enable users to add and visualize multiple pension pots simultaneously.
- Accessibility Improvements: Continue refining the app to achieve AAA standard.
- Responsive Enhancements: Fine-tune the responsive design for an even better experience across devices.

## License

This project is open-source and available under the [MIT License](https://opensource.org/licenses/MIT).
