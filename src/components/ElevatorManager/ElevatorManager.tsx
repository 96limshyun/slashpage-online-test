import { useState } from "react";
import FloorNav from "../FloorNav/FloorNav";
import ElevatorWrap from "../ElevatorWrap/ElevatorWrap";
import { FIRST_ELEVATOR, HALF_FLOOR_NUM } from "../../constants/elevatorConstants";
export interface ElevatorState {
    currentFloor: number;
    targetFloor: number | null;
    isMoving: boolean;
}

const ElevatorManager = () => {
    const [elevatorState, setElevatorState] = useState<ElevatorState[]>([
        { currentFloor: 1, targetFloor: null, isMoving: false },
        { currentFloor: 1, targetFloor: null, isMoving: false },
        { currentFloor: 1, targetFloor: null, isMoving: false }
    ]);

    const getNearestElevatorIndex = () => {
    
        const firstElevatorFloor = elevatorState[FIRST_ELEVATOR].currentFloor;
        const isAllSameFloor = elevatorState.every((curElevator) => curElevator.currentFloor === firstElevatorFloor);
        
        if (isAllSameFloor) {
            return elevatorState.findIndex((curElevator) => !curElevator.isMoving);
        }
    
        const nonMovingElevators = elevatorState.filter(elevator => !elevator.isMoving);
        const distances = nonMovingElevators.map(elevator => Math.abs(elevator.currentFloor - HALF_FLOOR_NUM));
        const minDistance = Math.min(...distances);
        const nearestElevatorIndex = distances.indexOf(minDistance);
    
        return elevatorState.findIndex(elevator => elevator === nonMovingElevators[nearestElevatorIndex]);
    }
    

    const handleFloorClick = (targetFloor: number) => {
        const nearestElevatorIndex = getNearestElevatorIndex()

        if(elevatorState[nearestElevatorIndex].currentFloor === targetFloor) return;

        setElevatorState((prev: ElevatorState[]) =>
            prev.map((elevator, idx) => idx === nearestElevatorIndex
                    ? { ...elevator, targetFloor, isMoving: true }
                    : elevator
            )
        );
    };

    const moveElevator = (targetIdx: number) => {
        setElevatorState(prev =>
            prev.map((elevator, idx) => {
                if (idx !== targetIdx || elevator.targetFloor === null) {
                    return elevator;
                }

                if (elevator.currentFloor === elevator.targetFloor) {
                    return { ...elevator, isMoving: false, targetFloor: null };
                }

                const nextFloor = elevator.currentFloor < elevator.targetFloor
                    ? elevator.currentFloor + 1
                    : elevator.currentFloor - 1;

                return {
                    ...elevator,
                    currentFloor: nextFloor,
                    isMoving: nextFloor !== elevator.targetFloor
                };
            })
        );
    };

    return (
        <>
            <FloorNav
                handleFloorClick={handleFloorClick}
                elevatorState={elevatorState}
            />
            <main className="flex gap-2 mt-4">
                {elevatorState.map((currentElevatorState, idx) => (
                    <ElevatorWrap
                        key={idx}
                        index={idx}
                        currentElevatorState={currentElevatorState}
                        moveElevator={moveElevator}
                    />
                ))}
            </main>
        </>
    );
};

export default ElevatorManager;
