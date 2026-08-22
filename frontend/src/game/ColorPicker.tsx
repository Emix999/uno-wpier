import { createPortal } from "react-dom";
import type { Color } from "../typesClasses/Types";

function ColorPicker(props: {onDecision: (color: Color) => void}) {

    return createPortal(
        <div>
            <div className="red" onClick={()=>{props.onDecision("red")}}>red</div>
            <div className="green" onClick={()=>{props.onDecision("green")}}>green</div>
            <div className="yellow" onClick={()=>{props.onDecision("yellow")}}>yellow</div>
            <div className="blue" onClick={()=>{props.onDecision("blue")}}>blue</div>
        </div>,
        document.body
    )
}
export default ColorPicker;