import { isEditable } from "../helper"

export default function JobItem({key, data}) {
    return (
        <div style={{display:'flex' ,flexDirection:'row'}} key={key}>
            <p><span>&nbsp;{data?.name}&nbsp;</span><span>&nbsp;{data?.position}&nbsp;</span></p>
            <button>View Details</button>
            {isEditable(data?.creator) && <button>Edit</button>}
        </div>
    );
}