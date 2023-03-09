import Layout from "./Navbar";

import { useState } from "react";

function App() {

  const [words, setWords] = useState([])
  const [lastWord, setLastWord] = useState('')
  const [wordList, setWordList] = useState([])
  const [inputWord, setInputWord] = useState('')

  const Item = ({ word, value, count, pos }) => {
    return <div className="flex">
      <label htmlFor="file" className="w-1/3"> <span className="text-xs p-2 border rounded-full mr-3 opacity-50">{pos}</span>{word}</label >
      <progress id="file" className="w-2/3" max="1" value={value}></progress>
      <span className="relative w-32 text-right">{count}</span>
    </div >
  }

  const handleSubmit = (_word) => {
    const word = _word.trim().replace(/\W/g, " ").replace(/\s+/g, ' ').trim()
    console.log(word.split(" "))
    setLastWord(word.split(" ")[-1])
    const wordsCopy = [...words, ...word.split(" ")]
    const wordListCopy = wordsCopy.sort().reduce((acc, val) => {
      const valA = { word: val, count: 1 }
      if (acc.length === 0)
        return [valA]

      if (acc[0].word === val) {
        acc[0].count += 1
        return acc
      }
      return [valA, ...acc]
    }, [])

    setWords(wordsCopy.sort())
    setWordList(wordListCopy.sort((a, b) => b.count - a.count))


  }

  return (
    <Layout>
      <div className="px-2 pt-10">

        <div className="max-w-5xl mx-auto my-5">
          <form className="flex">
            <input className="p-2 bg-transparent border rounded-lg w-full rounded-r-none" type="text" placeholder="word.." value={inputWord} onChange={(e) => e.target.value !== '' && setInputWord(e.target.value)} />
            <input disabled={inputWord === ""} className="p-2 px-10 cursor-pointer shadow-inner border rounded-lg border-l-0 rounded-l-none" type="submit" onClick={(e) => { e.preventDefault(); handleSubmit(inputWord); setInputWord("") }} placeholder="word.." />
          </form>
          <p className="text-center d-block my-5">{wordList.length} words, {words.length} submission!</p>
          <p className="d-block">Last word: {lastWord}</p>
          <div className="flex flex-col space-y-3">
            {
              words.length > 0 && wordList.slice(0, 500).map(({ word, count }, idx) => <Item word={`${word}`} pos={idx + 1} count={count} value={(count / words.length)} key={idx} />)
            }
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default App;
