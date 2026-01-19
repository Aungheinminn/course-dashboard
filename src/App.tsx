import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/utils/query-client";
import { AuthProvider } from "./contexts/AuthContext";
import { Layout } from "./components/Layout";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { LoginPage } from "./pages/LoginPage";
import { SignupPage } from "./pages/SignupPage";
import { CourseDashboard } from "./pages/CourseDashboard";
import { CourseDetailPage } from "./pages/CourseDetailPage";
import { CourseModulesPage } from "./pages/CourseModulesPage";
import { ModuleDetailPage } from "./pages/ModuleDetailPage";
import { ModuleLessonsPage } from "./pages/ModuleLessonsPage";
import { LessonDetailPage } from "./pages/LessonDetailPage";
import { LessonContentPage } from "./pages/LessonContentPage";
import { MediaLibrary } from "./pages/MediaLibrary";
import { QuizGeneration } from "@/pages/QuizGeneration";
import { AssessmentLibrary } from "@/pages/AssessmentLibrary";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Layout>
                    <CourseDashboard />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/courses/:id"
              element={
                <ProtectedRoute>
                  <Layout>
                    <CourseDetailPage />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/courses/:id/modules"
              element={
                <ProtectedRoute>
                  <Layout>
                    <CourseModulesPage />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/courses/:courseId/modules/:moduleId"
              element={
                <ProtectedRoute>
                  <Layout>
                    <ModuleDetailPage />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/courses/:courseId/modules/:moduleId/lessons"
              element={
                <ProtectedRoute>
                  <Layout>
                    <ModuleLessonsPage />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/courses/:courseId/modules/:moduleId/lessons/:lessonId"
              element={
                <ProtectedRoute>
                  <Layout>
                    <LessonDetailPage />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/courses/:courseId/modules/:moduleId/lessons/:lessonId/content"
              element={
                <ProtectedRoute>
                  <Layout>
                    <LessonContentPage />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/media-library/"
              element={
                <ProtectedRoute>
                  <Layout>
                    <MediaLibrary />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/quiz-generation"
              element={
                <ProtectedRoute>
                  <Layout>
                    <QuizGeneration />
                  </Layout>
                </ProtectedRoute>
              }
            />

            <Route
              path="/assessment-library"
              element={
                <ProtectedRoute>
                  <Layout>
                    <AssessmentLibrary />
                  </Layout>
                </ProtectedRoute>
              }
            />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
