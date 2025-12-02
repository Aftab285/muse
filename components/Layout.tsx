import React from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { LayoutGrid, Search, MessageSquare, UserCircle, LogOut, Menu, X } from 'lucide-react';
import { Button } from './UIComponents';
import { UserRole } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  userRole: UserRole;
  onLogout: () => void;
}

export const Layout: React.FC<LayoutProps> = ({ children, userRole, onLogout }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // If on landing page or onboarding, don't show the dashboard sidebar/nav
  if (location.pathname === '/' || location.pathname === '/onboarding') {
    return <main className="min-h-screen bg-slate-50">{children}</main>;
  }

  const NavItem = ({ to, icon: Icon, label }: { to: string; icon: any; label: string }) => (
    <NavLink
      to={to}
      onClick={() => setIsMobileMenuOpen(false)}
      className={({ isActive }) =>
        `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
          isActive
            ? 'bg-slate-900 text-white'
            : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
        }`
      }
    >
      <Icon className="w-5 h-5" />
      {label}
    </NavLink>
  );

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row">
      {/* Mobile Header */}
      <div className="md:hidden bg-white border-b border-slate-200 p-4 flex justify-between items-center sticky top-0 z-50">
        <span className="text-xl font-bold tracking-tight text-slate-900">MuseMatch</span>
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Sidebar Navigation */}
      <aside className={`
        fixed inset-y-0 left-0 z-40 w-64 bg-white border-r border-slate-200 transform transition-transform duration-200 ease-in-out
        md:relative md:translate-x-0
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="p-6 flex flex-col h-full">
          <div className="mb-8 hidden md:block">
            <span className="text-2xl font-bold tracking-tight text-slate-900">MuseMatch</span>
          </div>

          <div className="space-y-1 flex-1">
            <NavItem to="/dashboard" icon={LayoutGrid} label="Dashboard" />
            <NavItem to="/search" icon={Search} label={userRole === 'brand' ? 'Find Creators' : 'Find Campaigns'} />
            <NavItem to="/messages" icon={MessageSquare} label="Messages" />
            <NavItem to="/profile" icon={UserCircle} label="Profile" />
          </div>

          <div className="mt-auto pt-6 border-t border-slate-100">
             <div className="mb-4 px-3 py-2 bg-slate-50 rounded-lg">
                <p className="text-xs text-slate-500 font-medium uppercase mb-1">Signed in as</p>
                <p className="text-sm font-semibold text-slate-900 capitalize">{userRole}</p>
             </div>
             <button 
              onClick={onLogout}
              className="flex w-full items-center gap-3 px-3 py-2.5 text-sm font-medium text-slate-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
             >
               <LogOut className="w-5 h-5" />
               Sign Out
             </button>
             
             <div className="mt-4 pt-4 border-t border-slate-100">
                <NavLink to="/styleguide" className="text-xs text-slate-400 hover:text-slate-600">
                  View Style Guide
                </NavLink>
             </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto h-[calc(100vh-65px)] md:h-screen p-4 md:p-8">
        <div className="max-w-7xl mx-auto flex flex-col min-h-full">
          <div className="flex-1">
            {children}
          </div>
          
          <footer className="mt-8 pt-8 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center text-xs text-slate-400 gap-4">
             <p>&copy; {new Date().getFullYear()} MuseMatch Inc. All rights reserved.</p>
             <div className="flex gap-6">
               <a href="#" className="hover:text-slate-600 transition-colors">Privacy Policy</a>
               <a href="#" className="hover:text-slate-600 transition-colors">Terms of Service</a>
               <a href="#" className="hover:text-slate-600 transition-colors">Help Center</a>
             </div>
          </footer>
        </div>
      </main>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/20 z-30 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </div>
  );
};