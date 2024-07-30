import { useEffect } from "react";

export default function useExternalScripts({ url }: { url: string }) {
  useEffect(() => {
    const head = document.querySelector("head");
    const script = document.createElement("script");

    script.setAttribute("src", url);
    if (head) {
      head.appendChild(script);

      return () => {
        head.removeChild(script);
      };
    }
  }, [url]);
}
