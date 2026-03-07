import { GithubIcon, InstagramIcon, PhoneIcon } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-[1440px] mx-auto px-6 py-6">
        <div className="flex flex-col md:flex-row items-start 
        md:items-center md:justify-between gap-4">
          <div>
            <h2 className="text-sm md:text-md font-black text-slate-800 mb-2">
              Relojoaria Digital
            </h2>
            <div className="flex space-x-4">
                <ul className="space-y-2 text-sm flex items-baseline gap-5">
                 <li>
                    <a href="#">
                        <div className="hover:-translate-y-1.5 transition p-1 rounded-full
                        hover:bg-blue-900 hover:text-gray-200">
                            <InstagramIcon size={18}/>
                        </div>
                    </a>
                </li>
                 <li>
                    <a href="#">
                        <div className="hover:-translate-y-1.5 transition p-1 rounded-full
                        hover:bg-blue-900 hover:text-gray-200">
                            <PhoneIcon size={18}/>
                        </div>
                    </a>
                </li>
              </ul>
              </div>
          </div>

          <div>
            <h3 className="text-slate-800 font-medium mb-4 
            text-sm md:text-md">Desenvolvido por <span className="font-bold">Marcos Silva Chaves</span></h3>
            <ul className="space-y-2 text-sm flex items-baseline gap-5 md:justify-self-end">
              <li>
                <a href="#">
                    <div className="hover:-translate-y-1.5 transition p-1 rounded-full
                    hover:bg-blue-900 hover:text-gray-200">
                        <InstagramIcon size={18}/>
                    </div>
                </a>
              </li>
              <li>
                <a href="#">
                    <div className="hover:-translate-y-1.5 transition p-1 rounded-full
                    hover:bg-blue-900 hover:text-gray-200">
                        <PhoneIcon size={18}/>
                    </div>
                </a></li>
              <li>
                <a href="#">
                    <div className="hover:-translate-y-1.5 transition p-1 rounded-full
                    hover:bg-blue-900 hover:text-gray-200">
                        <GithubIcon size={18}/>
                    </div>
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Linha inferior */}
        <div className="border-t border-gray-400 text-center 
        text-xs md:text-sm text-gray-500">
          © {new Date().getFullYear()} Relojoaria Digital. Todos os direitos reservados.
        </div>

      </div>
    </footer>
  );
}