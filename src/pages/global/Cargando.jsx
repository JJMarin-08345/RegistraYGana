export default function Cargando() {
    return (
        <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col justify-center items-center h-full space-y-6">
                <div className="animate-spin rounded-full h-60 w-60  border-t-4 border-b-4 border-gray-800">
                </div>
                <div className="text-2xl font-semibold text-gray-700 flex ">
                    {Array.from("Cargando...").map((letter, index) => (
                        <span key={index} className="animate-wave" style={{ animationDelay: `${index * 0.2}s` }}>
                            {letter}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
}