interface HeaderProps {
  title: string | undefined;
  username?: string | undefined;
}

export function Header({ title, username }: HeaderProps) {
  return (
    <div className="bg-white border-b border-gray-200">
      <div className="px-6 py-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
            {username && (
              <p className="text-gray-600 mt-2">
                Bem-vindo de volta, {username}!
              </p>
            )}
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-500">
              {new Date().toLocaleDateString("pt-BR", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
