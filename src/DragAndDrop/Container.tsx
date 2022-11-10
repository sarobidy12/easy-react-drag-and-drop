import update from 'immutability-helper'
import type { FC } from 'react'
import { memo, useCallback, useState } from 'react'
import { useDrop } from 'react-dnd'
import { Children, Parent } from './context';
import { Card } from './Card'
import { ItemTypes } from './ItemTypes'

const style = {
    width: '100%',
}

export interface ContainerState {
    cards: any[]
}

export const Container: FC = memo(function Container() {

    const [cards, setCards] = useState(Children)

    const findCard = useCallback(
        (id: string) => {
            const card = cards.filter((c) => `${c.id}` === id)[0]
            return {
                card,
                index: cards.indexOf(card),
            }
        }, [cards]);

    const moveCard = useCallback((id: string, atIndex: number, parent: number, isHover: boolean) => {

        const { card, index } = findCard(id);

        const newArray = cards.map((item: any) => {

            if (item.id === id && item.parent !== parent) {
                return {
                    ...item,
                    parent,
                }
            }

            return item;

        });

        setCards(update(newArray, {
            $splice: [
                [index, 1],
                [atIndex, 0, {
                    ...card,
                    parent,
                    isHover: isHover
                }],
            ],
        }));

    }, [findCard, cards, setCards]);

    const [, drop] = useDrop(() => ({
        accept: ItemTypes.CARD,
    }));

    const comfirmPlace = () => {

        setCards((array: any[]) => {

            const arrayFormated = array.map((item: any) => {
                return {
                    id: item.id,
                    text: item.text,
                    parent: item.parent
                }
            });

            return arrayFormated;

        });

    }

    return (

        <div>

            {
                Parent.map((item: any) => (

                    <>
                        <div style={{
                            display: 'inline-table',
                            width: '30%',
                            padding: '2vh',
                            backgroundColor: 'rgb(236, 240, 241)',
                            borderRadius: '10px',
                            transition: '100ms',
                            margin: '1vh'
                        }}>

                            <h1>
                                {item.text}
                            </h1>

                            <div ref={drop} style={{ ...style }}>
                                {cards
                                    .filter((x: any) => x.parent === item.id)
                                    .map((card) => (
                                        <Card
                                            key={card.id}
                                            id={`${card.id}`}
                                            text={card.text}
                                            moveCard={moveCard}
                                            findCard={findCard}
                                            parent={item.id}
                                            isHover={!!card.isHover}
                                            comfirmPlace={comfirmPlace}
                                        />
                                    ))}
                            </div>
                        </div>
                    </>
                ))
            }

        </div>

    )
})
