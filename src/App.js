import React, {useState} from 'react';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Posts from './components/Posts';
import User from './components/User';
import './App.css';
import 'typeface-roboto';

const themeConfig = {
    palette: {
        type: 'light',
        primary: {
            light: '#62efff',
            main: '#00bcd4',
            dark: '#008ba3',
            contrastText: '#fff',
        },
        secondary: {
            light: '#e4ff54',
            main: '#aeea00',
            dark: '#79b700',
            contrastText: '#000',
        },
    },
};

function App() {

    const useDarkMode = () => {
        const [theme, setTheme] = useState(themeConfig);
        const { palette: { type } } = theme;
        const toggleDarkMode = () => {
            const updatedTheme = {
                ...theme,
                palette: {
                    ...theme.palette,
                    type: type === 'light' ? 'dark' : 'light'
                }
            };
            setTheme(updatedTheme);
        };
        return [theme, toggleDarkMode];
    };

    const [theme, toggleDarkMode] = useDarkMode();

    const themeDefinition = createMuiTheme(theme);

    return (
        <React.Fragment>
            <Router>
                <ThemeProvider theme={themeDefinition}>
                    <CssBaseline />
                    <NavBar toggleTheme={toggleDarkMode} />
                    <Switch>
                        <Route exact path="/"
                               render={
                                 (props) => <Posts type='top' {...props} />
                               } />
                        <Route path="/new"
                               render={
                                 (props) => <Posts type='new' {...props} />
                               } />
                        <Route path="/user"
                               component={User} />
                    </Switch>
                </ThemeProvider>
            </Router>
        </React.Fragment>
    );
}

export default App;
