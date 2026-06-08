export default function Header({ user, onLogout }) {
  return (
    <header className="bg-[#FDFCFB] border-b border-[#F0EDE8]">
      <div className="max-w-7xl mx-auto px-8 py-6 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <img src="/logo-fga.png" alt="Francisco Gomes Advocacia" className="w-12 h-12 object-contain opacity-90" />
          <div className="border-l border-[#E0DDD8] pl-4">
            <h1 className="text-lg font-serif font-[400] text-[#1B2A4A] tracking-wide">
              Francisco Gomes <span className="text-[#C9A84C]">Advocacia</span>
            </h1>
            <p className="text-[10px] uppercase tracking-[0.2em] text-[#8a8a8a] font-sans font-[300] mt-0.5">
              Diagnóstico de Governança
            </p>
          </div>
        </div>
        <div className="flex items-center gap-6">
          {user && (
            <>
              <div className="text-right">
                <p className="font-serif font-[400] text-[#1B2A4A] text-sm">{user.name}</p>
                <p className="text-xs text-[#8a8a8a] font-sans font-[300]">{user.email}</p>
              </div>
              <button
                onClick={onLogout}
                className="px-5 py-2 text-[#1B2A4A] text-xs uppercase tracking-wider font-sans font-[400] border border-[#E0DDD8] rounded-[8px] hover:bg-[#F9F8F5] transition-all"
              >
                Sair
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  )
}
