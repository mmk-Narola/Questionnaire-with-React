import * as React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./Pages/Navbar";
import Demo from "./pages/Demo";

const QManage = React.lazy(() => import("./pages/QuestionManage"));
const CreateQuestion = React.lazy(() => import("./pages/CreateQuestion"));
const ListQuestion = React.lazy(() => import("./pages/ListQuestion"));

function App() {
  return (
    <>
      <Navbar />

      <React.Suspense fallback={<>Loading....</>}>
        <Routes>
          <Route path="/" element={<QManage />}></Route>
          <Route path="/create-question" element={<CreateQuestion />}></Route>
          <Route
            path="/update-question/:id"
            element={<CreateQuestion />}
          ></Route>
          <Route path="/list-question" element={<ListQuestion />}></Route>
        </Routes>
      </React.Suspense>
    </>
  );
}

export default App;
