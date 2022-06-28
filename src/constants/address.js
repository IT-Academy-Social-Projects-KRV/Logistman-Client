export const getStartPointAddress = (props) => {
    if (props[0].region != null) {
        return props[0].address +
            ", " + props[0].settlement +
            ", " + props[0].region +
            ", " + props[0].country
    }
    else {
        return props[0].address +
            ", " + props[0].settlement +
            ", " + props[0].country
    }
}

export const getEndPointAddress = (props) => {
    if (props[props.length - 1].region != null) {
        return props[props.length - 1].address +
            ", " + props[props.length - 1].settlement +
            ", " + props[props.length - 1].region +
            ", " + props[props.length - 1].country
    }
    else {
        return props[props.length - 1].address +
            ", " + props[props.length - 1].settlement +
            ", " + props[props.length - 1].country
    }
}
