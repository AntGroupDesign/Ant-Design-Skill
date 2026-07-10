import React, { useState, useEffect } from 'react';
import { Avatar, Button, Input } from 'antd';
import {
  QuestionCircleOutlined,
  BellOutlined,
  SearchOutlined,
  LeftOutlined,
  DownOutlined,
  HomeOutlined,
  FileOutlined,
  TeamOutlined,
  SettingOutlined,
  FileTextOutlined,
} from '@ant-design/icons';
import '../../references/global-style.css';

const MixedLayout: React.FC = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState('仪表盘');
  const [openSubmenus, setOpenSubmenus] = useState<Record<string, boolean>>({});

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const toggleUserDropdown = () => {
    setUserDropdownOpen(!userDropdownOpen);
  };

  const toggleSubmenu = (key: string) => {
    setOpenSubmenus(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleMenuClick = (menuName: string) => {
    setActiveMenu(menuName);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('.user-actions')) {
        setUserDropdownOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsCollapsed(true);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const menuItems = [
    '首页',
    '数据管理',
    '系统配置',
    '用户管理',
    '权限管理',
    '日志审计',
    '报表中心',
    '监控告警',
    '系统设置',
  ];

  const sidebarSections = [
    {
      title: '核心功能',
      items: [
        {
          name: '仪表盘',
          icon: <HomeOutlined className="menu-icon" />,
          submenu: []
        },
        {
          name: '数据管理',
          icon: <FileOutlined className="menu-icon" />,
          submenu: ['数据列表', '数据导入', '数据配置']
        },
        {
          name: '用户管理',
          icon: <TeamOutlined className="menu-icon" />,
          submenu: ['用户列表', '角色管理', '权限分配']
        },
      ],
    },
    {
      title: '系统管理',
      items: [
        {
          name: '系统配置',
          icon: <SettingOutlined className="menu-icon" />,
          submenu: []
        },
        {
          name: '日志审计',
          icon: <FileTextOutlined className="menu-icon" />,
          submenu: []
        }
      ],
    },
  ];
  return (
    <div className="dmixed-container">
      {/* 顶部导航 */}
      <header className="header">
        <div className="header-left">
          {/* Logo区域 */}
          <div className="logo-section">
            <div className="logo">
              <div className="logo-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
                </svg>
              </div>
              <span className="brand-name">产品名称</span>
            </div>
          </div>

          {/* 一级菜单 */}
          <nav className="top-menu" id="topMenu">
            {menuItems.map((item) => (
              <button
                key={item}
                type="button"
                className={`menu-item ${activeMenu === item ? 'active' : ''}`}
                onClick={() => handleMenuClick(item)}
              >
                {item}
              </button>
            ))}
          </nav>
        </div>

        {/* 右侧：组间距 16px，组内间距 4px */}
        <div className="header-right">
          {/* 顶导搜索：必须保持裸 Input 结构；如需联想候选，用 Popover / Dropdown 外挂，不要换成 AutoComplete / Select / Input.Search */}
          <Input
            className="nav-search"
            placeholder="搜索..."
            allowClear
            variant="filled"
            prefix={<SearchOutlined />}
          />

          {/* 图标组（组内间距 4px）*/}
          <div className="icon-group">
            <Button type="text" className="action-btn" aria-label="帮助文档" icon={<QuestionCircleOutlined />} />
            <Button type="text" className="action-btn" aria-label="消息通知" icon={<BellOutlined />} />
          </div>

          {/* 头像 + 用户名（组内间距 4px）*/}
          <div className="user-actions">
            <Avatar size={32} className="avatar" onClick={toggleUserDropdown}>U</Avatar>
            <span className="user-name">用户名</span>

            {/* 用户下拉菜单 */}
            <div className={`dropdown ${userDropdownOpen ? 'show' : ''}`} id="userDropdown">
              <div className="dropdown-item">个人资料</div>
              <div className="dropdown-item">意见反馈</div>
              <div className="dropdown-divider"></div>
              <div className="dropdown-item">退出登录</div>
            </div>
          </div>
        </div>
      </header>

      {/* 侧边栏 */}
      <aside className={`sidebar ${isCollapsed ? 'collapsed' : ''}`} id="sidebar">
        <div className="sidebar-content">
          <div className="sidebar-menu">
            {sidebarSections.map((section, sectionIndex) => (
              <section className="side-section" key={section.title || sectionIndex}>
                {section.title && <h2 className="side-section-title">{section.title}</h2>}
                {section.items.map((item, index) => {
                  const hasActiveChild = item.submenu.includes(activeMenu);
                  const isActive = item.name === activeMenu;

                  return (
              <div key={index} className="menu-item-wrapper">
                {item.submenu.length > 0 ? (
                  <>
                    <div
                      className={`menu-link ${isActive ? 'active' : ''} ${hasActiveChild ? 'has-active-child' : ''}`}
                      data-toggle="submenu"
                      onClick={() => toggleSubmenu(item.name)}
                    >
                      {item.icon}
                      <span className="menu-text">{item.name}</span>
                      <DownOutlined className={`expand-arrow ${openSubmenus[item.name] ? 'rotated' : ''}`} />
                    </div>
                    <ul className={`submenu ${openSubmenus[item.name] ? 'expanded' : ''}`}>
                      {item.submenu.map((subItem, subIndex) => (
                        <li key={subIndex}>
                          <button type="button" className={`menu-link ${activeMenu === subItem ? 'active' : ''}`} onClick={() => handleMenuClick(subItem)}>
                            {subItem}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </>
                ) : (
                  <button type="button" className={`menu-link ${isActive ? 'active' : ''}`} onClick={() => handleMenuClick(item.name)}>
                    {item.icon}
                    <span className="menu-text">{item.name}</span>
                  </button>
                )}
              </div>
                  );
                })}
              </section>
            ))}
          </div>
        </div>
      </aside>

      {/* 侧边栏收起/展开触发器 */}
      <button
        type="button"
        className={`toggle-sidebar ${isCollapsed ? 'collapsed' : ''}`}
        id="toggleSidebar"
        onClick={toggleSidebar}
        aria-label={isCollapsed ? '展开侧边栏' : '收起侧边栏'}
      >
        <LeftOutlined
          style={{
            fontSize: 10,
            transition: 'transform var(--nav-transition)',
            transform: isCollapsed ? 'rotate(180deg)' : 'none',
          }}
        />
      </button>

      <main className="main-container" />

      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .dmixed-container {
          font-family: var(--font-family);
          background: var(--nav-color-bg-canvas);
          min-height: 100vh;
          overflow-x: hidden;
        }

        /* 顶部导航 */
        .header {
          height: var(--nav-header-height);
          background: var(--nav-color-bg-canvas);
          box-shadow: 0 1px 0 var(--nav-color-border-light);
          display: flex;
          align-items: center;
          padding: 0 var(--nav-space-3);
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: var(--nav-z-index-base);
        }

        .header-left {
          display: flex;
          align-items: center;
          flex: 1;
          min-width: 0;
          border-right: 0;
          border-inline-end: 0;
          box-shadow: none;
        }

        /* Logo区域 */
        .logo-section {
          display: flex;
          align-items: center;
          margin-right: 40px;
          flex-shrink: 0;
          border-right: 0;
          border-inline-end: 0;
          box-shadow: none;
        }

        .logo {
          display: flex;
          align-items: center;
          font-weight: 600;
          font-size: 16px;
          color: var(--nav-color-text-active);
        }

        .brand-name {
          font-size: var(--font-size-lg);
          line-height: 24px;
          font-weight: var(--font-weight-tertiary);
          color: var(--nav-color-text-active);
        }

        .logo-icon {
          width: 32px;
          height: 32px;
          margin-right: var(--nav-space-2);
          background: var(--nav-color-primary);
          border-radius: var(--nav-radius-sm);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        /* 一级菜单 */
        .top-menu {
          display: flex;
          align-items: center;
          gap: 28px;
        }

        .menu-item {
          font-size: var(--font-size-sm);
          color: var(--nav-color-text-secondary);
          border: 0;
          background: transparent;
          font-family: inherit;
          cursor: pointer;
          padding: var(--nav-space-2) 0;
          position: relative;
          transition: color var(--nav-transition);
          white-space: nowrap;
        }

        .menu-item:not(.active):hover {
          color: var(--color-text);
        }

        .menu-item.active {
          color: var(--nav-color-text-active);
          font-weight: 600;
        }

        /* 右侧区域：组间距 16px */
        .header-right {
          display: flex;
          align-items: center;
          gap: 16px;
          position: relative;
        }

        /* 搜索框（Ant Design Input filled + prefix icon） */
        .nav-search {
          width: 220px;
          height: 32px;
        }

        .nav-search.ant-input-affix-wrapper {
          display: inline-flex;
          align-items: center;
          border: 1px solid transparent;
          border-radius: var(--nav-radius-md);
          background: var(--color-fill-tertiary);
          box-shadow: none;
          padding-top: 0 !important;
          padding-bottom: 0 !important;
        }

        .nav-search.ant-input-affix-wrapper:hover,
        .nav-search.ant-input-affix-wrapper-focused {
          background: var(--color-fill-secondary);
          border-color: transparent;
          box-shadow: none;
        }

        .nav-search .ant-input {
          height: 30px !important;
          line-height: 30px !important;
          background: transparent;
        }

        .nav-search .ant-input-prefix {
          color: var(--nav-color-text-tertiary);
          margin-inline-end: var(--nav-space-2);
        }

        /* 图标组：组内间距 4px */
        .icon-group {
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .action-btn {
          width: 32px;
          height: 32px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border-radius: var(--nav-radius-sm);
          transition: background var(--nav-transition);
          color: var(--nav-color-text-tertiary);
        }

        .action-btn:hover {
          background: var(--nav-color-primary-bg);
          color: var(--nav-color-primary);
        }

        .action-btn .anticon {
          font-size: 16px;
        }

        /* 头像 + 用户名：组内间距 4px */
        .user-actions {
          display: flex;
          align-items: center;
          gap: var(--nav-space-1);
          position: relative;
          cursor: pointer;
        }

        .avatar {
          background: var(--nav-color-primary);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--nav-color-surface);
          font-weight: 400;
          font-size: var(--font-size-sm);
          transition: filter var(--nav-transition);
          flex-shrink: 0;
        }

        .avatar:hover {
          filter: brightness(0.9);
        }

        .user-name {
          font-size: var(--font-size-sm);
          line-height: 22px;
          color: var(--nav-color-text-secondary);
          white-space: nowrap;
        }

        /* 侧边栏 */
        .sidebar {
          position: fixed;
          top: var(--nav-header-height);
          left: 0;
          width: var(--nav-sider-width, 208px);
          height: calc(100vh - var(--nav-header-height));
          background: var(--nav-color-sider);
          box-shadow: 1px 0 0 var(--nav-color-sider-divider);
          transition: width var(--nav-transition);
          z-index: 999;
          overflow-y: auto;
          overflow-x: hidden;
          box-sizing: border-box;
        }

        .sidebar.collapsed {
          width: var(--nav-sider-collapsed-width, 64px);
        }

        .sidebar-content {
          padding: var(--nav-space-3) var(--nav-space-2);
          position: relative;
          height: 100%;
          width: 100%;
          box-sizing: border-box;
          overflow-x: hidden;
        }

        .sidebar-menu {
          list-style: none;
          width: 100%;
          padding: 0;
          margin: 0;
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

        .menu-item-wrapper {
          margin-bottom: 0;
          width: 100%;
        }

        .menu-link {
          display: flex;
          align-items: center;
          padding: 0 var(--nav-space-4);
          border: 0;
          background: transparent;
          color: var(--nav-color-sider-text);
          text-decoration: none;
          font-size: var(--font-size-sm);
          font-family: inherit;
          text-align: left;
          cursor: pointer;
          transition: all var(--nav-transition);
          position: relative;
          min-height: 40px;
          width: 100%;
          box-sizing: border-box;
          border-radius: var(--nav-radius-sm);
          white-space: nowrap;
          overflow: hidden;
        }

        .menu-link[data-toggle="submenu"] {
          padding-right: var(--nav-space-4);
        }

        .sidebar.collapsed .menu-link {
          padding: var(--nav-space-2) 0;
          justify-content: center;
          width: 100%;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }

        .menu-link:hover {
          background: var(--nav-color-sider-hover);
          color: var(--nav-color-sider-text-active);
        }

        .menu-link.active {
          background: var(--nav-color-sider-active);
          color: var(--nav-color-sider-text-active);
          font-weight: 500;
        }

        .menu-link.has-active-child {
          color: var(--nav-color-sider-text-active);
        }

        .menu-link.active .menu-icon,
        .menu-link.has-active-child .menu-icon {
          color: var(--nav-color-sider-icon-active);
        }

        /* 侧边栏菜单图标（@ant-design/icons） */
        .menu-icon {
          font-size: 16px;
          margin-right: var(--nav-space-2);
          flex-shrink: 0;
          color: var(--nav-color-sider-text);
          transition: color var(--nav-transition);
        }

        .sidebar.collapsed .menu-icon {
          margin-right: 0;
        }

        .sidebar.collapsed .menu-text,
        .sidebar.collapsed .side-section-title,
        .sidebar.collapsed .expand-arrow {
          display: none;
        }

        .sidebar.collapsed .side-section + .side-section {
          margin-top: var(--nav-space-3);
          padding-top: var(--nav-space-3);
        }

        .sidebar.collapsed .menu-item-wrapper {
          margin-bottom: 0;
        }

        .menu-text {
          flex: 1;
          min-width: 0;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .submenu {
          list-style: none;
          margin: 0;
          padding: 0;
          display: none;
        }

        .submenu.expanded {
          display: block;
        }

        .sidebar.collapsed .submenu {
          display: none;
        }

        .submenu .menu-link,
        .submenu .submenu .menu-link {
          padding: 0 var(--nav-space-4) 0 40px;
          font-size: var(--font-size-sm);
          min-height: 40px;
          width: 100%;
          box-sizing: border-box;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        /* 展开箭头（@ant-design/icons DownOutlined） */
        .expand-arrow {
          margin-left: auto;
          font-size: 12px;
          transition: transform var(--nav-transition);
          color: var(--color-text-quaternary);
        }

        .expand-arrow.rotated {
          transform: rotate(180deg);
        }

        /* 侧边栏收起/展开触发器 */
        .toggle-sidebar {
          position: fixed;
          left: calc(var(--nav-sider-width, 208px) - 12px);
          top: calc(var(--nav-header-height) + var(--nav-space-5));
          width: 24px;
          height: 24px;
          background: var(--nav-color-surface);
          border: 1px solid var(--nav-color-border);
          border-radius: var(--nav-radius-pill);
          color: var(--nav-color-sider-text);
          box-shadow: var(--nav-shadow-dropdown);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: var(--nav-z-index-trigger);
          transition: left var(--nav-transition);
        }

        .toggle-sidebar.collapsed {
          left: calc(var(--nav-sider-collapsed-width, 64px) - 12px);
        }

        .toggle-sidebar:hover {
          background: var(--nav-color-primary-bg);
          color: var(--nav-color-primary);
        }

        /* 主内容区域 */
        .main-container {
          margin-left: var(--nav-sider-width, 208px);
          margin-top: var(--nav-header-height);
          padding: var(--nav-space-6);
          transition: margin-left var(--nav-transition);
          min-height: calc(100vh - var(--nav-header-height));
        }

        .sidebar.collapsed ~ .main-container {
          margin-left: var(--nav-sider-collapsed-width, 64px);
        }

        /* 用户下拉菜单 */
        .dropdown {
          position: absolute;
          top: calc(100% + var(--nav-space-2));
          right: 0;
          background: var(--nav-color-surface);
          border: 1px solid var(--nav-color-border-light);
          border-radius: var(--nav-radius-md);
          box-shadow: var(--nav-shadow-dropdown);
          min-width: 132px;
          padding: var(--nav-space-1);
          z-index: var(--nav-z-index-popup);
          display: none;
        }

        .dropdown.show {
          display: block;
        }

        .dropdown-item {
          padding: 9px var(--nav-space-4);
          cursor: pointer;
          font-size: var(--font-size-sm);
          color: var(--nav-color-text);
          border-radius: var(--nav-radius-sm);
          transition: background var(--nav-transition);
        }

        .dropdown-item:hover {
          background: var(--nav-color-primary-bg);
        }

        .dropdown-divider {
          height: 1px;
          background: var(--nav-color-border-light);
          margin: var(--nav-space-1) 0;
        }

        /* 响应式处理 */
        @media (max-width: 1120px) {
          .nav-search {
            width: 180px;
          }
        }

        @media (max-width: 768px) {
          .sidebar {
            width: 64px;
          }

          .main-container {
            margin-left: 64px;
          }

          .toggle-sidebar {
            left: 52px;
          }

          .toggle-sidebar.collapsed {
            left: 52px;
          }

        }
      `}</style>
    </div>
  );
};

export default MixedLayout;
