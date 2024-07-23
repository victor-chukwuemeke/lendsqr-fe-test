type ObjectWithId = { id?: string | number; uuid?: string | number }

export const updateObject = <T extends Record<string, any>>(
    oldObject: T,
    newValues: Partial<T>
): T => {
    return { ...oldObject, ...newValues }
}

export const updateItemInArray = <T extends ObjectWithId>(
    array: T[],
    itemId: string | number,
    uuid: boolean = false,
    updateItemCallback: (item: T) => T
): T[] => {
    return array.map((item) => {
        const itemMatches = uuid ? item.uuid === itemId : item.id === itemId

        if (!itemMatches) {
            return item
        }
        return updateItemCallback(item)
    })
}

export const updateObjectInArray = <T extends Record<string, any>>(
    array: T[],
    action: { index: number; item: Partial<T> }
): T[] => {
    return array.map((item, index) => {
        if (index !== action.index) {
            return item
        }
        return { ...item, ...action.item }
    })
}
