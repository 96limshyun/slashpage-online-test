import { useEffect, useState } from "react";
import { ElevatorState } from "../ElevatorManager/ElevatorManager";
import { FLOORS, LAST_FLOOR_NUM } from "../../constants/elevatorConstants";

interface FloorNavProps {
    handleFloorClick: (target: number) => void;
    elevatorState: ElevatorState[];
}

const FloorNav = ({ handleFloorClick, elevatorState }: FloorNavProps) => {
    const [allDisable, setAllDisable] = useState(false);

    const isDisable = (floor: number) => {
        return elevatorState.some(
            (curElevator) =>
                curElevator.isMoving && curElevator.targetFloor === floor
        );
    };

    useEffect(() => {
        const isAllSelect = () =>
            elevatorState.every((curElevator) => curElevator.isMoving);
        setAllDisable(isAllSelect());
    }, [elevatorState]);

    return (
        <nav className={`flex items-center gap-2`}>
            <h2>호출</h2>
            <div className={`flex border-2 border-gray-300`}>
                {FLOORS.map((floor, idx) => {
                    const disable = isDisable(floor);
                    return (
                        <button
                            key={idx}
                            className={`px-2 ${
                                idx !== LAST_FLOOR_NUM ? "border-r-2 border-gray-300" : ""
                            } ${
                                !allDisable &&
                                disable &&
                                "text-red-500 font-bold"
                            }${
                                allDisable && disable && "font-bold"
                            }
                            ${allDisable && "bg-gray-200 "}`}
                            onClick={() => handleFloorClick(idx + 1)}
                            disabled={disable || allDisable}
                        >
                            {floor}
                        </button>
                    );
                })}
            </div>
        </nav>
    );
};

export default FloorNav;
