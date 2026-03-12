import { ProfileType } from '../../../lib/types'

interface ProfileCardProps {
  type: ProfileType
  title: string
  imageSrc: string
  imageAlt: string
  description: string
  buttonText: string
  isSelected: boolean
  onSelect: () => void
}

export default function ProfileCard({
  type,
  title,
  imageSrc,
  imageAlt,
  description,
  buttonText,
  isSelected,
  onSelect
}: ProfileCardProps) {
  return (
    <div
      onClick={onSelect}
      className={`group flex-[1.2] flex flex-col items-center text-center p-8 transition-all duration-300 rounded-2xl cursor-pointer ${
        isSelected
          ? 'bg-[#3a757d]/5 ring-2 ring-[#3a757d]/20'
          : 'hover:bg-black/5'
      }`}
    >
      <h2
        className="text-3xl text-[#362F2E] font-bold px-4 h-[80px] flex items-center justify-center"
        style={{ fontFamily: "'Dancing Script', cursive" }}
      >
        {title}
      </h2>

      {/* Image Medium Centrée */}
      <div className="w-48 h-48 mb-6 relative mt-4">
        <img
          src={imageSrc}
          alt={imageAlt}
          className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110"
        />
      </div>

      {/* Ligne Décorative */}
      <div className="flex items-center w-full max-w-[300px] mb-6 opacity-70">
        <div className="h-[1px] flex-grow bg-gradient-to-l from-[#5d473a] to-transparent"></div>
        <div className="mx-3 h-[6px] w-[6px] rounded-full bg-[#5d473a]"></div>
        <div className="h-[1px] flex-grow bg-gradient-to-r from-[#5d473a] to-transparent"></div>
      </div>

      <p className="text-[#3d2b1f] text-base md:text-lg max-w-[550px] leading-relaxed mb-8 flex-1">
        {description}
      </p>

      {/* Bouton visuel */}
      <div className="bg-gradient-to-b from-[#3a7e85] to-[#2d6369] text-white px-8 py-3 rounded-xl shadow-md group-hover:brightness-110 transition-all font-medium text-lg border-b-2 border-[#1e4549] w-full max-w-[300px]">
        {buttonText}
      </div>
    </div>
  )
}
