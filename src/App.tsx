import React, { lazy, Suspense } from "react";
import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import { Layout } from "./Component/Layout";
import { Loading } from "./Component/Loading";

const AuthPage = lazy(() => import("./Pages/AuthPage"));
const DashboardPage = lazy(() => import("./Pages/DashboardPage"));
const RegistrationPage = lazy(() => import("./Pages/RegistrationPage"));
const ErrorPage = lazy(() => import("./Pages/ErrorPage"));

export default function App() {
  return (
    <div className="App">
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Navigate to="/login" replace />} />
            <Route path="login" element={<AuthPage />} />
            <Route path="registration" element={<RegistrationPage />} />
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="*" element={<ErrorPage />} />
          </Route>
        </Routes>
      </Suspense>
    </div>
  );
}
