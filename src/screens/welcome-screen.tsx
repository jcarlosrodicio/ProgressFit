import React, {useState, useContext} from 'react'
import {View, Text, Button, TextInput} from 'react-native'
import {UserContext} from '../context/user-context'

export default function WelcomeScreen () {
const user = useContext(UserContext)
const [experience, setExperience] = useState('principiante')
const [goal, setGoal] = useState('fuerza')
const [gymType, setGymType] = useState('completo')

if (!user) return null

function handleStart () {
user.setPreferences({experience, goal, gymType})
}

return (
<View>
<Text>Bienvenido</Text>
<TextInput
placeholder='Experiencia'
value={experience}
onChangeText={setExperience}
/>
<TextInput placeholder='Objetivo' value={goal} onChangeText={setGoal} />
<TextInput
placeholder='Tipo de gimnasio'
value={gymType}
onChangeText={setGymType}
/>
<Button title='Iniciar' onPress={handleStart} />
</View>
)
}
