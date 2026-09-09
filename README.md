# Project Management Dashboard!!

## Purpose

This project provides an initial enterprise-style dashboard for monitoring project delivery. It is a static UI prototype intended to demonstrate portfolio summaries, recent project status, and team activity without connecting to production systems.

## Main features

- Responsive dashboard layout for desktop and mobile screens
- Summary cards for total projects, active tasks, completed tasks, and open issues
- Recent Projects table with project managers, due dates, and visual status indicators
- Team activity panel with sample updates
- Accessible semantic HTML, skip navigation, focus states, ARIA labels, and mobile navigation
- Local demo feedback for the New project, View all, and activity actions

## Technology

- HTML5 for semantic document structure
- CSS3 for responsive layout, visual styling, and reduced-motion support
- Vanilla JavaScript for navigation and local UI interactions
- Vitest and jsdom for unit tests only

## Files

- `index.html` contains the dashboard structure, accessibility attributes, and sample project data.
- `style.css` contains the responsive layout, color system, status indicators, and mobile table presentation.
- `script.js` contains the sidebar toggle, navigation reset, and local toast feedback behavior.
- `tests/script.test.js` tests dashboard interactions, timer boundaries, missing elements, and invalid/unrelated controls.
- `package.json` defines the Vitest test commands and test-only development dependencies.
- `CONTRIBUTING.md` documents the repository contribution and review process.

## Run locally

The dashboard UI has no runtime package or server requirement. Open `index.html` directly in a modern browser, or serve the project directory with any local static file server when preferred.

## Data handling

The dashboard currently uses hardcoded fictional sample data in `index.html`. It does not fetch data, submit forms, persist state, or connect to a backend. Button actions display local demonstration messages only. A future backend integration should add authenticated data access, server-side authorization, validation, and audit logging before production use.

## Run tests

Install the test-only dependencies and run the unit tests from the project directory:

```text
npm install
npm test
```

Use `npm run test:watch` for an interactive test loop in VS Code. The tests use Vitest with jsdom to exercise the browser event handlers against a lightweight DOM. A passing test confirms that an expected behavior matches its assertion; a failing test indicates a regression, changed contract, or test expectation that needs review.

## Security considerations

- All names, dates, counts, and activity entries are fictional sample data. No real personal information, passwords, API keys, access tokens, or secrets are included.
- The static UI makes no network requests and includes no tracking scripts or unnecessary runtime libraries.
- JavaScript writes demo messages with `textContent`; it does not insert untrusted HTML.
- The current “secure” presentation is only a prototype state, not an authentication or authorization control.
- Production deployment should use HTTPS, a restrictive Content Security Policy, security headers, authenticated access, server-side authorization, input validation, and appropriate logging.

## GitHub Copilot usage

GitHub Copilot was used as a development assistant to help scaffold the initial UI, suggest accessible responsive markup and styles, review the JavaScript for security and maintainability concerns, and generate focused unit tests. All generated code and sample data were reviewed against the project requirements. Copilot was not given or used to generate passwords, credentials, tokens, or real personal information.
