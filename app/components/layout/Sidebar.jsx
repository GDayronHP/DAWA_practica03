'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '../../context/AuthContext';
import { canRead } from '../../utils/permissions';

export default function Sidebar() {
  const pathname = usePathname();
  const { user } = useAuth();

  const menuItems = [
    {
      name: 'Dashboard',
      href: '/dashboard',
      icon: '🏠'
    },
    {
      name: 'Laboratorios',
      href: '/dashboard/laboratorios',
      icon: '🧪',
      permission: 'laboratorio'
    },
    {
      name: 'Órdenes de Compra',
      href: '/dashboard/ordencompra',
      icon: '📋',
      permission: 'ordencompra'
    }
  ];

  const filteredMenuItems = menuItems.filter(item => {
    if (!item.permission) return true;
    return canRead(user?.role, item.permission);
  });

  return (
    <div className="bg-gray-800 text-white w-64 min-h-screen p-4">
      <nav className="space-y-2">
        {filteredMenuItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center space-x-3 px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors ${
              pathname === item.href ? 'bg-gray-700' : ''
            }`}
          >
            <span className="text-xl">{item.icon}</span>
            <span>{item.name}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
}