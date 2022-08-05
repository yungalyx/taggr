import React from "react";
import { Icon } from "@blueprintjs/core";

const folders = [''] 


export const NavBar = () => {
    return <div class='navbar'>
        <ol>
            {[1,2,3,4,5,6].map(i => {
                return <li>
                    {i}
                </li>
            })}
        </ol>
    </div>
}
