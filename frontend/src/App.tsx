import "./App.css";

import "@fontsource/roboto"; // Defaults to weight 400 with all styles included
import "@fontsource/roboto/400.css"; // Specify weight 400
import "@fontsource/roboto/700.css"; // Specify weight 700
import "@fontsource/roboto-mono"; // Defaults to weight 400 with all styles included
import "@fontsource/roboto-mono/400.css"; // Specify weight 400
import "@fontsource/roboto-mono/700.css"; // Specify weight 700

import { BrowserRouter, Routes, Route } from "react-router-dom";

import PagesIndex from "@/pages/index";
import PagesQuiz from "@/pages/quiz";
import PageNotFound from "./page-not-found";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/*  */}
        <Route path="/quiz/:subjectId/:action/:token?" Component={PagesQuiz} />
        {/*  */}
        <Route path="/" Component={PagesIndex} />
        <Route path="*" Component={PageNotFound} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
