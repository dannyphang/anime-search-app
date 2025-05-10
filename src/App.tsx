import "./App.css";
import Header from "./layout/header/header";
import Footer from "./layout/footer/footer";
import Home from "./module/home/home";
import { Routes, Route } from "react-router-dom";
import Anime from "./module/anime/anime";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";

function App() {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#9fadbd",
        contrastText: "#9fadbd",
      },
      background: {
        default: "#0b1622",
        paper: "#151f2e",
      },
      text: {
        primary: "#9fadbd",
        secondary: "#C9D7E3",
      },
    },
    typography: {
      fontFamily: `"Roboto", -apple-system, BlinkMacSystemFont, "Segoe UI", Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif`,
    },
    components: {
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            backgroundColor: "#151f2e",
            borderRadius: 6,
            color: "#C9D7E3",
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "#C9D7E3",
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "#C9D7E3",
            },
          },
          input: {
            color: "#eee",
          },
        },
      },
      MuiInputLabel: {
        styleOverrides: {
          root: {
            color: "#9fadbd",
            "&.Mui-focused": {
              color: "#C9D7E3",
            },
          },
        },
      },
      MuiPagination: {
        styleOverrides: {
          root: {
            "& .Mui-selected": {
              backgroundColor: "#C9D7E3 !important",
              color: "#0b1622",
              "&:hover": {
                backgroundColor: "#C9D7E3",
                color: "#0b1622",
              },
            },
            "& .MuiPaginationItem-ellipsis": {
              color: "#C9D7E3",
            },
          },
        },
      },
      MuiSvgIcon: {
        styleOverrides: {
          root: {
            color: "#C9D7E3",
          },
        },
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="App">
        {/* <Header /> */}
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/anime/:id" element={<Anime />} />
          </Routes>
        </main>
        {/* <Footer /> */}
      </div>
    </ThemeProvider>
  );
}

export default App;
