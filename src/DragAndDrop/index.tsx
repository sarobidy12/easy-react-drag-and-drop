import Example from './example'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

const DragAndDrop = () => {
    return (
        <div className="App">
            <p><a href="https://github.com/sarobidy12/easy-react-drag-and-drop"  target="_blank"> Click here </a>, if you want see code source </p>
            <DndProvider backend={HTML5Backend}>
                <Example />
            </DndProvider>
        </div>
    )
}

export default DragAndDrop;