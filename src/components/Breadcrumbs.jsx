import React from 'react';
import { ChevronRight, Home } from 'lucide-react';

export const Breadcrumbs = ({ items, onNavigate }) => {
  if (!items || items.length === 0) return null;

  const breadcrumbsList = [
    { label: 'Home', path: '/' },
    ...items
  ];

  return (
    <nav aria-label="Breadcrumb" className="mb-6 flex items-center text-xs sm:text-sm font-medium text-slate-500">
      <ol className="flex flex-wrap items-center gap-1.5 sm:gap-2">
        {breadcrumbsList.map((crumb, index) => {
          const isLast = index === breadcrumbsList.length - 1;

          return (
            <li key={crumb.path || index} className="flex items-center gap-1.5 sm:gap-2">
              {index > 0 && (
                <ChevronRight size={13} className="text-slate-400 shrink-0 select-none" />
              )}
              {isLast ? (
                <span
                  aria-current="page"
                  className="font-bold text-primary truncate max-w-[200px] sm:max-w-none"
                >
                  {crumb.label}
                </span>
              ) : (
                <a
                  href={crumb.path}
                  onClick={(e) => {
                    if (onNavigate) {
                      e.preventDefault();
                      onNavigate(crumb.path);
                    }
                  }}
                  className="hover:text-primary transition-colors flex items-center gap-1 text-slate-600 hover:underline"
                >
                  {index === 0 && <Home size={14} className="shrink-0" />}
                  <span>{crumb.label}</span>
                </a>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
