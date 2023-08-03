const subscribers = new Set();

export function subscribeToAuthChanges(subscriber) {
    subscribers.add(subscriber);
}

export function unsubscribeFromAuthChanges(subscriber) {
    subscribers.delete(subscriber);
}

export function notifyAuthChange(isLoggedIn) {
    for (const subscriber of subscribers) {
        subscriber(isLoggedIn);
    }
}
