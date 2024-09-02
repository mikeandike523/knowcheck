import "./App.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";

import PagesIndex from "@/pages/index";
import PagesQuiz from "@/pages/quiz";
import PageNotFound from "./page-not-found";
import PagesSignIn from "@/pages/sign-in";
import PagesSignUp from "@/pages/sign-up";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/quiz/:subjectId/:action?/:instanceId?"
          Component={PagesQuiz}
        />
        <Route path="/sign-in" Component={PagesSignIn} />
        <Route path="/sign-up" Component={PagesSignUp} />
        <Route path="/" Component={PagesIndex} />
        <Route path="*" Component={PageNotFound} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
