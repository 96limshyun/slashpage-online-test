import { useState } from "react";
import FloorNav from "../FloorNav/FloorNav";
import ElevatorWrap from "../ElevatorWrap/ElevatorWrap";

export interface ElevatorState {
    id: number;
    currentFloor: number;
    targetFloor: number | null;
    isMoving: boolean;
}

const ElevatorManager = () => {
    const [elevatorState, setElevatorState] = useState<ElevatorState[]>([
        { id: 1, currentFloor: 1, targetFloor: null, isMoving: false },
        { id: 2, currentFloor: 1, targetFloor: null, isMoving: false },
        { id: 3, currentFloor: 1, targetFloor: null, isMoving: false }
    ]);

    const handleFloorClick = (targetFloor: number) => {
        const availableElevatorIndex = elevatorState.findIndex((curElevator) => !curElevator.isMoving);

        if(elevatorState[availableElevatorIndex].currentFloor === targetFloor) return;

        setElevatorState((prev: ElevatorState[]) =>
            prev.map((elevator, idx) => idx === availableElevatorIndex
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
