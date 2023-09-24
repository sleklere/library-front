import { useEffect } from "react";

function useSetPageTitle(title) {
  useEffect(() => {
    document.title = title;
  });
}

export default useSetPageTitle;
