import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";

import PagesIndex from "@/pages/index";
import PagesQuiz from "@/pages/quiz";
import PageNotFound from "./page-not-found";

const App: React.FC = () => {
  useEffect(() => {
    console.log("App has mounted")
  },[])
  return (
    <BrowserRouter>
      <Routes>
        {/*  */}
        <Route path="/quiz/:subjectId/:action?/:instanceId?" Component={PagesQuiz} />
        {/*  */}
        <Route path="/" Component={PagesIndex} />
        <Route path="*" Component={PageNotFound} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
