// "use client";
// import React, { useEffect, useRef, useState, useCallback } from "react";
// import Link from "next/link";
// import Image from "next/image";
// import { usePathname } from "next/navigation";
// import { useSidebar } from "../context/SidebarContext";
// import {
//   ChevronDownIcon,
//   HorizontaLDots,
//   ListIcon,
//   PlugInIcon,
// } from "../icons/index";
// import SidebarWidget from "./SidebarWidget";

// import { usePermissions } from "@/hooks/usePermissions";
// import { hasPermission } from "@/utils/hasPermission";

// type SubItem = {
//   name: string;
//   path: string;
//   pro?: boolean;
//   new?: boolean;
//   permission?: string;
// };

// type NavItem = {
//   name: string;
//   icon: React.ReactNode;
//   path?: string;
//   permission?: string;
//   subItems?: SubItem[];
// };

// const navItems: NavItem[] = [
//   {
//     name: "Forms",
//     icon: <ListIcon />,
//     subItems: [{ name: "Form Elements", path: "/backend/form-elements", permission: "view-forms" }],
//   },
//   {
//     name: "Settings",
//     icon: <PlugInIcon />,
//     subItems: [
//       { name: "Data Users", path: "/backend/users", permission: "view-users" },
//       { name: "Roles", path: "/backend/roles", permission: "view-roles" },
//       { name: "Permissions", path: "/backend/permissions", permission: "view-permissions" },
//     ],
//   },
// ];

// // Filter nav items sesuai permission
// function filterNavItemsByPermission(navItems: NavItem[], userPermissions: string[]): NavItem[] {
//   return navItems
//     .map((item) => {
//       if (item.subItems) {
//         const filteredSubs = item.subItems.filter(
//           (sub) => sub.permission && hasPermission(userPermissions, sub.permission)
//         );
//         if (filteredSubs.length === 0) return null;
//         return { ...item, subItems: filteredSubs };
//       }
//       if (!item.permission || !hasPermission(userPermissions, item.permission)) return null;
//       return item;
//     })
//     .filter(Boolean) as NavItem[];
// }

// const AppSidebar: React.FC = () => {
//   const { isExpanded, isMobileOpen, isHovered, setIsHovered } = useSidebar();
//   const pathname = usePathname();

//   const { permissions: userPermissions = [], loading: permissionsLoading } = usePermissions();

//   const [openSubmenu, setOpenSubmenu] = useState<{ type: "main" | "others"; index: number } | null>(null);
//   const [subMenuHeight, setSubMenuHeight] = useState<Record<string, number>>({});
//   const subMenuRefs = useRef<Record<string, HTMLDivElement | null>>({});

//   const isActive = useCallback((path: string) => path === pathname, [pathname]);

//   const filteredNavItems = filterNavItemsByPermission(navItems, userPermissions);

//   const MenuSkeleton = () => (
//     <ul className="flex flex-col gap-4 animate-pulse">
//       {Array.from({ length: 5 }).map((_, idx) => (
//         <li key={idx} className="h-6 bg-gray-200 dark:bg-gray-700 rounded-md w-full"></li>
//       ))}
//     </ul>
//   );

//   useEffect(() => {
//     if (openSubmenu !== null) {
//       const key = `${openSubmenu.type}-${openSubmenu.index}`;
//       if (subMenuRefs.current[key]) {
//         setSubMenuHeight((prev) => ({
//           ...prev,
//           [key]: subMenuRefs.current[key]?.scrollHeight || 0,
//         }));
//       }
//     }
//   }, [openSubmenu]);

//   const handleSubmenuToggle = (index: number, menuType: "main" | "others") => {
//     setOpenSubmenu((prev) =>
//       prev && prev.type === menuType && prev.index === index ? null : { type: menuType, index }
//     );
//   };

//   const renderMenuItems = (navItems: NavItem[], menuType: "main" | "others") => (
//     <ul className="flex flex-col gap-4">
//       {navItems.map((nav, index) => (
//         <li key={nav.name}>
//           {nav.subItems ? (
//             <>
//               <button
//                 onClick={() => handleSubmenuToggle(index, menuType)}
//                 className={`menu-item group ${
//                   openSubmenu?.type === menuType && openSubmenu?.index === index
//                     ? "menu-item-active"
//                     : "menu-item-inactive"
//                 } cursor-pointer ${!isExpanded && !isHovered ? "lg:justify-center" : "lg:justify-start"}`}
//               >
//                 <span
//                   className={`${
//                     openSubmenu?.type === menuType && openSubmenu?.index === index
//                       ? "menu-item-icon-active"
//                       : "menu-item-icon-inactive"
//                   }`}
//                 >
//                   {nav.icon}
//                 </span>
//                 {(isExpanded || isHovered || isMobileOpen) && <span className="menu-item-text">{nav.name}</span>}
//                 {(isExpanded || isHovered || isMobileOpen) && (
//                   <ChevronDownIcon
//                     className={`ml-auto w-5 h-5 transition-transform duration-200 ${
//                       openSubmenu?.type === menuType && openSubmenu?.index === index ? "rotate-180 text-brand-500" : ""
//                     }`}
//                   />
//                 )}
//               </button>
//               {(isExpanded || isHovered || isMobileOpen) && (
//                 <div
//                   ref={(el) => {
//                     subMenuRefs.current[`${menuType}-${index}`] = el;
//                   }}
//                   className="overflow-hidden transition-all duration-300"
//                   style={{
//                     height:
//                       openSubmenu?.type === menuType && openSubmenu?.index === index
//                         ? `${subMenuHeight[`${menuType}-${index}`]}px`
//                         : "0px",
//                   }}
//                 >
//                   <ul className="mt-2 space-y-1 ml-9">
//                     {nav.subItems.map((subItem) => (
//                       <li key={subItem.name}>
//                         <Link
//                           href={subItem.path}
//                           className={`menu-dropdown-item ${
//                             isActive(subItem.path) ? "menu-dropdown-item-active" : "menu-dropdown-item-inactive"
//                           }`}
//                         >
//                           {subItem.name}
//                         </Link>
//                       </li>
//                     ))}
//                   </ul>
//                 </div>
//               )}
//             </>
//           ) : (
//             nav.path && (
//               <Link
//                 href={nav.path}
//                 className={`menu-item group ${isActive(nav.path) ? "menu-item-active" : "menu-item-inactive"}`}
//               >
//                 <span className={`${isActive(nav.path) ? "menu-item-icon-active" : "menu-item-icon-inactive"}`}>
//                   {nav.icon}
//                 </span>
//                 {(isExpanded || isHovered || isMobileOpen) && <span className="menu-item-text">{nav.name}</span>}
//               </Link>
//             )
//           )}
//         </li>
//       ))}
//     </ul>
//   );

//   return (
//     <aside
//       className={`fixed mt-16 flex flex-col lg:mt-0 top-0 px-5 left-0 bg-white dark:bg-gray-900 dark:border-gray-800 text-gray-900 h-screen transition-all duration-300 ease-in-out z-50 border-r border-gray-200 ${
//         isExpanded || isMobileOpen ? "w-[290px]" : isHovered ? "w-[290px]" : "w-[90px]"
//       } ${isMobileOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
//       onMouseEnter={() => !isExpanded && setIsHovered(true)}
//       onMouseLeave={() => setIsHovered(false)}
//     >
//       <div className={`py-8 flex ${!isExpanded && !isHovered ? "lg:justify-center" : "justify-start"}`}>
//         <Link href="/">
//           {isExpanded || isHovered || isMobileOpen ? (
//             <>
//               <Image className="dark:hidden" src="/images/logo/logo.svg" alt="Logo" width={150} height={40} />
//               <Image className="hidden dark:block" src="/images/logo/logo-dark.svg" alt="Logo" width={150} height={40} />
//             </>
//           ) : (
//             <Image src="/images/logo/logo-icon.svg" alt="Logo" width={32} height={32} />
//           )}
//         </Link>
//       </div>

//       <div className="flex flex-col overflow-y-auto duration-300 ease-linear no-scrollbar">
//         <nav className="mb-6">
//           <div className="flex flex-col gap-4">
//             <div>
//               <h2 className={`mb-4 text-xs uppercase flex leading-[20px] text-gray-400 ${!isExpanded && !isHovered ? "lg:justify-center" : "justify-start"}`}>
//                 {isExpanded || isHovered || isMobileOpen ? "Menu" : <HorizontaLDots />}
//               </h2>
//               {permissionsLoading ? <MenuSkeleton /> : renderMenuItems(filteredNavItems, "main")}
//             </div>
//           </div>
//         </nav>
//         {isExpanded || isHovered || isMobileOpen ? <SidebarWidget /> : null}
//       </div>
//     </aside>
//   );
// };

// export default AppSidebar;

"use client";
import React, { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useSidebar } from "../context/SidebarContext";
import {
  ChevronDownIcon,
  HorizontaLDots,
  ListIcon,
  PlugInIcon,
  BoxCubeIcon,
  EnvelopeIcon,
  GroupIcon,
  ChatIcon
} from "../icons/index";
import SidebarWidget from "./SidebarWidget";

// import { usePermissions } from "@/hooks/usePermissions";
import { usePermissions } from "@/context/PermissionsContext";
import { hasPermission } from "@/utils/hasPermission";

type SubItem = {
  name: string;
  path: string;
  pro?: boolean;
  new?: boolean;
  permission?: string;
};

type NavItem = {
  name: string;
  icon: React.ReactNode;
  path?: string;
  permission?: string;
  subItems?: SubItem[];
};

const navItems: NavItem[] = [
  {
    icon: <BoxCubeIcon />,
    name: "Portofolio",
    path: "/backend/portofolio",
  },
  {
    icon: <EnvelopeIcon />,
    name: "Kontak",
    path: "/backend/kontak",
  },
  {
    icon:  <GroupIcon />,
    name: "Tim",
    path: "/backend/tim",
  },
  {
    icon:  <ChatIcon />,
    name: "Chat",
    path: "/backend/chat",
  },
  // {
  //   name: "Forms",
  //   icon: <ListIcon />,
  //   subItems: [
  //     {
  //       name: "Form Elements",
  //       path: "/backend/form-elements",
  //       permission: "view-forms",
  //     },
  //   ],
  // },
  {
    name: "Settings",
    icon: <PlugInIcon />,
    subItems: [
      { name: "Data Users", path: "/backend/users", permission: "view-users" },
      { name: "Roles", path: "/backend/roles", permission: "view-roles" },
      {
        name: "Permissions",
        path: "/backend/permissions",
        permission: "view-permissions",
      },
    ],
  },
];

// ==========================
// Filter nav items by permissions
// ==========================
function filterNavItemsByPermission(
  navItems: NavItem[],
  userPermissions: string[]
): NavItem[] {
  return navItems
    .map((item) => {
      if (item.subItems) {
        const filteredSubs = item.subItems.filter(
          (sub) =>
            !sub.permission || hasPermission(userPermissions, sub.permission)
        );
        if (filteredSubs.length === 0) return null;
        return { ...item, subItems: filteredSubs };
      }
      if (item.permission && !hasPermission(userPermissions, item.permission)) {
        return null;
      }
      return item;
    })
    .filter(Boolean) as NavItem[];
}

const AppSidebar: React.FC = () => {
  const { isExpanded, isMobileOpen, isHovered, setIsHovered } = useSidebar();
  const pathname = usePathname();

  const {
    permissions: userPermissions = [],
    loading: permissionsLoading,
  } = usePermissions();

  const [openSubmenu, setOpenSubmenu] = useState<{
    type: "main" | "others";
    index: number;
  } | null>(null);
  const [subMenuHeight, setSubMenuHeight] = useState<Record<string, number>>(
    {}
  );
  const subMenuRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const isActive = useCallback((path: string) => path === pathname, [pathname]);

  // hanya filter kalau data sudah siap
  const filteredNavItems = !permissionsLoading
    ? filterNavItemsByPermission(navItems, userPermissions)
    : [];

  const MenuSkeleton = () => (
    <ul className="flex flex-col gap-4 animate-pulse">
      {Array.from({ length: 5 }).map((_, idx) => (
        <li
          key={idx}
          className="h-6 bg-gray-200 dark:bg-gray-700 rounded-md w-full"
        ></li>
      ))}
    </ul>
  );

  useEffect(() => {
    if (openSubmenu !== null) {
      const key = `${openSubmenu.type}-${openSubmenu.index}`;
      if (subMenuRefs.current[key]) {
        setSubMenuHeight((prev) => ({
          ...prev,
          [key]: subMenuRefs.current[key]?.scrollHeight || 0,
        }));
      }
    }
  }, [openSubmenu]);

  const handleSubmenuToggle = (
    index: number,
    menuType: "main" | "others"
  ) => {
    setOpenSubmenu((prev) =>
      prev && prev.type === menuType && prev.index === index
        ? null
        : { type: menuType, index }
    );
  };

  const renderMenuItems = (navItems: NavItem[], menuType: "main" | "others") => (
    <ul className="flex flex-col gap-4">
      {navItems.map((nav, index) => (
        <li key={nav.name}>
          {nav.subItems ? (
            <>
              <button
                onClick={() => handleSubmenuToggle(index, menuType)}
                className={`menu-item group ${
                  openSubmenu?.type === menuType &&
                  openSubmenu?.index === index
                    ? "menu-item-active"
                    : "menu-item-inactive"
                } cursor-pointer ${
                  !isExpanded && !isHovered
                    ? "lg:justify-center"
                    : "lg:justify-start"
                }`}
              >
                <span
                  className={`${
                    openSubmenu?.type === menuType &&
                    openSubmenu?.index === index
                      ? "menu-item-icon-active"
                      : "menu-item-icon-inactive"
                  }`}
                >
                  {nav.icon}
                </span>
                {(isExpanded || isHovered || isMobileOpen) && (
                  <span className="menu-item-text">{nav.name}</span>
                )}
                {(isExpanded || isHovered || isMobileOpen) && (
                  <ChevronDownIcon
                    className={`ml-auto w-5 h-5 transition-transform duration-200 ${
                      openSubmenu?.type === menuType &&
                      openSubmenu?.index === index
                        ? "rotate-180 text-brand-500"
                        : ""
                    }`}
                  />
                )}
              </button>
              {(isExpanded || isHovered || isMobileOpen) && (
                <div
                  ref={(el) => {
                    subMenuRefs.current[`${menuType}-${index}`] = el;
                  }}
                  className="overflow-hidden transition-all duration-300"
                  style={{
                    height:
                      openSubmenu?.type === menuType &&
                      openSubmenu?.index === index
                        ? `${subMenuHeight[`${menuType}-${index}`]}px`
                        : "0px",
                  }}
                >
                  <ul className="mt-2 space-y-1 ml-9">
                    {nav.subItems.map((subItem) => (
                      <li key={subItem.name}>
                        <Link
                          href={subItem.path}
                          className={`menu-dropdown-item ${
                            isActive(subItem.path)
                              ? "menu-dropdown-item-active"
                              : "menu-dropdown-item-inactive"
                          }`}
                        >
                          {subItem.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </>
          ) : (
            nav.path && (
              <Link
                href={nav.path}
                className={`menu-item group ${
                  isActive(nav.path)
                    ? "menu-item-active"
                    : "menu-item-inactive"
                }`}
              >
                <span
                  className={`${
                    isActive(nav.path)
                      ? "menu-item-icon-active"
                      : "menu-item-icon-inactive"
                  }`}
                >
                  {nav.icon}
                </span>
                {(isExpanded || isHovered || isMobileOpen) && (
                  <span className="menu-item-text">{nav.name}</span>
                )}
              </Link>
            )
          )}
        </li>
      ))}
    </ul>
  );

  return (
    <aside
      className={`fixed mt-16 flex flex-col lg:mt-0 top-0 px-5 left-0 bg-white dark:bg-gray-900 dark:border-gray-800 text-gray-900 h-screen transition-all duration-300 ease-in-out z-50 border-r border-gray-200 ${
        isExpanded || isMobileOpen
          ? "w-[290px]"
          : isHovered
          ? "w-[290px]"
          : "w-[90px]"
      } ${isMobileOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
      onMouseEnter={() => !isExpanded && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Logo */}
      <div
        className={`py-8 flex ${
          !isExpanded && !isHovered ? "lg:justify-center" : "justify-start"
        }`}
      >
        <Link href="/">
          {isExpanded || isHovered || isMobileOpen ? (
            <>
              <Image
                className="dark:hidden"
                src="/images/logo/logo.svg"
                alt="Logo"
                width={150}
                height={40}
              />
              <Image
                className="hidden dark:block"
                src="/images/logo/logo-dark.svg"
                alt="Logo"
                width={150}
                height={40}
              />
            </>
          ) : (
            <Image
              src="/images/logo/logo-icon.svg"
              alt="Logo"
              width={32}
              height={32}
            />
          )}
        </Link>
      </div>

      {/* Menu */}
      <div className="flex flex-col overflow-y-auto duration-300 ease-linear no-scrollbar">
        <nav className="mb-6">
          <div className="flex flex-col gap-4">
            <div>
              <h2
                className={`mb-4 text-xs uppercase flex leading-[20px] text-gray-400 ${
                  !isExpanded && !isHovered
                    ? "lg:justify-center"
                    : "justify-start"
                }`}
              >
                {isExpanded || isHovered || isMobileOpen ? "Menu" : <HorizontaLDots />}
              </h2>

              {/* Loading skeleton / menu */}
              {permissionsLoading ? (
                <MenuSkeleton />
              ) : filteredNavItems.length > 0 ? (
                renderMenuItems(filteredNavItems, "main")
              ) : (
                <p className="text-sm text-gray-400">No menu available</p>
              )}
            </div>
          </div>
        </nav>
        {isExpanded || isHovered || isMobileOpen ? <SidebarWidget /> : null}
      </div>
    </aside>
  );
};

export default AppSidebar;
