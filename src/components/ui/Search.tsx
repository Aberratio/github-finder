import { useState } from "react";
import { EMPTY_STRING } from "../global/consts";

const Search = () => {
    const [text, setText] = useState<string>(EMPTY_STRING);
    return (
        <section>
            <form>
                <input type="text" placeholder="" autoFocus value={text} onChange={(e) => setText(e.target.value)} />
            </form>
        </section>
    )
}

export default Search;