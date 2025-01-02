import { BrowserRouter, Routes, Route } from "react-router-dom";

import LandingLayout from "@/Layouts/LandingLayout";
import AppLayout from "@/Layouts/AppLayout";
import AuthLayout from "@/Layouts/AuthLayout";

import Home from "@/pages/home";
import Landing from "@/pages/landing";
import Tasks from "@/pages/task/tasks";
import TaskPage from "@/pages/task/task";
import Note from "@/pages/note/note";
import Notes from "@/pages/note/notes";
import Projects from "@/pages/project";
import AuthPage from "@/pages/auth";
import CategoriesPage from "@/pages/all-category";

import "./App.css";
import "@/index.css";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* Landing Layout */}
          <Route element={<LandingLayout />}>
            <Route path="/" element={<Landing />} />
          </Route>

          {/* auth  */}
          <Route element={<AuthLayout />}>
            <Route path="/auth" element={<AuthPage />} />
          </Route>

          {/* App Layout */}
          <Route element={<AppLayout />}>
            <Route path="/home" element={<Home />} />
            <Route path="/all-categories" element={<CategoriesPage/>} />
            <Route path="/all-categories/:id" element={<CategoriesPage/>} />
            <Route path="/notes" element={<Notes />} />
            <Route path="/notes/:id" element={<Note />} />
            <Route path="/tasks" element={<Tasks />} />
            <Route path="/tasks/:id" element={<TaskPage />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/projects/:id" element={<Projects />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
