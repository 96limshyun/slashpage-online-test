import { useEffect, useState } from "react";
import { ElevatorState } from "../ElevatorManager/ElevatorManager";
const floors = Array.from({ length: 15 }, (_, i) => i + 1);

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
        <nav className={`flex items-center gap-2 `}>
            <h2>호출</h2>
            <div className={`flex border-2`}>
                {floors.map((floor, idx) => {
                    const disable = isDisable(floor);
                    return (
                        <button
                            key={idx}
                            className={`px-2 ${
                                idx !== 14 ? "border-r-2" : ""
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
