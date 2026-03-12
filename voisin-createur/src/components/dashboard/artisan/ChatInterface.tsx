import { UserProfile } from '../../../../lib/types'

interface ChatInterfaceProps {
  user: UserProfile
}

export default function ChatInterface({ user }: ChatInterfaceProps) {
  return (
    <div className="panel-container flex flex-col overflow-hidden max-h-[500px]">
      {/* En-tête Chat */}
      <div className=" border-b border-[#DEB887]/30 p-4 flex justify-between items-center">
        <h3 className="font-sans font-bold text-[#1A1A1A] text-lg">Conversations en Cours</h3>
        <div className="flex gap-4">
          <button className="text-gray-500 hover:text-[#1A1A1A]">🖼️</button>
          <button className="text-gray-500 hover:text-[#1A1A1A]">📝</button>
        </div>
      </div>

      {/* Zone de Messages */}
      <div className="flex-1 p-6 overflow-y-auto space-y-6 flex flex-col ">
        {/* Message Client (Gauche) */}
        <div className="flex items-end gap-3 self-start max-w-[85%]">
          <div className="w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center text-xl overflow-hidden">
            👩🏼
          </div>
          <div className="chat-bubble-client">
            <p><span className="font-bold">Marie-Laure:</span> Bonjour Pierre, j'ai une question sur la boîte à bijoux.</p>
            {/* Petite flèche bulle */}
            <div className="absolute bottom-0 left-[-8px] w-4 h-4 bg-[#E2D0C2] clip-path-triangle-left"></div>
          </div>
        </div>

        {/* Message Artisan (Droite) */}
        <div className="flex items-end gap-3 self-end max-w-[85%] flex-row-reverse">
          <div className="w-10 h-10 rounded-full bg-[#E5D5C5] flex-shrink-0 flex items-center justify-center overflow-hidden">
            <img src={user.avatar_url || "https://images.unsplash.com/photo-1580983574971-ce488d5e08f5?q=80&w=300&auto=format&fit=crop"} alt="Artisan" className="w-full h-full object-cover" />
          </div>
          <div className="chat-bubble-artisan">
            <p><span className="font-bold">Pierre Bois&Co:</span> Bonjour Marie-Laure! Bien sûr, que souhaitez-vous savoir ?</p>
            {/* Petite flèche bulle */}
            <div className="absolute bottom-0 right-[-8px] w-4 h-4 bg-[#34676B] clip-path-triangle-right"></div>
          </div>
        </div>

      </div>

      {/* Zone de Saisie */}
      <div className="border-t border-[#DEB887]/30 p-3 flex items-center gap-3">
        <button className="text-gray-400 hover:text-gray-600 text-xl pl-2">📎</button>
        <button className="text-gray-400 hover:text-gray-600 text-xl">📷</button>
        <input
          type="text"
          placeholder=""
          className="flex-1 border border-gray-200 rounded-full bg-gray-50 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#DEB887]/50"
          disabled
        />
        <button className="text-gray-400 hover:text-teal text-xl pr-2 transform -rotate-45">✈️</button>
      </div>

    </div>
  )
}
