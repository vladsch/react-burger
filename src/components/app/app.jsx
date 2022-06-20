import React from 'react';
import AppHeader from '../app-header/app-header';
import Main from '../main/main';

class App extends React.Component
{
    render() {
        return (
            <div>
                <AppHeader />
                <Main />
            </div>
        );
    }
}

export default App;