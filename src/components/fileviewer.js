import React from "react";
import { Icon, Button, Card, Elevation, Colors } from "@blueprintjs/core";

export const FileViewer = ({ files, onBack, onOpen, onSelectFile}) => {
    return <div class='fileview'>
        
        <Card class="card" key="back" onClick={() => onBack()}>
            <Icon icon="folder-open" size={80}/>
            <p> ... </p>
        </Card>

        {files.map(({name, directory, size}) => {
            return <Card class="card" key={name} onClick={() => directory ? onOpen(name) : onSelectFile(name)}>
                    {directory ?  <Icon icon="folder-close" size={80}/>: <Icon icon="media" size={80}/> }
                    <p> {name} </p>
                </Card>
            
        })}
    </div>
    
}
