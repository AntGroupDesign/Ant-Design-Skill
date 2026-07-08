import React, { useEffect, useState } from 'react';
import { Avatar, Button, Input } from 'antd';
import { BellOutlined, QuestionCircleOutlined, SearchOutlined } from '@ant-design/icons';
import '../../references/global-style.css';

const TopLayout: React.FC = () => {
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState('首页');

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

  return (
    <div className="top-layout-container">
      <header className="header">
        <div className="header-left">
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

          <nav className="top-menu" id="topMenu">
            {menuItems.map((item) => (
              <button
                key={item}
                type="button"
                className={`menu-item ${activeMenu === item ? 'active' : ''}`}
                onClick={() => setActiveMenu(item)}
              >
                {item}
              </button>
            ))}
          </nav>
        </div>

        <div className="header-right">
          <Input
            className="nav-search"
            placeholder="搜索..."
            allowClear
            variant="filled"
            prefix={<SearchOutlined />}
          />

          <div className="icon-group">
            <Button type="text" className="action-btn" aria-label="帮助文档" icon={<QuestionCircleOutlined />} />
            <Button type="text" className="action-btn" aria-label="消息通知" icon={<BellOutlined />} />
          </div>

          <div className="user-actions">
            <Avatar size={32} className="avatar" onClick={() => setUserDropdownOpen((open) => !open)}>U</Avatar>
            <span className="user-name">用户名</span>

            <div className={`dropdown ${userDropdownOpen ? 'show' : ''}`} id="userDropdown">
              <button type="button" className="dropdown-item">个人资料</button>
              <button type="button" className="dropdown-item">意见反馈</button>
              <div className="dropdown-divider"></div>
              <button type="button" className="dropdown-item">退出登录</button>
            </div>
          </div>
        </div>
      </header>

      <main className="main-container" />

      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .top-layout-container {
          min-height: 100vh;
          overflow-x: hidden;
          background: var(--nav-color-bg-canvas);
          font-family: var(--font-family);
        }

        .header {
          position: fixed;
          inset: 0 0 auto;
          z-index: var(--nav-z-index-base);
          display: flex;
          align-items: center;
          height: var(--nav-header-height);
          padding: 0 var(--nav-space-3);
          background: var(--nav-color-bg-canvas);
          box-shadow: 0 1px 0 var(--nav-color-border-light);
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
          color: var(--nav-color-text-active);
        }

        .logo-icon {
          width: 32px;
          height: 32px;
          margin-right: var(--nav-space-2);
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: var(--nav-radius-sm);
          background: var(--nav-color-primary);
        }

        .brand-name {
          color: var(--nav-color-text-active);
          font-size: var(--font-size-lg);
          font-weight: var(--font-weight-tertiary);
          line-height: 24px;
          white-space: nowrap;
        }

        .top-menu {
          display: flex;
          align-items: center;
          gap: 28px;
          min-width: 0;
        }

        .menu-item {
          padding: var(--nav-space-2) 0;
          border: 0;
          background: transparent;
          color: var(--nav-color-text-secondary);
          font-family: inherit;
          font-size: var(--font-size-sm);
          font-weight: 400;
          line-height: calc(var(--font-size-sm) + 8px);
          white-space: nowrap;
          cursor: pointer;
          transition: color var(--nav-transition);
        }

        .menu-item:not(.active):hover {
          color: var(--color-text);
        }

        .menu-item.active {
          color: var(--nav-color-text-active);
          font-weight: 500;
        }

        .header-right {
          display: flex;
          align-items: center;
          gap: var(--nav-space-4);
          position: relative;
          flex-shrink: 0;
        }

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

        .icon-group {
          display: flex;
          align-items: center;
          gap: var(--nav-space-1);
        }

        .action-btn {
          width: 32px;
          height: 32px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border-radius: var(--nav-radius-sm);
          color: var(--nav-color-text-tertiary);
          transition: background var(--nav-transition), color var(--nav-transition);
        }

        .action-btn:hover {
          background: var(--nav-color-primary-bg);
          color: var(--nav-color-primary);
        }

        .action-btn .anticon {
          font-size: 16px;
        }

        .user-actions {
          display: flex;
          align-items: center;
          gap: var(--nav-space-1);
          position: relative;
          cursor: pointer;
        }

        .avatar {
          background: var(--nav-color-primary);
          color: var(--nav-color-surface);
          font-size: var(--font-size-sm);
          font-weight: 500;
          transition: filter var(--nav-transition);
          flex-shrink: 0;
        }

        .avatar:hover {
          filter: brightness(0.9);
        }

        .user-name {
          color: var(--nav-color-text-secondary);
          font-size: var(--font-size-sm);
          line-height: 22px;
          white-space: nowrap;
        }

        .dropdown {
          position: absolute;
          top: calc(100% + var(--nav-space-2));
          right: 0;
          z-index: var(--nav-z-index-popup);
          display: none;
          min-width: 132px;
          padding: var(--nav-space-1);
          border: 1px solid var(--nav-color-border-light);
          border-radius: var(--nav-radius-md);
          background: var(--nav-color-surface);
          box-shadow: var(--nav-shadow-dropdown);
        }

        .dropdown.show {
          display: block;
        }

        .dropdown-item {
          display: block;
          width: 100%;
          padding: 9px var(--nav-space-4);
          border: 0;
          border-radius: var(--nav-radius-sm);
          background: transparent;
          color: var(--nav-color-text);
          font-family: inherit;
          font-size: var(--font-size-sm);
          text-align: left;
          cursor: pointer;
          transition: background var(--nav-transition);
        }

        .dropdown-item:hover {
          background: var(--nav-color-primary-bg);
        }

        .dropdown-divider {
          height: 1px;
          margin: var(--nav-space-1) 0;
          background: var(--nav-color-border-light);
        }

        .main-container {
          min-height: calc(100vh - var(--nav-header-height));
          margin-top: var(--nav-header-height);
          padding: var(--nav-space-6);
        }

        @media (max-width: 1120px) {
          .nav-search {
            width: 180px;
          }
        }
      `}</style>
    </div>
  );
};

export default TopLayout;
