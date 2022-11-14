import { useHistory } from "react-router";

export default function Helper(uri) {
    const history = useHistory();

    return (() => {
        history.push(uri);
    })
}