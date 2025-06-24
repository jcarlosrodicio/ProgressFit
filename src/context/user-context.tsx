import React, {createContext, useState, useEffect} from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import routines from '../../data/routines.json'

interface Preference {
experience: string
goal: string
gymType: string
}

interface ExerciseProgress {
weight: number
reps: number
}

interface ProgressRecord {
[exerciseId: string]: ExerciseProgress[]
}

interface UserContextProps {
preferences: Preference | null
routine: any | null
progress: ProgressRecord
setPreferences: (p: Preference) => void
recordSet: (exerciseId: string, setData: ExerciseProgress) => void
}

export const UserContext = createContext<UserContextProps | undefined>(undefined)

export function UserProvider ({children}: {children: React.ReactNode}) {
const [preferences, setPreferencesState] = useState<Preference | null>(null)
const [routine, setRoutine] = useState<any | null>(null)
const [progress, setProgress] = useState<ProgressRecord>({})

useEffect(() => {
async function loadData () {
const prefString = await AsyncStorage.getItem('preferences')
if (prefString) {
const pref: Preference = JSON.parse(prefString)
setPreferencesState(pref)
loadRoutine(pref)
}
const progString = await AsyncStorage.getItem('progress')
if (progString) {
setProgress(JSON.parse(progString))
}
}
loadData()
}, [])

function setPreferences (p: Preference) {
setPreferencesState(p)
AsyncStorage.setItem('preferences', JSON.stringify(p))
loadRoutine(p)
}

function loadRoutine (p: Preference) {
const key = `${p.experience}_${p.goal}_${p.gymType}`
// @ts-ignore
const selected = (routines as any)[key]
setRoutine(selected)
}

function recordSet (exerciseId: string, setData: ExerciseProgress) {
setProgress(prev => {
const exerciseSets = prev[exerciseId] || []
const updated = {...prev, [exerciseId]: [...exerciseSets, setData]}
AsyncStorage.setItem('progress', JSON.stringify(updated))
return updated
})
}

return (
<UserContext.Provider
value={{preferences, routine, progress, setPreferences, recordSet}}
>
{children}
</UserContext.Provider>
)
}
