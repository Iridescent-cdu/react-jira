import type { ReactNode } from 'react'
import React from 'react'
import type {
  DraggableProps,
  DroppableProps,
  DroppableProvided,
  DroppableProvidedProps,
} from 'react-beautiful-dnd'
import {
  Draggable,
  Droppable,
} from 'react-beautiful-dnd'

type DropProps = Omit<DroppableProps, 'children'> & { children: ReactNode }

export function Drop({ children, ...props }: DropProps) {
  return (
    <Droppable {...props}>
      {(provided) => {
        if (React.isValidElement(children)) {
          return React.cloneElement(children, {
            ...provided.droppableProps,
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            ref: provided.innerRef,
            provided,
          })
        }
        return <div />
      }}
    </Droppable>
  )
}

type DropChildProps = Partial<
  { provided: DroppableProvided } & DroppableProvidedProps
> &
React.HTMLAttributes<HTMLDivElement>
export const DropChild = React.forwardRef<HTMLDivElement, DropChildProps>(
  ({ children, ...props }, ref) => (
    <div ref={ref} {...props}>
      {children}
      {props.provided?.placeholder}
    </div>
  ),
)

type DragProps = Omit<DraggableProps, 'children'> & { children: ReactNode }
export function Drag({ children, ...props }: DragProps) {
  return (
    <Draggable {...props}>
      {(provided) => {
        if (React.isValidElement(children)) {
          return React.cloneElement(children, {
            ...provided.draggableProps,
            ...provided.dragHandleProps,
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            ref: provided.innerRef,
          })
        }
        return <div />
      }}
    </Draggable>
  )
}
