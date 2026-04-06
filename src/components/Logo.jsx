
import React from 'react';
import { cn } from '@/lib/utils';

/* 
 * AUDIT FINDINGS:
 * 1. Property Management exists in Admin? Yes (apps/web/src/pages/admin/PropertyManagement.jsx)
 * 2. Property Management exists in User/Associate? Yes (apps/web/src/pages/associate/Property.jsx)
 * 3. 'New Era Global' / 'Next Era Global' found in: Header.jsx, Footer.jsx, HomePage.jsx, AboutPage.jsx, ProjectsPage.jsx, index.html
 * 4. Current logo location: Logo.jsx (used in Header, Footer, Layouts)
 */

export default function Logo({ className, variant = 'default' }) {
  // Using a styled text logo as no specific image URL was provided in the prompt.
  // Applying the requested responsive sizing classes.
  return (
    <div className={cn(
      "flex items-center gap-2 font-bold tracking-tight",
      variant === 'footer' ? "w-[120px]" : "w-[100px] md:w-[150px]",
      className
    )}>
      <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center shrink-0">
        <span className="text-secondary-foreground text-lg leading-none">NE</span>
      </div>
      <span className="text-lg md:text-xl leading-none whitespace-nowrap">
        Next Erra<br/><span className="text-sm text-secondary font-medium">Group</span>
      </span>
    </div>
  );
}
