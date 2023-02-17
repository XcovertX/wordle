export default function Guess({ guess, word, isGuessed }) {
    return (
    <div className="mb-2 grid grid-cols-5 gap-2">
        {new Array(5).fill(0).map((_, i) => {
            const bgColor = !isGuessed
            ? 'bg-black'
            : guess[i] === word[i]
            ? 'bg-green-400'
            : word.includes(guess[i])
            ? 'bg-yellow-400'
            : 'bg-black'
            return(
                <div className={`h-16 w-16 border border-gray-400 ${bgColor} font-bold uppercase text-white flex items-center justify-center`}>
                    {guess[i]}
                </div>
            )
            })}
    </div>
    )
}