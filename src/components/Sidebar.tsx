import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, BookOpen, Layers, ChevronRight, ChevronDown, FileText } from 'lucide-react';
import { useCoursesByInstructor } from '../hooks/useCourses';
import { useModulesByCourse } from '../hooks/useModules';
import { useLessonsByModule } from '../hooks/useLessons';
import { useState } from 'react';
import { useAuth } from '../lib/utils/useAuth';

const ModuleListItem = ({ courseId, moduleId, moduleName, expandedModules, toggleModule }: { courseId: string; moduleId: string; moduleName: string; expandedModules: Set<string>; toggleModule: (moduleId: string) => void }) => {
  const location = useLocation();
  const isExpanded = expandedModules.has(moduleId);
  const { data: lessons = [] } = useLessonsByModule(moduleId);

  return (
    <div>
      <div className="flex items-center min-w-0">
        <button
          onClick={() => toggleModule(moduleId)}
          className="p-1 hover:bg-slate-800 rounded flex-shrink-0"
        >
          {isExpanded ? (
            <ChevronDown className="h-3 w-3 text-slate-400" />
          ) : (
            <ChevronRight className="h-3 w-3 text-slate-400" />
          )}
        </button>
        <Link
          to={`/courses/${courseId}/modules/${moduleId}`}
          className={`flex-1 flex items-center gap-2 px-2 py-1.5 rounded text-xs transition-colors min-w-0 ${
            location.pathname === `/courses/${courseId}/modules/${moduleId}` || location.pathname === `/courses/${courseId}/modules/${moduleId}/lessons`
              ? 'bg-slate-800 text-white'
              : 'text-slate-400 hover:bg-slate-800 hover:text-slate-300'
          }`}
        >
          <Layers className="h-3 w-3 flex-shrink-0" />
          <span className="truncate">{moduleName}</span>
        </Link>
      </div>
      {isExpanded && lessons.length > 0 && (
        <div className="ml-6 mt-1 space-y-1">
          {lessons.map((lesson) => (
            <Link
              key={lesson._id}
              to={`/courses/${courseId}/modules/${moduleId}/lessons/${lesson._id}`}
              className={`flex items-center gap-2 px-2 py-1 rounded text-xs transition-colors truncate ${
                location.pathname === `/courses/${courseId}/modules/${moduleId}/lessons/${lesson._id}`
                  ? 'bg-slate-800 text-white'
                  : 'text-slate-400 hover:bg-slate-800 hover:text-slate-300'
              }`}
            >
              <FileText className="h-3 w-3 flex-shrink-0" />
              <span className="truncate">{lesson.name}</span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

const ModuleList = ({ courseId, expandedModules, toggleModule }: { courseId: string; expandedModules: Set<string>; toggleModule: (moduleId: string) => void }) => {
  const { data: modules = [] } = useModulesByCourse(courseId);

  if (modules.length === 0) return null;

  return (
    <div className="ml-4 mt-1 space-y-1">
      {modules.map((module) => (
        <ModuleListItem
          key={module._id}
          courseId={courseId}
          moduleId={module._id}
          moduleName={module.name}
          expandedModules={expandedModules}
          toggleModule={toggleModule}
        />
      ))}
    </div>
  );
};

export const Sidebar = () => {
  const location = useLocation();
  const { user } = useAuth();
  const { data: courses = [] } = useCoursesByInstructor(user?._id || '');
  const [expandedCourses, setExpandedCourses] = useState<Set<string>>(new Set());
  const [expandedModules, setExpandedModules] = useState<Set<string>>(new Set());
  const [expandedModuleSections, setExpandedModuleSections] = useState<Set<string>>(new Set());

  const toggleCourse = (courseId: string) => {
    setExpandedCourses(prev => {
      const next = new Set(prev);
      if (next.has(courseId)) {
        next.delete(courseId);
      } else {
        next.add(courseId);
      }
      return next;
    });
  };

  const toggleModule = (moduleId: string) => {
    setExpandedModules(prev => {
      const next = new Set(prev);
      if (next.has(moduleId)) {
        next.delete(moduleId);
      } else {
        next.add(moduleId);
      }
      return next;
    });
  };

  const toggleModuleSection = (courseId: string) => {
    setExpandedModuleSections(prev => {
      const next = new Set(prev);
      if (next.has(courseId)) {
        next.delete(courseId);
      } else {
        next.add(courseId);
      }
      return next;
    });
  };

  const isActive = (path: string) => location.pathname === path;
  const isCoursePath = (courseId: string) => location.pathname.includes(`/courses/${courseId}`);

  return (
    <div className="h-full bg-slate-900 text-slate-100 flex flex-col overflow-hidden">
      <nav className="flex-1 overflow-y-auto overflow-x-hidden p-4 space-y-2">
        <Link
          to="/"
          className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
            isActive('/') 
              ? 'bg-slate-800 text-white' 
              : 'text-slate-300 hover:bg-slate-800 hover:text-white'
          }`}
        >
          <LayoutDashboard className="h-5 w-5" />
          <span>Dashboard</span>
        </Link>

        <div className="pt-4">
          <div className="flex items-center gap-2 px-3 py-2 text-xs font-semibold text-slate-400 uppercase tracking-wider">
            <BookOpen className="h-4 w-4" />
            <span>Courses</span>
          </div>

          <div className="space-y-1 mt-2">
            {courses.map((course) => {
              const isExpanded = expandedCourses.has(course._id);
              const isCurrentCourse = isCoursePath(course._id);

              return (
                <div key={course._id}>
                  <div className="flex items-center min-w-0">
                    <button
                      onClick={() => toggleCourse(course._id)}
                      className="p-1 hover:bg-slate-800 rounded flex-shrink-0 mr-1"
                    >
                      {isExpanded ? (
                        <ChevronDown className="h-4 w-4 text-slate-400" />
                      ) : (
                        <ChevronRight className="h-4 w-4 text-slate-400" />
                      )}
                    </button>
                    <Link
                      to={`/courses/${course._id}`}
                      className={`flex-1 flex items-center gap-2 px-2 py-2 rounded-lg text-sm transition-colors min-w-0 ${
                        isCurrentCourse
                          ? 'bg-slate-800 text-white'
                          : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                      }`}
                    >
                      <span className="truncate block">{course.name}</span>
                    </Link>
                  </div>

                  {isExpanded && (
                    <div className="ml-8 mt-1 space-y-1 min-w-0">
                      <Link
                        to={`/courses/${course._id}`}
                        className={`flex items-center gap-2 px-3 py-1.5 rounded text-sm transition-colors truncate ${
                          location.pathname === `/courses/${course._id}`
                            ? 'bg-slate-800 text-white'
                            : 'text-slate-400 hover:bg-slate-800 hover:text-slate-300'
                        }`}
                      >
                        Details
                      </Link>
                      <div>
                        <div className="flex items-center min-w-0">
                          <button
                            onClick={() => toggleModuleSection(course._id)}
                            className="p-1 hover:bg-slate-800 rounded flex-shrink-0"
                          >
                            {expandedModuleSections.has(course._id) ? (
                              <ChevronDown className="h-4 w-4 text-slate-400" />
                            ) : (
                              <ChevronRight className="h-4 w-4 text-slate-400" />
                            )}
                          </button>
                          <Link
                            to={`/courses/${course._id}/modules`}
                            className={`flex-1 flex items-center gap-2 px-3 py-1.5 rounded text-sm transition-colors ${
                              location.pathname === `/courses/${course._id}/modules`
                                ? 'bg-slate-800 text-white'
                                : 'text-slate-400 hover:bg-slate-800 hover:text-slate-300'
                            }`}
                          >
                            <Layers className="h-4 w-4 flex-shrink-0" />
                            <span className="truncate">Modules</span>
                          </Link>
                        </div>
                        {expandedModuleSections.has(course._id) && (
                          <ModuleList courseId={course._id} expandedModules={expandedModules} toggleModule={toggleModule} />
                        )}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </nav>
    </div>
  );
};
