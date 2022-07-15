export const getPointAddress = (point) => {
    if (point.region != null) {
        return point.address +
            ", " + point.settlement +
            ", " + point.region
    }
    else {
        return point.address +
            ", " + point.settlement
    }
}
