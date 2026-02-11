import React, { useState } from 'react';
import { Link, useLocation, Outlet } from 'react-router-dom';
import { 
  FaHome, 
  FaBox, 
  FaList, 
  FaShoppingCart, 
  FaStore, 
  FaUsers, 
  FaStar, 
  FaChevronDown,
  FaBars,
  FaTimes
} from 'react-icons/fa';
import './AdminLayout.css';

const AdminLayout = () => {
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [openMenus, setOpenMenus] = useState(['store']);

  const toggleMenu = (menu) => {
    setOpenMenus(prev => 
      prev.includes(menu) 
        ? prev.filter(m => m !== menu) 
        : [...prev, menu]
    );
  };

  const isActive = (path) => location.pathname === path;

  const sidebarItems = [
    {
      type: 'link',
      path: '/admin/dashboard',
      icon: <FaHome />,
      label: 'Dashboard'
    },
    {
      type: 'header',
      label: 'Store Managements'
    },
    {
      type: 'link',
      path: '/admin/products',
      icon: <FaBox />,
      label: 'Products'
    },
    {
      type: 'link',
      path: '/admin/categories',
      icon: <FaList />,
      label: 'Categories'
    },
    {
      type: 'menu',
      id: 'orders',
      icon: <FaShoppingCart />,
      label: 'Orders',
      children: [
        { path: '/admin/orders', label: 'All Orders' },
        { path: '/admin/orders/pending', label: 'Pending Orders' },
        { path: '/admin/orders/completed', label: 'Completed Orders' }
      ]
    },
    {
      type: 'link',
      path: '/admin/sellers',
      icon: <FaStore />,
      label: 'Sellers / Vendors'
    },
    {
      type: 'menu',
      id: 'customers',
      icon: <FaUsers />,
      label: 'Customers',
      children: [
        { path: '/admin/customers', label: 'Customer List' },
        { path: '/admin/customers/segments', label: 'Segments' }
      ]
    },
    {
      type: 'link',
      path: '/admin/reviews',
      icon: <FaStar />,
      label: 'Reviews'
    }
  ];

  return (
    <div className="admin-layout">
      {/* Sidebar Overlay for Mobile */}
      {!isSidebarOpen && (
        <button className="sidebar-toggle-btn mobile-only" onClick={() => setIsSidebarOpen(true)}>
          <FaBars />
        </button>
      )}

      <aside className={`admin-sidebar ${isSidebarOpen ? 'open' : 'closed'}`}>
        <div className="sidebar-header">
          <div className="sidebar-logo">
            <span className="logo-icon">S</span>
            <span className="logo-text">Supermarket Admin</span>
          </div>
          <button className="sidebar-close-btn mobile-only" onClick={() => setIsSidebarOpen(false)}>
            <FaTimes />
          </button>
        </div>

        <nav className="sidebar-nav">
          {sidebarItems.map((item, index) => {
            if (item.type === 'header') {
              return <div key={index} className="nav-header">{item.label}</div>;
            }

            if (item.type === 'link') {
              return (
                <Link 
                  key={index} 
                  to={item.path} 
                  className={`nav-item ${isActive(item.path) ? 'active' : ''}`}
                >
                  <span className="nav-icon">{item.icon}</span>
                  <span className="nav-label">{item.label}</span>
                </Link>
              );
            }

            if (item.type === 'menu') {
              const isOpen = openMenus.includes(item.id);
              const isChildActive = item.children.some(child => isActive(child.path));

              return (
                <div key={index} className={`nav-menu-group ${isOpen ? 'open' : ''} ${isChildActive ? 'child-active' : ''}`}>
                  <button className="nav-item menu-trigger" onClick={() => toggleMenu(item.id)}>
                    <span className="nav-icon">{item.icon}</span>
                    <span className="nav-label">{item.label}</span>
                    <span className={`menu-arrow ${isOpen ? 'rotate' : ''}`}><FaChevronDown /></span>
                  </button>
                  <div className="nav-submenu">
                    {item.children.map((child, idx) => (
                      <Link 
                        key={idx} 
                        to={child.path} 
                        className={`submenu-item ${isActive(child.path) ? 'active' : ''}`}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                </div>
              );
            }

            return null;
          })}
        </nav>
      </aside>

      <main className="admin-main">
        <header className="admin-header">
          <button className="sidebar-toggle-btn desktop-only" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
            <FaBars />
          </button>
          <div className="header-right">
            <Link to="/" className="view-site-btn">View Site</Link>
          </div>
        </header>
        <div className="admin-content">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
