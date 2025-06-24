import React from 'react'
import {UserProvider} from './context/user-context'
import WelcomeScreen from './screens/welcome-screen'
import TrainingScreen from './screens/training-screen'

export default function App () {
return (
<UserProvider>
<WelcomeScreen />
<TrainingScreen />
</UserProvider>
)
}
