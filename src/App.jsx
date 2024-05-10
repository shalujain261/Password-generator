import { useRef } from 'react'
import { useReducer } from 'react'
import { useState , useCallback , useEffect } from 'react'


function App() {
  const [length, setLength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [characterAllowed, setCharacterAllowed] = useState(false)
  const [password, setPassword] = useState("")

//useRef Hook
  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(() => {
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    let pass = ""

    if (numberAllowed) str += "0123456789"
    if (characterAllowed) str += "+-{}[]@#&.`'()!*,"

    for (let i = 1; i < length; i++) {

      let chars = Math.floor(Math.random() * str.length) + 1;
      pass += str.charAt(chars);

    }
    setPassword(pass)


  }, [length, numberAllowed, characterAllowed, setPassword])

  const copyPasswordToClipboard = useCallback(()=>{
    passwordRef.current?.select()
    passwordRef.current?.setSelectionRange(0,100)
    window.navigator.clipboard.writeText(password)
  }, [password])


  // useEffect hook
useEffect(()=>{
  passwordGenerator()
}, [length, numberAllowed , characterAllowed, passwordGenerator])

  return (
    <>
    {/* className='w-full max-w-lg mx-auto shadow-md rounded-lg
      px-4 my-8 py-3  text-orange-500 bg-gray-700 text-center' */}
    
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500">
        <h1 style={{ color: "white", fontSize: "1.2rem" }}>Password Generator</h1>
        <div className='flex shadow rounded-lg overflow-hidden mb-4'>
          <input
            type="text"
            value={password}
            className='outline-none w-full py-1 px-4 my-4 rounded-lg'
            placeholder='Password'
            readOnly
          />
          <button onClick={copyPasswordToClipboard} className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'>
            copy
          </button>
        </div>
        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1'>
            <input
              type="range"
              min={6}
              max={100}
              value={length}
              onChange={(event) => { setLength(event.target.value) }}
              className='cursor-pointer' />
            <label>Length: {length} </label>
          </div>

          <div className='flex items-center gap-x-1 mx-4'>
            <input
              type="checkbox"
              defaultChecked={numberAllowed}
              onChange={() => {
                setNumberAllowed((prev) => !prev)
              }}
              className='cursor-pointer' />
            <label htmlFor='numberInput'>Number </label>
          </div>

          <div className='flex items-center gap-x-1'>
            <input
              type="checkbox"
              defaultChecked={characterAllowed}
              onChange={() => {
                setCharacterAllowed((prev) => !prev)
              }}
              className='cursor-pointer' />
            <label
              htmlFor='characterInput'>Character</label>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
