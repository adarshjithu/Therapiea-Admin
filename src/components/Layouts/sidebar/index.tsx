'use client';

import Image from 'next/image';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState, useRef } from 'react';
import { NAV_DATA } from './data';
import { ArrowLeftIcon } from './icons';
import { MenuIcon } from '../header/icons';
import { MenuItem } from './menu-item';
import { useSidebarContext } from './sidebar-context';
import { Users, Package, Ticket } from 'lucide-react';

// Icon map for string-based icons
const iconMap: Record<string, React.ComponentType<any>> = {
  Users,
  Package,
  Ticket,
};

export function Sidebar() {
  const pathname = usePathname();
  const { setIsOpen, isOpen, isMobile, toggleSidebar } = useSidebarContext();
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const [hoveredItem, setHoveredItem] = useState<{ title: string; rect: DOMRect } | null>(null);
  const menuRefs = useRef<Record<string, HTMLLIElement | null>>({});

  const toggleExpanded = (title: string) => {
    setExpandedItems((prev) => (prev.includes(title) ? [] : [title]));
  };

  // Auto-expand menu items based on current path
  useEffect(() => {
    NAV_DATA.forEach((section) => {
      section.items.forEach((item) => {
        if (item.items && item.items.length > 0) {
          const hasActiveSubItem = item.items.some((subItem: any) => subItem.url === pathname);
          if (hasActiveSubItem && !expandedItems.includes(item.title)) {
              toggleExpanded(item.title);
            }
          }
        });
      });
  }, [pathname, expandedItems, toggleExpanded]);

  return (
    <>
      {isMobile && isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 transition-opacity duration-300"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}

      <aside
        className={cn(
           'border-r border-gray-200 bg-white transition-all duration-300 ease-in-out dark:border-gray-800 dark:bg-gray-dark overflow-visible',
          isMobile ? 'fixed bottom-0 top-0 z-50' : 'sticky top-0 h-screen',
           isOpen ? 'w-80' : 'w-20'
        )}
        aria-label="Main navigation"
       >
        <div className="flex h-full flex-col py-6 px-3 overflow-visible">
          {/* Hamburger Menu Button - Always on the Left */}
          <div className="mb-4 flex justify-start">
            <button
              onClick={toggleSidebar}
              className="rounded-lg p-2 text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
              title="Toggle Menu"
            >
              <span className="sr-only">Toggle Menu</span>
              <MenuIcon className="size-5" />
            </button>
          </div>

          {/* Close button for mobile */}
          {isMobile && isOpen && (
            <div className="mb-4 flex justify-end">
              <button
                onClick={toggleSidebar}
                className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700"
              >
                <span className="sr-only">Close Menu</span>
                <ArrowLeftIcon className="size-6" />
              </button>
            </div>
            )}

          {/* Navigation */}
           <div className="flex-1 overflow-y-auto" style={{ overflowX: 'visible' }}>
            {NAV_DATA.map((section) => (
              <div key={section.label} className="mb-6 overflow-visible">
                <nav role="navigation" aria-label={section.label} className="overflow-visible">
                  <ul className="space-y-2 overflow-visible">
                    {section.items.map((item) => (
                      <li 
                        key={item.title} 
                        className="relative group"
                        ref={(el) => { menuRefs.current[item.title] = el; }}
                        onMouseEnter={(e) => {
                          if (!isOpen) {
                            const rect = e.currentTarget.getBoundingClientRect();
                            setHoveredItem({ title: item.title, rect });
                          }
                        }}
                        onMouseLeave={() => setHoveredItem(null)}
                      >
                        {item.items.length ? (
                           <>
                            <MenuItem
                               className={cn(
                                 "flex items-center py-3 transition-all duration-200 hover:!bg-black hover:!text-white",
                                 isOpen ? "justify-start gap-3 px-3" : "justify-center",
                                 item.items.some(({ url }) => url === pathname) && "!bg-black !text-white"
                               )}
                               isActive={false}
                              onClick={() => toggleExpanded(item.title)}
                            >
                               {(() => {
                                 const iconName = typeof item.icon === 'string' ? item.icon : '';
                                 const IconComponent = iconMap[iconName];
                                 
                                 if (IconComponent) {
                                   return (
                                     <div className="w-7 h-[18px] flex items-center justify-center flex-shrink-0">
                                       <IconComponent 
                                         className={cn(
                                           "w-5 h-5 transition-all duration-200",
                                           item.items.some(({ url }) => url === pathname) 
                                             ? "text-white" 
                                             : "text-[#717171] group-hover:text-white"
                                         )}
                                         strokeWidth={1.5}
                                       />
                                     </div>
                                   );
                                 } else if (iconName.startsWith('/')) {
                                   return (
                                     <Image
                                       src={iconName}
                                       alt={item.title}
                                       width={32}
                                       height={20}
                                       className={cn(
                                         "w-8 h-5 flex-shrink-0 object-contain transition-all duration-200",
                                         item.items.some(({ url }) => url === pathname) 
                                           ? "brightness-0 invert" 
                                           : "group-hover:brightness-0 group-hover:invert"
                                       )}
                                     />
                                   );
                                 }
                                 return null;
                               })()}
                               {isOpen && (
                                 <span className={cn(
                                   "text-sm font-medium",
                                   item.items.some(({ url }) => url === pathname) 
                                     ? "!text-white" 
                                     : "text-gray-700 dark:text-gray-200 group-hover:!text-white"
                                 )}>
                                   {item.title}
                                 </span>
                               )}
                            </MenuItem>
                             
                           </>
                        ) : (
                          (() => {
                            const href =
                              'url' in item && item.url
                                ? item.url + ''
                                : '/' + item.title.toLowerCase().split(' ').join('-');

                            return (
                               <>
                              <MenuItem
                                   className={cn(
                                     "flex items-center py-3 transition-all duration-200 hover:!bg-black hover:!text-white",
                                     isOpen ? "justify-start gap-3 px-3" : "justify-center",
                                     pathname === href && "!bg-black !text-white"
                                   )}
                                as="link"
                                href={href}
                                   isActive={false}
                                 >
                                   {(() => {
                                     const iconName = typeof item.icon === 'string' ? item.icon : '';
                                     const IconComponent = iconMap[iconName];
                                     
                                     if (IconComponent) {
                                       return (
                                         <div className="w-7 h-[18px] flex items-center justify-center flex-shrink-0">
                                           <IconComponent 
                                             className={cn(
                                               "w-5 h-5 transition-all duration-200",
                                               pathname === href 
                                                 ? "text-white" 
                                                 : "text-[#717171] group-hover:text-white"
                                             )}
                                             strokeWidth={1.5}
                                           />
                                         </div>
                                       );
                                     } else if (iconName.startsWith('/')) {
                                       return (
                                         <Image
                                           src={iconName}
                                           alt={item.title}
                                           width={32}
                                           height={20}
                                           className={cn(
                                             "w-8 h-5 flex-shrink-0 object-contain transition-all duration-200",
                                             pathname === href 
                                               ? "brightness-0 invert" 
                                               : "group-hover:brightness-0 group-hover:invert"
                                           )}
                                         />
                                       );
                                     }
                                     return null;
                                   })()}
                                   {isOpen && (
                                     <span className={cn(
                                       "text-sm font-medium",
                                       pathname === href 
                                         ? "!text-white" 
                                         : "text-gray-700 dark:text-gray-200 group-hover:!text-white"
                                     )}>
                                       {item.title}
                                     </span>
                                   )}
                              </MenuItem>
                                 
                               </>
                            );
                          })()
                        )}
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
            ))}
          </div>
        </div>
      </aside>

      {/* Popup Portal - renders outside sidebar */}
      {hoveredItem && !isOpen && (
        <div
          className="fixed z-[99999] pointer-events-none"
          style={{
            left: `${hoveredItem.rect.right + 12}px`,
            top: `${hoveredItem.rect.top + hoveredItem.rect.height / 2}px`,
            transform: 'translateY(-50%)',
          }}
        >
          <div className="flex items-center gap-0 animate-in fade-in duration-200">
            {/* Arrow pointing left */}
            <div className="w-0 h-0 border-t-[6px] border-t-transparent border-r-[8px] border-r-black border-b-[6px] border-b-transparent"></div>
            {/* Popup content */}
            <div className="px-4 py-2 bg-black text-white text-sm font-medium rounded-lg shadow-2xl whitespace-nowrap">
              {hoveredItem.title}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
