import { UserProfile } from '../../../lib/types'
import ProfileSwitcher from '../auth/ProfileSwitcher'

interface HeaderProps {
  user?: UserProfile | null
  signOut?: () => void
}

export default function Header({ user, signOut }: HeaderProps) {
  return (
    <header className="bg-background/95 backdrop-blur-sm sticky top-0 z-50 border-b border-secondary/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-3">
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="Logo" className="h-16 w-auto" />
          </div>
          {user && signOut && (
            <div className="flex items-center space-x-4">
              <ProfileSwitcher
                currentProfile={user}
                onProfileChange={() => {}}
              />
              <button
                onClick={signOut}
                className="px-4 py-2 text-sm text-text hover:text-primary transition-colors"
              >
                Déconnexion
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}