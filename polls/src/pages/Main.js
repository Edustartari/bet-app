import React, { Component } from 'react';
import '../styles/Main.css'
import Header from '../components/Header.js'

// const ThemeContext = React.createContext({theme: themes.dark,  toggleTheme: () => {},});

export default class Main extends Component {
  render() {
    return (
      <div>
            <Header/>
            {/* <ThemeContext.Provider value={"Main"}> */}
                <div>
                    <div>
                        <div>Last updates</div>
                        <div>
                            <div>Poll "Name of poll" update the "Name of bet" bet</div>
                            <div>Poll "Name of poll" update the "Name of bet" bet</div>
                        </div>
                    </div>
                    <div>
                        <div>Peding bets</div>
                        <div>
                            <div>You have to bet "Name of bet" for "Name of poll" until "Date"</div>
                        </div>
                    </div>
                    <div>
                        <div>Random statistics</div>
                        <div>
                            <div>cool chart</div>
                            <div>cool chart</div>
                            <div>cool chart</div>
                            <div>cool chart</div>
                            <div>cool chart</div>
                        </div>
                    </div>
                </div>
            {/* </ThemeContext.Provider> */}
      </div>
    )
  }
}
