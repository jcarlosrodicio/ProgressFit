import React, {useEffect, useState} from 'react'
import {Text} from 'react-native'

export default function RestTimer ({duration}: {duration: number}) {
const [timeLeft, setTimeLeft] = useState(duration)

useEffect(() => {
const id = setInterval(() => {
setTimeLeft(t => {
if (t <= 1) {
clearInterval(id)
return 0
}
return t - 1
})
}, 1000)
return () => clearInterval(id)
}, [duration])

return <Text>Descanso: {timeLeft}s</Text>
}
