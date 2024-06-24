import { useEffect } from "react";
import { ElevatorState } from "../ElevatorManager/ElevatorManager";

interface ElevatorWrapProps {
    index: number;
    currentElevatorState: ElevatorState;
    moveElevator: (targetIdx: number) => void;
}
const floors = Array.from({ length: 15 }, (_, i) => i + 1);

const ElevatorWrap = ({index, currentElevatorState, moveElevator}: ElevatorWrapProps) => {
    const {currentFloor, targetFloor, isMoving} = currentElevatorState

    useEffect(() => {
        if (targetFloor !== null && currentFloor !== targetFloor) {
            const timer = setTimeout(() => {
                moveElevator(index);
            }, 1000);

            return () => clearTimeout(timer);
        }
    }, [targetFloor, currentFloor]);
    return (

        <div className="border-2 w-11 flex flex-col-reverse">
            {floors.map((floor, idx) => (
                <div
                    key={idx}
                    className={`flex-grow m-2 flex items-center justify-center ${
                        currentElevatorState.currentFloor === idx + 1 ? "border-2" : ""
                    } ${isMoving ? "border-red-500" : ""}`}
                    
                >
                    {currentElevatorState.currentFloor === idx + 1 && floor}
                </div>
            ))}
        </div>
    );
};

export default ElevatorWrap;
