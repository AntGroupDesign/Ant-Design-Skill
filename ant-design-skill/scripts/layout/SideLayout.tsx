import React, { useState, useEffect, useRef } from 'react';
import { Avatar, Button } from 'antd';
import {
  AppstoreOutlined,
  BarChartOutlined,
  BellOutlined,
  DatabaseOutlined,
  DownOutlined,
  LeftOutlined,
  QuestionCircleOutlined,
  SafetyCertificateOutlined,
  SettingOutlined,
  TeamOutlined,
} from '@ant-design/icons';
import '../../references/global-style.css';

interface MenuItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  children?: string[];
}

interface MenuSection {
  title?: string;
  items: MenuItem[];
}

interface SideLayoutProps {
  children?: React.ReactNode;
  pageTitle?: React.ReactNode;
  pageSubtitle?: React.ReactNode;
}

const SideLayout: React.FC<SideLayoutProps> = ({ children, pageTitle, pageSubtitle }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [openMenus, setOpenMenus] = useState<Set<string>>(new Set(['menu2']));
  const [activeMenu, setActiveMenu] = useState('侧边菜单 1');
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [popoverVisible, setPopoverVisible] = useState(false);
  const [popoverContent, setPopoverContent] = useState<string[]>([]);
  const popoverTimerRef = useRef<number | null>(null);

  const sidebarSections: MenuSection[] = [
    {
      title: '核心功能',
      items: [
        { id: 'menu1', label: '侧边菜单 1', icon: <AppstoreOutlined className="side-icon" />, children: [] },
        { id: 'menu2', label: '侧边菜单 2', icon: <DatabaseOutlined className="side-icon" />, children: ['子菜单 2-1', '子菜单 2-2', '子菜单 2-3'] },
        { id: 'menu3', label: '侧边菜单 3', icon: <BarChartOutlined className="side-icon" />, children: ['子菜单 3-1', '子菜单 3-2', '子菜单 3-3'] },
      ],
    },
    {
      title: '系统管理',
      items: [
        { id: 'menu4', label: '侧边菜单 4', icon: <TeamOutlined className="side-icon" />, children: ['子菜单 4-1', '子菜单 4-2', '子菜单 4-3'] },
        { id: 'menu5', label: '侧边菜单 5', icon: <SafetyCertificateOutlined className="side-icon" />, children: [] },
        { id: 'menu6', label: '侧边菜单 6', icon: <SettingOutlined className="side-icon" />, children: [] },
      ],
    },
  ];

  const sidebarMenuItems = sidebarSections.flatMap((section) => section.items);

  const userActions = ['个人资料', '意见反馈', '退出登录'];

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  const toggleMenu = (menuId: string) => {
    const newOpenMenus = new Set(openMenus);
    if (newOpenMenus.has(menuId)) {
      newOpenMenus.delete(menuId);
    } else {
      newOpenMenus.add(menuId);
    }
    setOpenMenus(newOpenMenus);
  };

  const handleMenuClick = (label: string) => {
    setActiveMenu(label);
  };

  const toggleUserMenu = (e: React.MouseEvent) => {
    e.stopPropagation();
    setUserMenuOpen(!userMenuOpen);
  };

  const hidePopover = () => {
    if (popoverTimerRef.current) {
      clearTimeout(popoverTimerRef.current);
    }
    setPopoverVisible(false);
    setPopoverContent([]);
  };

  const scheduleHidePopover = () => {
    if (popoverTimerRef.current) {
      clearTimeout(popoverTimerRef.current);
    }
    popoverTimerRef.current = window.setTimeout(hidePopover, 120);
  };

  const showPopover = (menuId: string) => {
    if (!collapsed) return;
    const menu = sidebarMenuItems.find(m => m.id === menuId);
    if (!menu || !menu.children || menu.children.length === 0) return;

    if (popoverTimerRef.current) {
      clearTimeout(popoverTimerRef.current);
    }

    setPopoverContent(menu.children);
    setPopoverVisible(true);

    const button = document.querySelector(`[data-menu-id="${menuId}"]`);
    if (button) {
      const rect = button.getBoundingClientRect();
      const popover = document.getElementById('collapsedPopover');
      if (popover) {
        popover.style.left = `${rect.right + 12}px`;
        popover.style.top = `${rect.top}px`;
      }
    }
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('.user-actions')) {
        setUserMenuOpen(false);
      }
      if (!target.closest('.side-menu') && !target.closest('#collapsedPopover')) {
        hidePopover();
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
      if (popoverTimerRef.current) {
        clearTimeout(popoverTimerRef.current);
      }
    };
  }, []);

  return (
    <div
      className={`side-layout ${collapsed ? 'is-collapsed' : ''}`}
    >
      {/* 页面背景 */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: -1,
          background: 'var(--nav-color-bg-canvas)',
        }}
      />

      {/* 固定顶部栏 */}
      <header className="topbar">
        <div className="topbar-left">
          <div className="brand">
            <AppstoreOutlined className="logo-mark" />
            <span className="brand-name">Ant Design</span>
          </div>
        </div>
      </header>

      <button className="collapse-trigger" onClick={toggleSidebar} aria-label={collapsed ? '展开侧边栏' : '收起侧边栏'}>
        <LeftOutlined className="collapse-icon" />
      </button>

      {/* 侧边栏 */}
      <aside className="sidebar">
        <nav className="side-menu">
          {sidebarSections.map((section, sectionIndex) => (
            <section className="side-section" key={section.title || sectionIndex}>
              {section.title && <h2 className="side-section-title">{section.title}</h2>}
              {section.items.map((item) => {
            const hasChildren = item.children && item.children.length > 0;
            const isOpen = openMenus.has(item.id) || (hasChildren && item.children!.includes(activeMenu));
            const isActive = item.label === activeMenu;
            const hasActiveChild = hasChildren && item.children!.includes(activeMenu);

            return (
              <div
                key={item.id}
                className={`side-item ${isOpen ? 'is-open' : ''}`}
              >
                <button
                  className={`side-link ${isActive ? 'is-active' : ''} ${hasActiveChild ? 'has-active-child' : ''}`}
                  data-menu-id={item.id}
                  data-toggle={hasChildren ? 'true' : 'false'}
                  onClick={() => {
                    if (hasChildren) {
                      toggleMenu(item.id);
                    }
                    handleMenuClick(item.label);
                  }}
                  onMouseEnter={() => hasChildren && showPopover(item.id)}
                  onMouseLeave={scheduleHidePopover}
                >
                  {item.icon}
                  <span className="side-text">{item.label}</span>
                  {hasChildren && <DownOutlined className="side-arrow" />}
                </button>
                {hasChildren && (
                  <div className="submenu">
                    {item.children!.map((child) => (
                      <button
                        key={child}
                        className={child === activeMenu ? 'is-active' : ''}
                        onClick={() => handleMenuClick(child)}
                      >
                        {child}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
              })}
            </section>
          ))}
        </nav>

        <div className="user-actions">
          <Avatar size={32} className="avatar" onClick={toggleUserMenu}>U</Avatar>
          <span className="user-name">用户名</span>
          <div className="user-action-icons">
            <Button type="text" className="icon-button" aria-label="消息通知" icon={<BellOutlined />} />
            <Button type="text" className="icon-button" aria-label="帮助文档" icon={<QuestionCircleOutlined />} />
          </div>
          <div className={`user-menu ${userMenuOpen ? 'is-open' : ''}`}>
            {userActions.map((action) => (
              <button key={action}>{action}</button>
            ))}
          </div>
        </div>
      </aside>

      {/* 收起后子菜单气泡 */}
      <div
        id="collapsedPopover"
        className={`collapsed-submenu-popover ${popoverVisible ? 'is-visible' : ''}`}
        onMouseEnter={() => {
          if (popoverTimerRef.current) {
            clearTimeout(popoverTimerRef.current);
          }
        }}
        onMouseLeave={scheduleHidePopover}
      >
        {popoverContent.map((item) => (
          <button
            key={item}
            className={item === activeMenu ? 'is-active' : ''}
            onClick={() => handleMenuClick(item)}
          >
            {item}
          </button>
        ))}
      </div>

      {/* 主内容区 */}
      <main className="content">
        {(pageTitle || pageSubtitle) && (
          <div className="page-head">
            <div className="page-title">
              {pageTitle && <h1>{pageTitle}</h1>}
              {pageSubtitle && <p>{pageSubtitle}</p>}
            </div>
          </div>
        )}
        {children}
      </main>

      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .side-layout {
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC", "Microsoft YaHei", sans-serif;
          min-height: 100vh;
          position: relative;
          isolation: isolate;
          overflow: hidden;
        }

        /* 固定顶部栏 */
        .topbar {
          position: fixed;
          inset: 0 auto auto 0;
          z-index: var(--nav-z-index-base);
          display: flex;
          align-items: center;
          justify-content: flex-start;
          width: var(--nav-sider-width);
          height: var(--nav-header-height);
          padding: 0 var(--nav-space-4);
          border-bottom: 1px solid var(--nav-color-border-light);
          border-right: 1px solid var(--nav-color-sider-divider);
          background: var(--nav-color-bg-canvas);
          box-sizing: border-box;
          overflow: hidden;
          transition: width var(--nav-transition);
        }

        .side-layout.is-collapsed .topbar {
          width: var(--nav-sider-collapsed-width);
        }

        .topbar-left {
          display: flex;
          align-items: center;
          min-width: 0;
          width: 100%;
        }

        .brand {
          display: flex;
          align-items: center;
          gap: var(--nav-space-2);
          color: var(--nav-color-text-active);
          font-size: 16px;
          font-weight: 400;
          line-height: 24px;
          white-space: nowrap;
          min-width: 0;
          max-width: 100%;
          overflow: hidden;
        }

        .logo-mark {
          width: 24px;
          height: 24px;
          font-size: 24px;
          color: var(--nav-color-primary);
          flex: 0 0 24px;
        }

        .brand-name {
          min-width: 0;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .side-layout.is-collapsed .brand-name {
          display: none;
        }

        .side-layout.is-collapsed .brand {
          justify-content: center;
          width: 100%;
          gap: 0;
        }

        .side-layout.is-collapsed .topbar {
          justify-content: center;
          padding: 0;
        }

        /* 侧边栏 */
        .sidebar {
          position: fixed;
          top: var(--nav-header-height);
          bottom: 0;
          left: 0;
          z-index: var(--nav-z-index-base);
          width: var(--nav-sider-width);
          overflow: visible;
          background: var(--nav-color-sider);
          border-right: 1px solid var(--nav-color-sider-divider);
          color: var(--nav-color-sider-text);
          box-sizing: border-box;
          transition: width var(--nav-transition);
        }

        .side-layout.is-collapsed .sidebar {
          width: var(--nav-sider-collapsed-width);
        }

        /* 收起触发器 */
        .collapse-trigger {
          position: fixed;
          top: calc(var(--nav-header-height) + var(--nav-space-5));
          left: calc(var(--nav-sider-width) - 12px);
          z-index: var(--nav-z-index-trigger);
          width: 24px;
          height: 24px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border: 1px solid var(--nav-color-border);
          border-radius: var(--nav-radius-pill);
          background: var(--nav-color-surface);
          color: var(--nav-color-sider-text);
          box-shadow: var(--nav-shadow-dropdown);
          cursor: pointer;
          transition: left var(--nav-transition), background var(--nav-transition), color var(--nav-transition);
        }

        .side-layout.is-collapsed .collapse-trigger {
          left: calc(var(--nav-sider-collapsed-width) - 12px);
        }

        .collapse-trigger:hover {
          background: var(--nav-color-primary-bg);
          color: var(--nav-color-primary);
        }

        .collapse-icon {
          font-size: 10px;
          transition: transform var(--nav-transition);
        }

        .side-layout.is-collapsed .collapse-icon {
          transform: rotate(180deg);
        }

        /* 侧边菜单 */
        .side-menu {
          height: 100%;
          padding: var(--nav-space-3) var(--nav-space-2) calc(60px + var(--nav-space-3));
          box-sizing: border-box;
          overflow-y: auto;
          overflow-x: hidden;
        }

        .side-section + .side-section {
          margin-top: var(--nav-space-3);
          padding-top: var(--nav-space-3);
          border-top: 1px solid var(--nav-color-border-light);
        }

        .side-section-title {
          width: 100%;
          height: 40px;
          display: flex;
          align-items: center;
          margin: 0;
          padding: 0 var(--nav-space-4);
          border-radius: var(--nav-radius-sm);
          background: transparent;
          color: var(--nav-color-text-secondary);
          font-size: 12px;
          font-weight: 400;
          line-height: 20px;
        }

        .side-item {
          margin-bottom: 0;
        }

        .side-link {
          display: flex;
          align-items: center;
          width: 100%;
          min-height: 40px;
          padding: 0 var(--nav-space-4);
          border: 0;
          border-radius: var(--nav-radius-sm);
          background: transparent;
          color: var(--nav-color-sider-text);
          font-size: var(--font-size-sm);
          text-align: left;
          white-space: nowrap;
          box-sizing: border-box;
          overflow: hidden;
          cursor: pointer;
          transition: all var(--nav-transition);
        }

        .side-link:hover {
          background: var(--nav-color-sider-hover);
          color: var(--nav-color-sider-text-active);
        }

        .side-link.is-active {
          background: var(--nav-color-sider-active);
          color: var(--nav-color-sider-text-active);
        }

        .side-link.has-active-child {
          color: var(--nav-color-sider-text-active);
        }

        .side-link[data-toggle="true"] {
          padding-right: var(--nav-space-4);
        }

        .side-icon {
          width: 16px;
          height: 16px;
          font-size: 16px;
          flex-shrink: 0;
        }

        .side-link.has-active-child .side-icon,
        .side-link.is-active .side-icon {
          color: var(--nav-color-sider-icon-active);
        }

        .side-text {
          flex: 1 1 auto;
          margin-left: var(--nav-space-2);
          min-width: 0;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .side-arrow {
          width: 12px;
          height: 12px;
          font-size: 12px;
          flex-shrink: 0;
          margin-left: auto;
          color: var(--color-text-quaternary);
          transition: transform var(--nav-transition);
        }

        .side-item.is-open .side-arrow {
          transform: rotate(180deg);
        }

        .submenu {
          display: none;
          margin: 0;
          padding: 0;
          border-radius: var(--nav-radius-sm);
        }

        .side-item.is-open .submenu {
          display: block;
        }

        .submenu button {
          display: block;
          width: 100%;
          min-height: 40px;
          padding: 0 var(--nav-space-3) 0 40px;
          border: 0;
          background: transparent;
          color: var(--nav-color-sider-text);
          font-size: var(--font-size-sm);
          text-align: left;
          white-space: nowrap;
          box-sizing: border-box;
          overflow: hidden;
          text-overflow: ellipsis;
          cursor: pointer;
          transition: all var(--nav-transition);
        }

        .submenu button:hover {
          border-radius: var(--nav-radius-sm);
          background: var(--nav-color-sider-hover);
          color: var(--nav-color-sider-text-active);
        }

        .submenu button.is-active {
          border-radius: var(--nav-radius-sm);
          background: var(--nav-color-sider-active);
          color: var(--nav-color-sider-text-active);
        }

        /* 收起状态 */
        .side-layout.is-collapsed .side-text,
        .side-layout.is-collapsed .side-section-title,
        .side-layout.is-collapsed .side-arrow,
        .side-layout.is-collapsed .submenu {
          display: none;
        }

        .side-layout.is-collapsed .side-section + .side-section {
          margin-top: var(--nav-space-3);
          padding-top: var(--nav-space-3);
        }

        .side-layout.is-collapsed .side-link {
          justify-content: center;
          padding: 0;
        }

        .side-layout.is-collapsed .side-link.is-active {
          background: var(--nav-color-sider-active);
        }

        .side-layout.is-collapsed .side-link .side-icon {
          margin: 0;
        }

        /* 收起后子菜单气泡 */
        .collapsed-submenu-popover {
          position: fixed;
          z-index: var(--nav-z-index-popup);
          display: none;
          min-width: 164px;
          padding: var(--nav-space-1);
          border: 1px solid var(--nav-color-border-light);
          border-radius: var(--nav-radius-sm);
          background: var(--nav-color-surface);
          box-shadow: var(--nav-shadow-dropdown);
          overflow: hidden;
        }

        .collapsed-submenu-popover.is-visible {
          display: block;
        }

        .collapsed-submenu-popover button {
          display: block;
          width: 100%;
          height: 32px;
          padding: 5px var(--nav-space-3);
          border: 0;
          border-radius: var(--nav-radius-sm);
          background: transparent;
          color: var(--nav-color-sider-text);
          font-size: var(--font-size-sm);
          line-height: calc(var(--font-size-sm) + 8px);
          text-align: left;
          white-space: nowrap;
          cursor: pointer;
          transition: all var(--nav-transition);
        }

        .collapsed-submenu-popover button:hover {
          background: var(--nav-color-option-active);
          color: var(--nav-color-sider-text-active);
        }

        .collapsed-submenu-popover button.is-active {
          background: var(--nav-color-option-selected);
          color: var(--nav-color-option-selected-text);
          font-weight: 600;
        }

        /* 用户操作区 */
        .user-actions {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 60px;
          display: flex;
          align-items: center;
          gap: var(--nav-space-2);
          padding: var(--nav-space-2) var(--nav-space-4);
          background: var(--nav-color-sider);
          box-sizing: border-box;
          overflow: hidden;
          z-index: 1;
        }

        .user-action-icons {
          margin-left: auto;
          display: inline-flex;
          align-items: center;
          gap: var(--nav-space-1);
          flex: 0 0 auto;
        }

        .avatar {
          flex: 0 0 32px;
          width: 32px;
          min-width: 32px;
          height: 32px;
          background: var(--nav-color-primary);
          color: var(--nav-color-surface);
          font-weight: 700;
          font-size: 12px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all var(--nav-transition);
        }

        .avatar:hover {
          opacity: 0.85;
        }

        .user-name {
          flex: 1 1 auto;
          min-width: 0;
          color: var(--nav-color-text-secondary);
          font-size: var(--font-size-sm);
          line-height: calc(var(--font-size-sm) + 8px);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .icon-button.ant-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 28px;
          height: 28px;
          min-width: 28px;
          padding: 0;
          border: 0;
          border-radius: var(--nav-radius-sm);
          background: transparent;
          color: var(--nav-color-sider-text-active);
          cursor: pointer;
          transition: all var(--nav-transition);
          flex-shrink: 0;
        }

        .icon-button.ant-btn:hover {
          background: var(--nav-color-primary-bg) !important;
          color: var(--nav-color-primary) !important;
        }

        .icon-button.ant-btn svg {
          width: 16px;
          height: 16px;
        }

        .icon-button.ant-btn .anticon {
          font-size: 16px;
          line-height: 1;
        }

        .user-menu {
          position: absolute;
          right: 0;
          bottom: calc(100% + var(--nav-space-2));
          display: none;
          width: 132px;
          padding: var(--nav-space-1) 0;
          border: 1px solid var(--nav-color-border-light);
          border-radius: var(--nav-radius-md);
          background: var(--nav-color-surface);
          box-shadow: var(--nav-shadow-dropdown);
        }

        .user-menu.is-open {
          display: block;
        }

        .user-menu button {
          display: block;
          width: 100%;
          padding: 9px var(--nav-space-4);
          border: 0;
          background: transparent;
          color: var(--nav-color-text);
          text-align: left;
          cursor: pointer;
          transition: all var(--nav-transition);
        }

        .user-menu button:hover {
          background: var(--nav-color-primary-bg);
          color: var(--nav-color-primary);
        }

        .side-layout.is-collapsed .user-name,
        .side-layout.is-collapsed .user-action-icons {
          display: none;
        }

        .side-layout.is-collapsed .user-actions {
          justify-content: center;
          gap: 0;
        }

        /* 主内容区 */
        .content {
          min-height: 100vh;
          padding: var(--nav-space-6);
          margin-left: var(--nav-sider-width);
          transition: margin-left var(--nav-transition);
        }

        .side-layout.is-collapsed .content {
          margin-left: var(--nav-sider-collapsed-width);
        }

        .page-head {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: var(--nav-space-5);
          margin-bottom: var(--nav-space-5);
        }

        .page-title h1 {
          margin: 0;
          font-size: var(--font-size-heading-4);
          font-weight: var(--font-weight-secondary);
          color: var(--color-text);
          letter-spacing: 0;
        }

        .page-title p {
          margin: var(--nav-space-2) 0 0;
          font-size: var(--font-size-sm);
          line-height: 22px;
          color: var(--color-text-secondary);
        }

        /* 响应式 */
        @media (max-width: 1120px) {
          .search input {
            width: 180px;
          }
        }

        @media (max-width: 760px) {
          .topbar {
            padding: 0 var(--nav-space-3);
          }

          .brand-name,
          .search {
            display: none;
          }

          .sidebar {
            transform: translateX(-100%);
            transition: width var(--nav-transition), transform var(--nav-transition);
          }

          .side-layout.is-mobile-open .sidebar {
            transform: translateX(0);
          }

          .content,
          .side-layout.is-collapsed .content {
            margin-left: 0;
            padding-right: var(--nav-space-4);
            padding-left: var(--nav-space-4);
          }

          .page-head {
            display: block;
          }
        }
      `}</style>
    </div>
  );
};

export default SideLayout;
