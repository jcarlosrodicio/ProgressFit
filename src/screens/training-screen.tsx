import React, {useContext, useState} from 'react'
import {View, Text, Button, TextInput, FlatList} from 'react-native'
import {UserContext} from '../context/user-context'
import RestTimer from '../components/rest-timer'

export default function TrainingScreen () {
const user = useContext(UserContext)
const [currentSet, setCurrentSet] = useState(0)
const [weight, setWeight] = useState('')
const [reps, setReps] = useState('')

if (!user || !user.routine) return null

const exercises = user.routine.days[0].exercises
const exercise = exercises[0]

function handleCompleteSet () {
user.recordSet(exercise.id, {
weight: parseFloat(weight),
reps: parseInt(reps, 10),
})
setCurrentSet(currentSet + 1)
setWeight('')
setReps('')
}

return (
<View>
<Text>{exercise.name}</Text>
<Text>Serie {currentSet + 1} de {exercise.sets}</Text>
<TextInput
placeholder='Peso'
keyboardType='numeric'
value={weight}
onChangeText={setWeight}
/>
<TextInput
placeholder='Reps'
keyboardType='numeric'
value={reps}
onChangeText={setReps}
/>
<Button title='Completar serie' onPress={handleCompleteSet} />
<RestTimer key={currentSet} duration={60} />
<FlatList
data={user.progress[exercise.id]}
keyExtractor={(_, i) => i.toString()}
renderItem={({item}) => (
<Text>
{item.weight}kg x {item.reps}
</Text>
)}
/>
</View>
)
}
