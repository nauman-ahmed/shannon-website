import "./table.css"
export default function Table(props) {
    let style = {}
    if("style" in props){
        style = {style}
    }
    if("height" in props){
        style["height"] = props.height
    }
    if("maxHeight" in props){
        style["maxHeight"] = props.maxHeight
    }
    if("minHeight" in props){
        style["minHeight"] = props.minHeight
    }
    return (
        <div className="myTable" style={style}>
            <table>
                {props.children}
            </table>
        </div>
    );
}
export function THead(props) {
    return (
        <thead>
            <tr>
                {props.children}
            </tr>
        </thead>
    );
}
export function TBody(props) {
    return (
        <tbody>
            {props.children}
        </tbody>
    );
}
export function Th(props) {
    let style = {};
    if ("width" in props) {
        style["width"] = props.width + "px";
    }
    if ("minWidth" in props) {
        style["minWidth"] = props.minWidth + "px";
    }
    if ("maxWidth" in props) {
        style["maxWidth"] = props.maxWidth + "px";
    }

    return (
        <th className={"className" in props?"p-2 "+props.className:"p-2"} style={style}>
            <div className="py-1 px-2">
                {props.children}
            </div>
        </th>
    );
}
export function Tr(props) {
    return (
        <tr>
            {props.children}
        </tr>
    );
}
export function Td(props) {
    let style = {};
    if ("width" in props) {
        style["width"] = props.width + "px";
    }
    if ("maxWidth" in props) {
        style["maxWidth"] = props.maxWidth + "px";
    }
    if ("minWidth" in props) {
        style["minWidth"] = props.minWidth + "px";
    }
    return (
        <td  className={"className" in props?props.className+" p-3":"p-3"} style={style} >
            {"label" in props ?
                <div className="row">
                    <div className="px-3 label">
                        {props.label}
                    </div>
                    <div className="col">
                        {props.children}
                    </div>
                </div>
                : props.children
            }
        </td>
    );
}