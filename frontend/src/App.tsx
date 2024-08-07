import "./App.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";

import PagesIndex from "@/pages/index";
import PagesQuiz from "@/pages/quiz";
import PageNotFound from "./page-not-found";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/*  */}
        <Route
          path="/quiz/:subjectId/:action?/:instanceId?"
          Component={PagesQuiz}
        />
        {/*  */}
        <Route path="/" Component={PagesIndex} />
        <Route path="*" Component={PageNotFound} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
