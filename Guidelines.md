Component Structure and Organization:

- Use functional components and hooks instead of class components for most use cases;
- Divide components into presentational and container components: container components handle data fetching or state and pass data to presentational components, which focus on UI;
- Structure files by feature or domain in large apps. For example, group all files related to a feature (components, hooks, styles, tests) in one folder. Keep shared generic components (like UI elements) in a separate common folder;
- Ensure each component has a clear purpose. If a component grows too complex or handles unrelated concerns, break it into smaller components.

Hooks:

- Only call hooks at the top level of your components or custom hooks (never inside loops or conditionals);
- Always specify all necessary dependencies in hooks like `useEffect` and `useCallback` to avoid stale state or infinite loops;
- Use `useMemo` to memoize expensive calculations so they run only when inputs change, and `useCallback` to preserve function identity between renders
- Do not recreate objects or arrays during render if not necessary. For example, storing state in a ref or state hook rather than recreating a new object;
- If you have multiple pieces of state that update together, consider using `useReducer` to manage them as one state for clarity and to avoid multiple re-renders;
- Abstract complex or repeated logic into custom hooks. For instance, if multiple components fetch data or handle similar stateful logic, a custom hook (e.g. `useFetch` or `useForm`) can encapsulate that behavior and be reused.

State Management:

- Use React’s local state (`useState` or `useReducer`) for component-specific or UI state. Lift state up to the closest common ancestor when multiple components need to share it, but avoid lifting too high unnecessarily;
- React Context is useful for global data like theme, locale, or simple app state that many components need;
- For complex state needs, consider libraries like **Zustand** lightweight alternatives to Context, or **Redux/Recoil** for more structured state management;
- Use Redux or Recoil when you need features like middleware, time-travel debugging, or globally synchronized state in large apps;
- Not everything needs to be in a global store. Keep state colocated (inside components or custom hooks) when possible;
- Colocate logic that belongs to a specific feature to that area of the app, and only lift to context or global stores when multiple distant parts of the app truly need it;

Composition Techniques and Prop Drilling Alternatives:

- If you find yourself passing props down multiple levels (prop drilling), consider using React Context to provide those values instead. Context providers can supply data to deeply nested components without threading props through every intermediary; For example, an `AuthContext` can provide the current user object to any component that needs it;
- Leverage composition over inheritance. Instead of deeply nested conditional logic, pass JSX or render functions as props (render props pattern) to let parent components decide what to render inside child components;
- In scenarios where you want to inject logic into a component, you can use HOCs (functions that wrap a component with additional functionality). For instance, an HOC can provide a prop or wrap the component with a context provider;

Error Handling and Fallback UI Patterns:

- Use Error Boundary components to catch JavaScript errors in the component tree and display a fallback UI instead of crashing the app. In React, you can create an error boundary by defining a class component with `componentDidCatch`, or use a library like `react-error-boundary` for a hooks-friendly approach. Place error boundaries around components that may throw (for example, around lazy-loaded components or deeply nested trees) to gracefully handle exceptions.
- When using code-splitting or data fetching with React’s Suspense, provide a user-friendly fallback UI (like a loading spinner or placeholder) via the `<Suspense fallback={...}>` boundary;
- Pair Suspense with error boundaries to handle network failures – for example, show an error message if a lazy-loaded chunk fails to load;
- Plan for what the UI should display if data fails to load or an action fails. For instance, show an error message or a retry button if an API call errors out;
- For errors outside React components (like network errors or unhandled Promise rejections), integrate error logging and display a notification to the user;
- Always sanitize and avoid exposing technical details in UI; show user-friendly messages.

Working with Forms:

- Decide between controlled and uncontrolled inputs based on the use case. Controlled components (with state managed by React) give you explicit control and instantaneous validation, whereas uncontrolled components (using refs or libraries that abstract them) can offer better performance for large forms;
- Leverage form management libraries like Formik or React Hook Form for complex forms. Formik provides a higher-level API with built-in form state management and validation, while React Hook Form uses uncontrolled components and refs under the hood for better performance on large forms;
- Use schema validation libraries like Yup or Zod in conjunction with form libraries to enforce input schemas. This allows you to define a single source of truth for what valid form data looks like. For example, with Formik you can plug in a Yup schema to validate fields, and with React Hook Form you can use an external schema or manual validation functions.
- Ensure each form field has a label (or aria-label) for accessibility. Use proper form semantics (like `<form>` element, `<button type="submit">` for submission, and proper input types for data). Handling of form state (touched, errors) should reflect in the UI (e.g., showing error messages near fields).

Code Reusability and Modularization:

- Identify UI patterns (buttons, modals, form controls, etc.) and abstract them into reusable components. Create a library of common components (sometimes called a design system or UI kit) that can be used throughout the project to ensure consistency. Make these components configurable via props so they can handle various scenarios without modification;
- If multiple components need the same behavior (e.g., tracking window size, managing a particular side effect, fetching data from an API), implement it as a custom React hook. This avoids duplicating code and isolates logic for easier testing. For example, a `useOnlineStatus()` hook could encapsulate event listeners for online/offline events and provide a boolean status.
- Strive to avoid copy-pasting code by pulling out common logic, but only do so when you see a clear pattern.
- Organize utility functions and types into modules (e.g., a `utils/` folder or grouped by domain). This makes it easy to find and maintain them. For instance, date utilities in a `utils/date.ts` file or API handlers in a `services/api.ts`. With TypeScript, you can even group related type definitions in a `types/` folder or within feature folders for clarity;
