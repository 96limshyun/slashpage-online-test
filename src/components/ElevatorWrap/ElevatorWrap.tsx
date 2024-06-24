import { useEffect } from "react";
import { ElevatorState } from "../ElevatorManager/ElevatorManager";
import { ELEVATOR_MOVE_DELAY, FLOORS } from "../../constants/elevatorConstants";
interface ElevatorWrapProps {
    index: number;
    currentElevatorState: ElevatorState;
    moveElevator: (targetIdx: number) => void;
}

const ElevatorWrap = ({index, currentElevatorState, moveElevator}: ElevatorWrapProps) => {

    const {currentFloor, targetFloor, isMoving} = currentElevatorState

    useEffect(() => {
        if (targetFloor !== null && currentFloor !== targetFloor) {
            const timer = setTimeout(() => {
                moveElevator(index);
            }, ELEVATOR_MOVE_DELAY);

            return () => clearTimeout(timer);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [targetFloor, currentFloor]);
    return (

        <div className="border-2 w-11 flex flex-col-reverse">
            {FLOORS.map((floor, idx) => (
                <div
                    key={idx}
                    className={`flex-grow m-2 flex items-center justify-center 
                    ${currentFloor === idx + 1 && "border-2"}
                    ${isMoving ? "border-red-500" : ""}`}
                >
                    {currentFloor === idx + 1 && floor}
                </div>
            ))}
        </div>
    );
};

export default ElevatorWrap;
