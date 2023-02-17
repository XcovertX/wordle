import { observer, useLocalObservable } from "mobx-react-lite";
import { useEffect } from "react";
import Guess from "../components/Guess";
import Querty from "../components/Querty";
import PuzzleStore from "../stores/PuzzleStore";
import Popup from 'reactjs-popup';

export default observer(function Home() {
  const store = useLocalObservable(() => PuzzleStore)
  useEffect(() => {
    store.init()
    window.addEventListener('keyup', store.handleKeyup)
      return () => {
        window.removeEventListener('keyup', store.handleKeyup)
      }
  }, [])
  return <div className="flex h-screen w-screen flex-col items-center justify-center bg-gray-600">
    <h1 className="m-5 text-6xl font-bold uppercase text-transparent bg-clip-text bg-gradient-to-br from-blue-400 to-green-400">
      Wordle
    </h1>
    {store.guesses.map((_, i) =>  (
      <Guess 
        key={i}
        word={store.word} 
        guess={store.guesses[i]} 
        isGuessed={i < store.currentGuess}/>
    ))}
    <Popup open={store.won || store.lost}>
      <div className="text-6xl bg-gradient-to-br from-blue-400 to-green-400 font-bold h-200 w-200 border border-gray-400 text-white flex-col items-center justify-center">
        {store.won && <div className="m-5 flex center-items justify-center">You Won!</div>}
        {store.lost && <div className="m-5 flex center-items justify-center">You Lost!</div>}
        <div className="m-5 text-2xl">{`The correct word is ${store.word}!`}</div>
        <div className="m-5 flex items-center justify-center">
          <button onClick={store.init} className="p-5 text-2xl bg-black">
            Play Again?
          </button>
        </div>
      </div>
    </Popup>
    <div className="m-5">
      <Querty store={store}/>
    </div>
  </div>
})