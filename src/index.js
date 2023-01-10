import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import NegativeTable from "./TablesComponents/NegativeTable";
// import NegativeTable from "./TablesComponents/NegativeTable";
import reportWebVitals from "./reportWebVitals";
import NeutralTable from "./TablesComponents/NeutralTable";
import PositiveTable from "./TablesComponents/PostitveTable";
import OverallTable from "./TablesComponents/OverallTable";
import ContainedButtons from "./Components/ButtonComponent";
import CircularStatic from "./Components/CircularSpinner";

import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
//

import Box from "@mui/material/Box";
import Fade from "@mui/material/Fade";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";

export default function DelayingAppearance() {
  const [loading, setLoading] = React.useState(false);
  const [query, setQuery] = React.useState("idle");
  const timerRef = React.useRef();

  React.useEffect(
    () => () => {
      clearTimeout(timerRef.current);
    },
    []
  );

  const handleClickLoading = () => {
    setLoading((prevLoading) => !prevLoading);
  };

  const handleClickQuery = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    if (query !== "idle") {
      setQuery("idle");
      return;
    }

    setQuery("progress");
    timerRef.current = window.setTimeout(() => {
      setQuery("success");
    }, 4000);
  };

  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <Box sx={{ height: 40 }}>
        {query === "success" ? (
          <div style={{ backgroundColor: "whitesmoke" }}>
            <OverallTable />
            <NegativeTable />
            <NeutralTable />
            <PositiveTable />
          </div>
        ) : (
          <Fade
            in={query === "progress"}
            style={{
              transitionDelay: query === "progress" ? "600ms" : "0ms",
            }}
            unmountOnExit
          >
            <CircularProgress style={{ margin: "200px auto" }} />
          </Fade>
        )}
      </Box>
      <Button onClick={handleClickQuery} sx={{ m: 2 }}>
        {query !== "idle" ? null : "Сформировать отчёт"}
      </Button>
    </Box>
  );
}

// const BasicButtons = () => {
// const [isLoading, setIsLoading] = useState(true);
// const HandleClick = (e) => {
//   {
//     console.log("click");
//     e.preventDefault(e);
//     useEffect(() => {
//       setTimeout(() => {
//         setIsLoading(false);
//       }, 3000);
//     }, []);
//     return (
//       <>
//         {!isLoading && (
//           <>
//             <div>Здесь будут таблицы</div>
//           </>
//         )}
//         {isLoading && (
//           <CircularStatic>
//             <span>Отчёт готовится...</span>
//           </CircularStatic>
//         )}
//       </>
//     );
//   }
// };

//   return (
//     <Stack spacing={2} direction="row">
//       <Button variant="contained">Сформировать отчёт</Button>
//     </Stack>
//   );
// };

//

//

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <DelayingAppearance />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
