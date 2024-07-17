import { ReactNode } from "react";
export default function prerenderComponent(element: ReactNode): {
    html: string;
    styles: string;
};
