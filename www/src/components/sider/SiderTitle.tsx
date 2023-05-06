// import {signal} from "@preact/signals-react";
//
// const count = signal(0);

export const SiderTitle = ({collapsed}) => {

    if (!collapsed) {
        return (
            <>
                <img/>
                <span style={{paddingLeft:"5px"}}>Devbox</span>
            </>
        )
    } else {
        return (
            <>
                <img
                    style={{maxWidth:"50px"}}
                    alt="Company logo"
                    src={"/images/keyzo.png"}
                />
            </>
        )
    }
}
