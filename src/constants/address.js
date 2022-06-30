export const getStartPointAddress = (points) => {
    if (points[0].region != null) {
        return points[0].address +
            ", " + points[0].settlement +
            ", " + points[0].region +
            ", " + points[0].country
    }
    else {
        return points[0].address +
            ", " + points[0].settlement +
            ", " + points[0].country
    }
}

export const getEndPointAddress = (points) => {
    if (points[points.length - 1].region != null) {
        return points[points.length - 1].address +
            ", " + points[points.length - 1].settlement +
            ", " + points[points.length - 1].region +
            ", " + points[points.length - 1].country
    }
    else {
        return points[points.length - 1].address +
            ", " + points[points.length - 1].settlement +
            ", " + points[points.length - 1].country
    }
}
