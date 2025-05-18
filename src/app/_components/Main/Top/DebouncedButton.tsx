import {ReactNode, useState} from "react";

type Props = {
    timeout: number,
    children: ReactNode,
    stateHandler: (isBlocked: boolean) => void,
    actionHandler?: () => void
};

export function DebouncedButton(props: Props) {
    const [isClicked, setIsClicked] = useState<boolean>(false);
    const {
        timeout,
        children,
        stateHandler,
        actionHandler
    } = props;
    
    const setState = (isBlocked: boolean) => {
        setIsClicked(isBlocked);
        stateHandler(isBlocked);
    }
    
    return <button onClick={ () => {
        if (isClicked) {
            if (actionHandler) {
                actionHandler();
            }
            return;
        }
        
        setState(true);
        if (actionHandler) {
            actionHandler();
        }
        
        setTimeout( () => {
            setState(false);
        }, timeout);
    }}>
        {children}
    </button>
}