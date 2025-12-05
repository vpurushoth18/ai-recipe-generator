// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <div>
//         <a href="https://vite.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.tsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   )
// }

// export default App

// import { FormEvent, useState } from "react";
// import { Loader } from "@aws-amplify/ui-react";
// import "./App.css";
// import { Amplify } from "aws-amplify";
// import { generateClient } from "aws-amplify/data";
// import { type Schema } from "../amplify/data/resource";
// import outputs from "../amplify_outputs.json";

// Amplify.configure(outputs);

// const amplifyClient = generateClient<Schema>({
//   authMode: "userPool",
// });

// function App() {
//   const [result, setResult] = useState<string>("");
//   const [loading, setLoading] = useState(false);

//   const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
//     event.preventDefault();
//     setLoading(true);

//     try {
//       const formData = new FormData(event.currentTarget);
//       const ingredientList = formData.get("ingredients")?.toString() || "";
      
//       const { data, errors } = await amplifyClient.queries.askBedrock({
//         ingredients: [ingredientList],
//       });

//       if (!errors) {
//         setResult(data?.body || "No data returned");
//       } else {
//         console.log(errors);
//         setResult(errors[0]?.message || "Error generating recipe");
//       }
//     } catch (e) {
//       alert(`An error occurred: ${e}`);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="app-container">
//       <div className="header-container">
//         <h1 className="main-header">
//           Meet Your Personal <br />
//           <span className="highlight">Recipe AI</span>
//         </h1>
//         <p className="description">
//           Simply type a few ingredients using the format ingredient1,
//           ingredient2, etc., and Recipe AI will generate an all-new recipe on
//           demand...
//         </p>
//       </div>
//       <form onSubmit={onSubmit} className="form-container">
//         <div className="search-container">
//           <input
//             type="text"
//             className="wide-input"
//             id="ingredients"
//             name="ingredients"
//             placeholder="Ingredient1, Ingredient2, Ingredient3,...etc"
//           />
//           <button type="submit" className="search-button">
//             Generate
//           </button>
//         </div>
//       </form>
//       <div className="result-container">
//         {loading ? (
//           <div className="loader-container">
//             <p>Generating your recipe...</p>
//             <Loader size="large" />
//             <Loader />
//             <Loader />
//           </div>
//         ) : (
//           result && (
//             <div className="result">
//               <p>{result}</p>
//             </div>
//           )
//         )}
//       </div>
//     </div>
//   );
// }

// export default App;


import { FormEvent, useState } from "react";
import { Loader } from "@aws-amplify/ui-react";
import "./App.css";
import { Amplify } from "aws-amplify";
import { generateClient } from "aws-amplify/data";
import outputs from "../amplify_outputs.json";

Amplify.configure(outputs);

const amplifyClient = generateClient<any>({
  authMode: "userPool",
});

function App() {
  const [result, setResult] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData(event.currentTarget);
      const ingredientList = formData.get("ingredients")?.toString() || "";
      
      const { data, errors } = await amplifyClient.queries.askBedrock({
        ingredients: [ingredientList],
      });

      if (!errors) {
        setResult(data?.body || "No data returned");
      } else {
        console.log(errors);
        setResult(errors[0]?.message || "Error generating recipe");
      }
    } catch (e) {
      alert(`An error occurred: ${e}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      <div className="header-container">
        <h1 className="main-header">
          Meet Your Personal <br />
          <span className="highlight">Recipe AI</span>
        </h1>
        <p className="description">
          Simply type a few ingredients using the format ingredient1,
          ingredient2, etc., and Recipe AI will generate an all-new recipe on
          demand...
        </p>
      </div>
      <form onSubmit={onSubmit} className="form-container">
        <div className="search-container">
          <input
            type="text"
            className="wide-input"
            id="ingredients"
            name="ingredients"
            placeholder="Ingredient1, Ingredient2, Ingredient3,...etc"
          />
          <button type="submit" className="search-button">
            Generate
          </button>
        </div>
      </form>
      <div className="result-container">
        {loading ? (
          <div className="loader-container">
            <p>Generating your recipe...</p>
            <Loader size="large" />
            <Loader />
            <Loader />
          </div>
        ) : (
          result && (
            <div className="result">
              <p>{result}</p>
            </div>
          )
        )}
      </div>
    </div>
  );
}

export default App;