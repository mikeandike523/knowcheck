import './App.css';

import '@fontsource/roboto'; // Defaults to weight 400 with all styles included
import '@fontsource/roboto/400.css'; // Specify weight 400
import '@fontsource/roboto/700.css'; // Specify weight 700
import '@fontsource/roboto-mono'; // Defaults to weight 400 with all styles included
import '@fontsource/roboto-mono/400.css'; // Specify weight 400
import '@fontsource/roboto-mono/700.css'; // Specify weight 700

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Suspense, lazy } from 'react';

// Function to create route with error handling
const createPargeRoute = (relpath: string) => {
  // Step 1: Translate bracket syntax for slugs to the BrowserRouter syntax (colon)
  const path = relpath.replace(/\[(\w+)\]/g, ':$1');

  // Step 2: Async import the component assuming the default export is a valid React component
  const Component = lazy(async () => {
    try {
      return await import(/* @vite-ignore */ `./pages/${relpath}`);
    } catch (error) {
      try {
        return await import(/* @vite-ignore */ `./pages/${relpath}/index`  );
      } catch (indexError) {
        return () => <div>Page Not Found</div>;
      }
    }
  });

  // Step 3: Render using React.Suspense
  return {
    browserRouterPath: path,
    component: (
      <Suspense fallback={<div>Loading...</div>}>
        <Component />
      </Suspense>
    ),
  };
};

const App: React.FC = () => {
  // Manually define the routes for now
  const routes = ['index', 'about']; // Add more paths as needed

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={createPargeRoute("/index").component} />
        {routes.map((route) => {
          const { component, browserRouterPath } = createPargeRoute(route);
          return <Route key={browserRouterPath} path={browserRouterPath} element={component} />;
        })}
        <Route path="*" element={<div>Page Not Found</div>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
