import React from 'react'
import Link from 'next/link'
import { BellIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { useNotifications, Notification } from '@/hooks/useNotifications'
import { UserProfile } from '@/lib/types'
import ProfileSwitcher from '@/components/auth/ProfileSwitcher'

interface HeaderProps {
  user?: UserProfile | null
  signOut?: () => void
}

export default function Header({ user, signOut }: HeaderProps) {
  const { notifications, unreadCount, markAsRead } = useNotifications(user?.id)
  const [showNotifs, setShowNotifs] = React.useState(false)
  const [showMenu, setShowMenu] = React.useState(false)
  const notifRef = React.useRef<HTMLDivElement>(null)
  const menuRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setShowNotifs(false)
      }
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowMenu(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <header className="bg-background/95 backdrop-blur-sm sticky top-0 z-50 border-b border-border/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-3">
          <Link href="/" className="flex items-center gap-3">
            <img src="/logo.png" alt="Logo" className="h-16 w-auto" />
            <span className="font-cursive text-2xl text-teal font-bold hidden sm:block">Voisin Créateur</span>
          </Link>
          
          {user && (
            <div className="flex items-center space-x-2 sm:space-x-4">
              {/* Notifications */}
              <div className="relative" ref={notifRef}>
                <button 
                  onClick={() => setShowNotifs(!showNotifs)}
                  className="p-2 text-text-muted hover:text-teal transition-colors relative"
                >
                  <BellIcon className="h-6 w-6" />
                  {unreadCount > 0 && (
                    <span className="absolute top-1.5 right-1.5 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full border-2 border-background">
                      {unreadCount}
                    </span>
                  )}
                </button>

                {showNotifs && (
                  <div className="absolute right-0 mt-2 w-72 sm:w-80 bg-surface border border-border rounded-2xl shadow-xl overflow-hidden z-50">
                    <div className="p-4 border-b border-border bg-background">
                      <h3 className="font-bold text-sm text-text">Notifications</h3>
                    </div>
                    <div className="max-h-96 overflow-y-auto">
                      {notifications.length === 0 ? (
                        <p className="p-8 text-center text-sm text-text-muted">Aucune alerte pour le moment.</p>
                      ) : (
                        notifications.map((n: Notification) => (
                          <div 
                            key={n.id} 
                            onClick={() => { markAsRead(n.id); setShowNotifs(false); }}
                            className={`p-4 border-b border-border/40 hover:bg-background cursor-pointer transition-colors ${!n.read ? 'bg-teal-light/5' : ''}`}
                          >
                            <p className={`text-sm ${!n.read ? 'font-bold text-teal' : 'text-text'}`}>{n.title}</p>
                            <p className="text-xs text-text-muted mt-1 leading-relaxed">{n.message}</p>
                            <p className="text-[10px] text-text-muted mt-2">{new Date(n.created_at).toLocaleTimeString()}</p>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Menu Burger Mobile */}
              <div className="sm:hidden" ref={menuRef}>
                <button 
                  onClick={() => setShowMenu(!showMenu)}
                  className="p-2 text-text-muted hover:text-teal transition-colors"
                >
                  {showMenu ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
                </button>

                {showMenu && (
                  <div className="absolute right-0 mt-2 w-64 bg-surface border border-border rounded-2xl shadow-xl p-4 z-50 space-y-4">
                    <div className="flex flex-col space-y-3">
                      <div className="px-2 py-1 bg-teal-light/5 rounded-xl border border-teal-light/10">
                        <ProfileSwitcher
                          currentProfile={user}
                          onProfileChange={() => setShowMenu(false)}
                        />
                      </div>
                      <button
                        onClick={() => { signOut?.(); setShowMenu(false); }}
                        className="w-full px-4 py-3 text-sm text-white bg-[#3a7e85] hover:bg-[#2d6369] rounded-xl shadow-sm transition-all font-bold"
                      >
                        Déconnexion
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* User Profil & Déconnexion Desktop */}
              <div className="hidden sm:flex items-center space-x-3 bg-teal-light/10 p-1.5 rounded-full border border-teal-light/20">
                <ProfileSwitcher
                  currentProfile={user}
                  onProfileChange={() => { }}
                />
                <button
                  onClick={signOut}
                  className="px-4 py-2 text-sm text-white bg-[#3a7e85] hover:bg-[#2d6369] rounded-full shadow-sm transition-all font-bold"
                >
                  Déconnexion
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}