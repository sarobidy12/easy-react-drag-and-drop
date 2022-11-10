import { CSSProperties, FC } from 'react'
import { memo } from 'react'
import { useDrag, useDrop } from 'react-dnd'

import { ItemTypes } from './ItemTypes'

const style: CSSProperties = {
    border: '1px solid #BCBCBC',
    padding: '0.5rem 1rem',
    marginBottom: '.5rem',
    backgroundColor: 'white',
    cursor: 'move',
    borderRadius: '10px'

}

export interface CardProps {
    id: string;
    parent: number;
    text: string;
    moveCard: (id: string, to: number, parent: number, isHover: boolean) => void;
    findCard: (id: string) => { index: number };
    isHover: boolean;
    comfirmPlace: () => void;
}

interface Item {
    id: string
    originalIndex: number
}

export const Card: FC<CardProps> = memo(function Card({
    id,
    text,
    moveCard,
    parent,
    findCard,
    isHover,
    comfirmPlace
}) {

    const originalIndex = findCard(id).index;

    const [{ isDragging }, drag] = useDrag(() => ({
        type: ItemTypes.CARD,
        item: { id, originalIndex, parent },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
        end: (item, monitor) => {
            comfirmPlace();
        },
    }), [id, originalIndex, moveCard]);

    const [, drop] = useDrop(
        () => ({
            accept: ItemTypes.CARD,
            hover({ id: draggedId }: Item) {
                if (draggedId !== id) {
                    const { index: overIndex } = findCard(id)
                    moveCard(draggedId, overIndex, parent, true)
                }
            },
        }), [findCard, moveCard]);

    const opacity = isHover || isDragging ? 0 : 1;

    return (
        <div ref={(node) => drag(drop(node))} style={{ ...style, opacity }}>
            {text}
        </div>
    )
})
