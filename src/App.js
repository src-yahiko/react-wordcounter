import Layout from "./Navbar";

import { useState } from "react";

function App() {


  function shuffleArray(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }

  const [normalPlayers, setNormalPlayers] = useState(6)
  const [whitePlayers, setWhitePlayers] = useState(1)
  const [grayPlayers, setGrayPlayers] = useState(1)
  const [gameStatus, setGameStatus] = useState(0)
  const [assignments, setAssignments] = useState([])
  const [word, setWord] = useState("")
  const [wordAttempt, setWordAttempt] = useState("Hier raten...")

  const words = ["Hund", "Haus", "Auto", "Buch", "Baum", "Tisch", "Sonne", "Apfel", "Brille", "Kaffee"]
  const similarWords = ["Katze", "Wohnung", "Motorrad", "Zeitschrift", "Pflanze", "Stuhl", "Mond", "Birne", "Sonnenbrille", "Tee"]


  const prepareGame = () => {
    setWordAttempt("")
    const totalPlayers = normalPlayers + whitePlayers + grayPlayers
    let _assignments = assignments
    const diff = totalPlayers - _assignments.length
    if (diff > 0) {
      for (let i = 0; i < Math.abs(diff); i++)
        _assignments.push({
          name: "",
          word: "",
          active: true
        })
    } else if (diff < 0) {
      for (let i = 0; i < Math.abs(diff); i++)
        _assignments.pop()
    }

    _assignments.forEach((a, idx) => _assignments[idx].active = true)

    // Mischen
    const randomWordIndex = Math.floor(Math.random() * words.length);
    const word = words[randomWordIndex]
    setWord(word.toUpperCase())
    const similarWord = similarWords[randomWordIndex]
    let cards = []
    for (let i = 0; i < whitePlayers; i++)
      cards.push("Mr. White")

    for (let i = 0; i < grayPlayers; i++)
      cards.push(similarWord)

    for (let i = 0; i < normalPlayers; i++)
      cards.push(word)

    _assignments.forEach((assignment, idx) => {
      const theWord = cards[idx]
      if (theWord === "Mr. White") {
        _assignments[idx]["white"] = true;
      }
      _assignments[idx].word = theWord
    })

    cards = shuffleArray(cards)

    // Set
    if (_assignments.length === 0) {
      setAssignments({ name: "", word: "", active: true })
    } else {
      setAssignments([..._assignments])
    }
    console.log(assignments)
  }

  const setNameByIndex = (newName, idx) => {
    const _assignments = assignments
    _assignments[idx].name = newName
    setAssignments([..._assignments])
  }

  const showCard = (idx) => {
    alert(`${assignments[idx].name}, deine Karte ist: ${assignments[idx].word}`)
  }

  const kickPlayer = (idx) => {
    const _assignments = assignments
    _assignments[idx].active = false
    alert(`${_assignments[idx].name || ("Spieler " + String(idx))} ist raus.`)
    if (_assignments[idx].white === true) {
      alert(`${_assignments[idx].name || ("Spieler " + String(idx))} darf raten.`)
    }
    setAssignments([..._assignments])
  }

  return (
    <Layout>
      <div className="px-2 pt-10">
        <div className='container mx-auto p-2 h-full '>
          <h1 className='text-3xl p-2 m-2 border-b'>Mr. White</h1>
          <form className='flex flex-col p-2 m-2 border-b'>
            <label htmlFor='normalPlayers'>Normale Spieler</label>
            <input disabled={gameStatus !== 0} className='bg-transparent border p-2 m-2' type="number" name='normalPlayers' id='normalPlayers' step='1' min='1' value={normalPlayers} onChange={(e) => setNormalPlayers(e.target.valueAsNumber)} />
            <label htmlFor='whitePlayers'>Mr. Whites</label>
            <input disabled={gameStatus !== 0} className='bg-transparent border p-2 m-2' type="number" name='whitePlayers' id='whitePlayers' step='1' min='1' value={whitePlayers} onChange={(e) => setWhitePlayers(e.target.valueAsNumber)} />
            <label htmlFor='grayPlayers'>Mr. Grays</label>
            <input disabled={gameStatus !== 0} className='bg-transparent border p-2 m-2' type="number" name='grayPlayers' id='grayPlayers' step='1' min='1' value={grayPlayers} onChange={(e) => setGrayPlayers(e.target.valueAsNumber)} />
            <p className='text-xs bold uppercase'>Insgesamt {normalPlayers + whitePlayers + grayPlayers} Spieler</p>
          </form>
          <button onClick={() => prepareGame()} className='w-auto p-2 px-4 m-2 text-center bg-teal-800 rounded text-white cursor-pointer hover:scale-95 transition-all'>Neues Spiel</button>
          <input type="text" value={wordAttempt} onChange={(e) => setWordAttempt(e.target.value.toUpperCase().trim())} placeholder='Hier raten...' className={`bg-transparent flex-1 border rounded-full p-2 m-2 ${wordAttempt === word ? 'animate-ping' : 'text-red-500'}`} />
          <div>
            {
              assignments.length > 0 && assignments.map((player, idx) => {
                return <div className='p-2 m-0 flex flex-row bg-neutral-50 border-y border-neutral-100' key={idx}>
                  <input className='flex-1 border p-2 m-2 bg-neutral-100' type="text" onChange={(e) => setNameByIndex(e.target.value, idx)} value={player.name} placeholder={`Spieler ${idx}`} />

                  <button onClick={(e) => showCard(idx)} className='p-2 px-4 m-2 text-center bg-teal-500 rounded text-white cursor-pointer hover:scale-95 transition-all'>Karte zeigen</button>
                  {player.active === true && <button disabled={player.active === false} onClick={(e) => kickPlayer(idx)} className='p-2 px-4 m-2 text-center bg-red-500 rounded text-white cursor-pointer hover:scale-95 transition-all'>Kicken</button>}

                </div>
              })
            }
          </div>
        </div>

      </div>
    </Layout>
  );
}

export default App;
