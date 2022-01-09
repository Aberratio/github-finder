import { useCallback, useState, useEffect } from "react";
import { ResultDetails } from "../interfaces/ResultDetails";
 
interface FocusItem {
   num: number,
   url?: string
}

 function useRoveFocus(items: ResultDetails[]) {
    const [currentFocus, setCurrentFocus] = useState<FocusItem>({num: 0});
 
    const handleKeyDown = useCallback(
       e => {
          if(items) {
            if (e.keyCode === 40) {
               e.preventDefault();
               setCurrentFocus({num: currentFocus.num === items.length ? 0 : currentFocus.num + 1});
            } else if (e.keyCode === 38) {
               e.preventDefault();
               setCurrentFocus({num: currentFocus.num === 0 ? items.length : currentFocus.num  - 1});
            } else if (e.keyCode === 13) {
              e.preventDefault();
              window.open(items[currentFocus.num - 1].url, '_blank');
           }
          }
       },
       [currentFocus, setCurrentFocus, items]
    );
 
    useEffect(() => {
       document.addEventListener("keydown", handleKeyDown, false);
       return () => {
          document.removeEventListener("keydown", handleKeyDown, false);
       };
    }, [handleKeyDown]);
 
    return [currentFocus, setCurrentFocus] as const;
 }
 
 export default useRoveFocus;