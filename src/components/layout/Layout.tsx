import { LogOut, Menu, Settings, User } from "lucide-react";
import { useState } from "react";

interface LayoutProps {
    children: React.ReactNode;
}

interface NavigationItem {
    path: string,
    label: string,
    screen: string
}

const allNavigationItems: NavigationItem[] = [
    { path: '/dashboard', label: 'Dashboard', screen: '' }, // Dashboard sempre acessível
    { path: '/requesters', label: 'Solicitantes', screen: 'requesters' }, // Apenas ADMIN
    { path: '/tasks', label: 'Tarefas', screen: 'tasks' },
    { path: '/quotes', label: 'Orçamentos', screen: 'quotes' },
    { path: '/deliveries', label: 'Entregas', screen: 'deliveries' },
    { path: '/projects', label: 'Projetos', screen: 'projects' }, // Apenas ADMIN
    { path: '/billing', label: 'Faturamento', screen: 'billing' },
    { path: '/profiles', label: 'Perfis', screen: 'users' } // Apenas ADMIN (gerenciamento de usuários)
]
export function Layout({children}: LayoutProps) {
    const [showUserMenu, setShowUserMenu] = useState<boolean>(false)
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header Responsivo */}
            <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
                <div className="px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        {/* Logo e Menu Mobile */}
                        <div className="flex items-center space-x-3">
                            {/* Botão Menu Mobile */}
                            <button
                                className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
                                aria-label="Abrir menu"
                            >
                                <Menu className="w-5 h-5 text-gray-600" />
                            </button>

                            {/* Logo */}
                            <div className="flex items-center space-x-3">
                                <div className="h-8 w-8 bg-primary-600 rounded-lg flex items-center justify-center">
                                    <span className="text-white font-bold text-sm">DQ</span>
                                </div>
                                <h1 className="text-xl font-bold text-gray-900 hidden sm:block">
                                    Relojoaria Digital
                                </h1>
                            </div>
                        </div>

                        {/* User Menu */}
                        <div className="flex items-center space-x-4">
                            <span className="text-gray-700 text-sm hidden sm:inline">
                                Olá, Marcos
                            </span>

                            {/* User Menu Dropdown */}
                            <div className="relative">
                                <button
                                    onClick={() => setShowUserMenu(!showUserMenu)}
                                    className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 transition-colors"
                                    aria-label="Menu do usuário"
                                >
                                    <div className="h-8 w-8 bg-primary-100 rounded-full flex items-center justify-center">
                                        <User className="h-4 w-4 text-primary-600" />
                                    </div>
                                </button>

                                {/* Dropdown Menu */}
                                {showUserMenu && (
                                    <>
                                        <div
                                            className="fixed inset-0 z-40"
                                            onClick={() => setShowUserMenu(false)}
                                        />
                                        <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                                            <div className="p-3 border-b border-gray-100">
                                                <div className="font-medium text-gray-900">Usuário</div>
                                                <div className="text-sm text-gray-500">email@gamil.com</div>
                                            </div>

                                            <div className="py-1">
                                                <button
                                                    onClick={() => {
                                                        setShowUserMenu(false);
                                                    }}
                                                    className="w-full flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                >
                                                    <Settings className="h-4 w-4 mr-2" />
                                                    Configurações
                                                </button>

                                                <div className="border-t border-gray-100 my-1" />

                                                <button
                                                    onClick={() => {
                                                        setShowUserMenu(false);
                                                    }}
                                                    className="w-full flex items-center px-3 py-2 text-sm text-red-600 hover:bg-red-50"
                                                >
                                                    <LogOut className="h-4 w-4 mr-2" />
                                                    Sair
                                                </button>
                                            </div>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Navigation Desktop */}
            <nav className="bg-white shadow-sm border-b border-gray-200 hidden lg:block">
                <div className="px-4 sm:px-6 lg:px-8">
                    <div className="flex space-x-8 h-12 items-center overflow-x-auto">
                        {allNavigationItems.map((item: NavigationItem) => (
                            <button
                                key={item.path}
                                className="whitespace-nowrap font-medium transition-colors border-b-2 pb-2"
                            >
                                {item.label}
                            </button>
                        ))}
                    </div>
                </div>
            </nav>

            {/* Menu Mobile Overlay */}

            {/* Main Content */}
            <main className="px-4 sm:px-6 lg:px-8 py-6">
                {children}
            </main>

            {/* Footer Responsivo */}
            <footer className="bg-white border-t border-gray-200 mt-12">
                <div className="px-4 sm:px-6 lg:px-8 py-4">
                    <p className="text-center text-gray-500 text-sm">
                        Relojoaria Digital
                    </p>
                </div>
            </footer>
        </div>
    )
}