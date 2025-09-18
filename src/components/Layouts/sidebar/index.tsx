'use client';

import Image from 'next/image';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { NAV_DATA } from './data';
import { ArrowLeftIcon } from './icons';
import { MenuItem } from './menu-item';
import { useSidebarContext } from './sidebar-context';
import { Logo } from '@/components/logo';

export function Sidebar() {
  const pathname = usePathname();
  const { setIsOpen, isOpen, isMobile, toggleSidebar } = useSidebarContext();
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const toggleExpanded = (title: string) => {
    setExpandedItems((prev) => (prev.includes(title) ? [] : [title]));
  };

  useEffect(() => {
    NAV_DATA.some((section) => {
      return section.items.some((item) => {
        return item.items.some((subItem) => {
          if (subItem.url === pathname) {
            if (!expandedItems.includes(item.title)) {
              toggleExpanded(item.title);
            }
            return true;
          }
        });
      });
    });
  }, [pathname]);

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
          'max-w-[90px] overflow-hidden border-r border-gray-200 bg-white transition-[width] duration-200 ease-linear dark:border-gray-800 dark:bg-gray-dark',
          isMobile ? 'fixed bottom-0 top-0 z-50' : 'sticky top-0 h-screen',
          isOpen ? 'w-full' : 'w-0'
        )}
        aria-label="Main navigation"
        aria-hidden={!isOpen}
        inert={!isOpen}
      >
        <div className="flex h-full flex-col py-6 px-3">
          {/* Dummy Logo */}
          <div className="relative flex justify-center">
            <Link
              href="/"
              onClick={() => isMobile && toggleSidebar()}
              className="py-2.5"
            >
            </Link>
        <Logo/>

            {isMobile && (
              <button
                onClick={toggleSidebar}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-right"
              >
                <span className="sr-only">Close Menu</span>
                <ArrowLeftIcon className="ml-auto size-7" />
              </button>
            )}
          </div>

          {/* Navigation */}
          <div className="custom-scrollbar mt-6 flex-1 overflow-y-auto">
            {NAV_DATA.map((section) => (
              <div key={section.label} className="mb-6">
                <nav role="navigation" aria-label={section.label}>
                  <ul className="space-y-2">
                    {section.items.map((item) => (
                      <li key={item.title}>
                        {item.items.length ? (
                          <div>
                            <MenuItem
                              className="flex items-center justify-center py-3"
                              isActive={item.items.some(
                                ({ url }) => url === pathname
                              )}
                              onClick={() => toggleExpanded(item.title)}
                            >
                              <item.icon className="size-6" aria-hidden="true" />
                            </MenuItem>
                          </div>
                        ) : (
                          (() => {
                            const href =
                              'url' in item
                                ? item.url + ''
                                : '/' + item.title.toLowerCase().split(' ').join('-');

                            return (
                              <MenuItem
                                className="flex justify-center py-3"
                                as="link"
                                href={href}
                                isActive={pathname === href}
                              >
                                <item.icon className="size-6" aria-hidden="true" />
                              </MenuItem>
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
    </>
  );
}
