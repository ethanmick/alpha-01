import { useGame } from 'game'
import React from 'react'

interface ProgressBarProps {
  progress: number
}
const ProgressBar = ({ progress }: ProgressBarProps) => {
  return (
    <div className="w-full" style={{ height: 2 }}>
      <div
        style={{ width: `${progress * 100}%`, height: 2 }}
        className="bg-green-500 transition-all"
      />
    </div>
  )
}

export const ActivityBar = () => {
  const { state } = useGame()
  if (!state || state.activities.length == 0) {
    return null
  }

  return (
    <div>
      {state.activities.map((activity, i) => (
        <React.Fragment key={i}>
          <div key={activity.name}>{activity.name}</div>
          <ProgressBar
            progress={Math.min(activity.timeElapsed / activity.timeRequired, 1)}
          />
        </React.Fragment>
      ))}
    </div>
  )
}
